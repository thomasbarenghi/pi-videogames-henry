import React from "react";
import {
  setOrdering,
  setFilterOrigen,
  setFilterGenres,
  setFilterSearch,
  setFilterRating,
  restoreFilters,
} from "@/redux/slices/client/filters";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import styles from "./filtros.module.scss";
import { Select, Search, Button, Modal } from "@/components";

export default function FiltrosComponent() {
  const dispatch = useAppDispatch();
  const [SearchModalVisible, setSearchModalVisible] = useState(false);
  const [FiltersModalVisible, setFiltersModalVisible] = useState(false);
  const ordering = useAppSelector((state) => state?.client.filters.ordering);
  const genres = useAppSelector((state) => state?.client.genres);
  const {
    ordering: {
      active: orderingActive,
      values: orderingValues,
      title: orderingTitle,
    },
    filtering: {
      origen: {
        active: origenActive,
        values: origenValues,
        title: origenTitle,
      },
      genres: { active: genresActive, title: genresTitle },
      rating: {
        active: ratingActive,
        values: ratingValues,
        title: ratingTitle,
      },
      search: { active: activeSearch}
    },
  } = useAppSelector((state) => state?.client.filters);

  const handleFilters = (e: any) => {
    const { name, value } = e.target;
    console.log("name", name, orderingTitle);

    name === orderingTitle
      ? dispatch(setOrdering(value))
      : name === origenTitle
      ? dispatch(setFilterOrigen(value))
      : name === genresTitle
      ? dispatch(setFilterGenres(value))
      : name === ratingTitle
      ? dispatch(setFilterRating(value))
      : null;
  };

  const handleOnSearch = (e: any) => {
    dispatch(setFilterSearch(e.target.value));
  };
console.log("genres xxx", genres)
  return (
    <div>
      <div id={styles["componente_filtros"]} className="margin-b-40">
        <Search handleOnSearch={handleOnSearch} mode="light" activeSearch={activeSearch} />
        <div id={styles["filtros_boxDesktop"]}>
          <Select
            name={"Ordering"}
            active={ordering?.active}
            values={ordering?.values}
            onChange={handleFilters}
            selectClass="select"
            labelClass="label_select"
          />
          <Select
            name={origenTitle}
            active={origenActive}
            values={origenValues}
            onChange={handleFilters}
            selectClass="select"
            labelClass="label_select"
          />
          <Select
            name={genresTitle}
            active={genresActive}
            values={genres?.genres?.map((genre: any) => genre.name)}
            onChange={handleFilters}
            selectClass="select"
            labelClass="label_select"
          />
          <Select
            name={ratingTitle}
            active={ratingActive}
            values={ratingValues}
            onChange={handleFilters}
            selectClass="select"
            labelClass="label_select"
          />
        </div>
        <Button
          text=""
          type="button"
          onClick={() => setSearchModalVisible(true)}
          className="btn1 btn1-t1"
          id={styles["searchBtn"]}
          image="/img/fi-br-searchClear.svg"
          imageWidth={24}
          imageHeight={24}
        />
        <Button
          text="Filtros"
          type="button"
          onClick={() => setFiltersModalVisible(true)}
          className="btn1 btn1-t1"
          id={styles["filtrosBtn"]}
        />
        <Button
          text="Restaurar"
          type="button"
          onClick={() => dispatch(restoreFilters())}
          className="btn1 btn1-t1"
          id={styles["crearJuegoBtn"]}
        />
        <Button
          text="Crear juego"
          type="button"
          onClick={() => {}}
          className="btn1 btn1-t1"
          id={styles["crearJuegoBtn"]}
        />
        <Modal
          openModal={SearchModalVisible}
          setOpenModal={setSearchModalVisible}
        >
          <SearchInner handleOnSearch={handleOnSearch} />
        </Modal>
        <Modal
          openModal={FiltersModalVisible}
          setOpenModal={setFiltersModalVisible}
        >
          {/* <FiltersInner
            handleFilters={handleFilters}
            filtering={f}
            genres={genres}
            ordering={ordering}
          /> */}
        </Modal>
      </div>
    </div>
  );
}

// function FiltersInner({ handleFilters, filtering, genres, ordering }) {
//   return (
//     <>
//       <div
//         className="padding-lr-t1"
//         style={{
//           display: "flex",
//           gap: "10px",
//           flexDirection: "column",
//           width: "100%",
//         }}
//         id="test"
//       >
//         <h1 className="titulo3-bold margin-b-4" style={{ color: "#ffffff" }}>
//           Filtrar juegos
//         </h1>
//         <div
//           style={{
//             width: "100%",
//             display: "flex",
//             gap: "10px",
//             flexDirection: "column",
//           }}
//         >
//           <SelectComponent
//             name={"Ordering"}
//             active={ordering?.active}
//             values={ordering?.values}
//             onChange={handleFilters}
//             selectClass="select2"
//             labelClass="label_select2"
//           />
//           <SelectComponent
//             name={filtering?.origen?.title}
//             active={filtering?.origen?.active}
//             values={filtering?.origen.values}
//             onChange={handleFilters}
//             selectClass="select2"
//             labelClass="label_select2"
//           />
//           <SelectComponent
//             name={filtering.genres.title}
//             active={filtering.genres.active}
//             values={genres.genres.map((genre) => genre.name)}
//             onChange={handleFilters}
//             selectClass="select2"
//             labelClass="label_select2"
//           />
//           <SelectComponent
//             name={filtering?.rating.title}
//             active={filtering?.rating?.active}
//             values={filtering?.rating.values}
//             onChange={handleFilters}
//             selectClass="select2"
//             labelClass="label_select2"
//           />
//         </div>
//       </div>
//     </>
//   );
// }

function SearchInner({ handleOnSearch }: any) {
  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="padding-lr-t1" style={{ width: "100%" }}>
          <h1 className="titulo3-bold" style={{ color: "#ffffff" }}>
            Busca a tu juego favorito
          </h1>
          <Search handleOnSearch={handleOnSearch} mode="dark" />
        </div>
      </div>
      <img
        id={styles["closeModalSearch"]}
        src="/img/fi-br-cross.png"
        style={{ display: "none" }}
        alt="close"
      />
    </>
  );
}
