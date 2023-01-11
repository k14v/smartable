import { useState, useEffect } from "react";

// different kinds of columns to extend.
export interface ColumnInterface {
  header: string;
  accessor: string;
  isSortable?: boolean;
  isHidden?: boolean;
  isPinned?: boolean;
  format?: (value: any) => string | number | JSX.Element;
  width?: number;
  align?: "start" | "center" | "end";
}
export interface ColumnComponent extends ColumnInterface {
  renderComponent?: (row: any) => JSX.Element;
  renderHeaderComponent?: () => JSX.Element;
}

const checkIfFormatting = (row: any, col: ColumnInterface) => {
  if (col.format) {
    return col.format(row[col.accessor]);
  }
  return row[col.accessor];
};

const useSmartTable = (
  data: any,
  columns: ColumnInterface[],
  pageSize?: number,
  initPage?: number
) => {
  const [rowsState, setRowsState] = useState([]);
  const [columnState, setColumnState] = useState<ColumnInterface[]>(columns);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const handleSelectRows = (id: string) => {
    const selected = selectedRows.includes(id);
    if (selected) {
      setSelectedRows(selectedRows.filter((row: any) => row !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handlePagination = () => {
    if (pageSize) {
      const pages =
        data.lentgh % pageSize === 0
          ? Math.ceil(data.length / pageSize)
          : Math.ceil(data.length / pageSize) - 1;
      const start = pageSize * currentPage;
      const end = start + pageSize;
      const paginatedData = data.slice(start, end);
      setRowsState(paginatedData);
      setPages(pages);
    }
  };

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  const setRows = (rows: any) => {
    setRowsState(rows);
  };

  return {
    smartRows: rowsState,
    smartColumns: columnState,
    updateCols: setColumnState,
    initData: data,
    handlePagination,
    pages,
    currentPage,
    setPage,
    setRows,
    selectedRows,
    selectRows: handleSelectRows,
  };
};

export default useSmartTable;
