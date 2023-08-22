// handle/todo/create.ts
function handleTodoCreate(req: HotxRequest) {
  const todo = req.data.todo;
  return <TodoItem>{todo}</TodoItem>;
}

// component/todo-item.tsx
const TodoItem = (item: any) => {
  return <li>{item}</li>;
};

// component/todo-list.tsx
function TodoList({ list }: { list: string[] }) {
  return (
    <div>
      <ul id="todo-list">{list.map(TodoItem)}</ul>
      <form id="todo-form">
        <input name="todo" type="text" />
        <button
          hot-x={[
            ["trigger", "click"],
            ["select", "#todo-form", "formData"],
            ["request", "/handle/todo/create"],
            ["append", "#todo-list"],
            ["clear", "#todo-form input"],
          ]}
        >
          Add
        </button>
      </form>
    </div>
  );
}

// console.log(<TodoList list={["grocery", "laundry", "dishes"]} />);
console.log(TodoList({ list: ["grocery", "laundry", "dishes"] }));
