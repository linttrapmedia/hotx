/// <reference lib="dom" />

type HotxStates = "INIT" | "READY" | "LOADING" | "ERROR";
type HotxEvents = "AddTodo" | "RemoveTodo" | "ToggleTodo";

export type HotxResponse = {
  state: HotxStates;
  data: FormData;
  domUpdates: any;
};

export class Hotx {
  _state: HotxStates;
  constructor() {
    this._state = "INIT";
  }
  dispatch(event: HotxEvents, data: FormData) {
    data.append("state", this.state);
    data.append("event", event);
    return fetch("/api/state-machine", {
      method: "POST",
      body: data,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(response.statusText);
        const json = (await response.json()) as HotxResponse;
        window.hotx.state = json.state;
        Object.entries(json.domUpdates).forEach(([selector, html]) => {
          const el: any = document.querySelector(selector);
          if (el) el.innerHTML = html;
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
