import ExpenseForm from './components/form/ExpenseForm';

import reducer from './reducer';
import { useEffect, useReducer } from 'react';
import type { Expense } from './types/type';
import ExpenseList from './components/ExpenseList';

function App() {
 const [expenses, dispatch] = useReducer(
  reducer,
  JSON.parse(localStorage.getItem('expenses') || '[]'),
 );

 useEffect(() => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
 }, [expenses]);

 const handleAddExpense = (expense: Expense) => {
  dispatch({ type: 'ADD_EXPENSE', payload: expense });
 };

 const handleDelete = (id: string) => {
  dispatch({ type: 'DELETE_EXPENSE', payload: id });
 };

 return (
  <div className="max-w-7xl mx-auto p-8">
   <h1 className="text-3xl font-bold underline">Expense Tracker</h1>
   <ExpenseForm onAdd={handleAddExpense} />
   <ExpenseList expenses={expenses} onDelete={handleDelete} />
  </div>
 );
}

export default App;
