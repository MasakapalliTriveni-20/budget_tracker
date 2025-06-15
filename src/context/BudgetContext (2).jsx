import { createContext, useReducer } from "react";

export const BudgetContext = createContext();

const initialState = {
  income: 0,
  expenses: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "SET_INCOME":
      return {
        ...state,
        income: action.payload,
      };
    default:
      return state;
  }
};

export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};
