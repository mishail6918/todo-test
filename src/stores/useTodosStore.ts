import { create } from 'zustand';
import { Todo } from '@/types/types';

interface newTodo {
  text: string;
  title: string;
}

type Actions = {
  addTodo: ({ text, title }: newTodo) => void;
  editTodo: (id: number, newText: string, status: boolean) => void;
  removeTodo: (id: number) => void;
  applyFilters: (filterValue: string) => void;
  applySorting: (sortingKey: keyof Todo) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
};

type State = { todos: Todo[]; filteredTodos: Todo[]; sortOrder: 'asc' | 'desc' };

const mockTodos: Todo[] = [
  { id: 1, title: 'Покупки', text: 'Купить хлеб', status: 'active' },
  { id: 2, title: 'Домашние дела', text: '', status: 'active' },
  {
    id: 3,
    title: 'Посмотреть фильм Джентельмены',
    text: 'Посмотреть фильм Джентельмены',
    status: 'active',
  },
  { id: 4, title: '18:00 Волейбол', text: 'Купить хлеб', status: 'active' },
  { id: 5, title: 'Покупки', text: 'Купить хлеб', status: 'active' },
];

const initialState: State = {
  todos: mockTodos,
  filteredTodos: mockTodos,
  sortOrder: 'asc',
};

export const useTodosStore = create<State & Actions>((set, get) => ({
  ...initialState,
  addTodo: ({ text, title }: newTodo) => {
    const todos = get().todos;
    const lastId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;
    set((state) => ({
      todos: [...state.todos, { id: lastId, text, title, status: 'active' }],
      filteredTodos: [...state.filteredTodos, { id: lastId, text, title, status: 'active' }],
    }));
  },
  editTodo: (id: number, newText: string, status: boolean) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText, status: status === true ? 'completed' : 'active' }
          : todo,
      ),
      filteredTodos: state.filteredTodos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText, status: status === true ? 'completed' : 'active' }
          : todo,
      ),
    }));
  },
  removeTodo: (id: number) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
      filteredTodos: state.filteredTodos.filter((todo) => todo.id !== id),
    }));
  },
  applyFilters: (filterValue: string) => {
    const todos = get().todos;
    const filteredTodos = todos.filter((todo) =>
      filterValue.length > 0 ? todo.title.toLowerCase().includes(filterValue.toLowerCase()) : todos,
    );
    set({ filteredTodos });
  },
  setSortOrder: (order) => set({ sortOrder: order }),
  applySorting: (sortingKey: keyof Todo) => {
    const todos = get().todos;
    const { filteredTodos, sortOrder } = get();
    const sortedTodos = [...filteredTodos].sort((a, b) => {
      if (!sortingKey) return 0;
      if (a[sortingKey] < b[sortingKey]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortingKey] > b[sortingKey]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    set({ filteredTodos: sortedTodos });
  },
}));
