/// <reference lib="dom" />

export type HotxResponse = {
  state: any;
  data: FormData;
  dom: any;
};

export type HotAttribute = {
  target: string;
  attribute: string;
  value?: string | null;
};

export class Hotx {
  _state: string;
  _hotAttributes: { [event: string]: HotAttribute[] };
  constructor() {
    this._state = "INIT";
    this._hotAttributes = {};
  }
  dispatch(method: string, api: string, event: string, data: FormData) {
    this.pub(`before:${event}`);
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
        Object.entries(json.dom).forEach(([action, updates]) => {
          Object.entries(updates as any).forEach(([selector, html]) => {
            const el: any = document.querySelector(selector);
            if (el) el[action] = html;
          });
        });
        this.pub(`after:${event}`);
        return json;
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
  pub(event: string) {
    if (!this._hotAttributes[`${event}`]) return;
    this._hotAttributes[`${event}`].forEach(({ target, attribute, value }) => {
      const el: any = document.querySelector(target);
      if (!value) return el.removeAttribute(attribute);
      if (el) return el.setAttribute(attribute, value);
    });
  }
  subHotAttribute(
    event: string,
    target: string,
    attribute: string,
    value?: string | null
  ) {
    if (!this._hotAttributes[event]) this._hotAttributes[event] = [];
    this._hotAttributes[event].push({ target, attribute, value });
  }
  get state() {
    return this._state;
  }
  set state(newState: string) {
    this._state = newState;
  }
}
