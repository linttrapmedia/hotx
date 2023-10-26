import { TodoList } from "@app/components/TodoList";

export default async function Home() {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/static/variables.css" />
        <script src="/static/runtime.js"></script>
        <script src="/static/HotDrawer.js"></script>
        <script src="/static/HotDrawerToggle.js"></script>
        <script src="/static/HotButton.js"></script>
      </head>
      <body>
        <TodoList />
        <form
          disabled
          id="todo-form"
          hot-id="todo-form"
          hot-get="/api/todo"
          hot-event="AddTodo"
          hot-form="this"
          hot-bind="asdf"
          hot-trigger="submit"
          hot:submit="[#todo-input,setAttribute,disabled],[#submit-button,setAttribute,disabled],[hot-drawer,setAttribute,open,true]"
        >
          <input id="todo-input" type="text" name="todo" autofocus />
          <button id="submit-button" type="submit">
            Add
          </button>
        </form>
        <hot-drawer name="settings-drawer" align="right">
          <div slot="title">Title</div>
          <div slot="body">Body</div>
          <div slot="footer">Footer</div>
        </hot-drawer>
        <button hot:click="[hot-drawer,setAttribute,open]">Open Drawer</button>
        <button hot:click="[hot-drawer,removeAttribute,open]">
          Close Drawer
        </button>
        <button hot:click="[hot-drawer,toggleAttribute,open]">
          Toggle Drawer
        </button>
      </body>
    </html>
  );
}
