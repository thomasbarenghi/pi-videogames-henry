import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Genre } from '@/interfaces'

interface State {
  genres: Genre[]
}

const initialState: State = {
  genres: []
}

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<Genre[]>) => {
      if (!Array.isArray(action.payload) || action.payload.length === 0) {
        return
      }
      state.genres = action.payload
    }
  }
})

export const { setGenres } = genresSlice.actions

export default genresSlice.reducer
