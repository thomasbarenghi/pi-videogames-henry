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
import { Input, Search, Button, Modal, CreateGame } from "@/components";
import { FilterSelect, FilterSelectItem, GenresClass } from "@/types";

export default function FiltrosComponent() {
  const dispatch = useAppDispatch();
  const [SearchModalVisible, setSearchModalVisible] = useState(false);
  const [FiltersModalVisible, setFiltersModalVisible] = useState(false);
  const { ordering, filtering } = useAppSelector(
    (state) => state?.client.filters
  );

  const { genres: sGenres } = useAppSelector((state) => state?.client.genres);

  const genres = GenresClass.deserializeList(sGenres);
  const formatGenres = genres?.map((genre) => {
    return { value: genre?.id, label: genre?.name };
  });
  const rating = FilterSelect.deserialize(filtering.rating);
  const genresFilter = FilterSelect.deserialize(filtering.genres);
  const search = FilterSelect.deserialize(filtering.search);
  const origen = FilterSelect.deserialize(filtering.origen);
  const titleOrdering = FilterSelect.deserialize(ordering);

  console.log("genresclass", GenresClass, FilterSelect);

  const handleFilters = (e: any) => {
    const { name, value } = e.target;
    console.log("name", name, titleOrdering.getTitle(), value);

    name === titleOrdering.getTitle()
      ? dispatch(setOrdering(value))
      : name === origen.getTitle()
      ? dispatch(setFilterOrigen(value))
      : name === genresFilter.getTitle()
      ? dispatch(setFilterGenres(value))
      : name === rating.getTitle()
      ? dispatch(setFilterRating(value))
      : null;
  };

  const handleOnSearch = (e: any) => {
    dispatch(setFilterSearch(e.target.value));
  };

  return (
    <div>
      <div id={styles["componente_filtros"]} className="margin-b-40">
        <Search
          handleOnSearch={handleOnSearch}
          mode="light"
          activeSearch={search.getActive()}
        />
        <div id={styles["filtros_boxDesktop"]}>
          <Input
            type="select"
            name={"Ordering"}
            value={ordering?.active}
            selectOptions={titleOrdering?.getValuesFormatted()}
            onChange={handleFilters}
            handleSelectChange={handleFilters}
            selectLabel="Ordering"
            placeholder="Ordering"
          />
          <Input
            name={origen.getTitle()}
            value={origen.getActive()}
            selectOptions={origen.getValuesFormatted()}
            onChange={handleFilters}
            handleSelectChange={handleFilters}
            selectLabel="Origen"
            placeholder="Origen"
            type="select"
          />
          <Input
            type="select"
            name={genresFilter.getTitle()}
            value={genresFilter.getActive()}
            selectOptions={formatGenres}
            onChange={handleFilters}
            handleSelectChange={handleFilters}
            selectLabel="Genres"
            placeholder="Genres"
          />
          <Input
            type="select"
            name={rating.getTitle()}
            value={rating.getActive()}
            selectOptions={rating.getValuesFormatted()}
            onChange={handleFilters}
            handleSelectChange={handleFilters}
            selectLabel="Rating"
            placeholder="Rating"
          />
        </div>
        <Button
          text=""
          type="button"
          onClick={() => setSearchModalVisible(true)}
          className="primaryButton"
          id={styles["searchBtn"]}
          image="/img/fi-br-searchClear.svg"
          imageWidth={24}
          imageHeight={24}
        />
        <Button
          text="Filtros"
          type="button"
          onClick={() => setFiltersModalVisible(true)}
          className="primaryButton"
          id={styles["filtrosBtn"]}
        />
        <Button
          text="Restaurar"
          type="button"
          onClick={() => dispatch(restoreFilters())}
          className="primaryButton"
          id={styles["crearJuegoBtn"]}
        />
        <CreateGame />

        {/* <Modal
          openModal={SearchModalVisible}
          setOpenModal={setSearchModalVisible}
        >
          <SearchInner handleOnSearch={handleOnSearch} />
        </Modal>
        <Modal
          openModal={FiltersModalVisible}
          setOpenModal={setFiltersModalVisible}
        >
          <FiltersInner
            handleFilters={handleFilters}
            filtering={f}
            genres={genres}
            ordering={ordering}
          />
        </Modal> */}
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
          <Search handleOnSearch={handleOnSearch} mode="dark" activeSearch="" />
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
