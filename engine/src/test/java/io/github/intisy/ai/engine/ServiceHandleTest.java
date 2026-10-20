package io.github.intisy.ai.engine;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

/** What a consumer receives from a lookup, and what happens to it when the service goes away. */
class ServiceHandleTest {

    /** A wrapping that counts, so a lookup minting a fresh handle each time is visible. */
    private static final class CountingHandles implements Handles {
        private int wrapped;
        private int revoked;

        @Override
        public Handle around(final String serviceId, final Object service) {
            wrapped++;
            return new Handle() {
                @Override
                public Object get() {
                    return service;
                }

                @Override
                public void revoke() {
                    revoked++;
                }
            };
        }
    }

    private static final class RefusesUnconstrained implements ServiceProvider {
        @Override
        public Map<String, Double> attributes() {
            return Collections.emptyMap();
        }

        @Override
        public Object serviceFor(Map<String, Double> constraints) {
            return constraints.isEmpty() ? null : "the constrained service";
        }
    }

    private static ServiceHub hub(Handles handles) {
        ServiceHub hub = new ServiceHub(Scheduler.NEVER, null);
        hub.wellKnown(Arrays.asList("accounts"));
        hub.handles(handles);
        return hub;
    }

    @Test
    void handsTheSameConsumerTheSameHandleEveryTime() {
        CountingHandles handles = new CountingHandles();
        ServiceHub hub = hub(handles);
        hub.forPlugin("store").register("accounts", "the service");
        Object first = hub.get("accounts");
        Object second = hub.get("accounts");
        assertSame(first, second, "a lookup must not mint a new handle over the same instance");
        assertTrue(handles.wrapped <= 1, "wrapped " + handles.wrapped + " times for one instance");
    }

    @Test
    void revokesOneHandlePerInstanceRatherThanOnePerLookup() {
        CountingHandles handles = new CountingHandles();
        ServiceHub hub = hub(handles);
        Scheduler.Cancellable registration = hub.forPlugin("store").register("accounts", "the service");
        for (int lookup = 0; lookup < 5; lookup++) {
            hub.get("accounts");
        }
        registration.cancel();
        assertTrue(handles.revoked <= 1, "revoked " + handles.revoked + " times for one instance");
    }

    @Test
    void aHandleServedWhileTheServiceIsBeingWithdrawnIsRevokedToo() {
        final CountingHandles handles = new CountingHandles();
        final ServiceHub hub = hub(handles);
        final List<Scheduler.Cancellable> registration = new ArrayList<Scheduler.Cancellable>();
        registration.add(hub.forPlugin("store").register("accounts", new ServiceProvider() {
            @Override
            public Map<String, Double> attributes() {
                return Collections.emptyMap();
            }

            @Override
            public Object serviceFor(Map<String, Double> constraints) {
                registration.get(0).cancel();
                return "the service";
            }
        }, null));
        hub.get("accounts");
        assertTrue(handles.revoked >= 1, "a handle handed out during the withdrawal was never revoked");
    }

    @Test
    void doesNotAnnounceAnArrivalItCannotServe() {
        final List<Object> delivered = new ArrayList<Object>();
        ServiceHub hub = hub(new CountingHandles());
        hub.forPlugin("reader").watch("accounts", new ServiceHub.Listener() {
            @Override
            public void changed(Object service, boolean registered) {
                if (registered) {
                    delivered.add(service);
                }
            }
        });
        final List<Object> settled = new ArrayList<Object>();
        hub.forPlugin("reader").want("accounts").then(new Pending.Settlement<Object>() {
            @Override
            public void value(Object result) {
                settled.add(result);
            }

            @Override
            public void failure(PluginException reason) {
            }
        });
        hub.forPlugin("store").register("accounts", new RefusesUnconstrained(), null);
        assertTrue(delivered.isEmpty(), "a watcher was told a service arrived and handed " + delivered);
        assertTrue(settled.isEmpty(), "a waiter was resolved with " + settled);
        assertNull(hub.get("accounts"));
        assertFalse(hub.ids().isEmpty(), "the registration itself still stands");
    }
}
