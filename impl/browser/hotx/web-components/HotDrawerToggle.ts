export type HotDrawerAttributes = { drawer: string };

class HotDrawerToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `<slot></slot>`;
    const clone = document.importNode(template.content, true);
    this.shadowRoot!.appendChild(clone);
    this.addEventListener("click", () => {
      const selector = `hot-drawer[name="${this.getAttribute("drawer")}"]`;
      const drawer = document.querySelector(selector);
      const isOpen = drawer!.getAttribute("open");
      drawer!.setAttribute("open", isOpen === "true" ? "false" : "true");
    });
  }
}

customElements.define("hot-drawer-toggle", HotDrawerToggle);
