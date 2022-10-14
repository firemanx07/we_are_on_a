import { createSelector } from '@reduxjs/toolkit'
import { selectChefs } from '@/Store/Selectors/ChefsSelectors'
import { selectReviews } from '@/Store/Selectors/RviewsSelectors'
import { selectRegions } from '@/Store/Selectors/RegionsSelectors'
import { selectRestaurants } from '@/Store/Selectors/RestaurantsSelectors'

export const hasDBemptyElem = createSelector(
  selectChefs,
  selectReviews,
  selectRegions,
  selectRestaurants,
  (chefs, revs, regs, rests) => {
    return [chefs, revs, rests, regs].some(elem => elem.length === 0)
  },
)
