//http://openweathermap.org/img/wn/10d@2x.png
import React from 'react'
import axios from 'axios'
import DailyWeather from './DailyWeather/DailyWeather'

class CurrentWeather extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: 'Bengaluru'
        }
    }

    handleChange = (e) => {
        this.setState({location: e.target.value})
    }

    componentDidMount() {
        // try {
        //     axios.get('http://ip-api.com/json/').then(res => this.setState({location: res.data.city}))
        // } catch (error) {
        //     console.log(error)
        // }
    }

    setIcon = () => {
        let name = this.props.weather.current.weather[0].main
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

    render() {
        const {current, daily, hourly}  = this.props.weather
        return (
            <React.Fragment>
                <div style={{fontFamily: 'sans-serif', color: 'white', zIndex: '1', position: 'fixed', width: '100vw', padding: '30px', paddingLeft: '100px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '400px'}}>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '120px'}}>
                            <div style={{fontWeight: 'bold', fontSize: '4rem'}}>{this.state.location}</div>
                            <div style={{fontSize: '1.2rem'}}>{new Date(current.dt*1000).toDateString() + ', ' + new Date(current.dt*1000).toLocaleTimeString()}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '180px'}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <img style={{height: '32px', width: '32px', marginRight: '15px'}} src={this.setIcon()} alt=""/>
                                <div style={{fontSize: '1.3rem'}}>{current.weather[0].description[0].toUpperCase() + current.weather[0].description.slice(1)}</div>
                            </div>
                            <div style={{color: 'white', fontSize: '1.2rem'}}>
                                <i className="fas fa-arrow-up"></i>
                                <span style={{padding: '0 15px'}}>{Math.round(this.props.temps[1])}&deg;</span>
                                <i className="fas fa-arrow-down"></i>
                                <span style={{padding: '0 15px'}}>{Math.round(this.props.temps[0])}&deg;</span>
                            </div>
                            <div>
                                <span style={{fontSize: '5.5rem', fontWeight: 'bold'}}>{Math.round(current.temp)}&deg;</span>
                                <span style={{fontSize: '3rem', fontWeight: 'bold'}}>C</span>
                            </div>
                        </div>
                    </div>
                </div>
                <DailyWeather data={daily} />
            </React.Fragment>
        )
    }
}

export default CurrentWeather