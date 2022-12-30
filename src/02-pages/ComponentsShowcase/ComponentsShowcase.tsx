import CheckboxComponent from "@components/Checkbox";
import Counter from "@components/Counter";

const ComponentsShowcase = (): JSX.Element => {
  return (
    <div className="mx-3 my-3">
      <CheckboxComponent label="Label" onChange={() => {}} />
      <Counter initialCount={3} />
    </div>
  );
};

export default ComponentsShowcase;
