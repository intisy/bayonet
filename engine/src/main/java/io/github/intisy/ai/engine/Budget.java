package io.github.intisy.ai.engine;

/** How long a consumer re-asks for a service that does not satisfy it yet, and how often. */
public final class Budget {

    private final long budgetMillis;
    private final long pollMillis;

    private Budget(long budgetMillis, long pollMillis) {
        this.budgetMillis = budgetMillis;
        this.pollMillis = pollMillis;
    }

    /**
     * @param budgetMillis how long to keep re-asking before degrading or refusing
     * @param pollMillis how long to wait between asks
     * @return the budget those two describe
     */
    public static Budget of(long budgetMillis, long pollMillis) {
        return new Budget(budgetMillis, pollMillis);
    }

    /** @return how long to keep re-asking before degrading or refusing, in milliseconds */
    public long getBudgetMillis() {
        return budgetMillis;
    }

    /** @return how long to wait between asks, in milliseconds */
    public long getPollMillis() {
        return pollMillis;
    }
}
