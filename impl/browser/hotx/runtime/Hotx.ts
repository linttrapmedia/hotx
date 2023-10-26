/// <reference lib="dom" />

export type HotxResponse = {
  state: any;
  data: FormData;
  dom: any;
};

export class Hotx {
  _state: string;
  _elements: Record<string, Element>;
  constructor() {
    this._state = "INIT";
    this._elements = {};
  }
  addElement(id: string, element: Element) {
    this._elements[id] = element;
  }
  dispatch(method: string, api: string, event: string, data: FormData) {
    data.append("state", this.state);
    data.append("event", event);

    const config = (() => {
      if (method !== "GET")
        return { api, options: { method: method, body: data } };
      const urlSearchParams = new URLSearchParams();
      data.forEach((value, key) => urlSearchParams.append(key, value as any));
      return { api: api + "?" + urlSearchParams.toString() };
    })();

    return fetch(config.api, config.options)
      .then(async (response) => {
        if (!response.ok) throw new Error(response.statusText);
        const json = (await response.json()) as HotxResponse;
        window.hotx.state = json.state;
        if (!json.dom || json.dom.length === 0) return json;
        json.dom.forEach(
          ([selector, action, ...args]: [string, string, ...any]) => {
            const el: any = document.querySelector(selector);
            if (!el) return;
            if (action === "outerHTML") el.outerHTML = args[0];
            if (action === "innerHTML") el.innerHTML = args[0];
            if (action === "toggleAttribute") el.toggleAttribute(args[0]);
            if (action === "removeAttribute") el.removeAttribute(args[0]);
            if (action === "setAttribute")
              el.setAttribute(args[0], args[1] ?? "");
          }
        );
        return json;
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
  get elements() {
    return this._elements;
  }
  get state() {
    return this._state;
  }
  set state(newState: string) {
    this._state = newState;
  }
}
