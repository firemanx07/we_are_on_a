import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { Slices } from '@/enums/Slices'

export interface RegionTypeState {
  id: string
  overall: string
  country: string
  zone: string
}

const initialState = [] as RegionTypeState[]
const RegionSlice = createSlice({
  name: Slices.REGIONS,
  initialState,
  reducers: {
    fetchAll: {
      reducer: (state, action: PayloadAction<RegionTypeState[]>) => {
        return action.payload
      },
      prepare: (data: ActionPayload) => {
        const arr = data.map(elem => {
          const id = nanoid()
          return { id, ...elem }
        })
        return { payload: arr }
      },
    },
  },
})

type ActionPayload = Omit<RegionTypeState, 'id'>[]
export const { fetchAll } = RegionSlice.actions
export default RegionSlice.reducer
