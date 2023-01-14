import styled from "styled-components";

interface Props {
  width?: number;
}

const StyledCheckbox = styled.td<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
`;

export default StyledCheckbox;
