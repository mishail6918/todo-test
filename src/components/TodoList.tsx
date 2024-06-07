'use client';
import React, { FC, useMemo, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useTodosStore } from '@/stores/useTodosStore';
import { TodoItem } from './TodoItem';
import { Todo } from '@/types/types';

export const TodoList: FC<{ itemsPerPage: number }> = ({ itemsPerPage }) => {
  const { todos, filteredTodos, applyFilters, setSortOrder, applySorting, sortOrder } =
    useTodosStore();

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    if (filteredTodos.length) return Math.ceil(filteredTodos.length / itemsPerPage);
    return 0;
  }, [filteredTodos]);

  const handleClick = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const todoPagitated = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTodos.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, filteredTodos]);

  const getPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          disabled={i === currentPage}
          className="disabled:text-black"
        >
          {i}
        </button>,
      );
    }
    return buttons;
  };

  const handleSort = (key: keyof Todo) => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    applySorting(key);
  };
  return (
    <>
      <h1 className="mb-2">Список задач</h1>
      <hr />
      <div className="flex items-center justify-between">
        <div>
          <h3>Фильтровать по названию</h3>
          <input
            type="text"
            onChange={(e) => applyFilters(e.target.value)}
            className="text-black"
          />
        </div>
        <div>
          <h3>Сортировка</h3>
          <div className="flex items-center gap-4">
            <button onClick={() => handleSort('title')}>По названию</button>
            <button onClick={() => handleSort('text')}>По тексту</button>
            <button onClick={() => handleSort('status')}>По статусу</button>
          </div>
        </div>
      </div>
      <ul className="py-4">
        {todoPagitated.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
      <div className="flex items-center gap-4 border-b w-fit">{getPaginationButtons()}</div>
    </>
  );
};
