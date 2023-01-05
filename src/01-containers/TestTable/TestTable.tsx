import { FC, useEffect, useState } from "react";
import useSmartTable from "@hooks/use-smart-table";
import tableColumns from "./columns";
interface Props {
  data: any;
}

const TestTable: FC<Props> = ({ data }) => {
  const {
    smartRows,
    smartColumns,
    updateCols,
    handlePagination,
    currentPage,
    pages,
  } = useSmartTable(data, tableColumns, 10, 0);

  const [dragOver, setDragOver] = useState("");

  const handleDragStart = (e: any) => {
    const { id } = e.target;
    const idx = smartColumns.indexOf(id);
    e.dataTransfer.setData("colIdx", idx);
  };

  const handleDragOver = (e: any) => e.preventDefault();
  const handleDragEnter = (e: any) => {
    const { id } = e.target;
    setDragOver(id);
  };

  const handleOnDrop = (e: any) => {
    const { id } = e.target;
    const droppedColIdx = smartColumns.indexOf(id);
    const draggedColIdx = e.dataTransfer.getData("colIdx");
    const tempCols = [...smartColumns];
    tempCols[draggedColIdx] = smartColumns[droppedColIdx];
    tempCols[droppedColIdx] = smartColumns[draggedColIdx];
    updateCols(tempCols);
    setDragOver("");
  };

  return (
    <div className="text-xl flex flex-col text-dark dark:text-light justify-center">
      {data && smartColumns && smartRows && (
        <table>
          <thead>
            <tr>
              {smartColumns.map((col) => (
                <th
                  id={col.accessor}
                  key={col.accessor}
                  style={{ width: col.width }}
                  className={`
                  ${dragOver ? `border-l-${dragOver && "5px solid red"}` : ""} 
                  ${col.width ? `w-[${col.width}]` : ""}
                  ${col.align ? `text-${col.align}` : ""}
                  `}
                  draggable
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleOnDrop}
                  onDragEnter={handleDragEnter}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {smartRows &&
              smartRows.map((row: { name: string; price: number }) => (
                <tr key={row.name} className="border-black py-3">
                  {Object.entries(row).map(([k, v], idx) => (
                    <td
                      width={smartColumns[idx].width}
                      className={`px-4   ${
                        dragOver
                          ? `border-l-${dragOver && "5px solid red"}`
                          : ""
                      }  ${
                        smartColumns[idx].align
                          ? `flex justify-${smartColumns[idx].align}`
                          : ""
                      }
                      `}
                      key={k}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {typeof currentPage === "number" && (
        <div className="flex w-full h-12 bg-slate-300 dark:bg-darker justify-around">
          <button
            onClick={() => handlePagination(10, 0)}
            disabled={currentPage === 0}
          >
            First Page
          </button>
          <button
            onClick={() => handlePagination(10, currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span className="flex justify-center items-center">
            {currentPage}/{pages}
          </span>
          <button
            onClick={() => handlePagination(10, currentPage + 1)}
            disabled={currentPage === pages - 1}
          >
            Next
          </button>
          <button
            onClick={() => handlePagination(10, pages)}
            disabled={currentPage === pages}
          >
            Last Page
          </button>
        </div>
      )}
    </div>
  );
};

export default TestTable;
