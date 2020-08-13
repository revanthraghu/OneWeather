import React from 'react'
import styled from 'styled-components'
import { Component } from 'react'
import HourlyWeather from './HourlyWeather'

const Tooltip = styled.span`
    visibility: hidden;
    width: 80px;
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
    &::after{
        content: " ";
        position: absolute;
        top: 100%; 
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: white transparent transparent transparent;
    }
`;


const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 10px;
`;

const Day = styled.td`
    padding: 10px;
    border-bottom: 1px solid rgb(150,150,150);
`;

const Weather = styled.td`
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(150,150,150);
    `;

const MaxTemp = styled.td`
    padding: 10px;
    color: #F44336;
    border-bottom: 1px solid rgb(150,150,150);
    text-align: center;
`;

const Perception = styled.td`
    position: relative;
    padding: 10px;
    border-bottom: 1px solid rgb(150,150,150);
    text-align: center;
    &:hover ${Tooltip}{
        visibility: visible;
    }
`;
const MinTemp = styled.td`
    padding: 10px;
    color: #65a4f1;
    border-bottom: 1px solid rgb(150,150,150);
    text-align: center;
`;


export default class DailyWeather extends Component{
    
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

    setIcon = (name) => {
        if(name === 'Thunderstorm') {
            return 'thunderstorm.png'
        }
        else if(name === 'Drizzle') {
            return 'drizzle.png'
        }
        else if(name === 'Rain') {
            return 'rain.png'
        }
        else if(name === 'Snow') {
            return 'snow.png'
        }
        else if(name === 'Clear') {
            return 'clear.png'
        }
        else if(name === 'Clouds') {
            return 'cloud.png'
        }
        else {
            return 'haze.png'
        }
    }

    render(){
        const {data, hourly} = this.props;        

        return(
            <div style={{fontFamily: 'sans-serif', fontSize:'1.2rem',color:'white', position: 'relative', minHeight: '600px'}}>
                <div style={{flexDirection: 'column', alignItems: 'center', display: 'flex', padding: '10px 20px 0px 20px', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '4px', position: 'absolute', right: '270px', width: '557.767px'}}>
                <div style={{borderBottom: '2px solid white', padding: '5px', width: '100%'}}>Forecast</div>
                    <HourlyWeather hourly={hourly}/>
                    <Table>
                    <tbody style={{padding: '20px'}}>
                        {data.map(e=>(
                            <tr key={e.dt}>
                                <Day>{this.findDay(e.dt)}</Day>

                                <Weather>
                                    <img style={{height: '32px', width: '32px'}} src={this.setIcon(e.weather[0].main)} alt=""/>
                                </Weather>
                                
                                <Perception>
                                    {this.findPop(e.pop*100)}
                                    <Tooltip>Perception</Tooltip>
                                </Perception>
                                
                                <MaxTemp>
                                    {Math.round(e.temp.max)}&deg;
                                </MaxTemp>
                                
                                <MinTemp>
                                    {Math.round(e.temp.min)}&deg;
                                </MinTemp>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </div>
            </div>
        );
    }
}