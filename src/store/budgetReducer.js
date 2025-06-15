export const initialState = {
  income: 0,
  expenses: 0,
  transactions: [],
};

export function budgetReducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    default:
      return state;
  }
}
