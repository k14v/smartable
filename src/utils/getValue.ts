import { SmarTableColumnDefinition, SmarTableRow } from "../types/SmarTableTypes";

/**
 * Given a column definition tries to introspect the value from a row using the field property or custom getter
 */
export const getValue = <TRow extends SmarTableRow>(
  row: TRow,
  column: SmarTableColumnDefinition<TRow>
) => {
  let fieldValue = undefined;

  if (typeof column.field === 'string') {
    fieldValue = row[column.field];
  } else if (typeof column.field === 'function') {
    // @ts-ignore
    fieldValue = column.field({ row, column });
  }

  return fieldValue;
};


export default getValue;
