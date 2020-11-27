import { expect } from '@esm-bundle/chai';
import { fixtureSync, nextFrame } from '@open-wc/testing-helpers';
import '../src/vaadin-combo-box.js';

describe('dynamic size change', () => {
  function scrollToIndex(comboBox, index) {
    comboBox.$.overlay._scrollIntoView(index);
  }

  function getVisibleItems(comboBox) {
    return Array.from(comboBox.$.overlay._selector.querySelectorAll('vaadin-combo-box-item'))
      .filter((item) => !item.hidden)
      .filter((item) => {
        const itemRect = item.getBoundingClientRect();
        const overlayRect = comboBox.$.overlay.$.dropdown.$.overlay.$.content.getBoundingClientRect();
        return itemRect.bottom >= overlayRect.top && itemRect.top <= overlayRect.bottom;
      });
  }

  describe('reduce size once scrolled to end', () => {
    let comboBox;
    const INITIAL_SIZE = 600;
    const ACTUAL_SIZE = 500;

    function dataProvider(params, callback) {
      const items = Array(...new Array(params.pageSize)).map((_, i) => {
        return {
          label: 'Item ' + (params.pageSize * params.page + i)
        };
      });

      let size = ACTUAL_SIZE;
      if (!comboBox.size || comboBox.size === INITIAL_SIZE) {
        // Pages may be requested not sequentially.
        // Not to change combobox's size, if once changed to actual value
        size = params.page > ACTUAL_SIZE / params.pageSize - 1 ? ACTUAL_SIZE : INITIAL_SIZE;
      }

      callback(items, size);
    }

    beforeEach(() => {
      comboBox = fixtureSync('<vaadin-combo-box></vaadin-combo-box>');
      comboBox.dataProvider = dataProvider;
    });

    it('should not have item placeholders after size gets reduced', async () => {
      comboBox.opened = true;
      scrollToIndex(comboBox, comboBox.size - 1);
      await nextFrame();
      const items = getVisibleItems(comboBox);
      expect(items.length).to.be.above(5);
      items.forEach((item) => {
        expect(item.$.content.textContent).to.be.ok;
      });
    });
  });
});
