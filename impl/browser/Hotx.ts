/// <reference lib="dom" />

type HotxStates = "INIT" | "READY" | "LOADING" | "ERROR";
type HotxEvents = "AddTodo" | "RemoveTodo" | "ToggleTodo";

export type HotxResponse = {
  state: HotxStates;
  data: FormData;
  dom: any;
};

export class Hotx {
  _state: HotxStates;
  constructor() {
    this._state = "INIT";
  }
  dispatch(machine: string, event: HotxEvents, data: FormData) {
    data.append("state", this.state);
    data.append("event", event);
    return fetch(machine ?? "/api", {
      method: "POST",
      body: data,
    })
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
        return json;
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
  get state() {
    return this._state;
  }
  set state(newState: HotxStates) {
    this._state = newState;
  }
}
