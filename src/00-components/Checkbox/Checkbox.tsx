import { ChangeEventHandler, useState } from "react";

interface Props {
  checked?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  width?: number;
}

const CheckboxComponent = ({ checked, onChange, label, width }: Props) => {
  const [isChecked, setIsChecked] = useState(checked) || false;

  const handleClick = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <div
      style={{
        width: `${width}px` || "42px",
        display: "flex",
        justifyContent: "center",
      }}
      className="m-3 flex items-center text-dark dark:text-light"
      onClick={() => handleClick(!isChecked)}
    >
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      <label className="ml-2 hover:cursor-pointer ">{label}</label>
    </div>
  );
};

export default CheckboxComponent;
