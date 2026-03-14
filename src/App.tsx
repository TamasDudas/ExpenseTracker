import ExpenseForm from './components/form/ExpenseForm';

import reducer from './reducer';
import { useEffect, useMemo, useReducer, useState } from 'react';
import type { Expense } from './types/type';
import ExpenseList from './components/ExpenseList';

function App() {
 const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

 const [expenses, dispatch] = useReducer(
  reducer,
  JSON.parse(localStorage.getItem('expenses') || '[]'),
 );

 const totalExpense = useMemo(
  () =>
   expenses
    .filter((expense) => expense.type === 'expense')
    .reduce((acc, expense) => acc + expense.amount, 0),
  [expenses],
 );

 const totalIncome = useMemo(
  () =>
   expenses
    .filter((expense) => expense.type === 'income')
    .reduce((acc, expense) => acc + expense.amount, 0),
  [expenses],
 );

 const total = totalIncome - totalExpense;

 useEffect(() => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
 }, [expenses]);

 const handleAddExpense = (expense: Expense) => {
  dispatch({ type: 'ADD_EXPENSE', payload: expense });
 };

 const handleDelete = (id: string) => {
  dispatch({ type: 'DELETE_EXPENSE', payload: id });
 };

 const handleEdit = (expense: Expense) => {
  setEditingExpense(expense);
 };

 const handleUpdate = (expense: Expense) => {
  dispatch({ type: 'UPDATE_EXPENSE', payload: expense });
  setEditingExpense(null);
 };

 console.log('Total:', total);
 console.log('Total Expense:', totalExpense);
 console.log('Total Income:', totalIncome);

 return (
  <div className="max-w-7xl mx-auto p-8">
   <h1 className="text-3xl font-bold underline">Expense Tracker</h1>
   <ExpenseForm
    onAdd={handleAddExpense}
    editingExpense={editingExpense}
    onUpdate={handleUpdate}
   />
   <ExpenseList
    expenses={expenses}
    onDelete={handleDelete}
    onEdit={handleEdit}
   />
  </div>
 );
}

export default App;
