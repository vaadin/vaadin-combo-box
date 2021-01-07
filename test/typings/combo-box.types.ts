import { ComboBoxElement } from '../../src/vaadin-combo-box';
import { ComboBoxLightElement } from '../../src/vaadin-combo-box-light';

const assert = <T>(value: T) => value;

type Item = { label: string; value: string };

const comboBox = document.createElement('vaadin-combo-box') as ComboBoxElement<Item>;

comboBox.addEventListener('opened-changed', (event) => {
  assert<boolean>(event.detail.value);
});

comboBox.addEventListener('invalid-changed', (event) => {
  assert<boolean>(event.detail.value);
});

comboBox.addEventListener('value-changed', (event) => {
  assert<string>(event.detail.value);
});

comboBox.addEventListener('filter-changed', (event) => {
  assert<string>(event.detail.value);
});

comboBox.addEventListener('selected-item-changed', (event) => {
  assert<Item>(event.detail.value);
});

const light = document.createElement('vaadin-combo-box-light') as ComboBoxLightElement<Item>;

light.addEventListener('opened-changed', (event) => {
  assert<boolean>(event.detail.value);
});

light.addEventListener('invalid-changed', (event) => {
  assert<boolean>(event.detail.value);
});

light.addEventListener('value-changed', (event) => {
  assert<string>(event.detail.value);
});

light.addEventListener('filter-changed', (event) => {
  assert<string>(event.detail.value);
});

light.addEventListener('selected-item-changed', (event) => {
  assert<Item>(event.detail.value);
});
