package io.github.intisy.ai.conformance;

import io.github.intisy.ai.engine.Pending;
import io.github.intisy.ai.engine.PluginException;

/** What a pending value settled as, held so the driver can answer with it. */
class Settlement implements Pending.Settlement<Object> {

    Object value;
    PluginException failure;

    @Override
    public void value(Object result) {
        this.value = result;
    }

    @Override
    public void failure(PluginException reason) {
        this.failure = reason;
    }

    boolean settled() {
        return value != null || failure != null;
    }
}
