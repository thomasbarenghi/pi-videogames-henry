import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getRequest, postRequest, deleteRequest } from '@/services/apiRequest.service'
import { setGenres } from './genres'
import { setPlatforms } from './platforms'
import { toast } from 'sonner'
import { type Game } from '@/interfaces'

interface State {
  games: Game[]
  currentGame: Game | null
  currentPage: number
  error: any
  isError: boolean
  isLoading: boolean
  isErrorAdd: boolean
  isLoadingAdd: boolean
}

const initialState: State = {
  games: [],
  currentGame: null,
  currentPage: 1,
  error: null,
  isError: false,
  isLoading: false,
  isErrorAdd: false,
  isLoadingAdd: false
}

export const getGames = createAsyncThunk('games/getGames', async (_, { dispatch }) => {
  try {
    const { data } = await getRequest('/games')
    dispatch(setGenres(data.genres))
    dispatch(setPlatforms(data.platforms))
    return data.games
  } catch (err) {
    console.error('Error al obtener los juegos', err)
    throw new Error('Error al obtener los juegos')
  }
})

export const addGame = createAsyncThunk('games/addGame', async (game: Game) => {
  try {
    const gameToPost = {
      ...game,
      genres: game?.genres?.map((genre) => genre?.id),
      platforms: game?.platforms?.map((platform) => platform?.id)
    }
    const { data } = await postRequest('/games', gameToPost)
    return data
  } catch (err) {
    console.error('Error al subir el juego', err)
    throw new Error('Error al subir el juego')
  }
})

export const deleteGame = createAsyncThunk('games/deleteGame', async (gameId: string) => {
  try {
    await deleteRequest(`/games/${gameId}`)
    return gameId
  } catch (err) {
    console.error('Error al eliminar el juego', err)
    throw new Error('Error al eliminar el juego')
  }
})

export const getGameById = createAsyncThunk('games/getGameById', async (gameId: string) => {
  try {
    const { data } = await getRequest(`/games/${gameId}`)
    return data
  } catch (err) {
    console.error('Error al obtener el juego', err)
    throw new Error('Error al obtener el juego')
  }
})

const postsSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setCurrentGame: (state, action: PayloadAction<Game>) => {
      state.currentGame = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // Get games
      .addCase(getGames.fulfilled, (state, action) => {
        state.games = action.payload as Game[]
        state.isLoading = false
      })
      .addCase(getGames.pending, (state) => {
        state.isLoading = state.games.length <= 0
        state.isError = false
      })
      .addCase(getGames.rejected, (state) => {
        toast.error('Error al obtener los juegos')
        state.isLoading = false
        state.isError = true
      })
      // Post game
      .addCase(addGame.fulfilled, (state, action: PayloadAction<Game>) => {
        state.games.push(action.payload)
        toast.success('Juego creado correctamente')
      })
      .addCase(addGame.rejected, (state, action) => {
        toast.error('Error al añadir el juego')
      })
      // Delete game
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.games = state.games.filter((game) => game.id !== action.payload)
        toast.success('Juego eliminado correctamente')
      })
      .addCase(deleteGame.rejected, (state, action) => {
        toast.error('Error al eliminar el juego')
      })
      .addCase(getGameById.fulfilled, (state, action: PayloadAction<Game>) => {
        state.currentGame = action.payload
        state.isLoading = false
      })
      .addCase(getGameById.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(getGameById.rejected, (state, action) => {
        toast.error('Error al obtener el juego')
        state.isLoading = false
        state.isError = true
      })
  }
})

export const { setCurrentGame, setCurrentPage } = postsSlice.actions

export default postsSlice.reducer
