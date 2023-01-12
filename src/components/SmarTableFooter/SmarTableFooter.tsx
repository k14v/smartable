// Core
import React, { useCallback, useMemo } from 'react';
// Types
import { SmarTableRow } from '../../types/SmarTableTypes';
// Components
import Select, { SelectProps } from '@mui/material/Select';
import Pagination, { PaginationProps } from '@mui/material/Pagination';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
// Theming
import styled from 'styled-components';


export type SmarTableFooterProps<
  TRow extends SmarTableRow
> =
  & React.HTMLAttributes<HTMLDivElement>
  & {
    dense?: boolean;
    rows: TRow[],
    onPaginate?: (event: any, meta: { newPage: number, rowsPerPage: number }) => void,
    onPageChange?: (event: any, newPage: number) => void,
    onRowsPerPageChange?: (event: any, rowsPerPage: number) => void,
    rowsPerPageOptions?: number[];
    rowsPerPageProps?: Omit<SelectProps, 'onChange' | 'options' | 'ref'>;
    paginationProps?: Omit<PaginationProps, 'onChange' | 'count'>;
    rowsPerPage?: number;
    totalRows?: number;
    page?: number;
  }

export const SmarTableFooter = React.forwardRef(<
  TRow extends SmarTableRow
>({
  onPaginate,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50, 100],
  rowsPerPage = rowsPerPageOptions[0],
  rowsPerPageProps,
  paginationProps,
  totalRows: totalRowsProp,
  page = 1,
  rows,
  ...restProps
}: SmarTableFooterProps<TRow>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {

  const totalRows = totalRowsProp ?? rows.length ?? 0;

  const handleChangePage = useCallback<PickProp<PaginationProps, 'onChange'>>((evt, newPage) => {
    if (onPageChange) {
      onPageChange(evt, newPage);
    }

    if (onPaginate) {
      onPaginate(evt, {
        newPage: newPage,
        rowsPerPage: rowsPerPage
      });
    }
  }, [rowsPerPage, onPageChange, onPaginate]);

  const handleChangeRowsPerPage = useCallback<PickProp<SelectProps, 'onChange'>>((evt) => {
    const newRowsPerPage = evt.target.value ? parseInt(evt.target.value as any, 10) : undefined;

    if (typeof newRowsPerPage === "number" && !Number.isNaN(newRowsPerPage)) {
      if (onRowsPerPageChange) {
        onRowsPerPageChange(evt, newRowsPerPage);
      }
      if (onPaginate) {
        onPaginate(evt, {
          newPage: 1,
          rowsPerPage: newRowsPerPage
        })
      }
    }
  }, [onRowsPerPageChange, onPaginate]);

  const rowsPerPageItems: MenuItemProps[] = useMemo(() => rowsPerPageOptions.map((value) => ({
    label: value,
    value
  })), [rowsPerPageOptions]);

  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <div
      ref={ref}
      {...restProps}
    >
      <div>
        <Select
          variant='outlined'
          size='small'
          {...rowsPerPageProps}
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
        >
          {rowsPerPageItems.map((props) => <MenuItem {...props}/>)} 
          </Select>
        <span>Mostrando {rows.length} de {totalRows} resultados</span>
      </div>
      <Pagination
        color="primary"
        {...paginationProps}
        count={totalPages}
        page={page}
        disabled={totalPages <= 1}
        onChange={handleChangePage}
      />
    </div>
  )
});


export default styled(SmarTableFooter)`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.palette.grey[300]};
  padding: ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(2)};
  justify-content: space-between;

  & > div {
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`;
