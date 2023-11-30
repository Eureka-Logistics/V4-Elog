import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Form, Row } from 'react-bootstrap';
import ApiGoogleMap from '../../../../../Api/ApigoogleMap';
import { JadikanNamaJalan } from '../../../../../Api/Geocode';
import useCoordinateRaceMap from '../../../../../zustand/Store/coordinateMapRace/RaceMaps';


const defaultCenter = {
    lat: -6.2088,
    lng: 106.8456
};

function ComponentGerakinPosisiMaps({ width, height }) {
    const { AlamatDetailCustomer } = useCoordinateRaceMap();
    const [position, setPosition] = useState(defaultCenter);
    const mapContainerStyle = { height, width };
    const autocompleteInput = useRef(null);
    const [autocomplete, setAutocomplete] = useState(null);

    const onMarkerDragEnd = (event) => {
        const newPos = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        setPosition(newPos);
        useCoordinateRaceMap.setState({
            lattitudemap: newPos?.lat,
            longtitudemap: newPos?.lng
        })
    };

    const handlePlaceSelect = () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            const newPos = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            setPosition(newPos);
            useCoordinateRaceMap.setState({
                lattitudemap: newPos.lat,
                longtitudemap: newPos.lng
            });
        }
    };

  
    useEffect(() => {
        JadikanNamaJalan(position?.lat, position?.lng)
        if (window.google) {
            const autocompleteInstance = new window.google.maps.places.Autocomplete(
                autocompleteInput.current,
                { types: ['geocode'] }
            );
            autocompleteInstance.addListener('place_changed', handlePlaceSelect);
            setAutocomplete(autocompleteInstance);
        }
    }, [position]);
    return (
        <div>
            <Row>
                <Form.Control ref={autocompleteInput} type="text" placeholder="Cari Alamat" className='mb-3' />
                <LoadScript googleMapsApiKey={ApiGoogleMap} libraries={['places']}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={12}
                        center={position}
                    >
                        <Marker
                            position={position}
                            draggable={true}
                            onDragEnd={onMarkerDragEnd}
                        />
                    </GoogleMap>
                </LoadScript>
            </Row>
        </div>
    );
}

export default ComponentGerakinPosisiMaps;
