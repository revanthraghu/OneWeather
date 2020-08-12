//http://openweathermap.org/img/wn/10d@2x.png
import React from 'react'
import styled from 'styled-components'

const VideoContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%; 
    overflow: hidden;
    video {
        min-width: 100%; 
        min-height: 100%; 
        width: auto;
        height: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
`

class CurrentWeather extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <React.Fragment>
                <VideoContainer>
                    <video autoPlay muted loop>
                        <source src='thunderstorm.mp4' type='video/mp4'/> 
                    </video>
                </VideoContainer>
                <div style={{color: 'white', zIndex: '1', position: 'fixed'}}>
                    {this.props.weather.temp}
                </div>
            </React.Fragment>
        )
    }
}

export default CurrentWeather