/// <reference lib="dom" />
import { Hotx } from "./Hotx";

function getHotDataAttr(element: Element) {
  const val = element.getAttribute("hot-data");
  return val ?? null;
}

function getHotDeleteAttr(element: Element) {
  const val = element.getAttribute("hot-delete");
  return val ?? null;
}

function getHotEventAttr(element: Element) {
  const val = element.getAttribute("hot-event");
  return val ?? "";
}

function getHotFormAttr(element: Element) {
  const val = element.getAttribute("hot-form");
  return val ?? null;
}

function getHotPatchAttr(element: Element) {
  const val = element.getAttribute("hot-patch");
  return val ?? null;
}

function getHotPostAttr(element: Element) {
  const val = element.getAttribute("hot-post");
  return val ?? null;
}

function getHotPutAttr(element: Element) {
  const val = element.getAttribute("hot-put");
  return val ?? null;
}

function getHotGetAttr(element: Element) {
  const val = element.getAttribute("hot-get");
  return val ?? null;
}

function getHotTriggerAttr(element: Element) {
  const val = element.getAttribute("hot-trigger");
  const defaultVal =
    element.tagName === "INPUT"
      ? "change"
      : element.tagName === "SELECT"
      ? "change"
      : element.tagName === "TEXTAREA"
      ? "change"
      : element.tagName === "FORM"
      ? "submit"
      : "click";
  return val ?? defaultVal;
}

function getHotWebComponent(element: Element) {
  const val = element.getAttribute("hot-web-component");
  return val ?? null;
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

function handleWebComponent(hotWebComponent: string) {
  const webElements = hotWebComponent.split(";");
  for (const element of webElements) {
    const [selector, ...config] = element.split(":");
    const webElement = document.querySelector(selector);
    console.log(webElement);
    if (!webElement) continue;
    for (const entry of config) {
      for (const keyVal of entry.split(",")) {
        const [key, val] = keyVal.split("=");
        webElement.setAttribute(key, val);
      }
    }
  }
}

function registerHotxElements(scope: Document | Element) {
  const elements = Array.from(
    scope.querySelectorAll(
      "[hot-post],[hot-get],[hot-patch],[hot-delete],[hot-put],[hot-form],[hot-data],[hot-trigger],[hot-web-component]"
    )
  );
  for (const el of elements.values()) {
    if (el.getAttribute("hot-ready") === "true") continue;
    const hotData = getHotDataAttr(el);
    const hotDelete = getHotDeleteAttr(el);
    const hotEvent = getHotEventAttr(el);
    const hotForm = getHotFormAttr(el);
    const hotGet = getHotGetAttr(el);
    const hotPatch = getHotPatchAttr(el);
    const hotPost = getHotPostAttr(el);
    const hotPut = getHotPutAttr(el);
    const hotTrigger = getHotTriggerAttr(el);
    const hotWebComponent = getHotWebComponent(el);
    el.setAttribute("hot-ready", "true");
    el.addEventListener(hotTrigger, function (e) {
      e.preventDefault();

      // handle "form" submission
      if (hotForm) {
        if (hotPost) handleForm(el, hotForm, "POST", hotPost, hotEvent);
        if (hotGet) handleForm(el, hotForm, "GET", hotGet, hotEvent);
        if (hotPatch) handleForm(el, hotForm, "PATCH", hotPatch, hotEvent);
        if (hotDelete) handleForm(el, hotForm, "DELETE", hotDelete, hotEvent);
        if (hotPut) handleForm(el, hotForm, "PUT", hotPut, hotEvent);
      }

      // handle "data" submission
      if (hotData) {
        if (hotPost) handleData(el, hotData, "POST", hotPost, hotEvent);
        if (hotGet) handleData(el, hotData, "GET", hotGet, hotEvent);
        if (hotPatch) handleData(el, hotData, "PATCH", hotPatch, hotEvent);
        if (hotDelete) handleData(el, hotData, "DELETE", hotDelete, hotEvent);
        if (hotPut) handleData(el, hotData, "PUT", hotPut, hotEvent);
      }

      // handle "web-el" submission
      if (hotWebComponent) handleWebComponent(hotWebComponent);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  (<any>window).hotx = new Hotx();

  // register hotx elements on page load
  registerHotxElements(document);

  // register hotx elements on page mutation
  new MutationObserver(function (records) {
    for (const r of records) registerHotxElements(r.target as Element);
  }).observe(document, {
    childList: true,
    subtree: true,
  });
});
