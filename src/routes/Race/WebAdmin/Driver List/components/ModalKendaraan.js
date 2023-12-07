import { Button, DatePicker, Input, Modal, Select, Upload } from 'antd'
import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import ListDriverZustand from '../../../../../zustand/Store/Race/fetch/List Driver/ListDriver';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ListVehicleZustand } from '../../../../../zustand/Store/Race/fetch/List Vehicle/ListVehicle';

function ModalKendaraan({ OpenModal, setOpenModal }) {
    console.log(`openmodal`, OpenModal);
    const { FetchDriver, DetailDriver, DriverID, BuatVehicle, EditVehicle } = ListDriverZustand()
    const { filteroptionsjenisKepemilikanDanStatus } = ListVehicleZustand()
    console.log(`DetailDriver`, DetailDriver);
    function NamaModal() {
        if (DriverID != null) {
            return "Edit Detail Driver";
        } else {
            return "Buat Driver";
        }
    }
    function gantivalue(e) {
        const { id, value } = e.target;
        ListDriverZustand.setState(prevState => ({
            ...prevState,
            DetailDriver: {
                ...prevState.DetailDriver,
                [id]: value
            }
        }));
    }
    function memilihCreteAtauEdit() {
        if (DriverID != null) {
            EditVehicle(DriverID, DetailDriver)

        } else {
            BuatVehicle(DetailDriver)
        }
    }

    const handleFileChange = (info) => {
        if (info.fileList.length > 0) {
            const lastFile = info.fileList[info.fileList.length - 1].originFileObj;
            ListDriverZustand.setState(prevState => ({
                ...prevState,
                DetailDriver: {
                    ...prevState.DetailDriver,
                    naruhgambar: lastFile
                }
            }));
        } else {
            // Clear the selection
        }
    };

    return (
        <div>
            <Modal
                title={NamaModal()}
                open={OpenModal}
                onCancel={() => {
                    ListDriverZustand.setState({ DriverID: null, DetailDriver: null })
                    setOpenModal(false)
                }}
                onOk={() => memilihCreteAtauEdit()}
                width={1200}
                style={{
                    top: 20,
                }}
            >
                <Row style={{ backgroundColor: "" }}>
                    <Col >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: "",
                            height: "250px",
                            maxHeight: "250px",
                            overflow: "hidden",
                            border: "1px solid black"
                        }}>
                            <img src={DetailDriver?.driverImage} style={{ maxWidth: '80%', height: 'auto', objectFit: 'cover' }} />
                        </div>

                        <div className='mt-5'>Upload Gambar</div>
                        <Upload
                            onChange={handleFileChange}

                            beforeUpload={() => false}
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                        <div className='mt-3'>Tanggal Masuk</div>
                        <DatePicker format={"YYYY-MM-DD"} value={DetailDriver?.dateIn ? moment(DetailDriver?.dateIn, "YYYY-MM-DD") : null} />
                        <div className='mt-3'>Tanggal SIM</div>
                        <DatePicker id='simDate' format={"YYYY-MM-DD"} value={DetailDriver?.simDate ? moment(DetailDriver?.simDate, "YYYY-MM-DD") : null} />
                        <div className='mt-3'>Tanggal Lahir</div>
                        <DatePicker id="dateBirth" format={"YYYY-MM-DD"} value={DetailDriver?.dateBirth ? moment(DetailDriver?.dateBirth, "YYYY-MM-DD") : null} />
                    </Col>
                    <Col>
                        <div>Nik</div>
                        <Input id="nik" value={DetailDriver?.nik} onChange={gantivalue} placeholder='Masukkan NIK' />
                        <div className='mt-2'>Nama Driver</div>
                        <Input id="driverName" value={DetailDriver?.driverName} onChange={gantivalue} placeholder='Masukkan Nama Driver' />
                        <div className='mt-2'>Jenis Driver</div>
                        <Select id="jenisKepemilikan" value={DetailDriver?.jenisKepemilikan} onChange={gantivalue} style={{ width: "100%" }} placeholder='Pilih Jenis Driver' >

                            <Select.Option value={""}>
                                -
                            </Select.Option>
                            {filteroptionsjenisKepemilikanDanStatus && filteroptionsjenisKepemilikanDanStatus?.filterKepemilikan.map((item, index) => (
                                <Select.Option value={item?.jenis}>
                                    {item?.jenis}
                                </Select.Option>
                            ))}
                        </Select>
                        <div className='mt-2'>Perusahaan</div>
                        <Select id="perusahaan" value={DetailDriver?.driverName} onChange={gantivalue} style={{ width: "100%" }} placeholder='Pilih Perusahaan' />
                        <div className='mt-2'>No KTP</div>
                        <Input id="driverKtp" value={DetailDriver?.driverKtp} onChange={gantivalue} placeholder='Masukkan No KTP' />
                        <div className='mt-2'>No SIM</div>
                        <Input id="numberSim" value={DetailDriver?.numberSim} onChange={gantivalue} placeholder='Masukkan No SIM' />
                        <div className='mt-2'>Jenis SIM</div>
                        <Select id="simType" value={DetailDriver?.simType} onChange={gantivalue} style={{ width: "100%" }} placeholder='Pilih Jenis SIM' />
                        <div className='mt-2'>Agama</div>
                        <Input id="driverReligion" value={DetailDriver?.driverReligion} onChange={gantivalue} placeholder='Masukkan Agama' />
                        <div className='mt-2'>Alamat Driver</div>
                        <Input id="driverAddress" value={DetailDriver?.driverAddress} onChange={gantivalue} placeholder='Masukkan Alamat Driver' />
                    </Col>
                    <Col>
                        <div>No Telp 1 </div>
                        <Input id="noTelp1" value={DetailDriver?.noTelp1} onChange={gantivalue} placeholder='Masukkan No Telp 1' />
                        <div className='mt-2'>No Telp 2</div>
                        <Input id="noTelp2" value={DetailDriver?.noTelp2} onChange={gantivalue} placeholder='Masukkan No Telp 2' />
                        <div className='mt-2'>Email</div>
                        <Input id="driverEmail" value={DetailDriver?.driverEmail} onChange={gantivalue} placeholder='Masukkan Email' />
                        <div className='mt-2'>Tipe Kendaraan</div>
                        <Select id="vehicle" value={DetailDriver?.vehicle} onChange={gantivalue} style={{ width: "100%" }} placeholder='Pilih Tipe Kendaraan' />
                        <div className='mt-2'>Ukuran Seragam</div>
                        <Select id="ukuranSeragam" value={DetailDriver?.ukuranSeragam} onChange={gantivalue} style={{ width: "100%" }} placeholder='Pilih Ukuran Seragam' />
                        <div className='mt-2'>Nama Bank</div>
                        <Input id="BankRekening" value={DetailDriver?.BankRekening} onChange={gantivalue} placeholder='Masukkan Nama Bank' />
                        <div className='mt-2'>Nomor Rekening</div>
                        <Input id="Norek" value={DetailDriver?.Norek} onChange={gantivalue} placeholder='Masukkan Nomor Rekening' />
                        <div className='mt-2'>Total Penjualan</div>
                        <Input id="totalPenjualan" value={DetailDriver?.totalPenjualan} onChange={gantivalue} placeholder='Masukkan Total Penjualan' />
                    </Col>

                </Row>
            </Modal>
        </div>
    )
}

export default ModalKendaraan