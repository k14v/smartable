import { SmarTableColumnDefinition, SmarTableRow } from "../types/SmarTableTypes";


export const getColumnGroups = <
  TRow extends SmarTableRow,
  TColumn extends Pick<SmarTableColumnDefinition<TRow>, 'pinned'>
>(columns: TColumn[]) => {
  const columnGroups: [TColumn[], TColumn[], TColumn[]] = [[], [], []];

  columns.forEach((column) => {
    columnGroups[1 + (column.pinned === 'left' ? -1 : (column.pinned === 'right' ? 1 : 0))].push(column);
  });

  return columnGroups;
}

export default getColumnGroups;
