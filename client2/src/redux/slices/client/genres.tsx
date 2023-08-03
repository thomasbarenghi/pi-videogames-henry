import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  genres: [] as any,
};

const postsSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<[]>) => {
      console.log("setGenres", action.payload);
      //agrear el default

      state.genres = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setGenres } = postsSlice.actions;

export default postsSlice.reducer;
