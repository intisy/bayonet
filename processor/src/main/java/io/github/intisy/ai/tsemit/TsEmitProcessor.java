package io.github.intisy.ai.tsemit;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Deque;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.annotation.processing.AbstractProcessor;
import javax.annotation.processing.RoundEnvironment;
import javax.annotation.processing.SupportedAnnotationTypes;
import javax.annotation.processing.SupportedOptions;
import javax.annotation.processing.SupportedSourceVersion;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.Element;
import javax.lang.model.element.ElementKind;
import javax.lang.model.element.ExecutableElement;
import javax.lang.model.element.Modifier;
import javax.lang.model.element.TypeElement;
import javax.lang.model.element.TypeParameterElement;
import javax.lang.model.element.VariableElement;
import javax.lang.model.type.ArrayType;
import javax.lang.model.type.DeclaredType;
import javax.lang.model.type.MirroredTypeException;
import javax.lang.model.type.TypeKind;
import javax.lang.model.type.TypeMirror;
import javax.tools.Diagnostic;
import javax.tools.StandardLocation;

/**
 * An annotation processor that renders {@link TsInterface}, {@link TsFn}, {@link TsEnum},
 * {@link TsModule} and {@link TsConstant} declarations into a single generated TypeScript source
 * file.
 */
@SupportedAnnotationTypes({"io.github.intisy.ai.tsemit.TsInterface", "io.github.intisy.ai.tsemit.TsFn", "io.github.intisy.ai.tsemit.TsModule", "io.github.intisy.ai.tsemit.TsConstant", "io.github.intisy.ai.tsemit.TsEnum", "io.github.intisy.ai.tsemit.TsStringUnion", "io.github.intisy.ai.tsemit.TsUnionType"})
@SupportedSourceVersion(SourceVersion.RELEASE_17)
@SupportedOptions({"tsemit.name", "tsemit.ext", "tsemit.keys", "tsemit.imports", "tsemit.reexport"})
public class TsEmitProcessor extends AbstractProcessor {

    private static final Pattern CODE_TAG = Pattern.compile("\\{@code ([^}]*)\\}");
    private static final Pattern LINK_TAG = Pattern.compile("\\{@link ([^}]*)\\}");

    private static final List<String> KEY_TYPES =
            Collections.unmodifiableList(Arrays.asList("CapabilityType", "ServiceType", "TopicType"));

