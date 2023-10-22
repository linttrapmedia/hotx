// impl/browser/hotx/web-components/HotDrawer.ts
class HotDrawer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
          :host {
            background-color: var(--color-black);
            display: block;
            position: fixed;
            top: 0;
            bottom: 0;
            height: 100vh;
            width: 50vw;
            transition: all 0.3s ease-in-out;
          }
          :host([open="true"][align="right"]) { right:0; }
          :host([open="false"][align="right"]) { right: -50vw; }
          :host([open="true"][align="left"]) { left:0; }
          :host([open="false"][align="left"]) { left: -50vw; }
        </style>
        <div>
          <slot name="title"></slot>
          <slot name="body"></slot>
          <slot name="footer"></slot>
        </div>
      `;
    const clone = document.importNode(template.content, true);
    this.shadowRoot.appendChild(clone);
  }
}
customElements.define("hot-drawer", HotDrawer);

//# debugId=6C6957562962E1B464756e2164756e21
