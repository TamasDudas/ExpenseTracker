import {
 FieldDescription,
 FieldGroup,
 FieldLegend,
 FieldSet,
 FieldSeparator,
 Field,
 FieldLabel,
} from '../ui/field';
import { Input } from '../ui/input';
import {
 Select,
 SelectContent,
 SelectGroup,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { categories } from '../../constants';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import type { Expense } from '@/types/type';
import { useEffect } from 'react';

interface ExpenseFormProps {
 onAdd?: (expense: Expense) => void;
 onUpdate?: (expense: Expense) => void;
 onCancel?: () => void;
 editingExpense?: Expense | null;
}

export default function ExpenseForm({
 onAdd,
 onUpdate,
 onCancel,
 editingExpense,
}: ExpenseFormProps) {
 const isEditing = !!editingExpense;

 const {
  register,
  handleSubmit,
  control,
  formState: { errors },
  reset,
 } = useForm<Expense>({
  defaultValues: editingExpense || { category: 'Egyéb', type: 'expense' },
 });

 const onSubmit: SubmitHandler<Expense> = (data) => {
  const newExpense = {
   ...data,
   id: crypto.randomUUID(),
   date: new Date().toISOString().split('T')[0], // YYYY-MM-DD formátum
  };
  if (!isEditing) {
   onAdd?.(newExpense);
  } else {
   onUpdate?.({ ...newExpense, id: editingExpense?.id });
  }
  reset();
 };

 //Itt állítjuk be a form értékeit, amikor az editingExpense változik. Ha van editingExpense, akkor annak értékeivel töltjük fel a formot, különben visszaállítjuk az alapértelmez
 useEffect(() => {
  if (editingExpense) {
   reset(editingExpense);
  } else {
   reset({ category: 'Egyéb', type: 'expense' });
  }
 }, [editingExpense, reset]);

 return (
  <div className="w-full my-8">
   <form className="max-w-3xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
    <FieldGroup>
     <FieldSet>
      <FieldLegend>
       {isEditing ? 'Edit expense and income' : 'Add expense and income'}
      </FieldLegend>
      <FieldGroup>
       <Field>
        <FieldLabel htmlFor="name">Name:</FieldLabel>
        <Input
         id="name"
         type="text"
         placeholder="name"
         {...register('name', {
          required: 'Name is required',
          minLength: {
           value: 2,
           message: 'Name must be at least 2 characters',
          },
         })}
        />
        {errors.name && (
         <div className="text-red-600">{errors.name.message}</div>
        )}
       </Field>
       <Field>
        <FieldLabel htmlFor="amount">Amount:</FieldLabel>
        <Input
         id="amount"
         type="number"
         {...register('amount', {
          required: 'Amount is required',
          min: {
           value: 0,
           message: 'Amount must be greater than 0',
          },
          valueAsNumber: true,
         })}
        />
        {errors.amount && (
         <div className="text-red-600">{errors.amount.message}</div>
        )}
       </Field>
       <Field>
        <FieldLabel htmlFor="company-name">Company name:</FieldLabel>
        <Input
         id="company-name"
         placeholder="company name"
         {...register('company', {
          required: 'Company is required',
          minLength: {
           value: 2,
           message: 'Company must be at least 2 characters',
          },
         })}
        />
        {errors.company && (
         <div className="text-red-600">{errors.company.message}</div>
        )}
        <FieldDescription>Enter your company name</FieldDescription>
       </Field>
       <Field>
        <FieldLabel>Expense or Income</FieldLabel>
        <Controller
         name="type"
         control={control}
         rules={{ required: 'Type is required' }}
         render={({ field }) => (
          <RadioGroup
           value={field.value}
           onValueChange={field.onChange}
           className="flex gap-4"
          >
           <div className="flex items-center gap-2">
            <RadioGroupItem value="expense" id="type-expense" />
            <FieldLabel htmlFor="type-expense">Expense</FieldLabel>
           </div>
           <div className="flex items-center gap-2">
            <RadioGroupItem value="income" id="type-income" />
            <FieldLabel htmlFor="type-income">Income</FieldLabel>
           </div>
          </RadioGroup>
         )}
        />
       </Field>

       <Field>
        <FieldLabel htmlFor="checkout-exp-month-ts6">Category:</FieldLabel>
        <Controller
         name="category"
         control={control}
         rules={{ required: 'Category is required' }}
         render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
           <SelectTrigger id="checkout-exp-month-ts6">
            <SelectValue placeholder="Válassz kategóriát" />
           </SelectTrigger>
           <SelectContent>
            <SelectGroup>
             {categories.map((category) => (
              <SelectItem key={category} value={category}>
               {category}
              </SelectItem>
             ))}
            </SelectGroup>
           </SelectContent>
          </Select>
         )}
        />
       </Field>
      </FieldGroup>
     </FieldSet>
     <FieldSeparator />

     <Field orientation="horizontal">
      <Button type="submit">{isEditing ? 'Update' : 'Submit'}</Button>
      <Button variant="outline" type="button" onClick={onCancel}>
       Cancel
      </Button>
     </Field>
    </FieldGroup>
   </form>
  </div>
 );
}
