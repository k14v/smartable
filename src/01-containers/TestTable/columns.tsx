import { ColumnInterface } from "@hooks/use-smart-table";

const tableColumns = [
  {
    header: "Name",
    accessor: "name",
    width: 500,
  },
  {
    header: "Price",
    accessor: "price",
    align: "center",
  },
] satisfies ColumnInterface[];

export default tableColumns;
