import React, { useEffect } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import ApiGoogleMap from '../../Api/ApigoogleMap';
import useCoordinateRaceMap from '../../zustand/Store/coordinateMapRace/RaceMaps';


function MapsGoogle({ width, height, AlamatMuatBongkarCoordinate }) {
    const [map, setMap] = React.useState(null)
    const { Coordinate } = useCoordinateRaceMap()
    const containerStyle = {
        width: width,
        height: height
    };

    const center = {
        lat: Coordinate?.AlamatMuat?.lat || -3.745,
        lng: Coordinate?.AlamatMuat?.lng || -38.523
        // lat: AlamatMuatBongkarCoordinate?.AlamatBongkar?.lat === null ? -3.745 : AlamatMuatBongkarCoordinate?.AlamatBongkar?.lat,
        // lng: AlamatMuatBongkarCoordinate?.AlamatBongkar?.lng === null ? -38.523 : AlamatMuatBongkarCoordinate?.AlamatBongkar?.lng
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: ApiGoogleMap
    })


    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    console.log(`AlamatMuatBongkarCoordinate render Coordinate`, Coordinate);
    useEffect(() => {

    }, [Coordinate])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={ center}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker position={center} />
            <></>
        </GoogleMap>
    ) : <></>
}
export default MapsGoogle