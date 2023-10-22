import { TodoList } from "@app/components/TodoList";
import { todoList } from "../../test/mocks";

function addTodo(formData: FormData | URLSearchParams) {
  const newTodo = formData.get("todo") as string;
  todoList.push({ label: newTodo, completed: false });
  return new Response(
    JSON.stringify({
      state: "INIT",
      dom: {
        outerHTML: {
          "#todo-list": TodoList(),
        },
      },
    })
  );
}

function completeTodo(formData: FormData | URLSearchParams) {
  const todo = formData.get("todo") as string;
  todoList.forEach(
    (t) => (t.completed = t.label === todo ? !t.completed : t.completed)
  );
  return new Response(
    JSON.stringify({
      state: "INIT",
      dom: {
        outerHTML: {
          "#todo-list": TodoList(),
        },
      },
    })
  );
}

export default async function handler(req: Request) {
  const formData =
    req.method === "GET"
      ? new URLSearchParams(req.url.split("?")[1])
      : ((await req.formData()) as FormData);
  const state = formData.get("state");
  const event = formData.get("event");
  const data = formData.get("data");

  switch (state) {
    case "INIT":
      switch (event) {
        case "AddTodo":
          return addTodo(formData);
        case "CompleteTodo":
          return completeTodo(formData);
      }
  }
}
