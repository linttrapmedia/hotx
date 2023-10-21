// impl/browser/Hotx.ts
class Hotx {
  _state;
  constructor() {
    this._state = "INIT";
  }
  dispatch(event, data) {
    data.append("state", this.state);
    data.append("event", event);
    return fetch("/api/state-machine", {
      method: "POST",
      body: data
    }).then(async (response) => {
      if (!response.ok)
        throw new Error(response.statusText);
      const json = await response.json();
      window.hotx.state = json.state;
      Object.entries(json.domUpdates).forEach(([selector, html]) => {
        const el = document.querySelector(selector);
        if (el)
          el.innerHTML = html;
      });
      return json;
    }).catch((error) => {
      console.error("There has been a problem with your fetch operation:", error);
    });
  }
  get state() {
    return this._state;
  }
  set state(newState) {
    this._state = newState;
  }
}

// impl/browser/runtime.ts
document.addEventListener("DOMContentLoaded", function() {
  window.hotx = new Hotx;
  function register(scope) {
    const elements = Array.from(scope.querySelectorAll("[hot-event]"));
    for (const element of elements.values()) {
      if (element.getAttribute("hot-ready") === "true")
        continue;
      const hotEvent = element.getAttribute("hot-event");
      const hotForm = element.getAttribute("hot-form");
      const hotData = element.getAttribute("hot-data");
      const hotTrigger = element.getAttribute("hot-trigger") ?? "click";
      element.setAttribute("hot-ready", "true");
      element.addEventListener(hotTrigger, function(e) {
        e.preventDefault();
        if (hotForm) {
          const form = document.querySelector(hotForm);
          const formData = new FormData(form);
          window.hotx.dispatch(hotEvent, formData).then(() => form.reset());
        }
        if (hotData) {
          const data = hotData === "this" ? element : document.querySelector(hotData);
          const formData = new FormData;
          Object.entries(data.dataset).forEach(([key, value]) => formData.append(key, value));
          window.hotx.dispatch(hotEvent, formData);
        }
      });
    }
  }
  register(document);
  new MutationObserver(function(records) {
    for (const r of records)
      register(r.target);
  }).observe(document, {
    childList: true,
    subtree: true
  });
});
