import { Button, Card, Checkbox, Skeleton, Tag } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import CardMappingStoreRace from '../../../../../zustand/Store/DriverMappingCardRace/MappingStore';
function CardMapping({ onAdd, DataApi, LoadingGan }) {
    const { selectedData, addData, removeData } = CardMappingStoreRace();
    const handleCheckboxChange = (item, e) => {
        if (e.target.checked) {
            addData(item);
        } else {
            removeData(item.sp);
        }
        console.log(selectedData);
    }


    return (
        <div>
            {LoadingGan ? <Skeleton /> :
                <>
                    {DataApi && DataApi.map(item => (
                        <Card key={item.sp} style={{ padding: "0px", borderRadius: "10px" }}>
                            <Row style={{ backgroundColor: "", height: 30 }}>
                                <Col sm={1}>
                                    <Checkbox onChange={(e) => {
                                        handleCheckboxChange(item, e)
                                        console.log(item);
                                    }} style={{ width: 20, height: 20 }} />
                                    {/* <Checkbox  style={{ width: 20, height: 20 }} /> */}

                                </Col>
                                <Col>
                                    <h4 style={{ fontSize: 15, fontWeight: "bold" }}><Tag color="blue">{item.sp}</Tag></h4>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <Button disabled={item.status === "Waiting"} style={{ height: 30, width: 80 }}>
                                        {item.status}
                                    </Button>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col style={{ fontWeight: "bold" }} sm={7}>
                                    <p>Pelanggan</p>
                                </Col>
                                <Col className='d-flex justify-content-start' style={{ fontWeight: "bold" }} sm={5}>
                                    <p>Tanggal Pick Up</p>
                                </Col>
                                <Col style={{ marginTop: -15 }} sm={7}>
                                    <p style={{ fontSize: "16px", fontWeight: "bold" }}><Tag color="gold">{item.customer}</Tag></p>
                                </Col>
                                <Col style={{ marginTop: -15 }} sm={4}>
                                    <p style={{ fontSize: "16px", fontWeight: "bold" }}><Tag color="green">{item.pickupDate}</Tag></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ fontWeight: "bold" }} sm={6}>
                                    <p>Penerima</p>
                                </Col>
                                <Col style={{ fontWeight: "bold" }} sm={2} className='d-flex justify-content-start'>
                                    <p>ikat</p>
                                </Col>
                                <Col style={{ fontWeight: "bold" }} sm={2} className='d-flex justify-content-start'>
                                    <p>koli</p>
                                </Col>
                                <Col style={{ fontWeight: "bold" }} sm={2} className='d-flex justify-content-start' >
                                    <p>Qty</p>
                                </Col>
                                <Col sm={6} style={{ marginTop: -15 }}>
                                    <p style={{ fontSize: "12px", fontWeight: "bold" }}><Tag color='red'>{item.penerima}</Tag></p>
                                </Col>
                                <Col sm={2} className='d-flex justify-content-start' style={{ marginTop: -15 }}>
                                    <p style={{ fontSize: "12px", fontWeight: "bold" }}><Tag color='teal'>{item.ikat}</Tag></p>
                                </Col>
                                <Col sm={2} className='d-flex justify-content-start' style={{ marginTop: -15 }}>
                                    <p style={{ fontSize: "16px", fontWeight: "bold" }}><Tag color="teal">{item.koli}</Tag></p>
                                </Col>
                                <Col sm={2} className='d-flex justify-content-start' style={{ marginTop: -15 }}>
                                    <p style={{ fontSize: "16px", fontWeight: "bold" }}><Tag color="teal">{item.qty}</Tag></p>
                                </Col>

                            </Row>
                            <Row>
                                <Col style={{ fontWeight: "bold" }} sm={3} className='d-flex justify-content-start'>
                                    <p>Tujuan Muatan</p>
                                </Col>
                                <Col className='d-flex justify-content-start' style={{}}>
                                    <Tag color='purple' style={{ fontSize: "12px", fontWeight: "bold", overflow: "hidden" }}>{item.tujuan}</Tag>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </>
            }
        </div>
    )
}
export default CardMapping