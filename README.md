# HOTX - A Proposal
HOTX (Pronounced "Hot Cross") is a Bun-first, htmx inspired library for writing front-end applications using backend code.

## Why?
The central value of htmx is that you get to define your application behavior in one spot (the backend), however with Bun.js we can be much more expressive and use full-typed syntax to create either a full-stack or backend-for-frontend app to keep front-end teams moving fast.

## What It Looks Like:

### The html templating engine looks like this:
```typescript
ul(
  li("one"),
  li("two"),
  li("three"),
)
```

which outputs this
```html
<ul>
    <li>one</li>
    <li>one</li>
    <li>one</li>
</ul>
```

add some attributes
```typescript
ul(['ATTR', 'id', 'list'])(
  li("one"),
  li("two"),
  li("three"),
)
```
and output this
```html
<ul id="list">
    <li>one</li>
    <li>one</li>
    <li>one</li>
</ul>
```

### Now turn it into a function and loop over data
```typescript
function TodoList(todos: Todo[]) {
  return ul(["ATTR", "id", "todo-list"])(
    todos.map((t) =>
      li(["ATTR", "id", "todo-" + t.id])(
        span(t.text),
        button(
          ["TRIGGER", "click"],
          ["REQUEST", "/handle/todo-list/delete", t.id],
          ["REMOVE", "#todo-" + t.id],
        )("delete")
      )
    )
  );
}
```

### Renders html that looks like this:
```html
<ul id="todo-list">
  <li id="todo-1">
    <span>Item 1</span>
    <button
      x-config='[
            ["TRIGGER", "click"],
            ["REQUEST", "/handle/todo-list/delete", 1],
            ["REMOVE", "#todo-1"]
        ]'>
      delete
    </button>
  </li>
</ul>
```


### The `x-config` is a special attribute which gets parsed on the client, attaching behavior which results in this: 
```js
// on click, begin processing
["TRIGGER", "click"],
// config and data is sent to a backend
// where a DELETE request is executed
["REQUEST", "/api/todo-list/delete",1],
// The result is sent back to the frontend
// which then then removes the item from the dom
["REMOVE", "#todo-1"]
```
### You can do more complex operations like this:
```js
["TRIGGER", "click"], 
["SELECT", '#todo-indicator'],
["ATTR", "className", "indicator loading"],
["SELECT", "#todo-form", "FormData"], 
["REQUEST", "/handle/todo-list/create", "groceries"], 
["APPEND", "#todo-list"],
["SELECT", '#todo-indicator'],
["ATTR", "className", "indicator"],
```

## Or even run multiple operations in parallel, like submit mutliple forms!
```js
[
  ["TRIGGER", "click"],
  [
    "PARALLEL",
    [
      ["REQUEST", "/handle/todo-list/delete", 1],
      ["REMOVE", "#todo-1"],
    ],
    [
      ["SELECT", "#reminder-form", "formData"],
      ["REQUEST", "/handle/reminder/create"],
      ["REPLACE", "#reminders"],
    ],
  ],
];
```
## Operations

| Operation | Desc |
|---|---|
| Server
| `REQUEST`   | posts data to handler on the server |
| `RESULT`    | result from server |
| Client
| `APPEND`    | append html |
| `ATTR`      | add html attribute |
| `EVENT`     | trigger client side event |
| `ONERROR`   | onerror sequence |
| `PREPEND`   | prepend html |
| `REMOVE`    | remove html |
| `REPLACE`   | replace html |
| `PARALLEL`  | run multiple operations in parallel |
| `SELECT`    | select a dom element, (including html returned by server) |
| `TRIGGER`   | trigger operation |
