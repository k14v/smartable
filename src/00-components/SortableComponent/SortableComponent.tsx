import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC } from "react";

interface Props {
  n: React.ReactNode;
  id: string;
  colWidth?: number | undefined;
}

const SortableHeader: FC<Props> = ({ n, id, colWidth }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <th
      className="w-full flex justify-center items-center"
      ref={setNodeRef}
      style={{ width: colWidth || "auto", ...style }}
      {...attributes}
      {...listeners}
    >
      {n}
    </th>
  );
};

export default SortableHeader;
