import Checkbox from "../00-components/Checkbox";
import { render } from "@testing-library/react";

describe("Checkbox", () => {
  it("renders without crashing", () => {
    render(<Checkbox onChange={() => {}} label="test" />);
  });
});
