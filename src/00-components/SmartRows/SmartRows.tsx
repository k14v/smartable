import SmartRow from "@components/SmartRow/SmartRow";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  useDraggable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ColumnInterface } from "@hooks/use-smart-table";
import { FC } from "react";

interface Props {
  rows: any;
  selectedRows: string[];
  smartColumns: ColumnInterface[];
  selectRows: (row: string) => void;
  updateRows: (rows: any) => void;
}

const SmartRows: FC<Props> = ({
  rows,
  smartColumns,
  selectedRows,
  selectRows,
  updateRows,
}) => {
  const { setNodeRef } = useDraggable({
    id: "unique-id",
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const activeIndex = rows.findIndex(
      (row: any) => row.id === event.active.id
    );
    const overIndex = rows.findIndex((row: any) => row.id === event.over?.id);
    if (activeIndex !== overIndex) {
      const newRows = arrayMove(rows, activeIndex, overIndex);
      updateRows(newRows);
    }
  };

  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={(e) => console.log(e, "I am dragging")}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={rows.map((row: any) => row.id)}
          strategy={verticalListSortingStrategy}
        >
          {rows &&
            rows.map((row: any) => (
              <tr ref={setNodeRef}>
                <SmartRow
                  row={row}
                  rowIsSelected={selectedRows.includes(row.id)}
                  selectRows={selectRows}
                  smartColumns={smartColumns}
                  id={row.id}
                  key={row.name}
                />
              </tr>
            ))}
        </SortableContext>
      </DndContext>
    </>
  );
};

export default SmartRows;
