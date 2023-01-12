import { ColumnInterface } from "@hooks/use-smart-table";

const tableColumns = [
  {
    header: "ID",
    accessor: "id",
    align: "center",
  },
  {
    header: "Company",
    accessor: "company",
    width: 500,
  },
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
  {
    header: "Avatar",
    accessor: "avatar",
    align: "center",
    format: (value: string) => (
      <img src={value} alt="avatar" className="w-10 h-10 rounded-full" />
    ),
  },
  {
    header: "Gender",
    accessor: "gender",
    align: "start",
  },
] satisfies ColumnInterface[];

export default tableColumns;
