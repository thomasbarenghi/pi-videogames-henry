import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Platform } from '@/interfaces'

interface State {
  platforms: Platform[]
}

const initialState: State = {
  platforms: []
}

const platformsSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {
    setPlatforms: (state, action: PayloadAction<Platform[]>) => {
      state.platforms = action.payload
    }
  },
  extraReducers: (builder) => {}
})

export const { setPlatforms } = platformsSlice.actions

export default platformsSlice.reducer
