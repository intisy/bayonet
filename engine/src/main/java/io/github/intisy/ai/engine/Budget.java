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
     * @param pollMillis how long to wait between asks, which must be positive
     * @return the budget those two describe
     * @throws IllegalArgumentException when {@code pollMillis} is not positive, which would spend
     * no budget per poll and so re-ask for ever
     */
    public static Budget of(long budgetMillis, long pollMillis) {
        if (pollMillis <= 0) {
            throw new IllegalArgumentException("a budget polls every " + pollMillis
                    + " ms, which never reaches its deadline: give it a positive interval");
        }
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
