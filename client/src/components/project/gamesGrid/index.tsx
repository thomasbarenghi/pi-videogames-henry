import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectorFilteredGames } from "@/redux/selectors/filters";
import FiltrosComponent from "./filtros/filtros";
import { paginate } from "@/utils/paginateArray";
import { Error, GameCard, Loader, Pagination, Modal } from "@/components";
import styles from "./gamesGrid.module.scss";

const GamesGrid = () => {
  const [paginados, setPaginados] = useState([]);
  const { isError, isLoading } = useAppSelector(
    (state) => state?.client?.games
  );
  const games = useAppSelector(selectorFilteredGames);
  const { currentPage } = useAppSelector((state) => state?.client?.games);

  useEffect(() => {
    setPaginados(paginate(games, 15, currentPage));
    console.log("games setPaginados", games);
  }, [currentPage, games]);

  if (isLoading) {
    return <Loader theme={"light"} />;
  }
  if (isError) {
    return <Error error={"Error"} theme={"light"} />;
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
            paginados.map((game, index) => (
              <GameCard key={index} game={game} />
            ))}
        </div>
      )}
      <Pagination totalItems={games?.length} itemsPerPage={15} />
    </main>
  );
};

export default GamesGrid;