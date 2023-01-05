import SortableComponent from "@components/SortableComponent";
import STHead from "@components/STHead";
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
}

const SmartHeaders: FC<Props> = () => {
  const { setNodeRef } = useDraggable({
    id: "unique-id",
  });
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={tableColumns.map((column) => column.accessor)}
        strategy={horizontalListSortingStrategy}
      >
        {tableColumns.map((column) => {
          return (
            <div ref={setNodeRef}>
              <SortableComponent
                key={column + "sort"}
                id={column.accessor}
                n={column.accessor}
              />
              <STHead key={column.accessor + "head"} column={column} />
            </div>
          );
        })}
      </SortableContext>
    </DndContext>
  );
};

export default SmartHeaders;
