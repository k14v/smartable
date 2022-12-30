import { useState } from "react";

interface Props {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const CheckboxComponent = ({ checked, onChange, label }: Props) => {
  const [isChecked, setIsChecked] = useState(checked) || false;

  const handleClick = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <div
      className="m-3 flex items-center text-dark dark:text-light"
      onClick={() => handleClick(!isChecked)}
    >
      <input type="checkbox" checked={isChecked} />
      <label className="ml-2 hover:cursor-pointer ">{label}</label>
    </div>
  );
};

export default CheckboxComponent;
