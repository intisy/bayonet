package io.github.intisy.ai.tsemit;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import org.junit.jupiter.api.Test;

class FunctionTypeEmissionTest {

    @Test
    void aSingleMethodInterfaceEmitsAsAFunctionType() {
        String emitted = EmitHarness.surface(String.join("\n",
                "package fixture;",
                "import io.github.intisy.ai.tsemit.TsFn;",
                "/** The host's transport. */",
                "@TsFn",
                "interface Exec {",
                "  String execute(String accountId, String prepared);",
                "}"));
        assertTrue(emitted.contains(String.join("\n",
                "/** The host's transport. */",
                "export type Exec = (accountId: string, prepared: string) => string;")), emitted);
    }

    @Test
    void itReachesPastWhatJavaUtilFunctionCanSay() {
        String emitted = EmitHarness.surface(String.join("\n",
                "package fixture;",
                "import io.github.intisy.ai.tsemit.TsFn;",
                "import io.github.intisy.ai.tsemit.TsNullable;",
                "import java.util.concurrent.CompletionStage;",
                "@TsFn",
                "interface Load {",
                "  @TsNullable(asNull = true)",
                "  CompletionStage<String> load(String access, String project, String proxy);",
                "}"));
        assertTrue(emitted.contains(
                "export type Load = (access: string, project: string, proxy: string) => Promise<string> | null;"),
                emitted);
    }

    @Test
    void aMemberNamingOneEmitsTheAliasRatherThanAnObject() {
        String emitted = EmitHarness.surface(String.join("\n",
                "package fixture;",
                "import io.github.intisy.ai.tsemit.TsFn;",
                "import io.github.intisy.ai.tsemit.TsInterface;",
                "@TsFn",
                "interface Sink {",
                "  void save(String data);",
                "}",
                "@TsInterface",
                "interface Ops {",
                "  void run(Sink sink);",
                "}"));
        assertTrue(emitted.contains("run(sink: Sink): void;"), emitted);
        assertTrue(emitted.contains("export type Sink = (data: string) => void;"), emitted);
    }

    @Test
    void aDefaultMethodIsNotPartOfTheCallSignature() {
        String emitted = EmitHarness.surface(String.join("\n",
                "package fixture;",
                "import io.github.intisy.ai.tsemit.TsFn;",
                "@TsFn",
                "interface Hash {",
                "  String hash(String input);",
                "  default String twice(String input) { return hash(hash(input)); }",
                "}"));
        assertTrue(emitted.contains("export type Hash = (input: string) => string;"), emitted);
        assertFalse(emitted.contains("twice"), emitted);
    }

    @Test
    void anInterfaceWithSeveralAbstractMethodsIsRefused() {
        List<String> errors = EmitHarness.errors("fixture.Unit", String.join("\n",
                "package fixture;",
                "import io.github.intisy.ai.tsemit.TsFn;",
                "@TsFn",
                "interface Store {",
                "  String get(String key);",
                "  void set(String key, String value);",
                "}"));
        assertTrue(errors.toString().contains("exactly one abstract method"), errors.toString());
    }

    @Test
    void aClassIsRefused() {
        List<String> errors = EmitHarness.errors("fixture.Unit", String.join("\n",
                "package fixture;",
                "import io.github.intisy.ai.tsemit.TsFn;",
                "@TsFn",
                "class Holder {",
                "  public String value;",
                "}"));
        assertTrue(errors.toString().contains("@TsFn applies only to interfaces"), errors.toString());
    }
}
