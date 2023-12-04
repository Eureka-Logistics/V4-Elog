import { Button, Card, Input, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { BaseUrlRace } from '../../../../Api/BaseUrl';
import axios from 'axios';
import { Col } from 'react-bootstrap';
import ModalCreateAlamatSekolah from './CreateAlamatSekolah';

function AlamatCustomer() {
    const navigasi = useHistory()
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
            console.log(data.data.data);
            setdataApi(data?.data?.data);
        } catch (error) { }
    };

    useEffect(() => {
        ListSekolah()
    }, [currentPage])
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
            <div className='d-flex mb-2 mt-2 ' style={{ justifyContent: "space-between" }}>
                <Col md={2}>
                    <Input
                        onChange={(e) => ListSekolah(e.target.value)}
                        placeholder='Cari Sekolah' />
                </Col>
                <Col md={2}>
                    <Button onClick={(e) => setmodal1Open(true)} type='primary'>Alamat Sekolah Baru</Button>
                </Col>
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
                            navigasi.push(`/race/alamatcustomerdetail/${row.id}`)
                        }
                    }
                }}
            />
            <ModalCreateAlamatSekolah ListSekolah={ListSekolah} setmodal1Open={setmodal1Open} modal1Open={modal1Open} />
        </div>
    );

}

export default AlamatCustomer