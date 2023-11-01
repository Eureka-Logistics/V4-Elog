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

                
            </Container>




            <div className='scorebulanan dta-driver'>
                <Row>
                    <Col md={8}>
                        <Col style={{ width: "auto", minHeight: "328px", backgroundImage: `url(${graph1})` , backgroundRepeat: 'no-repeat' }}>
                            
                        </Col>
                        <Row >
                            <Col style={{
                                backgroundColor: "", marginTop: 20, marginLeft: 10, backgroundImage: `url(${graph2})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover', height: '250px'
                            }}>
                            </Col>
                            <Col style={{
                                backgroundColor: "", marginTop: 20, marginLeft: 20, marginRight: 10, backgroundImage: `url(${graph3})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',  height: '250px'
                            }}>
                                
                            </Col>

                        </Row>
                    </Col>
                    <Col style={{ backgroundColor: "white" }}>
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
                        <div style={{ backgroundColor: "", display: "flex", justifyContent: "center" }}>
                            <Button style={{}} type='primary'>Selengkapnya</Button>
                        </div>
                    </Col>

                </Row>

            </div>
        </>
    )
}

export default Index