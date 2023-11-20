import { type FilterSelect } from '@/interfaces'

export const getValuesFormatted = (item: FilterSelect) => {
  const { values } = item

  if (!values) {
    return []
  }

  return values?.map((value) => ({ value: value?.id, label: value?.name }))
}
