import ExpenseForm from './components/form/ExpenseForm';

import reducer from './reducer';
import { useEffect, useMemo, useReducer, useState } from 'react';
import type { Expense } from './types/type';
import ExpenseList from './components/ExpenseList';
import { Button } from './components/ui/button';

function App() {
 const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
 const [filtered, setFiltered] = useState<'all' | 'income' | 'expense'>('all');

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

 const filteredExpenses = useMemo(() => {
  if (filtered === 'all') return expenses;
  return expenses.filter((expense) => expense.type === filtered);
 }, [expenses, filtered]);

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

 const getVariant = (value: 'all' | 'income' | 'expense') => {
  return filtered === value ? 'default' : 'outline';
 };
 return (
  <div className="max-w-7xl mx-auto p-8">
   <h1 className="text-3xl font-bold underline my-12">Expense Tracker</h1>

   <ExpenseForm
    onAdd={handleAddExpense}
    editingExpense={editingExpense}
    onUpdate={handleUpdate}
   />
   <div className="max-w-xl mx-auto ">
    <Button variant={getVariant('all')} onClick={() => setFiltered('all')}>
     All
    </Button>
    <Button
     variant={getVariant('income')}
     onClick={() => setFiltered('income')}
    >
     Income
    </Button>
    <Button
     variant={getVariant('expense')}
     onClick={() => setFiltered('expense')}
    >
     Expense
    </Button>

    <ExpenseList
     expenses={filteredExpenses}
     onDelete={handleDelete}
     onEdit={handleEdit}
    />
   </div>
  </div>
 );
}

export default App;
