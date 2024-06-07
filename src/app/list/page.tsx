import { AddTodo } from '@/components/AddTodo';
import { TodoList } from '@/components/TodoList';
const List = () => {
  return (
    <>
      <AddTodo />
      <TodoList itemsPerPage={3} />
    </>
  );
};

export default List;
