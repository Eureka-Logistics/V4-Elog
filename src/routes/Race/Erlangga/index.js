import { Button, Card, DatePicker, Input, Row, Table, notification } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BaseUrlRace } from '../../../Api/BaseUrl';
import moment from 'moment';
import { Col } from 'react-bootstrap';
import "../Erlangga/style.css"
function Erlangga() {
    const { RangePicker } = DatePicker;
    const [Data, setData] = useState({
        Data: null,
        Data_Tanggal: null,
        SizePge: null,
        paggination: 1,
        size: 10
    })
    const [Keyword, setKeyword] = useState("")
    const datenya = (date, datanggal) => {
        if (datanggal[0] === "") {
            return null
        } else {
            setData(sebelumnya => ({
                ...sebelumnya,
                Data_Tanggal: datanggal
            }))
            const GetDataTanggal = async () => {
                let datas = "ada"
                try {
                    const data = await axios.get(`${BaseUrlRace}sp/get-data-erl?dateForm=${datanggal[0]}&dateTo=${datanggal[1]}&wh=511`)
                    notification.success({
                        message: data.data.status.message,
                    })

                } catch (error) {
                    notification.error({
                        message: error?.response?.data?.status?.message,
                    })
                }

            }
            GetDataTanggal()

        }
    }

    useEffect(async () => {
        const datanya = await axios.get(`${BaseUrlRace}sp/get-data-pesanan?page=${Data?.paggination}&limit=${Data?.size}&keyword=${Keyword}`)
        setData(prevState => ({
            ...prevState,
            Data: datanya.data.data.order,
            SizePge: datanya.data?.data.totalData
        }));
    }, [Data?.paggination, Data?.size, Keyword])

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
    return (
        <div>
            <Card>
                <Row >
                    <Col sm={4} >
                        <RangePicker
                            onChange={datenya} />
                    </Col>
                    <Col sm={3} >
                        <Input
                            onChange={(e) => { setKeyword(e.target.value); }}
                             placeholder='Cari No Referensi' />
                    </Col>
                    <Col sm={4} className='d-flex justify-content-end'>
                        <Button type='primary'>Create SM</Button>
                    </Col>
                </Row>
                {Data.Data ?
                    <Table className='mt-3 ' columns={columns} dataSource={Data.Data}
                        pagination={{
                            // current: currentPage, // halaman saat ini
                            // pageSize: itemsPerPage, // jumlah item per halaman
                            total: Data.SizePge, // total jumlah item
                            onChange: (page, size) => {
                                Pageination(page, size)
                            }
                        }} />
                    : <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>Pilih Tanggal Terlebih Dahulu</div>}
            </Card>
        </div>
    )
}

export default Erlangga