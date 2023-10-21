import { TodoForm } from "@app/components/TodoForm";
import { TodoList } from "@app/components/TodoList";

export default async function Home() {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/static/variables.css" />
        <script src="/static/runtime.js"></script>
      </head>
      <body>
        <TodoList />
        <TodoForm />
      </body>
    </html>
  );
}
