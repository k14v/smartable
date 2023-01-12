// Core
import React, { useCallback, useMemo } from 'react';
// Types
import {
  SmarTableColumnDefinition,
  SmarTableRow
} from '../../types/SmarTableTypes';
// Utils
import getColumnGroups from '../../utils/getColumnGroups';
import getColumnId from '../../utils/getColumnId';
// DnD
import {
  DragMoveEvent,
  DragEndEvent,
} from "@dnd-kit/core";
// Hooks
import { useSmarTableMeasurer } from '../SmarTableCellMeasurer/SmarTableCellMeasurer';
// Components
import SmarTableColumnGroup from '../SmarTableColumnGroup/SmarTableColumnGroup';
import SmarTableColumnsDraggable, { SmarTableColumnsDraggableProps } from '../SmarTableColumnsDraggable/SmarTableColumnsDraggable';
import SmarTableHeaderCell, { SmarTableHeaderCellProps } from '../SmarTableHeaderCell';
import SmarTableColumnDraggable from '../SmarTableColumnDraggable/SmarTableColumnDraggable';
// Theming
import styled from 'styled-components';


export type SmarTableHeaderProps<
  TRow extends SmarTableRow,
> =
  & React.HTMLAttributes<HTMLDivElement>
  & {
    dense?: boolean;
    columns: SmarTableColumnDefinition<TRow>[];
    onColumnClick?: (evt: React.MouseEvent<HTMLDivElement>, column: SmarTableColumnDefinition<TRow>) => React.ReactNode
    onColumnSort?: (event: DragMoveEvent | DragEndEvent, columnOrder: string[]) => void;
    cellComponent?: React.FC<SmarTableHeaderCellProps<any>>;
  }

export const SmarTableHeader = React.forwardRef(<
  TRow extends SmarTableRow,
>({
  columns,
  onColumnSort,
  onColumnClick,
  cellComponent: CellComponent = SmarTableHeaderCell,
  dense,
  ...restProps
}: SmarTableHeaderProps<TRow>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {

  const tableMeasurer = useSmarTableMeasurer();

  const handleColumnSort = useCallback<PickProp<SmarTableColumnsDraggableProps<TRow>, 'onColumnSort'>>((evt, columnOrder) => {
    if (onColumnSort) onColumnSort(evt, columnOrder);
    tableMeasurer.update()
  }, [tableMeasurer.cache]);

  const handleCellClick = useCallback<PickProp<SmarTableHeaderCellProps<TRow>, 'onCellClick'>>((evt, { column }) => {
    if (onColumnClick) {
      onColumnClick(evt, column);
    }
  }, [onColumnClick]);

  const [pinnedLeftCols, flexCols, pinnedRightCols] = useMemo(() => {
    let colIdx = 0;
    return getColumnGroups(columns).map((columns) => columns.map((column) => {
      const columnIndex = colIdx++;
      return (
        <SmarTableColumnDraggable
          columnIndex={columnIndex}
          key={`data-table-header-column-${getColumnId(column)}`}
          column={column}
        >
          Hello
          {/* {({ dragHandler }) =>
          <CellComponent
            dense={dense}
            tabIndex={0}
            column={column}
            columnIndex={columnIndex}
            rowIndex={0}
            onCellClick={handleCellClick}
            startAdornment={dragHandler}
          />
          } */}
        </SmarTableColumnDraggable>
      )
    }))
  }, [CellComponent, dense, columns, handleCellClick]);

  return (
    <div
      ref={ref}
      {...restProps}
    >
      {!!pinnedLeftCols.length && <SmarTableColumnGroup pinned="left">
        <SmarTableColumnsDraggable
          columns={columns}
          onColumnSort={onColumnSort}
        >
          {pinnedLeftCols}
        </SmarTableColumnsDraggable>
      </SmarTableColumnGroup>}
      <SmarTableColumnGroup>
        <SmarTableColumnsDraggable
          columns={columns}
          onColumnSort={handleColumnSort}
        >
          {flexCols}
        </SmarTableColumnsDraggable>
      </SmarTableColumnGroup>
      {!!pinnedRightCols.length && <SmarTableColumnGroup pinned="right">
        <SmarTableColumnsDraggable
          columns={columns}
          onColumnSort={onColumnSort}
        >
          {pinnedRightCols}
        </SmarTableColumnsDraggable>
      </SmarTableColumnGroup>}
    </div>
  )
});


export default styled(SmarTableHeader)`
  min-width: min-content;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  flex-direction: row;
  & > div:first-of-type > div:first-of-type > div {
    padding-left: ${({ theme, dense }) => theme.spacing(dense ? 1 : 2)}
  }
  & > div:last-of-type > div:last-of-type > div {
    padding-right: ${({ theme, dense }) => theme.spacing(dense ? 1 : 2)}
  }
` as typeof SmarTableHeader
