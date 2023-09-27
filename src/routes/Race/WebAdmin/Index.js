import { Button, Card, Tag } from 'antd'
import React from 'react'
import './style.css';
import btnLihat from "../../../assets/img/buttonLihat.png"
import card1 from "../../../assets/img/dashboard race/card1.png"
import card2 from "../../../assets/img/dashboard race/card2.png"
import card3 from "../../../assets/img/dashboard race/card3.png"
import card4 from "../../../assets/img/dashboard race/card4.png"
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import graph1 from "../../../assets/img/graph1.png"
import graph2 from "../../../assets/img/graph2.png"
import graph3 from "../../../assets/img/graph3.png"

function Index() {
    const pindah = useHistory()
    const spklist = () => {
        pindah.push(`race/splist`)
    }
    return (
        <>
            <Container>

                <div style={{ fontSize: 25, display: "flex", justifyContent: "start", fontWeight: "bold" }}>Welcome to Dashboard!</div>
                <Row className='mt-3'>
                    <Col sm={3}>
                        <Card style={{ backgroundColor: "", height: 160, width: 263, padding: 0, backgroundImage: `url(${card1})` }}>
                            <div style={{ color: "white", marginTop: "-15px", marginLeft: "-10px", fontSize: 15, alignItems: "flex-start", justifyContent: "flex-start", display: "flex", height: "120%" }}>
                                Surat Perjalanan Kantor
                            </div>
                            <div style={{ color: "white", fontWeight: 500, fontSize: 30, marginLeft: "-10px", marginTop: 15 }}>SPK List</div>
                            <Button onClick={spklist} style={{ width: "100%", marginTop: 25 }}><img src={btnLihat}></img> </Button>
                        </Card>
                    </Col>
                    <Col sm={3}>
                        <Card style={{ backgroundColor: "", height: 160, width: 263, padding: 0, backgroundImage: `url(${card2})` }}>
                            <div style={{ color: "white", marginTop: "-15px", marginLeft: "-10px", fontSize: 15, alignItems: "flex-start", justifyContent: "flex-start", display: "flex", height: "120%" }}>
                                SM
                            </div>
                            <div style={{ color: "white", fontWeight: 500, fontSize: 30, marginLeft: "-10px", marginTop: 15 }}>SM List</div>
                            <Button style={{ width: "100%", marginTop: 25 }}><img src={btnLihat}></img> </Button>
                        </Card>
                    </Col>
                    <Col sm={3}>
                        <Card style={{ backgroundColor: "", height: 160, width: 263, padding: 0, backgroundImage: `url(${card3})` }}>
                            <div style={{ color: "white", marginTop: "-15px", marginLeft: "-10px", fontSize: 15, alignItems: "flex-start", justifyContent: "flex-start", display: "flex", height: "120%" }}>
                                SPK
                            </div>
                            <div style={{ color: "white", fontWeight: 500, fontSize: 30, marginLeft: "-10px", marginTop: 15 }}>SPK Status</div>
                            <Button style={{ width: "100%", marginTop: 25 }}><img src={btnLihat}></img> </Button>
                        </Card>
                    </Col>
                    <Col sm={3}>
                        <Card style={{ backgroundColor: "", height: 160, width: 263, padding: 0, backgroundImage: `url(${card4})` }}>
                            <div style={{ color: "white", marginTop: "-15px", marginLeft: "-10px", fontSize: 15, alignItems: "flex-start", justifyContent: "flex-start", display: "flex", height: "100%" }}>
                                SO
                            </div>
                            <div style={{ color: "white", fontWeight: 500, fontSize: 30, marginLeft: "-10px", marginTop: 15 }}>SP List</div>
                            <Button style={{ width: "100%", marginTop: 25 }}><img src={btnLihat}></img> </Button>
                        </Card>
                    </Col>

                </Row>

                <div style={{ position: 'relative' }}>  {/* Position relative disini agar elemen absolut lainnya berpatokan pada elemen ini */}
                    <Row>
                        <Col sm={8} style={{ backgroundImage: `url(${graph1})`, backgroundColor: '', margin: '5px', height: '328px' }}>
                            <div>
                                {/* <img src={graph1} /> */}
                            </div>
                        </Col>
                        <Col sm={3} style={{ backgroundColor: '#ffffff', margin: '5px', height: '600px' }}>
                            <h4 className='mt-4' style={{ fontWeight: "bold" }}>
                                Laporan Driver
                            </h4>
                            <Card className='mt-3'>
                                <Row>
                                    <Col sm={3}>
                                        <Tag color='red'>Trouble</Tag>
                                    </Col>
                                    <Col sm={9} className='d-flex justify-content-end'>
                                        <p style={{ color: "#1F3D7D", fontWeight: "bold" }}>05-09-2023</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <p style={{ color: "#A1A1A1" }}>Informasi Driver</p>
                                    </Col>
                                    <Col sm={4} className='d-flex justify-content-start'>
                                        <p style={{ color: "#A1A1A1", fontWeight: "" }}>Nomor SJ</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <p style={{ color: "black" }}>Budiawan Suprapto</p>
                                    </Col>
                                    <Col sm={4} className='d-flex justify-content-start'>
                                        <p style={{ color: "black", fontWeight: "" }}>JKT23-007583</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <p style={{ color: "black" }}>P1239100</p>
                                    </Col>
                                </Row>
                                <a style={{ textDecoration: "none" }} className=' d-flex justify-content-center'>Cek Detail</a>
                            </Card>

                            <Card className='mt-3'>
                                <Row>
                                    <Col sm={3}>
                                        <Tag color='red'>Trouble</Tag>
                                    </Col>
                                    <Col sm={9} className='d-flex justify-content-end'>
                                        <p style={{ color: "#1F3D7D", fontWeight: "bold" }}>05-09-2023</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <p style={{ color: "#A1A1A1" }}>Informasi Driver</p>
                                    </Col>
                                    <Col sm={4} className='d-flex justify-content-start'>
                                        <p style={{ color: "#A1A1A1", fontWeight: "" }}>Nomor SJ</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <p style={{ color: "black" }}>Budiawan Suprapto</p>
                                    </Col>
                                    <Col sm={4} className='d-flex justify-content-start'>
                                        <p style={{ color: "black", fontWeight: "" }}>JKT23-007583</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <p style={{ color: "black" }}>P1239100</p>
                                    </Col>
                                </Row>
                                <a style={{ textDecoration: "none" }} className=' d-flex justify-content-center'>Cek Detail</a>
                            </Card>
                            <Row >
                                <Col className='d-flex justify-content-center'>
                                    <Button style={{ backgroundColor: "#1f3d7d" , width :321 , color : "white" , borderRadius : 10 , height : 44} }>Selengkapnya</Button>
                                </Col>
                            </Row>
                        </Col>

                        {/* Row for Data Driver and Score Bulanan */}
                        <div style={{ position: 'absolute', top: '350px', }}> {/* Posisi absolut */}
                            <Row>
                                <Col sm={4}
                                    style={{
                                        backgroundImage: `url(${graph2})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        margin: '5px',
                                        height: '240px'
                                    }}>
                                    <div>
                                    </div>
                                </Col>

                                <Col sm={4} style={{
                                    backgroundImage: `url(${graph3})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover', backgroundColor: 'lightyellow', margin: '5px', height: '240px'
                                }}>
                                    <div>
                                    </div>
                                </Col>
                            </Row>

                        </div>
                    </Row>
                </div>
            </Container>

        </>
    )
}

export default Index