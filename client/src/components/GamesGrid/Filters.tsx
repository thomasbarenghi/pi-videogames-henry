/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react'
import {
  setOrdering,
  setFilterOrigen,
  setFilterGenres,
  setFilterSearch,
  setFilterRating,
  restoreFilters
} from '@/redux/slices/client/filters'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import styles from './filtros.module.scss'
import { Search, Button, BottomSheet, CreateGame } from '@/components'
import FiltersInner from './Mobile'
import InputsGroup from './InputsGroup'

const Filters = () => {
  const dispatch = useAppDispatch()
  const [FiltersModalVisible, setFiltersModalVisible] = useState(false)
  const { ordering, filtering } = useAppSelector((state) => state?.client?.filters)
  const { genres } = useAppSelector((state) => state?.client?.genres)
  const formatGenres = genres?.map((genre) => ({ value: genre?.id, label: genre?.name }))
  const { rating, genres: genresFilter, search, origen } = filtering
  const { title: titleOrdering } = ordering

  const handleFilters = (e: any) => {
    const { name, value } = e.target
    name === titleOrdering
      ? dispatch(setOrdering(value))
      : name === origen.title
        ? dispatch(setFilterOrigen(value))
        : name === genresFilter.title
          ? dispatch(setFilterGenres(value))
          : name === rating.title
            ? dispatch(setFilterRating(value))
            : null
  }

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterSearch(e.target.value))
  }

  return (
    <div>
      <div id={styles.componente_filtros} className='margin-b-40'>
        <Search handleOnSearch={handleOnSearch} mode='light' activeSearch={search.active} />
        <div id={styles.filtros_boxDesktop}>
          <InputsGroup
            formatGenres={formatGenres}
            handleFilters={handleFilters}
            ordering={ordering}
            genresFilter={genresFilter}
            rating={rating}
            genres={genres}
            origen={origen}
            titleOrdering={ordering}
            generalClassName='rounded-3xl bg-red-200 border-red-200 border-solid px-4 font-medium text-base border-r-[15px] border-r-4 py-4 text-red-700  p-4'
          />
        </div>
        <Button
          text='Filtros'
          type='button'
          onClick={() => {
            setFiltersModalVisible(true)
          }}
          className='primaryButton'
          id={styles.filtrosBtn}
        />
        <Button
          text='Restaurar'
          type='button'
          onClick={() => dispatch(restoreFilters())}
          className='primaryButton'
          id={styles.crearJuegoBtn}
        />
        <CreateGame />
        <BottomSheet openModal={FiltersModalVisible} setOpenModal={setFiltersModalVisible}>
          <FiltersInner>
            <InputsGroup
              genres={genres}
              formatGenres={formatGenres}
              handleFilters={handleFilters}
              ordering={ordering}
              genresFilter={genresFilter}
              rating={rating}
              origen={origen}
              titleOrdering={ordering}
              generalClassName='rounded-3xl bg-red-700 border-red-700 border-solid px-4 font-medium text-base border-r-[15px] border-r-4 py-4 text-white  p-4'
            />
          </FiltersInner>
        </BottomSheet>
      </div>
    </div>
  )
}

export default Filters
