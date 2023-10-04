<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import ApiGoogleMap from "../../../Api/ApigoogleMap";
import icontruck from "../../../assets/img/Truck (1).png";

const mapStyles = {
  width: '100%',
  height: '100%'
};

const MapContainer = ({ google, style, origin, destination, LokasiTerakhir, waypoints = [] }) => {
  const mapRef = useRef(null);

  // const waypoints = [
  //   { lat: -6.3213622, lng: 106.8705039, label: 'Muat 1'},
  //   { lat: -6.192222, lng: 106.822500, label: 'Bongkar 3'},
  //   { lat: -6.135433, lng: 106.809865, label: 'Bongkar 2'}
  // ];

  useEffect(() => {
    if (mapRef.current && origin && destination) {
      const { map } = mapRef.current;
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "blue",
        },
      });
      directionsRenderer.setMap(map);

      const route = {
        origin: origin || waypoints[0],
        destination: destination || waypoints[waypoints.length - 1],
        waypoints: waypoints.slice(1, -1).map(location => ({ location, stopover: true })),
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      };

      directionsService.route(route, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        }
      });
    }
  }, [waypoints, google, origin, destination]);

  return (
    <Map
      ref={mapRef}
      google={google}
      zoom={14}
      style={style || mapStyles}
      initialCenter={waypoints[0]}
    >
      {/* Ini Marker mobil */}
      <Marker
        key={LokasiTerakhir || origin}
        position={ LokasiTerakhir || origin}
        optimized
        label={destination?.label}
        icon={{
          url: icontruck,
          scaledSize: new google.maps.Size(30, 30)
        }}
      />
      {/* {origin.map((waypoint, index) => (
        <Marker
          key={index}
          position={waypoint}
          optimized
          label={waypoint.label}
          icon={{
            url: icontruck,
            scaledSize: new google.maps.Size(30, 30)
          }}
        />
      ))} */}
    </Map >
  );
}

export default GoogleApiWrapper({
  apiKey: ApiGoogleMap
=======
// import React from 'react'
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import ApiGoogleMap from "../../../Api/ApigoogleMap"

// const containerStyle = {
//   width: '1800px',
//   height: '400px'
// };

// const center = {
//   lat: -6.3207771,
//   lng: 106.8714036
// };

// function MyComponent() {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: ApiGoogleMap
//   })

//   const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     // This is just an example of getting and using the map instance!!! don't just blindly copy!
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);

//     setMap(map)
//   }, [])

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null)
//   }, [])

//   return isLoaded ? (
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={2}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//       >
//         { /* Child components, such as markers, info windows, etc. */ }
//         <></>
//       </GoogleMap>
//   ) : <></>
// }

// export default React.memo(MyComponent)
import React, { Component, useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Button, Input } from 'antd';
import { Col, Row } from 'react-bootstrap';




export class MapContainer extends Component {
  
  componentDidUpdate(prevProps, prevState) {
    
    if (
      prevState.input1 !== this.state.input1 ||
      prevState.inputlong1 !== this.state.inputlong1 ||
      prevState.input2 !== this.state.input2 ||
      prevState.inputlong2 !== this.state.inputlong2 ||
      prevState.input3 !== this.state.input3 ||
      prevState.inputlong3 !== this.state.inputlong3
    ) {
      this.renderDirections();
    }
  }
  constructor(props) {
    const destinasi = [
      {
        name: 'Point A',
        lat: -6.326583,
        lng: 106.866284
      },
      {
        name: 'Point B',
        lat: -6.327491,
        lng: 106.868528
      },
      {
        name: 'Point C',
        lat: -6.328923,
        lng: 106.869822
      },
    ];
    super(props);
    this.state = {
      origin: {},
      destination: {},
      waypoint1: {},
      waypoint2: {},
      input1: destinasi[0].lat,
      inputlong1: destinasi[0].lng,
      input2: destinasi[1].lat,
      inputlong2: destinasi[1].lng,
      input3: destinasi[2].lat,
      inputlong3: destinasi[2].lng,
    };
  }
  handleInputChange1 = (e) => {
    this.setState({ input1: e.target.value });
  };
  handleInputChangelong1 = (e) => {
    this.setState({ inputlong1: e.target.value });
  };

  handleInputChange2 = (e) => {
    this.setState({ input2: e.target.value });
  };
  handleInputChangelong2 = (e) => {
    this.setState({ inputlong2: e.target.value });
  };
  handleInputChange3 = (e) => {
    this.setState({ input3: e.target.value });
  };
  handleInputChangelong3 = (e) => {
    this.setState({ inputlong3: e.target.value });
  };


  renderDirections() {

    const { google } = this.props;
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(this.map.map);
  


    const origin = { lat: parseFloat(this.state.input1), lng: parseFloat(this.state.inputlong1) };
    const destination = { lat: parseFloat(this.state.input1), lng: parseFloat(this.state.inputlong1) };
    const waypoint1 = { location: { lat: parseFloat(this.state.input2), lng: parseFloat(this.state.inputlong2) } };
    const waypoint2 = { location: { lat: parseFloat(this.state.input3), lng: parseFloat(this.state.inputlong3)} };
    this.setState({ origin, destination, waypoint1, waypoint2 });

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: [waypoint1, waypoint2],
        optimizeWaypoints: true,
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
        } else {
          console.error(`Error fetching directions ${response}`);
        }
      }
    );
  }



  render() {

    // const [lat1, setlat1] = useState("")
    // const [lat2, setlat2] = useState("")
    // const [lat3, setlat3] = useState("")
    // const { origin, waypoint1, waypoint2, destination } = this.state;
    const ssss = () => {
      GoogleApiWrapper()
    }

    // const data = `https://www.google.com/maps/dir/${origin.lat},${origin.lng}/${waypoint1.lat},${waypoint1.lng}/${waypoint2.lat},${waypoint2.lng}/${destination.lat},${destination.lng}/`
    return (

      <>
        <Row style={{ paddingBottom: "20px" }}>
          <Col sm={4}>
            <Input placeholder='lat1' onChange={this.handleInputChange1} value={this.state.input1} />
            <Input placeholder='long2' onChange={this.handleInputChangelong1} value={this.state.inputlong1} />
          </Col>
          <Col sm={4}>
            <Input placeholder='lat2' onChange={this.handleInputChange2} value={this.state.input2} />
            <Input placeholder='long2' onChange={this.handleInputChangelong2} value={this.state.inputlong2} />
          </Col>
          <Col sm={4}>
            <Input placeholder='lat3' onChange={this.handleInputChange3} value={this.state.input3} />
            <Input placeholder='long2' onChange={this.handleInputChangelong3} value={this.state.inputlong3} />
          </Col>
        </Row>

        <Button color='danger' onClick={ssss} >Ambil Link</Button>
        <Map
          google={this.props.google}
          zoom={18}
          ref={(map) => {
            this.map = map;
          }}
        // initialCenter={{
        //   lat: -6.3207771,
        //   lng: 106.8714036,
        // }}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={'Current location'}
          // position={{
          //   lat: -6.3207771,
          //   lng: 106.8714036,
          // }}
          />
        </Map>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBTC_hd8vE2VSkhLaz7TCwQxvb5ZXO_uso',
>>>>>>> maya
})(MapContainer);
