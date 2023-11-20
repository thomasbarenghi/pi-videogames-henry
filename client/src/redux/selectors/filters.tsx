'use client'
import { createSelector } from 'reselect'
import { DEFAULT } from '@/utils/constants/filters.const'
import { type RootState } from '../store/store'
import { type Game, type FilterItem } from '@/interfaces'
import { getCurrentFilters } from '@/utils/getCurrentFilters.utils'

const games = (state: RootState) => state?.client?.games?.games
const filters = (state: RootState) => state?.client?.filters

interface FilterState {
  filters: {
    filtering: {
      origen: FilterItem
      genres: FilterItem
      search: FilterItem
      rating: FilterItem
    }
  }
}

export const filtersCurrent = createSelector(
  (state: FilterState) => state?.filters,
  (filters) => getCurrentFilters(filters)
)

export const selectorFilteredGames = createSelector(games, filters, (games, filters) => {
  const currentFilters = getCurrentFilters(filters)
  const nameSorting = filters?.ordering?.active
  const filteredGames = games?.filter((game: Game) => {
    const { name, genres } = game
    const { search, origen, genres: selectedGenre } = currentFilters

    const isOrigen = origen === DEFAULT || game.source === origen

    const isGenre = selectedGenre === DEFAULT || genres?.some((genre) => genre?.id.toString() === selectedGenre)

    const isSearch = search === '' || name.toLowerCase().includes(search.toLowerCase())
    return isOrigen && isGenre && isSearch
  })

  filteredGames?.sort((a: any, b: any) =>
    nameSorting === 'A-Z' ? a.name.localeCompare(b.name) : nameSorting === 'Z-A' ? b.name.localeCompare(a.name) : 0
  )

  filteredGames?.sort((a: any, b: any) =>
    currentFilters.rating === '0-5' ? a.rating - b.rating : currentFilters.rating === '5-0' ? b.rating - a.rating : 0
  )

  return filteredGames
})
