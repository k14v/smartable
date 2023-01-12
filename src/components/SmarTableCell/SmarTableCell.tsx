// Core
import React, { useCallback, useMemo } from 'react';
// Hooks
import { useSmarTableCellMeasurer } from '../SmarTableCellMeasurer/SmarTableCellMeasurer';
import { useForkRef } from '../../hooks/useForkRef';
// Utils
import getColumnId from '../../utils/getColumnId';
import renderCell from '../../utils/renderCell';
// Types
import {
  SmarTableColumnDefinition,
  SmarTableRow,
} from '../../types/SmarTableTypes';
// Theming
import styled from 'styled-components';


export type SmarTableCellElement = HTMLDivElement;

export type SmarTableCellProps<
  TRow extends SmarTableRow,
> =
  & React.HTMLAttributes<SmarTableCellElement>
  & {
    dense?: boolean;
    row: TRow;
    column: SmarTableColumnDefinition<TRow>;
    tabIndex: 0 | -1;
    columnIndex: number;
    rowIndex: number;
    onCellClick?: (evt: React.MouseEvent<HTMLDivElement>, meta: { row: TRow, column: SmarTableColumnDefinition<TRow> }) => void
  }

export const SmarTableCell = React.forwardRef(<
  TRow extends SmarTableRow,
>({
  children,
  style,
  column,
  row,
  columnIndex,
  rowIndex,
  onCellClick,
  onClick,
  ...restProps
}: SmarTableCellProps<TRow>,
  ref: React.ForwardedRef<SmarTableCellElement>
) => {

  const cellRef = useSmarTableCellMeasurer<HTMLDivElement>(rowIndex, columnIndex, getColumnId(column));

  const forkedRef = useForkRef(ref, cellRef);

  const childrenToRender = useMemo(() => renderCell(row, column as any), [column, row]);

  const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>((evt) => {
    if (onCellClick) {
      onCellClick(evt, { column, row })
    }
    if (onClick) {
      onClick(evt);
    }
  }, [onCellClick, onClick, column, row]);

  return (
    <div ref={forkedRef}
      {...restProps}
      onClick={handleClick}
      style={{
        width: '100%',
        ...style
      }}
    >
      <div>
        {children ?? childrenToRender}
      </div>
    </div>
  )
});

export default styled(SmarTableCell)`
  padding: ${({ dense }) => dense ? '8px' : '16px'};
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: ${({ dense }) => dense ? 42 : 54}px;
  height: ${({ dense }) => dense ? 42 : 54}px;
  align-items: center;
  background: white;
  border-bottom: 1px solid #efefef;
  & > div {
    display: flex;
    align-items: center;
    gap: 16px;
  }
` as typeof SmarTableCell;
