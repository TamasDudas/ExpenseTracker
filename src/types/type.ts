export interface Expense {
  id: number;
  name: string;
  company: string;
  amount: number;
  date: string;
  category: Category;

  type: 'income' | 'expense';
}

export type Category =
  | 'Étel'
  | 'Szórakozás'
  | 'Közlekedés'
  | 'Számla'
  | 'Egyéb';

export type Action =
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: number }
  | { type: 'EDIT_EXPENSE'; payload: Expense };
