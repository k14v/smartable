import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC } from "react";

interface Props {
  n: React.ReactNode;
  id: string;
}

const SortableComponent: FC<Props> = ({ n, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {n}
    </div>
  );
};

export default SortableComponent;
