import { FC, useEffect, useState } from "react";
import useSmartTable from "@hooks/use-smart-table";
import tableColumns from "./columns";
import TablePagination from "./TablePagination";
import { DndContext } from "@dnd-kit/core";

import {
  restrictToHorizontalAxis,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import SmartHeaders from "@components/SmartHeaders";
import Checkbox from "@components/Checkbox";
interface Props {
  data: any;
}

interface FilterInterface {
  filters: () => boolean;
}

const TestTable: FC<Props> = ({ data }) => {
  const [dragOver, setDragOver] = useState("");
  const [columnHover, setColumnHover] = useState(false);
  const [tableFilters, setTableFilters] = useState<FilterInterface[]>([]);
  const {
    smartRows,
    smartColumns,
    updateCols,
    handlePagination,
    currentPage,
    pages,
    setPage,
    selectRows,
    selectedRows,
    setRows,
  } = useSmartTable(data, tableColumns, 10, 0);

  useEffect(() => {
    handlePagination(10);
  }, [data]);

  return (
    <DndContext
      modifiers={[
        columnHover ? restrictToHorizontalAxis : restrictToVerticalAxis,
      ]}
    >
      <div className="text-xl flex flex-col text-dark dark:text-light justify-center">
        <input onChange={(e) => filterRows(e.target.value)} />
        {data && smartColumns && smartRows && (
          <table className="bg-[#f8fafc] ">
            <SmartHeaders columns={smartColumns} updateCols={updateCols} />
            <tbody>
              {smartRows &&
                smartRows.map((row: any) => (
                  <tr
                    key={row.name}
                    className={`dark:bg-darker py-3 ${
                      selectedRows.includes(row.name) ? "bg-gray-200" : ""
                    }`}
                  >
                    <td>
                      <Checkbox
                        label=""
                        checked={selectedRows.includes(row.name)}
                        onChange={() => selectRows(row.name)}
                      />
                    </td>
                    {smartColumns.map((column: any) => (
                      <td
                        key={column.accessor}
                        className="border-black px-3 py-3"
                        onMouseEnter={() => setColumnHover(true)}
                        onMouseLeave={() => setColumnHover(false)}
                      >
                        {column.format
                          ? column.format(row[column.accessor])
                          : row[column.accessor]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {
          <TablePagination
            currentPage={currentPage}
            setPage={setPage}
            pages={pages}
          />
        }
      </div>
    </DndContext>
  );
};

export default TestTable;
