import { Button, Card, Checkbox } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
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

export default CardMapping