import { createPluginHost } from "../../generated/engine";

// A host must name the application it hosts. Omitting it produced a descriptor whose `app` was null
// against a type declaring it a string, so a plugin reading `context.host.app` faulted with nothing
// in the types to warn it.
export const hostWithoutAnApp = createPluginHost({ api: 2 });
