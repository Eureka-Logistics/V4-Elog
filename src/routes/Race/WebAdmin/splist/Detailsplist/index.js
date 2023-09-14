import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import bk from "../../../../../assets/img/Group 18.png"
import { Card, Divider, Steps } from 'antd'
import drivericon from "../../../../../assets/img/drivericon.png"
import './style.css'
function DetailSPListRace() {
    const description = 'This is a description.';
    return (
        <div>
            <Row>
                <Col style={{ backgroundColor: "" }}>
                    <h3>Detail SJ</h3>
                    <div>No. SP</div>
                    <div style={{ fontWeight: "bold" }}>SP22163/09/23/JKT</div>
                    <br />
                    <div>No. SJ</div>
                    <div style={{ fontWeight: "bold" }}>JKT23-009443</div>
                    <br />
                    <div>Customer</div>
                    <div style={{ fontWeight: "bold" }}>PT. Serena Indopangan Industri</div>
                    <br />
                    <div>Service</div>
                    <div style={{ fontWeight: "bold" }}>Charter</div>
                    <br />
                    <div>Pickup Date</div>
                    <div style={{ fontWeight: "bold" }}>01-09-2023 (17:07)</div>
                    <br />
                    <div>Pickup Address</div>
                    <div style={{ fontWeight: "bold" }}>Jl. Haji Muhammad Ashari No.35, Cibinong, Bogor Jawa Barat</div>
                    <br />
                    <div>Destination Address</div>
                    <div style={{ fontWeight: "bold" }}>Jl. S Parman No.17/21 RT.07 RW.01 Tegal Sari Kec. Tepanyar Kel. Sarinah, Jakarta Pusat</div>
                    <br />
                    <div>Weight</div>
                    <div style={{ fontWeight: "bold" }}>2000Kg</div>
                    <br />
                    <div>Koli</div>
                    <div style={{ fontWeight: "bold" }}>-</div>
                    <br />
                    <div>Pcs</div>
                    <div style={{ fontWeight: "bold" }}>-</div>
                    <br />
                    <div>Items</div>
                    <div style={{ fontWeight: "bold" }}>-</div>
                </Col>
                <Col style={{
                    backgroundColor: "#1A3368",
                    backgroundImage: `url(${bk})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right center',
                    backgroundSize: 'auto'
                }}>
                    <h3 style={{ color: "white" }}>Tracking Pengiriman</h3>
                    <Container>
                        <Row style={{ height: "432px" }}>
                            <Col style={{ backgroundColor: "" }}>
                                <Steps
                                  className="my-custom-steps"
                                    direction="vertical"
                                    size="small"
                                    current={5}
                                    style={{ padding: '20px', width: 400, height: 500 }}
                                    items={[
                                        {
                                            title: 'Selesai',
                                            description: "Raja Cepat Warehouse, Pasar Minggu Pengiriman Selesai pada : 11:30"
                                        },
                                        {
                                            title: 'Sampai Tujuan',
                                            description: "Raja Cepat Warehouse, Pasar Minggu Perkiraan sampai 11:00 WIB"
                                        },
                                        {
                                            title: 'Berangkat',
                                            description: "Raja Cepat Warehouse, Pasar Minggu 10:15 WIB"
                                        },
                                        {
                                            title: 'Selesai Muat',
                                            description: "Ciracas, Jakarta Timur 10:00 WIB, 14 Agustus 2023"
                                        },
                                        {
                                            title: 'Sampai Gudang',
                                            description: "Ciracas, Jakarta Timur 09:40 WIB, 14 Agustus 2023"
                                        },
                                    ]}
                                />
                            </Col>
                        </Row>
                    </Container>
                    <Row style={{ marginTop: 80 }}>
                        <Container style={{ display: "flex", justifyContent: "center" }}>
                            <Card style={{ borderRadius: 15, width: 700 }} >
                                <Row>
                                    <Col sm={9}>
                                        <h5>Informasi Driver</h5>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={drivericon} alt="Driver Icon" style={{ marginRight: '15px' }} />
                                            <div style={{ fontWeight: "bold", marginTop: 20 }}>
                                                <p>Budiawan Suprapto</p>
                                                <p>P1239100</p>
                                                <p>0852-2952-9118</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm={3}>
                                        <div style={{ backgroundColor: "#1f3d7d", padding: 10, borderRadius: 15 }}>
                                            <div style={{ color: "white", fontWeight: "bold" }}>
                                                <p>Kendaraan</p>
                                                <p>Wingbox</p>
                                                <p>EL 629</p>
                                                <p>B 9109 QK</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Container>
                        <p className='d-flex justify-content-center' style={{ color: "white" }}>Butuh Bantuan? <span><a className='ms-2' style={{ color: "#5297FF", textDecoration: "none" }}>Klik Disini</a></span></p>

                    </Row>
                </Col>


            </Row>
        </div>
    )
}

export default DetailSPListRace