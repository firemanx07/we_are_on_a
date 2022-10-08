import { createSelector } from '@reduxjs/toolkit'
import { AppState } from '@/Store'
import { FilterSlice } from '@/enums/Slices'
import { FilterTypeState } from '@/Store/Filters'

const selectCuisine = (state: AppState) => state.filters[FilterSlice.CUISINE]
const selectMoreFilters = (state: AppState) =>
  state.filters[FilterSlice.MOREFILTERS]
const selectCategories = (state: AppState) =>
  state.filters[FilterSlice.CATEGORIES]
const selectNumberOfFilters = (
  selector: (state: AppState) => FilterTypeState[],
) => createSelector(selector, data => data.length)
