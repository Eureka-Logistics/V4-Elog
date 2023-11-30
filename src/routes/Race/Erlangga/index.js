import { Button, Card, DatePicker, Input, Row, Select, Table, notification } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BaseUrlRace } from '../../../Api/BaseUrl';
import moment from 'moment';
import { Col } from 'react-bootstrap';
import "../Erlangga/style.css"
import ModalCreateaSPRace from './Modal Create SP';
import OptionsCabangState from '../../../zustand/Store/Race/optionsCabangRace';
function Erlangga() {
    const { RangePicker } = DatePicker;
    const [modal1Open, setModal1Open] = useState(false);
    const NamaCabang = localStorage.getItem("cabang")
    const [Loading, setLoading] = useState(false)
    let namaCabang = ""
    if (NamaCabang == "RCCGK") {
        namaCabang = "JKT"
    }
    const { setOptionsStateZustand } = OptionsCabangState(state => state.setOptionsStateZustand)
    const [Data, setData] = useState({
        Data: null,
        Data_Tanggal: null,
        SizePge: null,
        paggination: 1,
        size: 10
    })
    const defaultStartDate = moment().subtract(3, 'days');
    const defaultEndDate = moment().add(3, 'days');
    const barrer = localStorage.getItem("token")
    const [Keyword, setKeyword] = useState("")
    const [IDCabang, setIDCabang] = useState(namaCabang)
    const datenya = (date, datanggal) => {
        if (!datanggal || datanggal.length !== 2) {
            return; // Handle the error or invalid state
        }
        const formattedStartDate = moment(datanggal?.[0]).format("YYYY-M-D");
        const formattedEndDates = moment(datanggal?.[1]).format("YYYY-M-D");
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
        setLoading(true);
    
        let formattedStartDate, formattedEndDate;
        
        if (!Data.Data_Tanggal || Data.Data_Tanggal.length < 2) {
            // If Data.Data_Tanggal is not set, use the default start and end dates
            formattedStartDate = defaultStartDate.format("YYYY-M-D");
            formattedEndDate = defaultEndDate.format("YYYY-M-D");
        } else {
            // If Data.Data_Tanggal is set, use those dates
            formattedStartDate = moment(Data.Data_Tanggal[0]).format("YYYY-M-D");
            formattedEndDate = moment(Data.Data_Tanggal[1]).format("YYYY-M-D");
        }
    
        try {
            const data = await axios.post(`${BaseUrlRace}sp/get-data-erl?whid=${PilihCabang}&from=${formattedStartDate}&to=${formattedEndDate}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            setLoading(false);
            Refresh();
            notification.success({
                message: data.data.status.message,
            });
            console.log(data.response);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                notification.error({
                    message: error?.response?.data?.status?.message,
                });
            } else {
                console.log("error");
            }
        }
    };
    

    const Refresh = async () => {
        const datanya = await axios.get(`${BaseUrlRace}sp/get-data-pesanan?page=${Data?.paggination}&limit=${Data?.size}&keyword=${Keyword}&cabang=${IDCabang}`,
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
        const datanya = await axios.get(`${BaseUrlRace}sp/get-data-pesanan?page=${Data?.paggination}&limit=${Data?.size}&keyword=${Keyword}&cabang=${IDCabang}`,
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
            title: 'Pic Nik',
            dataIndex: 'pic_nik',
            key: 'pic_nik',
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
            title: 'cabangid',
            dataIndex: 'cabangid',
            key: 'cabangid',
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
            title: 'Ikat',
            dataIndex: 'ikat',
            key: 'ikat',
        },
        {
            title: 'Koli',
            dataIndex: 'koli',
            key: 'koli',
        },
        {
            title: 'Qty',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'Berat',
            dataIndex: 'berat',
            key: 'berat',
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
            setOptionsStateZustand(data.data.data)
        } catch (error) {

        }
    }
    console.log(`Loading`, Loading);
    return (
        <div>
            <Card>
                <Row >
                    <Col style={{ backgroundColor: "" }} >
                        <Select
                            placeholder={IDCabang}
                            style={{ width: "100%", marginRight: 20 }}
                            onChange={(e, i) => { setIDCabang(i?.children?.[0]); setPilihCabang(e); console.log(e); }}
                        >
                            {optincabang && optincabang.map((i, index) => (
                                <Select.Option children={i} value={i?.whid}>{i?.cabangId} - {i?.description}</Select.Option>
                            ))}

                        </Select>

                    </Col>
                    <Col style={{ backgroundColor: "", marginLeft: 10 }}>
                        <RangePicker
                            defaultValue={[defaultStartDate, defaultEndDate]}
                            disabled={!IDCabang}
                            onChange={datenya}
                        />

                    </Col>
                    <Col style={{ marginLeft: 10 }} >
                        <Button type='primary' onClick={GetDataTanggal}>
                            {Loading === true ? <>Loading</> : <> Sync Data</>}
                        </Button>

                    </Col>
                    <Col style={{ backgroundColor: "" }}>
                        <Button style={{ backgroundColor: "" }} disabled={!IDCabang} onClick={() => setModal1Open(true)} type='danger'>Create SP</Button>

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
                <ModalCreateaSPRace IDCabang={IDCabang} Refresh={Refresh} modal1Open={modal1Open} setModal1Open={setModal1Open} />
            </Card>
        </div>
    )
}

export default Erlangga