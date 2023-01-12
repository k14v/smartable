// Typings
import {
  SmarTableColumnDefinition,
  SmarTableRow
} from "../types/SmarTableTypes";
// Utils
import formatValue from "./formatValue";
import getValue from "./getValue";


export const renderCell = <TRow extends SmarTableRow, TValue = any>(
  row: TRow,
  column: SmarTableColumnDefinition,
  value: TValue = getValue(row, column),
  formattedValue: string = formatValue(row, column, value)
) => column.renderCell
    ? column.renderCell({ row, column, value, formattedValue })
    : formattedValue;

export default renderCell;
