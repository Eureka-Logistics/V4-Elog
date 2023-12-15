import axios from 'axios';
import ApiGoogleMap from './ApigoogleMap';
import useCoordinateRaceMap from '../zustand/Store/coordinateMapRace/RaceMaps';

export const getCoordinates = async (address) => {
  try {
    // const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${ApiGoogleMap}`);
    const response = await axios.get(`https://stagingapi.eurekalogistics.co.id/monitoring/get-latlong?address=${encodeURIComponent(address)}`);
    if (response.data.status === "OK") {
      console.log(`dari function ubah long lat`,response.data.results[0]?.geometry?.location);
      useCoordinateRaceMap.setState({ lattitudemap: response.data.results[0]?.geometry?.location.lat, longtitudemap: response.data.results[0]?.geometry?.location.lng })
      return response?.data?.results[0].geometry.location;
    } else {
      throw new Error("Failed to get coordinates");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function JadikanNamaJalan(latitude, longitude) {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${ApiGoogleMap}`);
  const data = await response.json();
  console.log(`data alamat`, data);
  if (data.status === "OK") {
    useCoordinateRaceMap.setState({ AlamatDetailCustomer: data.results[0].formatted_address })
    return data.results[0].formatted_address;
  } else {
    throw new Error("Failed to retrieve address");
  }
}