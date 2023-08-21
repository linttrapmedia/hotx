# HOTX - A Proposal
HOTX (Pronounced "Hot Cross") is a Bun-first, htmx inspired, "backend-for-frontend" project starter kit for writing full stack apps in Bun.js. Hot Cross Bun!

## Why Not Just Use `A` or `B`?
With Bun.js we have everything we need to build a full stack app providing us with a much more expressive option for defining a clean back-to-front syntax.

- Stop shipping all your domain logic to the client and coupling your frontend app to every wind of change. Make your life easier and use a "Backend For Frontend" app to handle all the important stuff.
- Frameworks leave you in the dust and can't care about the particulars of your business or situation. A good quality starter kit will be better in the short and long term.
- You can't avoid having to write client side code. `htmx` can't solve that in any real tenable way and its suggestions for doing so (using `alpine` and/or `hyperscript`) I would not advise.

## What Does `HOTX` Look Like?:

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
and it outpus this
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

### Which renders html that looks like this:
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
["REQUEST", "/handle/todo-list/create"], 
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
| `WATCH` | watch for dom element or event |
