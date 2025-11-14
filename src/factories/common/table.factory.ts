import type { TableData, TablePaginator, TableSort } from 'uikit-3it-react'

//Table sort
export const initialSort: TableSort = {
  key: '',
  keys: [],
  index: -1,
  asc: false
}
//Table paginator
export const initialPaginator: TablePaginator = {
  currentPage: 0,
  finalPage: 0,
  total: 0
}
//Function
export function createTableData<T>(columns: string[]): TableData<T> {
  return {
    columns,
    data: [],
    actions: [],
    paginator: { ...initialPaginator },
    sort: { ...initialSort }
  }
}
