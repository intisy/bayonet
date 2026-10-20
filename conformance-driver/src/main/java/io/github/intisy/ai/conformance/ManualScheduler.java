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

    private static final class Tick {
        final Runnable task;
        final long dueMillis;

        Tick(Runnable task, long dueMillis) {
            this.task = task;
            this.dueMillis = dueMillis;
        }
    }

    private final List<Tick> pending = new ArrayList<Tick>();
    private long nowMillis;

    @Override
    public Cancellable schedule(final Runnable task, long delayMillis) {
        final Tick tick = new Tick(task, nowMillis + Math.max(0L, delayMillis));
        pending.add(tick);
        return new Cancellable() {
            @Override
            public void cancel() {
                pending.remove(tick);
            }
        };
    }

    /** Runs every tick scheduled so far, whenever it is due, without moving the clock. */
    void fireAll() {
        List<Tick> due = new ArrayList<Tick>(pending);
        pending.clear();
        for (Tick tick : due) {
            tick.task.run();
        }
    }

    /**
     * Moves the clock to {@code millis}, running each tick due by then in due order, including ticks
     * scheduled by ticks that ran on the way.
     */
    void advanceTo(long millis) {
        Tick next = earliestDueBy(millis);
        while (next != null) {
            pending.remove(next);
            nowMillis = next.dueMillis;
            next.task.run();
            next = earliestDueBy(millis);
        }
        nowMillis = Math.max(nowMillis, millis);
    }

    long now() {
        return nowMillis;
    }

    private Tick earliestDueBy(long millis) {
        Tick earliest = null;
        for (Tick tick : pending) {
            if (tick.dueMillis <= millis && (earliest == null || tick.dueMillis < earliest.dueMillis)) {
                earliest = tick;
            }
        }
        return earliest;
    }
}
