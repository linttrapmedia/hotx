/// <reference lib="dom" />

function register(scope: Document | Element) {
  const elements = Array.from(scope.querySelectorAll("[hot-x]"));
  for (const element of elements.values()) {
    const hotx = element.getAttribute("hot-x") ?? "{}";
    element.setAttribute("hot-x-ready", hotx); // keep copy around for debugging
    element.removeAttribute("hot-x"); // remove attribute to prevent re-registering
    const config = JSON.parse(hotx);
    element.addEventListener(config.trigger, function (e) {
      const el = document.querySelector(config.payload);
      e.preventDefault();
      console.log(config, el);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  register(document);
  new MutationObserver(function (records) {
    for (const r of records) register(r.target as Element);
  }).observe(document, {
    childList: true,
    subtree: true,
  });
});
