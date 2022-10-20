import { AppState } from '@/Store'
import { createSelector } from '@reduxjs/toolkit'
import { selectSelectedZone } from '@/Store/Selectors/RegionsSelectors'
import { RestaurantTypeState } from '@/Store/Restaurants'

export const selectRestaurants = (state: AppState) => state.restaurants

export const selectRestaurantById = createSelector(
  selectRestaurants,
  (State: AppState, id: string) => id,
  (rests, id): RestaurantTypeState => rests.filter(elem => elem.id === id)[0],
)
export const selectRestaurantsTags = createSelector(
  selectRestaurantById,
  rest => [...rest.cuisine, ...rest.filter, ...rest.categories],
)
export const selectRestaurantsBySelectedZone = createSelector(
  selectRestaurants,
  selectSelectedZone,
  (rests, reg) => {
    return rests.filter(elem => elem.zone.trim() === reg.zone.trim())
  },
)
