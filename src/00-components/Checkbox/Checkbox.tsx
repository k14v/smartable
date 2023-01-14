import { ChangeEventHandler, useState } from "react";
import StyledCheckbox from "./Checkbox.styled";

interface Props {
  checked?: boolean;
  onChange: () => void;
  label: string;
  width?: number;
}

const CheckboxComponent = ({ checked, onChange, label, width }: Props) => {
  const [isChecked, setIsChecked] = useState(checked);
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsChecked(e.target.checked);
    onChange();
  };

  return (
    <StyledCheckbox width={width}>
      <input type="checkbox" checked={isChecked} onChange={handleOnChange} />
      <label>{label}</label>
    </StyledCheckbox>
  );
};

export default CheckboxComponent;
