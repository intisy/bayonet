package io.github.intisy.ai.seam.jvm;

import io.github.intisy.ai.engine.Diagnostics;
import io.github.intisy.ai.engine.Handles;
import io.github.intisy.ai.engine.ServiceRevoked;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.ArrayList;
import java.util.List;

/**
 * Wraps a served service in a JDK dynamic proxy, so a consumer still holding one after it is
 * withdrawn is told rather than calling into a dead object.
 *
 * @implNote JVM only, which is why it lives here and not in the engine: the engine transpiles, and
 * a dynamic proxy is not a thing the JavaScript target has in this sense. A JavaScript host backs
 * the same seam with the language's own Proxy, which needs no reflection at all.
 */
public final class ReflectiveHandles implements Handles {

    @Override
    public Handle around(String serviceId, Object service) {
        List<Class<?>> interfaces = interfacesOf(service.getClass());
        if (interfaces.isEmpty()) {
            return unwrappable(serviceId, service, "it implements no interface");
        }
        try {
            return new Revocable(serviceId, service, interfaces.toArray(new Class<?>[0]));
        } catch (IllegalArgumentException refused) {
            return unwrappable(serviceId, service, "no proxy can stand in for it: " + refused.getMessage());
        }
    }

    private static Handle unwrappable(String serviceId, Object service, String why) {
        Diagnostics.report("service \"" + serviceId + "\" cannot be wrapped because " + why
                + ", so a consumer holding it will not be told when it is withdrawn");
        return new Unwrapped(service);
    }

    /**
     * @implNote The whole hierarchy, not {@code getClass().getInterfaces()}, which answers only the
     * interfaces the concrete class declares ITSELF. A service whose interface sits on an abstract
     * base is the ordinary shape, and reading only the concrete class would report it unwrappable
     * while quietly handing it over.
     */
    private static List<Class<?>> interfacesOf(Class<?> type) {
        List<Class<?>> found = new ArrayList<Class<?>>();
        for (Class<?> current = type; current != null; current = current.getSuperclass()) {
            collect(current.getInterfaces(), found);
        }
        return found;
    }

    private static void collect(Class<?>[] declared, List<Class<?>> found) {
        for (Class<?> each : declared) {
            if (found.contains(each)) {
                continue;
            }
            found.add(each);
            collect(each.getInterfaces(), found);
        }
    }

    private static final class Unwrapped implements Handle {
        private final Object service;

        Unwrapped(Object service) {
            this.service = service;
        }

        @Override
        public Object get() {
            return service;
        }

        @Override
        public void revoke() {
        }
    }

    /**
     * @implNote The proxy is defined on the SERVICE's own classloader, which is the one that can
     * see every interface it implements. Defining it on this class's loader fails outright for a
     * service loaded from a plugin's jar.
     */
    private static final class Revocable implements Handle, InvocationHandler {
        private final String serviceId;
        private final Object proxy;
        private volatile Object target;

        Revocable(String serviceId, Object service, Class<?>[] interfaces) {
            this.serviceId = serviceId;
            this.target = service;
            this.proxy = Proxy.newProxyInstance(service.getClass().getClassLoader(), interfaces, this);
        }

        @Override
        public Object get() {
            return proxy;
        }

        @Override
        public void revoke() {
            target = null;
        }

        /**
         * @implNote {@code toString} answers on a revoked handle rather than throwing. The natural
         * implementation forwards it to the target, so a logger stringifying a dead handle inside
         * a catch block would throw from within error handling and replace the real failure.
         */
        @Override
        public Object invoke(Object self, Method method, Object[] arguments) throws Throwable {
            Object served = target;
            if ("equals".equals(method.getName()) && method.getParameterTypes().length == 1) {
                return Boolean.valueOf(self == arguments[0]);
            }
            if ("hashCode".equals(method.getName()) && method.getParameterTypes().length == 0) {
                return Integer.valueOf(System.identityHashCode(self));
            }
            if ("toString".equals(method.getName()) && method.getParameterTypes().length == 0) {
                return served == null ? "revoked handle to \"" + serviceId + "\"" : String.valueOf(served);
            }
            if (served == null) {
                throw new ServiceRevoked(serviceId);
            }
            try {
                return method.invoke(served, arguments);
            } catch (InvocationTargetException failure) {
                throw failure.getCause();
            }
        }
    }
}
