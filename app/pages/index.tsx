import { TodoForm } from "@app/components/TodoForm";
import { TodoList } from "@app/components/TodoList";

export default async function Home() {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/static/variables.css" />
        <script src="/static/runtime.js"></script>
        <script src="/static/HotDrawer.js"></script>
      </head>
      <body>
        <TodoList />
        <TodoForm />
        <hot-drawer open="false">
          <div slot="title">Title</div>
          <div slot="body">Body</div>
          <div slot="footer">Footer</div>
        </hot-drawer>
        <button hot-web-component={{ "hot-drawer": { open: "true" } }}>
          Toggle Drawer
        </button>
      </body>
    </html>
  );
}
