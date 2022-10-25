import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSlice, KeyFilters, Slices } from '@/enums/Slices'

export interface FilterTypeState {
  id: string
  name: string
  image?: string
  checked: boolean
}
export interface FiltersState {
  [FilterSlice.CUISINE]: FilterTypeState[]
  [FilterSlice.CHEFS]: FilterTypeState[]
  [FilterSlice.MOREFILTERS]: FilterTypeState[]
  [FilterSlice.CATEGORIES]: FilterTypeState[]
}

const initialState = {
  categories: [],
  cuisine: [],
  filter: [],
  chefs: [],
} as FiltersState
const filterSlice = createSlice({
  name: Slices.FILTERS,
  initialState,
  reducers: {
    initFilters: (state, action: PayloadAction<InitPayload>) => {
      let { key, data } = action.payload
     
      const filterType = data.map(elem => {
        let elemValues = Object.values(elem)
        let obj: FilterTypeState = {
          id: elemValues[0],
          name: elemValues[1],
          checked: false,
        }
        return obj
      })
      return { ...state, [FilterSlice[key]]: filterType }
    },
    updateFilters: (state, action: PayloadAction<UpdatenPayload>) => {
      let { key, data } = action.payload
      return { ...state, [FilterSlice[key]]: data }
    },
    resetFilters: (state, action: PayloadAction<KeyFilters>) => ({
      ...state,
      [FilterSlice[action.payload]]: state[FilterSlice[action.payload]].map(
        elem => ({ ...elem, checked: false }),
      ),
    }),
  },
})

type UpdatenPayload = { key: KeyFilters; data: FilterTypeState[] }
type InitPayload = {
  key: KeyFilters
  data: { id: string; [key: string]: string }[]
}
export const { updateFilters, initFilters, resetFilters } = filterSlice.actions
export default filterSlice.reducer
