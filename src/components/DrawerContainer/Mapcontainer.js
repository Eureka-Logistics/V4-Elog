import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import ApiGoogleMap from '../../Api/ApigoogleMap';
import JarakWaktuStore from '../../zustand/Store/coordinateMapRace/StoreJarakWaktuGooglemap';
import { Table } from 'antd';
import MappingCoordinate from '../../zustand/Store/CoordinateFirebase/MappingCoordinate';
import iconmobil from "../../assets/img/Truck (1).png"
function MapsContainerMapping({ width, height, locations,DataPerClickDrawlMapping }) {
    const [directions, setDirections] = useState(null);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const { Coordinate } = MappingCoordinate()
    const { setJarakWaktu, JarakWaktu } = JarakWaktuStore()
    const containerStyle = {
        width: width,
        height: height,
    };


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: ApiGoogleMap,
    });

    const [mapCenter, setMapCenter] = useState({
        lat: locations[0]?.bongkar?.lat || -3.745, // Fallback jika Coordinate tidak tersedia
        lng: locations[0]?.bongkar?.lng || -38.523,
    });
    const center = {
        lat: Coordinate?.latitude,
        lng: Coordinate?.longitude,
        // lat: Coordinate?.latitude || locations[0]?.bongkar?.lat,
        // lng: Coordinate?.longitude || locations[0]?.bongkar?.lng,
    };
    useEffect(() => {
        if (isLoaded && locations[0]?.bongkar && locations.length > 0) {
            const directionsService = new window.google.maps.DirectionsService();

            directionsService.route({
                origin: new window.google.maps.LatLng(locations[0].bongkar?.lat, locations[0].bongkar?.lng),
                destination: new window.google.maps.LatLng(locations[locations.length - 1].muat?.lat, locations[locations.length - 1].muat?.lng),
                waypoints: locations.slice(0, -1).map(location => ({
                    location: new window.google.maps.LatLng(location?.muat?.lat, location?.muat?.lng),
                    stopover: true,
                })),
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);

                    // Calculate total distance and duration
                    let totalDistance = 0;
                    let totalDuration = 0;
                    const myroute = result.routes[0];

                    for (let i = 0; i < myroute.legs.length; i++) {
                        totalDistance += myroute.legs[i].distance.value;
                        totalDuration += myroute.legs[i].duration.value;
                    }

                    setDistance(totalDistance / 1000); // Convert to kilometers
                    setDuration(totalDuration / 60); // Convert to minutes
                    // setJarakWaktu({
                    //     distance: distance,
                    //     duration: duration
                    // });
                    // JarakWaktuStore.setState({JarakWaktu : totalDistance / 1000})
                } else {
                    console.error(`Error fetching directions ${result}`);
                }
            });
        }
    }, [isLoaded, locations, JarakWaktu, Coordinate]);

    if (!isLoaded) {
        return <div className='d-flex justify-content-center'>Loading Data Map / SJ Belum ada</div>;
    } else if (!directions) {
        return <div className='d-flex justify-content-center'>Loading Data Map / SJ Belum ada</div>;
    } else if (!distance) {
        return <div className='d-flex justify-content-center'>Loading Data Map / SJ Belum ada</div>;
    }

    const datanya = [
        {
            key: '0',
            property: 'Driver',
            value: `${DataPerClickDrawlMapping?.Driver}`, // Assuming distance is in kilometers
        },
        {
            key: '1',
            property: 'Perkiraan Jarak',
            value: `${distance?.toFixed(2)} km`, // Assuming distance is in kilometers
        },
        {
            key: '2',
            property: 'Perkiraan Waktu',
            value: `${Math.floor(duration / 60)} Jam ${Math.floor(duration % 60)} Menit`, // Assuming duration is in minutes
        },
        {
            key: '3',
            property: 'Perkiraan Uang Jalan',
            value: `Rp.${distance * 2500} (Jarak x Per KM (2500))`, // Assuming duration is in minutes
        },
    ];

    const columns = [
        {
            title: 'Desripsi ',
            dataIndex: 'property',
            key: 'property',
        },
        {
            title: 'Nilai',
            dataIndex: 'value',
            key: 'value',
        },

    ];

    console.log(`JarakWaktu`, JarakWaktu);
    return (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={14}
            >
                {/* Marker for the initial 'bongkar' location */}
                {locations[0]?.bongkar && (
                    <Marker position={{ lat: locations[0].bongkar?.lat, lng: locations[0]?.bongkar?.lng }} />
                )}

                {/* Markers for each 'muat' location */}
                {locations.map((loc, index) => (
                    <Marker key={index} position={{ lat: loc?.muat?.lat, lng: loc?.muat?.lng }} />
                ))}

                {/* Render the directions */}
                {directions && (
                    <DirectionsRenderer
                        directions={directions}
                        options={{
                            polylineOptions: {
                                strokeColor: '#739AEE', // Blue color for the route
                                strokeWeight: 3,
                            },
                        }}
                    />
                )}
                <Marker icon={{
                    url: iconmobil,
                    scaledSize: new window.google.maps.Size(30, 30), // Adjust the size here
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(25, 25)
                }} key={Coordinate?.latitude} position={{ lat: Coordinate?.latitude, lng: Coordinate?.longitude }} />

            </GoogleMap>
            <div className='mt-3'>
                <Table columns={columns} dataSource={datanya} pagination={false} />
            </div >
        </>
    );
}

export default MapsContainerMapping;
