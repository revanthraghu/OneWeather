import styled from "styled-components";
import { Tooltip } from "./Tooltip";
export const Perception = styled.td`
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  &:hover ${Tooltip} {
    visibility: visible;
  }
`;
