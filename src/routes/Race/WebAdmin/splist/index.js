import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, Drawer, Input, Space, Timeline } from 'antd'
import { size } from 'lodash';
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./style.css"
import map from "../../../../assets/img/peta.png"
import icondriver from "../../../../assets/img/drivericon.png"
import telponicon from "../../../../assets/img/telponicon.png"
import whatsappicon from "../../../../assets/img/whatsappicon.png"
import truck from "../../../../assets/img/Truck Illu 1.png"
import vespa from "../../../../assets/img/vesva.png"
import ListPengiriman from './ListPengirimanCardComponent';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MapContainer from "../../../MasterData/Monitoring/Test"
function SpListRace() {
    const history = useHistory()
    const [open, setOpen] = useState(false);
    const showDefaultDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const pindahdetailsp = () => {
        history.push(`/race/detailsplistrace/:idmp`)
    }

    function sendMessage() {
        const phoneNumber = "6281221871961";
        const name = "Bapak Budiawan Suprapto";
        const message = `Halo ${name},
        
        Semoga Anda dalam keadaan baik-baik saja. Saya ingin menanyakan bagaimana keadaan Anda selama melakukan perjalanan dan proses pengangkutan barang. Apakah semuanya berjalan lancar atau ada kendala tertentu yang perlu kami ketahui? Apabila ada masalah atau hambatan, tolong beritahu kami agar kami bisa memberikan bantuan atau solusi secepatnya. Terima kasih atas perhatian dan kerja keras Anda. Kami menghargai dedikasi Anda dalam menjalankan tugas ini.
   
        
Salam hangat,
[Tim Race]`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
    }

    return (
        <div>
            <Drawer
                title="Tracking Pengiriman"
                width={3220}
                closable={false}
                onClose={onClose}
                open={open}
            >
                <Card bodyStyle={{ padding: 0 }} style={{ height: 455, overflow: 'hidden' }}>
                    <MapContainer />
                </Card>
                <Card bodyStyle={{ padding: 0 }} style={{ height: 270 }}>
                    <Container>
                        <p style={{ fontWeight: "bold", fontSize: 20 }}>Informasi Driver</p>
                        <Row style={{ marginTop: "20px" }}>
                            <Col sm={2}>
                                <img src={icondriver} style={{ height: "80px", width: "93px", borderRadius: "10px" }}></img>
                            </Col>
                            <Col sm={6}>
                                <p style={{ fontWeight: "bold" }}>Budiawan Suprapto</p>
                                <p style={{ fontWeight: "bold" }}>P1239100</p>
                                <p style={{ fontWeight: "bold" }}>B2 UMUM</p>
                            </Col>
                            <Col sm={4} className='d-flex justify-content-end align-items-center'>
                                <img src={telponicon} style={{ height: "80px", width: "93px", borderRadius: "10px" }}></img>
                                <img onClick={sendMessage} src={whatsappicon} style={{ height: "80px", width: "93px", borderRadius: "10px", cursor: "pointer" }}></img>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col>
                                <div style={{ fontWeight: "bold", fontSize: 20 }}>Informasi Perjalanan</div>
                            </Col>
                            <Col className='d-flex justify-content-end'>
                                <Button
                                    onClick={pindahdetailsp}
                                    style={{
                                        backgroundColor: "blue",
                                        fontWeight: "bold",
                                        fontSize: 20,
                                        color: 'white',
                                        cursor: 'pointer',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Cek Detail
                                </Button>
                            </Col>
                        </Row>
                        <Col>
                            <div className="timeline-container">
                                <div className="timeline-line"></div>
                                <div className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-label">Ready</div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-label">Pick Up</div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-label">Delivery</div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-label">Unloading</div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-label">Success</div>
                                </div>
                            </div>
                        </Col>
                    </Container>
                </Card>


            </Drawer>
            <Row>
                <Col sm={12}>
                    <Card >
                        <Row>
                            <Col sm={8}>
                                <Row>
                                    <Col style={{ backgroundColor: 'white' }}>05 September 2023</Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: 'white' }}>Jumlah Pengiriman Anda</Col>
                                </Row>
                            </Col>
                            <Col sm={2} style={{ backgroundColor: 'white' }}>
                                02 <br /> Selesai
                            </Col>
                            <Col sm={2} style={{ backgroundColor: 'white' }}>
                                10 <br /> Total
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col sm={9}>
                    <h5 style={{ fontSize: 30, }}>
                        List Pengiriman
                    </h5>
                </Col>
                <Col sm={3}>
                    <Input style={{ Width: "400px", height: "50px" }} addonBefore={<SearchOutlined />} placeholder='Cari Disini' />
                </Col>
            </Row>
            <ListPengiriman setOpen={setOpen} />
        </div>
    )
}

export default SpListRace