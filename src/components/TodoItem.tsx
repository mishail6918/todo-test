'use client';
import { useAuthStore } from '@/stores/useAuthStore';
import { useTodosStore } from '@/stores/useTodosStore';
import { Todo } from '@/types/types';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ITodoItem {
  todo: Todo;
}

export const TodoItem: FC<ITodoItem> = ({ todo }) => {
  const { isAuthenticated, user } = useAuthStore();
  const { removeTodo, editTodo } = useTodosStore();

  const { register, reset, getValues } = useForm<{
    text: string;
    status: boolean;
  }>();

  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <li key={todo.id} className="bg-slate-600 p-4 flex justify-between items-center">
        <div
          style={{
            textDecoration: todo.status === 'completed' ? 'line-through' : 'none',
          }}
          className="flex items-center"
        >
          <span className="mr-4">{todo.title}</span>
          {editMode ? (
            <>
              <textarea
                defaultValue={todo.text}
                {...register('text')}
                className="text-black mr-2 "
              />
              <label htmlFor="status">Статус</label>
              <input
                type="checkbox"
                defaultChecked={todo.status === 'completed' ? true : false}
                {...register('status')}
                id="status"
              />
            </>
          ) : (
            <>
              <span className="text-orange-300 mr-4">{todo.text}</span>
              <span>{todo.status === 'active' ? 'Активна' : 'Выполнена'}</span>
            </>
          )}
        </div>
        <div>
          {user?.role === 'admin' && (
            <>
              {editMode ? (
                <button
                  onClick={() => {
                    editTodo(todo.id, getValues('text'), getValues('status')), setEditMode(false);
                  }}
                  className="mr-4"
                >
                  Сохранить
                </button>
              ) : (
                <button onClick={() => setEditMode(true)} className="mr-4">
                  Редактировать
                </button>
              )}
            </>
          )}
          <button onClick={() => removeTodo(todo.id)}>Удалить</button>
        </div>
      </li>
    </>
  );
};
