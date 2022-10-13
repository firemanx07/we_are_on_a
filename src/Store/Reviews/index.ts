import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Slices } from '@/enums/Slices'

export interface ReviewsTypeState {
  review: string
  bestDish: string
  RestaurantName: string
  RestaurantId: number
  chefId: string
}

const initialState = [] as ReviewsTypeState[]
const ReviewsSlice = createSlice({
  name: Slices.REVIEWS,
  initialState,
  reducers: {
    fetchAllReviews: (state, action: PayloadAction<ReviewsTypeState[]>) => {
      return action.payload
    },
  },
})

export const { fetchAllReviews } = ReviewsSlice.actions
export default ReviewsSlice.reducer
