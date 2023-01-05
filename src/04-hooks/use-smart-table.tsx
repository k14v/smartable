import { useState, useEffect } from "react";

interface Column {
  header: string;
  accessor: string;
  isSortable?: boolean;
  isFilterable?: boolean;
  isSearchable?: boolean;
  isEditable?: boolean;
  isResizable?: boolean;
  isHidden?: boolean;
  isGroupable?: boolean;
  isPinned?: boolean;
  isFrozen?: boolean;
  format?: (value: any) => string | number | JSX.Element;
  width?: number;
  align?: "start" | "center" | "end";
}

const checkIfFormatting = (row: any, col: Column) => {
  if (col.format) {
    return col.format(row[col.accessor]);
  }
  return row[col.accessor];
};

const filterByColumn = (data: any, filter: string[], column: string) => {
  const filteredRows = filter.forEach((f) => {
    return data.filter((row: any) => {
      return row[column].toString().toLowerCase().includes(f.toLowerCase());
    });
  });
};

const useSmartTable = (
  data: any,
  columns: Column[],
  pageSize?: number,
  initPage?: number
) => {
  const [rowsState, setRowsState] = useState([]);
  const [columnState, setColumnState] = useState<Column[]>([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const filterRows = (filter: string) => {
    const filteredRows = data.filter((row: any) => {
      return Object.values(row).some((value: any) => {
        return value.toString().toLowerCase().includes(filter.toLowerCase());
      });
    });
    setRowsState(filteredRows);
  };

  const handlePagination = (itemsByPage: number, currentPage: number) => {
    const pages = Math.ceil(data.length / itemsByPage);
    const start = itemsByPage * currentPage;
    const end = start + itemsByPage;
    const paginatedData = data.slice(start, end);
    setRowsState(paginatedData);
    setPages(pages);
    setCurrentPage(currentPage);
  };

  useEffect(() => {
    if (pageSize) {
      handlePagination(pageSize, currentPage);
      setColumnState(columns);
      return;
    }
    setRowsState(data);
    setColumnState(columns);
  }, [data, columns, pageSize]);

  useEffect(() => {
    if (pageSize && initPage) {
      handlePagination(pageSize, initPage);
    }
  }, [data, pageSize]);

  return {
    smartRows: rowsState,
    smartColumns: columnState,
    updateCols: setColumnState,
    filterRows,
    filterByColumn,
    initData: data,
    handlePagination,
    pages,
    currentPage,
    setCurrentPage,
  };
};

export default useSmartTable;
