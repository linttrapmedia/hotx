/// <reference lib="dom" />
import { Hotx } from "./Hotx";

function getHotDataAttr(element: Element) {
  const val = element.getAttribute("hot-data");
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

function getHotMachineAttr(element: Element) {
  const val = element.getAttribute("hot-machine");
  return val ?? "/api";
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

function getHotWebElementAttr(element: Element) {
  const val = element.getAttribute("hot-web-element");
  return val ?? null;
}

function handleDataSubmission(
  element: Element,
  hotData: string,
  hotMachine: string,
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
  window.hotx.dispatch(hotMachine, hotEvent, formData);
}

function handleFormSubmission(
  element: Element,
  hotForm: string,
  hotMachine: string,
  hotEvent: string
) {
  const formElement =
    hotForm === "this"
      ? (element as any)
      : (document.querySelector(hotForm) as HTMLFormElement);
  const formData = new FormData(formElement);
  window.hotx
    .dispatch(hotMachine, hotEvent, formData)
    .then(() => formElement.reset());
}

function handleWebElementSubmission(element: Element, hotWebElement: string) {
  const webElements = hotWebElement.split(";");
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
  const elements = Array.from(scope.querySelectorAll("[hot-event]"));
  for (const element of elements.values()) {
    if (element.getAttribute("hot-ready") === "true") continue;
    const hotMachine = getHotMachineAttr(element);
    const hotEvent = getHotEventAttr(element);
    const hotForm = getHotFormAttr(element);
    const hotData = getHotDataAttr(element);
    const hotTrigger = getHotTriggerAttr(element);
    const hotWebElement = getHotWebElementAttr(element);
    element.setAttribute("hot-ready", "true");
    element.addEventListener(hotTrigger, function (e) {
      e.preventDefault();

      // handle "form" submission
      if (hotForm) handleFormSubmission(element, hotForm, hotMachine, hotEvent);

      // handle "data" submission
      if (hotData) handleDataSubmission(element, hotData, hotMachine, hotEvent);

      // handle "web-element" submission
      if (hotWebElement) handleWebElementSubmission(element, hotWebElement);
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
