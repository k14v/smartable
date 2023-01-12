// Core
import React, { useCallback, useMemo } from 'react';
// Types
import { 
  SmarTableColumnDefinition, 
  SmarTableRow as SmarTableRowType, 
  SmarTableRowFromData 
} from '../../types/SmarTableTypes';
// Utils
import getColumnGroups from '../../utils/getColumnGroups';
import getColumnId from '../../utils/getColumnId';
// Componets
import SmarTableCell, { SmarTableCellProps } from '../../components/SmarTableCell';
import SmarTableColumnGroup from '../SmarTableColumnGroup/SmarTableColumnGroup';
import SmarTableColumn from '../SmarTableColumn/SmarTableColumn';
// Theming
import styled from 'styled-components';


export type SmarTableBodyElement = HTMLDivElement;

export type SmarTableBodyProps<
  TRow extends SmarTableRowType
> =
  & React.HTMLAttributes<SmarTableBodyElement>
  & {
    dense?: boolean;
    columns: SmarTableColumnDefinition<TRow>[],
    rows: TRow[],
    onRowClick?: (evt: React.MouseEvent, row: TRow) => void;
    columnKey?: (params: { column: SmarTableColumnDefinition<TRow>, columnIndex: number }) => string
    rowKey?: (params: { row: TRow, column: SmarTableColumnDefinition<TRow>, columnIndex: number, rowIndex: number }) => string
  }


export const SmarTableBody = React.forwardRef(<
  TRow extends SmarTableRowType,
>({
  columns,
  rows,
  onRowClick,
  dense,
  columnKey = ({ column }) => `data-table-body-column-${getColumnId(column)}`,
  rowKey = ({ column, rowIndex }) => `data-table-body-cell-${getColumnId(column)}:${rowIndex}`,
  ...restProps
}: SmarTableBodyProps<TRow>,
  ref: React.ForwardedRef<SmarTableBodyElement>
) => {

  const handleCellClick = useCallback<PickProp<SmarTableCellProps<TRow>, 'onCellClick'>>((evt, { row }) => {
    if (onRowClick) {
      onRowClick(evt, row);
    }
  }, [onRowClick]);

  const [pinnedLeftCols, flexCols, pinnedRightCols] = useMemo(() => {
    let columnIndex = -1;
    return getColumnGroups(columns).map((columns) => columns.map((column) => {
      return (
        <SmarTableColumn
          columnIndex={++columnIndex}
          key={columnKey({ column, columnIndex })}
          column={column}
        >
          {rows.map((row, rowIndex) => (
            <SmarTableCell
              key={rowKey({ column, columnIndex, row, rowIndex })}
              tabIndex={0}
              row={row}
              column={column}
              columnIndex={columnIndex}
              rowIndex={rowIndex + 1}
              onCellClick={handleCellClick}
              dense={dense}
            />
          )
          )}
        </SmarTableColumn>
      )
    }))
  }, [columns, rows, dense, columnKey, rowKey]);

  return (
    <div ref={ref} {...restProps}>
      {!!pinnedLeftCols.length && <SmarTableColumnGroup pinned="left">
        {pinnedLeftCols}
      </SmarTableColumnGroup>}
      <SmarTableColumnGroup>
        {flexCols}
      </SmarTableColumnGroup>
      {!!pinnedRightCols.length && <SmarTableColumnGroup pinned="right">
        {pinnedRightCols}
      </SmarTableColumnGroup>}
    </div>
  )
});

export default styled(SmarTableBody)`
  display: flex;
  flex-direction: row;
  & > div:first-of-type > div:first-of-type > div {
    padding-left: ${({ dense }) => dense ? '16px' : '32px'}
  }
  & > div:last-of-type > div:last-of-type > div {
    padding-right: ${({ dense }) => dense ? '16px' : '32px'}
  }
`