    private final List<String> chunks = new ArrayList<String>();
    private final List<String> constants = new ArrayList<String>();
    private final List<String> emittedTypes = new ArrayList<String>();
    private int rawEscapes = 0;

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment round) {
        for (Element element : round.getElementsAnnotatedWith(TsInterface.class)) {
            if (!emittable(element)) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                        "@TsInterface applies to an interface, or to a data-carrying class marked data = true", element);
                continue;
            }
            emittedTypes.add(element.getSimpleName().toString());
            chunks.add(emit((TypeElement) element));
        }
        for (Element element : round.getElementsAnnotatedWith(TsFn.class)) {
            if (element.getKind() != ElementKind.INTERFACE) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                        "@TsFn applies only to interfaces", element);
                continue;
            }
            TypeElement type = (TypeElement) element;
            List<ExecutableElement> abstractMethods = abstractMethods(type);
            if (abstractMethods.size() != 1) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                        "@TsFn needs exactly one abstract method, because a function type has one call signature",
                        element);
                continue;
            }
            emittedTypes.add(type.getSimpleName().toString());
            chunks.add(emitFn(type, abstractMethods.get(0)));
        }
        for (Element element : round.getElementsAnnotatedWith(TsEnum.class)) {
            if (element.getKind() != ElementKind.ENUM) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                        "@TsEnum applies only to enums", element);
                continue;
            }
            TypeElement type = (TypeElement) element;
            emittedTypes.add(type.getSimpleName().toString());
            chunks.add(docBlock(type, "") + "export type " + type.getSimpleName() + " = " + enumUnion(type) + ";\n");
        }
        for (Element element : round.getElementsAnnotatedWith(TsStringUnion.class)) {
            if (element.getKind() != ElementKind.CLASS) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                        "@TsStringUnion applies only to a class of string constants", element);
                continue;
            }
            TypeElement type = (TypeElement) element;
            String union = stringConstantUnion(type);
            if (union.isEmpty()) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                        "@TsStringUnion needs at least one public static final String constant", element);
                continue;
            }
            emittedTypes.add(type.getSimpleName().toString());
            chunks.add(docBlock(type, "") + "export type " + type.getSimpleName() + " = " + union + ";\n");
        }
        for (Element element : round.getElementsAnnotatedWith(TsUnionType.class)) {
            if (element.getKind() != ElementKind.CLASS && element.getKind() != ElementKind.INTERFACE) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                        "@TsUnionType applies only to a class or interface", element);
                continue;
            }
            TypeElement base = (TypeElement) element;
            List<String> arms = armsOf(base, round);
            if (arms.isEmpty()) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                        "@TsUnionType needs at least one emitted subtype", element);
                continue;
            }
            StringBuilder union = new StringBuilder();
            for (int i = 0; i < arms.size(); i++) {
                if (i > 0) {
                    union.append(" | ");
                }
                union.append(arms.get(i));
            }
            emittedTypes.add(base.getSimpleName().toString());
            chunks.add(docBlock(base, "") + "export type " + base.getSimpleName() + " = " + union + ";\n");
        }
        for (Element element : round.getElementsAnnotatedWith(TsModule.class)) {
            if (element.getKind() != ElementKind.INTERFACE) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                        "@TsModule applies only to interfaces", element);
                continue;
            }
            chunks.add(emitModule((TypeElement) element));
        }
        for (Element element : round.getElementsAnnotatedWith(TsConstant.class)) {
            TsConstant constant = element.getAnnotation(TsConstant.class);
            String value = constant.literal().isEmpty()
                    ? "{ id: \"" + constant.id() + "\" }"
                    : constant.literal();
            constants.add(docBlock(element, "") + "export const " + element.getSimpleName() + ": " + constant.type() + " = " + value + ";");
        }
        if (round.processingOver()) {
            write();
        }
        return false;
    }

    /**
     * Renders one function type: the interface's own doc block, then its single call signature.
     *
     * @implNote The parameter and return rendering is the same {@link #params} and
     * {@link #returnType} every member goes through, so an annotation on either behaves here exactly
     * as it does on a method of a {@link TsInterface}.
     *
     * @param type the annotated interface.
     * @param call its one abstract method.
     * @return the emitted type alias.
     */
    private String emitFn(TypeElement type, ExecutableElement call) {
        return docBlock(type, "")
                + "export type " + type.getSimpleName() + joinVars(type.getTypeParameters())
                + " = (" + params(call) + ") => " + returnType(call) + ";\n";
    }

    /**
     * The methods an interface leaves for an implementation to write.
     *
     * @implNote Only its OWN members, like every other walk here, and a default or static method is
     * not part of the call signature a function type carries.
     *
     * @param type the interface to walk.
     * @return its abstract methods, in declaration order.
     */
    private List<ExecutableElement> abstractMethods(TypeElement type) {
        List<ExecutableElement> methods = new ArrayList<ExecutableElement>();
        for (Element member : type.getEnclosedElements()) {
            if (member.getKind() != ElementKind.METHOD) {
                continue;
            }
            Set<Modifier> modifiers = member.getModifiers();
            if (modifiers.contains(Modifier.DEFAULT) || modifiers.contains(Modifier.STATIC)) {
                continue;
            }
            methods.add((ExecutableElement) member);
        }
        return methods;
    }

    private String emit(TypeElement type) {
        TsInterface spec = type.getAnnotation(TsInterface.class);
        StringBuilder out = new StringBuilder();
        out.append(docBlock(type, ""));
        out.append("export interface ").append(type.getSimpleName()).append(joinVars(type.getTypeParameters())).append(" {\n");
        TsPhantom phantom = type.getAnnotation(TsPhantom.class);
        if (phantom != null) {
            out.append("  /** Never present at run time. It exists so two keys parameterised differently cannot be interchanged. */\n");
            out.append("  readonly __phantom?: ").append(phantom.value()).append(";\n");
        }
        for (Member member : sortedMembers(type, spec, type.getAnnotation(TsDiscriminant.class))) {
            out.append(member.text);
        }
        TsIndexSignature index = type.getAnnotation(TsIndexSignature.class);
        if (index != null) {
            out.append("  [").append(index.key()).append(": string]: ").append(index.value()).append(";\n");
        }
        out.append("}\n");
        return out.toString();
    }

    /**
     * @implNote No property branch, no interface wrapper: every member is a free function, because
     * that is what a JavaScript module actually exports and what lets a plain named import type-check
     * against this declaration instead of merely being castable to it.
     */
    private String emitModule(TypeElement type) {
        StringBuilder out = new StringBuilder();
        for (ExecutableElement method : sortedMethods(type)) {
            out.append(docBlock(method, ""));
            out.append("export declare function ").append(method.getSimpleName())
                    .append(joinVars(method.getTypeParameters())).append("(").append(params(method))
                    .append("): ").append(returnType(method)).append(";\n");
        }
        return out.toString();
    }

    /**
     * One element's javadoc, rendered as the TSDoc block that precedes its declaration.
     *
     * @implNote Carried rather than dropped because the Java IS the documentation: the generated
     * surface is what a plugin author reads, and a declaration file with no prose is a reference
     * nobody can use. {@code @link} targets are left for {@link #resolveLinks} to finish, since
     * whether a target is an emitted type is only known once every round is over.
     */
    private String docBlock(Element element, String indent) {
        return docBlock(element, indent, false);
    }

    /**
     * @implNote {@code asProperty} mirrors the same callable-vs-property decision the caller already
     * made for the declaration itself: TSDoc has no {@code @returns} for a property, and the javadoc
     * this is rendered from carries {@code @return} on every accessor regardless, so a property must
     * drop the tag that a callable keeps.
     */
    private String docBlock(Element element, String indent, boolean asProperty) {
        List<String> lines = tsdoc(processingEnv.getElementUtils().getDocComment(element));
        if (asProperty) {
            lines = withoutReturns(lines);
        }
        if (lines.isEmpty()) {
            return "";
        }
        if (lines.size() == 1) {
            return indent + "/** " + lines.get(0) + " */\n";
        }
        StringBuilder out = new StringBuilder(indent).append("/**\n");
        for (String line : lines) {
            out.append(indent).append(line.isEmpty() ? " *" : " * " + line).append("\n");
        }
        return out.append(indent).append(" */\n").toString();
    }

    private static List<String> withoutReturns(List<String> lines) {
        List<String> out = new ArrayList<String>();
        for (String line : lines) {
            if (!line.startsWith("@returns")) {
                out.add(line);
            }
        }
        while (!out.isEmpty() && out.get(out.size() - 1).isEmpty()) {
            out.remove(out.size() - 1);
        }
        return out;
    }

    /**
     * @implNote {@code @implNote} becomes {@code @remarks} because both mean the same thing to their
     * own reader: rationale that belongs with the declaration rather than in its summary. A javadoc
     * {@code @param} has no dash and a TSDoc one requires it.
     */
    private static List<String> tsdoc(String raw) {
        List<String> lines = new ArrayList<String>();
        if (raw == null || raw.trim().isEmpty()) {
            return lines;
        }
        for (String line : raw.split("\n", -1)) {
            String text = line.trim();
            if (text.startsWith("<p>")) {
                lines.add("");
                text = text.substring(3).trim();
            }
            text = text.replace("</p>", "").trim();
            if (text.startsWith("@implNote")) {
                lines.add("@remarks");
                text = text.substring("@implNote".length()).trim();
            } else if (text.startsWith("@return ")) {
                text = "@returns " + text.substring("@return ".length());
            } else if (text.startsWith("@param ")) {
                String rest = text.substring("@param ".length()).trim();
                int space = rest.indexOf(' ');
                text = space < 0 ? "@param " + rest
                        : "@param " + rest.substring(0, space) + " - " + rest.substring(space + 1).trim();
            }
            text = CODE_TAG.matcher(text).replaceAll("`$1`");
            if (!text.isEmpty() || !lines.isEmpty()) {
                lines.add(text);
            }
        }
        while (!lines.isEmpty() && lines.get(lines.size() - 1).isEmpty()) {
            lines.remove(lines.size() - 1);
        }
        return lines;
    }

    /**
     * Turns every carried {@code @link} into a TSDoc link when its target is a type this surface
     * declares, and into a code span when it is not.
     *
     * @implNote A link to a Java name TypeScript never sees resolves to nothing, and typedoc runs
     * with invalid links treated as errors, so an unresolvable target has to stop being a link
     * rather than stay one and break the docs build. The member separator differs too: javadoc's
     * {@code #} is TSDoc's {@code .}.
     */
    private String resolveLinks(String body) {
        Matcher found = LINK_TAG.matcher(body);
        StringBuffer out = new StringBuffer();
        while (found.find()) {
            String target = found.group(1).trim();
            int hash = target.indexOf('#');
            String owner = hash < 0 ? target : target.substring(0, hash);
            String replacement = emittedTypes.contains(owner)
                    ? "{@link " + target.replace('#', '.') + "}"
                    : "`" + (hash < 0 ? target : target.substring(hash + 1)) + "`";
            found.appendReplacement(out, Matcher.quoteReplacement(replacement));
        }
        return found.appendTail(out).toString();
    }

    private String returnType(ExecutableElement method) {
        TsRaw raw = method.getAnnotation(TsRaw.class);
        if (raw != null) {
            rawEscapes++;
            return raw.value();
        }
        String vocabulary = vocabularyName(method);
        if (vocabulary != null) {
            return vocabulary;
        }
        TsUnion union = method.getAnnotation(TsUnion.class);
        if (union != null) {
            StringBuilder arms = new StringBuilder();
            for (int i = 0; i < union.value().length; i++) {
                if (i > 0) {
                    arms.append(" | ");
                }
                arms.append(union.value()[i]);
            }
            boolean promised = union.async() || isStage(method.getReturnType());
            return promised ? "Promise<" + arms + ">" : arms.toString();
        }
        if (method.getAnnotation(TsMaybeAsync.class) != null) {
            String emitted = tsType(method.getReturnType());
            return emitted + " | Promise<" + emitted + ">";
        }
        String emitted = tsType(method.getReturnType());
        TsNullable nullable = method.getAnnotation(TsNullable.class);
        if (nullable == null) {
            return emitted;
        }
        return emitted + (nullable.asNull() ? " | null" : " | undefined");
    }

    private boolean isStage(TypeMirror mirror) {
        if (mirror.getKind() != TypeKind.DECLARED) {
            return false;
        }
        String qualified = ((TypeElement) ((DeclaredType) mirror).asElement()).getQualifiedName().toString();
        return "java.util.concurrent.CompletionStage".equals(qualified)
                || "java.util.concurrent.CompletableFuture".equals(qualified);
    }

    private boolean emittable(Element element) {
        if (element.getKind() == ElementKind.INTERFACE) {
            return true;
        }
        return element.getKind() == ElementKind.CLASS && element.getAnnotation(TsInterface.class).data();
    }

    /**
     * Every member of one emitted type, fields and methods alike, in one name order.
     *
     * @implNote A data-carrying class states its shape in public fields, so an emitter that walked
     * methods alone rendered it as an empty interface. Merging the two into one sorted list rather
     * than emitting fields as a leading block keeps a mixed type readable, and the comparator is the
     * one methods already used, so a type with no fields emits exactly the bytes it did before.
     * Inherited members are collected too, with the emitted type's own winning over one it
     * redeclares, because a redeclaration in Java exists precisely to carry emission annotations the
     * inherited one lacks.
     *
     * @param type the type being emitted.
     * @param spec the annotation that decided how to emit it.
     * @param discriminant the narrowing this type declares, or null when it declares none.
     * @return the members to render, sorted by name.
     * @implNote An overload set shares one name and must all be kept, so a method with parameters is
     * identified by its whole signature and only a field or a zero-argument method by name alone. A
     * zero-argument method cannot be overloaded, so two of them under one name are always an override.
     */
    private List<Member> sortedMembers(TypeElement type, TsInterface spec, TsDiscriminant discriminant) {
        List<Member> members = new ArrayList<Member>();
        Set<String> taken = new HashSet<String>();
        for (TypeElement each : selfThenSupertypes(type)) {
            for (VariableElement field : instanceFields(each)) {
                String name = field.getSimpleName().toString();
                if (taken.add(name)) {
                    members.add(new Member(name, "", field(field, literalFor(discriminant, name))));
                }
            }
            for (ExecutableElement method : sortedMethods(each)) {
                String name = method.getSimpleName().toString();
                String signature = method.toString();
                if (taken.add(method.getParameters().isEmpty() ? name : signature)) {
                    members.add(new Member(name, signature, method(method, spec)));
                }
            }
        }
        if (discriminant != null && !taken.contains(discriminant.field())) {
            processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                    "@TsDiscriminant names no field of this type: " + discriminant.field(), type);
        }
        Collections.sort(members);
        return members;
    }

    /**
     * The literal a discriminant narrows one field to.
     *
     * @param discriminant the type's narrowing, or null when it declares none.
     * @param name the field being rendered.
     * @return the quoted literal to emit as that field's type, or null to compute it as usual.
     */
    private String literalFor(TsDiscriminant discriminant, String name) {
        if (discriminant == null || !discriminant.field().equals(name)) {
            return null;
        }
        return "\"" + discriminant.value() + "\"";
    }

    private String method(ExecutableElement method, TsInterface spec) {
        TsProperty asProperty = method.getAnnotation(TsProperty.class);
        boolean property = method.getParameters().isEmpty() && (asProperty != null || spec.data());
        StringBuilder out = new StringBuilder(docBlock(method, "  ", property));
        out.append("  ");
        if (property && asProperty != null && asProperty.readOnly()) {
            out.append("readonly ");
        }
        out.append(method.getSimpleName());
        if (method.getAnnotation(TsOptional.class) != null) {
            out.append("?");
        }
        if (property) {
            out.append(": ").append(returnType(method)).append(";\n");
        } else {
            out.append(joinVars(method.getTypeParameters())).append("(").append(params(method))
                    .append("): ").append(returnType(method)).append(";\n");
        }
        return out.toString();
    }

    /**
     * @implNote {@code final} carries the {@code readonly}, so a field needs no annotation to say
     * what the Java already says, and {@link #valueType} is shared with parameters because both hold
     * a value that is either present or Java-null, never an omitted argument.
     *
     * @param field the field to render.
     * @param literalType the type to emit verbatim, or null to compute it from the Java.
     * @return the rendered member line.
     */
    private String field(VariableElement field, String literalType) {
        StringBuilder out = new StringBuilder(docBlock(field, "  ", true));
        out.append("  ");
        if (field.getModifiers().contains(Modifier.FINAL)) {
            out.append("readonly ");
        }
        out.append(field.getSimpleName());
        if (field.getAnnotation(TsOptional.class) != null) {
            out.append("?");
        }
        String emitted = literalType != null ? literalType : valueType(field);
        return out.append(": ").append(emitted).append(";\n").toString();
    }

    private List<VariableElement> instanceFields(TypeElement type) {
        List<VariableElement> fields = new ArrayList<VariableElement>();
        for (Element member : type.getEnclosedElements()) {
            if (member.getKind() == ElementKind.FIELD
                    && member.getModifiers().contains(Modifier.PUBLIC)
                    && !member.getModifiers().contains(Modifier.STATIC)) {
                fields.add((VariableElement) member);
            }
        }
        return fields;
    }

    private List<ExecutableElement> sortedMethods(TypeElement type) {
        List<ExecutableElement> methods = new ArrayList<ExecutableElement>();
        for (Element member : type.getEnclosedElements()) {
            if (member.getKind() == ElementKind.METHOD && !member.getModifiers().contains(Modifier.STATIC)) {
                methods.add((ExecutableElement) member);
            }
        }
        // Name first, signature only as a tiebreaker: toString() renders a generic method as
        // "<T>get(...)", which would otherwise sort every generic member ahead of the rest.
        Collections.sort(methods, new Comparator<ExecutableElement>() {
            @Override
            public int compare(ExecutableElement left, ExecutableElement right) {
                int byName = left.getSimpleName().toString().compareTo(right.getSimpleName().toString());
                return byName != 0 ? byName : left.toString().compareTo(right.toString());
            }
        });
        return methods;
    }

    /**
     * The type itself followed by every supertype it inherits members from, nearest first.
     *
     * @param type the emitted type to walk from.
     * @return the walk, breadth-first, each type once, without {@code java.lang.Object}.
     * @implNote Breadth-first rather than superclass-then-interfaces so a member declared on the
     * nearest supertype wins over the same name reached by a longer path, which is the resolution
     * order a reader of the Java expects.
     */
    private List<TypeElement> selfThenSupertypes(TypeElement type) {
        List<String> seen = new ArrayList<String>();
        List<TypeElement> walk = new ArrayList<TypeElement>();
        Deque<TypeElement> pending = new ArrayDeque<TypeElement>();
        pending.addLast(type);
        while (!pending.isEmpty()) {
            TypeElement each = pending.removeFirst();
            String qualified = each.getQualifiedName().toString();
            if ("java.lang.Object".equals(qualified) || seen.contains(qualified)) {
                continue;
            }
            seen.add(qualified);
            walk.add(each);
            for (TypeMirror supertype : processingEnv.getTypeUtils().directSupertypes(each.asType())) {
                Element element = processingEnv.getTypeUtils().asElement(supertype);
                if (element instanceof TypeElement) {
                    pending.addLast((TypeElement) element);
                }
            }
        }
        return walk;
    }

    /**
     * Every emitted type that has the given base among its supertypes.
     *
     * @param base the type the union is named after.
     * @param round the round to look for subtypes in.
     * @return their simple names, alphabetical, the base itself excluded.
     */
    private List<String> armsOf(TypeElement base, RoundEnvironment round) {
        String qualified = base.getQualifiedName().toString();
        List<String> arms = new ArrayList<String>();
        for (Element candidate : round.getElementsAnnotatedWith(TsInterface.class)) {
            if (candidate.equals(base) || !emittable(candidate)) {
                continue;
            }
            for (TypeElement supertype : selfThenSupertypes((TypeElement) candidate)) {
                if (qualified.equals(supertype.getQualifiedName().toString())) {
                    arms.add(candidate.getSimpleName().toString());
                    break;
                }
            }
        }
        Collections.sort(arms);
        return arms;
    }

    private String joinVars(List<? extends TypeParameterElement> vars) {
        if (vars.isEmpty()) {
            return "";
        }
        StringBuilder out = new StringBuilder("<");
        for (int i = 0; i < vars.size(); i++) {
            if (i > 0) {
                out.append(", ");
            }
            out.append(vars.get(i).getSimpleName());
        }
        return out.append(">").toString();
    }

    private String params(ExecutableElement method) {
        StringBuilder out = new StringBuilder();
        List<? extends VariableElement> parameters = method.getParameters();
        for (int i = 0; i < parameters.size(); i++) {
            if (i > 0) {
                out.append(", ");
            }
            out.append(parameters.get(i).getSimpleName()).append(": ").append(valueType(parameters.get(i)));
        }
        return out.toString();
    }

    private String valueType(VariableElement value) {
        TsRaw raw = value.getAnnotation(TsRaw.class);
        if (raw != null) {
            rawEscapes++;
            return raw.value();
        }
        String vocabulary = vocabularyName(value);
        String emitted = vocabulary != null ? vocabulary : tsType(value.asType());
        return value.getAnnotation(TsNullable.class) != null ? emitted + " | null" : emitted;
    }

    private String tsType(TypeMirror mirror) {
        switch (mirror.getKind()) {
            case VOID:
                return "void";
            case BOOLEAN:
                return "boolean";
            case INT:
            case LONG:
            case DOUBLE:
            case FLOAT:
            case SHORT:
            case BYTE:
                return "number";
            case TYPEVAR:
                return mirror.toString();
            case ARRAY:
                return tsType(((ArrayType) mirror).getComponentType()) + "[]";
            case DECLARED:
                return declared((DeclaredType) mirror);
            default:
                return "unknown";
        }
    }

    private String declared(DeclaredType type) {
        TypeElement element = (TypeElement) type.asElement();
        if (element.getKind() == ElementKind.ENUM) {
            return enumLiteral(element);
        }
        String qualified = element.getQualifiedName().toString();
        if ("java.lang.String".equals(qualified)) {
            return "string";
        }
        if ("java.lang.Boolean".equals(qualified)) {
            return "boolean";
        }
        if ("java.lang.Integer".equals(qualified) || "java.lang.Long".equals(qualified) || "java.lang.Double".equals(qualified)) {
            return "number";
        }
        if ("java.lang.Object".equals(qualified)) {
            return "unknown";
        }
        if ("java.lang.Void".equals(qualified)) {
            return "void";
        }
        if ("java.lang.Runnable".equals(qualified)) {
            return "() => void";
        }
        List<? extends TypeMirror> mapped = type.getTypeArguments();
        if ("java.util.Map".equals(qualified)) {
            return "Record<" + tsType(mapped.get(0)) + ", " + tsType(mapped.get(1)) + ">";
        }
        if ("java.util.List".equals(qualified)) {
            return tsType(mapped.get(0)) + "[]";
        }
        if ("java.util.concurrent.CompletionStage".equals(qualified)
                || "java.util.concurrent.CompletableFuture".equals(qualified)) {
            return "Promise<" + (mapped.isEmpty() ? "void" : tsType(mapped.get(0))) + ">";
        }
        if ("java.util.function.Consumer".equals(qualified)) {
            return "((value: " + tsType(mapped.get(0)) + ") => void)";
        }
        if ("java.util.function.UnaryOperator".equals(qualified)) {
            return "((value: " + tsType(mapped.get(0)) + ") => " + tsType(mapped.get(0)) + ")";
        }
        if ("java.util.function.BiConsumer".equals(qualified)) {
            return "((a: " + tsType(mapped.get(0)) + ", b: " + tsType(mapped.get(1)) + ") => void)";
        }
        if ("java.util.function.Supplier".equals(qualified)) {
            return "(() => " + tsType(mapped.get(0)) + ")";
        }
        if ("java.util.function.Predicate".equals(qualified)) {
            return "((value: " + tsType(mapped.get(0)) + ") => boolean)";
        }
        if ("java.util.function.Function".equals(qualified)) {
            return "((value: " + tsType(mapped.get(0)) + ") => " + tsType(mapped.get(1)) + ")";
        }
        if ("java.util.function.BiFunction".equals(qualified)) {
            return "((a: " + tsType(mapped.get(0)) + ", b: " + tsType(mapped.get(1)) + ") => " + tsType(mapped.get(2)) + ")";
        }
        StringBuilder out = new StringBuilder(element.getSimpleName().toString());
        List<? extends TypeMirror> args = type.getTypeArguments();
        if (!args.isEmpty()) {
            out.append("<");
            for (int i = 0; i < args.size(); i++) {
                if (i > 0) {
                    out.append(", ");
                }
                out.append(tsType(args.get(i)));
            }
            out.append(">");
        }
        return out.toString();
    }

    /**
     * @implNote An enum used purely as a type-level vocabulary (never itself annotated) emits as the
     * literal union of its constant names, so a two-value enum such as a service event becomes
     * {@code "register" | "unregister"} rather than a class name TypeScript cannot resolve.
     */
    private String enumLiteral(TypeElement element) {
        if (element.getAnnotation(TsEnum.class) != null) {
            return element.getSimpleName().toString();
        }
        return enumUnion(element);
    }

    private String enumUnion(TypeElement element) {
        StringBuilder union = new StringBuilder();
        for (Element member : element.getEnclosedElements()) {
            if (member.getKind() != ElementKind.ENUM_CONSTANT) {
                continue;
            }
            if (union.length() > 0) {
                union.append(" | ");
            }
            TsLiteral literal = member.getAnnotation(TsLiteral.class);
            String name = literal != null ? literal.value() : member.getSimpleName().toString();
            union.append("\"").append(name).append("\"");
        }
        if (element.getAnnotation(TsOpen.class) != null) {
            union.append(" | (string & {})");
        }
        return union.toString();
    }

    /**
     * One constant holder's values, rendered as the string-literal union they emit as.
     *
     * @param type the holder to read.
     * @return the union body, or the empty string when the holder declares no string constant.
     * @implNote Declaration order rather than sorted, because the order the constants are written in
     * is the order a reader of the vocabulary already knows, and javac preserves it.
     */
    private String stringConstantUnion(TypeElement type) {
        StringBuilder union = new StringBuilder();
        for (Element member : type.getEnclosedElements()) {
            if (member.getKind() != ElementKind.FIELD
                    || !member.getModifiers().contains(Modifier.PUBLIC)
                    || !member.getModifiers().contains(Modifier.STATIC)
                    || !member.getModifiers().contains(Modifier.FINAL)) {
                continue;
            }
            Object value = ((VariableElement) member).getConstantValue();
            if (!(value instanceof String)) {
                continue;
            }
            if (union.length() > 0) {
                union.append(" | ");
            }
            union.append("\"").append(value).append("\"");
        }
        if (union.length() > 0 && type.getAnnotation(TsOpen.class) != null) {
            union.append(" | (string & {})");
        }
        return union.toString();
    }

    /**
     * The emitted union name a member points at, when it points at one.
     *
     * @param member the field, parameter or method to read.
     * @return the holder's simple name, or null when the member names no vocabulary.
     * @implNote Reading the class member of an annotation throws during processing, because the class
     * is not loaded, so the type mirror the throw carries is the only way to reach the name.
     */
    private String vocabularyName(Element member) {
        TsVocabulary vocabulary = member.getAnnotation(TsVocabulary.class);
        if (vocabulary == null) {
            return null;
        }
        try {
            vocabulary.value();
            return null;
        } catch (MirroredTypeException mirrored) {
            return processingEnv.getTypeUtils().asElement(mirrored.getTypeMirror()).getSimpleName().toString();
        }
    }

    /**
     * @implNote Newlines are written literally rather than through {@code println}, whose separator
     * is the build platform's. A generated file committed on Windows and regenerated on Linux would
     * otherwise differ by line ending alone, and the drift gate would fail on one of the two.
     */
    /**
     * @implNote A module emitting only constants writes no surface file, symmetrically with a module
     * emitting only types writing no keys file, so a package never carries a generated module that
     * declares nothing.
     */
    private void write() {
        StringBuilder body = new StringBuilder();
        Collections.sort(chunks);
        for (String chunk : chunks) {
            body.append(chunk).append("\n");
        }
        try {
            if (!chunks.isEmpty()) {
                writeResource(basename() + surfaceExtension(), resolveLinks(banner(body.toString(), null)));
            }
            writeConstants();
            processingEnv.getMessager().printMessage(Diagnostic.Kind.NOTE,
                    "tsemit: " + chunks.size() + " interfaces, " + constants.size() + " constants, "
                            + rawEscapes + " raw escape hatches");
        } catch (IOException failure) {
            processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "tsemit failed: " + failure.getMessage());
        }
    }

    private void writeConstants() throws IOException {
        String reexport = reexportsSurface() ? "export type * from \"./" + basename() + ".js\";" : null;
        if (constants.isEmpty() && reexport == null) {
            return;
        }
        StringBuilder body = new StringBuilder();
        Collections.sort(constants);
        for (String constant : constants) {
            body.append(constant).append("\n");
        }
        writeResource(basename() + ".keys.ts", resolveLinks(banner(body.toString(), "./" + basename() + ".js", reexport)));
    }

    private String banner(String body, String localSpecifier) {
        return banner(body, localSpecifier, null);
    }

    private String banner(String body, String localSpecifier, String reexport) {
        StringBuilder out = new StringBuilder("// Generated from Java sources. Do not edit.\n\n");
        String imports = importLines(body, localSpecifier);
        if (!imports.isEmpty()) {
            out.append(imports).append("\n");
        }
        if (reexport != null) {
            out.append(reexport).append("\n\n");
        }
        return out.append(body).toString();
    }

    private void writeResource(String name, String content) throws IOException {
        Writer writer = processingEnv.getFiler()
                .createResource(StandardLocation.CLASS_OUTPUT, "", name).openWriter();
        try {
            writer.write(content);
        } finally {
            writer.close();
        }
    }

    private String basename() {
        return option("tsemit.name", "api");
    }

    /**
     * @implNote The surface's suffix is a choice, not a constant: an ambient {@code .d.ts} is right
     * for a repo whose generated file sits outside its TypeScript rootDir, and a compilable
     * {@code .ts} is right for one whose whole package IS the generated surface, because tsc copies
     * a declaration file to no output directory.
     */
    private String surfaceExtension() {
        return option("tsemit.ext", ".d.ts");
    }

    /**
     * @implNote Off by default, because a package carrying its own barrel re-exports the surface
     * there and a second copy in the keys file would give one module two entry points. On is right
     * where the keys file IS the package root, which is the only way a single generated file can
     * serve both the types a consumer imports and the constants it calls at run time.
     */
    private boolean reexportsSurface() {
        return "true".equals(option("tsemit.reexport", ""));
    }

    private String option(String key, String fallback) {
        String value = processingEnv.getOptions().get(key);
        return value == null || value.isEmpty() ? fallback : value;
    }

    /**
     * @implNote A file never imports a name it declares, which is why the surface passes its own
     * emitted types as already-declared: api's surface both declares {@code CapabilityType} and
     * references it, and importing it from itself is a cycle the emitted text cannot resolve. The
     * keys file is a separate file and declares none of them, so it imports every name it uses.
     */
    private String importLines(String body, String localSpecifier) {
        List<String> declared = localSpecifier == null ? emittedTypes : Collections.<String>emptyList();
        StringBuilder out = new StringBuilder();
        out.append(importLine(body, option("tsemit.keys", "./api.js"), KEY_TYPES, declared));
        if (localSpecifier != null) {
            out.append(importLine(body, localSpecifier, emittedTypes, declared));
        }
        for (String entry : option("tsemit.imports", "").split(";")) {
            int split = entry.indexOf('=');
            if (split <= 0) {
                continue;
            }
            List<String> names = new ArrayList<String>();
            for (String name : entry.substring(split + 1).split(",")) {
                if (!name.trim().isEmpty()) {
                    names.add(name.trim());
                }
            }
            out.append(importLine(body, entry.substring(0, split), names, declared));
        }
        return out.toString();
    }

    /**
     * @implNote Only names the emitted text actually mentions are imported, because a consumer
     * compiling with noUnusedLocals rejects a generated file carrying an import it does not use.
     */
    private String importLine(String body, String specifier, List<String> candidates, List<String> declared) {
        List<String> used = new ArrayList<String>();
        for (String candidate : candidates) {
            if (!used.contains(candidate) && !declared.contains(candidate) && mentions(body, candidate)) {
                used.add(candidate);
            }
        }
        if (used.isEmpty()) {
            return "";
        }
        Collections.sort(used);
        StringBuilder line = new StringBuilder("import type { ");
        for (int i = 0; i < used.size(); i++) {
            if (i > 0) {
                line.append(", ");
            }
            line.append(used.get(i));
        }
        return line.append(" } from \"").append(specifier).append("\";\n").toString();
    }

    /**
     * @implNote Whole-word rather than substring: {@code ScreenData} contains {@code Screen}, and a
     * substring match would import a name the file never references.
     */
    private boolean mentions(String body, String name) {
        int at = body.indexOf(name);
        while (at >= 0) {
            boolean leftClean = at == 0 || !Character.isJavaIdentifierPart(body.charAt(at - 1));
            int after = at + name.length();
            boolean rightClean = after >= body.length() || !Character.isJavaIdentifierPart(body.charAt(after));
            if (leftClean && rightClean) {
                return true;
            }
            at = body.indexOf(name, at + 1);
        }
        return false;
    }

    /** One rendered member, sorted by name with the signature as the tiebreaker a field leaves empty. */
    private static final class Member implements Comparable<Member> {
        private final String name;
        private final String signature;
        private final String text;

        Member(String name, String signature, String text) {
            this.name = name;
            this.signature = signature;
            this.text = text;
        }

        @Override
        public int compareTo(Member other) {
            int byName = name.compareTo(other.name);
            return byName != 0 ? byName : signature.compareTo(other.signature);
        }
    }
}
