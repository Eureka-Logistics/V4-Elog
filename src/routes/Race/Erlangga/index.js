import { Button, Card, DatePicker, Input, Row, Select, Table, notification } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BaseUrlRace } from '../../../Api/BaseUrl';
import moment from 'moment';
import { Col } from 'react-bootstrap';
import "../Erlangga/style.css"
import ModalCreateaSPRace from './Modal Create SP';
function Erlangga() {
    const { RangePicker } = DatePicker;
    const [modal1Open, setModal1Open] = useState(false);
    const [Data, setData] = useState({
        Data: null,
        Data_Tanggal: null,
        SizePge: null,
        paggination: 1,
        size: 10
    })

    const barrer = localStorage.getItem("token")
    const [Keyword, setKeyword] = useState("")
    const datenya = (date, datanggal) => {
        console.log(datanggal);
        const formattedStartDate = moment(datanggal[0]).format("YYYY-M-D");
        const formattedEndDate = moment(datanggal[1]).format("YYYY-M-D");
        if (datanggal[0] === "") {
            return null
        } else {
            setData(sebelumnya => ({
                ...sebelumnya,
                Data_Tanggal: datanggal
            }))
        }
    }
    const [PilihCabang, setPilihCabang] = useState("")
    const GetDataTanggal = async (e) => {
        let datas = "ada"
        const formattedStartDate = moment(Data.Data_Tanggal[0]).format("YYYY-M-D");
        const formattedEndDate = moment(Data.Data_Tanggal[1]).format("YYYY-M-D");
        try {
            const data = await axios.post(`${BaseUrlRace}sp/get-data-erl?whid=${PilihCabang}&from=${formattedStartDate}&to=${formattedEndDate}`, {
               
               
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: ,
                    Authorization: localStorage.getItem("token"),
                },
            })
            Refresh()
            notification.success({
                message: data.data.status.message,
            })
            console.log(data.response);


        } catch (error) {
            console.log();
            if (error.response) {
                notification.error({
                    message: error?.response?.data?.status?.message,
                })
            } else {
                console.log("error");
            }

        }

    }

    const Refresh = async () => {
        const datanya = await axios.get(`${BaseUrlRace}sp/get-data-pesanan?page=${Data?.paggination}&limit=${Data?.size}&keyword=${Keyword}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: ,
                    Authorization: localStorage.getItem("token"),
                },
            })
        setData(prevState => ({
            ...prevState,
            Data: datanya.data.data.order,
            SizePge: datanya.data?.data.totalData
        }));
    }
    useEffect(async () => {
        const datanya = await axios.get(`${BaseUrlRace}sp/get-data-pesanan?page=${Data?.paggination}&limit=${Data?.size}&keyword=${Keyword}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4MzM3Mzg2LCJleHAiOjE2OTg0MjM3ODZ9.G3wsj2FXma8aAISzJbzhqmnrWs6DSOYDgHrF7RMsQS0',
                    Authorization: localStorage.getItem("token"),
                },
            })
        setData(prevState => ({
            ...prevState,
            Data: datanya.data.data.order,
            SizePge: datanya.data?.data.totalData
        }));
        pilihcabangselect()
    }, [Data?.paggination, Data?.size, Keyword, PilihCabang])

    function Pageination(page, size) {
        setData(data => ({
            ...data,
            paggination: page,
            size: size
        }))

    }


    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Pic Divisi',
            dataIndex: 'pic_divisi',
            key: 'pic_divisi',
        },
        {
            title: 'Referensi',
            dataIndex: 'referensi',
            key: 'referensi',
        },
        {
            title: 'Referensi_1',
            dataIndex: 'referensi_1',
            key: 'referensi_1',
        },
        {
            title: 'Pic Nik',
            dataIndex: 'pic_nik',
            key: 'pic_nik',
        },
        {
            title: 'Kode Penerima',
            dataIndex: 'kode_penerima',
            key: 'kode_penerima',
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
            title: 'Penerima',
            dataIndex: 'penerima',
            key: 'penerima',
        },
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
        },
        {
            title: 'Tanggal SJ',
            dataIndex: 'tgl_sj',
            key: 'tgl_sj',
        },
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
        },
        {
            title: 'Jam Pickup',
            dataIndex: 'jam_pickup',
            key: 'jam_pickup',
        },
        {
            title: 'Berat',
            dataIndex: 'berat',
            key: 'berat',
        },
        {
            title: 'Ikat',
            dataIndex: 'ikat',
            key: 'ikat',
        },
        {
            title: 'Qty',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'Tgl Sinkron',
            dataIndex: 'tgl_sinkron',
            key: 'tgl_sinkron',
            render: (text, record) => {
                const date = moment(record.tgl_sinkron).format('DD-MM-YYYY')
                return date;
            }
        },
    ]
    const [optincabang, setoptincabang] = useState("")
    const pilihcabangselect = async () => {
        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-cabang`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4MzM3Mzg2LCJleHAiOjE2OTg0MjM3ODZ9.G3wsj2FXma8aAISzJbzhqmnrWs6DSOYDgHrF7RMsQS0',
                        Authorization: localStorage.getItem("token"),
                    },
                })
            console.log(data.data.data);
            setoptincabang(data.data.data)
        } catch (error) {

        }
    }

    return (
        <div>
            <Card>
                <Row >
                    <Col style={{ backgroundColor: "" }} >
                        <Select
                            placeholder="Pilih Cabang"
                            style={{ width: "100%", marginRight: 20 }}
                            onChange={(e) => setPilihCabang(e)}
                        >
                            {optincabang && optincabang.map((i, index) => (
                                <Select.Option value={i?.whid}>{i?.cabangId} - {i?.description}</Select.Option>
                            ))}

                        </Select>

                    </Col>
                    <Col style={{ backgroundColor: "", marginLeft: 10 }}>
                        <RangePicker
                            onChange={datenya} />

                    </Col>
                    <Col style={{ marginLeft: 10 }} >
                        <Button type='primary' onClick={GetDataTanggal}>Sync Data</Button>

                    </Col>
                    <Col style={{ backgroundColor: "" }}>
                        <Button style={{ backgroundColor: "" }} onClick={() => setModal1Open(true)} type='danger'>Create SP</Button>

                    </Col>
                    <Col  >
                        <Input
                            style={{}}
                            onChange={(e) => { setKeyword(e.target.value); }}
                            placeholder='Cari No Referensi' />
                    </Col>
                </Row>

                <style>
                    {`
    .hover-row:hover {
        // background-color: #F36C43;
        cursor: pointer;
    }
    .scroll-container {
        overflow-x: auto; 
    }
`}
                </style>
                <div className="scroll-container">
                    <Table className='mt-3 ' loading={!Data.Data} columns={columns} dataSource={Data.Data}
                        pagination={{
                            total: Data.SizePge,
                            onChange: (page, size) => {
                                Pageination(page, size)

                            },
                        }}
                        onRow={(data, index) => ({
                            onClick: event => {
                                // GetdataTable(index, data)
                            },
                            className: 'hover-row'
                        })}
                    />
                </div>
                <ModalCreateaSPRace Refresh={Refresh} modal1Open={modal1Open} setModal1Open={setModal1Open} />
            </Card>
        </div>
    )
}

export default Erlangga