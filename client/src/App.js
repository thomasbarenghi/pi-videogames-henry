import "./styles/global.scss"
import "./styles/varios.scss"

import { Routes, Route } from "react-router-dom";
import Home from "./paginas/home/home"
import About from "./paginas/about/about"
import GameDetails from "./paginas/gameDetails/gameDetails";
import Footer from "./componentes/masters/footer/footer";
import ScrollToTop from "./componentes/general/scrollToTop/scrollToTop";
import Header from "./componentes/masters/header/header";
import Games from "./paginas/games/games";
import { useEffect } from "react";
import { manageHamburguer } from "./componentes/masters/header/header"
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiGames } from "./redux/actions/api/apiGames";
import { getGenres } from "./redux/actions/api/apiGenres";
import { getPlatforms } from "./redux/actions/api/apiPlatforms";

function App() {

  const location = useLocation();
  const dispatch = useDispatch();

  const { games } = useSelector((state) => state?.apiGames ?? []);

  useEffect(() => { manageHamburguer(false); }, [location]);
  useEffect(() => {
    if (games.length < 1) { dispatch(fetchApiGames()); }
    dispatch(getGenres())
    dispatch(getPlatforms())
  }, [dispatch, games]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="about" element={<About />} />
        <Route path="games/:id" element={<GameDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;