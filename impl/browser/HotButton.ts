class HotButton extends HTMLElement {
  post?: string;
  select?: string;
  button: HTMLButtonElement;
  observer: MutationObserver;

  static get observedAttributes() {
    return ["post", "select"];
  }

  constructor() {
    super();

    this.post = this.getAttribute("post") || "";
    this.select = this.getAttribute("select") || "";

    const shadowRoot = this.attachShadow({ mode: "open" });

    this.button = document.createElement("button");
    shadowRoot.appendChild(this.button);

    this.button.addEventListener("click", this.handleClick.bind(this));

    this.observer = new MutationObserver(() => {
      this.updateButtonText();
    });
  }

  connectedCallback() {
    this.updateButtonText();

    // Start observing changes to child nodes
    this.observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    // Disconnect the observer when the element is removed from the DOM
    this.observer.disconnect();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "post") {
      this.post = newValue;
    } else if (name === "select") {
      this.select = newValue;
    }
  }

  private updateButtonText() {
    this.button.textContent = this.textContent?.trim() || "Button";
  }

  private handleClick() {
    const form = document.querySelector(this.select || "") as HTMLFormElement;
    const formData = new FormData(form);
    fetch(this.post || "", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
}

customElements.define("hot-button", HotButton);
