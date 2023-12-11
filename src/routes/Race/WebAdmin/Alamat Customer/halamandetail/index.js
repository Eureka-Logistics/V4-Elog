import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Button, Card, Form, Input, Select, notification } from 'antd';
import ComponentGerakinPosisiMaps from '../componentmaps';
import { BaseUrlRace } from '../../../../../Api/BaseUrl';
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useCoordinateRaceMap from '../../../../../zustand/Store/coordinateMapRace/RaceMaps';
import { getCoordinates } from '../../../../../Api/Geocode';
import ModalState from '../../../../../zustand/Store/Race/StateModal/Modal';
import ModalEditAlamat from './components/ModalEditAlamat';
import TableHistory from './components/TableHistory';

function HalamanDetailAlamatCustomer() {
    const id = useParams()
    const [EditAlamat, setEditAlamat] = useState(false)
    const [IsiInputan, setIsiInputan] = useState({
        NamaSekolah: "",
        AlamatManual: "",
        id_provinsi: "",
        id_kecamatan: "",
        id_kota: "",
        KodeWilayah: "",
        kode_wilayah: ""
    })

    console.log(`EditAlamat`, EditAlamat);
    const DetailListSekolah = async () => {
        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-Sekolah-detail?id=${id.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            console.log(`detail sekolah`, data.data);
            setIsiInputan(data.data);
        } catch (error) { }
    };
    useEffect(() => {
        DetailListSekolah()
    }, [])
    const { AlamatDetailCustomer, lattitudemap, longtitudemap } = useCoordinateRaceMap()
    const [SelectProvinsiKecamatan, setSelectProvinsiKecamatan] = useState("")

    const KecamatandanProvinsi = async (key = "") => {
        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-select-Sekolah?id_provinsi=${IsiInputan.id_provinsi}&id_kota=${IsiInputan?.id_kota}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            setSelectProvinsiKecamatan(data.data)
        } catch (error) { }
    };

    // Function obah alamat 
    const UbahCoordinate = async () => {
        const ubah = await getCoordinates(IsiInputan?.alamat)
    }

    useEffect(() => {
        UbahCoordinate()
        KecamatandanProvinsi()
    }, [IsiInputan.id_provinsi, IsiInputan?.id_kota])


    function Inputan(e) {
        const { id, value } = e.target;
        console.log(id, value);
        setIsiInputan(prevState => ({
            ...prevState,
            [id]: value,
        }));
    }
    const [LoadingEdit, setLoadingEdit] = useState(false)
    const EditSekolah = async (isiPesan) => {
        setLoadingEdit(true)
        try {
            const bodynya = {
                "id": parseInt(id.id),
                "sekolah": IsiInputan?.sekolah,
                "alamat": IsiInputan?.alamat,
                "id_kecamatan": IsiInputan?.id_kecamatan,
                "id_kota": IsiInputan?.id_kota,
                "id_provinsi": IsiInputan?.id_provinsi,
                "kecamatan": IsiInputan?.NamaKecamatan,
                "kota": IsiInputan?.NamaKota,
                "kode_wilayah": IsiInputan?.kode_wilayah,
                "lat": lattitudemap || IsiInputan?.lat,
                "history_pengiriman": isiPesan,
                "lon": longtitudemap || IsiInputan?.lon
            }
            const data = await axios.post(`${BaseUrlRace}sp/update-Sekolah`, bodynya, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            console.log(`detail sekolah`, data.data);
            notification.success({
                message: "Sukses",
                description: data.data?.status?.message
            })
        } catch (error) {
            notification.error({
                message: "Error",
                description: error?.response?.data.status.message
            })
        }
        setLoadingEdit(false)
        DetailListSekolah()
    };
    return (
        <div>
            <Row>

                <div className='d-flex justify-content-center' style={{ width: '100%', backgroundColor: "" }}>
                    <Card style={{ width: '100%' }} title={"Detail Alamat ||   Geser Titik Untuk Merubah Alamat Mapsnya"}>
                        <Row>
                            <Col>
                                <ComponentGerakinPosisiMaps
                                    width={"90%"}
                                    height={400}
                                />
                            </Col>
                            <Col>
                                <div>
                                    <Form>
                                        <Row className=''>
                                            <Col >
                                                <Form.Item >
                                                    Sekolah
                                                    <Input
                                                        style={{ width: "100%" }}
                                                        id="sekolah"
                                                        onChange={Inputan}
                                                        value={IsiInputan?.sekolah}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Col >
                                            <Form.Item>
                                                Alamat Manual
                                                <Input id='alamat' onChange={(e) => Inputan(e)} value={IsiInputan?.alamat} />
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
                                                        showSearch
                                                        optionFilterProp='children'
                                                        onChange={(e, o) => {
                                                            console.log(e);
                                                            setIsiInputan(prevState => ({
                                                                ...prevState,
                                                                id_provinsi: e,
                                                                provinsi: e,
                                                                id_kota: "",
                                                                id_kecamatan: "",

                                                            }));
                                                        }}
                                                        value={IsiInputan?.provinsi}
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
                                                        id='kota'
                                                        showSearch
                                                        optionFilterProp='children'
                                                        onChange={(e, o) => {
                                                            console.log(e, o);
                                                            setIsiInputan(prevState => ({
                                                                ...prevState,
                                                                id_kota: e,
                                                                kota: e,
                                                                id_kecamatan: "",
                                                                NamaKota: o?.children
                                                            }));
                                                        }}
                                                        value={IsiInputan?.kota}
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
                                                        showSearch
                                                        optionFilterProp='children'
                                                        id='kecamatan'
                                                        onChange={(e, o) => {
                                                            console.log(e, o);
                                                            setIsiInputan(prevState => ({
                                                                ...prevState,
                                                                id_kecamatan: e,
                                                                kecamatan: e,
                                                                NamaKecamatan: o?.children,
                                                            }));
                                                        }}
                                                        value={IsiInputan?.kecamatan}
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
                                                        id='kodeWilayah'
                                                        onChange={(e) => {
                                                            console.log(e.target.value);
                                                            setIsiInputan(prevState => ({
                                                                ...prevState,
                                                                kodeWilayah: e.target.value,
                                                                kode_wilayah: e.target.value,
                                                            }));
                                                        }}
                                                        value={IsiInputan?.kodeWilayah}
                                                    >


                                                    </Input>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row style={{ backgroundColor: "", width: "100%" }}>
                                            <Col style={{ backgroundColor: "" }} className=''>
                                                <Form.Item>
                                                    Latitude
                                                    <Input id='lat' disabled value={lattitudemap || IsiInputan?.lat} />
                                                </Form.Item>
                                            </Col>
                                            <Col style={{ backgroundColor: "", marginLeft: 20 }} className='mr-3'>
                                                <Form.Item>
                                                    Longitude
                                                    <Input id='lon' disabled value={longtitudemap || IsiInputan?.lon} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                    </Form>
                                </div>
                                <div className='d-flex justify-content-end mt-5 ' style={{}}>
                                    <Button size='large' disabled={LoadingEdit} onClick={() => setEditAlamat(true)
                                    } type='danger'>{LoadingEdit ? <>Loading</> : <>Save Edit</>}</Button>
                                </div>
                            </Col>
                        </Row>


                        {IsiInputan?.history?.length > 0 && (
                            <TableHistory IsiInputan={IsiInputan} />
                        )}
                    </Card>
                </div>
            </Row>
            <ModalEditAlamat EditSekolah={EditSekolah} EditAlamat={EditAlamat} setEditAlamat={setEditAlamat} />
        </div>
    );
}

export default HalamanDetailAlamatCustomer;
