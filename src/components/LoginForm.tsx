import { useAuthStore } from '@/stores/useAuthStore';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
  login: string;
  password: string;
}

export const LoginForm = () => {
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login(data.login, data.password);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-4 bg-slate-700 px-4 py-8 w-1/2 rounded-sm"
      >
        <div className="w-full">
          <label htmlFor="login" className="block mb-2">
            Логин
          </label>
          <input
            type="text"
            id="login"
            placeholder="user123@gmail.com"
            {...register('login', {
              required: 'Введите почту',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            className="rounded-lg py-2 px-1 w-full text-black"
          />
          {errors.login && <p>{errors.login.message}</p>}
        </div>
        <div className="w-full">
          <label htmlFor="password" className="block mb-2">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Введите пароль' })}
            required
            className="rounded-lg py-2 px-1 w-full text-black"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-1/2 rounded-md bg-blue-950 py-3">
          Войти
        </button>
      </form>
    </>
  );
};
