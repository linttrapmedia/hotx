/// <reference lib="dom" />

const traitMap: Record<HotTrait[0], any> = {
  append: () => {},
  clear: () => {},
  prepend: () => {},
  replace: () => {},
  request: () => {},
  select: () => {},
  trigger: () => {},
};

function register(scope: HTMLElement | Document) {
  const elements = Array.from(scope.querySelectorAll("[hot-x]"));
  for (const element of elements.values()) {
    const traits = element.getAttribute("hot-x") ?? "[]";
    for (const trait of JSON.parse(traits).values()) {
      const [name, ...args] = trait as HotTrait;
      if (traitMap[name]) traitMap[name](element, ...args);
      element.setAttribute("hot-x-ready", traits); // keep copy around for debugging
      element.removeAttribute("hot-x"); // remove attribute to prevent re-registering
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  register(document);
  new MutationObserver(function (records) {
    for (const r of records) register(r.target as HTMLElement);
  }).observe(document, {
    childList: true,
    subtree: true,
  });
});
