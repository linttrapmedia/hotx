// impl/browser/hotx/web-components/HotState.ts
class HotState extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `<slot></slot>`;
    const clone = document.importNode(template.content, true);
    this.shadowRoot.appendChild(clone);
    const beforeEvent = this.getAttribute("before-event");
    const afterEvent = this.getAttribute("after-event");
  }
}
customElements.define("hot-state", HotState);

//# debugId=020573156FDFF2D264756e2164756e21
