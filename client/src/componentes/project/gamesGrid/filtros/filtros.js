import React from 'react'
import SelectComponent from '../../../general/select/select';
import { setOrdering, setFilterOrigen, setFilterGenres, setFilterSearch, setFilterRating, restoreFilters } from '../../../../redux/actions/frontend/filters';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Search from '../../../general/search/search';
import styles from "./filtros.module.scss"
import Button from "../../../general/button/button";
import Modal from "../../../general/modal/modal";
import { manageCreateGame } from '../../createGame/createGame';

export default function FiltrosComponent() {

    const dispatch = useDispatch();
    const filtering = useSelector((state) => state?.filters?.filtering);
    const genres = useSelector((state) => state?.apiGenres);
    const ordering = useSelector((state) => state?.filters?.ordering);
    const [SearchModalVisible, setSearchModalVisible] = useState(false);
    const [FiltersModalVisible, setFiltersModalVisible] = useState(false);

    const handleFilters = (e) => {
        const { name, value } = e.target;
        name === ordering.title ? dispatch(setOrdering(value))
            : name === filtering.origen.title ? dispatch(setFilterOrigen(value))
                : name === filtering.genres.title ? dispatch(setFilterGenres(value))
                    : name === filtering.rating.title ? dispatch(setFilterRating(value))
                        : console.log("No se encontro el filtro")
    }

    const handleOnSearch = (e) => { dispatch(setFilterSearch(e.target.value)) }

    return (
        <div>
            <div id={styles["componente_filtros"]} className="margin-b-40">
                <Search handleOnSearch={handleOnSearch} mode="light" />
                <div id={styles["filtros_boxDesktop"]}>
                    <SelectComponent name={"Ordering"} active={ordering?.active} values={ordering?.values} onChange={handleFilters} selectClass="select" labelClass="label_select" />
                    <SelectComponent name={filtering?.origen?.title} active={filtering?.origen?.active} values={filtering?.origen.values} onChange={handleFilters} selectClass="select" labelClass="label_select" />
                    <SelectComponent name={filtering.genres.title} active={filtering.genres.active} values={genres.genres.map(genre => genre.name)} onChange={handleFilters} selectClass="select" labelClass="label_select" />
                    <SelectComponent name={filtering?.rating.title} active={filtering?.rating?.active} values={filtering?.rating.values} onChange={handleFilters} selectClass="select" labelClass="label_select" />
                </div>
                <Button text="" type="button" onClick={() => setSearchModalVisible(true)} className="btn1 btn1-t1" id={styles["searchBtn"]} image="/img/fi-br-searchClear.svg" imageWidth={24} imageHeight={24} />
                <Button text="Filtros" type="button" onClick={() => setFiltersModalVisible(true)} className="btn1 btn1-t1" id={styles["filtrosBtn"]} />
                <Button text="Restaurar" type="button" onClick={() => dispatch(restoreFilters())} className="btn1 btn1-t1" id={styles["crearJuegoBtn"]} />
                <Button text="Crear juego" type="button" onClick={() => manageCreateGame(true)} className="btn1 btn1-t1" id={styles["crearJuegoBtn"]} />
                <Modal openModal={SearchModalVisible} setOpenModal={setSearchModalVisible} ><SearchInner handleOnSearch={handleOnSearch} /></Modal>
                <Modal openModal={FiltersModalVisible} setOpenModal={setFiltersModalVisible} ><FiltersInner handleFilters={handleFilters} filtering={filtering} genres={genres} ordering={ordering} /></Modal>
            </div>
        </div>
    )
}

function FiltersInner({ handleFilters, filtering, genres, ordering }) {
    return (
        <>
            <div className="padding-lr-t1" style={{ display: "flex", gap: "10px", flexDirection: "column", width: "100%" }} id="test">
                <h1 className="titulo3-bold margin-b-4" style={{ color: "#ffffff" }}>Filtrar juegos</h1>
                <div style={{ width: "100%", display: "flex", gap: "10px", flexDirection: "column" }}>
                    <SelectComponent name={"Ordering"} active={ordering?.active} values={ordering?.values} onChange={handleFilters} selectClass="select2" labelClass="label_select2" />
                    <SelectComponent name={filtering?.origen?.title} active={filtering?.origen?.active} values={filtering?.origen.values} onChange={handleFilters} selectClass="select2" labelClass="label_select2" />
                    <SelectComponent name={filtering.genres.title} active={filtering.genres.active} values={genres.genres.map(genre => genre.name)} onChange={handleFilters} selectClass="select2" labelClass="label_select2" />
                    <SelectComponent name={filtering?.rating.title} active={filtering?.rating?.active} values={filtering?.rating.values} onChange={handleFilters} selectClass="select2" labelClass="label_select2" />
                </div>
            </div>
        </>
    )
}

function SearchInner({ handleOnSearch }) {
    return (
        <>
            <div style={{ width: "100%" }}>
                <div className="padding-lr-t1" style={{ width: "100%" }}>
                    <h1 className="titulo3-bold" style={{ color: "#ffffff" }}>Busca a tu juego favorito</h1>
                    <Search handleOnSearch={handleOnSearch} mode="dark" />
                </div>
            </div>
            <img id={styles["closeModalSearch"]} src="/img/fi-br-cross.png" style={{ display: "none" }} alt="close" />
        </>
    )
}