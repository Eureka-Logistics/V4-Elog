import { Button, Card, Input, Select, Table } from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import ModalOKE from './ModalOKE';
import ModalMemo from "../component/ModalMemo"

function TableComponenetReportKiriman() {
    const [modal1Open, setModal1Open] = useState(false);
    const [ModalMemoOpen, setModalMemoOpen] = useState(false);
    const [judulModal, setCurrentTitle] = useState('');

    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'SM',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Cust',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Rute',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Barang',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Berat (KG)',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Mitra',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'No Plat',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Pengemudi',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tgl Muat',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'OnPickup',
            dataIndex: 'onPickup',
            key: 'onPickup',
            render: (text, record) => (
                <Button onClick={() => {
                    setModal1Open(true);
                    setCurrentTitle('OnPickup')
                }} size='small' type='primary'>
                    OK
                </Button>
            ),
        },
        {
            title: 'Unloading',
            dataIndex: 'address',
            render: (text, record) => (
                <Button onClick={() => {
                    setModal1Open(true);
                    setCurrentTitle('Unloading')
                }} size='small' type='primary'>
                    OK
                </Button>
            ),
        },
        {
            title: 'Success',
            dataIndex: 'address',
            render: (text, record) => (
                <Button onClick={() => {
                    setModal1Open(true);
                    setCurrentTitle('Success')
                }} size='small' type='primary'>
                    OK
                </Button>
            ),
        },
        {
            title: 'Memo',
            dataIndex: 'address',
            key: 'address',
            render: (text, record) => (
                <Button onClick={() => {
                    setModalMemoOpen(true);
                    setCurrentTitle(text)
                    console.log(text);
                }} size='small' type='primary'>
                    Memo SJ
                </Button>
            ),
        }
    ];
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    return (
        <div>
            <Card>
                <Row>
                    <Col>
                        <div><b>BU</b>
                            <Select placeholder="Pt Eureka Logistics (LOG)" style={{ width: "100%" }}></Select>
                        </div>
                    </Col>
                    <Col>
                        <div><b>Cabang</b>
                            <Select placeholder="Semua Cabang" style={{ width: "100%" }}></Select>
                        </div>
                    </Col>
                    <Col>
                        <div><b>Mitra</b>
                            <Select placeholder="Semua Mitra" style={{ width: "100%" }}></Select>
                        </div>
                    </Col>
                    <Col>
                        <div><b>Customer</b>
                            <Select placeholder="Semua Customer" style={{ width: "100%" }}></Select>
                        </div>
                    </Col>
                    <Col>
                        <div><b>Mulai</b>
                            <Select style={{ width: "100%" }}></Select>
                        </div>
                    </Col>
                    <Col>
                        <div><b>Selesai</b>
                            <Select style={{ width: "100%" }}></Select>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-2" sm={2}>
                        <div><b>Sukses Pengiriman</b>
                            <Select placeholder="Semua Sukses" style={{ width: "100%" }}></Select>
                        </div>
                    </Col>
                    <Col className="mt-2" sm={2}>
                        <div><b>Sukses Pengiriman</b>
                            <Button placeholder="Semua Sukses" style={{ width: "100%" }}></Button>
                        </div>
                    </Col>
                    <Col className="mt-2" sm={2}>
                        <div><b>Sukses Pengiriman</b>
                            <Button placeholder="Semua Sukses" style={{ width: "100%" }}></Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={10}>
                    </Col>
                    <Col sm={2}>
                        <Input placeholder='Cari Report' className='mb-3 d-flex justify-content-end' />
                    </Col>
                </Row>
                <Table dataSource={dataSource} columns={columns} />
                <ModalOKE judulModal={judulModal} setModal1Open={setModal1Open} modal1Open={modal1Open} />
                <ModalMemo ModalMemo={ModalMemoOpen} setModalMemoOpen={setModalMemoOpen} judulModal={judulModal} />
            </Card>
        </div>
    )
}

export default TableComponenetReportKiriman