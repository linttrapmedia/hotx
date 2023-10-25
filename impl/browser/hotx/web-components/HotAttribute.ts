class HotAttribute extends HTMLElement {
  connectedCallback() {
    const event = this.getAttribute("event");
    const target = this.getAttribute("target");
    const value = this.getAttribute("value");
    const attribute = this.getAttribute("attribute");
    if (!event || !target || !attribute) return;
    document.addEventListener("DOMContentLoaded", () => {
      window.hotx.subHotAttribute(event, target, attribute, value);
    });
  }
}

customElements.define("hot-attribute", HotAttribute);
