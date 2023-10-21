class s extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"});const d=document.createElement("template");d.innerHTML=`
        <style>
          :host([open="true"]) { display: block; }
          :host([open="false"]) { display: none; }
        </style>
        <div>
          <slot name="title"></slot>
          <slot name="body"></slot>
          <slot name="footer"></slot>
        </div>
      `;const c=document.importNode(d.content,!0);this.shadowRoot.appendChild(c)}static get observedAttributes(){return["open"]}}customElements.define("hot-drawer",s);

//# debugId=D2F5D9621FAEEC1964756e2164756e21
