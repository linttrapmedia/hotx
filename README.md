# HOTX - A Proposal
HOTX (Pronounced "Hot Cross") is a Bun-first, htmx inspired, "backend-for-frontend" project starter kit for writing full stack apps in Bun.js. Hot Cross Bun!

## Why Not Just Use `A` or `B`?
With Bun.js we have everything we need to build a full stack app providing us with a much more expressive option for defining a clean back-to-front syntax.

- Stop shipping all your domain logic to the client and coupling your frontend app to every wind of change. Make your life easier and use a "Backend For Frontend" app to handle all the important stuff.
- Frameworks leave you in the dust and can't care about the particulars of your business or situation. A good quality starter kit will be better in the short and long term.
- You can't avoid having to write client side code. `htmx` can't solve that in any real tenable way and its suggestions for doing so (using `alpine` and/or `hyperscript`) I would not advise.

## What Does `HOTX` Look Like?:

### It's just jsx!:
```html
<div hot-trigger="click" hot-request="/get-list" hot-replace="#list">
  <ul id="list"></ul>
</div>
```

### The `hot-x` attributes are combined into a single attribute like this:
```html
<div hot-x='[["trigger","click"],["request","/get-list"],["replace","#list"]]'>
  <ul id="list"></ul>
</div>
```


### From there the `hot-x` attribute is used by the client to attach behavior that will:
```js
// on click, begin processing
["trigger", "click"],
// request html from /get-list
["request", "/get-list"],
// replace #list with the html result
["replace", "#list"]
```

## hot-x attributes

| Operation | Desc |
|---|---|
| Server
| `request`   | posts data to handler on the server |
| `result`    | result from server |
| Client
| `append`    | append html |
| `attr`      | add html attribute |
| `event`     | trigger client side event |
| `onerror`   | onerror sequence |
| `prepend`   | prepend html |
| `remove`    | remove html |
| `replace`   | replace html |
| `parallel`  | run multiple operations in parallel |
| `select`    | select a dom element, (including html returned by server) |
| `trigger`   | trigger operation |
| `watch` | watch for dom element events |
