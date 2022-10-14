import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { Slices } from '@/enums/Slices'

export interface RegionTypeState {
  id: string
  overall: string
  country: string
  zone: string
}

const initialState = {
  regions: [] as RegionTypeState[],
  selectedRegion: null as unknown as RegionTypeState,
}
const RegionSlice = createSlice({
  name: Slices.REGIONS,
  initialState,
  reducers: {
    fetchAllRegions: {
      reducer: (state, action: PayloadAction<RegionTypeState[]>) => {
        return { ...state, regions: action.payload }
      },
      prepare: (data: ActionPayload) => {
        const arr = data.map(elem => {
          const id = nanoid()
          return { id, ...elem }
        })
        return { payload: arr }
      },
    },
    setZone: (state, action: PayloadAction<RegionTypeState>) => ({
      ...state,
      selectedRegion: action.payload,
    }),
    resetZone: state => ({
      ...state,
      selectedRegion: initialState.selectedRegion,
    }),
  },
})

type ActionPayload = Omit<RegionTypeState, 'id'>[]
export const { fetchAllRegions, setZone, resetZone } = RegionSlice.actions
export default RegionSlice.reducer
