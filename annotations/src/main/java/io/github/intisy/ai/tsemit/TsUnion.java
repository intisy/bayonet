package io.github.intisy.ai.tsemit;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Emit the return type as a union of the named arms.
 *
 * @implNote Java has no union type, and the alternative was verbatim text. The arms are named
 * separately so the processor still knows this is a type reference rather than arbitrary TypeScript,
 * and a {@code CompletionStage} return keeps its promise wrapper: the Java declares the primary arm,
 * so the signature stays meaningful to a Java caller.
 */
@Retention(RetentionPolicy.SOURCE)
@Target(ElementType.METHOD)
public @interface TsUnion {
    /** @return the type names to join into the emitted union, in order */
    String[] value();

    /**
     * Join the arms as the ELEMENT type of an array rather than as the whole return type.
     *
     * @implNote For a list whose entries may each be written either way, which is how a manifest
     * field accepts both a bare id and the object form that says more about it. Without this the
     * only emittable shapes are {@code string[] | Thing[]}, which forbids the mixed list the schema
     * allows, and a verbatim {@link TsRaw}, which stops the Java being the source.
     *
     * @return true to emit {@code (a | b)[]}, false to emit {@code a | b}
     */
    boolean element() default false;

    /**
     * Wrap the union in a promise even though the Java return is synchronous.
     *
     * @implNote For a contract whose Java side is deliberately sync because it must transpile, while
     * the JavaScript boundary is a promise: a TeaVM {@code @JSExport} shim returns a
     * {@code JSPromise} around a synchronous call, so the promise belongs to the boundary rather than
     * to the portable signature. Without this the only way to emit the wrapper would be to make the
     * Java return a {@code CompletionStage}, which would put an async type in an SPI that has no use
     * for one.
     *
     * @return true to wrap the union in a promise, false to emit it as a plain synchronous type
     */
    boolean async() default false;
}
