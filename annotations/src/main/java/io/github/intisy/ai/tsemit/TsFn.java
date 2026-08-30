package io.github.intisy.ai.tsemit;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Emit the annotated single-method interface as a TypeScript function type rather than an object.
 *
 * @implNote A TeaVM {@code JSFunctor} is a plain function on the JavaScript side, so a caller passes
 * a function and an object type would be wrong. {@link TsInterface} cannot say this: it always emits
 * a named member, which forces the caller to wrap the function in an object.
 *
 * <p>It also covers what {@code java.util.function} cannot reach. Those types stop at two arguments
 * and cannot make a type argument nullable, so a three-, four- or nine-parameter functor, or one
 * answering {@code Promise<string | null>}, had no vocabulary at all and had to be written out with
 * {@link TsRaw}. Declaring the real Java shape and annotating it says the same thing with the Java
 * as the source.
 */
@Retention(RetentionPolicy.SOURCE)
@Target(ElementType.TYPE)
public @interface TsFn {
}
