import { DatePicker, Input, Modal, Select, notification } from 'antd'
import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import ListDriverZustand from '../../../../../zustand/Store/Race/fetch/List Driver/ListDriver'
import { UangJalanZustand } from '../../../../../zustand/Store/Race/fetch/uangjalan'

function ModalUangJalan({ perhitunganParkir, uangjalanstate, isidaridrivermapping, pterhitunganbbm, ModalOpen, setModalOpen, jenismobil, UangJalan, setTol, PerhitunganParkir, setJarak, setLiterPerKM, DataApi, PerhitunganBBM, formatIDR, HargaSelect, setHargaSelect, setDataSelectdanHitungan, DataSelectdanHitungan }) {
    const { FetchDriver, ListDriver } = ListDriverZustand()
    const { isiinputanuangjalan, postuangjalan, addisiinputanuangjalan, isibbm, perhitunganParkirstate, close, uangjalanstatezustand, fetchoptionuangjalan, optionprovinsi } = UangJalanZustand()
    useEffect(() => {
        FetchDriver()
        fetchoptionuangjalan()
        addisiinputanuangjalan(pterhitunganbbm)
        UangJalanZustand.setState({ perhitunganParkirstate: perhitunganParkir })
        UangJalanZustand.setState({ uangjalanstatezustand: uangjalanstate })
    }, [pterhitunganbbm])

    console.log(`isibbm`, isibbm);
    console.log(`perhitunganParkirstate`, perhitunganParkirstate);

    return (
        <div>
            <Modal open={ModalOpen}
                onCancel={() => setModalOpen(false)}
                title="Buat Uang Jalan"
                width={1000}

                onOk={() => {
                    if (isiinputanuangjalan) {
                        postuangjalan(isiinputanuangjalan, setModalOpen(false))

                    } else {
                        notification.error({
                            message: "Data harus diisi!"
                        })
                    }
                }}

            >
                <Row>
                    {/* <Col>
                        <div className='d-flex flex-column'>
                            <div className='mb-1'>Pilih Tanggal Kiriman</div>
                            <DatePicker onChange={(e, w) => {
                                UangJalanZustand.setState(state => ({
                                    ...state,
                                    isiinputanuangjalan: {
                                        ...state.isiinputanuangjalan,
                                        tgl_kirim: w
                                    }
                                }));

                                console.log(w)
                            }} />
                        </div>
                    </Col> */}
                    <Col>
                        <div className='d-flex flex-column'>
                            <div className='mb-1'>pilih driver yang akan mengirim</div>
                            <Select showSearch optionFilterProp='children' onChange={(e, w) => {
                                UangJalanZustand.setState(state => ({
                                    ...state,
                                    isiinputanuangjalan: {
                                        ...state.isiinputanuangjalan,
                                        idDriver: e
                                    }
                                }));
                                console.log(e, w)
                            }} >
                                {isidaridrivermapping.data && isidaridrivermapping?.data?.Driver && isidaridrivermapping?.data?.Driver?.map((item) => (
                                    <Select.Option key={item?.idDriver} value={item?.idDriver}>
                                        {item?.driverName}
                                    </Select.Option>

                                ))}
                            </Select>
                        </div>
                    </Col>
                    <Col>
                        <div className='d-flex flex-column'>
                            <div className='mb-1'>Jenis BBM</div>
                            <Select showSearch optionFilterProp='children' defaultValue="Pilih Jenis BBM" onChange={(e, w) => {
                                UangJalanZustand.setState(state => ({
                                    ...state,
                                    isiinputanuangjalan: {
                                        ...state.isiinputanuangjalan,
                                        nama_bbm: e
                                    }
                                }));
                                setDataSelectdanHitungan(w)
                            }} style={{ width: "100%" }}>
                                {
                                    optionprovinsi && optionprovinsi?.jenisBBM?.map((item) => (
                                        <Select.Option Option={item} key={item.idprovinsi} value={item.bbm}>
                                            {item.bbm}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </div>
                    </Col>
                    <Col>
                        <div className='d-flex flex-column'>
                            <div className='mb-1'>Provinsi</div>
                            <Select defaultValue="Pilih Provinsi" showSearch optionFilterProp='children' onChange={(e, w) => {
                                UangJalanZustand.setState(state => ({
                                    ...state,
                                    isiinputanuangjalan: {
                                        ...state.isiinputanuangjalan,
                                        provinsi: e
                                    }
                                }));
                                setHargaSelect(w.Option.harga)
                            }} style={{ width: "100%" }}>
                                {
                                    optionprovinsi && optionprovinsi?.provisi?.map((item) => (
                                        <Select.Option Option={item} key={item.idprovinsi} value={item.nama_bbm}>
                                            {item.provinsi}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </div>
                    </Col>
                    <Col>
                        <div className='d-flex flex-column'>
                            <div className='mb-1'>Uang Makan Driver</div>
                            <Input placeholder='Uang Makan Driver' onChange={(e) => {
                                UangJalanZustand.setState(state => ({
                                    ...state,
                                    isiinputanuangjalan: {
                                        ...state.isiinputanuangjalan,
                                        makan: e.target.value
                                    }
                                }));

                            }}></Input>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='d-flex flex-column mt-3'>
                            <div className='mb-1'>Harga Sekarang</div>
                            <Input value={isiinputanuangjalan.hargaselect}
                                onChange={(e, w) => {
                                    UangJalanZustand.setState(state => ({
                                        ...state,
                                        isiinputanuangjalan: {
                                            ...state.isiinputanuangjalan,
                                            hargaselect: e.target.value
                                        }
                                    }));
                                    setHargaSelect(e.target.value)
                                    console.log(e.target.value);
                                }}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className='d-flex flex-column mt-3'>
                            <div className='mb-1'>Jenis Kendaraan</div>
                            <Select style={{ width: "100%" }} onChange={(e, w) => { setLiterPerKM(w.Option?.jarak_liter) }} defaultValue="Pilih Jenis Kendaraan">
                                {jenismobil.map((item) => (
                                    <Select.Option key={item.id} Option={item} value={item.nama_kendaraan_jenis}>
                                        {item.nama_kendaraan_jenis + " " + item?.jarak_liter + "KM/L" + " " + "(" + item?.bbm + ")"}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                    </Col>
                    <Col>
                        <div className='d-flex flex-column mt-3'>
                            <div className='mb-1'>Jarak / km</div>
                            <Input onChange={(e) => {
                                setJarak(e.target.value)
                                UangJalanZustand.setState(state => ({
                                    ...state,
                                    isiinputanuangjalan: {
                                        ...state.isiinputanuangjalan,
                                        jarak: e.target.value
                                    }
                                }));
                            }} type='number'></Input>
                        </div>
                    </Col>
                    <Col>
                        <div className='d-flex flex-column mt-3'>
                            <div className='mb-1'>Input Uang Tol</div>
                            <Input onChange={(e) => {
                                UangJalanZustand.setState(state => ({
                                    ...state,
                                    isiinputanuangjalan: {
                                        ...state.isiinputanuangjalan,
                                        tol: e.target.value
                                    }
                                }));
                                setTol(e.target.value)
                            }} type='number'></Input>
                        </div>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <div className='d-flex flex-column mt-3'>
                            <div className='mb-1'>No Rek Driver</div>
                            <Input placeholder='No Rek Driver' onChange={(e) => {
                                UangJalanZustand.setState(state => ({
                                    ...state,
                                    isiinputanuangjalan: {
                                        ...state.isiinputanuangjalan,
                                        no_rek_driver: e.target.value
                                    }
                                }));
                            }}></Input>
                        </div>
                    </Col>
                    <Col>
                        <div className='d-flex flex-column mt-3'>
                            <div className='mb-1'>Perhitungan BBM</div>
                            <Input value={PerhitunganBBM()}></Input>
                        </div>
                    </Col>
                    <Col>
                        <div className='d-flex flex-column mt-3'>
                            <div className='mb-1'>Perhitungan Parkir</div>
                            <Input value={PerhitunganParkir()}></Input>
                        </div>
                    </Col>

                    <Col>
                        <div className='d-flex flex-column mt-3'>
                            <div className='mb-1'>Perhitungan Uang Jalan</div>
                            <Input value={UangJalan()}></Input>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default ModalUangJalan