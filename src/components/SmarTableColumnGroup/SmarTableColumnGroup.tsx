// Core
import React from 'react';
// Hooks
import { useDataTableScroller } from '../SmarTableScroller/SmarTableScroller';
// Theming
import styled from 'styled-components';


export type DataTableColumnGroupProps = {
  pinned?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const DataTableColumnGroup: React.FC<DataTableColumnGroupProps> = ({
  children,
  pinned,
  ...restProps
}) => {
  return (
    <div
      {...restProps}
    >
      {children}
    </div>
  )
}

export default styled(DataTableColumnGroup)`
  display: flex;
  flex-direction: row;
  z-index: 0;
${({ pinned }) => pinned === 'left'
    ? `
  position: sticky;
  left: 0;
  z-index: 1;
  > div:last-of-type > div {
    border-right: solid 3px #f8f4f4;
  }
`
    : pinned === 'right' ? `
  position: sticky;
  right: 0;
  z-index: 1;
  > div:first-of-type > div {
    border-left: solid 3px #f8f4f4;
  }
` : ``} 
`;;
