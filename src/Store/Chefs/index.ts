import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Slices } from '@/enums/Slices'
import { RegionTypeState } from '@/Store/Regions'

export interface ChefsTypeState extends RegionTypeState {
  name: string
  address: string
  mapLink: string
  mainRestaurant: number
  otherRestaurants: number[]
}

const initialState = [] as ChefsTypeState[]
const ChefsSlice = createSlice({
  name: Slices.CHEFS,
  initialState,
  reducers: {
    fetchAllChefs: (state, action: PayloadAction<ChefsTypeState[]>) => {
      return action.payload
    },
  },
})

export const { fetchAllChefs } = ChefsSlice.actions
export default ChefsSlice.reducer
