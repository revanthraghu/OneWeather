import React from 'react'
import styled from 'styled-components'

const DeatilsWrapper = styled.div`
    color: white;
    width: 70%;
    z-index: 1;
    padding: 10px 20px 0px 20px;
    background-color: rgba(0,0,0,0.5);
    height: max-content;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
`

const Item = styled.div`
    padding: 6px 0px;
    border-bottom: 1px solid rgb(150,150,150);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
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

function Details(props) {
    let name = props.current.weather[0].main
    return (
        <div style={{fontWeight: '500', fontSize: '1.3rem', fontFamily: 'sans-serif', display: 'flex', width: '60%', padding: '60px 30px 30px 0px'}}>
            <DeatilsWrapper>
                <div style={{borderBottom: '2px solid white', padding: '5px'}}>Details</div>
                <div style={{flex: '1', padding: '10px 0px', display: 'flex'}}>
                    <div style={{width: '40%', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                        <img style={{alignSelf: 'center', width: '120px', height: '120px'}} src={setIcon(name)} alt=""/>
                    </div>
                    <div style={{width: '60%'}}>
                        <Item>
                            <div>Feels like</div>
                            <div>{props.current.feels_like}&deg;</div>
                        </Item>
                        <Item>
                            <div>Humidity</div>
                            <div>{props.current.humidity}%</div>
                        </Item>
                        <Item>
                            <div>Visibility</div>
                            <div>{props.current.visibility}m</div>
                        </Item>
                        <Item>
                            <div>UV Index</div>
                            <div>{props.current.uvi}</div>
                        </Item>
                        <Item>
                            <div>Clouds</div>
                            <div>{props.current.clouds}%</div>
                        </Item>
                        <Item>
                            <div>Wind Speed</div>
                            <div>{props.current.wind_speed}m/s</div>
                        </Item>
                        <Item>
                            <div>Wind Direction</div>
                            <div>{props.current.wind_deg}&deg;</div>
                        </Item>
                        <Item>
                            <div>Sunrise</div>
                            <div>{new Date(props.current.sunrise*1000).toLocaleTimeString()}</div>
                        </Item>
                        <Item style={{borderBottom: 'none'}}>
                            <div>Sunset</div>
                            <div>{new Date(props.current.sunset*1000).toLocaleTimeString()}</div>
                        </Item>
                
                    </div>
                </div>
            </DeatilsWrapper>
        </div>
    )
}

export default Details