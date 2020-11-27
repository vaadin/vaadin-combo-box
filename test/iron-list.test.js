import { expect } from '@esm-bundle/chai';
import { aTimeout, fixtureSync } from '@open-wc/testing-helpers';
import '@polymer/polymer/lib/elements/dom-if.js';
import { flush } from '@polymer/polymer/lib/utils/flush.js';
import './not-animated-styles.js';
import '../vaadin-combo-box.js';

// TODO: these tests are here to prevent possible regressions with using
// the internal properties of iron-list. These can be removed after this
// logic no longer is implemented in vaadin-combo-box.
describe('visible item count', () => {
  let comboBox;

  beforeEach(() => {
    comboBox = fixtureSync('<vaadin-combo-box></vaadin-combo-box>');
  });

  it('should calculate items correctly when all items are visible', async () => {
    comboBox.items = ['foo', 'bar', 'baz', 'qux'];
    comboBox.open();
    await aTimeout(0);
    expect(comboBox.$.overlay._visibleItemsCount()).to.eql(4);
    expect(comboBox.$.overlay._selector.lastVisibleIndex).to.eql(3);
  });

  it('should calculate items correctly when some items are hidden', async () => {
    const items = [];
    for (let i = 0; i < 100; i++) {
      items.push(i.toString());
    }

    comboBox.items = items;
    comboBox.open();
    await aTimeout(0);
    expect(comboBox.$.overlay._visibleItemsCount()).to.eql(comboBox.$.overlay._selector.lastVisibleIndex + 1);
  });
});

describe('CSS mixin', () => {
  let wrapper, comboBox;

  beforeEach(() => {
    wrapper = fixtureSync(`
      <div>
        <dom-if if="">
          <template>
            <vaadin-combo-box label="Label" items="[1, 2]"></vaadin-combo-box>
          </template>
        </dom-if>
      </div>
    `);
  });

  it('should extract the iron-list border mixin into custom CSS properties', () => {
    // render dom-if template
    flush();

    comboBox = wrapper.querySelector('vaadin-combo-box');
    comboBox.open();

    const selector = comboBox.$.overlay._selector;
    ['border-width', 'border-style', 'border-color'].forEach((prop) => {
      expect(getComputedStyle(selector).getPropertyValue(`--iron-list-items-container_-_${prop}`)).to.be.ok;
    });
  });
});
