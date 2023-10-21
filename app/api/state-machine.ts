import { TodoList } from "@app/components/TodoList";
import { todoList } from "@app/data/mock";

export default async function handler(req: Request) {
  const formData = (await req.formData()) as FormData;
  const state = formData.get("state");
  const event = formData.get("event");
  const data = formData.get("data");

  switch (state) {
    case "INIT":
      switch (event) {
        case "AddTodo":
          const newTodo = formData.get("todo") as string;
          todoList.push({ label: newTodo, completed: false });
          return new Response(
            JSON.stringify({
              state,
              event,
              data,
              domUpdates: {
                "#todo-list": TodoList({ todos: todoList }),
              },
            })
          );
        case "CompleteTodo":
          const todo = formData.get("todo") as string;
          const newTodos = todoList.map((t) => {
            if (t.label === todo) t.completed = !t.completed;
            return t;
          });
          return new Response(
            JSON.stringify({
              state,
              event,
              data,
              domUpdates: {
                "#todo-list": TodoList({ todos: newTodos }),
              },
            })
          );
      }
  }
}
