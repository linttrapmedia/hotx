// impl/browser/hotx/runtime/Hotx.ts
class Hotx {
  _state;
  _hotAttributes;
  constructor() {
    this._state = "INIT";
    this._hotAttributes = {};
  }
  dispatch(method, api, event, data) {
    this.pub(`before:${event}`);
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
      Object.entries(json.dom).forEach(([action, updates]) => {
        Object.entries(updates).forEach(([selector, html]) => {
          const el = document.querySelector(selector);
          if (el)
            el[action] = html;
        });
      });
      this.pub(`after:${event}`);
      return json;
    }).catch((error) => {
      console.error("There has been a problem with your fetch operation:", error);
    });
  }
  pub(event) {
    if (!this._hotAttributes[`${event}`])
      return;
    this._hotAttributes[`${event}`].forEach(({ target, attribute, value }) => {
      const el = document.querySelector(target);
      if (!value)
        return el.removeAttribute(attribute);
      if (el)
        return el.setAttribute(attribute, value);
    });
  }
  subHotAttribute(event, target, attribute, value) {
    if (!this._hotAttributes[event])
      this._hotAttributes[event] = [];
    this._hotAttributes[event].push({ target, attribute, value });
  }
  get state() {
    return this._state;
  }
  set state(newState) {
    this._state = newState;
  }
}

// impl/browser/hotx/runtime/runtime.ts
var getHotDataAttr = function(element) {
  const val = element.getAttribute("hot-data");
  return val ?? null;
};
var getHotDeleteAttr = function(element) {
  const val = element.getAttribute("hot-delete");
  return val ?? null;
};
var getHotEventAttr = function(element) {
  const val = element.getAttribute("hot-event");
  return val ?? "";
};
var getHotFormAttr = function(element) {
  const val = element.getAttribute("hot-form");
  return val ?? null;
};
var getHotPatchAttr = function(element) {
  const val = element.getAttribute("hot-patch");
  return val ?? null;
};
var getHotPostAttr = function(element) {
  const val = element.getAttribute("hot-post");
  return val ?? null;
};
var getHotPutAttr = function(element) {
  const val = element.getAttribute("hot-put");
  return val ?? null;
};
var getHotGetAttr = function(element) {
  const val = element.getAttribute("hot-get");
  return val ?? null;
};
var getHotTriggerAttr = function(element) {
  const val = element.getAttribute("hot-trigger");
  const defaultVal = element.tagName === "INPUT" ? "change" : element.tagName === "SELECT" ? "change" : element.tagName === "TEXTAREA" ? "change" : element.tagName === "FORM" ? "submit" : "click";
  return val ?? defaultVal;
};
var handleData = function(element, hotData, method, endpoint, hotEvent) {
  const data = hotData === "this" ? element : document.querySelector(hotData);
  const formData = new FormData;
  Object.entries(data.dataset).forEach(([key, value]) => formData.append(key, value));
  window.hotx.dispatch(method, endpoint, hotEvent, formData);
};
var handleForm = function(element, hotForm, method, endpoint, hotEvent) {
  const formElement = hotForm === "this" ? element : document.querySelector(hotForm);
  const formData = new FormData(formElement);
  window.hotx.dispatch(method, endpoint, hotEvent, formData).then(() => formElement.reset());
};
var registerHotxElements = function(scope) {
  const elements = Array.from(scope.querySelectorAll("[hot-post],[hot-get],[hot-patch],[hot-delete],[hot-put],[hot-form],[hot-data],[hot-trigger]"));
  for (const el of elements.values()) {
    if (el.getAttribute("hot-ready") === "true")
      continue;
    const hotData = getHotDataAttr(el);
    const hotDelete = getHotDeleteAttr(el);
    const hotEvent = getHotEventAttr(el);
    const hotForm = getHotFormAttr(el);
    const hotGet = getHotGetAttr(el);
    const hotPatch = getHotPatchAttr(el);
    const hotPost = getHotPostAttr(el);
    const hotPut = getHotPutAttr(el);
    const hotTrigger = getHotTriggerAttr(el);
    el.setAttribute("hot-ready", "true");
    el.addEventListener(hotTrigger, function(e) {
      e.preventDefault();
      if (hotForm) {
        if (hotPost)
          handleForm(el, hotForm, "POST", hotPost, hotEvent);
        if (hotGet)
          handleForm(el, hotForm, "GET", hotGet, hotEvent);
        if (hotPatch)
          handleForm(el, hotForm, "PATCH", hotPatch, hotEvent);
        if (hotDelete)
          handleForm(el, hotForm, "DELETE", hotDelete, hotEvent);
        if (hotPut)
          handleForm(el, hotForm, "PUT", hotPut, hotEvent);
      }
      if (hotData) {
        if (hotPost)
          handleData(el, hotData, "POST", hotPost, hotEvent);
        if (hotGet)
          handleData(el, hotData, "GET", hotGet, hotEvent);
        if (hotPatch)
          handleData(el, hotData, "PATCH", hotPatch, hotEvent);
        if (hotDelete)
          handleData(el, hotData, "DELETE", hotDelete, hotEvent);
        if (hotPut)
          handleData(el, hotData, "PUT", hotPut, hotEvent);
      }
    });
  }
};
document.addEventListener("DOMContentLoaded", function() {
  window.hotx = new Hotx;
  registerHotxElements(document);
  new MutationObserver(function(records) {
    for (const r of records)
      registerHotxElements(r.target);
  }).observe(document, {
    childList: true,
    subtree: true
  });
});

//# debugId=D315DA1FBED5606C64756e2164756e21
