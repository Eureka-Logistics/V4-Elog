import { Button, Card, Input, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ListDriverZustand from '../../../../zustand/Store/Race/fetch/List Driver/ListDriver'
import ModalKendaraan from './components/ModalKendaraan'

function KendaraanList() {
    const { FetchDriver, ListDriver, FetchDetailDriver, DriverID } = ListDriverZustand()
    const [OpenModal, setOpenModal] = useState(false)
    useEffect(() => {
        FetchDriver()
    }, [])
    const column = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Driver Code',
            dataIndex: 'driverCode',
            key: 'driverCode',
        },
        {
            title: 'Nik',
            dataIndex: 'nik',
            key: 'nik',
        },
        {
            title: 'Nama Driver',
            dataIndex: 'driverName',
            key: 'driverName',
        },
        {
            title: 'Jenis Kepemilikan',
            dataIndex: 'jenisKepemilikan',
            key: 'jenisKepemilikan',
        },
        {
            title: 'Kendaraan',
            dataIndex: 'vehicle',
            key: 'vehicle',
        },
        {
            title: 'Gambar Kendaraan',
            dataIndex: 'driverImage',
            key: 'driverImage',
            render: (driverImage) => {
                return <img src={driverImage} width={50} />
            }
        },
    ]

    return (
        <div>
            <h4>List Kendaraan</h4>
            <Row>
                <Col>
                    <Input placeholder='Cari Driver' style={{ width: "100%" }} />
                </Col>
                <Col>
                    <Select placeholder='Cari Jenis Kepemilikan' style={{ width: "100%" }}></Select>
                </Col>
                <Col>
                    <Select placeholder='Status' style={{ width: "100%" }}></Select>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button onClick={() => setOpenModal(true)} type='primary'>Tambah Driver</Button>
                </Col>
            </Row>
            <Card> <style>
                {`
                    .tableini .ant-table-tbody > tr:hover {
                        cursor: pointer;
                    }
                `}
            </style>
                <Table className='tableini' columns={column} dataSource={ListDriver?.order}
                    pagination={{
                        total: ListDriver?.totalData,

                    }}
                    onRow={(row, index) => {
                        return {
                            onClick: event => {
                                console.log(row);
                                FetchDetailDriver(row?.driverId)
                                ListDriverZustand.setState({ DriverID: row?.driverId })
                                setOpenModal(true, row)
                            }
                        }
                    }}
                />
            </Card>
            <ModalKendaraan setOpenModal={setOpenModal} OpenModal={OpenModal} />
        </div>
    )
}

export default KendaraanList