import React from 'react';

import CurrentWeather from './components/CurrentWeather'
import data from './data/data.json'
import axios from 'axios'
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

class App extends React.Component {
  //console.log(process.env.REACT_APP_MY_SECRET_KEY)
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      lat: 28.6667,
      lon: 77.2167
    }
  }

  saveData = (data) => {
    this.setState({data: data})
  }

  getPosition = (position) => {
    //get weather daat from api
    try {
      axios({
        method: 'GET',
        baseURL: 'https://api.openweathermap.org/data/2.5',
        url: '/onecall',
        params: { 
          lat: position.coords.latitude, 
          lon: position.coords.longitude,
          exclude: 'minutely',
          units: 'metric',
          appid: process.env.REACT_APP_MY_SECRET_KEY
        }
      })
      .then(res => this.setState({
        data: res.data, 
        lat: position.coords.latitude, 
        lon: position.coords.longitude
      }))
    } catch (error) {
      console.log(error)
    }
      //temporarily using saved data to avoid extra api calls
      //this.setState({data: data, lat: position.coords.latitude, lon: position.coords.longitude})
  }

  componentDidMount() {
    //Ask for location permission
    //If location access denied show alert to say access required
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getPosition);
    }
  }

  render() {
    if(Object.keys(this.state.data).length === 0) {
      return (
        <div style={{width: '100vw', height: '100vh', backgroundColor: '#311B92'}}></div>
      )
    }
    else {
      return (
        <React.Fragment>
          <VideoContainer>
            <video autoPlay muted loop>
                <source src='thunderstorm.mp4' type='video/mp4'/> 
            </video>
          </VideoContainer>
          <CurrentWeather saveData={this.saveData} weather={this.state.data.current} temps={[this.state.data.daily[0].temp.min, this.state.data.daily[0].temp.max]}/>
        </React.Fragment>
      );
    }
  }
}
export default App;
