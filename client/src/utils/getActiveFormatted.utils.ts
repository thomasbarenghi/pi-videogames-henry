import { type FilterSelect } from '@/interfaces'

export const getActiveFormatted = (selected: FilterSelect, active: string) => {
  console.log('getActiveFormatted', selected.title, typeof selected?.values[0]?.id, typeof active)
  const activeItem = selected.values.find((value) => value?.id === active)
  if (!activeItem) return
  console.log('getActiveFormatted activeItem', activeItem)
  return { value: activeItem.id, label: activeItem.name }
}
