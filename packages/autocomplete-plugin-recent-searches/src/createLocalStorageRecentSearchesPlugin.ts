import { AutocompletePlugin } from '@algolia/autocomplete-core';

import {
  createRecentSearchesPlugin,
  CreateRecentSearchesPluginParams,
  RecentSearchesPluginData,
} from './createRecentSearchesPlugin';
import { Highlighted, RecentSearchesItem } from './types';
import {
  LOCAL_STORAGE_KEY,
  createLocalStorage,
  search as defaultSearch,
  SearchParams,
} from './usecases/localStorage';

export type CreateRecentSearchesLocalStorageOptions<
  TItem extends RecentSearchesItem
> = {
  /**
   * The unique key to name the store of recent searches.
   *
   * @example "top_searchbar"
   */
  key: string;

  /**
   * The number of recent searches to store.
   *
   * @default 5
   */
  limit?: number;

  /**
   * Function to search in the recent items.
   */
  search?(params: SearchParams<TItem>): Array<Highlighted<TItem>>;
};

type LocalStorageRecentSearchesPluginOptions<
  TItem extends RecentSearchesItem
> = Pick<CreateRecentSearchesPluginParams<TItem>, 'transformSource'> &
  CreateRecentSearchesLocalStorageOptions<TItem>;

export function createLocalStorageRecentSearchesPlugin<
  TItem extends RecentSearchesItem
>({
  key,
  limit = 5,
  transformSource,
  search = defaultSearch,
}: LocalStorageRecentSearchesPluginOptions<TItem>): AutocompletePlugin<
  TItem,
  RecentSearchesPluginData
> {
  const storage = createLocalStorage({
    key: [LOCAL_STORAGE_KEY, key].join(':'),
    limit,
    search,
  });

  return createRecentSearchesPlugin({
    transformSource,
    storage,
  });
}
