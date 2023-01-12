// Core
import React from 'react';
import { SmarTableColumns, SmarTableRow } from '../../types/SmarTableTypes';
// Theming
import styled from 'styled-components';


export type SmarTableElement = HTMLDivElement;

export type SmarTableProps<
  TRow extends SmarTableRow
> = {
  children?: React.ReactNode | React.ReactNode[];
  dense?: boolean;
  rows: TRow[],
  columns: SmarTableColumns<TRow>,
}

export const SmarTable = React.forwardRef(<
  TRow extends SmarTableRow
>({
  rows,
  columns,
  dense = false,
  children,
  ...restProps
}: SmarTableProps<TRow>,
  ref: React.ForwardedRef<SmarTableElement>
) => {

  return (
    <div ref={ref} {...restProps}>
      {children}
    </div>
  )
});

export default styled(SmarTable)`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .viewport {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 13rem;
  }
` as typeof SmarTable
