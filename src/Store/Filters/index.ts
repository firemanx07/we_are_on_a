import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSlice, KeyFilters, Slices } from '@/enums/Slices'
import { getFilterArray } from '@/helpers/utils'

export interface FilterTypeState {
  id: number
  name: string
  checked: boolean
}
export interface FiltersState {
  [FilterSlice.CUISINE]: FilterTypeState[]
  [FilterSlice.MOREFILTERS]: FilterTypeState[]
  [FilterSlice.CATEGORIES]: FilterTypeState[]
}

const initialState = {
  categories: getFilterArray('CATEGORIES'),
  cuisine: getFilterArray('CUISINE'),
  morefilters: getFilterArray('OTHER'),
} as FiltersState
const filterSlice = createSlice({
  name: Slices.FILTERS,
  initialState,
  reducers: {
    update: (state, action: PayloadAction<ActionPayload>) => {
      let { key, data } = action.payload
      return { ...state, [FilterSlice[key]]: data }
    },
    reset: (state, action: PayloadAction<KeyFilters>) => ({
      ...state,
      [FilterSlice[action.payload]]: initialState[FilterSlice[action.payload]],
    }),
  },
})

type ActionPayload = { key: KeyFilters; data: FilterTypeState[] }
export const { update, reset } = filterSlice.actions
export default filterSlice.reducer
