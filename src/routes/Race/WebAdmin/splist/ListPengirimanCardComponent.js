import { Button, Card } from 'antd'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./style.css"
import map from "../../../../assets/img/peta.png"
import icondriver from "../../../../assets/img/drivericon.png"
import telponicon from "../../../../assets/img/telponicon.png"
import whatsappicon from "../../../../assets/img/whatsappicon.png"
import truck from "../../../../assets/img/Truck Illu 1.png"
import vespa from "../../../../assets/img/vesva.png"

function ListPengiriman({setOpen}) {
    const showDefaultDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

  return (
        <div className='mt-2'>
                <Row >
                    <Col sm={6} >
                        <Card hoverable onClick={() => showDefaultDrawer()} style={{ height: 227 }}>
                            <Container>
                                <Row style={{ marginTop: -10 }}>
                                    <Col sm={10}>
                                        <h3>JKT23-007583</h3>
                                    </Col>
                                    <Col sm={2}>
                                        <Button style={{ backgroundColor: "#dfdfdf", color: "#a2a2a2" }}>Waiting</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <p style={{ marginBottom: "0px" }}>Pelanggan</p>
                                    </Col>
                                    <Col sm={4}>
                                        <p style={{ marginBottom: "0px" }}>Tanggal Pick Up</p>
                                    </Col>
                                    <Col sm={8}>
                                        <p style={{ marginTop: "0px", marginBottom: "0px", fontWeight: "bold" }}>PT Mulia Boga Raya TBK</p>
                                    </Col>
                                    <Col sm={4}>
                                        <p style={{ marginBottom: "20px", fontWeight: "bold" }}>-</p>
                                    </Col>
                                </Row>
                                <Row style={{ backgroundColor: "" }}>
                                    <Col sm={4}>
                                        <Row>
                                            <p style={{ marginBottom: "5px" }}>Asal Muatan</p>
                                        </Row>
                                        <p style={{ marginBottom: "-10px", fontWeight: "bold" }}>Kabupaten Bekasi</p>
                                        <Row >
                                            <p style={{ marginTop: "20px" }}>Kendaraan</p>
                                        </Row>
                                        <Row >
                                            <p style={{ marginTop: "-10px", fontWeight: "bold" }}>Kontainer 40</p>
                                        </Row>
                                    </Col>
                                    <Col sm={6}>
                                        <Row> <p style={{ marginBottom: "5px" }}>Tujuan Muatan</p>
                                        </Row>
                                        <p style={{ marginBottom: "-10px", fontWeight: "bold" }}>Jakarta Selatan</p>
                                        <Row >
                                            <p style={{ marginTop: "20px" }}>Tonase</p>
                                        </Row>
                                        <Row >
                                            <p style={{ marginTop: "-10px", fontWeight: "bold" }}>0</p>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <img src={truck} className='d-flex' style={{ width: "101px", marginTop: "-10px", height: "101px" }}></img></Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                    <Col sm={6} >
                        <Card hoverable onClick={() => showDefaultDrawer()} style={{ height: 227 }}>
                            <Container>
                                <Row style={{ marginTop: -10 }}>
                                    <Col sm={10}>
                                        <h3>JKT23-007583</h3>
                                    </Col>
                                    <Col sm={2}>
                                        <Button style={{ backgroundColor: "#dfdfdf", color: "#a2a2a2" }}>Waiting</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <p style={{ marginBottom: "0px" }}>Pelanggan</p>
                                    </Col>
                                    <Col sm={4}>
                                        <p style={{ marginBottom: "0px" }}>Tanggal Pick Up</p>
                                    </Col>
                                    <Col sm={8}>
                                        <p style={{ marginTop: "0px", marginBottom: "0px", fontWeight: "bold" }}>PT Mulia Boga Raya TBK</p>
                                    </Col>
                                    <Col sm={4}>
                                        <p style={{ marginBottom: "20px", fontWeight: "bold" }}>-</p>
                                    </Col>
                                </Row>
                                <Row style={{ backgroundColor: "" }}>
                                    <Col sm={4}>
                                        <Row>
                                            <p style={{ marginBottom: "5px" }}>Asal Muatan</p>
                                        </Row>
                                        <p style={{ marginBottom: "-10px", fontWeight: "bold" }}>Kabupaten Bekasi</p>
                                        <Row >
                                            <p style={{ marginTop: "20px" }}>Kendaraan</p>
                                        </Row>
                                        <Row >
                                            <p style={{ marginTop: "-10px", fontWeight: "bold" }}>Kontainer 40</p>
                                        </Row>
                                    </Col>
                                    <Col sm={6}>
                                        <Row> <p style={{ marginBottom: "5px" }}>Tujuan Muatan</p>
                                        </Row>
                                        <p style={{ marginBottom: "-10px", fontWeight: "bold" }}>Jakarta Selatan</p>
                                        <Row >
                                            <p style={{ marginTop: "20px" }}>Tonase</p>
                                        </Row>
                                        <Row >
                                            <p style={{ marginTop: "-10px", fontWeight: "bold" }}>0</p>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <img src={vespa} className='d-flex' style={{ width: "101px", marginTop: "-10px", height: "101px" }}></img></Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                </Row>
                <Row >
                    <Col sm={6} >
                        <Card hoverable onClick={() => showDefaultDrawer()} style={{ height: 227 }}>
                            <Container>
                                <Row style={{ marginTop: -10 }}>
                                    <Col sm={10}>
                                        <h3>JKT23-007583</h3>
                                    </Col>
                                    <Col sm={2}>
                                        <Button style={{ backgroundColor: "#d5e2fe", color: "#1a3368" }}>Pick Up</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <p style={{ marginBottom: "0px" }}>Pelanggan</p>
                                    </Col>
                                    <Col sm={4}>
                                        <p style={{ marginBottom: "0px" }}>Tanggal Pick Up</p>
                                    </Col>
                                    <Col sm={8}>
                                        <p style={{ marginTop: "0px", marginBottom: "0px", fontWeight: "bold" }}>PT Mulia Boga Raya TBK</p>
                                    </Col>
                                    <Col sm={4}>
                                        <p style={{ marginBottom: "20px", fontWeight: "bold" }}>2023-07-18 (14:10:30)</p>
                                    </Col>
                                </Row>
                                <Row style={{ backgroundColor: "" }}>
                                    <Col sm={4}>
                                        <Row>
                                            <p style={{ marginBottom: "5px" }}>Asal Muatan</p>
                                        </Row>
                                        <p style={{ marginBottom: "-10px", fontWeight: "bold" }}>Kabupaten Bekasi</p>
                                        <Row >
                                            <p style={{ marginTop: "20px" }}>Kendaraan</p>
                                        </Row>
                                        <Row >
                                            <p style={{ marginTop: "-10px", fontWeight: "bold" }}>Kontainer 40</p>
                                        </Row>
                                    </Col>
                                    <Col sm={6}>
                                        <Row> <p style={{ marginBottom: "5px" }}>Tujuan Muatan</p>
                                        </Row>
                                        <p style={{ marginBottom: "-10px", fontWeight: "bold" }}>Jakarta Selatan</p>
                                        <Row >
                                            <p style={{ marginTop: "20px" }}>Tonase</p>
                                        </Row>
                                        <Row >
                                            <p style={{ marginTop: "-10px", fontWeight: "bold" }}>0</p>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <img src={truck} className='d-flex' style={{ width: "101px", marginTop: "-10px", height: "101px" }}></img></Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                    <Col sm={6} >
                        <Card hoverable onClick={() => showDefaultDrawer()} style={{ height: 227 }}>
                            <Container>
                                <Row style={{ marginTop: -10 }}>
                                    <Col sm={10}>
                                        <h3>JKT23-007583</h3>
                                    </Col>
                                    <Col sm={2}>
                                        <Button style={{ backgroundColor: "#d5e2fe", color: "#1a3368" }}>Pick Up</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <p style={{ marginBottom: "0px" }}>Pelanggan</p>
                                    </Col>
                                    <Col sm={4}>
                                        <p style={{ marginBottom: "0px" }}>Tanggal Pick Up</p>
                                    </Col>
                                    <Col sm={8}>
                                        <p style={{ marginTop: "0px", marginBottom: "0px", fontWeight: "bold" }}>PT Mulia Boga Raya TBK</p>
                                    </Col>
                                    <Col sm={4}>
                                        <p style={{ marginBottom: "20px", fontWeight: "bold" }}>2023-07-18 (13:35:27)</p>
                                    </Col>
                                </Row>
                                <Row style={{ backgroundColor: "" }}>
                                    <Col sm={4}>
                                        <Row>
                                            <p style={{ marginBottom: "5px" }}>Asal Muatan</p>
                                        </Row>
                                        <p style={{ marginBottom: "-10px", fontWeight: "bold" }}>Kabupaten Bekasi</p>
                                        <Row >
                                            <p style={{ marginTop: "20px" }}>Kendaraan</p>
                                        </Row>
                                        <Row >
                                            <p style={{ marginTop: "-10px", fontWeight: "bold" }}>Kontainer 40</p>
                                        </Row>
                                    </Col>
                                    <Col sm={6}>
                                        <Row> <p style={{ marginBottom: "5px" }}>Tujuan Muatan</p>
                                        </Row>
                                        <p style={{ marginBottom: "-10px", fontWeight: "bold" }}>Jakarta Selatan</p>
                                        <Row >
                                            <p style={{ marginTop: "20px" }}>Tonase</p>
                                        </Row>
                                        <Row >
                                            <p style={{ marginTop: "-10px", fontWeight: "bold" }}>0</p>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <img src={vespa} className='d-flex' style={{ width: "101px", marginTop: "-10px", height: "101px" }}></img></Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                </Row>
                <Row >
                    <Col sm={6} >
                        <Card hoverable onClick={() => showDefaultDrawer()} style={{ height: 227 }}>
                            <Container>
                                <Row style={{ marginTop: -10 }}>
                                    <Col sm={10}>
                                        <h3>JKT23-007583</h3>
                                    </Col>
                                    <Col sm={2}>
                                        <Button style={{ backgroundColor: "#fcddd3", color: "#c8461d" }}>Delivery</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <p style={{ marginBottom: "0px" }}>Pelanggan</p>
                                    </Col>
                                    <Col sm={4}>
                                        <p style={{ marginBottom: "0px" }}>Tanggal Pick Up</p>
                                    </Col>
                                    <Col sm={8}>
                                        <p style={{ marginTop: "0px", marginBottom: "0px", fontWeight: "bold" }}>PT Mulia Boga Raya TBK</p>
                                    </Col>
                                    <Col sm={4}>
                                        <p style={{ marginBottom: "20px", fontWeight: "bold" }}>2023-07-18 (10:35:27)</p>
                                    </Col>
                                </Row>
                                <Row style={{ backgroundColor: "" }}>
                                    <Col sm={4}>
                                        <Row>
                                            <p style={{ marginBottom: "5px" }}>Asal Muatan</p>
                                        </Row>
                                        <p style={{ marginBottom: "-10px", fontWeight: "bold" }}>Kabupaten Bekasi</p>
                                        <Row >
                                            <p style={{ marginTop: "20px" }}>Kendaraan</p>
                                        </Row>
                                        <Row >
                                            <p style={{ marginTop: "-10px", fontWeight: "bold" }}>Kontainer 40</p>
                                        </Row>
                                    </Col>
                                    <Col sm={6}>
                                        <Row> <p style={{ marginBottom: "5px" }}>Tujuan Muatan</p>
                                        </Row>
                                        <p style={{ marginBottom: "-10px", fontWeight: "bold" }}>Jakarta Selatan</p>
                                        <Row >
                                            <p style={{ marginTop: "20px" }}>Tonase</p>
                                        </Row>
                                        <Row >
                                            <p style={{ marginTop: "-10px", fontWeight: "bold" }}>0</p>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <img src={truck} className='d-flex' style={{ width: "101px", marginTop: "-10px", height: "101px" }}></img></Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                    <Col sm={6} >
                        <Card hoverable onClick={() => showDefaultDrawer()} style={{ height: 227 }}>
                            <Container>
                                <Row style={{ marginTop: -10 }}>
                                    <Col sm={10}>
                                        <h3>JKT23-007583</h3>
                                    </Col>
                                    <Col sm={2}>
                                        <Button style={{ backgroundColor: "#fff5c1", color: "#b09f04" }}>Unloading</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <p style={{ marginBottom: "0px" }}>Pelanggan</p>
                                    </Col>
                                    <Col sm={4}>
                                        <p style={{ marginBottom: "0px" }}>Tanggal Pick Up</p>
                                    </Col>
                                    <Col sm={8}>
                                        <p style={{ marginTop: "0px", marginBottom: "0px", fontWeight: "bold" }}>PT Mulia Boga Raya TBK</p>
                                    </Col>
                                    <Col sm={4}>
                                        <p style={{ marginBottom: "20px", fontWeight: "bold" }}>2023-07-18 (09:20:11)</p>
                                    </Col>
                                </Row>
                                <Row style={{ backgroundColor: "" }}>
                                    <Col sm={4}>
                                        <Row>
                                            <p style={{ marginBottom: "5px" }}>Asal Muatan</p>
                                        </Row>
                                        <p style={{ marginBottom: "-10px", fontWeight: "bold" }}>Kabupaten Bekasi</p>
                                        <Row >
                                            <p style={{ marginTop: "20px" }}>Kendaraan</p>
                                        </Row>
                                        <Row >
                                            <p style={{ marginTop: "-10px", fontWeight: "bold" }}>Kontainer 40</p>
                                        </Row>
                                    </Col>
                                    <Col sm={6}>
                                        <Row> <p style={{ marginBottom: "5px" }}>Tujuan Muatan</p>
                                        </Row>
                                        <p style={{ marginBottom: "-10px", fontWeight: "bold" }}>Jakarta Selatan</p>
                                        <Row >
                                            <p style={{ marginTop: "20px" }}>Tonase</p>
                                        </Row>
                                        <Row >
                                            <p style={{ marginTop: "-10px", fontWeight: "bold" }}>0</p>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <img src={truck} className='d-flex' style={{ width: "101px", marginTop: "-10px", height: "101px" }}></img></Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                </Row>
            </div>
            )
        }

export default ListPengiriman