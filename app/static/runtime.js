// impl/browser/hotx/runtime/Hotx.ts
class Hotx {
  _state;
  _elements;
  constructor() {
    this._state = "INIT";
    this._elements = {};
  }
  addElement(id, element) {
    this._elements[id] = element;
  }
  dispatch(method, api, event, data) {
    data.append("state", this.state);
    data.append("event", event);
    const config = (() => {
      if (method !== "GET")
        return { api, options: { method, body: data } };
      const urlSearchParams = new URLSearchParams;
      data.forEach((value, key) => urlSearchParams.append(key, value));
      return { api: api + "?" + urlSearchParams.toString() };
    })();
    return fetch(config.api, config.options).then(async (response) => {
      if (!response.ok)
        throw new Error(response.statusText);
      const json = await response.json();
      window.hotx.state = json.state;
      if (!json.dom || json.dom.length === 0)
        return json;
      json.dom.forEach(([selector, action, ...args]) => {
        const el = document.querySelector(selector);
        if (!el)
          return;
        if (action === "outerHTML")
          el.outerHTML = args[0];
        if (action === "innerHTML")
          el.innerHTML = args[0];
        if (action === "toggleAttribute")
          el.toggleAttribute(args[0]);
        if (action === "removeAttribute")
          el.removeAttribute(args[0]);
        if (action === "setAttribute")
          el.setAttribute(args[0], args[1] ?? "");
      });
      return json;
    }).catch((error) => {
      console.error("There has been a problem with your fetch operation:", error);
    });
  }
  get elements() {
    return this._elements;
  }
  get state() {
    return this._state;
  }
  set state(newState) {
    this._state = newState;
  }
}

// impl/browser/hotx/runtime/runtime.ts
var getAttr = function(element, attr, nullVal = null) {
  const val = element.getAttribute(attr);
  return val ?? nullVal;
};
var handleClick = function(el) {
  const attr = el.getAttribute("hot:click") ?? "";
  const mutations = attr.match(/(\[[^\]]+\])/g)?.map((s) => s.slice(1).slice(0, -1).split(",")) ?? [];
  if (!mutations.length)
    return;
  el.addEventListener("click", function(e) {
    e.preventDefault();
    mutations.forEach((mutation) => {
      const [target, action, ...args] = mutation;
      const tEl = target === "this" ? el : document.querySelector(target);
      if (!tEl)
        return;
      if (action === "toggleAttribute")
        tEl.toggleAttribute(args[0]);
      if (action === "setAttribute")
        tEl.setAttribute(args[0], args[1] ?? "");
      if (action === "removeAttribute")
        tEl.removeAttribute(args[0]);
    });
  });
};
var handleData = function(element, hotData, method, endpoint, hotEvent) {
  const data = hotData === "this" ? element : document.querySelector(hotData);
  const formData = new FormData;
  Object.entries(data.dataset).forEach(([key, value]) => formData.append(key, value));
  window.hotx.dispatch(method, endpoint, hotEvent, formData);
};
var handleId = function(id, el) {
  window.hotx.addElement(id, el);
};
var handleForm = function(element, hotForm, method, endpoint, hotEvent) {
  const formElement = hotForm === "this" ? element : document.querySelector(hotForm);
  const formData = new FormData(formElement);
  window.hotx.dispatch(method, endpoint, hotEvent, formData).then(() => formElement.reset());
};
var handleSubmit = function(el) {
  const attr = el.getAttribute("hot:submit") ?? "";
  const mutations = attr.match(/(\[[^\]]+\])/g)?.map((s) => s.slice(1).slice(0, -1).split(",")) ?? [];
  if (!mutations.length)
    return;
  el.addEventListener("submit", function(e) {
    e.preventDefault();
    mutations.forEach((mutation) => {
      const [target, action, ...args] = mutation;
      const targetEl = target === "this" ? el : document.querySelector(target);
      if (!targetEl)
        return;
      if (action === "setAttribute")
        args[1] === null ? targetEl.removeAttribute(args[0]) : targetEl.setAttribute(args[0], args[1]);
    });
  });
};
var handleTrigger = function(o) {
  o.el.addEventListener(o.trigger, function(e) {
    if (o.form) {
      if (o.post)
        handleForm(o.el, o.form, "POST", o.post, o.event);
      if (o.get)
        handleForm(o.el, o.form, "GET", o.get, o.event);
      if (o.patch)
        handleForm(o.el, o.form, "PATCH", o.patch, o.event);
      if (o.delete)
        handleForm(o.el, o.form, "DELETE", o.delete, o.event);
      if (o.put)
        handleForm(o.el, o.form, "PUT", o.put, o.event);
    }
    if (o.data) {
      if (o.post)
        handleData(o.el, o.data, "POST", o.post, o.event);
      if (o.get)
        handleData(o.el, o.data, "GET", o.get, o.event);
      if (o.patch)
        handleData(o.el, o.data, "PATCH", o.patch, o.event);
      if (o.delete)
        handleData(o.el, o.data, "DELETE", o.delete, o.event);
      if (o.put)
        handleData(o.el, o.data, "PUT", o.put, o.event);
    }
  });
};
var registerElements = function(scope) {
  const attrs = ATTRS.map((attr) => `*[${attr}]:not([hot-ready])`);
  const elements = Array.from(scope.querySelectorAll(`${attrs.join(", ")}`));
  for (const el of elements.values()) {
    const attrs2 = {
      el,
      data: getAttr(el, "hot-data", null),
      delete: getAttr(el, "hot-delete", null),
      event: getAttr(el, "hot-event", null),
      form: getAttr(el, "hot-form", null),
      get: getAttr(el, "hot-get", null),
      id: getAttr(el, "hot-id", null),
      click: getAttr(el, "hot:click", null),
      patch: getAttr(el, "hot-patch", null),
      post: getAttr(el, "hot-post", null),
      put: getAttr(el, "hot-put", null),
      submit: getAttr(el, "hot:submit", null),
      trigger: getAttr(el, "hot-trigger", null)
    };
    if (attrs2.id)
      handleId(attrs2.id, el);
    if (attrs2.trigger)
      handleTrigger(attrs2);
    if (attrs2.click)
      handleClick(el);
    if (attrs2.submit)
      handleSubmit(el);
    el.setAttribute("hot-ready", "true");
  }
};
var ATTRS = [
  "hot-data",
  "hot-delete",
  "hot-form",
  "hot-get",
  "hot-id",
  "hot-patch",
  "hot-post",
  "hot-put",
  "hot-trigger",
  "hot\\:click",
  "hot\\:submit"
];
document.addEventListener("DOMContentLoaded", function() {
  window.hotx = new Hotx;
  registerElements(document);
  new MutationObserver(function(records) {
    for (const r of records)
      registerElements(r.target);
  }).observe(document, {
    childList: true,
    subtree: true
  });
});

//# debugId=72B6140A2F8B867264756e2164756e21
