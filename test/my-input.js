/*
  This custom element is needed for testing the "attr-for-value" feature of
  <vaadin-combo-box-light>
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-input/iron-input.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class MyInput extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: inline-block;
      }
    </style>
    <iron-input id="input" bind-value="{{customValue}}">
      <input>
    </iron-input>
`;
  }

  static get is() {
    return 'my-input';
  }

  static get properties() {
    return {
      customValue: {
        type: String,
        notify: true
      }
    };
  }
}
window.customElements.define('my-input', MyInput);
