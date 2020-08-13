import styled from "styled-components";
import { WeatherTip } from "./WeatherTip";

export const Weather = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  align-items: center;
  border-bottom: 1px solid rgb(150,150,150);
  position: relative;
  &:hover ${WeatherTip} {
    visibility: visible;
  }
`;
