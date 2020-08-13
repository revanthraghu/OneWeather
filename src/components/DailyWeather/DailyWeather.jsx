import React from 'react'
import styled from 'styled-components'
import { Component } from 'react'
import { MinTemp } from './MinTemp';
import { Perception } from './Perception';
import { MaxTemp } from './MaxTemp';
import { Weather } from './Weather';
import { Day } from './Day';
import { Table } from './Table';
import { MinTempTip } from './MinTempTip';
import { Tooltip } from './Tooltip';
import { MaxTempTip } from './MaxTempTip';

const Row = styled.tr`
    &:hover{
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
`;

export default class DailyWeather extends Component{

    constructor(props){
        super(props);

        this.state={
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false
        }

    }
    
    findDay = (x) =>{
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
    }

    findPop = e => {
        return e.toFixed(0)+'%';
    }

    findDateString = e => {
        let date = new Date((e * 1000)).toDateString();
        return date;
    }

    toggleData = e => {
        let temp = e.target.className.split(' ')
        temp = temp[temp.length-1]
        if( temp === '1'){
            this.setState({
                0: !this.state[0],
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: false
            })
        }
        else if(temp === '2'){
            this.setState({
                1: !this.state[1],
                0: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: false
            })
        }
        else if(temp === '3'){
            this.setState({
                2: !this.state[2],
                1: false,
                0: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: false
            })
        }
        else if(temp === '4'){
            this.setState({
                3: !this.state[3],
                1: false,
                0: false,
                2: false,
                4: false,
                5: false,
                6: false,
                7: false
            })
        }
        else if(temp === '5'){
            this.setState({
                4: !this.state[4],
                1: false,
                0: false,
                3: false,
                2: false,
                5: false,
                6: false,
                7: false
            })
        }
        else if(temp === '6'){
            this.setState({
                5: !this.state[5],
                1: false,
                0: false,
                3: false,
                4: false,
                2: false,
                6: false,
                7: false
            })
        }
        else if(temp === '7'){
            this.setState({
                6: !this.state[6],
                1: false,
                0: false,
                3: false,
                4: false,
                5: false,
                2: false,
                7: false
            })
        }
        else if(temp === '8'){
            this.setState({
                7: !this.state[7],
                1: false,
                0: false,
                3: false,
                4: false,
                5: false,
                6: false,
                2: false
            })
        }
    }

    render(){
        const {data} = this.props;
        console.log(data)
        
        return(
            <div style={{fontSize:'25px',color:'white',position:'absolute', top:'600px',left:'200px'}}>
                <Table>
                    <tbody>
                        {data.map((e,i)=>(<React.Fragment key={e.dt}>
                            <Row onClick={this.toggleData}>
                                <Day className={i+1}>{this.findDay(e.dt)}</Day>

                                <Weather className={i+1}>
                                    {e.weather[0].main}
                                </Weather>
                                
                                <Perception className={i+1}>
                                    {this.findPop(e.pop*100)}
                                    <Tooltip>Perception</Tooltip>
                                </Perception>
                                
                                <MaxTemp className={i+1}>
                                    {e.temp.max}&deg;
                                    <MaxTempTip>Max. Temp</MaxTempTip>
                                </MaxTemp>
                                
                                <MinTemp className={i+1}>
                                    {e.temp.min}&deg;
                                    <MinTempTip>Min. Temp</MinTempTip>
                                </MinTemp>
                            </Row>
                            {this.state[i] && 
                            
                                // <table>

                                <SecondRow>
                                    <Col1>
                                      {this.findDateString(e.dt)}
                                    </Col1>
                                    <td style={{padding:'10px'}}>
                                        <div>Weather: {e.weather[0].description.toUpperCase()}</div>
                                        <div>Cloud: {`${e.clouds}%`}</div>
                                        <div>Dew-point: {`${e.dew_point}`}&deg;</div>
                                        <div>Humidity: {`${e.humidity}%`}</div>
                                        {e.rain && <div>Rain: {`${e.rain}mm`}</div>}
                                        {e.snow && <div>Snow: {`${e.snow}mm`}</div>}
                                    </td>
                                    <td style={{padding: '10px',background:'yellow'}}>
                                        <div style={{color:'red'}}><u>Actual Temp</u></div>
                                        <div>Morning: {e.temp.morn}&deg;</div>
                                        <div>Day: {e.temp.day}&deg;</div>
                                        <div>Evening: {e.temp.eve}&deg;</div>
                                        <div>Night: {e.temp.night}&deg;</div>
                                    </td>
                                    <td style={{padding: '10px',background:'yellow'}}>
                                        <div style={{color:'red'}}><u>Feels like</u></div>
                                        <div>Morning: {e.feels_like.morn}&deg;</div>
                                        <div>Day: {e.feels_like.day}&deg;</div>
                                        <div>Evening: {e.feels_like.eve}&deg;</div>
                                        <div>Night: {e.feels_like.night}&deg;</div>
                                    </td>
                                    <td style={{padding: '10px'}}>
                                        <div>Sun Rise: {new Date(e.sunrise*1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
                                        <div>Sun Set: {new Date(e.sunset*1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
                                        <div>Midday UV Index: {e.uvi}</div>
                                        <div>Pressure: {e.pressure} hPa</div>
                                        <div>Wind Degree: {e.wind_deg}&deg;</div>
                                        <div>Wind Speed: {e.wind_speed}m/s</div>
                                    </td>
                                    
                                </SecondRow>
                                

                            
                            } 

                            </React.Fragment>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}