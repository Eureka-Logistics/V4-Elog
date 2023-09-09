import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, Drawer, Input, Space } from 'antd'
import { size } from 'lodash';
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import "./style.css"

function SpListRace() {
    const [open, setOpen] = useState(false);
    const showDefaultDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button type="primary" onClick={showDefaultDrawer}>
                Open Default Size (378px)
            </Button>
            <Drawer
                title="Tracking Pengiriman"
                width={3220}
                closable={false}
                onClose={onClose}
                open={open}
            >
                <Card style={{ height: 455 }}>

                </Card>
                <Card style={{ height: 270 }}>

                </Card>

            </Drawer>
            <Row>
                <Col sm={12}>
                    <Card>
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
            <div className='mt-2'>
                <Row >
                    <Col sm={6} >
                        <Card style={{ height: 217 }}></Card>
                    </Col>
                    <Col sm={6} >
                        <Card style={{ height: 217 }}></Card>
                    </Col>
                </Row>
                <Row >
                    <Col sm={6} >
                        <Card style={{ height: 217 }}></Card>
                    </Col>
                    <Col sm={6} >
                        <Card style={{ height: 217 }}></Card>
                    </Col>
                </Row>
                <Row >
                    <Col sm={6} >
                        <Card style={{ height: 217 }}></Card>
                    </Col>
                    <Col sm={6} >
                        <Card style={{ height: 217 }}></Card>
                    </Col>
                </Row>
                <Row >
                    <Col sm={6} >
                        <Card style={{ height: 217 }}></Card>
                    </Col>
                    <Col sm={6} >
                        <Card style={{ height: 217 }}></Card>
                    </Col>
                </Row>
                <Row >
                    <Col sm={6} >
                        <Card style={{ height: 217 }}></Card>
                    </Col>
                    <Col sm={6} >
                        <Card style={{ height: 217 }}></Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default SpListRace