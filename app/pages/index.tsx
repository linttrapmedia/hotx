import { TodoForm } from "@app/components/TodoForm";
import { TodoList } from "@app/components/TodoList";

export default async function Home() {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/static/variables.css" />
        <script src="/static/runtime.js"></script>
        <script src="/static/HotDrawer.js"></script>
        <script src="/static/HotDrawerToggle.js"></script>
      </head>
      <body>
        <TodoList />
        <TodoForm />
        <hot-drawer name="settings-drawer" open="false" align="right">
          <div slot="title">Title</div>
          <div slot="body">Body</div>
          <div slot="footer">Footer</div>
        </hot-drawer>
        <hot-drawer-toggle drawer="settings-drawer">
          <button>Toggle Drawer</button>
        </hot-drawer-toggle>
      </body>
    </html>
  );
}
