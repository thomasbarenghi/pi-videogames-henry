export const setPageAllGames = (gamesTo) => (dispatch, getState) => {

    const games = gamesTo === undefined ? getState().apiGames.games : gamesTo;
    const { filters } = getState();

    const filteredGames = games.filter((game) => {
        const filterBySource = filters.filtering.origen.active === "Default" ? true : game.source === filters.filtering.origen.active;
        const filterByGenre = filters.filtering.genres.active === "Default" ? true : game.genres.some(genre => genre.name === filters.filtering.genres.active);
        const filterBySearch = filters.filtering.search.active === "" ? true : game.name.toLowerCase().includes(filters.filtering.search.active.toLowerCase());
        return filterBySource && filterByGenre && filterBySearch;
    })

    dispatch({ type: "SET_PAGE_ALL_GAMES", payload: filteredGames })
}
