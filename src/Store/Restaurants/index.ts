import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSlice, Slices } from '@/enums/Slices'
import { RegionTypeState } from '@/Store/Regions'

export interface RestaurantTypeState extends RegionTypeState {
  name: string
  address: string
  mapLink: string
  [FilterSlice.CUISINE]: string
  [FilterSlice.CATEGORIES]: string
  [FilterSlice.MOREFILTERS]: string
  isFavorite: boolean
}

const initialState = [] as RestaurantTypeState[]
const RestaurantSlice = createSlice({
  name: Slices.RESTAURANTS,
  initialState,
  reducers: {
    fetchAllRestaurants: (
      state,
      action: PayloadAction<RestaurantTypeState[]>,
    ) => {
      return action.payload
    },
    addFavorite: (state, action: PayloadAction<number>) => {
      let arr = state
      arr[action.payload].isFavorite = true
      return arr
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      let arr = state
      arr[action.payload].isFavorite = false
      return arr
    },
  },
})

export const { fetchAllRestaurants } = RestaurantSlice.actions
export default RestaurantSlice.reducer
