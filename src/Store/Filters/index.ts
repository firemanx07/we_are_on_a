import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { FilterSlice, Slices } from '@/enums/Slices'
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
    update: (state, action: PayloadAction<FiltersState>) => {
      state = action.payload
    },
    reset: () => initialState,
  },
})

export const { update, reset } = filterSlice.actions
export default filterSlice.reducer
