import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Row } from 'react-bootstrap';
import ApiGoogleMap from '../../../../../Api/ApigoogleMap';
import { JadikanNamaJalan } from '../../../../../Api/Geocode';
import useCoordinateRaceMap from '../../../../../zustand/Store/coordinateMapRace/RaceMaps';


const defaultCenter = {
    lat: -6.2088,
    lng: 106.8456
};

function ComponentGerakinPosisiMaps({ width, height }) {
    const { AlamatDetailCustomer } = useCoordinateRaceMap()
    console.log(`AlamatDetailCustomer`, AlamatDetailCustomer);
    const [position, setPosition] = useState(defaultCenter);
    const mapContainerStyle = {
        height: height,
        width: width
    };
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
    useEffect(() => {
        JadikanNamaJalan(position?.lat, position?.lng)
    }, [position])
    return (
        <div>
            <Row>
                <LoadScript googleMapsApiKey={ApiGoogleMap}>
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
            {/* <p className='mt-3'>
                {position?.lat}
                <br />
                {position?.lng}
            </p> */}
        </div >
    );
}

export default ComponentGerakinPosisiMaps;
