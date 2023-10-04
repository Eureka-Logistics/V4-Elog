<<<<<<< HEAD
import { Button, Card, Checkbox, Select } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import CardMapping from './CardComponent Mapping/index'
import "./style.css"
import MappingDriverCard from './MaapingDriverCard'
import CardMappingStoreRace from '../../../../zustand/Store/DriverMappingCardRace/MappingStore'
function MapPengiriman() {
    const { selectedData, addData, removeData, drivers,setGabunganData } = CardMappingStoreRace();
    console.log("selectedData", selectedData);
    const handleSelect = (driverId) => {
        const selectedDriver = drivers.find(driver => driver.id === driverId);
        if (selectedDriver) {
            const updatedSelectedData = selectedDriver; // menambahkan selectedDriver sebagai item baru dalam array
            updatedSelectedData.selectedData = [...selectedData]
            setGabunganData(updatedSelectedData)
        }
    };
    return (
        <div>
            <Row>
                <Col sm={6}>
                    <Row>
                        <Col sm={6}>
                            <h4>Mapping Pengiriman</h4>
                        </Col>
                        <Col className="d-flex justify-content-end" sm={6}>
                            <h5 style={{ color: "#5197FF" }}>
                                {selectedData.length === 0 ? "Mapping Otomatis" :
                                    <Select style={{ width: 300 }} placeholder="Select Driver Dan Mapping" onChange={handleSelect}>
                                        {drivers && drivers.map((i) => (
                                            <option key={i.id} value={i.id}>{i.name}</option>
                                        ))}
                                    </Select>}
                            </h5>
                        </Col>
                    </Row>
                    <div className="div-no-scrollbar" style={{ padding: "0px", height: "800px", backgroundColor: "", overflow: "auto" }}>
                        <CardMapping />
                    </div>


                </Col>
                <Col sm={6}>
                    <Card className="div-no-scrollbar" style={{ padding: "0px", height: "800px", backgroundColor: "", overflow: "auto" }} >
                        <Row>
                            <h5>Driver Tersedia</h5>
                            <MappingDriverCard />
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MapPengiriman
=======
    import { Button, Card, Checkbox } from 'antd'
    import React from 'react'
    import { Col, Row } from 'react-bootstrap'
    import CardMapping from './CardComponent Mapping/index'
    import "./style.css"
    function MapPengiriman() {

        const handleCardClick = (id) => {
            console.log(`Card dengan ID ${id} telah diklik`);
        };


        
        return (
            <div>
                <Row>
                    <Col sm={6}>
                        <Row>
                            <Col sm={6}>
                                <h4>Mapping Pengiriman</h4>
                            </Col>
                            <Col className="d-flex justify-content-end" sm={6}>
                                <h5>Mapping Otomatis</h5>
                            </Col>
                        </Row>
                        <div className="div-no-scrollbar" style={{ padding: "0px", height: "800px", backgroundColor: "", overflow: "auto" }}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} onClick={() => handleCardClick(index)}>
                                    <CardMapping />
                                </div>
                            ))}
                        </div>

                        {/* Card Mapping */}
                        {/* End Card Mapping */}
                    </Col>
                    <Col sm={6}>
                        <Card style={{ padding: "0px", height: 800 }}>
                            <Row>
                                <h5>Driver Tersedia</h5>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }

    export default MapPengiriman
>>>>>>> maya
