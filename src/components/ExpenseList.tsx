import type { Expense } from '../types/type';
import { Button } from './ui/button';

interface ExpenseListProps {
 expenses: Expense[];
 editingExpense?: Expense | null;
 onDelete?: (id: string) => void;
 onEdit?: (expense: Expense) => void;
}

export default function ExpenseList({
 expenses,
 onDelete,
 onEdit,
}: ExpenseListProps) {
 return (
  <div>
   {expenses.map((expense) => (
    <div
     key={expense.id}
     className="border p-4 my-8 rounded flex flex-col justify-center items-center "
    >
     <div className="flex items-center gap-4">
      <h2 className="text-xl font-bold">{expense.name}</h2>
      <p>Company: {expense.company}</p>
     </div>
     <div className="flex flex-col gap-4 my-8 justify-center items-center">
      <p>Amount: {expense.amount}</p>
      <p>Date: {expense.date}</p>
      <p>Category: {expense.category}</p>
      <p>Type: {expense.type}</p>
     </div>
     <div className="flex gap-4">
      <Button
       variant="destructive"
       size="sm"
       onClick={() => onDelete?.(expense.id)}
      >
       Törlés
      </Button>
      <Button variant="outline" size="sm" onClick={() => onEdit?.(expense)}>
       Szerkesztés
      </Button>
     </div>
    </div>
   ))}
  </div>
 );
}
