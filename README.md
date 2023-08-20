# HOTX - A Proposal
HOTX (Pronounced "Hot Cross") is a Bun-first, htmx inspired library for writing front-end applications using backend code.

## Why?
The central value of htmx is that you get to define your application behavior in one spot (the backend), however with Bun.js we can be much more expressive and use full-typed syntax to create either a full-stack or backend-for-frontend app to keep front-end teams moving fast.

## What It Looks Like:

### Backend code that looks like this:
```typescript
import h from "@hotx"
function TodoList(todos: Todo[]) {
  return ul(["attr", "id", "todo-list"])(
    todos.map((t) =>
      li(["attr", "id", "todo-" + t.id])(
        span(t.text),
        button(
          ["x", "ON", "click"],
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
  <li id="todo-1">
    <span>Item 1</span>
    <button
      x-config='[
            ["ON", "click"],
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
```js
// on click, begin processing
["ON", "click"],
// a server-side event is detected (DELETE)
// the entire config is sent to a backend for further processing
// where a DELETE request is contructured and executed
["DELETE", "/api/todo-list/delete",1],
// a RETURN signals the backend to return processing to the frontend
["RETURN"],
// the frontend then removes the item from the dom
["REMOVE", "#todo-1"]
```
### Now you can do crazy stuff like this:
```js
["ON", "click"], // trigger on click
["SELECT", "#todo-form", "FormData"], // get form data
["POST", "/api/todo-list/create", "groceries"], // add new item, return data
["GET", "/component/todo-item"], // pipe returned data to todo item html renderer
["RETURN"], // return the todo item html
["APPEND", "#todo-list"], // append it to the todo list
["TRIGGER", "click", "#todo-counter"] // click the todo counter
```
## Operations

| Operation   | Arguments | Desc |
|---|---|---|
| Server Side
| `DELETE`    | `/api/endpoint` | http req |
| `GET`       | `/api/endpoint` | http req |
| `PATCH`     | `/api/endpoint` | http req |
| `POST`      | `/api/endpoint` | http req |
| `PUT`       | `/api/endpoint` | http req |
| `TRANSFORM` | transformer | transform data from one format to another  |
| Client Side
| `APPEND`    | CSS Selector   |  append html |
| `ATTR`      | key, value   | add attribute |
| `EVENT`     | name, func, args | call function |
| `INNERHTML` | CSS Selector   | replace html |
| `ON`        | Event Name   | add listener |
| `OUTERHTML` | CSS Selector   | replace html |
| `PREPEND`   | CSS Selector   | prepend html |
| `REMOVE`    | CSS Selector   | remove html |
| `SELECT` | CSS Selector, object   | select dom |
| `TRANSFORM` | transformer | transform data from one format to another  |

