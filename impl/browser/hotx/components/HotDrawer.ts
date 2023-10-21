class HotDrawer extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
          :host([open="true"]) { display: block; }
          :host([open="false"]) { display: none; }
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

  //   attributeChangedCallback(name: string, oldValue: string, newValue: string) {}
}

customElements.define("hot-drawer", HotDrawer);
