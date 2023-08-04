import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosGetter, axiosPoster, axiosDeleter } from "@/utils/requests";
import { setGenres } from "./genres";
import { setPlatforms } from "./platforms";
import { toast } from "sonner";
import { GamesClass } from "@/types";

const initialState = {
  games: [] as GamesClass[],
  currentGame: {} as GamesClass,
  currentPage: 1,
  error: null,
  isError: false,
  isLoading: false,
  isErrorAdd: false,
  isLoadingAdd: false,
};

export const getGames = createAsyncThunk(
  "games/getGames",
  async (_, { dispatch }) => {
    try {
      console.log("getGames");
      const res = await axiosGetter("/games");
      console.log("getGames res", res);
      dispatch(setGenres(res.genres));
      dispatch(setPlatforms(res.platforms));
      return res.results;
    } catch (err: any) {
      throw new Error("Error al loguear el usuario", err);
    }
  }
);

export const addGame = createAsyncThunk("games/addGame", async (game: any) => {
  try {
    const gameToPost = {
      ...game,
      genres: game.genres.map((genre: any) => genre.value),
      platforms: game.platforms.map((platform: any) => platform.value),
    };
    const res = await axiosPoster("/games", gameToPost);
    return res;
  } catch (err: any) {
    throw new Error("Error al loguear el usuario", err);
  }
});

export const deleteGame = createAsyncThunk(
  "games/deleteGame",
  async (gameId: string) => {
    try {
      const res = await axiosDeleter(`/games/${gameId}`);
      return res;
    } catch (err: any) {
      throw new Error("Error al loguear el usuario", err);
    }
  }
);

export const getGameById = createAsyncThunk(
  "games/getGameById",
  async (gameId: string) => {
    try {
      const res = await axiosGetter(`/games/${gameId}`);
      return res;
    } catch (err: any) {
      throw new Error("Error al loguear el usuario", err);
    }
  }
);

const postsSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setCurrentGame: (state, action: PayloadAction<GamesClass>) => {
      state.currentGame = action.payload as GamesClass;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Get games
      .addCase(getGames.fulfilled, (state, action) => {
        state.games = action.payload as GamesClass[];
        state.isLoading = false;
        toast.success("Juegos obtenidos correctamente");
      })
      .addCase(getGames.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getGames.rejected, (state, action) => {
        toast.error("Error al obtener los juegos");
        state.isLoading = false;
        state.isError = true;
      })
      //Post game
      .addCase(addGame.fulfilled, (state, action) => {
        state.games.push(action.payload as GamesClass);
        toast.success("Juego añadido correctamente");
      })
      .addCase(addGame.rejected, (state, action) => {
        toast.error("Error al añadir el juego");
      })
      //Delete game
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.games = state.games.filter(
          (game: any) => game._id !== action.payload
        );
        toast.success("Juego eliminado correctamente");
      })
      .addCase(deleteGame.rejected, (state, action) => {
        toast.error("Error al eliminar el juego");
      })
      //Get game by id
      .addCase(getGameById.fulfilled, (state, action) => {
        console.log("getGameById.fulfilled", action.payload);
        state.currentGame = action.payload as GamesClass;
        state.isLoading = false;
        toast.success("Juego obtenido correctamente");
      })
      .addCase(getGameById.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getGameById.rejected, (state, action) => {
        toast.error("Error al obtener el juego");
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setCurrentGame, setCurrentPage } = postsSlice.actions;

export default postsSlice.reducer;
