import { DataTableColumns, DataTableRow } from "../types/SmarTableTypes";
import getColumnId from "./getColumnId";


export const parseColumns = <
  TRow extends DataTableRow
>(columns: DataTableColumns<TRow>, sorting?: string[], hidden?: string[]) => {
  let parsedColumns = columns;

  if (sorting) {
    parsedColumns = [...parsedColumns.sort((a, b) => sorting.indexOf(getColumnId(a)) - sorting.indexOf(getColumnId(b)))];
  }

  if (hidden) {
    parsedColumns = [...parsedColumns.filter((column) => !hidden.includes(getColumnId(column)))];
  }

  return parsedColumns;
}

export default parseColumns;
