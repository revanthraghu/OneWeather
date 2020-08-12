import React from 'react'
import styled from 'styled-components'
import { Component } from 'react'


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
    background: black;
    opacity: 0.8;
`;

const Day = styled.td`
    padding: 10px;
`;

const Weather = styled.td`
    padding: 10px;
    `;

const MaxTemp = styled.td`
    padding: 10px;
    color: rgb(255,30,0);
`;

const Perception = styled.td`
    position: relative;
    padding: 10px;
    &:hover ${Tooltip}{
        visibility: visible;
    }
`;
const MinTemp = styled.td`
    padding: 10px;
    color: rgb(0,100,255);
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

    render(){
        const {data} = this.props;
        console.log(data)
        

        let mainWeather = data[0].weather[0].main
        console.log(mainWeather)
        
        let percep = data[0].pop
        console.log(percep*100+'%')
        
        let maxTemp = data[0].temp.max
        console.log(maxTemp)//&#8451
        
        let minTemp = data[0].temp.min
        console.log(minTemp)

        return(
            <div style={{fontSize:'25px',color:'white',position:'absolute', top:'600px',left:'200px'}}>
                <Table>
                    <tbody>
                        {data.map(e=>(
                            <tr key={e.dt}>
                                <Day>{this.findDay(e.dt)}</Day>

                                <Weather>
                                    {e.weather[0].main}
                                </Weather>
                                
                                <Perception>
                                    {this.findPop(e.pop*100)}
                                    <Tooltip>Perception</Tooltip>
                                </Perception>
                                
                                <MaxTemp>
                                    {e.temp.max}&deg;
                                    {/* <MaxTempTip>Max. Temp</MaxTempTip> */}
                                </MaxTemp>
                                
                                <MinTemp>
                                    {e.temp.min}&deg;
                                </MinTemp>


                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}