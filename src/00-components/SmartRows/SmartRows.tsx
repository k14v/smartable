import Checkbox from "@components/Checkbox";
import SmartCell from "@components/SmartCell";
import { ColumnInterface } from "@hooks/use-smart-table";
import { FC } from "react";
import StyledSmartRows from "./SmartRows.styled";

interface Props {
  rows: any;
  selectedRows: string[];
  smartColumns: ColumnInterface[];
  selectRows: (row: string) => void;
}

const SmartRows: FC<Props> = ({
  rows,
  smartColumns,
  selectedRows,
  selectRows,
}) => {
  return (
    <>
      {rows &&
        rows.map((row: any) => (
          <StyledSmartRows isSelected={selectedRows.includes(row.name)}>
            <Checkbox
              width={40}
              label=""
              checked={selectedRows.includes(row.name)}
              onChange={() => selectRows(row.name)}
            />
            {smartColumns.map((column: ColumnInterface, idx: number) => (
              <SmartCell
                width={column.width || undefined}
                key={idx}
                column={column}
                row={row}
              />
            ))}
          </StyledSmartRows>
        ))}
    </>
  );
};

export default SmartRows;
