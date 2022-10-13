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
  },
})

export const { fetchAllRestaurants } = RestaurantSlice.actions
export default RestaurantSlice.reducer
