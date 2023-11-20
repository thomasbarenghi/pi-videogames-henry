import { getActiveFormatted } from '@/utils/getActiveFormatted.utils'
import { Input } from '..'
import { getValuesFormatted } from '@/utils/getValuesFormatted.utils'
import { type Genre, type FilterSelect } from '@/interfaces'

interface InputsGroupProps {
  handleFilters: (e: any) => void
  ordering: any
  genresFilter: FilterSelect
  rating: FilterSelect
  origen: FilterSelect
  titleOrdering: FilterSelect
  genres: Genre[]
  formatGenres: any
  generalClassName: string
}

const InputsGroup = ({
  formatGenres,
  handleFilters,
  ordering,
  genresFilter,
  rating,
  genres,
  origen,
  titleOrdering,
  generalClassName
}: InputsGroupProps) => {
  const activeGenre = genres?.find((genre) => genre?.id === parseInt(genresFilter?.active))
  const activeFormatted = getActiveFormatted(
    {
      title: genresFilter?.title,
      values: genres?.map((genre) => ({ id: genre?.id.toString(), name: genre?.name })),
      active: activeGenre?.id.toString() ?? ''
    },
    activeGenre?.id?.toString() ?? 'null'
  )
  return (
    <>
      <Input
        label={titleOrdering.title}
        type='select'
        name={titleOrdering?.title}
        value={ordering?.active}
        selectSelected={getActiveFormatted(titleOrdering, ordering?.active)}
        selectOptions={getValuesFormatted(titleOrdering)}
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
        selectSelected={getActiveFormatted(origen, origen?.active)}
        selectOptions={getValuesFormatted(origen)}
        onChange={handleFilters}
        handleSelectChange={handleFilters}
        selectLabel='Origen'
        placeholder='Origen'
        type='select'
        className={generalClassName}
      />
      <Input
        label={genresFilter.title}
        type='select'
        name={genresFilter.title}
        selectSelected={activeFormatted}
        value={activeGenre?.name}
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
        selectSelected={getActiveFormatted(rating, rating?.active)}
        value={rating.active}
        selectOptions={getValuesFormatted(rating)}
        onChange={handleFilters}
        handleSelectChange={handleFilters}
        selectLabel='Rating'
        placeholder='Rating'
        className={generalClassName}
      />
    </>
  )
}

export default InputsGroup
