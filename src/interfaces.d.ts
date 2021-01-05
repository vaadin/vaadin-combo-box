import { ComboBoxElement } from '../src/vaadin-combo-box.js';

export interface ComboBoxItemModel<T> {
  index: number;
  item: T;
}

export type ComboBoxRenderer<T> = (
  root: HTMLElement,
  comboBox: ComboBoxElement<T>,
  model: ComboBoxItemModel<T>
) => void;

export type ComboBoxDataProviderCallback<T> = (
  items: Array<T>,
  size: number
) => void;

export interface ComboBoxDataProviderParams {
  page: number;
  pageSize: number;
  filter: string;
}

export type ComboBoxDataProvider<T> = (
  params: ComboBoxDataProviderParams,
  callback: ComboBoxDataProviderCallback<T>
) => void;

/**
 * Fired when the `opened` property changes.
 */
export type ComboBoxOpenedChanged = CustomEvent<{ value: boolean }>;

/**
 * Fired when the `invalid` property changes.
 */
export type ComboBoxInvalidChanged = CustomEvent<{ value: boolean }>;

/**
 * Fired when the `value` property changes.
 */
export type ComboBoxValueChanged = CustomEvent<{ value: string }>;

/**
 * Fired when the `filter` property changes.
 */
export type ComboBoxFilterChanged = CustomEvent<{ value: string }>;

/**
 * Fired when the `selectedItem` property changes.
 */
export type ComboBoxSelectedItemChanged<T> = CustomEvent<{ value: T }>;

export interface ComboBoxElementEventMap<T> {
  'opened-changed': ComboBoxOpenedChanged;

  'filter-changed': ComboBoxFilterChanged;

  'invalid-changed': ComboBoxInvalidChanged;

  'value-changed': ComboBoxValueChanged;

  'selected-item-changed': ComboBoxSelectedItemChanged<T>;
}

export type ComboBoxEventMap<T> = HTMLElementEventMap & ComboBoxElementEventMap<T>;
