export const paginate = (array: any[], pageSize: number, pageNumber: number) =>
  array?.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
