"use client";
import { createSelector } from "reselect";
import { DEFAULT, ASC, DESC } from "@/constants";
import { useAppSelector } from "../hooks";
import { RootState } from "../store/store";
import { Filters } from "@/constants";

const games = (state: RootState) => state?.client.games.games;
const filters = (state: RootState) => state?.client.filters;

interface FilterState {
  // ... otros estados ...
  filters: {
    // ... otros filtros ...
    filtering: {
      [key: string]: {
        title: string;
        active: string;
        values?: string[]; // Puedes marcarlo como opcional si no todos los filtros tienen "values"
      };
    };
  };
}

export const filtersCurrent = createSelector(
  (state: FilterState) => state.filters,
  (filters) => {
    // Hacemos map de los filtros para obtener los valores actuales
    return getCurrentFilters(filters);
  },
);

const getCurrentFilters = (filters: any) => {
  const currentFilters: { [key: string]: string } = {};

  // Obtenemos las propiedades del objeto "filtering" del estado
  const { filtering } = filters;

  // Iteramos sobre las claves (keys) del objeto "filtering"
  Object.keys(filtering).forEach((filterKey) => {
    // Obtenemos el objeto de filtro actual
    const currentFilter = filtering[filterKey];

    // Si el filtro tiene la propiedad "active", lo agregamos al objeto "currentFilters"
    if (currentFilter.hasOwnProperty("active")) {
      currentFilters[filterKey] = currentFilter.active;
    }
  });

  return currentFilters;
};

export const selectorFilteredGames = createSelector(
  games,
  filters,
  (games, filters) => {
    const currentFilters = getCurrentFilters(filters);
    const nameSorting = filters.ordering.active;
    console.log("game", games);
    const filteredGames = games.filter((game: any) => {
      const { name, genres, rating } = game;
      const {
        search,
        origen,
        genres: selectedGenre,
        rating: selectedRating,
      } = currentFilters;

      const isOrigen = origen === DEFAULT || game.source === origen;
      const isGenre =
        selectedGenre === DEFAULT ||
        genres.filter((genre: any) =>
          genre.name.toLowerCase().includes(selectedGenre.toLowerCase()),
        ).length > 0;
      const isSearch =
        search === "" || name.toLowerCase().includes(search.toLowerCase());
      return isOrigen && isGenre && isSearch;
    });

    //sorting por rating y por nombre
    //active sorting es el valor del select de ordenamiento
    //selectedRating es el valor del select de rating
    console.log(currentFilters.rating);

    filteredGames.sort((a:any, b:any) => {
      return nameSorting === 'A-Z' ? a.name.localeCompare(b.name)
        : nameSorting === 'Z-A' ? b.name.localeCompare(a.name)
            : 0;
    });
  
    filteredGames.sort((a:any, b:any) => {
      return currentFilters.rating === '0-5' ? a.rating - b.rating
        : currentFilters.rating === '5-0' ? b.rating - a.rating
          : 0;
    })



    return filteredGames;
  },
);
