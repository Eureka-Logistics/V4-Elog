import React, { useEffect, useRef } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import ApiGoogleMap from "../../../Api/ApigoogleMap";
import icontruck from "../../../assets/img/Truck (1).png";

const mapStyles = {
  width: '100%',
  height: '100%'
};

const MapContainer = ({ google }) => {
  const mapRef = useRef(null);

  const waypoints = [
    { lat: -6.3213622, lng: 106.8705039, label: 'Muat 1'},
    { lat: -6.192222, lng: 106.822500, label: 'Bongkar 3'},
    { lat: -6.135433, lng: 106.809865, label: 'Bongkar 2'}
  ];

  useEffect(() => {
    if (mapRef.current && waypoints) {
      const { map } = mapRef.current;
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "blue",
        },
      });
      directionsRenderer.setMap(map);

      const route = {
        origin: waypoints[0],
        destination: waypoints[waypoints.length - 1],
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
  }, [waypoints, google]);

  return (
    <Map
      ref={mapRef}
      google={google}
      zoom={14}
      style={mapStyles}
      initialCenter={waypoints[0]}
    >
      {waypoints.map((waypoint, index) => (
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
      ))}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: ApiGoogleMap
})(MapContainer);
