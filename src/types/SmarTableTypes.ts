import React from 'react';


/**
 * The key value object representing the data of a row.
 */
export declare interface SmarTableRow {
  [key: string]: any;
};

export declare type SmarTableValueFormatterParams<
  TRow extends SmarTableRow,
  TValue = any
> = {
  row: TRow;
  value: TValue;
  column: SmarTableColumnDefinition;
}

export declare type SmarTableValueFormatter<
  TRow extends SmarTableRow = any,
  TValue = any
> = (params: SmarTableValueFormatterParams<TRow, TValue>) => string;

export declare type SmarTableRenderCellParams<
  TRow extends SmarTableRow,
  TValue = any
> = {
  row: TRow;
  value: TValue;
  formattedValue: string
  column: SmarTableColumnDefinition;
}

export declare type SmarTableRenderCell<
  TRow extends SmarTableRow,
  TValue = any,
> = (params: SmarTableRenderCellParams<TRow, TValue>) => React.ReactNode;

export declare type SmarTableData = SmarTableRow[];

/**
 * Extracts the row definition from a given data model
 */
export declare type SmarTableRowFromData<Data extends SmarTableData> = ElementType<Data>;

export declare type SmarTableValueGetterParams<
  TRow extends SmarTableRow,
> = {
  row: TRow;
  column: SmarTableColumnDefinition;
}

export declare type SmarTableValueGetter<
  TRow extends SmarTableRow,
  ReturnValue = any
> = (params: SmarTableValueGetterParams<TRow>) => ReturnValue;

export type SmarTableField<Row extends SmarTableRow> = keyof Row extends string ? keyof Row : never

export declare interface SmarTableColumnDefinitionCommon {
  /**
   * Allow draggable column
   */
  draggable?: boolean;
  /**
   * The title of the column rendered in the column header cell.
   */
  headerName?: string;
  /**
   * The description of the column rendered as tooltip if the column header name is not fully displayed.
   */
  description?: string;
  /**
   * Set the width of the column.
   */
  width?: number;
  /**
   * Sets the minimum width of a column.
   */
  minWidth?: number;
  /**
   * If `true`, hide the column.
   * @default false
   */
  hide?: boolean;
  /**
   * If `true`, the column is sortable.
   * @default true
   */
  sortable?: boolean;
  /**
   * If `true`, the column is resizable.
   * @default true
   */
  resizable?: boolean;
  /**
   * If `true`, the cells of the column are editable.
   * @default false
   */
  editable?: boolean;
  /**
   * If `false`, the menu items for column pinning menu will not be rendered.
   * @default true
   */
  pinnable?: boolean;
  /**
   * 
   */
  pinned?: boolean | 'left' | 'right',
  /**
   * Class name that will be added in cells for that column.
   */
  cellClassName?: string;
  /**
   * Class name that will be added in the column header cell.
   */
  headerClassName?: string;
}

export declare interface SmarTableColumnDefinition<
  TRow extends SmarTableRow = SmarTableRow,
  TField extends SmarTableField<TRow> | SmarTableValueGetter<TRow> = SmarTableField<TRow> | SmarTableValueGetter<TRow>,
  TValue = any
> extends SmarTableColumnDefinitionCommon {
  /**
   * The column identifier. It's used to map with [[SmarTableRowModel]] values or
   * Function that allows to get a specific data instead of named field to render in the cell.
   */
  field?: TField;
  /**
   * Function that allows to apply a formatter before rendering its value.
   * @param {GridValueFormatterParams} params Object containing parameters for the formatter.
   * @returns {SmarTableCellValue} The formatted value.
   */
  valueFormatter?: SmarTableValueFormatter<TRow, TValue>;
  /**
   * Allows to override the component rendered as cell for this column.
   * @param {SmarTableRenderCellParams} params Object containing parameters for the renderer.
   * @returns {React.ReactNode} The element to be rendered.
   */
  renderCell?: SmarTableRenderCell<TRow, TValue>;
  /**
   * Allows to render a component in the column header cell.
   * @param {GridColumnHeaderParams} params Object containing parameters for the renderer.
   * @returns {React.ReactNode} The element to be rendered.
   */
  renderHeader?: (params: any) => React.ReactNode;
}

export declare type SmarTableColumns<
  TRow extends SmarTableRow
> = (SmarTableColumnDefinition<TRow> | SmarTableColumnDefinition<TRow, SmarTableValueGetter<TRow>>)[];
