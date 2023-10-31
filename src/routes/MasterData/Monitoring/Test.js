// import React, { useEffect, useRef } from 'react';
// import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import ApiGoogleMap from "../../../Api/ApigoogleMap";
import icontruck from "../../../assets/img/Truck (1).png";

// const mapStyles = {
//   width: '100%',
//   height: '100%'
// };


// const MapContainer = ({ AlamatMuatBongkarCoordinate, google, style, origin, destination, LokasiTerakhir, waypoints = [] }) => {
//   const mapRef = useRef(null);
//   const defaultCoordinate = { lat: 3.5813783, lng: 98.663944 };
//   const alamtbongkardefault = { lat: -6.3303245, lng: 106.8681503 }
//   const alamatMuat = AlamatMuatBongkarCoordinate?.AlamatMuat || defaultCoordinate;
//   const alamatBongkar = AlamatMuatBongkarCoordinate?.AlamatBongkar || defaultCoordinate;

//   // const waypoints = [
//   //   { lat: -6.3213622, lng: 106.8705039, label: 'Muat 1'},
//   //   { lat: -6.192222, lng: 106.822500, label: 'Bongkar 3'},
//   //   { lat: -6.135433, lng: 106.809865, label: 'Bongkar 2'}
//   // ];

//   useEffect(() => {
//     if (mapRef.current && origin && destination) {
//       const { map } = mapRef.current;
//       const directionsService = new google.maps.DirectionsService();
//       const directionsRenderer = new google.maps.DirectionsRenderer({
//         polylineOptions: {
//           strokeColor: "blue",
//           zIndex: 999
//         },
//       });

//       directionsRenderer.setMap(map);

//       const route = {
//         origin: alamatMuat || defaultCoordinate,
//         destination: alamatBongkar || alamtbongkardefault,
//         optimizeWaypoints: true,
//         // waypoints: [{
//         //   location: { lat: alamatMuat, lng: alamatBongkar }
//         // }]
//       };

//       directionsService.route(route, (result, status) => {
//         if (status === google.maps.DirectionsStatus.OK) {
//           directionsRenderer.setDirections(result);
//         } else {
//           console.error("Failed to get route:", status);
//         }
//       });

//     }
//   }, [waypoints, google, origin, destination]);
//   console.log(`alamatMuat di halaman map`, alamatMuat)
//   return (

//     <Map
//       ref={mapRef}
//       google={google}
//       zoom={14}
//       style={style || mapStyles}
//       initialCenter={alamatMuat}
//     >
//       <Marker
//         key={`${alamatMuat.lat}-${alamatMuat.lng}`}
//         position={alamatMuat}
//         optimized
//         label={"label"}
//         icon={{
//           url: icontruck,
//           scaledSize: new google.maps.Size(30, 30)
//         }}
//       />

//       {/* {AlamatMuatBongkarCoordinate?.AlamatBongkar.map((waypoint, index) => (
//         <Marker
//           key={index}
//           position={waypoint}
//           optimized
//           label={waypoint.label}
//           icon={{
//             url: icontruck,
//             scaledSize: new google.maps.Size(30, 30)
//           }}
//         />
//       ))} */}
//     </Map >
//   );
// }

// export default GoogleApiWrapper({
//   apiKey: ApiGoogleMap
// })(MapContainer);


import React, { useEffect, useRef, useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow, Polyline } from 'google-maps-react';
// import icontruck from "../../Img/AssetsGoogle/map-marker-truck.svg";
// import { ApiKeyGoogle } from '../../../Api/List';
import { Button, Tooltip, message } from 'antd';
const mapStyles = {
  width: '100%',
  height: '100%',
  position: "absolute"
};

