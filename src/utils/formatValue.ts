// Typings
import {
  SmarTableColumnDefinition,
  SmarTableRow,
  SmarTableValueFormatter,
} from "../types/SmarTableTypes";
// Utils
import getValue from "./getValue";

/**
 * Default value formatter fallback
 */
export const defaultFormatter: SmarTableValueFormatter = ({ value }) => {
  if (value === undefined || value === null) {
    return '-';
  }

  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') {
    return value.toString()
  }

  if (Array.isArray(value) || typeof value === 'object' && value.constructor === Object) {
    return JSON.stringify(value, null, 2);
  }

  return 'NON_SERIALIZABLE';
}

/**
 * Given row and column definitions defined how to format the value
 */
export const formatValue = <TRow extends SmarTableRow, TValue = any>(
  row: TRow,
  column: SmarTableColumnDefinition,
  value: TValue = getValue(row, column)
): string => column.valueFormatter
    ? column.valueFormatter({ row, column, value })
    : defaultFormatter({ row, column: column as any, value });

export default formatValue;
