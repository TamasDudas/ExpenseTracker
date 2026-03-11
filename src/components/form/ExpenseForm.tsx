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
import { Switch } from '../ui/switch';
import { categories } from '../../constants';
import { useForm } from 'react-hook-form';
import type { Expense } from '@/types/type';

export default function ExpenseForm() {
 const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
 } = useForm<Expense>();

 return (
  <div className="w-full my-8">
   <form className="max-w-3xl mx-auto">
    <FieldGroup>
     <FieldSet>
      <FieldLegend>Add expense and income</FieldLegend>
      <FieldGroup>
       <Field>
        <FieldLabel htmlFor="name">Name:</FieldLabel>
        <Input
         id="name"
         type="text"
         placeholder="name"
         {...register('name', { required: true })}
        />
       </Field>
       <Field>
        <FieldLabel htmlFor="amount">Amount:</FieldLabel>
        <Input
         id="amount"
         type="number"
         {...register('amount', { required: true })}
        />
       </Field>
       <Field>
        <FieldLabel htmlFor="company-name">Company name:</FieldLabel>
        <Input
         id="company-name"
         placeholder="company name"
         {...register('company', { required: true })}
        />
        <FieldDescription>Enter your company name</FieldDescription>
       </Field>
       <Field>
        <FieldLabel htmlFor="checkout-exp-year-ts6">
         Expense or Income
        </FieldLabel>
        <Switch id="expense" />
       </Field>

       <Field>
        <FieldLabel htmlFor="checkout-exp-month-ts6">Category:</FieldLabel>
        <Select defaultValue="">
         <SelectTrigger id="checkout-exp-month-ts6">
          <SelectValue placeholder="MM" />
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
       </Field>
      </FieldGroup>
     </FieldSet>
     <FieldSeparator />

     <Field orientation="horizontal">
      <Button type="submit">Submit</Button>
      <Button variant="outline" type="button">
       Cancel
      </Button>
     </Field>
    </FieldGroup>
   </form>
  </div>
 );
}
