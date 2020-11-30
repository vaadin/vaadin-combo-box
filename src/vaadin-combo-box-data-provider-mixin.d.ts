export { ComboBoxDataProviderMixin };

declare function ComboBoxDataProviderMixin<T extends new (...args: any[]) => {}>(
  base: T
): T & ComboBoxDataProviderMixinConstructor;

interface ComboBoxDataProviderMixinConstructor {
  new (...args: any[]): ComboBoxDataProviderMixin;
}

export { ComboBoxDataProviderMixinConstructor };

interface ComboBoxDataProviderMixin {
  /**
   * Number of items fetched at a time from the dataprovider.
   * @attr {number} page-size
   */
  pageSize: number;

  /**
   * Total number of items.
   */
  size: number | undefined;

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
  dataProvider: ComboBoxDataProvider | null | undefined;
  ready(): void;

  /**
   * Clears the cached pages and reloads data from dataprovider when needed.
   */
  clearCache(): void;
}

import { ComboBoxDataProvider } from '../@types/interfaces';
