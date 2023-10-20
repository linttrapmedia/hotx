// impl/browser/runtime.ts
var register = function(scope) {
  const elements = Array.from(scope.querySelectorAll("[hot-x]"));
  for (const element of elements.values()) {
    const hotx = element.getAttribute("hot-x") ?? "{}";
    element.setAttribute("hot-x-ready", hotx);
    element.removeAttribute("hot-x");
    const config = JSON.parse(hotx);
    element.addEventListener(config.trigger, function(e) {
      const el = document.querySelector(config.payload);
      e.preventDefault();
      console.log(config, el);
    });
  }
};
document.addEventListener("DOMContentLoaded", function() {
  register(document);
  new MutationObserver(function(records) {
    for (const r of records)
      register(r.target);
  }).observe(document, {
    childList: true,
    subtree: true
  });
});
