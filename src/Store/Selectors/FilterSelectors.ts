import { createSelector } from '@reduxjs/toolkit'
import { AppState } from '@/Store'
import { FilterSlice } from '@/enums/Slices'

export const selectCuisine = (state: AppState) =>
  state.filters[FilterSlice.CUISINE]
export const selectMoreFilters = (state: AppState) =>
  state.filters[FilterSlice.MOREFILTERS]
export const selectCategories = (state: AppState) =>
  state.filters[FilterSlice.CATEGORIES]

export const selectNumberOfFilters = createSelector(
  selectCuisine,
  selectMoreFilters,
  selectCategories,
  (a, b, c) => ({
    cuisine: a.length,
    categories: c.length,
    moreFilters: b.length,
  }),
)
export const selectNumberOfFiltersChecked = createSelector(
  selectCuisine,
  selectMoreFilters,
  selectCategories,
  (a, b, c) => ({
    cuisine: a.filter(elem => elem.checked).length,
    categories: c.filter(elem => elem.checked).length,
    moreFilters: b.filter(elem => elem.checked).length,
  }),
)
