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
  }
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
          genre.name.toLowerCase().includes(selectedGenre.toLowerCase())
        ).length > 0;
      const isSearch =
        search === "" || name.toLowerCase().includes(search.toLowerCase());
      return isOrigen && isGenre && isSearch;
    });

    //sorting por rating y por nombre
    //active sorting es el valor del select de ordenamiento
    //selectedRating es el valor del select de rating
    console.log(currentFilters.rating);
    const sortedGames = filteredGames.sort((a: any, b: any) => {
      let result = 0; // Variable para almacenar el resultado del ordenamiento

      if (nameSorting !== DEFAULT) {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameSorting === ASC) {
          if (nameA < nameB) result = -1;
          if (nameA > nameB) result = 1;
        } else if (nameSorting === DESC) {
          if (nameA > nameB) result = -1;
          if (nameA < nameB) result = 1;
        }
      }

      if (result === 0 && currentFilters.rating !== DEFAULT) {
        const ratingA = a.rating;
        const ratingB = b.rating;

        if (currentFilters.rating === "0-5") {
          result = ratingB - ratingA;
        } else if (currentFilters.rating === "5-0") {
          result = ratingA - ratingB;
        }
      }

      return result; // Devolvemos el resultado del ordenamiento
    });

    return sortedGames;
  }
);
