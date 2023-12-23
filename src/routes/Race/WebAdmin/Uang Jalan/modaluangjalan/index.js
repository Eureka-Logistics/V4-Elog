import { DatePicker, Input, Modal, Select } from 'antd'
import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import ListDriverZustand from '../../../../../zustand/Store/Race/fetch/List Driver/ListDriver'

function ModalUangJalan({ isidaridrivermapping, ModalOpen, setModalOpen, jenismobil, UangJalan, setTol, PerhitunganParkir, setJarak, setLiterPerKM, DataApi, PerhitunganBBM, formatIDR, HargaSelect, setHargaSelect, setDataSelectdanHitungan, DataSelectdanHitungan }) {
    const { FetchDriver, ListDriver } = ListDriverZustand()
    useEffect(() => {
        FetchDriver()
    }, [])
    console.log(`ListDriver`, isidaridrivermapping);
    return (
        <div>
            <Modal open={ModalOpen}
                onCancel={() => setModalOpen(false)}
                title="Buat Uang Jalan"
                width={1000}

            >
                <Row>
                    <Col>
                        <div className='d-flex flex-column'>
                            <div className='mb-1'>Pilih Tanggal Kiriman</div>
                            <DatePicker />
                        </div>
                    </Col>
                    <Col>
                        <div className='d-flex flex-column'>
                            <div className='mb-1'>pilih driver yang akan mengirim</div>
                            <Select showSearch optionFilterProp='children'>
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
                            <Select showSearch optionFilterProp='children' defaultValue="Pilih Jenis BBM" onChange={(e, w) => { setDataSelectdanHitungan(w) }} style={{ width: "100%" }}>
                                {
                                    DataApi && DataApi?.map((item) => (
                                        <Select.Option Option={item} key={item.nama_bbm} value={item.nama_bbm}>
                                            {item.nama_bbm}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </div>
                    </Col>
                    <Col>
                        <div className='d-flex flex-column'>
                            <div className='mb-1'>Provinsi</div>
                            <Select defaultValue="Pilih Provinsi" showSearch optionFilterProp='children' onChange={(e, w) => { setHargaSelect(w.Option.harga) }} style={{ width: "100%" }}>
                                {
                                    DataSelectdanHitungan?.Option && DataSelectdanHitungan?.Option?.data?.map((item) => (
                                        <Select.Option key={item.id} Option={item} value={item.provinsi}>
                                            {item.provinsi}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='d-flex flex-column mt-3'>
                            <div className='mb-1'>Harga Sekarang</div>
                            <Input value={formatIDR(HargaSelect)} />
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
                            <Input onChange={(e) => setJarak(e.target.value)} type='number'></Input>
                        </div>
                    </Col>
                    <Col>
                        <div className='d-flex flex-column mt-3'>
                            <div className='mb-1'>Input Uang Tol</div>
                            <Input onChange={(e) => setTol(e.target.value)} type='number'></Input>
                        </div>
                    </Col>

                </Row>
                <Row>
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