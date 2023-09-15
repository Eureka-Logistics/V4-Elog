import { Card, Input, AutoComplete } from 'antd'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import MapContainer from './Test'
// import GoogleMaps from './Testgooglemap'
import ApiGoogleMap from "../../../Api/ApigoogleMap"
import axios from 'axios'
function DriverMap() {
  const [showDriverTable, setShowDriverTable] = useState(true)
  const [showOrderDriver, setShowOrderDriver] = useState(true)
  const [options, setOptions] = useState([]);
  const [InputAlamat, setInputAlamat] = useState("");
  const [locations, setLocations] = useState([]);
  const [waypoints, setWaypoints] = useState([
    { lat: -6.321362199999999, lng: 106.8705039 }
  ]);

  const driverData = [
    { id: 1, status: "Online", driver: "Driver 1", contact: "1234567890", location: "Location 1", date: "2023-05-21", update: "2023-05-21" },
    { id: 2, status: "Offline", driver: "Driver 2", contact: "0987654321", location: "Location 2", date: "2023-05-21", update: "2023-05-21" },
    { id: 3, status: "Offline", driver: "Driver 3", contact: "0987654321", location: "Location 2", date: "2023-05-21", update: "2023-05-21" }
  ]

  const searchAddress = async (query) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${ApiGoogleMap}`);
      if (response.data.status === "OK") {
        const addresses = response.data.results.map((result) => ({
          address: result.formatted_address,
          location: result.geometry.location
        }));
        setLocations(addresses);
        const formattedOptions = addresses.map((addr) => ({ value: addr.address }));
        setOptions(formattedOptions);
      }
    } catch (error) {
      console.error("Failed to search address:", error);
    }
  };

  useEffect(() => {
    searchAddress(InputAlamat);
  }, [InputAlamat]);

  const handleSelect = (value) => {
    setInputAlamat(value);
    const selectedLocation = locations.find(loc => loc.address === value);
    if (selectedLocation) {
      const { lat, lng } = selectedLocation.location;
      console.log("Latitude:", lat, "Longitude:", lng);
      setWaypoints(prevWaypoints => [...prevWaypoints, { lat, lng }]);
    }
  }

  return (
    <div>
      <Row>
        {/* <GoogleMaps lat={59.95} lng={30.33} /> */}
        <Card>
          <Col sm={8}>
            <AutoComplete
              options={options}
              style={{ width: "100%" }}
              onSelect={handleSelect}
              onSearch={(value) => setInputAlamat(value)}
              placeholder="Cari Alamat"
            />

          </Col>

          <br />
          <Col>
            <Card>
              <div style={{ height: "700px", width: "100%", contain: "content" }} className='d-flex justify-content-start'><MapContainer waypoints={waypoints} /></div>
            </Card>
            <Button size='sm' onClick={() => setShowDriverTable(!showDriverTable)}>
              Driver Location
            </Button>
            {showDriverTable && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Status</th>
                    <th>Driver</th>
                    <th>Contact</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {driverData.map((data) => (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.status}</td>
                      <td>{data.driver}</td>
                      <td>{data.contact}</td>
                      <td>{data.location}</td>
                      <td>{data.date}</td>
                      <td>{data.update}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <br />
            <Button size='sm' onClick={() => setShowOrderDriver(!showOrderDriver)}>
              Order Driver
            </Button>
            {showOrderDriver && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Driver</th>
                    <th>Keterangan</th>
                    <th>Custumer</th>
                    <th>Tujuan</th>
                    <th>Date Update</th>
                  </tr>
                </thead>
                <tbody>
                  {driverData.map((data) => (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.driver}</td>
                      <td>{data.contact}</td>
                      <td>{data.date}</td>
                      <td>{data.location}</td>
                      <td>{data.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Card>
      </Row>
    </div>
  )
}

export default DriverMap
