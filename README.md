# hotx - A Proposal
hotx (Pronounced "Hot Cross") is a Bun-first project starter kit for writing full stack apps in Bun.js. Hot Cross Bun!

## Try it
```bash
bun run cmd/serve.ts
```

## Features
- ✔ No dependencies
- ✔ Uses familiar `jsx` syntax to write html
- ✔ Uses `htmx` approach for managing the dom
- ✔ Uses `web-components`
- ✔ Uses `web-components`

## What Does `hotx` Look Like?:

### It's just jsx!:
```tsx

// pages/todo.tsx
function TodoPage({ list }: { list: string[] }) {
  return (
    <div>
      <ul id="todo-list">{list.map(TodoItem)}</ul>
      <form id="todo-form" hot-trigger="submit" hot-event="AddTodo" hot-form="this">
        <input type="text" name="todo" autofocus />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
```


### The `hot-*` attributes are used by the client runtime to attach behavior that will:
```js
"hot-trigger" // attach listener
"hot-form" // submit this form's values as FormData
"hot-data" // submit this elements dataset as FormData
"hot-post" // submit the form or data via post
"hot-get" // submit the form or data via get
"hot-put" // submit the form or data via put
"hot-delete" // submit the form or data via delete
"hot-patch" // submit the form or data via patch
"hot-web-component" // set attributes on various web components
```

## Server implementation

To make the magic happen the server needs to return a json object with a `dom` key that looks like this:

```json
{
  "dom": {
    "innerText": {
      "#status": "Complete",
    },
    "outerHTML": {
      "#todo-list": "<div>some html content</div>",
    },
  }
}
```

Each key in `dom` represents the dom manipulation you'd like to take place. Each manipulation's key is the selector of the dom element you'd like to update and it's the value the contents you'd like it to be updated with.

## Web Components
By relying on the server's response to effect dom manipulation may seem limiting but the `hot-web-component` attribute coupled with `web-components` is a match made in heaven. Web Components can anything you can dream up and therefore there's not limit to what you can build.

## State Management
When you use a BE4FE approach so many things fall into place. For one, easy things remain easy which can't be said for a lot of framework ecosystems. The dev setup, testing, state management, dependency management and better overall DX. The missing link in most apps is sane state management without quirks that lead to endless bugs.  Xstate is best in class in this arena and next we'll be looking at how we can leverage it or an equivalent to drive the entire api. Imagine being able to prove out the exact state of the frontend from the backend! A user's entire session could be persisted or shared. It's the old school simplicity of what webdev used to be but without compromising the sophistication of modern dev (using web components) all while using standards.

This can easily be facilitated by having the server return one more key `state`:

```json
{
  "state": "RUNNING",
  "dom": {
    "innerText": {
      "#status": "Complete",
    },
    "outerHTML": {
      "#todo-list": "<div>some html content</div>",
    },
  }
}
```

The `state` key will update the `hotx` (globally available) instance and send it back to the server on the next api request. An "event" can be sent along by merely adding it as a hidden field on the submitted form or adding it as a dataset attribute which means we now have all the makings of submitting both the current state and what action we'd like performed to the backend which can mutate the dom accordingly. 