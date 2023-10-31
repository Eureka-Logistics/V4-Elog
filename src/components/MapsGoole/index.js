import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import ApiGoogleMap from '../../Api/ApigoogleMap';
import useCoordinateRaceMap from '../../zustand/Store/coordinateMapRace/RaceMaps';

function MapsGoogle({ width, height, AlamatMuatBongkarCoordinate }) {
    const [map, setMap] = React.useState(null);
    const { Coordinate, setJarakDanWaktu, JarakDanWaktu } = useCoordinateRaceMap();
    const [DirectionJalanan, setDirectionJalanan] = useState(null);
    const containerStyle = {
        width: width,
        height: height,
    };

    const center = {
        lat: Coordinate?.AlamatMuat?.lat || -3.745,
        lng: Coordinate?.AlamatMuat?.lng || -38.523,
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: ApiGoogleMap,
    });

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    async function CalculateRoute() {
        if (typeof window.google === 'undefined') {
            console.error('Google Maps API belum terdefinisi. Pastikan Anda telah memasukkan API key yang valid dan memuat script Google Maps API.');
            return;
        }

        const google = window.google;
        const directionService = new google.maps.DirectionsService();
        console.log(`ini ada`);
        try {
            const hasil = await directionService.route({
                origin: {
                    lat: Coordinate?.AlamatMuat?.lat || -3.745,
                    lng: Coordinate?.AlamatMuat?.lng || -38.523,
                },
                destination: {
                    lat: Coordinate?.Bongkar?.lat || -6.3253178,
                    lng: Coordinate?.Bongkar?.lng || 106.8049824,
                },
                travelMode: google.maps.TravelMode.DRIVING,
            });
            setDirectionJalanan(hasil);
            const jarakDanWaktu = {
                jarak: hasil.routes[0].legs[0].distance,
                waktu: hasil.routes[0].legs[0].duration,
            };
            setJarakDanWaktu(jarakDanWaktu);
        } catch (error) {
            console.error('Gagal mendapatkan rute: ', error);
        }
    }

    useEffect(() => {
        CalculateRoute();
    }, [Coordinate]);

    console.log(`DirectionJalanan`, DirectionJalanan);
    console.log(`JarakDanWaktu`, JarakDanWaktu);

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14} onLoad={onLoad} onUnmount={onUnmount}>
            <Marker position={center} />
            {DirectionJalanan && (
                <DirectionsRenderer
                    directions={DirectionJalanan}
                    options={{
                        polylineOptions: {
                            strokeColor: '#1B5EEE', // Warna merah untuk garis rute
                            strokeWeight: 2, // Ketebalan garis
                        },
                    }}
                />
            )}
        </GoogleMap>
    ) : (
        <></>
    );
}
export default MapsGoogle;
