import '@vaadin/vaadin-text-field/theme/material/vaadin-text-field.js';
import '@vaadin/vaadin-material-styles/color.js';
import '@vaadin/vaadin-material-styles/font-icons.js';
import '@vaadin/vaadin-material-styles/mixins/field-button.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

const $_documentContainer = html`<dom-module id="material-combo-box" theme-for="vaadin-combo-box">
  <template>
    <style include="material-field-button">
      :host {
        display: inline-flex;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }

      [part="toggle-button"]::before {
        content: var(--material-icons-dropdown);
      }

      :host([opened]) [part="toggle-button"] {
        transform: rotate(180deg);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
