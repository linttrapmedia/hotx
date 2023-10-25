// impl/browser/hotx/web-components/HotDom.ts
class HotDom extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `<slot></slot>`;
    const clone = document.importNode(template.content, true);
    this.shadowRoot.appendChild(clone);
  }
  connectedCallback() {
    const event = this.getAttribute("event");
    const target = this.getAttribute("target");
    const mutation = this.getAttribute("mutation");
    const value = this.getAttribute("value");
    const attribute = this.getAttribute("attribute");
    console.log("hot-dom", event, target, mutation, value, attribute);
  }
}
customElements.define("hot-dom", HotDom);

//# debugId=072EF9F1EA67577864756e2164756e21
