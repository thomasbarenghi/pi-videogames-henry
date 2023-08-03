import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  platforms: [],
};

const postsSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {
    setPlatforms: (state, action: PayloadAction<[]>) => {
      console.log("setGenres", action.payload);
      state.platforms = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setPlatforms } = postsSlice.actions;

export default postsSlice.reducer;
