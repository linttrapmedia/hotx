export default async function Home() {
  const addToDoAttr: HotTrait<TodoMachine> = {
    trigger: "click",
    send: "AddTodo",
    payload: "#todoForm",
  };

  return (
    <html>
      <head>
        <link rel="stylesheet" href="/static/styles.css" />
        <script src="/static/hotx.js"></script>
      </head>
      <body>
        <h1>About page</h1>
        <form id="todoForm">
          <input type="text" name="todo" />
          <button hot-x={addToDoAttr}>Add</button>
        </form>
      </body>
    </html>
  );
}
