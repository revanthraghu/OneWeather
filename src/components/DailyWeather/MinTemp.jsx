import styled from "styled-components";
import { MinTempTip } from "./MinTempTip";
export const MinTemp = styled.td`
  padding: 10px;
  color: rgb(0, 100, 255);
  border-bottom: 1px solid #ddd;
  position: relative;
  &:hover ${MinTempTip} {
    visibility: visible;
  }
`;
