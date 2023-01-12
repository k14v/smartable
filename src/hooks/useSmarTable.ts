// Core
import React, { useContext } from "react";
// Typings
import { SmarTableData } from '../types/SmarTableTypes';
// Context
import SmarTableContext, { SmarTableContextType } from "../contexts/SmarTableContext";;


export const useSmarTable = <
  TData extends SmarTableData,
>() => {
  const ctx = useContext<SmarTableContextType<TData>>(SmarTableContext);

  if (!ctx) {
    throw new Error('Missing DataTable.Context');
  }

  return ctx;
}

export default useSmarTable;