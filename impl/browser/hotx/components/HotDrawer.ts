class HotDrawer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.style.right = this.getAttribute("open") === "true" ? "0" : "-50vw";
    template.innerHTML = `
        <style>
          :host([open="true"]) { display: block; }
          :host([open="false"]) { display: none; }
          :host {
            background-color: var(--color-black);
            position: fixed;
            top: 0;
            right: -50vw;
            bottom: 0;
            height: 100vh;
            width: 50vw;
            transition: all 0.3s ease-in-out;
          }
        </style>
        <div>
          <slot name="title"></slot>
          <slot name="body"></slot>
          <slot name="footer"></slot>
        </div>
      `;
    const clone = document.importNode(template.content, true);
    this.shadowRoot!.appendChild(clone);
  }

  static get observedAttributes() {
    return ["open"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "open" && oldValue !== newValue) {
      this.updateStyles();
    }
  }

  updateStyles() {
    this.style.right = this.getAttribute("open") === "true" ? "0" : "-50vw";
  }
}

customElements.define("hot-drawer", HotDrawer);
