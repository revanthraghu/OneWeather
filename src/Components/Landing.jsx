import React, { Component } from 'react'

export default class Landing extends Component{
    
    constructor(props){
        super(props);

        this.state={
            latitude: '',
            longitude: ''
        }

    }

    componentDidMount(){
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getPosition);
        }
        
    }
    
    getPosition = (position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        console.log(position.coords.latitude, position.coords.longitude);
    }

    render(){
        const {latitude, longitude} = this.state
        return(
            <>
                <div>Latitude: {latitude}</div>
                <div>Longitude: {longitude}</div>
            </>
        );
    }
}