const MapContainer = ({AlamatMuatBongkarCoordinate, google, style, origin, KendaraanLong, foto, KendaraanLat, destination, nomosm, ValidasiKendaraanVendor, validasisampaiinvalitdate, LokasiTerakhir, waypoints = [] }) => {
  const mapRef = useRef(null);

  const [estimatedDistance, setEstimatedDistance] = useState('');
  const [estimatedDuration, setEstimatedDuration] = useState('');

  useEffect(() => {
    if (mapRef.current) {
      const { map } = mapRef.current;

      // Rute A ke B
      const directionsServiceAB = new google.maps.DirectionsService();
      const directionsRendererAB = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "#5291F7",
        },
      });

      directionsRendererAB.setMap(map);
      const routeAB = {
        origin: origin,
        destination: { lat: KendaraanLat, lng: KendaraanLong } || LokasiTerakhir,
        travelMode: google.maps.TravelMode.DRIVING,
      };
      directionsServiceAB.route(routeAB, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRendererAB.setDirections(result);
        }
      });

      if (validasisampaiinvalitdate !== "Invalid Date") {
        const directionsServiceAB = new google.maps.DirectionsService();
        const directionsRendererAB = new google.maps.DirectionsRenderer({
          polylineOptions: {
            strokeColor: "blue",
          },
        });
        directionsRendererAB.setMap(map);
        const routeAB = {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING
        };
        directionsServiceAB.route(routeAB, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRendererAB.setDirections(result);
          }
        });
      }

      if (validasisampaiinvalitdate == "Invalid Date") {
        const directionsServiceAB = new google.maps.DirectionsService();
        const directionsRendererAB = new google.maps.DirectionsRenderer({
          polylineOptions: {
            strokeColor: "#5291F7",
          },

        });
        directionsRendererAB.setMap(map);
        const routeAB = {
          origin: origin,
          destination: destination || { lat: KendaraanLat, lng: KendaraanLong },
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: [{
            location: { lat: KendaraanLat, lng: KendaraanLong }
          }]
        };
        directionsServiceAB.route(routeAB, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRendererAB.setDirections(result);


            const distance = result.routes[0].legs[0].distance.text;
            const duration = result.routes[0].legs[0].duration.text;

            setEstimatedDistance(distance);
            setEstimatedDuration(duration);
          }
        });

        const directionsServiceTruck = new google.maps.DirectionsService();
        const directionsRendererTruck = new google.maps.DirectionsRenderer({
          polylineOptions: {
            strokeColor: "blue",
          },
        });
          directionsRendererTruck.setMap(map);
          const routeTruck = {
            origin: {lat:-6.3213622 , lng:106.8705039} ||{ lat: AlamatMuatBongkarCoordinate.AlamatBongkar?.lat, lng: AlamatMuatBongkarCoordinate.AlamatBongkar?.lng }  ,
            destination:{lat:-6.3213622 , lng:106.8705039} || { lat: AlamatMuatBongkarCoordinate.AlamatBongkar?.lat, lng: AlamatMuatBongkarCoordinate.AlamatBongkar?.lng },
            travelMode: google.maps.TravelMode.DRIVING
          };
       
        directionsServiceTruck.route(routeTruck, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRendererTruck.setDirections(result);
          }
        });
      }


      // Rute Truck ke B (Jika ada posisi truck)
      // if (KendaraanLat && KendaraanLong) {
      //   const directionsServiceTruck = new google.maps.DirectionsService();
      //   const directionsRendererTruck = new google.maps.DirectionsRenderer({
      //     polylineOptions: {
      //       strokeColor: "blue",
      //     },
      //   });
      //   directionsRendererTruck.setMap(map);
      //   const routeTruck = {
      //     origin: { lat: KendaraanLat, lng: KendaraanLong },
      //     destination: LokasiTerakhir || destination,
      //     travelMode: google.maps.TravelMode.DRIVING
      //   };
      //   directionsServiceTruck.route(routeTruck, (result, status) => {
      //     if (status === google.maps.DirectionsStatus.OK) {
      //       directionsRendererTruck.setDirections(result);
      //     }
      //   });
      // }
    }
  }, [waypoints, google, origin, destination, KendaraanLat, KendaraanLong, LokasiTerakhir,AlamatMuatBongkarCoordinate.AlamatBongkar?.lat,AlamatMuatBongkarCoordinate.AlamatBongkar?.lng ,AlamatMuatBongkarCoordinate.AlamatBongkar?.lat , AlamatMuatBongkarCoordinate.AlamatBongkar?.lng]);









  // console.log(`ini validasisampaiinvalitdate woi`, AlamatMuatBongkarCoordinate);
  console.log(`ini AlamatMuatBongkarCoordinate.AlamatBongkar?.lat`, AlamatMuatBongkarCoordinate.AlamatBongkar?.lat);
  console.log(`ini AlamatMuatBongkarCoordinate.AlamatBongkar?.lat`, AlamatMuatBongkarCoordinate.AlamatBongkar?.lng);
  return (
    <>
      {/* <div>
        Estimasi Jarak: {estimatedDistance}
        Estimasi Waktu Tempuh: {estimatedDuration}
      </div> */}

      
      <Map
        ref={mapRef}
        google={google}
        zoom={12}
        style={style || mapStyles}
        initialCenter={{ lat: AlamatMuatBongkarCoordinate.AlamatBongkar?.lat, lng: AlamatMuatBongkarCoordinate.AlamatBongkar?.lng}|| {lat:-6.3213622 , lng:106.8705039} }
      >
        {/* Ini Marker mobil */}
        <Marker
          key={validasisampaiinvalitdate && ValidasiKendaraanVendor === null ? LokasiTerakhir : (ValidasiKendaraanVendor === null ? (LokasiTerakhir || origin) : origin)}
          position={
            validasisampaiinvalitdate && ValidasiKendaraanVendor === null
              ? LokasiTerakhir
              : (ValidasiKendaraanVendor
                ? (KendaraanLat && KendaraanLong)
                  ? { lat: KendaraanLat, lng: KendaraanLong }
                  : LokasiTerakhir || origin
                : origin)
          }
          optimized
          icon={{
            url: icontruck,
            scaledSize: new google.maps.Size(35, 35)
          }}
        />




      </Map >
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: ApiGoogleMap
})(MapContainer);
