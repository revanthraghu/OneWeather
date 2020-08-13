import styled from "styled-components";
import { MaxTempTip } from "./MaxTempTip";
export const MaxTemp = styled.td`
  padding: 10px;
  position: relative;
  color: #F44336;
  border-bottom: 1px solid rgb(150,150,150);
  text-align: center;
  &:hover ${MaxTempTip} {
    visibility: visible;
  }
`;
