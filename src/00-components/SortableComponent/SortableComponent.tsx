import StyledSmartHeader from "@components/SortableComponent/StyledSmartHeader.styled";
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
    <StyledSmartHeader
      ref={setNodeRef}
      style={style}
      height={58}
      width={colWidth}
      {...attributes}
      {...listeners}
    >
      {n}
    </StyledSmartHeader>
  );
};

export default SortableHeader;
