const cachedWrappers = [];
const templates = {};
/**
 * Creates a wrapper as a direct child of `<body>` to put the tested element into.
 * Need to be in the DOM to test for example `connectedCallback()` on elements.
 *
 * @param {!Element} parentNode
 * @return {Element} wrapping node
 */
function fixtureWrapper(parentNode = document.createElement('div')) {
  document.body.appendChild(parentNode);
  cachedWrappers.push(parentNode);
  return parentNode;
}

// # sourceMappingURL=fixture-wrapper.js.map

/**
 * Creates a `<template>` element from a provided string template.
 *
 * @param {string} html
 * @return {HTMLTemplateElement}
 */
function template(html) {
  let tpl = templates[html];
  if (!tpl) {
    tpl = document.createElement('template');
    tpl.innerHTML = html;
    templates[html] = tpl;
  }
  return tpl;
}
/**
 * Setups an element synchronously from the provided string template and puts it in the DOM.
 * Uses `document.importNode` to ensure proper custom elements upgrade timings.
 *
 * @template {Element} T - Is an element or a node
 * @param {!string} html
 * @param {Element=} wrapper
 * @return {T}
 */
function fixtureSync(html, wrapper) {
  const tpl = template(html);
  const parentNode = fixtureWrapper(wrapper);
  parentNode.appendChild(document.importNode(tpl.content, true));
  return parentNode.firstElementChild;
}
// # sourceMappingURL=fixture-no-side-effect.js.map