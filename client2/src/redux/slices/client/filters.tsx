import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { DEFAULT, ASC, DESC } from "@/constants";
import { FilterSelect, FilterSelectItem } from "@/types";

type StateFilter = {
  search: FilterSelect;
  ordering: FilterSelect;
  filtering: {
    origen: FilterSelect;
    genres: FilterSelect;
    search: FilterSelect;
    rating: FilterSelect;
  };
  created_by_me: boolean;
};

const orderingState = new FilterSelect(
  "Orden",
  [
    { id: ASC, name: "Asc" },
    { id: DESC, name: "Desc" },
  ] as FilterSelectItem[],
  DEFAULT,
);

const origenState = new FilterSelect(
  "Origen",
  [
    { id: "local", name: "De GamingX" },
    { id: "public", name: "De Rawg" },
  ] as FilterSelectItem[],
  DEFAULT,
);

const searchState = new FilterSelect("Buscar", [], "");

const ratingState = new FilterSelect(
  "Rating",
  [
    { id: "0-5", name: "0-5" },
    { id: "5-0", name: "5-0" },
  ] as FilterSelectItem[],
  DEFAULT,
);

const genresState = new FilterSelect("Generos", [], DEFAULT);

const initialState: StateFilter = {
  search: searchState,
  ordering: orderingState,
  filtering: {
    origen: origenState,
    genres: genresState,
    search: searchState,
    rating: ratingState,
  },
  created_by_me: false,
};

const postsSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search.active = action.payload as string;
    },
    setOrdering: (state, action) => {
      console.log("setOrdering action.payload", action.payload);
      state.ordering.active = action.payload as string;
    },
    setFilterOrigen: (state, action) => {
      console.log("setFilterOrigen action.payload", action.payload);
      state.filtering.origen.active = action.payload as string;
    },
    setFilterGenres: (state, action) => {
      console.log("setFilterGenres action.payload", action.payload);
      state.filtering.genres.active = action.payload as string;
    },
    setFilterSearch: (state, action) => {
      console.log("setFilterSearch action.payload", action.payload);
      state.filtering.search.active = action.payload as string;
    },
    setFilterRating: (state, action) => {
      console.log("setFilterRating action.payload", action.payload);
      state.filtering.rating.active = action.payload as string;
    },
    restoreFilters: (state) => {
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
