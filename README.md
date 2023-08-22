# hotx - A Proposal
hotx (Pronounced "Hot Cross") is a Bun-first project starter kit for writing full stack apps in Bun.js. Hot Cross Bun!

## Try it
```bash
bun run app/index.ts
```

## Why
Because Bun.js is a one-stop shop that's why.

- ✔ Uses `jsx` syntax to generate html
- ✔ No dependencies
- ✔ Takes a Backend-for-frontend approach which is better all around
- ✔ Declares client-side behavior from the backend (kind of like `htmx`)
- ✔ Serve and transpile client-side code on demand when you need it
- ✔ Exists as a starter kit to get you going instead of a framework that leaves you in the dust
## What Does `hotx` Look Like?:

### It's just jsx!:
```tsx
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
```


### The `hot-x` config is used by the client to attach behavior that will:
```js
["trigger", "click"], // on click
["select", "#todo-form", "formData"], // select the form data
["request", "/handle/todo/create"], // submit it to the backend
["append", "#todo-list"], // append result to the list
["clear", "#todo-form input"], // clear the form
```

## hot-x config

| Operation | Description |
|---|---|
| `append`    | append html |
| `attr`      | add html attribute |
| `event`     | trigger client side event |
| `onerror`   | onerror sequence |
| `parallel`  | run multiple operations in parallel |
| `prepend`   | prepend html |
| `remove`    | remove html |
| `replace`   | replace html |
| `request`   | posts data to handler on the server |
| `select`    | select a dom element, (including html returned by server) |
| `trigger`   | trigger operation |
| `watch` | watch for dom element events |
