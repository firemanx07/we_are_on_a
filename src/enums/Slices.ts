export enum Slices {
  THEME = 'theme',
  FILTERS = 'filters',
  REGIONS = 'regions',
  RESTAURANTS = 'restaurants',
  CHEFS = 'chefs',
  REVIEWS = 'reviews',
}
export enum FilterSlice {
  CUISINE = 'cuisine',
  CHEFS = 'chefs',
  CATEGORIES = 'categories',
  MOREFILTERS = 'filter',
}

export type KeyFilters = keyof typeof FilterSlice
