import { Form, Input, Modal, Select, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ComponentGerakinPosisiMaps from '../componentmaps'
import useCoordinateRaceMap from '../../../../../zustand/Store/coordinateMapRace/RaceMaps'
import axios from 'axios'
import { BaseUrlRace } from '../../../../../Api/BaseUrl'

function ModalCreateAlamatSekolah({ setmodal1Open, modal1Open, ListSekolah }) {
    const { AlamatDetailCustomer, lattitudemap, longtitudemap } = useCoordinateRaceMap()

    const [IsiInputan, setIsiInputan] = useState({
        NamaSekolah: "",
        AlamatManual: "",
        id_provinsi: "",
        id_kecamatan: "",
        id_kota: "",
        KodeWilayah: "",
        kode_wilayah: ""
    })

    const [SelectProvinsiKecamatan, setSelectProvinsiKecamatan] = useState("")

    function Inputan(e) {
        const { id, value } = e.target;
        console.log(id, value);
        setIsiInputan(prevState => ({
            ...prevState,
            [id]: value,
        }));
    }
    
    const BuatSekolah = async () => {
        try {
            const body = {
                "sekolah": IsiInputan?.NamaSekolah,
                "alamat": IsiInputan?.AlamatManual,
                "id_kecamatan": IsiInputan?.id_kecamatan,
                "id_kota": IsiInputan?.id_kota,
                "id_provinsi": IsiInputan?.id_provinsi,
                "kecamatan": IsiInputan?.NamaKecamatan,
                "kota": IsiInputan?.NamaKota,
                "kode_wilayah": IsiInputan?.kode_wilayah,
                "lat": lattitudemap,
                "lon": longtitudemap
            }

            const data = await axios.post(`${BaseUrlRace}sp/create-Sekolah`, body,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            console.log(`dari creat sekolah`, data);
            notification.success({
                message: "sukses",
                description: data?.data?.status?.message

            })
            ListSekolah()
            setmodal1Open(false)
            setIsiInputan("")
        } catch (error) {
            notification.error({
                message: "Terjadi Error",
                description: error.response?.data?.status?.message
            });
        }
    }
    const KecamatandanProvinsi = async (key = "") => {
        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-select-Sekolah?id_provinsi=${IsiInputan.id_provinsi}&id_kota=${IsiInputan?.id_kota}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            console.log(`inikecamatan`, data.data);
            setSelectProvinsiKecamatan(data.data)
        } catch (error) { }
    };
    useEffect(() => {
        KecamatandanProvinsi()
    }, [IsiInputan.id_provinsi, IsiInputan?.id_kota])
    console.log(`lattitudemap`,);
    return (
        <div>
            <Modal
                title="Create Alamat Sekolah Baru"
                style={{ top: 20 }}
                width={1000}
                open={modal1Open}
                onOk={() => {
                    BuatSekolah()
                }}
                onCancel={() => setmodal1Open(false)}
            >
                <Form>
                    <div style={{ width: "100%" }}>
                        <ComponentGerakinPosisiMaps
                            width="100%"
                            height={250}
                        />
                    </div>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <Form.Item >
                                Sekolah
                                <Input
                                    id="NamaSekolah"
                                    onChange={Inputan}
                                    value={IsiInputan.NamaSekolah}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Col >
                        <Form.Item>
                            Alamat Manual
                            <Input id='AlamatManual' onChange={(e) => Inputan(e)} value={IsiInputan.AlamatManual} />
                        </Form.Item>
                    </Col>
                    <Col >
                        <Form.Item>
                            Alamat Sesuai Titik
                            <Input disabled value={AlamatDetailCustomer} />
                        </Form.Item>
                    </Col>
                    <Row style={{ backgroundColor: "", width: "100%" }}>
                        <Col md={3} style={{ backgroundColor: "" }} className=''>
                            <Form.Item>
                                Provinsi
                                <Select
                                    id='id_provinsi'
                                    onChange={(e, o) => {
                                        console.log(e);
                                        setIsiInputan(prevState => ({
                                            ...prevState,
                                            id_provinsi: e,
                                            id_kota: "",
                                            id_kecamatan: "",

                                        }));
                                    }}
                                    value={IsiInputan?.id_provinsi}
                                >
                                    {SelectProvinsiKecamatan && SelectProvinsiKecamatan?.provinsi?.map((item) => (
                                        <Select.Option value={item?.id_provinsi}>{item?.provinsi}</Select.Option>
                                    ))}
                                </Select>
                                {/* <Input onChange={(e) => Inputan(e)} id='Provinsi' value={IsiInputan.Provinsi} /> */}
                            </Form.Item>
                        </Col>
                        <Col md={3} style={{ backgroundColor: "", marginLeft: 15 }} className='mr-3'>
                            <Form.Item>
                                Kota
                                {/* <Input onChange={(e) => Inputan(e)} id='Kota' value={IsiInputan.Kota} /> */}
                                <Select
                                    id='id_kota'
                                    onChange={(e, o) => {
                                        console.log(e, o);
                                        setIsiInputan(prevState => ({
                                            ...prevState,
                                            id_kota: e,
                                            id_kecamatan: "",
                                            NamaKota: o?.children
                                        }));
                                    }}
                                    value={IsiInputan?.id_kota}
                                >
                                    {SelectProvinsiKecamatan && Array.isArray(SelectProvinsiKecamatan.kota) && SelectProvinsiKecamatan.kota.map((item) => (
                                        <Select.Option children={item} key={item?.id_kota} value={item?.id_kota}>{item?.kota}</Select.Option>
                                    ))}

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={2} style={{ backgroundColor: "", marginLeft: 15 }} className='mr-3'>
                            <Form.Item>
                                Kecamatan
                                {/* <Input onChange={(e) => Inputan(e)} id='KodeWilayah' value={IsiInputan.KodeWilayah} /> */}
                                <Select
                                    id='id_kecamatan'
                                    onChange={(e, o) => {
                                        console.log(e, o);
                                        setIsiInputan(prevState => ({
                                            ...prevState,
                                            id_kecamatan: e,
                                            NamaKecamatan: o?.children,
                                        }));
                                    }}
                                    value={IsiInputan?.id_kecamatan}
                                >
                                    {SelectProvinsiKecamatan && Array.isArray(SelectProvinsiKecamatan.kecamatan) && SelectProvinsiKecamatan.kecamatan.map((item) => (
                                        <Select.Option children={item} key={item?.id_kecamatan} value={item?.id_kecamatan}>{item?.kecamatan}</Select.Option>
                                    ))}

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={3} style={{ backgroundColor: "", marginLeft: 15 }} className='mr-3'>
                            <Form.Item>
                                Kode Post
                                {/* <Input onChange={(e) => Inputan(e)} id='KodeWilayah' value={IsiInputan.KodeWilayah} /> */}
                                <Input
                                    id='kode_wilayah'
                                    onChange={(e) => {
                                        console.log(e);
                                        setIsiInputan(prevState => ({
                                            ...prevState,
                                            kode_wilayah: e.target.value,
                                        }));
                                    }}
                                    value={IsiInputan?.kode_wilayah}
                                >


                                </Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ backgroundColor: "", width: "100%" }}>
                        <Col md={4} style={{ backgroundColor: "" }} className=''>
                            <Form.Item>
                                Latitude
                                <Input disabled value={lattitudemap} />
                            </Form.Item>
                        </Col>
                        <Col md={4} style={{ backgroundColor: "", marginLeft: 20 }} className='mr-3'>
                            <Form.Item>
                                Longitude
                                <Input disabled value={longtitudemap} />
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>

            </Modal>
        </div>
    )
}

export default ModalCreateAlamatSekolah