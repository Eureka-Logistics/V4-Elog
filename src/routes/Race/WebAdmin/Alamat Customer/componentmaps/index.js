import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Form, Row } from 'react-bootstrap';
import ApiGoogleMap from '../../../../../Api/ApigoogleMap';
import { JadikanNamaJalan } from '../../../../../Api/Geocode';
import useCoordinateRaceMap from '../../../../../zustand/Store/coordinateMapRace/RaceMaps';




function ComponentGerakinPosisiMaps({ width, height }) {
    const { setState, lattitudemap, longtitudemap } = useCoordinateRaceMap();
    const defaultCenter = {
        lat: lattitudemap || -6.2139383,
        lng: longtitudemap || 106.6910322
    };
    console.log(`lattitudemap`, lattitudemap);
    const [position, setPosition] = useState(defaultCenter);
    const [mapKey, setMapKey] = useState(Date.now());
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const mapContainerStyle = { height, width };
    const autocompleteInput = useRef(null);
    let autocomplete; // Declare outside useEffect


    const onMarkerDragEnd = (event) => {
        const newPos = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        setPosition(newPos);
        useCoordinateRaceMap.setState({ lattitudemap: newPos.lat, longtitudemap: newPos.lng })
        console.log(`newPos`, newPos);

    };

    useEffect(() => {
        JadikanNamaJalan(position.lat, position.lng);
    }, [position]);

    const handlePlaceSelect = () => {
        const place = autocomplete.getPlace();
        if (place && place.geometry) {
            const newPos = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            console.log(`ini dari pindah`, newPos);
            setPosition(newPos);
            useCoordinateRaceMap.setState({ lattitudemap: newPos.lat, longtitudemap: newPos.lng })

            setMapKey(Date.now());
        }
    };
    console.log(`setState`, setState);
    useEffect(() => {
        if (scriptLoaded && autocompleteInput.current) {
            autocomplete = new window.google.maps.places.Autocomplete(
                autocompleteInput.current,
                { types: ['geocode'] }
            );
            autocomplete.addListener('place_changed', handlePlaceSelect);
        }
    }, [scriptLoaded, autocompleteInput]);
    return (
        <div>
            <Row>
                <Form.Control ref={autocompleteInput} type="text" placeholder="Cari Alamat" style={{width : mapContainerStyle.width}} className='mb-3' />
                <LoadScript
                    googleMapsApiKey={ApiGoogleMap}
                    libraries={['places']}
                    onLoad={() => setScriptLoaded(true)}
                >
                    <GoogleMap
                        key={mapKey}
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
