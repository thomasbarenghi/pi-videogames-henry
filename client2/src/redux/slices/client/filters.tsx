import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { DEFAULT } from "@/constants";

const initialState = {
  search: "",
  ordering: {
    title: "Ordering",
    values: ["Default", "A-Z", "Z-A"],
    active: DEFAULT,
  },
  filtering: {
    origen: {
      title: "Origen",
      values: [DEFAULT, "own", "public"],
      active: DEFAULT,
    },
    genres: {
      title: "Genres",
      active: DEFAULT,
    },
    search: {
      title: "Search",
      active: "",
    },
    rating: {
      title: "Rating",
      active: DEFAULT,
      values: [DEFAULT, "0-5", "5-0"],
    },
  },
  created_by_me: false,
};

const postsSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setOrdering: (state, action) => {
      state.ordering.active = action.payload;
    },
    setFilterOrigen: (state, action) => {
      console.log("setFilterOrigen action.payload", action.payload);
      state.filtering.origen.active = action.payload;
    },
    setFilterGenres: (state, action) => {
      state.filtering.genres.active = action.payload;
    },
    setFilterSearch: (state, action) => {
      console.log("setFilterSearch action.payload", action.payload);
      state.filtering.search.active = action.payload;
    },
    setFilterRating: (state, action) => {
      console.log("setFilterRating action.payload", action.payload);
      state.filtering.rating.active = action.payload;
    },
    restoreFilters: (state) => {
      console.log("restoreFilters");
      state.filtering.search.active = "";
      state.ordering.active = DEFAULT;
      state.filtering.origen.active = DEFAULT;
      state.filtering.genres.active = DEFAULT;
      state.filtering.search.active = "";
      state.filtering.rating.active = DEFAULT;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setSearch,
  setOrdering,
  setFilterOrigen,
  setFilterGenres,
  setFilterSearch,
  setFilterRating,
  restoreFilters,
} = postsSlice.actions;

export default postsSlice.reducer;
