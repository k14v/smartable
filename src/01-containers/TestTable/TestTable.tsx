import { FC, useEffect, useState } from "react";
import useSmartTable, { ColumnInterface } from "@hooks/use-smart-table";
import tableColumns from "./columns";
import TablePagination from "./PaginationComponent";
import { DndContext } from "@dnd-kit/core";

import {
  restrictToHorizontalAxis,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import SmartHeaders from "@components/SmartHeaders";
import SmartRows from "@components/SmartRows";
import mockedData from "@utils/mockedData";
import StyledTestTable from "./StyledTestTable.styled";

const TestTable: FC = () => {
  const [columnHover, setColumnHover] = useState(false);
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
  } = useSmartTable({
    data: mockedData,
    columns: tableColumns,
    pageSize: 10,
    initPage: 0,
  });

  useEffect(() => {
    handlePagination();
  }, []);

  return (
    <DndContext
      modifiers={[
        columnHover ? restrictToHorizontalAxis : restrictToVerticalAxis,
      ]}
    >
      <StyledTestTable>
        {smartColumns && smartRows && (
          <>
            <SmartHeaders columns={smartColumns} updateCols={updateCols} />
            <SmartRows
              rows={smartRows}
              smartColumns={smartColumns}
              selectedRows={selectedRows}
              selectRows={selectRows}
            />
          </>
        )}
      </StyledTestTable>
    </DndContext>
  );
};

export default TestTable;
