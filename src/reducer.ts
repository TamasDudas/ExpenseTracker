import type { Action, Expense } from './types/type';

const reducer = (state: Expense[], action: Action) => {
 switch (action.type) {
  case 'ADD_EXPENSE':
   return [...state, action.payload];
  case 'DELETE_EXPENSE':
   return state.filter((expense) => expense.id !== action.payload);
  case 'UPDATE_EXPENSE':
   return state.map((expense) =>
    expense.id === action.payload.id ? action.payload : expense,
   );
  default:
   return state;
 }
};

export default reducer;
