import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    overflow: auto;
    padding: 25px 0px 20px 0px;
`

function setIcon(name) {
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

function HourlyWeather(props) {
    return (
        <Wrapper>
            {props.hourly.map((hour, index) => 
            <div key={index} style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', display: 'flex', fontSize: 'small', padding: '0 20px'}}>
                <div style={{width: 'max-content'}}>{new Date(hour.dt*1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}</div>
                <img style={{height: '32px', width: '32px'}} src={setIcon(hour.weather[0].main)} alt=""></img>
                <div>{Math.round(hour.temp)}&deg;</div>
            </div>)}
        </Wrapper>
    )
}

export default HourlyWeather