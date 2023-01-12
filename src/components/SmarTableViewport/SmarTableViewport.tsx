// Core
import React from 'react';
// Typings
import { SmarTableRow } from '../../types/SmarTableTypes';
// Components
import SmarTableCellMeasurer, { SmarTableCellMeasurerProps } from '../SmarTableCellMeasurer/SmarTableCellMeasurer';
import SmarTableScroller from '../SmarTableScroller/SmarTableScroller';
// Theming
import styled from 'styled-components';


export type SmarTableViewportProps<
  TRow extends SmarTableRow
> = SmarTableCellMeasurerProps

export const SmarTableViewport = React.forwardRef(<
  TRow extends SmarTableRow,
>({
  columns,
  children,
}: SmarTableViewportProps<TRow>, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <div ref={ref} className='viewport'>
      <SmarTableCellMeasurer
        columns={columns}
      >
        <SmarTableScroller>
          {children}
        </SmarTableScroller>
      </SmarTableCellMeasurer>
    </div>
  )
})

export default styled(SmarTableViewport)`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 13rem;
` as typeof SmarTableViewport
