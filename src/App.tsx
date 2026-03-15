import ExpenseForm from './components/form/ExpenseForm';
import reducer from './reducer';
import { useEffect, useMemo, useReducer, useState } from 'react';
import type { Expense } from './types/type';
import ExpenseList from './components/ExpenseList';
import { Button } from './components/ui/button';
import { CancelAlertDialog } from './components/CancelAlertDialog';

function App() {
 const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
 const [filtered, setFiltered] = useState<'all' | 'income' | 'expense'>('all');
 const [deletingId, setDeletingId] = useState<string | null>(null);

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

 const handleDelete = () => {
  if (deletingId) dispatch({ type: 'DELETE_EXPENSE', payload: deletingId });
  setDeletingId(null);
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

 const displayTotal =
  filtered === 'all'
   ? total
   : filtered === 'income'
     ? totalIncome
     : -totalExpense;
 return (
  <div className="max-w-3xl mx-auto p-8 flex flex-col items-center">
   <CancelAlertDialog
    open={deletingId !== null}
    onOpenChange={(open) => !open && setDeletingId(null)}
    onDelete={handleDelete}
   />
   <h1 className="text-3xl font-bold underline my-12">Expense Tracker</h1>

   <ExpenseForm
    onAdd={handleAddExpense}
    editingExpense={editingExpense}
    onUpdate={handleUpdate}
   />
   <div className="w-full ">
    <div className="flex gap-4 items-center justify-center">
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
    </div>
    <div className="flex justify-center gap-8 mt-4">
     <p>Total: {displayTotal} Ft</p>
    </div>
   </div>
   <div className="w-full">
    {filteredExpenses.length === 0 ? (
     <p className="text-center mt-8">{`No ${filtered} found.`}</p>
    ) : (
     <ExpenseList
      expenses={filteredExpenses}
      onDelete={setDeletingId}
      onEdit={handleEdit}
     />
    )}
   </div>
  </div>
 );
}

export default App;
