package io.github.intisy.ai.conformance;

import io.github.intisy.ai.engine.Scheduler;

import java.util.ArrayList;
import java.util.List;

/**
 * The clock the driver advances by hand.
 *
 * @implNote A vector's budget is logical, so a 30 second one must cost no wall clock: every
 * scheduled tick runs the moment the driver asks for it.
 */
final class ManualScheduler implements Scheduler {

    private final List<Runnable> pending = new ArrayList<Runnable>();

    @Override
    public Cancellable schedule(final Runnable task, long delayMillis) {
        pending.add(task);
        return new Cancellable() {
            @Override
            public void cancel() {
                pending.remove(task);
            }
        };
    }

    void fireAll() {
        List<Runnable> due = new ArrayList<Runnable>(pending);
        pending.clear();
        for (Runnable task : due) {
            task.run();
        }
    }
}
