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
    <div key={expense.id} className="border p-4 mb-4 rounded">
     <h2 className="text-xl font-bold">{expense.name}</h2>
     <p>Company: {expense.company}</p>
     <p>Amount: {expense.amount}</p>
     <p>Date: {expense.date}</p>
     <p>Category: {expense.category}</p>
     <p>Type: {expense.type}</p>
     <div className="mt-8">
      <Button
       variant="outline"
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
