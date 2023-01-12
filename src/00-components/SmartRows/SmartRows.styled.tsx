import styled from "styled-components";

interface Props {
  isSelected: boolean;
}

const StyledSmartRows = styled.div<Props>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  overflow: scroll;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${(props) => (props.isSelected ? "blue" : "white")};
`;

export default StyledSmartRows;
