import { Card, Tag } from 'antd';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import truck from "../../../../assets/img/Truck Illu 1.png";
import DrawerCardListDetail from './DrawerCardListDetail';
import "./style.css"
function CardListDriver() {
    const drivers = [
        { name: 'Aryunda Amin', status: 'Available', nik: 'P29803', phone: '+62 857-6743-3298', sim: 'B2 Umum', branch: 'Pusat' },
        { name: 'Aryunda Amin', status: 'Available', nik: 'P29803', phone: '+62 857-6743-3298', sim: 'B2 Umum', branch: 'Pusat' },
        { name: 'Aryunda Amin', status: 'Available', nik: 'P29803', phone: '+62 857-6743-3298', sim: 'B2 Umum', branch: 'Pusat' },
        { name: 'Aryunda Amin', status: 'Available', nik: 'P29803', phone: '+62 857-6743-3298', sim: 'B2 Umum', branch: 'Pusat' },
        { name: 'Aryunda Amin', status: 'Available', nik: 'P29803', phone: '+62 857-6743-3298', sim: 'B2 Umum', branch: 'Pusat' },
        { name: 'Aryunda Amin', status: 'Available', nik: 'P29803', phone: '+62 857-6743-3298', sim: 'B2 Umum', branch: 'Pusat' },
        { name: 'Aryunda Amin', status: 'Available', nik: 'P29803', phone: '+62 857-6743-3298', sim: 'B2 Umum', branch: 'Pusat' },
        { name: 'Aryunda Amin', status: 'Available', nik: 'P29803', phone: '+62 857-6743-3298', sim: 'B2 Umum', branch: 'Pusat' },
    ];
    const [opens, setOpens] = useState(false)

    const handleCardClick = (driver) => {
        setOpens(true);
    };

    return (
        <div>
            <DrawerCardListDetail setOpens={setOpens} opens={opens} />
            <Row >
                {drivers.map((driver, index) => (
                    <Col sm={6} key={index}>
                        <Card onClick={() => handleCardClick(driver)} style={{ cursor: 'pointer' }}>
                            <Row>
                                <Col sm={10}>
                                    <h4 style={{ fontWeight: "bold" }}>{driver.name}</h4>
                                </Col>
                                <Col className='ml-auto mx-auto d-flex justify-content-end' sm={2}>
                                    <Tag color='green'>{driver.status}</Tag>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col sm={4}>
                                    <div>Nik Driver</div>
                                    <div style={{ fontWeight: "bold" }}>{driver.nik}</div>
                                    <div style={{ fontWeight: "bold", marginTop: 20 }}>No Telepon</div>
                                    <div style={{ fontWeight: "bold" }}>{driver.phone}</div>
                                </Col>
                                <Col sm={4}>
                                    <div>Jenis SIM</div>
                                    <div style={{ fontWeight: "bold" }}>{driver.sim}</div>
                                    <div style={{ fontWeight: "bold", marginTop: 20 }}>Cabang</div>
                                    <div style={{ fontWeight: "bold" }}>{driver.branch}</div>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <img src={truck} className='d-flex' style={{ width: "101px", marginTop: "-10px", height: "101px" }}></img>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default CardListDriver;
