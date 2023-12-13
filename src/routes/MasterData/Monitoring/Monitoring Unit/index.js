import { Button, Select, Switch, Table, Tag } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Baseurl from '../../../../Api/BaseUrl';

function MonitoringUnit() {

    const datatanggal = [
        { no: 1, tanggal: "12-12-2023" },
        { no: 2, tanggal: "12-12-2023" },
        { no: 3, tanggal: "12-12-2023" },
        { no: 4, tanggal: "12-12-2023" },
        { no: 5, tanggal: "12-12-2023" },
        { no: 6, tanggal: "12-12-2023" },
        { no: 7, tanggal: "12-12-2023" },
        { no: 8, tanggal: "12-12-2023" },
        { no: 9, tanggal: "12-12-2023" },
        { no: 10, tanggal: "12-12-2023" },
    ];
    const tujuan = [
        { "tujuan": "Bandung" },
        { "tujuan": "Jakarta" },
        { "tujuan": "Surabaya" },
        { "tujuan": "Yogyakarta" },
        { "tujuan": "Bali" },
        { "tujuan": "Medan" },
        { "tujuan": "Makassar" },
        { "tujuan": "Semarang" },
        { "tujuan": "Palembang" },
        { "tujuan": "Pontianak" }
    ]

    const keterangan = [
        { "keterangan": "Proses Muat" },
        { "keterangan": "Perjalanan => Ke Pool" },
        { "keterangan": "Proses Muat" },
        { "keterangan": "Proses Muat" },
        { "keterangan": "Perjalanan => Ke Pool" },
        { "keterangan": "Perjalanan => Ke Pool" },
        { "keterangan": "Proses Muat" },
        { "keterangan": "Perjalanan => Ke Pool" },
        { "keterangan": "Proses Muat" },
        { "keterangan": "Proses Muat" }
    ]




    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "key",
        },
        {
            title: "Tanggal",
            dataIndex: "cust",
            key: "cust",
            render: (text, record, index) => {
                return <>{datatanggal[index]?.tanggal}</>;
            }
        },
        {
            title: "Status",
            dataIndex: "rute",
            key: "rute",
            render: (status, record) => {
                return <>{record?.status == 1 ? <Tag color='green'>Ready</Tag> : <Tag color='red'>Not Ready</Tag>}</>
            }
        },
        {
            title: "JenisUnit",
            dataIndex: "vehicleType",
            key: "brg",
        },
        {
            title: "NomorPolisi",
            dataIndex: "policeNumber",
            key: "berat",
        },
        {
            title: "Driver",
            dataIndex: "driverName",
            key: "mitra",
        },
        {
            title: "Keterangan",
            dataIndex: "pengemudi",
            key: "pengemudi",
            render: (s,t,index) => {
                return <>{keterangan[index].keterangan}</>
            }
        },
        {
            title: "Muatan",
            dataIndex: "vendor",
            key: "pengemudi",
        },
        {
            title: "Tujuan",
            dataIndex: "pengemudi",
            key: "pengemudi",
            render: (pengemudi, record, index) => {
                return <>{tujuan[index]?.tujuan}</>
            }
        },
        {
            title: "GpsLoc",
            dataIndex: "pengemudi",
            key: "pengemudi",
        },
        {
            title: "Aksi",
            selector: (row) => (row.status === "1" ? "Aktif" : "Tidak Aktif"),
            render: (row) => (
                <div>
                    <Switch
                        checked={row.status === "1" ? true : false}
                        checkedChildren="ON"
                        unCheckedChildren="OFF"
                    // onChange={(checked) =>
                    //     checked
                    //         ? ModalONVehicle(row.vehicleId)
                    //         : ModalOFFVehicle(row.vehicleId)
                    // }
                    />
                </div>
            ),
        },

    ];
    const [DataApi, setDataApi] = useState("")
    const fetch = async () => {
        try {
            const data = await axios.get(`${Baseurl}vehicle/get-vehicle?limit=10&page=1&keyword=&jenisKepemilikan=&status=`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            console.log(data.data.data);
            setDataApi(data.data.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div>
            <Row>
                <Col md={3}>
                    <div>Jenis</div>
                    <Select style={{ width: "100%" }} />
                </Col>
                <Col md={3}>
                    <div>Jenis Kendaraan</div>
                    <Select style={{ width: "100%" }} />
                </Col>
                <Col md={1} className='mt-4'>
                    <div style={{ display: "block" }}> </div>
                    <Button type='primary' style={{ width: "100%" }}>Search</Button>
                </Col>
            </Row>
            <Table className="mt-3" columns={columns} dataSource={DataApi?.order} />
        </div>
    )
}

export default MonitoringUnit