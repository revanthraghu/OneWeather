import React from 'react';
import CurrentWeather from './components/CurrentWeather'
import data from './data/data.json'
import axios from 'axios'
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

  async componentDidMount() {
    //Ask for location permission
    //If location access denied show alert to say access required
    //If access given set lat, lon state and get data
    // try {
    //   await axios({
    //     method: 'GET',
    //     baseURL: 'https://api.openweathermap.org/data/2.5',
    //     url: '/onecall',
    //     params: { 
    //       lat: this.state.lat, 
    //       lon: this.state.lon,
    //       exclude: 'minutely',
    //       units: 'metric',
    //       appid: process.env.REACT_APP_MY_SECRET_KEY
    //     }
    //   }).then(res => this.setState({data: res.data}))
    // } catch (error) {
    //   console.log(error)
    // }
    this.setState({data: data})
  }

  render() {
    if(Object.keys(this.state.data).length === 0) {
      return (
        <div style={{width: '100vw', height: '100vh', backgroundColor: '#311B92'}}>

        </div>
      )
    }
    else {
      return (
        <CurrentWeather weather={this.state.data.current}/>
      );
    }
  }
}

export default App;
