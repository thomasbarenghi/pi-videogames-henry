"use client";
import { createSelector } from "reselect";
import { DEFAULT, ASC, DESC } from "@/constants";
import { useAppSelector } from "../hooks";
import { RootState } from "../store/store";
import { Filters } from "@/constants";
import { FilterSelect, FilterSelectItem } from "@/types";
import { getCurrentFilters } from "@/utils/project/getCurrentFilters";

const games = (state: RootState) => state?.client?.games?.games;
const filters = (state: RootState) => state?.client?.filters;

interface FilterState {
  filters: {
    filtering: {
      origen: FilterSelect;
      genres: FilterSelect;
      search: FilterSelect;
      rating: FilterSelect;
    };
  };
}

export const filtersCurrent = createSelector(
  (state: FilterState) => state?.filters,
  (filters) => {
    return getCurrentFilters(filters);
  },
);

export const selectorFilteredGames = createSelector(
  games,
  filters,
  (games, filters) => {

    const currentFilters = getCurrentFilters(filters);
    const nameSorting = filters?.ordering?.active;
    const filteredGames = games?.filter((game: any) => {
      const { name, genres } = game;
      const { search, origen, genres: selectedGenre } = currentFilters;
      console.log("filteredGames", nameSorting, games);
      console.log(
        "search",
        search,
        "origen",
        origen,
        "selectedGenre",
        selectedGenre,
        "genres",
        genres,
      );

      const isOrigen = origen === DEFAULT || game.source === origen;

      const isGenre =
        selectedGenre === DEFAULT ||
        genres?.some((genre: any) => genre?.id == selectedGenre);

      const isSearch =
        search === "" || name.toLowerCase().includes(search.toLowerCase());
      return isOrigen && isGenre && isSearch;
    });

    //sorting por rating y por nombre
    //active sorting es el valor del select de ordenamiento
    //selectedRating es el valor del select de rating
    console.log(currentFilters.rating);

    console.log("filteredGames", nameSorting, games);
    filteredGames?.sort((a: any, b: any) => {
      return nameSorting === "A-Z"
        ? a.name.localeCompare(b.name)
        : nameSorting === "Z-A"
        ? b.name.localeCompare(a.name)
        : 0;
    });

    filteredGames?.sort((a: any, b: any) => {
      return currentFilters.rating === "0-5"
        ? a.rating - b.rating
        : currentFilters.rating === "5-0"
        ? b.rating - a.rating
        : 0;
    });

    return filteredGames;
  },
);
