import { createSelector } from '@reduxjs/toolkit'
import { AppState } from '@/Store'
import { FilterSlice } from '@/enums/Slices'

export const selectFilters = (state: AppState) => state.filters
export const selectCuisine = (state: AppState) =>
  state.filters[FilterSlice.CUISINE]
export const selectChefs = (state: AppState) =>
  state.filters[FilterSlice.CHEFS]
export const selectMoreFilters = (state: AppState) =>
  state.filters[FilterSlice.MOREFILTERS]
export const selectCategories = (state: AppState) =>
  state.filters[FilterSlice.CATEGORIES]

export const selectNumberOfFilters = createSelector(
  selectCuisine,
  selectMoreFilters,
  selectCategories,
  selectChefs,
  (a, b, c,d) => ({
    cuisine: a.length,
    categories: c.length,
    moreFilters: b.length,
    chefs: d.length,
  }),
)
export const selectNumberOfFiltersChecked = createSelector(
  selectCuisine,
  selectMoreFilters,
  selectCategories,
  selectChefs,
  (a, b, c, d) => ({
    cuisine: a.filter(elem => elem.checked).length,
    categories: c.filter(elem => elem.checked).length,
    moreFilters: b.filter(elem => elem.checked).length,
    chefs: d?.filter(elem => elem.checked).length,
  }),
)
