import { FC } from "react";

interface Props {
  column: any;
}

const STHead: FC<Props> = ({ column }) => {
  return (
    <th
      key={column.accessor}
      className="border border-black max-w-md overflow-x-hidden"
    >
      {column.header}
    </th>
  );
};

export default STHead;
