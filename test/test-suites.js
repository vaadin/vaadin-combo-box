const batch1 = [
  'test/dynamic-size-change.html',
  'test/vaadin-combo-box.html',
  'test/toggling-dropdown.html',
  'test/overlay-position.html',
  'test/selecting-items.html',
  'test/form-input.html',
  'test/filtering.html',
  'test/keyboard.html',
  'test/scrolling.html',
  'test/aria.html',
  'test/using-object-values.html',
];

const batch2 = [
  'test/data-binding.html',
  'test/vaadin-combo-box-light.html',
  'test/item-renderer.html',
  'test/item-template.html',
  'test/vaadin-combo-box-dropdown.html',
  'test/lazy-loading.html',
  'test/validation.html',
  'test/events.html',
  'test/vaadin-combo-box-light-events.html'
];

const polymer2Only = [
  'test/late-upgrade.html',
];

const all = [
  ...batch1,
  ...batch2,
];

if (typeof window === 'undefined') {
  // Module was imported through the test runner config in a node.js process, export batches and all suites
  module.exports = {
    batch1,
    batch2,
    polymer2Only,
    all,
  };
} else {
  // Module was loaded through script tag in browser, always run all tests here
  window.VaadinGridSuites = all.map(suite => suite.replace('test/', ''));
}
