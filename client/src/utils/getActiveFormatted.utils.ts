import { type FilterSelect } from '@/interfaces'

export const getActiveFormatted = (selected: FilterSelect, active: string) => {
  const activeItem = selected.values.find((value) => value?.id === active)
  if (!activeItem) return
  return { value: activeItem.id, label: activeItem.name }
}
