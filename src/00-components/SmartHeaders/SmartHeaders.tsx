import SortableHeader from "@components/SortableComponent/SortableComponent";
import tableColumns from "@containers/TestTable/columns";
import { closestCenter, DndContext, useDraggable } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
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

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const newColumns = columns.map((column) => {
        if (column.accessor === active.id) {
          return {
            ...column,
            accessor: over.id,
          };
        }
        if (column.accessor === over.id) {
          return {
            ...column,
            accessor: active.id,
          };
        }
        return column;
      });

      updateCols(newColumns);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={columns.map((column) => column.accessor)}
        strategy={horizontalListSortingStrategy}
      >
        <thead>
          {columns.map((column) => {
            return (
              <th ref={setNodeRef}>
                <SortableHeader
                  colWidth={column.width}
                  key={column + "sort"}
                  id={column.accessor}
                  n={column.accessor}
                />
              </th>
            );
          })}
        </thead>
      </SortableContext>
    </DndContext>
  );
};

export default SmartHeaders;
