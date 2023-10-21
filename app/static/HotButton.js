// impl/browser/HotButton.ts
class HotButton extends HTMLElement {
  event;
  form;
  data;
  button;
  observer;
  static get observedAttributes() {
    return ["event", "select"];
  }
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    this.button = document.createElement("button");
    shadowRoot.appendChild(this.button);
    this.button.addEventListener("click", this.handleClick.bind(this));
    this.observer = new MutationObserver(() => this.updateButtonText());
    const style = document.createElement("style");
    style.textContent = `
      /* Add your CSS rules here */
      button {
        background-color: #007bff;
        border: none;
        color: white;
        padding: 10px 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 4px;
      }
    `;
    shadowRoot.appendChild(style);
  }
  connectedCallback() {
    this.updateButtonText();
    this.observer.observe(this, { childList: true });
  }
  disconnectedCallback() {
    this.observer.disconnect();
  }
  updateButtonText() {
    this.button.textContent = this.textContent?.trim() || "Button";
  }
  handleClick() {
    const formAttr = this.getAttribute("form");
    const dataAttr = this.getAttribute("data");
    const eventAttr = this.getAttribute("event");
    console.log(formAttr, dataAttr, eventAttr);
    if (formAttr) {
      const form = document.querySelector(formAttr);
      const formData = new FormData(form);
      window.hotx.dispatch(eventAttr, formData).then(() => form.reset());
    }
    if (dataAttr) {
      const data = dataAttr === "this" ? this : document.querySelector(dataAttr);
      const formData = new FormData;
      Object.entries(data.dataset).forEach(([key, value]) => formData.append(key, value));
      window.hotx.dispatch(eventAttr, formData);
    }
  }
}
customElements.define("hot-button", HotButton);
