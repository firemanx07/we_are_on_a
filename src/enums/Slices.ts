export enum Slices {
  THEME = 'theme',
  FILTERS = 'filters',
}
export enum FilterSlice {
  CUISINE = 'cuisine',
  CATEGORIES = 'categories',
  MOREFILTERS = 'morefilters',
}

export type KeyFilters = keyof typeof FilterSlice
