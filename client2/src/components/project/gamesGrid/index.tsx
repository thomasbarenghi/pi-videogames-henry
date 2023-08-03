//Hooks
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectorFilteredGames } from "@/redux/selectors/filters";
//Componentes
import FiltrosComponent from "./filtros/filtros";
//Redu
//Utils
import { paginate } from "@/utils/paginateArray";
//Estilos
import { CreateGame, Error, GameCard, Loader, Pagination } from "@/components";
import styles from "./gamesGrid.module.scss";

const GamesGrid = () => {
  const dispatch = useAppDispatch();
  const [paginados, setPaginados] = useState([]);
  const [error, setError] = useState(null);
  const { games:games2, isError, isLoading } = useAppSelector(
    (state) => state?.client.games
  );
  const games = useAppSelector(selectorFilteredGames);
  const { currentPage } = useAppSelector((state) => state?.client.games);

  useEffect(() => {
    setPaginados(paginate(games, 15, currentPage));
  }, [currentPage, games]);

  if (isLoading) {
    return <Loader theme={"light"} />;
  }
  if (error) {
    return <Error error={error} theme={"light"} />;
  }

  return (
    <main>
      <FiltrosComponent />
      {Array.isArray(paginados) && paginados.length < 1 ? (
        <h3
          className="titulo3-bold padding-tb-t1"
          style={{ textAlign: "center" }}
        >
          Hey, parece que no hay nada por aqui.
        </h3>
      ) : (
        <div id={styles["componente_gridGames"]}>
          {Array.isArray(paginados) &&
            paginados.map((game, index) => <GameCard key={index} game={game} />)}
        </div>
      )}
    {/* <Pagination totalItems={games.length} itemsPerPage={15} /> */}
      <CreateGame />
    </main>
  );
};

export default GamesGrid;
