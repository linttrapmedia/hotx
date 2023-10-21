export const TodoForm = () => (
  <form id="todo-form" hot-trigger="submit" hot-event="AddTodo" hot-form="this">
    <input type="text" name="todo" autofocus />
    <button
      type="button"
      hot-event="AddTodo"
      hot-form="#todo-form"
      style={{
        backgroundColor: "var(--color-black)",
        color: "var(--color-white)",
      }}
    >
      Add
    </button>
  </form>
);
