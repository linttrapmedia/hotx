# HOTX - A Proposal
HOTX (Pronounced "Hot Cross") is a Bun-first, htmx inspired library for writing front-end applications using backend code.

## Why?
The central value of htmx is that you get to define your application behavior in one spot (the backend), however with Bun.js because we get a much more expressive and full-typed syntax to create either a full-stack or backend-for-frontend app to keep front-end teams moving fast.

## How It Works

### Backend code that looks like this:
```typescript
import h from "@hotx"
function TodoList(todos: Todo[]) {
  return ul(["attr", "id", "todo-list"])(
    todos.map((t) =>
      li(["attr", "id", "todo-" + t.id])(
        span(t.text),
        button(
          ["x", "on", "click"],
          ["x", "DELETE", "/api/todo-list/delete", t.id],
          ["x", "RETURN"],
          ["x", "REMOVE", "#todo-" + t.id]
        )
      )
    )
  );
}
```

### Renders html that looks like this:
```html
<ul>
  <li>
    <span>Item 1</span>
    <button
      x-config='[
            ["on", "click"],
            ["DELETE", "/api/todo-list/delete", 1],
            ["RETURN"],
            ["REMOVE", "#todo-1"]
        ]'>
      delete
    </button>
  </li>
</ul>
```


### Which gets parsed on the client and works like this: 
```json
// on click, this entire config is sent to the backend
["on", "click"],
// the DELETE request is handled on the backend!
["DELETE", "/api/todo-list/delete",1],
// a RETURN signals the backend to return processing to the frontend
["RETURN"],
// the frontend then removes the item from the dom
["REMOVE", "#todo-1"]
```
### Now you can do crazy stuff like this:
```json
["on", "click"], // trigger on click
["POST", "/api/todo-list/create", "groceries"], // add new item, return data
["GET", "/component/todo-item"], // pipe returned data to todo item html renderer
["RETURN"], // return the todo item html
["APPEND", "#todo-list"], // append it to the todo list
["TRIGGER", "click", "#todo-counter"] // click the todo counter
```
## Operations

### HTTP Methods
| Operation   | Arguments | Desc |
|---|---|---|
| Server Side
| `GET`       | `/api/endpoint` | http req |
| `POST`      | `/api/endpoint` | http req |
| `PUT`       | `/api/endpoint` | http req |
| `PATCH`     | `/api/endpoint` | http req |
| `DELETE`    | `/api/endpoint` | http req |
| Client Side
| `ON`        | Event Name   | add listener |
| `ATTR`      | key, value   | add attribute |
| `EVENT`     | name, func, args | call function |
| `APPEND`    | CSS Selector   |  append html |
| `PREPEND`   | CSS Selector   | prepend html |
| `REMOVE`    | CSS Selector   | remove html |
| `INNERHTML` | CSS Selector   | replace html |
| `OUTERHTML` | CSS Selector   | replace html |
