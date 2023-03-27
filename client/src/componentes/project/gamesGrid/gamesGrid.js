//Hooks
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//Componentes
import PaginationComponent from '../../general/pagination/pagination';
import GameCard from '../gameCard/gameCard';
import FiltrosComponent from './filtros/filtros';
import LoaderWhite from '../../general/loader/loaderWhite';
import ErrorWhite from '../../general/error/errorWhite';
//Redux

import { setCurrentPage } from '../../../redux/actions/frontend/pagination';
//Utils
import { paginate } from '../../../utils/paginateArray';
import CreateGame from '../createGame/createGame';
//Estilos
import styles from "./gamesGrid.module.scss";


const GamesGrid = () => {

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state?.apiGames ?? []);
  const { allGames } = useSelector((state) => state?.frontGames?.pageGames ?? []);
  const { currentPage, gamesPerPage } = useSelector((state) => state?.frontGames);
  const [paginados, setPaginados] = useState([])



  useEffect(() => { setPaginados(paginate(allGames, gamesPerPage, currentPage)) }, [currentPage, allGames, gamesPerPage]);

  if (isLoading) { return <LoaderWhite />; }
  if (error) { return <ErrorWhite error={error} />; }

  return (
    <main>
      <FiltrosComponent />
      {Array.isArray(paginados) && paginados.length < 1 ? <h3 className='titulo3-bold padding-tb-t1' style={{textAlign: "center"}}>Hey, parece que no hay nada por aqui.</h3> :
        <div id={styles["componente_gridGames"]}>
          {Array.isArray(paginados) &&
            paginados.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
        </div>
      }
      <PaginationComponent currentPage={currentPage} setCurrentPage={(page) => dispatch(setCurrentPage(page))} totalItems={allGames.length} itemsPerPage={gamesPerPage} />
      <CreateGame />
    </main>
  );
};

export default GamesGrid;