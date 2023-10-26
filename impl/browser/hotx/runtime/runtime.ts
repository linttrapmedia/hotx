/// <reference lib="dom" />
import { Hotx } from "./Hotx";

const ATTRS = [
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
  "hot\\:submit",
];

function getAttr(element: Element, attr: string, nullVal: any = null) {
  const val = element.getAttribute(attr);
  return val ?? nullVal;
}

function handleClick(el: Element) {
  el.addEventListener("click", function (e: any) {
    const input = el.getAttribute("hot:click") ?? "";
    const mutations = input
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);
    mutations.forEach((mutation) => {
      const regex = /^([^\[]+)\[(.+)\]$/;
      const matches = mutation.match(regex);
      if (!matches) return;
      const selector = matches[1];
      const attributes = matches[2];
      if (selector && attributes) {
        attributes
          .slice(0, -1)
          .split(",")
          .map((a) => a.trim())
          .forEach((attr) => {
            const [key, value] = attr.split("=");
            if (selector === "this") return el.setAttribute(key, value);
            document.querySelector(selector)?.setAttribute(key, value);
          });
      }
    });
  });
}

function handleData(
  element: Element,
  hotData: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  endpoint: string,
  hotEvent: string
) {
  const data =
    hotData === "this"
      ? (element as any)
      : (document.querySelector(hotData) as HTMLFormElement);
  const formData = new FormData();
  Object.entries(data.dataset).forEach(([key, value]) =>
    formData.append(key, value as any)
  );
  window.hotx.dispatch(method, endpoint, hotEvent, formData);
}

function handleId(id: string, el: Element) {
  window.hotx.addElement(id, el);
}

function handleForm(
  element: Element,
  hotForm: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  endpoint: string,
  hotEvent: string
) {
  const formElement =
    hotForm === "this"
      ? (element as any)
      : (document.querySelector(hotForm) as HTMLFormElement);
  const formData = new FormData(formElement);
  window.hotx
    .dispatch(method, endpoint, hotEvent, formData)
    .then(() => formElement.reset());
}

function handleSubmit(el: Element) {
  el.addEventListener("submit", function (e: any) {
    e.preventDefault();
    const input = el.getAttribute("hot:submit") ?? "";
    const mutations = input
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);
    mutations.forEach((mutation) => {
      const regex = /^([^\[]+)\[(.+)\]$/;
      const matches = mutation.match(regex);
      if (!matches) return;
      const selector = matches[1];
      const attributes = matches[2];
      if (selector && attributes) {
        attributes
          .slice(0, -1)
          .split(",")
          .map((a) => a.trim())
          .forEach((attr) => {
            const [key, value] = attr.split("=");
            if (selector === "this") return el.setAttribute(key, value);
            document.querySelector(selector)?.setAttribute(key, value);
          });
      }
    });
  });
}

function handleTrigger(o: {
  el: Element;
  data: string;
  delete: string;
  event: string;
  form: string;
  get: string;
  id: string;
  patch: string;
  post: string;
  put: string;
  trigger: string;
}) {
  o.el.addEventListener(o.trigger, function (e: any) {
    // handle "form" submission
    if (o.form) {
      if (o.post) handleForm(o.el, o.form, "POST", o.post, o.event);
      if (o.get) handleForm(o.el, o.form, "GET", o.get, o.event);
      if (o.patch) handleForm(o.el, o.form, "PATCH", o.patch, o.event);
      if (o.delete) handleForm(o.el, o.form, "DELETE", o.delete, o.event);
      if (o.put) handleForm(o.el, o.form, "PUT", o.put, o.event);
    }

    // handle "data" submission
    if (o.data) {
      if (o.post) handleData(o.el, o.data, "POST", o.post, o.event);
      if (o.get) handleData(o.el, o.data, "GET", o.get, o.event);
      if (o.patch) handleData(o.el, o.data, "PATCH", o.patch, o.event);
      if (o.delete) handleData(o.el, o.data, "DELETE", o.delete, o.event);
      if (o.put) handleData(o.el, o.data, "PUT", o.put, o.event);
    }
  });
}

function registerElements(scope: Document | Element) {
  const attrs = ATTRS.map((attr) => `*[${attr}]:not([hot-ready])`);
  const elements = Array.from(scope.querySelectorAll(`${attrs.join(", ")}`));
  for (const el of elements.values()) {
    const attrs = {
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
      trigger: getAttr(el, "hot-trigger", null),
    };
    if (attrs.id) handleId(attrs.id, el);
    if (attrs.trigger) handleTrigger(attrs);
    if (attrs.click) handleClick(el);
    if (attrs.submit) handleSubmit(el);
    el.setAttribute("hot-ready", "true");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  (<any>window).hotx = new Hotx();

  // register hotx elements on page load
  registerElements(document);

  // register hotx elements on page mutation
  new MutationObserver(function (records) {
    for (const r of records) registerElements(r.target as Element);
  }).observe(document, {
    childList: true,
    subtree: true,
  });
});
