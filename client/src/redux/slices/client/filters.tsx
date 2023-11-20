import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT, ASC, DESC } from '@/utils/constants/filters.const'
import { type FilterSelect } from '@/interfaces'

interface State {
  search: FilterSelect
  ordering: FilterSelect
  filtering: {
    origen: FilterSelect
    genres: FilterSelect
    search: FilterSelect
    rating: FilterSelect
  }
  created_by_me: boolean
}

const ordering: FilterSelect = {
  title: 'Orden',
  values: [
    { id: ASC, name: 'Asc' },
    { id: DESC, name: 'Desc' }
  ],
  active: DEFAULT
}

const origin: FilterSelect = {
  title: 'Origen',
  values: [
    { id: 'local', name: 'De GamingX' },
    { id: 'public', name: 'De Rawg' }
  ],
  active: DEFAULT
}

const search: FilterSelect = {
  title: 'Buscar',
  values: [],
  active: ''
}

const rating: FilterSelect = {
  title: 'Rating',
  values: [
    { id: '0-5', name: '0-5' },
    { id: '5-0', name: '5-0' }
  ],
  active: DEFAULT
}

const genres: FilterSelect = {
  title: 'Generos',
  values: [],
  active: DEFAULT
}

const initialState: State = {
  search,
  ordering,
  filtering: {
    origen: origin,
    genres,
    search,
    rating
  },
  created_by_me: false
}

const postsSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search.active = action.payload
    },
    setOrdering: (state, action: PayloadAction<string>) => {
      state.ordering.active = action.payload
    },
    setFilterOrigen: (state, action: PayloadAction<string>) => {
      state.filtering.origen.active = action.payload
    },
    setFilterGenres: (state, action: PayloadAction<string>) => {
      console.log('action.payload', action.payload)
      state.filtering.genres.active = action.payload
    },
    setFilterSearch: (state, action: PayloadAction<string>) => {
      state.filtering.search.active = action.payload
    },
    setFilterRating: (state, action: PayloadAction<string>) => {
      state.filtering.rating.active = action.payload
    },
    restoreFilters: (state) => {
      state.filtering.search.active = ''
      state.ordering.active = DEFAULT
      state.filtering.origen.active = DEFAULT
      state.filtering.genres.active = DEFAULT
      state.filtering.search.active = ''
      state.filtering.rating.active = DEFAULT
    }
  }
})

export const {
  setSearch,
  setOrdering,
  setFilterOrigen,
  setFilterGenres,
  setFilterSearch,
  setFilterRating,
  restoreFilters
} = postsSlice.actions

export default postsSlice.reducer
