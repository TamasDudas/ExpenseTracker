import { useForm, type SubmitHandler } from 'react-hook-form';
import { categories } from '../../constants';
import type { Expense } from '@/types/type';

export default function ExpenseFormNative() {
 const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
 } = useForm<Expense>({
  defaultValues: { category: 'Egyéb', type: 'expense' },
 });

 const onSubmit: SubmitHandler<Expense> = (data) => {
  console.log(data);
  reset();
 };

 return (
  <div className="w-full my-8">
   <form className="max-w-3xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
    <fieldset>
     <legend>Add expense and income</legend>

     <div>
      <label htmlFor="name">Name:</label>
      <input
       id="name"
       type="text"
       placeholder="name"
       {...register('name', { required: true, minLength: 2 })}
      />
      {errors.name && <span>Name is required (min. 2 characters)</span>}
     </div>

     <div>
      <label htmlFor="amount">Amount:</label>
      <input
       id="amount"
       type="number"
       {...register('amount', { required: true, min: 0, valueAsNumber: true })}
      />
      {errors.amount && <span>Amount is required (min. 0)</span>}
     </div>

     <div>
      <label htmlFor="company-name">Company name:</label>
      <input
       id="company-name"
       type="text"
       placeholder="company name"
       {...register('company', { required: true, minLength: 2 })}
      />
      <small>Enter your company name</small>
      {errors.company && <span>Company is required (min. 2 characters)</span>}
     </div>

     <div>
      <label>Expense or Income:</label>
      <label>
       <input
        type="radio"
        value="expense"
        {...register('type', { required: true })}
       />
       Expense
      </label>
      <label>
       <input
        type="radio"
        value="income"
        {...register('type', { required: true })}
       />
       Income
      </label>
     </div>

     <div>
      <label htmlFor="category">Category:</label>
      <select id="category" {...register('category', { required: true })}>
       {categories.map((category) => (
        <option key={category} value={category}>
         {category}
        </option>
       ))}
      </select>
      {errors.category && <span>Category is required</span>}
     </div>
    </fieldset>

    <hr />

    <div>
     <button type="submit">Submit</button>
     <button type="button" onClick={() => reset()}>
      Cancel
     </button>
    </div>
   </form>
  </div>
 );
}
