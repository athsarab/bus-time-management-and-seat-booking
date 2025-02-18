import React from "react";
import { ClassNames } from "@emotion/react";

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            userAddress: null
        };
        this.getLocation = this.getLocation.bind(this);
        this.handleLocationError = this.handleLocationError.bind(this);
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    getCoordinates = (position) => {
        console.log(position.coords.latitude);
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

        this.getAddress(position.coords.latitude, position.coords.longitude);
    }

    handleLocationError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
            default:
                alert("An unknown error occurred.");
        }
    }

    getAddress = async (latitude, longitude) => {
     
       // Note: This example requires that you consent to location sharing when
       // prompted by your browser. If you see the error "The Geolocation service
       // failed.", it means you probably did not give permission for the browser to
       // locate you.
       let map, infoWindow;
       
       function initMap() {
         map = new google.maps.Map(document.getElementById("map"), {
           center: { lat: -34.397, lng: 150.644 },
           zoom: 6,
         });
         infoWindow = new google.maps.InfoWindow();
       
         const locationButton = document.createElement("button");
       
         locationButton.textContent = "Pan to Current Location";
         locationButton.classList.add("custom-map-control-button");
         map.controls[google.maps.ControlPosition.TOP_CENTER].push(
           locationButton
         );
         locationButton.addEventListener("click", () => {
           // Try HTML5 geolocation.
           if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(
               (position) => {
                 const pos = {
                   lat: position.coords.latitude,
                   lng: position.coords.longitude,
                 };
       
                 infoWindow.setPosition(pos);
                 infoWindow.setContent("Location found.");
                 infoWindow.open(map);
                 map.setCenter(pos);
               },
               () => {
                 handleLocationError(true, infoWindow, map.getCenter());
               }
             );
           } else {
             // Browser doesn't support Geolocation
             handleLocationError(false, infoWindow, map.getCenter());
           }
         });
       }
       
       function handleLocationError(browserHasGeolocation, infoWindow, pos) {
         infoWindow.setPosition(pos);
         infoWindow.setContent(
           browserHasGeolocation
             ? "Error: The Geolocation service failed."
             : "Error: Your browser doesn't support geolocation."
         );
         infoWindow.open(map);
       }
       
       window.initMap = initMap; // Replace with your Google Maps API key
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.results && data.results[0]) {
                this.setState({
                    userAddress: data.results[0].formatted_address
                });
            } else {
                this.setState({
                    userAddress: 'Address not found'
                });
            }
        } catch (error) {
            console.error('Error fetching address:', error);
            this.setState({
                userAddress: 'Error fetching address'
            });
        }
    }

    render() {
        return (
            <div className="map">
                <h2>React Map Example</h2>
                <button onClick={this.getLocation}>Get Coording</button>
                <h4>HTML 5</h4>
                <p>Latitude: {this.state.latitude}</p>
                <p>Longitude: {this.state.longitude}</p>
                <h4>Google Map</h4>
                <p>Address: {this.state.userAddress}</p>
            </div>
        );
    }
}

export default Map;
