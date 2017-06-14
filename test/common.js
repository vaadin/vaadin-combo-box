
var ua = navigator.userAgent;
var ios = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
var chrome = /Chrome/i.test(ua);
var edge = /Edge/i.test(ua);
var linux = /Linux/i.test(ua);

const touchDevice = (() => {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
})();

const fire = (type, node, detail) => {
  const evt = new CustomEvent(type, {detail: detail, bubbles: true, cancelable: true, composed: true});
  node.dispatchEvent(evt);

  return evt;
};

const describeSkipIf = (bool, title, callback) => {
  bool = typeof bool == 'function' ? bool() : bool;
  if (bool) {
    describe.skip(title, callback);
  } else {
    describe(title, callback);
  }
};

const describeIf = (bool, title, callback) => {
  bool = typeof bool == 'function' ? bool() : bool;
  describeSkipIf(!bool, title, callback);
};

const getItemArray = length => {
  return new Array(length).join().split(',')
    .map((item, index) => 'item ' + index);
};

// IE11 throws errors when the fixture is removed from the DOM and the focus remains in the native input.
// Also, FF and Chrome are unable to focus the input when tests are run in the headless window manager used in Travis
function monkeyPatchTextFieldFocus() {
  if (window.Vaadin) {
    Vaadin.TextFieldElement.prototype.focus = function() {
      this._setFocused(true);
    };
    Vaadin.TextFieldElement.prototype.blur = function() {
      this._setFocused(false);
    };
  }
}

if (window.Polymer) { // Chrome
  setTimeout(monkeyPatchTextFieldFocus, 1);
} else { // Polyfill
  window.addEventListener('WebComponentsReady', monkeyPatchTextFieldFocus);
}
