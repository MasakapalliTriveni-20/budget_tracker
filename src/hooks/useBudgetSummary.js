import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export function useBudgetSummary() {
  const { income, expenses, transactions } = useContext(BudgetContext);
  const remaining = income - expenses;
  return { income, expenses, remaining, transactions };
}
