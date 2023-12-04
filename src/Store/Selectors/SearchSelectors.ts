import { createSelector } from '@reduxjs/toolkit'
import { selectRestaurants } from '@/Store/Selectors/RestaurantsSelectors'
import { selectChefs } from '@/Store/Selectors/ChefsSelectors'
import { AppState } from '@/Store'
import _ from 'lodash'
import { ChefsTypeState } from '@/Store/Chefs'
import { RestaurantTypeState } from '@/Store/Restaurants'

const SearchSelector = createSelector(
  selectRestaurants,
  selectChefs,
  (state: AppState, searchTerm: string) => searchTerm,
  (restaurantData, chefsData, query) => {
    const chefs = _.filter<ChefsTypeState>(chefsData, chef =>
      chef.name.includes(query),
    )
    const rests = _.filter<RestaurantTypeState>(restaurantData, rest =>
      rest.name.includes(query),
    )
    return { restaurants: rests, chefs: chefs }
  },
)
