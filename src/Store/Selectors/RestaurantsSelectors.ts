import { AppState } from '@/Store'
import { createSelector } from '@reduxjs/toolkit'
import { selectSelectedZone } from '@/Store/Selectors/RegionsSelectors'

export const selectRestaurants = (state: AppState) => state.restaurants
export const selectRestaurantsBySelectedZone = createSelector(
  selectRestaurants,
  selectSelectedZone,
  (rests, reg) => {
    return rests.filter(elem => elem.zone === reg.zone)
  },
)
