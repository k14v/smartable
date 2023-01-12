import styled from "styled-components";

interface Props {
  height?: number;
  width?: number;
}

const StyledSmartHeader = styled.th<Props>`
  display: flex;
  align-items: center;
  overflow-x: hidden;
  height: ${(props) => `${props.height}px` || "auto"};
  width: ${(props) => `${props.width}px` || "auto"};
  justify-content: center;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background-color: #fff;
  color: #1a202c;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  text-align: left;
  min-width: 9rem;
`;
export default StyledSmartHeader;
