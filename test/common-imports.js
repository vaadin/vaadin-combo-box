import '@polymer/iron-test-helpers/test-helpers.js';
import '../vaadin-combo-box.js';
import '../vaadin-combo-box-light.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="not-animated-combo-box-overlay" theme-for="vaadin-combo-box-overlay">
  <template>
    <style include="lumo-combo-box-overlay">
      :host([opening]),
      :host([closing]),
      :host([opening]) [part="overlay"],
      :host([closing]) [part="overlay"] {
        animation: none !important;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
