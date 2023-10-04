import React from 'react'
import { DatePicker, Input, Modal, Select } from 'antd';
import { Col, Row } from 'react-bootstrap';

function ModalOKE({ setModal1Open, modal1Open, judulModal }) {
    return (
        <div>
            <Modal
            width={800}
                title={`Modal ${judulModal}`}
                visible={modal1Open}
                onCancel={() => setModal1Open(false)}
                onOk={() => setModal1Open(false)}
            >
                <Row>
                    <Col sm={6}>
                        <div><b>Muatan</b>
                            <Input></Input>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div><b>Tujuan</b>
                            <Input></Input>
                        </div>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col sm={6}>
                        <div><b>Kendaraan</b>
                            <Select style={{width : "100%"}}></Select>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div><b>Driver</b>
                        <Select style={{width : "100%"}}></Select>
                        </div>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col sm={6}>
                        <div><b>kondisi_kendaraan:</b>
                            <Select style={{width : "100%"}}></Select>
                        </div>
                    </Col>
                    <Col sm={3}>
                        <div><b>Berat</b>
                        <Input style={{width : "100%"}}></Input>
                        </div>
                    </Col>
                    <Col sm={3}>
                        <div><b>Koli</b>
                        <Input style={{width : "100%"}}></Input>
                        </div>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col sm={6}>
                        <div><b>Posisi</b>
                            <Select style={{width : "100%"}}></Select>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div><b>Tanggal</b>
                        <DatePicker style={{width : "100%"}}></DatePicker>
                        </div>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col sm={12}>
                        <div><b>Keterangan</b>
                            <Select style={{width : "100%"}}></Select>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default ModalOKE