export type Todo = {
  label: string;
  completed: boolean;
};

type TodoListProps = {
  todos: Todo[];
};

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <div id="todo-list">
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li>
            <button
              type="button"
              hot-event="CompleteTodo"
              hot-data="this"
              data-todo={todo.label}
            >
              {todo.label} - {todo.completed}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
