/**
 * @license
 * Copyright (c) 2020 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import { DirMixin } from '@vaadin/vaadin-element-mixin/vaadin-dir-mixin.js';

/**
 * The default element used for items in the vaadin-combo-box.
 *
 * ### Styling
 *
 * The following shadow DOM parts are available for styling:
 *
 * Part name | Description
 * ---|---
 * `content` | The element that wraps the item label or template content
 *
 * The following state attributes are exposed for styling:
 *
 * Attribute    | Description | Part name
 * -------------|-------------|------------
 * `selected` | Set when the item is selected | :host
 * `focused` | Set when the item is focused | :host
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * @mixes ThemableMixin
 * @private
 */
class ComboBoxItemElement extends ThemableMixin(DirMixin(PolymerElement)) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }
      </style>
      <div part="content" id="content"></div>
    `;
  }

  static get is() {
    return 'vaadin-combo-box-item';
  }

  static get properties() {
    return {
      /**
       * The index of the item
       */
      index: Number,

      /**
       * The item to render
       * @type {(String|Object)}
       */
      item: Object,

      /**
       * The text label corresponding to the item
       */
      label: String,

      /**
       * True when item is selected
       */
      selected: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      /**
       * True when item is focused
       */
      focused: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      /**
       * The template instance corresponding to the item
       */
      _itemTemplateInstance: Object,

      /**
       * Custom function for rendering the content of the `<vaadin-combo-box-item>` propagated from the combo box element.
       */
      renderer: Function,

      /**
       * Saved instance of a custom renderer function.
       */
      _oldRenderer: Function
    };
  }

  static get observers() {
    return [
      '_rendererOrItemChanged(renderer, index, item.*)',
      '_updateLabel(label, _itemTemplateInstance)',
      '_updateTemplateInstanceVariable("index", index, _itemTemplateInstance)',
      '_updateTemplateInstanceVariable("item", item, _itemTemplateInstance)',
      '_updateTemplateInstanceVariable("selected", selected, _itemTemplateInstance)',
      '_updateTemplateInstanceVariable("focused", focused, _itemTemplateInstance)'
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this._itemTemplateInstance) {
      // 2.0 has __dataHost. Might want to consider assigning combobox reference directly to item.
      const overlay = this.getRootNode().host.getRootNode().host;
      const dropdown = overlay.__dataHost;
      const comboBoxOverlay = dropdown.getRootNode().host;
      this._comboBox = comboBoxOverlay.getRootNode().host;
      this._comboBox._ensureTemplatized();
      if (this._comboBox._TemplateClass) {
        this._itemTemplateInstance = new this._comboBox._TemplateClass({});
        this.$.content.textContent = '';
        this.$.content.appendChild(this._itemTemplateInstance.root);
      }
    }

    const hostDir = this._comboBox.getAttribute('dir');
    if (hostDir) {
      this.setAttribute('dir', hostDir);
    }
  }

  _render() {
    if (!this.renderer) {
      return;
    }

    const model = {
      index: this.index,
      item: this.item
    };

    this.renderer(this.$.content, this._comboBox, model);
  }

  _rendererOrItemChanged(renderer, index, item) {
    if (item === undefined || index === undefined) {
      return;
    }

    if (this._oldRenderer !== renderer) {
      this.$.content.innerHTML = '';
    }

    if (renderer) {
      this._oldRenderer = renderer;
      this._render();
    }
  }

  _updateLabel(label, _itemTemplateInstance) {
    if (_itemTemplateInstance === undefined && this.$.content && !this.renderer) {
      // Only set label to textContent no template
      this.$.content.textContent = label;
    }
  }

  _updateTemplateInstanceVariable(variable, value, _itemTemplateInstance) {
    if (variable === undefined || value === undefined || _itemTemplateInstance === undefined) {
      return;
    }
    _itemTemplateInstance[variable] = value;
  }
}

customElements.define(ComboBoxItemElement.is, ComboBoxItemElement);
