import styled from "styled-components";

export const Tooltip = styled.span`
  visibility: hidden;
  width: 100px;
  background-color: white;
  color: black;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: 15px;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -40px;
`;
