const batch1 = [
  'dynamic-size-change.html',
  'vaadin-combo-box.html',
  'toggling-dropdown.html',
  'overlay-position.html',
  'selecting-items.html',
  'form-input.html',
  'filtering.html',
  'keyboard.html',
  'scrolling.html',
  'aria.html',
  'using-object-values.html',
];

const batch2 = [
  'data-binding.html',
  'vaadin-combo-box-light.html',
  'item-renderer.html',
  'item-template.html',
  'vaadin-combo-box-dropdown.html',
  'lazy-loading.html',
  'validation.html',
  'events.html',
  'vaadin-combo-box-light-events.html'
];

const polymer2Only = [
  'late-upgrade.html',
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
