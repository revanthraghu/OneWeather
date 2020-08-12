import React from 'react'
import styled from 'styled-components'
import { Component } from 'react'

export default class DailyWeather extends Component{

    render(){
        const {data} = this.props;
        console.log(data)
        let date = new Date(data[0].dt * 1000);

        let weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        let n = weekday[date.getDay()];
        console.log(n)

        let mainWeather = data[0].weather[0].main
        console.log(mainWeather)
        
        let percep = data[0].pop
        console.log(percep*100+'%')
        
        let maxTemp = data[0].temp.max
        console.log(maxTemp)//&#8451
        
        let minTemp = data[0].temp.min
        console.log(minTemp)

        return(
            <div>
                <div style={{fontSize:'25px',color:'white',position:'absolute', top:'20px'}}>12</div>
            </div>
        );
    }
}