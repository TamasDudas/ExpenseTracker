import ExpenseForm from './components/form/ExpenseForm';
import reducer from './reducer';
import { useEffect, useReducer } from 'react';

function App() {
 const [expenses, dispatch] = useReducer(
  reducer,
  JSON.parse(localStorage.getItem('expenses') || '[]'),
 );

 useEffect(() => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
 }, [expenses]);

 return (
  <div className="max-w-7xl mx-auto p-8">
   <h1 className="text-3xl font-bold underline">Expense Tracker</h1>
   <ExpenseForm />
  </div>
 );
}

export default App;
