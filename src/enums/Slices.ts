export enum Slices {
  THEME = 'theme',
  FILTERS = 'filters',
  REGIONS = 'regions',
  RESTAURANTS = 'restaurants',
}
export enum FilterSlice {
  CUISINE = 'cuisine',
  CATEGORIES = 'categories',
  MOREFILTERS = 'morefilters',
}

export type KeyFilters = keyof typeof FilterSlice
