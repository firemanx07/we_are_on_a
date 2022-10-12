export enum Slices {
  THEME = 'theme',
  FILTERS = 'filters',
  REGIONS = 'regions',
}
export enum FilterSlice {
  CUISINE = 'cuisine',
  CATEGORIES = 'categories',
  MOREFILTERS = 'morefilters',
}

export type KeyFilters = keyof typeof FilterSlice
