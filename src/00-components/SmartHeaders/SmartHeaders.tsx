import SortableHeader from "@components/SortableHeader/SortableHeader";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  useDraggable,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  arrayMove,
} from "@dnd-kit/sortable";
import { FC } from "react";

interface ColumnInterface {
  header: string;
  accessor: string;
  isSortable?: boolean;
  isFilterable?: boolean;
  isSearchable?: boolean;
  isEditable?: boolean;
  isResizable?: boolean;
  isHidden?: boolean;
  isGroupable?: boolean;
  isPinned?: boolean;
  isFrozen?: boolean;
  format?: (value: any) => string | number | JSX.Element;
  width?: number;
}

interface Props {
  columns: ColumnInterface[];
  updateCols: (columns: ColumnInterface[]) => void;
}

const SmartHeaders: FC<Props> = ({ columns, updateCols }) => {
  const { setNodeRef } = useDraggable({
    id: "unique-id",
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const activeIndex = columns.findIndex(
      (column) => column.accessor === event.active.id
    );
    const overIndex = columns.findIndex(
      (column) => column.accessor === event.over?.id
    );
    if (activeIndex !== overIndex) {
      const newColumns = arrayMove(columns, activeIndex, overIndex);
      updateCols(newColumns);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={columns.map((column) => column.accessor)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex ml-[70px]">
          <span>&nbsp;</span>
          {columns.map((column) => {
            return (
              <th key={column.accessor + "th"} ref={setNodeRef}>
                <SortableHeader
                  colWidth={column.width}
                  key={column + "sort"}
                  id={column.accessor}
                  n={column.accessor}
                />
              </th>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SmartHeaders;
