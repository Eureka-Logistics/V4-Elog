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
            // const GetDataTanggal = async () => {
            //     let datas = "ada"
            //     try {
            //         const data = await axios.get(`${BaseUrlRace}sp/get-data-erl?dateForm=${formattedStartDate}&dateTo=${formattedEndDate}&wh=511`, {
            //             headers: {
            //                 "Content-Type": "application/json",
            //                 Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4MzM3Mzg2LCJleHAiOjE2OTg0MjM3ODZ9.G3wsj2FXma8aAISzJbzhqmnrWs6DSOYDgHrF7RMsQS0',
            //                 // Authorization: localStorage.getItem("token"),
            //             },
            //         })
            //         Refresh()
            //         notification.success({
            //             message: data.data.status.message,
            //         })
            //         console.log(data.response);


            //     } catch (error) {
            //         console.log();
            //         if (error.response) {
            //             notification.error({
            //                 message: error?.response?.data?.status?.message,
            //             })
            //         } else {
            //             console.log("error");
            //         }

            //     }

            // }
            // GetDataTanggal()

        }
    }
    const [PilihCabang, setPilihCabang] = useState(511)
    const GetDataTanggal = async (e) => {
        let datas = "ada"
        const formattedStartDate = moment(Data.Data_Tanggal[0]).format("YYYY-M-D");
        const formattedEndDate = moment(Data.Data_Tanggal[1]).format("YYYY-M-D");
        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-data-erl?dateForm=${formattedStartDate}&dateTo=${formattedEndDate}&wh=${PilihCabang}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4MzM3Mzg2LCJleHAiOjE2OTg0MjM3ODZ9.G3wsj2FXma8aAISzJbzhqmnrWs6DSOYDgHrF7RMsQS0',
                    // Authorization: localStorage.getItem("token"),
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
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4MzM3Mzg2LCJleHAiOjE2OTg0MjM3ODZ9.G3wsj2FXma8aAISzJbzhqmnrWs6DSOYDgHrF7RMsQS0',
                    // Authorization: localStorage.getItem("token"),
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
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4MzM3Mzg2LCJleHAiOjE2OTg0MjM3ODZ9.G3wsj2FXma8aAISzJbzhqmnrWs6DSOYDgHrF7RMsQS0',
                    // Authorization: localStorage.getItem("token"),
                },
            })
        setData(prevState => ({
            ...prevState,
            Data: datanya.data.data.order,
            SizePge: datanya.data?.data.totalData
        }));
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
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Referensi',
            dataIndex: 'referensi',
            key: 'referensi',
        },
        {
            title: 'Kode Penerima',
            dataIndex: 'kecamatan',
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
    function GetdataTable(d, i) {
        console.log(d, i);
    }
    return (
        <div>
            <Card>
                <Row >
                    <Col md={3} style={{ backgroundColor: "" }} >
                        <RangePicker
                            onChange={datenya} />
                    </Col>
                    <Col md={3}>
                        <Button type='primary' onClick={GetDataTanggal}>Sync Data</Button>

                    </Col>
                    <Col md={3}>
                        <Button onClick={() => setModal1Open(true)} type='danger'>Create SP</Button>

                    </Col>
                    <Col md={3} >
                        <Input
                            onChange={(e) => { setKeyword(e.target.value); }}
                            placeholder='Cari No Referensi' />
                    </Col>
                    <Col md={3}>
                        <Select
                            placeholder="Pilih Cabang"
                            style={{ width: "100%" }}
                            onChange={(e) => setPilihCabang(e)}
                        >
                            <Select.Option value="510">510</Select.Option>
                            <Select.Option value="511">511</Select.Option>
                            <Select.Option value="512">512 - Banten</Select.Option>
                            <Select.Option value="513">513 - DKI Retail</Select.Option>
                            <Select.Option value="514">514 - DKI Direct</Select.Option>
                            <Select.Option value="515">515</Select.Option>
                            <Select.Option value="516">516</Select.Option>
                            <Select.Option value="517">517 - Banten</Select.Option>
                            <Select.Option value="518">518 - Bogor</Select.Option>
                            <Select.Option value="519">519</Select.Option>
                            <Select.Option value="520">520</Select.Option>
                            <Select.Option value="521">521</Select.Option>
                        </Select>
                    </Col>
                </Row>
                <style>
                    {`
                .hover-row:hover {
                    background-color: #F36C43 ; 
                    cursor: pointer;
                }
                `}
                </style>
                <Table className='mt-3 ' loading={!Data.Data} columns={columns} dataSource={Data.Data}
                    pagination={{
                        total: Data.SizePge,
                        onChange: (page, size) => {
                            Pageination(page, size)

                        },
                    }}
                    onRow={(data, index) => ({
                        onClick: event => {
                            GetdataTable(index, data)
                        },
                        className: 'hover-row'
                    })}
                />
                <ModalCreateaSPRace Refresh={Refresh} modal1Open={modal1Open} setModal1Open={setModal1Open} />
            </Card>
        </div>
    )
}

export default Erlangga