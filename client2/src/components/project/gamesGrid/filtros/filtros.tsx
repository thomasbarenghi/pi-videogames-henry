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
import { Input, Search, Button, BottomSheet, CreateGame } from "@/components";
import { FiltersInner } from "./mobile";
import { FilterSelect, GenresClass } from "@/types";

export default function FiltrosComponent() {
  const dispatch = useAppDispatch();
  const [SearchModalVisible, setSearchModalVisible] = useState(false);
  const [FiltersModalVisible, setFiltersModalVisible] = useState(false);
  const { ordering, filtering } = useAppSelector(
    (state) => state?.client?.filters
  );

  const { genres: sGenres } = useAppSelector((state) => state?.client?.genres);

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
          <InputsGroup
            formatGenres={formatGenres}
            handleFilters={handleFilters}
            ordering={ordering}
            genresFilter={genresFilter}
            rating={rating}
            origen={origen}
            titleOrdering={titleOrdering}
         
            generalClassName="rounded-3xl bg-red-200 border-red-200 border-solid px-4 font-medium text-base border-r-[15px] border-r-4 py-4 text-red-700  p-4"
          />
        </div>
        {/* <Button
          text=""
          type="button"
          onClick={() => setSearchModalVisible(true)}
          className="primaryButton aspect-square !p-4 flex sm:hidden "
          image="/img/fi-br-searchClear.svg"
          imageWidth={40}
          imageHeight={40}
        /> */}
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
        <BottomSheet
          openModal={FiltersModalVisible}
          setOpenModal={setFiltersModalVisible}
        >
          <FiltersInner>
            <InputsGroup
              formatGenres={formatGenres}
              handleFilters={handleFilters}
              ordering={ordering}
              genresFilter={genresFilter}
              rating={rating}
              origen={origen}
              titleOrdering={titleOrdering}
              generalClassName="rounded-3xl bg-red-700 border-red-700 border-solid px-4 font-medium text-base border-r-[15px] border-r-4 py-4 text-white  p-4"
              />
          </FiltersInner>
        </BottomSheet>
      </div>
    </div>
  );
}

type InputsGroupProps = {
  handleFilters: (e: any) => void;
  ordering: any;
  genresFilter: any;
  rating: any;
  origen: any;
  titleOrdering: any;
  formatGenres: any;
  generalClassName: string;
};

function InputsGroup({
  formatGenres,
  handleFilters,
  ordering,
  genresFilter,
  rating,
  origen,
  titleOrdering,
  generalClassName,
}: InputsGroupProps) {
  return (
    <>
      <Input
        type="select"
        name={"Ordering"}
        value={ordering?.active}
        selectOptions={titleOrdering?.getValuesFormatted()}
        onChange={handleFilters}
        handleSelectChange={handleFilters}
        selectLabel="Ordering"
        placeholder="Ordering"
        className={generalClassName}
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
        className={generalClassName}
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
        className={generalClassName}
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
        className={generalClassName}
      />
    </>
  );
}
