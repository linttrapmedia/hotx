// impl/browser/hotx/web-components/HotDrawerToggle.ts
class HotDrawerToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `<slot></slot>`;
    const clone = document.importNode(template.content, true);
    this.shadowRoot.appendChild(clone);
    this.addEventListener("click", () => {
      const selector = `hot-drawer[name="${this.getAttribute("drawer")}"]`;
      const drawer = document.querySelector(selector);
      const isOpen = drawer.getAttribute("open");
      drawer.setAttribute("open", isOpen === "true" ? "false" : "true");
    });
  }
}
customElements.define("hot-drawer-toggle", HotDrawerToggle);

//# debugId=DEE64F1D3BFEB3B964756e2164756e21
