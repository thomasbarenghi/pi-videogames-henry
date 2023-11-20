import { type FilterSelect } from '@/interfaces'

export const getActiveFormatted = (selected: FilterSelect, active: string) => {
  if (!selected.values) {
    return { value: '', label: '' }
  }

  if (!active) {
    return { value: '', label: '' }
  }

  const activeItem = selected.values.find((value) => value?.id === active) ?? { id: '', name: '' }

  return { value: activeItem.id, label: activeItem.name }
}
