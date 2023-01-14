import styled from "styled-components";

interface Props {
  height?: number;
  width?: number;
}

const StyledSmartCell = styled.td<Props>`
  display: flex;
  align-items: center;
  overflow-x: hidden;
  height: ${(props) => `${props.height}px` || "auto"};
  width: ${(props) => `${props.width}px` || "auto"};
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.25rem;
  color: #1a202c;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  text-align: left;
  min-width: 9rem;
`;

export default StyledSmartCell;
