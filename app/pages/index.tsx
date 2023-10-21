import { TodoList } from "@app/components/TodoList";
import { todoList } from "@app/data/mock";

export default async function Home() {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/static/styles.css" />
        <link rel="stylesheet" href="/static/HotButton.css" />
        <script src="/static/runtime.js"></script>
        <script src="/static/HotButton.js"></script>
      </head>
      <body>
        {TodoList({ todos: todoList })}
        <form
          id="todo-form"
          hot-trigger="submit"
          hot-event="AddTodo"
          hot-form="#todo-form"
        >
          <input type="text" name="todo" />
          <button type="button" hot-event="AddTodo" hot-form="#todo-form">
            Add
          </button>
        </form>
        <table id="stuff"></table>
      </body>
    </html>
  );
}
