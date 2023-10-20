export default async function Home() {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/static/styles.css" />
        <script src="/static/runtime.js"></script>
        <script src="/static/HotButton.js"></script>
      </head>
      <body>
        <h1>TODO</h1>
        <form id="todoForm">
          <input type="text" name="todo" />
          <hot-button post="/api/todos" select="#todoForm">
            Add
          </hot-button>
        </form>
      </body>
    </html>
  );
}
