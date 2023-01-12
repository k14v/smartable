// Core
import React, { useMemo } from 'react';
// Utils
import getColumnId from '../../utils/getColumnId';
// Hooks
import useForkRef from '../../hooks/useForkRef';
// Dnd
import { useSortable } from '@dnd-kit/sortable';
// Types
import { SmarTableRow } from '../../types/SmarTableTypes'
// Components
import SmarTableColumn, { SmarTableColumnProps } from '../SmarTableColumn/SmarTableColumn';
// Icons
import ReorderIcon from '@mui/icons-material/Reorder';


export type SmarTableColumnDraggableElement = HTMLDivElement;

export type SmarTableColumnDraggableProps<
  TRow extends SmarTableRow
> =
  & SmarTableColumnProps<TRow>
  & {
    children?: React.ReactNode | React.FC<{ dragHandler: React.ReactNode }>
  };

export const SmarTableColumnDraggable = React.forwardRef(<
  TRow extends SmarTableRow
>({
  draggable,
  children,
  column,
  style: styleProp,
  ...restProps
}: SmarTableColumnDraggableProps<TRow>,
  ref: React.ForwardedRef<SmarTableColumnDraggableElement>
) => {

  const id = getColumnId(column);
  const isDraggable = !(column.draggable === false);

  const {
    listeners,
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: !isDraggable
  });

  const columnRef = useForkRef<SmarTableColumnDraggableElement>(ref, setNodeRef);
  const style = {
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
    ...styleProp,
    transition,
    transform: `translate(${transform?.x ?? 0}px, 0px)`
  };

  const childrenToRender = useMemo(() => typeof children === 'function' ? children({
    dragHandler: isDraggable ? (
      <div
        className='dragHandler'
        {...listeners}
        {...attributes}
      >
        <ReorderIcon fontSize='small' />
      </div>
    ) : null
  }) : children, [
    listeners,
    attributes,
    children
  ]);

  return (
    <SmarTableColumn
      ref={columnRef}
      column={column}
      style={style}
      {...restProps}
    >
      {childrenToRender}
    </SmarTableColumn>
  )
});


export default SmarTableColumnDraggable
