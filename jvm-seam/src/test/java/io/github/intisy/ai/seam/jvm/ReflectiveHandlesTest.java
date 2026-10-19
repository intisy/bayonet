package io.github.intisy.ai.seam.jvm;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import io.github.intisy.ai.engine.Diagnostics;
import io.github.intisy.ai.engine.Handles;
import io.github.intisy.ai.engine.ServiceRevoked;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

class ReflectiveHandlesTest {

    /** The service a consumer holds, which exists only so there is an interface to proxy. */
    public interface Accounts {
        String name();
    }

    private static final class RealAccounts implements Accounts {
        @Override
        public String name() {
            return "the real accounts";
        }
    }

    /** A service with no interface at all, which a JDK proxy cannot stand in for. */
    public static final class BareAccounts {
        public String name() {
            return "bare";
        }
    }

    @Test
    void servesThroughTheHandleUntilItIsRevoked() {
        Handles.Handle handle = new ReflectiveHandles().around("accounts", new RealAccounts());
        assertEquals("the real accounts", ((Accounts) handle.get()).name());
    }

    @Test
    void aRevokedHandleSaysSoRatherThanCallingADeadService() {
        Handles.Handle handle = new ReflectiveHandles().around("accounts", new RealAccounts());
        final Accounts held = (Accounts) handle.get();
        handle.revoke();
        ServiceRevoked revoked = assertThrows(ServiceRevoked.class, new Executable() {
            @Override
            public void execute() {
                held.name();
            }
        });
        assertEquals("accounts", revoked.getServiceId());
    }

    @Test
    void aRevokedHandleStillStringifies() {
        Handles.Handle handle = new ReflectiveHandles().around("accounts", new RealAccounts());
        Object held = handle.get();
        handle.revoke();
        assertNotNull(held.toString());
        assertTrue(held.toString().contains("accounts"), held.toString());
    }

    @Test
    void reportsAServiceItCannotWrapRatherThanPretending() {
        final List<String> reports = new ArrayList<String>();
        Diagnostics.setSink(new Diagnostics.Sink() {
            @Override
            public void accept(String message) {
                reports.add(message);
            }
        });
        try {
            BareAccounts bare = new BareAccounts();
            Handles.Handle handle = new ReflectiveHandles().around("accounts", bare);
            assertSame(bare, handle.get());
            assertEquals(1, reports.size(), reports.toString());
            assertTrue(reports.get(0).contains("accounts"), reports.get(0));
        } finally {
            Diagnostics.setSink(null);
        }
    }
}
