class b extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"});const s=document.createElement("template");s.style.right=this.getAttribute("open")==="true"?"0":"-50vw",s.innerHTML=`
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
      `;const C=document.importNode(s.content,!0);this.shadowRoot.appendChild(C)}static get observedAttributes(){return["open"]}attributeChangedCallback(s,C,c){if(s==="open"&&C!==c)this.updateStyles()}updateStyles(){this.style.right=this.getAttribute("open")==="true"?"0":"-50vw"}}customElements.define("hot-drawer",b);

//# debugId=3A9B30E3C62AF83864756e2164756e21
