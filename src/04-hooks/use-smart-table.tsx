import { useState, useEffect, useCallback } from "react";

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

interface OptionsInterface {
  data: any;
  columns: ColumnInterface[];
  pageSize?: number;
  initPage?: number;
}

const useSmartTable = (options: OptionsInterface) => {
  const { data, columns, pageSize, initPage } = options;

  const [rowsState, setRowsState] = useState([]);
  const [columnState, setColumnState] = useState<ColumnInterface[]>(columns);
  const [pinnedColumns, setPinnedColumns] = useState<ColumnInterface[]>([]);
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
      const paginatedData = data.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
      );
      const pages = Math.ceil(data.length / pageSize);
      setRowsState(paginatedData);
      setPages(pages);
    }
  };

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  const setPinned = (pinned: ColumnInterface[]) => {
    setPinnedColumns(pinned);
  };

  const setRows = (rows: any) => {
    setRowsState(rows);
  };

  return {
    smartRows: rowsState,
    smartColumns: columnState,
    updateCols: useCallback<typeof setColumnState>(
      (state) => (console.log("pepe"), setColumnState(state)),
      []
    ),
    setPage: useCallback<typeof setPage>(setPage, []),
    setRows: useCallback<typeof setRows>(setRows, []),
    setPinned: useCallback<typeof setPinned>(setPinned, []),
    initData: data,
    handlePagination,
    pages,
    currentPage,
    selectedRows,
    pinnedColumns,
    selectRows: handleSelectRows,
  };
};

export default useSmartTable;
