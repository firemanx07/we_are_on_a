import { createSelector } from '@reduxjs/toolkit'
import { selectChefs } from '@/Store/Selectors/ChefsSelectors'
import { selectReviews } from '@/Store/Selectors/RviewsSelectors'
import { selectRegions } from '@/Store/Selectors/RegionsSelectors'
import { selectRestaurants } from '@/Store/Selectors/RestaurantsSelectors'
import { selectFilters } from '@/Store/Selectors/FilterSelectors'

export const hasDBemptyElem = createSelector(
  selectChefs,
  selectReviews,
  selectRegions,
  selectRestaurants,
  selectFilters,

  (chefs, revs, regs, rests, filters) => {
    return [chefs, revs, rests, regs, ...Object.values(filters)].some(
      elem => elem.length === 0,
    )
  },
)
