class HotButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
    <style>
      :host button {
        background-color: var(--color-black);
        border: none;
        color: var(--color-white);
        cursor: pointer;
        padding:10px 20px;
      }
      :host([disabled="true"]) button {
        background-color: var(--color-grey);
        pointer-events: none;
      }
    </style>
    <button><slot></slot></button>
    `;
    const clone = document.importNode(template.content, true);
    this.shadowRoot!.appendChild(clone);
  }
  connectedCallback() {
    // const processing = this.getAttribute("processing");
    // const disabled = this.getAttribute("disabled");
    // console.log("processing", processing, this);
    // console.log("disabled", disabled);
  }
}

customElements.define("hot-button", HotButton);
