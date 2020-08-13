import styled from "styled-components";
import { MaxTempTip } from "./MaxTempTip";
export const MaxTemp = styled.td`
  padding: 10px;
  color: rgb(255, 30, 0);
  border-bottom: 1px solid #ddd;
  position: relative;
  &:hover ${MaxTempTip} {
    visibility: visible;
  }
`;
