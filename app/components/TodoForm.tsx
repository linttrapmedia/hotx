export const TodoForm = () => (
  <form id="todo-form" hot-get="/api" hot-event="AddTodo" hot-form="this">
    <input type="text" name="todo" autofocus />
    <button type="submit">Add</button>
  </form>
);
