/// <reference lib="dom" />
import { Hotx } from "./Hotx";

document.addEventListener("DOMContentLoaded", function () {
  (<any>window).hotx = new Hotx();

  function register(scope: Document | Element) {
    const elements = Array.from(scope.querySelectorAll("[hot-event]"));
    for (const element of elements.values()) {
      if (element.getAttribute("hot-ready") === "true") continue;
      const hotMachine = element.getAttribute("hot-machine") as any;
      const hotEvent = element.getAttribute("hot-event") as any;
      const hotForm = element.getAttribute("hot-form") as any;
      const hotData = element.getAttribute("hot-data") as any;
      const defaultTrigger =
        element.tagName === "INPUT"
          ? "change"
          : element.tagName === "SELECT"
          ? "change"
          : element.tagName === "TEXTAREA"
          ? "change"
          : element.tagName === "FORM"
          ? "submit"
          : "click";
      const hotTrigger = element.getAttribute("hot-trigger") ?? defaultTrigger;
      element.setAttribute("hot-ready", "true"); // keep copy around for debugging

      element.addEventListener(hotTrigger, function (e) {
        e.preventDefault();
        if (hotForm) {
          const form =
            hotForm === "this"
              ? (element as any)
              : (document.querySelector(hotForm) as HTMLFormElement);
          const formData = new FormData(form);
          window.hotx
            .dispatch(hotMachine, hotEvent, formData)
            .then(() => form.reset());
        }
        if (hotData) {
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
      });
    }
  }

  register(document);
  new MutationObserver(function (records) {
    for (const r of records) register(r.target as Element);
  }).observe(document, {
    childList: true,
    subtree: true,
  });
});
