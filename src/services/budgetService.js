// Placeholder for budget-related API or logic
export function getBudgetSummary(transactions) {
  let income = 0;
  let expenses = 0;
  transactions.forEach((t) => {
    if (t.amount > 0) income += t.amount;
    else expenses += Math.abs(t.amount);
  });
  return { income, expenses };
}
