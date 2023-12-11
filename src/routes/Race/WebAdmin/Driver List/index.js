import { Button, Card, Input, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ListDriverZustand from '../../../../zustand/Store/Race/fetch/List Driver/ListDriver'
import ModalKendaraan from './components/ModalKendaraan'
import { ListVehicleZustand } from '../../../../zustand/Store/Race/fetch/List Vehicle/ListVehicle'

function KendaraanList() {
    const { FetchDriver, ListDriver, FetchDetailDriver, keyword,FetchGetSelect, getFilterOptions, filteroptionsjenisKepemilikanDanStatus } = ListDriverZustand()
    const { GetSelect} = ListVehicleZustand()
    const [OpenModal, setOpenModal] = useState(false)
    useEffect(() => {
        FetchDriver()
        getFilterOptions()
        GetSelect()
        FetchGetSelect()
    }, [keyword])
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
            title: 'Driver',
            dataIndex: 'vehicle',
            key: 'vehicle',
        },
        {
            title: 'Gambar Driver',
            dataIndex: 'driverImage',
            key: 'driverImage',
            render: (driverImage) => {
                return <img src={driverImage} width={50} />
            }
        },
    ]
    console.log(`filteroptionsjenisKepemilikanDanStatus`, filteroptionsjenisKepemilikanDanStatus);
    return (
        <div>
            <h4>List Driver</h4>
            <Row>
                <Col>
                    <Input
                        onChange={(e) => {
                            ListDriverZustand.setState(prevState => ({
                                ...prevState,
                                keyword: {
                                    ...prevState.keyword,
                                    pencarian: e.target.value
                                }
                            }));
                        }}
                        placeholder='Cari Driver'
                        style={{ width: "100%" }}
                    />

                </Col>
                <Col>
                    <Select placeholder='Cari Jenis Kepemilikan' style={{ width: "100%" }}
                        onChange={(e) => {
                            console.log(e);
                            ListDriverZustand.setState(prevState => ({
                                ...prevState,
                                keyword: {
                                    ...prevState.keyword,
                                    jenis: e
                                }
                            }));
                        }}
                    >
                        <Select.Option value={""}>
                            -
                        </Select.Option>
                        {filteroptionsjenisKepemilikanDanStatus && filteroptionsjenisKepemilikanDanStatus?.filterKepemilikan.map((item, index) => (
                            <Select.Option value={item?.jenis}>
                                {item?.jenis}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col>
                    <Select placeholder='Status' style={{ width: "100%" }}
                        onChange={(e) => {
                            console.log(e);
                            ListDriverZustand.setState(prevState => ({
                                ...prevState,
                                keyword: {
                                    ...prevState.keyword,
                                    status: e
                                }
                            }));
                        }}
                    >
                        <Select.Option value={""}>
                            -
                        </Select.Option>
                        {filteroptionsjenisKepemilikanDanStatus && filteroptionsjenisKepemilikanDanStatus?.filterStatus.map((item, index) => (
                            <Select.Option value={item?.value}>
                                {item?.status}
                            </Select.Option>
                        ))}

                    </Select>
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
                <Table className='tableini' columns={column} loading={!ListDriver?.order} dataSource={ListDriver?.order}
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