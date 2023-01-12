// Core
import React from 'react';
// Types
import { SmarTableColumnDefinition, SmarTableRow } from '../../types/SmarTableTypes';
// Hooks
import { useSmarTableMeasurer } from '../SmarTableCellMeasurer/SmarTableCellMeasurer';
// Theming
import styled from 'styled-components';


export type SmarTableColumnProps<
  TRow extends SmarTableRow
> =
  & React.HTMLAttributes<HTMLDivElement>
  & {
    columnIndex: number;
    column: SmarTableColumnDefinition<TRow>;
    children: React.ReactNode;
  }

export const SmarTableColumn = React.forwardRef(<
  TRow extends SmarTableRow
>({
  column,
  columnIndex,
  children,
  style,
  ...restProps
}: SmarTableColumnProps<TRow>, ref: React.ForwardedRef<HTMLDivElement>) => {

  const { cache } = useSmarTableMeasurer();

  return (
    <div ref={ref} style={{
      width: cache.getColumnWidth(columnIndex),
      ...style
    }}
      {...restProps}
    >
      {children}
    </div>
  )
});

export default styled(SmarTableColumn)`
  position: ${({ column }) => column.pinned === true ? 'sticky' : 'static'};
  ${({ column }) => column.pinned === true ? 'left: 0;' : ''} 
  ${({ column }) => column.pinned === true ? 'border-right: solid 1px #efefef;' : ''} 
` as typeof SmarTableColumn;
