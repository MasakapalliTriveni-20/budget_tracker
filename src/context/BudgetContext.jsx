import React, { createContext, useContext, useReducer, useEffect } from "react";

export const BudgetContext = createContext();

// Initial state
const getInitialState = () => {
  const localData = localStorage.getItem("budget-data");
  return localData
    ? JSON.parse(localData)
    : {
        transactions: [],
        settings: {
          currency: "₹",
          budgetLimit: 0,
          theme: "light",
        },
      };
};

// Reducer function
const budgetReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (txn) => txn.id !== action.payload
        ),
      };
    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    default:
      return state;
  }
};

export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(budgetReducer, {}, getInitialState);

  useEffect(() => {
    localStorage.setItem("budget-data", JSON.stringify(state));
  }, [state]);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};

// Hook to use context
export const useBudget = () => useContext(BudgetContext);
