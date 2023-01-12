import React from 'react';
import { createContext } from 'react';
import {
  SmarTableData,
  SmarTableRow,
  SmarTableColumnDefinition
} from '../types/SmarTableTypes';

export interface SmarTableContextType<
  TRow extends SmarTableRow
> {
  rows: TRow[];
  columns: SmarTableColumnDefinition<TRow>[];
}

export const SmarTableContext = createContext<any | null>(null);

export const SmarTableContextProvider = <
  TData extends SmarTableData,
>({
  value,
  children,
}: {
  value: SmarTableContextType<TData>,
  children: React.ReactNode
}) => {
  return (
    <SmarTableContext.Provider value={value}>
      {children}
    </SmarTableContext.Provider>
  )
}

export default SmarTableContext;
