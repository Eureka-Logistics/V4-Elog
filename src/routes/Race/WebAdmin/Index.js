import { Button, Card } from 'antd'
import React from 'react'
import './style.css';
import btnLihat from "../../../assets/img/buttonLihat.png"
import card1 from "../../../assets/img/dashboard race/card1.png"
import card2 from "../../../assets/img/dashboard race/card2.png"
import card3 from "../../../assets/img/dashboard race/card3.png"
import card4 from "../../../assets/img/dashboard race/card4.png"
import { Container, Row, Col } from 'react-bootstrap';
function Index() {
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
                            <Button style={{ width: "100%", marginTop: 25 }}><img src={btnLihat}></img> </Button>
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
                        <Col sm={8} style={{ backgroundColor: 'lightblue', margin: '5px', height: '328px' }}>
                            <div>
                                Pengiriman Anda
                            </div>
                        </Col>
                        <Col sm={3} style={{ backgroundColor: 'lightcoral', margin: '5px', height: '600px' }}>
                            <div>
                                Pengiriman saya
                            </div>
                        </Col>

                    {/* Row for Data Driver and Score Bulanan */}
                    <div style={{ position: 'absolute', top: '350px', }}> {/* Posisi absolut */}
                        <Row>
                            <Col sm={4} style={{ backgroundColor: 'lightgreen', margin: '5px', height: '240px' }}>
                                <div>
                                    Data Driver
                                </div>
                            </Col>
                            <Col sm={4} style={{ backgroundColor: 'lightyellow', margin: '5px', height: '240px' }}>
                                <div>
                                    Score Bulanan
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