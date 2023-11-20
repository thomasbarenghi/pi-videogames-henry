export const getCurrentFilters = (filters: any) => {
  const currentFilters: Record<string, string> = {}
  const { filtering } = filters

  Object.keys(filtering).forEach((filterKey) => {
    const currentFilter = filtering[filterKey]
    if (Object.prototype.hasOwnProperty.call(currentFilter, 'active')) {
      currentFilters[filterKey] = currentFilter.active
    }
  })

  return currentFilters
}
