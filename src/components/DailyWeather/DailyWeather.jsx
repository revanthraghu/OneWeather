import React from "react";
import styled from "styled-components";
import { Component } from "react";
import { MinTemp } from "./MinTemp";
import { Perception } from "./Perception";
import { MaxTemp } from "./MaxTemp";
import { Weather } from "./Weather";
import { Day } from "./Day";
import { Table } from "./Table";
import { MinTempTip } from "./MinTempTip";
import { Tooltip } from "./Tooltip";
import { MaxTempTip } from "./MaxTempTip";
import HourlyWeather from "./HourlyWeather";
import { WeatherTip } from "./WeatherTip";

const Row = styled.tr`
  &:hover {
    background-color: #303030;
  }
`;

const SecondRow = styled.tr`
  background-color: white;
  color: black;
  font-size: 15px;
`;

const Col1 = styled.td`
  padding: 10px;
  border-bottom: 1px solid rgb(150, 150, 150);
`;

export default class DailyWeather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
        };
    }

    findDay = (x) => {
        let date = new Date(x * 1000);

        let weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        let n = weekday[date.getDay()];
        return n;
    };

    findPop = (e) => {
        return e.toFixed(0) + "%";
    };

    findDateString = (e) => {
        let date = new Date(e * 1000).toDateString({
            timeZone: this.props.timeZone,
        });
        return date;
    };

    toggleData = (e) => {
        let temp = e.target.className.split(" ");
        temp = temp[temp.length - 1];
        if (temp === "1") {
            this.setState({
                0: !this.state[0],
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: false,
            });
        } else if (temp === "2") {
            this.setState({
                1: !this.state[1],
                0: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: false,
            });
        } else if (temp === "3") {
            this.setState({
                2: !this.state[2],
                1: false,
                0: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: false,
            });
        } else if (temp === "4") {
            this.setState({
                3: !this.state[3],
                1: false,
                0: false,
                2: false,
                4: false,
                5: false,
                6: false,
                7: false,
            });
        } else if (temp === "5") {
            this.setState({
                4: !this.state[4],
                1: false,
                0: false,
                3: false,
                2: false,
                5: false,
                6: false,
                7: false,
            });
        } else if (temp === "6") {
            this.setState({
                5: !this.state[5],
                1: false,
                0: false,
                3: false,
                4: false,
                2: false,
                6: false,
                7: false,
            });
        } else if (temp === "7") {
            this.setState({
                6: !this.state[6],
                1: false,
                0: false,
                3: false,
                4: false,
                5: false,
                2: false,
                7: false,
            });
        } else if (temp === "8") {
            this.setState({
                7: !this.state[7],
                1: false,
                0: false,
                3: false,
                4: false,
                5: false,
                6: false,
                2: false,
            });
        }
    };

    setIcon = (name) => {
        if (name === "Thunderstorm") {
            return "thunderstorm.png";
        } else if (name === "Drizzle") {
            return "drizzle.png";
        } else if (name === "Rain") {
            return "rain.png";
        } else if (name === "Snow") {
            return "snow.png";
        } else if (name === "Clear") {
            return "clear.png";
        } else if (name === "Clouds") {
            return "cloud.png";
        } else {
            return "haze.png";
        }
    };

    weatherDescription = (e) => {
        let element = e.split("");
        let temp = element[0].toUpperCase();
        element[0] = temp;
        return element.join("");
    };

    render() {
        const { data, hourly } = this.props;

        return (
            <div
                style={{
                    fontFamily: "sans-serif",
                    fontSize: "1.2rem",
                    color: "white",
                    position: "relative",
                    minHeight: "800px",
                }}
            >
                <div
                    style={{
                        flexDirection: "column",
                        alignItems: "center",
                        display: "flex",
                        padding: "10px 20px 0px 20px",
                        backgroundColor: "rgba(0,0,0,0.6)",
                        borderRadius: "4px",
                        position: "absolute",
                        right: "200px",
                        width: "900px",
                    }}
                >
                    <div
                        style={{
                            borderBottom: "2px solid white",
                            padding: "5px",
                            width: "100%",
                        }}
                    >
                        Forecast
                    </div>
                    <HourlyWeather timeZone={this.props.timeZone} hourly={hourly} />
                    <Table>
                        <tbody style={{ padding: "20px" }}>
                            {data.map((e, i) => (
                                <React.Fragment key={e.dt}>
                                    <Row onClick={this.toggleData}>
                                        <Day className={i + 1}>{this.findDay(e.dt)}</Day>

                                        <Weather className={i + 1}>
                                            <img
                                                style={{ height: "32px", width: "32px" }}
                                                src={this.setIcon(e.weather[0].main)}
                                                alt=""
                                            />
                                            <WeatherTip>{e.weather[0].main}</WeatherTip>
                                        </Weather>

                                        <Perception className={i + 1}>
                                            {this.findPop(e.pop * 100)}
                                            <Tooltip>Precipitation</Tooltip>
                                        </Perception>

                                        <MaxTemp className={i + 1}>
                                            {Math.round(e.temp.max)}&deg;
                                            <MaxTempTip>Max. Temp</MaxTempTip>
                                        </MaxTemp>

                                        <MinTemp className={i + 1}>
                                            {Math.round(e.temp.min)}&deg;
                                            <MinTempTip>Min. Temp</MinTempTip>
                                        </MinTemp>
                                    </Row>
                                    {this.state[i] && (
                                        <SecondRow>
                                            <Col1>
                                                <b>{this.findDateString(e.dt)}</b>
                                            </Col1>
                                            <td style={{ padding: "10px" }}>
                                                <div style={{ paddingBottom: "10px" }}>
                                                    <b>Weather:</b>{" "}
                                                    {this.weatherDescription(e.weather[0].description)}
                                                </div>
                                                <div style={{ paddingBottom: "10px" }}>
                                                    <b>Cloud:</b> {`${e.clouds}%`}
                                                </div>
                                                <div style={{ paddingBottom: "10px" }}>
                                                    <b>Dew-point:</b> {`${e.dew_point}`}&deg;
                                                </div>
                                                {e.rain && (
                                                    <div style={{ paddingBottom: "10px" }}>
                                                        <b>Rain:</b> {`${e.rain}mm`}
                                                    </div>
                                                )}
                                                {e.snow && (
                                                    <div style={{ paddingBottom: "10px" }}>
                                                        <b>Snow:</b> {`${e.snow}mm`}
                                                    </div>
                                                )}
                                                <div>
                                                    <b>Humidity:</b> {`${e.humidity}%`}
                                                </div>
                                            </td>
                                            <td style={{ padding: "10px", background: "yellow" }}>
                                                <div style={{ color: "red", paddingBottom: "5px" }}>
                                                    <u>Actual Temp</u>
                                                </div>
                                                <div style={{ paddingBottom: "10px" }}>
                                                    <b>Morning:</b> {e.temp.morn}&deg;
                                                </div>
                                                <div style={{ paddingBottom: "10px" }}>
                                                    <b>Day:</b> {e.temp.day}&deg;
                                                </div>
                                                <div style={{ paddingBottom: "10px" }}>
                                                    <b>Evening:</b> {e.temp.eve}&deg;
                                                </div>
                                                <div>
                                                    <b>Night:</b> {e.temp.night}&deg;
                                                </div>
                                            </td>
                                            <td style={{ padding: "10px", background: "yellow" }}>
                                                <div style={{ color: "red", paddingBottom: "5px" }}>
                                                    <u>Feels like</u>
                                                </div>
                                                <div style={{ paddingBottom: "10px" }}>
                                                    <b>Morning:</b> {e.feels_like.morn}&deg;
                                                </div>
                                                <div style={{ paddingBottom: "10px" }}>
                                                    <b>Day:</b> {e.feels_like.day}&deg;
                                                </div>
                                                <div style={{ paddingBottom: "10px" }}>
                                                    <b>Evening:</b> {e.feels_like.eve}&deg;
                                                </div>
                                                <div>
                                                    <b>Night:</b> {e.feels_like.night}&deg;
                                                </div>
                                            </td>
                                            <td style={{ padding: "10px" }}>
                                                <div style={{ paddingBottom: "10px" }}>
                                                    <b>Sun Rise:</b>{" "}
                                                    {new Date(
                                                        e.sunrise * 1000
                                                    ).toLocaleTimeString("en-US", {
                                                        timeZone: this.props.timeZone,
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    })}
                                                </div>
                                                <div style={{ paddingBottom: "10px" }}>
                                                    <b>Sun Set:</b>{" "}
                                                    {new Date(e.sunset * 1000).toLocaleTimeString(
                                                        "en-US",
                                                        {
                                                            timeZone: this.props.timeZone,
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        }
                                                    )}
                                                </div>
                                                <div style={{ paddingBottom: "10px" }}>
                                                    <b>UV Index:</b> {e.uvi}
                                                </div>
                                                <div style={{ paddingBottom: "10px" }}>
                                                    <b>Pressure:</b> {e.pressure} hPa
                                                </div>
                                                <div style={{ paddingBottom: "10px" }}>
                                                    <b>Wind Degree:</b> {e.wind_deg}&deg;
                                                </div>
                                                <div>
                                                    <b>Wind Speed:</b> {e.wind_speed}m/s
                                                </div>
                                            </td>
                                        </SecondRow>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}
