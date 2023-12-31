import { Button, Card, Input, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { BaseUrlRace } from '../../../../Api/BaseUrl';
import axios from 'axios';
import { Col } from 'react-bootstrap';
import ModalCreateAlamatSekolah from './CreateAlamatSekolah';
import useCoordinateRaceMap from '../../../../zustand/Store/coordinateMapRace/RaceMaps';
import HistoryAlamatCustomer from './History Alamat Customer';
import AlamatCustomerZustand from '../../../../zustand/Store/Race/fetch/AlamatCustomer';

function AlamatCustomer() {
    const { setState, lattitudemap, longtitudemap } = useCoordinateRaceMap();
    const navigasi = useHistory()
    const { passwordvalidasi } = AlamatCustomerZustand()
    const [password, setpassword] = useState(null)
    const [bukamodal, setbukamodal] = useState(false)
    const [dataApi, setdataApi] = useState("")
    const column = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Sekolah',
            dataIndex: 'sekolah',
            key: 'sekolah',
        },
        {
            title: 'Kota',
            dataIndex: 'kota',
            key: 'kota',
        },
        {
            title: 'Kecamatan',
            dataIndex: 'kecamatan',
            key: 'kecamatan',
        },
        {
            title: 'Alamat',
            dataIndex: 'alamat',
            key: 'alamat',
        },
    ]
    const [currentPage, setCurrentPage] = useState(1)
    const [modal1Open, setmodal1Open] = useState(false)
    const ListSekolah = async (key = "") => {
        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-Sekolah?page=${currentPage}&limit=10&keyword=${key}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            console.log(`dataa`, data.data.data);
            setdataApi(data?.data?.data);
        } catch (error) { }
    };

    useEffect(() => {
        ListSekolah()
    }, [currentPage])

    const validasiPassword = async (row) => {
        let validasi = null
        const passwordBenar = 'admin';
        const passwordoi = prompt('Masukkan Password Dahulu:');
        validasi = passwordoi
        if (passwordBenar == passwordoi) {
            AlamatCustomerZustand.setState({ passwordvalidasi: passwordoi });
            navigasi.push(`/race/alamatcustomerdetail/${row.id}`);
        } else {
            alert('Password salah!');
        }

    };

    return (
        <div>
            <style>
                {`
                    .tableini .ant-table-tbody > tr:hover {
                        cursor: pointer;
                    }
                `}
            </style>
            <div style={{ fontSize: 20, fontWeight: "bold" }} className='mb-1'>Detail Alamat Customer</div>
            <div>
                <Row className=' mb-2 mt-2 d-flex' style={{ justifyContent: "space-between" }} >
                    <Col md={4}>
                        <Input
                            onChange={(e) => ListSekolah(e.target.value)}
                            placeholder='Cari Sekolah' />
                    </Col>
                    <Col md={2}>
                        <Button onClick={(e) => setbukamodal(true)} type='danger'>History Edit Alamat Sekolah</Button>
                    </Col>
                    <Col md={2}>
                        <Button onClick={(e) => setmodal1Open(true)} type='primary'>Alamat Sekolah Baru</Button>
                    </Col>
                </Row>
            </div>
            <Table
                // pagination={{ total: 200 }}
                columns={column}
                className='tableini'
                dataSource={dataApi?.order}
                pagination={{
                    total: dataApi?.totalData,
                    onChange: (page) => setCurrentPage(page) // Update currentPage bukan dataApi
                }}
                onRow={(row, index) => {
                    return {
                        onClick: event => {
                            console.log(row);
                            useCoordinateRaceMap.setState({ lattitudemap: row?.lat, longtitudemap: row?.long })
                            validasiPassword(row)
                        }
                    }
                }}
            />
            <ModalCreateAlamatSekolah ListSekolah={ListSekolah} setmodal1Open={setmodal1Open} modal1Open={modal1Open} />
            <HistoryAlamatCustomer bukamodal={bukamodal} setbukamodal={setbukamodal} />
        </div>
    );

}

export default AlamatCustomer