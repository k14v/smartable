import { FC } from "react";
import StyledSmartCell from "./SmartCell.styled";

interface Props {
  width?: number;
  column: any;
  row: any;
}

const handleGetVal = (
  row: any,
  accessor: string,
  format?: ((value: any) => string | number | JSX.Element) | undefined
) => {
  if (format) {
    return format(row[accessor]);
  }
  return row[accessor];
};

//poner aqui el ancho
const SmartCell: FC<Props> = ({ width, column, row }) => {
  return (
    <StyledSmartCell height={60} width={width}>
      {handleGetVal(row, column.accessor, column.format || undefined)}
    </StyledSmartCell>
  );
};

export default SmartCell;
