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
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Button } from 'antd';

export class MapContainer extends Component {
  componentDidMount() {
    this.renderDirections();
  }

  renderDirections() {
    const { google } = this.props;
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(this.map.map);

    const origin = { lat: -6.325103, lng: 106.8651844 }; /// gor ciracas
    const destination = { lat: -6.3302836, lng: 106.8707228 }; /// Pasar Jaya Ciracas
    const waypoint1 = { location: { lat: -6.3210439, lng: 106.8703552 } }; /// Gang Asem No.7
    const waypoint2 = { location: { lat: -6.3281276, lng: 106.8655332 } }; /// KFC Ciracas
    // const waypoint3 = { location: { lat: -6.3225555, lng: 106.8688888 } };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: [waypoint1, waypoint2],
        optimizeWaypoints: true, // ini akan mengoptimalkan urutan untuk jarak terpendek, opsional
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

    
    const origin = { lat: destinasi[0].lat, lng: destinasi[0].lng };
    const destination = { lat: destinasi[0].lat, lng: destinasi[0].lng  };
    const waypoint1 = { lat: destinasi[1].lat, lng: destinasi[1].lng  };
    const waypoint2 = { lat: destinasi[2].lat, lng: destinasi[2].lng  };
    
    console.log(`origin`,origin);


    const data = `https://www.google.com/maps/dir/${origin.lat},${origin.lng}/${waypoint1.lat},${waypoint1.lng}/${waypoint2.lat},${waypoint2.lng}/${destination.lat},${destination.lng}/`
    const link = () => {

    }
    return (
      <>
        <Button color='danger' href={data} target="_blank" rel="noopener noreferrer" onClick={link} >Ambil Link</Button>
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
})(MapContainer);
