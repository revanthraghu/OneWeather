import React from 'react'
import axios from 'axios'

class CurrentWeather extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: '',
            search: false,
            input: '',
            country: '',
            time: '',
            tempdt: this.props.weather.dt
        }
    }

    componentDidMount() {
        try {
            axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${this.props.coords[0]}+${this.props.coords[1]}&key=1c6911666853447eac0030866cf19765`)
            .then(res => {
                this.setState({location: res.data.results[0].components.city || res.data.results[0].components.state_district, country: res.data.results[0].components.country})})
        } catch (error) {
            console.log(error)
        }

        this.intervalID = setInterval(
            () => this.tick(this.state.tempdt),
            1000
          )
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick = (e) => {
        let res = new Date(e*1000).toDateString() + ', ' + new Date(e*1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
        this.setState({ 
          time: res,
          tempdt: this.state.tempdt+1
        })
    }

    setIcon = () => {
        let name = this.props.weather.weather[0].main
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

    handleClick = (e) => {
        this.setState(prevState=> {return {search: !prevState.search}})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let lat = '', lon = ''
        axios({
            method: 'GET',
            url: 'https://api.opencagedata.com/geocode/v1/json',
            params: {q: this.state.input, key: '1c6911666853447eac0030866cf19765'}
        })
        .then(res => {
            lat = res.data.results[0].geometry.lat
            lon = res.data.results[0].geometry.lng
            try {
                axios({
                  method: 'GET',
                  baseURL: 'https://api.openweathermap.org/data/2.5',
                  url: '/onecall',
                  params: { 
                    lat: lat, 
                    lon: lon,
                    exclude: 'minutely',
                    units: 'metric',
                    appid: process.env.REACT_APP_MY_SECRET_KEY
                  }
                })
                .then(res => {
                    try {
                        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=1c6911666853447eac0030866cf19765`)
                        .then(res => {
                            this.setState({location: res.data.results[0].components.city || res.data.results[0].components.state_district, country: res.data.results[0].components.country})})
                    } catch (error) {
                        console.log(error)
                    }
                    return res
                })
                .then(res => {
                    this.props.saveData(res.data, lat, lon)
                })
              } catch (error) {
                console.log(error)
              }
        })
        .catch(err => console.log(err))
    }

    handleChange = (e) => {
        this.setState({input: e.target.value})
    }

    render() {
        return (
            <React.Fragment>
                <div style={{textShadow: '1px 1px 1px black', fontFamily: 'sans-serif', color: 'white', zIndex: '1', width: '50%', padding: '30px', paddingLeft: '100px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '390px'}}>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '120px'}}>
                            <div style={{fontWeight: 'bold', fontSize: '4rem', position: "relative"}}>
                                {this.state.location}
                                <span style={{marginLeft: '15px'}}>
                                    <button onClick={this.handleClick} style={{position: 'absolute', top: '20px', fontSize: '25px', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px'}}><i className="fas fa-search"></i></button>
                                    <span style={{boxShadow: '0px 5px 10px 1px rgba(0,0,0,0.5)', borderRadius: '4px', border: '1px solid rgb(200,200,200)', backgroundColor: 'white', padding: '20px', position: 'absolute', bottom: '-70px', right: '70px', display: this.state.search === true ? 'block' : 'none'}}>
                                        <form style={{display: 'flex', alignItems: 'center'}} onSubmit={this.handleSubmit}>
                                            <input onChange={this.handleChange} value={this.state.input} type="text" placeholder="Enter city name" />
                                        </form>
                                    </span>
                                </span>
                            </div>
                            <div style={{fontSize: '1.5rem', marginBottom: '1rem'}}>{this.state.country}</div>
                            <div style={{fontSize: '1.2rem'}}>{this.state.time}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '180px'}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <img style={{height: '32px', width: '32px', marginRight: '15px'}} src={this.setIcon()} alt=""/>
                                <div style={{fontSize: '1.3rem'}}>{this.props.weather.weather[0].description[0].toUpperCase() + this.props.weather.weather[0].description.slice(1)}</div>
                            </div>
                            <div style={{color: 'white', fontSize: '1.2rem'}}>
                                <i style={{color:'#F44336'}} className="fas fa-arrow-up"></i>
                                <span style={{padding: '0 15px'}}>{Math.round(this.props.temps[1])}&deg;</span>
                                <i style={{color:'#65a4f1'}} className="fas fa-arrow-down"></i>
                                <span style={{padding: '0 15px'}}>{Math.round(this.props.temps[0])}&deg;</span>
                            </div>
                            <div>
                                <span style={{fontSize: '5.5rem', fontWeight: 'bold'}}>{Math.round(this.props.weather.temp)}&deg;</span>
                                <span style={{fontSize: '3rem', fontWeight: 'bold'}}>C</span>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CurrentWeather