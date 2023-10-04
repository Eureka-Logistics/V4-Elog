import { Button, Card, Checkbox } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
<<<<<<< HEAD
import CardMappingStoreRace from '../../../../../zustand/Store/DriverMappingCardRace/MappingStore';
function CardMapping({ onAdd }) {
    const { selectedData, addData, removeData } = CardMappingStoreRace();
    const data = [
        {
            "id": "JKT23-007583",
            "status": "Waiting",
            "pelanggan": "PT Mulia Boga Raya TBK",
            "tanggalPickUp": "-",
            "asalMuatan": "Kabupaten Bekasi",
            "tujuanMuatan": "Kabupaten Bandung",
            "kendaraan": "Truk",
            "tonase": "10 Ton"
        },
        {
            "id": "JKT23-007584",
            "status": "In Transit",
            "pelanggan": "PT XYZ Indonesia",
            "tanggalPickUp": "2023-09-26",
            "asalMuatan": "Kabupaten Bogor",
            "tujuanMuatan": "Kabupaten Cirebon",
            "kendaraan": "Truk",
            "tonase": "15 Ton"
        },
        {
            "id": "JKT23-007581",
            "status": "In Transit",
            "pelanggan": "PT XYZ Indonesia",
            "tanggalPickUp": "2023-09-26",
            "asalMuatan": "Kabupaten Bogor",
            "tujuanMuatan": "Kabupaten Cirebon",
            "kendaraan": "Truk",
            "tonase": "15 Ton"
        },
        {
            "id": "JKT23-022581",
            "status": "In Transit",
            "pelanggan": "PT XYZ Indonesia",
            "tanggalPickUp": "2023-09-26",
            "asalMuatan": "Kabupaten Bogor",
            "tujuanMuatan": "Kabupaten Cirebon",
            "kendaraan": "Truk",
            "tonase": "15 Ton"
        }
    ]


    const handleCheckboxChange = (item , e) => {
        console.log(e.target.checked);
        if (selectedData.find(data => data.id === item.id)) {
            removeData(item.id);
        } else {
            addData(item);
        }
        console.log(selectedData);
    }
    return (
        <div>
            {data.map(item => (
                <Card key={item.id} style={{ padding: "0px", borderRadius: "10px" }}>
                    <Row style={{ backgroundColor: "", height: 30 }}>
                        <Col sm={1}>
                            <Checkbox onChange={(e) => {  handleCheckboxChange(item , e) }} style={{ width: 20, height: 20 }} />
                            {/* <Checkbox  style={{ width: 20, height: 20 }} /> */}

                        </Col>
                        <Col>
                            <h4>{item.id}</h4>
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <Button disabled={item.status === "Waiting"} style={{ height: 30, width: 80 }}>
                                {item.status}
                            </Button>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col sm={7}>
                            <p>Pelanggan</p>
                        </Col>
                        <Col className='d-flex justify-content-start' style={{}} sm={5}>
                            <p>Tanggal Pick Up</p>
                        </Col>
                        <Col style={{ marginTop: -15 }} sm={8}>
                            <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.pelanggan}</p>
                        </Col>
                        <Col style={{ marginTop: -15 }} sm={4}>
                            <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.tanggalPickUp}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={3}>
                            <p>Asal Muatan</p>
                        </Col>
                        <Col sm={3} className='d-flex justify-content-start'>
                            <p>Tujuan Muatan</p>
                        </Col>
                        <Col sm={3} className='d-flex justify-content-start'>
                            <p>Kendaraan</p>
                        </Col>
                        <Col sm={3} className='d-flex justify-content-start' style={{}}>
                            <p>Tonase</p>
                        </Col>
                        <Col sm={3} style={{ marginTop: -15 }}>
                            <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.asalMuatan}</p>
                        </Col>
                        <Col sm={3} className='d-flex justify-content-start' style={{ marginTop: -15 }}>
                            <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.tujuanMuatan}</p>
                        </Col>
                        <Col sm={3} className='d-flex justify-content-start' style={{ marginTop: -15 }}>
                            <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.kendaraan}</p>
                        </Col>
                        <Col sm={3} className='d-flex justify-content-start' style={{ marginTop: -15 }}>
                            <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.tonase}</p>
                        </Col>

                    </Row>
                </Card>
            ))}
        </div>
    )
}
=======
function CardMapping() {
    return (
        <div>
            <Card style={{ padding: "0px", borderRadius: "10px" }}>
                <Row style={{ backgroundColor: "", height: 30 }}>
                    <Col sm={1}>
                        <Checkbox style={{ width: 20, height: 20 }} />
                    </Col>
                    <Col>
                        <h4>JKT23-007583</h4>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Button disabled style={{ height: 30, width: 80 }} >Waiting</Button>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col sm={7}>
                        <p>Pelanggan</p>
                    </Col>
                    <Col className='d-flex justify-content-start' style={{}} sm={5}>
                        <p>Tanggal Pick Up</p>
                    </Col>
                    <Col style={{ marginTop: -15 }} sm={8}>
                        <p style={{ fontSize: "16px", fontWeight: "bold" }}>PT Mulia Boga Raya TBK</p>
                    </Col>
                    <Col style={{ marginTop: -15 }} sm={4}>
                        <p style={{ fontSize: "16px", fontWeight: "bold" }}>-</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        <p>Asal Muatan</p>
                    </Col>
                    <Col sm={3} className='d-flex justify-content-start'>
                        <p>Tujuan Muatan</p>
                    </Col>
                    <Col sm={3} className='d-flex justify-content-start'>
                        <p>Kendaraan</p>
                    </Col>
                    <Col sm={3} className='d-flex justify-content-start' style={{}} >
                        <p>Tonase</p>
                    </Col>
                    <Col sm={3} style={{ marginTop: -15 }} >
                        <p style={{ fontSize: "16px", fontWeight: "bold" }}>Kabupaten Bekasi</p>
                    </Col>
                    <Col sm={3} className='d-flex justify-content-start' style={{ marginTop: -15 }} >
                        <p style={{ fontSize: "16px", fontWeight: "bold" }}>Kabupaten </p>
                    </Col>
                    <Col sm={3} className='d-flex justify-content-start' style={{ marginTop: -15 }} >
                        <p style={{ fontSize: "16px", fontWeight: "bold" }}>Kabupaten </p>
                    </Col>
                    <Col sm={3} className='d-flex justify-content-start' style={{ marginTop: -15 }} >
                        <p style={{ fontSize: "16px", fontWeight: "bold" }}>Kabupaten </p>
                    </Col>

                </Row>
            </Card>
        </div>
    )
}

>>>>>>> maya
export default CardMapping