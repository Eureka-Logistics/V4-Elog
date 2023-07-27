import { message, Card, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Button, Form, Input } from 'antd';
import gambarorang from "./employee (1).png"
import axios from 'axios';
import Baseurl from '../../../../../Api/BaseUrl';
import ZustandStore from '../../../../../zustand/Store/JenisKepemilikanOptions';
import useMitraStore from '../../../../../zustand/Store/MitraStore';

function Index() {
    const { id } = useParams()
    const [DataDetail, setDataDetail] = useState("")
    const [kendaraan, setKendaraan] = useState(DataDetail.kendaraanPickup);
    const [kendaraan2, setKendaraan2] = useState(DataDetail.kendaraanMitra1);
    const [kendaraan3, setKendaraan3] = useState(DataDetail.kendaraanMitra2);
    const [NoPol1, setNoPol1] = useState(DataDetail.unit1);
    const [NoPol2, setNoPol2] = useState(DataDetail.unit2);
    const [NoPol3, setNoPol3] = useState(DataDetail.unit3);
    const [KendaraanMitra1, setKendaraanMitra1] = useState(DataDetail.mitraPickup)
    const [KendaraanMitra2, setKendaraanMitra2] = useState(DataDetail.mitra1)
    const [KendaraanMitra3, setKendaraanMitra3] = useState(DataDetail.mitra2)

    const { NamaMitra, fetchMitra } = useMitraStore((item) => ({
        NamaMitra: item.NamaMitra,
        fetchMitra: item.fetchMitra
    }))
    const onFinish = async (values) => {
        console.log('Success:', values);
        await EditSM()
        await DataDetailSM()
        message.success(`berhasil`)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const { DriverType, setDriverType } = ZustandStore((item) => ({
        DriverType: item.DriverType,
        setDriverType: item.setDriverType
    }))

    const DriverOptions = DriverType && DriverType.map((item) => ({
        label: item.tipe,
        value: item.id
    }))


    const DataDetailSM = async () => {
        const data = await axios.get(`${Baseurl}sm/get-sm-detail?id_msm=${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        }
        );
        setDataDetail(data.data.data?.[0])
    }




    useEffect(() => {
        DataDetailSM()
        setDriverType()
        fetchMitra()
    }, [])
    if (!DataDetail) {
        return "Memuat data...";
    }


    const handlePrint = () => {
        const printWindow = window.open(`https://elogs.eurekalogistics.co.id/operasional/sm/printsm/${id}`, '_blank');
    };



    const EditSM = async () => {
        try {
            const response = await axios.post(`${Baseurl}sm/edit-sm`, {
                id_msm: parseInt(id),
                berat: 0,
                quality: 0,
                koli: 0,
                do: 0,
                pickup_kendaraan: kendaraan,
                kendaraan: kendaraan2,
                kendaraan_2: kendaraan3,
                pickup_kontainer: 0,
                kontainer: 0,
                kontainer_2: 0,
                pickup_nopol: NoPol1,
                nopol: NoPol2,
                nopol_2: NoPol3,
                pickup_supir: 0,
                supir: 0,
                supir_2: 0,
                id_unit: 2,
                id_unit_2: 3,
                id_unit_3: 1,
                id_driver: 22,
                id_driver_2: 33,
                id_driver_3: 1,
                id_mitra_pickup: KendaraanMitra1,
                id_mitra: KendaraanMitra2,
                id_mitra_2: KendaraanMitra3
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <Card>

                <Form
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}

                    initialValues={DataDetail}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Row>
                        <h5>Detail SM</h5>
                        <Form.Item
                            wrapperCol={{
                                offset: 24,
                                span: 24,
                            }}
                            style={{ textAlign: 'end' }}
                        >
                            <div className="tombol">
                                <Button style={{ backgroundColor: "#00a65a", color: "white" }} htmlType="submit">
                                    Submit
                                </Button>
                                <Button onClick={handlePrint} type="primary" >
                                    Print SM
                                </Button>
                                <Button style={{ backgroundColor: "#3c8dbc", color: "white" }} >
                                    Tambah SM
                                </Button>
                                <Button type="danger" >
                                    Batal SM
                                </Button>
                            </div>

                        </Form.Item>
                        <Col sm={2}>

                            <Form.Item
                                label="No.SP"
                                name="sp"
                                rules={[
                                    {
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                                label="No. SM"
                                name="sm"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Do"
                                name="DO"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                        </Col>
                        <Col sm={3}>

                            <Form.Item
                                label="Service"
                                name="service"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                                label="Customer"
                                name="customer"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Pickup Date"
                                name="pickupDate"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Pickup Address"
                                name="pickupAddress"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>
                            {/* <Form.Item
                                label="Destination Address"
                                name="destination"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input disabled />
                            </Form.Item> */}
                            <Row>
                                <Col sm={6}>
                                    <Form.Item
                                        labelCol={{
                                            span: 24,
                                        }}
                                        wrapperCol={{
                                            span: 24,
                                        }}
                                        label="Weight"
                                        name="weight"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input
                                        />
                                    </Form.Item>
                                </Col>
                                <Col sm={6}>
                                    <Form.Item
                                        labelCol={{
                                            span: 24,
                                        }}
                                        wrapperCol={{
                                            span: 24,
                                        }}
                                        label="Koli"
                                        name="koli"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>

                                <Col sm={6}>
                                    <Form.Item
                                        label="Exp/pcs"
                                        labelCol={{
                                            span: 24,
                                        }}
                                        wrapperCol={{
                                            span: 24,
                                        }}
                                        name="expPcs"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col sm={6}>
                                    <Form.Item
                                        label="Items"
                                        name="items"
                                        wrapperCol={{
                                            span: 24,
                                        }}
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Col>

                        <Col sm={3}>

                            <Card style={{ width: "100%", height: 260 }}>
                                <img width="100%" src={gambarorang}></img>
                            </Card>


                        </Col>
                        <Col style={{ width: "75%", marginTop: -85 }} sm={8}>
                            <Form.Item
                                label="Memo"
                                name="memo"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: "75%" }} sm={8}>
                            <Form.Item
                                label="Destination Address"
                                name="destination"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Select disabled />
                            </Form.Item>
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col sm={4}>
                            <Form.Item
                                label="Kendaraan Mitra"
                                name="mitraPickup"

                            >
                                <Select optionFilterProp='children' showSearch
                                    onChange={(e) => { setKendaraanMitra1(e); console.log(e) }}
                                >
                                    {NamaMitra && NamaMitra.map((item) => (

                                        <option value={item.mitraId}>{item.NamaMitra}</option>
                                    ))}
                                </Select>


                            </Form.Item>
                            <Form.Item
                                label="Jenis Kendaraan Mitra"
                                name="kendaraanPickup"
                                initialValue="Default Value"

                            >
                                <Select
                                    showSearch
                                    placeholder="Jenis Kendaraan Mitra"
                                    optionFilterProp='label'
                                    options={DriverOptions}
                                    onChange={(e, options) => { console.log(options); setKendaraan(options.label) }}
                                    defaultValue={DataDetail.mitraPickup}
                                />

                            </Form.Item>
                            <Form.Item
                                label="Kode Kendaraan Mitra"
                                name="kodekendaraanmitra"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Nopol Pickup"
                                name="unit1"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input
                                    onChange={(e) => setNoPol1(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Supir Pickup"
                                name="driver1"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Hp Supir Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Kendaraan Mitra"
                                name="mitra1"

                            >
                                <Select optionFilterProp='children' showSearch
                                    onChange={(e) => { setKendaraanMitra2(e); }}
                                >
                                    {NamaMitra && NamaMitra.map((item) => (

                                        <option value={item.mitraId}>{item.NamaMitra}</option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Jenis Kendaraan Mitra"
                                name="kendaraanMitra1"

                            >
                                <Select
                                    showSearch
                                    placeholder="Jenis Kendaraan Mitra"
                                    optionFilterProp='label'
                                    options={DriverOptions}
                                    onChange={(e, options) => { console.log(options.label); setKendaraan2(options.label) }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Kode Kendaraan Mitra"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Nopol Pickup"
                                name="unit2"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input onChange={(e) => setNoPol2(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                label="Supir Pickup"
                                name="driver2"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Hp Supir Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Kendaraan Mitra"
                                name="mitra2"

                            >
                                <Select optionFilterProp='children' showSearch
                                    onChange={(e) => { setKendaraanMitra3(e); console.log(e) }}
                                >
                                    {NamaMitra && NamaMitra.map((item) => (

                                        <option value={item.mitraId}>{item.NamaMitra}</option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Jenis Kendaraan Mitra"
                                name="kendaraanMitra2"
                                initialValue={DataDetail.kendaraanPickup}
                            >
                                <Select
                                    showSearch
                                    placeholder="Jenis Kendaraan Mitra"
                                    optionFilterProp='label'
                                    options={DriverOptions}
                                    onChange={(e, options) => {
                                        console.log(options);
                                        setKendaraan3(options.label)
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Kode Kendaraan Mitra"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Nopol Pickup"
                                name="unit3"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input onChange={(e) => setNoPol3(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                label="Supir Pickup"
                                name="driver3"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Hp Supir Pickup"
                                name="destinasi"
                                rules={[
                                    {
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <hr />
                </Form>


            </Card>
        </>
    )
}

export default Index
