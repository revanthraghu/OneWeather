import styled from "styled-components";
import { MinTempTip } from "./MinTempTip";
export const MinTemp = styled.td`
  padding: 10px;
  color: #65a4f1;
  border-bottom: 1px solid rgb(150,150,150);
  text-align: center;
  position: relative;
  &:hover ${MinTempTip} {
    visibility: visible;
  }
`;
