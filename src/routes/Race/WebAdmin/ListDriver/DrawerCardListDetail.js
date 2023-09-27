import { Button, Card, Drawer } from 'antd';
import React from 'react'
import { Col, Row } from 'react-bootstrap';
import truck from "../../../../assets/img/Truck Illu 1.png"
function DrawerCardListDetail({ opens, setOpens }) {

    const onClose = () => {
        setOpens(false);
    };

    const drivers = [
        { id: 1, name: 'Aryunda', status: 'Available', nik: 'P29803', phone: '+62 857-6743-3298', sim: 'B2 Umum', branch: 'Pusat' },
        { id: 2, name: 'Jamal', status: 'Available', nik: 'P29803', phone: '+62 857-6743-3298', sim: 'B2 Umum', branch: 'Pusat' },
        { id: 3, name: 'Aryunda Amin', status: 'Available', nik: 'P29803', phone: '+62 857-6743-3298', sim: 'B2 Umum', branch: 'Pusat' },
    ]

const klik = (e)=>{
    console.log(e);
}

    return (
        <div>
            <Drawer title="Detail Driver" placement="right" onClose={onClose} open={opens}>
                <Row>
                    <Col sm={5}>
                        <img src={truck} height={"280px"} />

                    </Col>
                    <Col>
                        <div style={{ color: "#A2A2A2" }}>Nama</div>
                        <div style={{ fontWeight: "bold", color: "white" }}>Aryunda Amindito Abdullah</div>
                        <div className='mt-2' style={{ color: "#A2A2A2" }}>NIK</div>
                        <div style={{ fontWeight: "bold", color: "white" }}>P28913</div>
                        <div className='mt-2' style={{ color: "#A2A2A2" }}>No Telepon</div>
                        <div style={{ fontWeight: "bold", color: "white" }}>+62 857-6743-3298</div>
                        <div className='mt-2' style={{ color: "#A2A2A2" }}>Jeni SIM</div>
                        <div style={{ fontWeight: "bold", color: "white" }}>B2 Umum</div>
                        <div className='mt-2' style={{ color: "#A2A2A2" }}>Cabang</div>
                        <div style={{ fontWeight: "bold", color: "white" }}>Pusat, Jakarta</div>
                    </Col>
                </Row>
                <hr style={{ borderTop: '3px solid white', marginTop: '30px' }} />
                <div>
                    <h4 style={{ color: "white", marginTop: 20 }}>List Pengantaran</h4>
                </div>
                <div className='mt-3'>
                    {drivers && drivers.map((i) => (
                        <Card key={i.id} onClick={(e)=>klik(i)}>
                            <Row>
                                <Col sm={6}>
                                    <h4>JKT23-007582</h4>
                                </Col>
                                <Col className='justify-content-end d-flex' sm={6}>
                                    <Button style={{ backgroundColor: "#DFDFDF" }}>Waiting</Button>
                                </Col>
                                <Col sm={9}>
                                    <div>Pelanggan</div>
                                </Col>
                                <Col className='justify-content-start d-flex' sm={3}>
                                    <div style={{}}>Tanggal Pick Up</div>
                                </Col>
                                <Col sm={9}>
                                    <div style={{ fontWeight: "bold" }}>{i.name}</div>
                                </Col>

                                <Col className='justify-content-start d-flex' sm={3}>
                                    <div style={{ fontWeight: "bold" }}>-</div>
                                </Col>

                                <div className='d-flex mt-3'>
                                    <Col className='justify-content-start d-flex' sm={3}>
                                        <div style={{}}>Asal Muatan</div>
                                    </Col>
                                    <Col className='justify-content-start d-flex' sm={3}>
                                        <div style={{}}>Tujuan Muatan</div>
                                    </Col>
                                    <Col className='justify-content-start d-flex' sm={3}>
                                        <div style={{}}>Kendaraan</div>
                                    </Col>
                                    <Col className='justify-content-start d-flex' sm={3}>
                                        <div style={{}}>Tonase</div>
                                    </Col>
                                </div>
                                <div className='d-flex' style={{ fontWeight: "bold" }}>
                                    <Col className='justify-content-start d-flex' sm={3}>
                                        <div style={{}}>Kabupaten Bekasi</div>
                                    </Col>
                                    <Col className='justify-content-start d-flex' sm={3}>
                                        <div style={{}}>Jakarta Barat</div>
                                    </Col>
                                    <Col className='justify-content-start d-flex' sm={3}>
                                        <div style={{}}>Kontainer 40</div>
                                    </Col>
                                    <Col className='justify-content-start d-flex' sm={3}>
                                        <div style={{}}>0</div>
                                    </Col>
                                </div>
                            </Row>
                        </Card>
                    ))}
                    <Card>
                        <Row>
                            <Col sm={6}>
                                <h4>JKT23-007582</h4>
                            </Col>
                            <Col className='justify-content-end d-flex' sm={6}>
                                <Button style={{ backgroundColor: "#DFDFDF" }}>Waiting</Button>
                            </Col>
                            <Col sm={9}>
                                <div>Pelanggan</div>
                            </Col>
                            <Col className='justify-content-start d-flex' sm={3}>
                                <div style={{}}>Tanggal Pick Up</div>
                            </Col>
                            <Col sm={9}>
                                <div style={{ fontWeight: "bold" }}>PT Mulia Boga Raya TBK</div>
                            </Col>

                            <Col className='justify-content-start d-flex' sm={3}>
                                <div style={{ fontWeight: "bold" }}>-</div>
                            </Col>

                            <div className='d-flex mt-3'>
                                <Col className='justify-content-start d-flex' sm={3}>
                                    <div style={{}}>Asal Muatan</div>
                                </Col>
                                <Col className='justify-content-start d-flex' sm={3}>
                                    <div style={{}}>Tujuan Muatan</div>
                                </Col>
                                <Col className='justify-content-start d-flex' sm={3}>
                                    <div style={{}}>Kendaraan</div>
                                </Col>
                                <Col className='justify-content-start d-flex' sm={3}>
                                    <div style={{}}>Tonase</div>
                                </Col>
                            </div>
                            <div className='d-flex' style={{ fontWeight: "bold" }}>
                                <Col className='justify-content-start d-flex' sm={3}>
                                    <div style={{}}>Kabupaten Bekasi</div>
                                </Col>
                                <Col className='justify-content-start d-flex' sm={3}>
                                    <div style={{}}>Jakarta Barat</div>
                                </Col>
                                <Col className='justify-content-start d-flex' sm={3}>
                                    <div style={{}}>Kontainer 40</div>
                                </Col>
                                <Col className='justify-content-start d-flex' sm={3}>
                                    <div style={{}}>0</div>
                                </Col>
                            </div>
                        </Row>
                    </Card>
                </div>
            </Drawer >
        </div >
    )
}

export default DrawerCardListDetail