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
import { Input, Search, Button, BottomSheet, CreateGame } from '@/components'
import { FiltersInner } from './Mobile'
import { type FilterSelect } from '@/interfaces'

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
      : name === origen
        ? dispatch(setFilterOrigen(value))
        : name === genresFilter
          ? dispatch(setFilterGenres(value))
          : name === rating
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
            origen={origen}
            titleOrdering={titleOrdering}
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
              formatGenres={formatGenres}
              handleFilters={handleFilters}
              ordering={ordering}
              genresFilter={genresFilter}
              rating={rating}
              origen={origen}
              titleOrdering={titleOrdering}
              generalClassName='rounded-3xl bg-red-700 border-red-700 border-solid px-4 font-medium text-base border-r-[15px] border-r-4 py-4 text-white  p-4'
            />
          </FiltersInner>
        </BottomSheet>
      </div>
    </div>
  )
}

interface InputsGroupProps {
  handleFilters: (e: any) => void
  ordering: any
  genresFilter: any
  rating: FilterSelect
  origen: FilterSelect
  titleOrdering: FilterSelect
  formatGenres: any
  generalClassName: string
}

const InputsGroup = ({
  formatGenres,
  handleFilters,
  ordering,
  genresFilter,
  rating,
  origen,
  titleOrdering,
  generalClassName
}: InputsGroupProps) => (
  <>
    <Input
      label={titleOrdering.title}
      type='select'
      name={titleOrdering?.title}
      value={ordering?.active}
      selectSelected={titleOrdering?.active}
      selectOptions={titleOrdering?.active}
      onChange={handleFilters}
      handleSelectChange={handleFilters}
      selectLabel='Orden'
      placeholder='Orden'
      className={generalClassName}
    />
    <Input
      label={origen.title}
      name={origen.title}
      value={origen.active}
      selectSelected={origen.active}
      selectOptions={origen.values}
      onChange={handleFilters}
      handleSelectChange={handleFilters}
      selectLabel='Origen'
      placeholder='Origen'
      type='select'
      className={generalClassName}
    />
    <Input
      label={genresFilter.getTitle()}
      type='select'
      name={genresFilter.getTitle()}
      selectSelected={genresFilter.active}
      value={genresFilter.getActive()}
      selectOptions={formatGenres}
      onChange={handleFilters}
      handleSelectChange={handleFilters}
      selectLabel='Default'
      placeholder='Generos'
      className={`xl:max-w-[100px] ${generalClassName}`}
    />
    <Input
      label={rating.title}
      type='select'
      name={rating.title}
      selectSelected={rating.active}
      value={rating.active}
      selectOptions={rating.values}
      onChange={handleFilters}
      handleSelectChange={handleFilters}
      selectLabel='Rating'
      placeholder='Rating'
      className={generalClassName}
    />
  </>
)

export default Filters
