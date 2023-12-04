import React from 'react'
import { DatePicker, Input, Modal, Select } from 'antd';
import { Col, Row } from 'react-bootstrap';

function ModalMemo({ModalMemo,setModalMemoOpen,judulModal}) {
  return (
    <div>
    <Modal
        width={800}
        title={`Modal ${judulModal}`}
        visible={ModalMemo}
        onCancel={() => setModalMemoOpen(false)}
        onOk={() => setModalMemoOpen(false)}
    >
        <Row>
            <Col sm={6}>
                <div><b>Tanggal ETA</b>
                    <DatePicker style={{width :"100%"}}></DatePicker>
                </div>
            </Col>
            <Col sm={6}>
                <div><b>DO/SJ</b>
                    <Input></Input>
                </div>
            </Col>
        </Row>
        <Row className='mt-3'>
            <Col sm={6}>
                <div><b>Nama Kapal</b>
                    <Select style={{ width: "100%" }}></Select>
                </div>
            </Col>
            <Col sm={6}>
                <div><b>Tanggal Berangkat Kapal</b>
                    <DatePicker style={{ width: "100%" }}></DatePicker>
                </div>
            </Col>
        </Row>
        <Row className='mt-3'>
            <Col sm={4}>
                <div><b>Salah Kirim:</b>
                    <Input style={{ width: "100%" }}></Input>
                </div>
            </Col>
            <Col sm={2}>
                <div><b>Qty</b>
                    <Select style={{ width: "100%" }}></Select>
                </div>
            </Col>
            <Col sm={4}>
                <div><b>Dipisah</b>
                    <Input style={{ width: "100%" }}></Input>
                </div>
            </Col>
            <Col sm={2}>
                <div><b>Qty</b>
                    <Select style={{ width: "100%" }}></Select>
                </div>
            </Col>
        </Row>
        <Row className='mt-3'>
            <Col sm={4}>
                <div><b>Kurang:</b>
                    <Input style={{ width: "100%" }}></Input>
                </div>
            </Col>
            <Col sm={2}>
                <div><b>Qty</b>
                    <Select style={{ width: "100%" }}></Select>
                </div>
            </Col>
            <Col sm={4}>
                <div><b>Rusak</b>
                    <Input style={{ width: "100%" }}></Input>
                </div>
            </Col>
            <Col sm={2}>
                <div><b>Qty</b>
                    <Select style={{ width: "100%" }}></Select>
                </div>
            </Col>
        </Row>
       
        <Row className='mt-3'>
            <Col sm={12}>
                <div><b>Keterangan</b>
                    <Select style={{ width: "100%" }}></Select>
                </div>
            </Col>
        </Row>
    </Modal>
</div>
  )
}

export default ModalMemo
