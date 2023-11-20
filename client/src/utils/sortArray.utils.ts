/* eslint-disable @typescript-eslint/indent */
export const sort = (toSort: any[], ordering: 'A-Z' | 'Z-A') =>
  Array.isArray(toSort)
    ? toSort.sort((a, b) =>
        ordering === 'A-Z'
          ? a.name.localeCompare(b.name)
          : ordering === 'Z-A'
            ? b.name.localeCompare(a.name)
            : a.id - b.id
      )
    : []
