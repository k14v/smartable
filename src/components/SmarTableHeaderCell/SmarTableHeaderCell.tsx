// Core
import React, { useMemo } from 'react';
// Types
import { SmarTableColumnDefinition, SmarTableRow } from '../../types/SmarTableTypes'
// Components
import SmarTableCell, { SmarTableCellProps, SmarTableCellElement } from '../SmarTableCell';
// Theming
import styled from 'styled-components';


export type SmarTableHeaderCellElement = SmarTableCellElement;

export type SmarTableHeaderCellProps<
  TRow extends SmarTableRow
> =
  & Omit<SmarTableCellProps<TRow>, 'row'>
  & {
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    column: SmarTableColumnDefinition<TRow>
  }

export const SmarTableHeaderCell = React.forwardRef(<
  TRow extends SmarTableRow
>({
  draggable,
  children,
  column,
  startAdornment,
  endAdornment,
  ...restProps
}: SmarTableHeaderCellProps<TRow>,
  ref: React.ForwardedRef<SmarTableHeaderCellElement>
) => {
  const {
    headerName,
    renderHeader,
    field,
  } = column;

  const childrenToRender = useMemo(() => renderHeader ? renderHeader(headerName) : (headerName ?? (typeof field === 'string' ? field : 'NO_HEADER_NAME')) , [renderHeader, headerName]);

  return (
    <SmarTableCell
      ref={ref}
      column={column}
      row={{} as any}
      {...restProps}
      role="button"
    >
      {startAdornment}
      <span className='title'>
        {childrenToRender}
      </span>
      {endAdornment}
    </SmarTableCell>
  )
});


export default styled(SmarTableHeaderCell)`
  column-gap: ${({ theme }) => '16px'};
  color: ${({ theme }) => '#040404'};
  .title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 400;
    font-size: 14px;
    line-height: 20p;
    text-transform: capitalize;
    color: ${({ theme }) => '#040404'};
  }
  .dragHandler {
    display: flex;
    cursor: pointer;
    color: ${({ theme }) => '#040404'};
  }
` as typeof SmarTableHeaderCell;
