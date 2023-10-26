import { todoList } from "../../test/mocks";

export type Todo = {
  label: string;
  completed: boolean;
};

export const TodoList = () => {
  return (
    <div id="todo-list">
      <h1>Todos</h1>
      <ul>
        {todoList.map((todo) => (
          <li>
            <button
              type="button"
              hot:click="[this,style,textDecoration,line-through],[this,style,color,red]"
              hot-get="/api/todo"
              hot-event="CompleteTodo"
              hot-data="this"
              hot-trigger="click"
              data-todo={todo.label}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
