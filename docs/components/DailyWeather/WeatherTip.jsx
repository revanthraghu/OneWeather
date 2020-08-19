import styled from "styled-components";

export const WeatherTip = styled.span`
  visibility: hidden;
  width: 80px;
  background-color: white;
  color: rgb(0, 100, 255);
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
