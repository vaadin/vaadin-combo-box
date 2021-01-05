import { ThemableMixin } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';

import { ComboBoxMixin } from './vaadin-combo-box-mixin.js';

import { ComboBoxDataProviderMixin } from './vaadin-combo-box-data-provider-mixin.js';

import { ComboBoxDataProvider, ComboBoxEventMap, ComboBoxRenderer } from './interfaces';

/**
 * `<vaadin-combo-box-light>` is a customizable version of the `<vaadin-combo-box>` providing
 * only the dropdown functionality and leaving the input field definition to the user.
 *
 * The element has the same API as `<vaadin-combo-box>`.
 *
 * To create a custom input field, you need to add a child element which has a two-way
 * data-bindable property representing the input value. The property name is expected
 * to be `value` by default. See the example below for a simplest possible example
 * using a `<vaadin-text-field>` element.
 *
 * ```html
 * <vaadin-combo-box-light>
 *   <vaadin-text-field>
 *   </vaadin-text-field>
 * </vaadin-combo-box-light>
 * ```
 *
 * If you are using other custom input fields like `<iron-input>`, you
 * need to define the name of the bindable property with the `attrForValue` attribute.
 *
 * ```html
 * <vaadin-combo-box-light attr-for-value="bind-value">
 *   <iron-input>
 *     <input>
 *   </iron-input>
 * </vaadin-combo-box-light>
 * ```
 *
 * In the next example you can see how to create a custom input field based
 * on a `<paper-input>` decorated with a custom `<iron-icon>` and
 * two `<paper-button>`s to act as the clear and toggle controls.
 *
 * ```html
 * <vaadin-combo-box-light>
 *   <paper-input label="Elements" class="input">
 *     <iron-icon icon="toll" slot="prefix"></iron-icon>
 *     <paper-button slot="suffix" class="clear-button">Clear</paper-button>
 *     <paper-button slot="suffix" class="toggle-button">Toggle</paper-button>
 *   </paper-input>
 * </vaadin-combo-box-light>
 * ```
 *
 * @fires {CustomEvent<string>} filter-changed
 * @fires {CustomEvent<boolean>} invalid-changed
 * @fires {CustomEvent<boolean>} opened-change
 * @fires {CustomEvent<unknown>} selected-item-changed
 * @fires {CustomEvent<string>} value-changed
 */
declare class ComboBoxLightElement<Item> extends ComboBoxDataProviderMixin(ComboBoxMixin(ThemableMixin(HTMLElement))) {
  /**
   * Function that provides items lazily. Receives arguments `params`, `callback`
   *
   * `params.page` Requested page index
   *
   * `params.pageSize` Current page size
   *
   * `params.filter` Currently applied filter
   *
   * `callback(items, size)` Callback function with arguments:
   *   - `items` Current page of items
   *   - `size` Total number of items.
   */
  dataProvider: ComboBoxDataProvider<Item> | null | undefined;

  /**
   * Custom function for rendering the content of every item.
   * Receives three arguments:
   *
   * - `root` The `<vaadin-combo-box-item>` internal container DOM element.
   * - `comboBox` The reference to the `<vaadin-combo-box>` element.
   * - `model` The object with the properties related with the rendered
   *   item, contains:
   *   - `model.index` The index of the rendered item.
   *   - `model.item` The item.
   */
  renderer: ComboBoxRenderer<Item> | null | undefined;

  /**
   * A full set of items to filter the visible options from.
   * The items can be of either `String` or `Object` type.
   */
  items: Array<Item> | undefined;

  /**
   * A subset of items, filtered based on the user input. Filtered items
   * can be assigned directly to omit the internal filtering functionality.
   * The items can be of either `String` or `Object` type.
   */
  filteredItems: Array<Item> | undefined;

  /**
   * The selected item from the `items` array.
   */
  selectedItem: Item | null | undefined;

  readonly _propertyForValue: string;

  _inputElementValue: string;

  readonly focused: boolean;

  /**
   * Name of the two-way data-bindable property representing the
   * value of the custom input field.
   * @attr {string} attr-for-value
   */
  attrForValue: string;

  readonly inputElement: Element | undefined;

  addEventListener<K extends keyof ComboBoxEventMap<Item>>(
    type: K,
    listener: (this: ComboBoxLightElement<Item>, ev: ComboBoxEventMap<Item>[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<K extends keyof ComboBoxEventMap<Item>>(
    type: K,
    listener: (this: ComboBoxLightElement<Item>, ev: ComboBoxEventMap<Item>[K]) => void,
    options?: boolean | EventListenerOptions
  ): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'vaadin-combo-box-light': ComboBoxLightElement<any>;
  }
}

export { ComboBoxLightElement };
