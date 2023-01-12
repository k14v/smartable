// Core
import React, { useMemo, useState } from 'react';
// Types
import { SmarTableColumnDefinition, SmarTableRow as SmarTableRowType } from '../../types/SmarTableTypes';
// Dnd
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
// Utils
import getColumnId from '../../utils/getColumnId';

export type SmarTableColumnsDraggableProps<
  TRow extends SmarTableRowType,
> = {
  children: React.ReactElement[];
  columns: SmarTableColumnDefinition<TRow>[];
  onColumnSort?: (event: DragMoveEvent | DragEndEvent, columnOrder: string[]) => void;
  reorderItems?: typeof arrayMove;
}

export const SmarTableColumnsDraggable = <
  TRow extends SmarTableRowType
>({
  columns,
  onColumnSort,
  reorderItems = arrayMove,
  children
}: SmarTableColumnsDraggableProps<TRow>) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const ids = useMemo(() => columns.map((column) => getColumnId(column)), [columns]);

  const [activeId, setActiveId] = useState<ElementType<typeof ids> | null>(null);

  const getIndex = ids.indexOf.bind(ids);
  // const getPosition = (id: string) => getIndex(id as ElementType<typeof ids>) + 1;
  const activeIndex = activeId ? getIndex(activeId) : -1;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as ElementType<typeof ids>);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event
    setActiveId(null);

    if (over && typeof onColumnSort === 'function') {
      const overIndex = getIndex(over.id as ElementType<typeof ids>);
      if (activeIndex !== overIndex) {
        onColumnSort(event, reorderItems(ids, activeIndex, overIndex))
      }
    }
  }

  function handleDragMove(event: DragMoveEvent) {
    const { over } = event
    if (over && typeof onColumnSort === 'function') {
      const overIndex = getIndex(over.id as ElementType<typeof ids>);
      if (activeIndex !== overIndex) {
        onColumnSort(event, reorderItems(ids, activeIndex, overIndex))
      }
    }
  }

  const columnNodes = React.Children.toArray(children) as typeof children;

  const activeColumn = useMemo(() => activeId ? columnNodes.find(({ props }) => activeId === props.field) : null, [activeId, columnNodes]);


  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      // onDragMove={handleDragMove}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext items={ids} strategy={horizontalListSortingStrategy}>
        {columnNodes}
      </SortableContext>
      <DragOverlay>
        {activeColumn}
      </DragOverlay>
    </DndContext>
  )
}

export default SmarTableColumnsDraggable
