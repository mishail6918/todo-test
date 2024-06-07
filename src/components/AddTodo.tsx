'use client';
import { useTodosStore } from '@/stores/useTodosStore';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
  title: string;
  text: string;
}

export const AddTodo = () => {
  const { addTodo } = useTodosStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addTodo(data);
    reset();
  };
  return (
    <>
      <form className="mb-4 flex items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="mr-2">
            Название задачи
          </label>
          <input
            type="text"
            id="name"
            placeholder="Название задачи"
            className="rounded-md p-2 text-black"
            {...register('title', {
              required: 'Название задачи обязательно',
              maxLength: 25,
              minLength: 3,
            })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="text" className="mr-2">
            Текст задачи
          </label>
          <input
            type="text"
            id="text"
            placeholder="Купить хлеб"
            className="rounded-md p-2 text-black"
            required
            {...register('text')}
          />
        </div>
        <button className="bg-slate-900 py-2 px-4 rounded">+</button>
      </form>
    </>
  );
};
