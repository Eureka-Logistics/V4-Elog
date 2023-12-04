import { Button, DatePicker, Input, Modal, Select, Upload } from 'antd'
import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import ListDriverZustand from '../../../../../zustand/Store/Race/fetch/List Driver/ListDriver';
import { UploadOutlined } from '@ant-design/icons';

function ModalKendaraan({ OpenModal, setOpenModal }) {
    console.log(`openmodal`, OpenModal);
    const { FetchDriver, DetailDriver, DriverID } = ListDriverZustand()
    console.log(`DetailDriver`, DetailDriver);
    function NamaModal() {
        if (DriverID != null) {
            return "Edit Detail Driver"
        } else {
            return "Buat Driver"
        }
    }
    return (
        <div>
            <Modal
                title={NamaModal()}
                open={OpenModal}
                onCancel={() => {
                    ListDriverZustand.setState({ DriverID: null })
                    setOpenModal(false)
                }}
                width={1200}
                style={{
                    top: 20,
                }}
            >
                <Row style={{ backgroundColor: "" }}>
                    <Col >
                        <div style={{ backgroundColor: "", maxHeight: "200px", minHeight: "200px", border: "1px solid black" }}>
                            <div className='d-flex justify-content-center'>Ini Gambar</div>
                        </div>
                        <div className='mt-5'>Upload Gambar</div>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                        <div className='mt-3'>Tanggal Masuk</div>
                        <DatePicker />
                        <div className='mt-3'>Tanggal SIM</div>
                        <DatePicker />
                        <div className='mt-3'>Tanggal Lahir</div>
                        <DatePicker />
                    </Col>
                    <Col >
                        <div>Nik</div>
                        <Input value={DetailDriver?.nik} placeholder='Masukkan NIK' />
                        <div className='mt-2'>Nama Driver</div>
                        <Input value={DetailDriver?.driverName} placeholder='Masukkan Nama Driver' />
                        <div className='mt-2'>Jenis Driver</div>
                        <Select value={DetailDriver?.nik} style={{ width: "100%" }} placeholder='Masukkan NIK' />
                        <div className='mt-2'>Perusahaan</div>
                        <Select value={DetailDriver?.driverName} style={{ width: "100%" }} placeholder='Masukkan NIK' />
                        <div className='mt-2'>No KTP</div>
                        <Input value={DetailDriver?.driverName} placeholder='Masukkan NIK' />
                        <div className='mt-2'>No SIM</div>
                        <Input value={DetailDriver?.driverName} placeholder='Masukkan NIK' />
                        <div className='mt-2'>Jenis SIM</div>
                        <Select value={DetailDriver?.driverName} style={{ width: "100%" }} placeholder='Masukkan NIK' />
                        <div className='mt-2'>Agama</div>
                        <Input value={DetailDriver?.driverName} placeholder='Masukkan NIK' />

                    </Col>
                    <Col >
                        <div className=''>No Telp</div>
                        <Input value={DetailDriver?.driverName} placeholder='Masukkan NIK' />
                        <div className='mt-2'>Agama</div>
                        <Select value={DetailDriver?.driverName} style={{ width: "100%" }} placeholder='Masukkan NIK' />
                        <div className='mt-2'>Email</div>
                        <Input value={DetailDriver?.driverName} placeholder='Masukkan NIK' />
                        <div className='mt-2'>Vehicle Type</div>
                        <Select value={DetailDriver?.driverName} style={{ width: "100%" }} placeholder='Masukkan NIK' />
                        <div className='mt-2'>Ukuran Seragam</div>
                        <Select style={{ width: "100%" }} placeholder='Masukkan NIK' />
                        <div className='mt-2'>Nama Bank</div>
                        <Input placeholder='Masukkan NIK' />
                        <div className='mt-2'>Nomor Rekening</div>
                        <Input placeholder='Masukkan NIK' />
                        <div className='mt-2'>Alamat :</div>
                        <Input placeholder='Masukkan NIK' />
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default ModalKendaraan