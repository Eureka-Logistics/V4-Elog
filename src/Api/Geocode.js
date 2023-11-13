import axios from 'axios';
import ApiGoogleMap from './ApigoogleMap';

export const getCoordinates = async (address) => {
  try {
    // const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${ApiGoogleMap}`);
    const response = await axios.get(`https://stagingapi.eurekalogistics.co.id/monitoring/get-latlong?address=${encodeURIComponent(address)}`);
    if (response.data.status === "OK") {
      // console.log(response.data.results[0]?.geometry?.location);
      return response?.data?.results[0].geometry.location;
    } else {
      throw new Error("Failed to get coordinates");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
