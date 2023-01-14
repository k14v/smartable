import Checkbox from "@components/Checkbox";
import SmartCell from "@components/SmartCell";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ColumnInterface } from "@hooks/use-smart-table";
import { FC } from "react";
import StyledSmartRow from "./SmartRow.styled";

interface Props {
  row: any;
  rowIsSelected: boolean;
  selectRows: (row: string) => void;
  smartColumns: ColumnInterface[];
  id: string;
}

const SmartRow: FC<Props> = ({
  row,
  rowIsSelected,
  smartColumns,
  id,
  selectRows,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const handleSelectRow = () => {
    selectRows(row.id);
  };

  return (
    <div style={style}>
      <StyledSmartRow isSelected={rowIsSelected}>
        <Checkbox
          width={64}
          onChange={handleSelectRow}
          label=""
          checked={rowIsSelected}
          key={row.id}
        />
        <div
          key={row.id}
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
        >
          ||
        </div>
        {smartColumns.map((column: ColumnInterface, idx: number) => (
          <SmartCell
            width={column.width || undefined}
            key={idx}
            column={column}
            row={row}
          />
        ))}
      </StyledSmartRow>
    </div>
  );
};

export default SmartRow;
