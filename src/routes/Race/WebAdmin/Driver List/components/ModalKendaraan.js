import { Button, DatePicker, Input, Modal, Select, Upload } from 'antd'
import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import ListDriverZustand from '../../../../../zustand/Store/Race/fetch/List Driver/ListDriver';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ListVehicleZustand } from '../../../../../zustand/Store/Race/fetch/List Vehicle/ListVehicle';

function ModalKendaraan({ OpenModal, setOpenModal }) {
    console.log(`openmodal`, OpenModal);
    const { FetchDriver, DetailDriver, DriverID, BuatVehicle, filteroptionsjenisKepemilikanDanStatus, EditVehicle, OptionsGetSelect, loading } = ListDriverZustand()
    const { selectGetSelect } = ListVehicleZustand();
    console.log(`DetailDriver`, OptionsGetSelect);
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
console.log(`DetailDriver`,DetailDriver);
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
                confirmLoading={loading == true}
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
                        <DatePicker id='dateIn' format={"YYYY-MM-DD"} value={DetailDriver?.dateIn ? moment(DetailDriver?.dateIn, "YYYY-MM-DD") : null}
                            onChange={(date, dateString) => { console.log(dateString); gantivalue({ target: { id: 'dateIn', value: dateString } }) }}
                        />
                        <div className='mt-3'>Tanggal SIM</div>
                        <DatePicker id='simDate' format={"YYYY-MM-DD"} value={DetailDriver?.simDate ? moment(DetailDriver?.simDate, "YYYY-MM-DD") : null}
                            onChange={(date, dateString) => { console.log(dateString); gantivalue({ target: { id: 'simDate', value: dateString } }) }}
                        />
                        <div className='mt-3'>Tanggal Lahir</div>
                        <DatePicker id="dateBirth" format={"YYYY-MM-DD"} value={DetailDriver?.dateBirth ? moment(DetailDriver?.dateBirth, "YYYY-MM-DD") : null}
                            onChange={(date, dateString) => { console.log(dateString); gantivalue({ target: { id: 'dateBirth', value: dateString } }) }}
                        />
                    </Col>
                    <Col>
                        <div>Nik</div>
                        <Input id="nik" value={DetailDriver?.nik} onChange={gantivalue} placeholder='Masukkan NIK' />
                        <div className='mt-2'>Nama Driver</div>
                        <Input id="driverName" value={DetailDriver?.driverName} onChange={gantivalue} placeholder='Masukkan Nama Driver' />
                        <div className='mt-2'>Jenis Driver</div>
                        <Select id="jenisKepemilikan" value={DetailDriver?.jenisKepemilikan} onChange={(e) => gantivalue({ target: { id: 'jenisKepemilikan', value: e } })} style={{ width: "100%" }} placeholder='Pilih Jenis Driver' >

                            <Select.Option value={""}>
                                -
                            </Select.Option>
                            {filteroptionsjenisKepemilikanDanStatus && filteroptionsjenisKepemilikanDanStatus?.filterKepemilikan.map((item, index) => (
                                <Select.Option value={item?.jenis}>
                                    {item?.jenis}
                                </Select.Option>
                            ))}
                        </Select>
                        <div className="mt-2 mb-2">Cabang</div>
                        <Select
                            id="cabang"
                            onChange={(e) => gantivalue({ target: { id: 'cabang', value: e } })}
                            value={DetailDriver?.cabang}
                            placeholder="Masukkan Cabang"
                            style={{ width: "100%" }}
                        >
                            {selectGetSelect && selectGetSelect?.cabang.map((item, index) => (
                                <Select.Option value={item.idbuBrench}>
                                    {item.cabang}
                                </Select.Option>
                            ))}

                        </Select>
                        <div className='mt-2'>Perusahaan</div>
                        <Select id="mitra" showSearch optionFilterProp='children' value={DetailDriver?.mitra} onChange={(e, option) => {
                            // Update 'mitra'
                            console.log(option);
                            gantivalue({ target: { id: 'id_mitra', value: option.Option.id } });
                            gantivalue({ target: { id: 'mitra', value: e } });

                            // Update 'id_mitra' in Zustand store
                            ListDriverZustand.setState(prevState => ({
                                ...prevState,
                                DetailDriver: {
                                    ...prevState.DetailDriver,
                                    id_mitra: option.Option.id
                                }
                            }));
                        }}
                            style={{ width: "100%" }} placeholder='Pilih Perusahaan'
                        >
                            {selectGetSelect && selectGetSelect.mitra.map((item, option, index) => (
                                <Select.Option value={item.mitra} key={item.mitra} Option={item}>
                                    {item.mitra}
                                </Select.Option>
                            ))}
                        </Select>
                        <div className='mt-2'>No KTP</div>
                        <Input id="driverKtp" value={DetailDriver?.driverKtp} onChange={gantivalue} placeholder='Masukkan No KTP' />
                        <div className='mt-2'>No SIM</div>
                        <Input id="numberSim" value={DetailDriver?.numberSim} onChange={gantivalue} placeholder='Masukkan No SIM' />
                        <div className='mt-2'>Jenis SIM</div>
                        <Select id="simType" value={DetailDriver?.simType} onChange={(e) => gantivalue({ target: { id: 'simType', value: e } })} style={{ width: "100%" }} placeholder='Pilih Jenis SIM' >
                            {selectGetSelect && selectGetSelect.jenisSim.map((item) => (
                                <Select.Option value={item?.Jenis}>{item?.Jenis}</Select.Option>
                            ))}
                        </Select>
                        <div className='mt-2'>Agama</div>
                        <Input id="driverReligion" value={DetailDriver?.driverReligion} onChange={gantivalue} placeholder='Masukkan Agama' />

                    </Col>
                    <Col>
                        <div className='mt-2'>Alamat Driver</div>
                        <Input id="driverAddress" value={DetailDriver?.driverAddress} onChange={gantivalue} placeholder='Masukkan Alamat Driver' />
                        <div>No Telp 1 </div>
                        <Input id="noTelp1" value={DetailDriver?.noTelp1} onChange={gantivalue} placeholder='Masukkan No Telp 1' />
                        <div className='mt-2'>No Telp 2</div>
                        <Input id="noTelp2" value={DetailDriver?.noTelp2} onChange={gantivalue} placeholder='Masukkan No Telp 2' />
                        <div className='mt-2'>Email</div>
                        <Input id="driverEmail" value={DetailDriver?.driverEmail} onChange={gantivalue} placeholder='Masukkan Email' />
                        <div className='mt-2'>Tipe Kendaraan</div>
                        <Select id="vehicle" value={DetailDriver?.vehicle} onChange={(e) => gantivalue({ target: { id: 'vehicle', value: e } })} style={{ width: "100%" }} placeholder='Pilih Tipe Kendaraan'
                            showSearch
                            optionFilterProp='children'
                        >
                            {selectGetSelect && selectGetSelect.driverType.map((item, index) => (
                                <Select.Option value={item.tipe}>
                                    {item.tipe}
                                </Select.Option>
                            ))}
                        </Select>
                        <div className='mt-2'>Ukuran Seragam</div>
                        <Select id="ukuranSeragam" value={DetailDriver?.ukuranSeragam} onChange={(e) => gantivalue({ target: { id: 'ukuranSeragam', value: e } })} style={{ width: "100%" }} placeholder='Pilih Ukuran Seragam' >
                            {OptionsGetSelect && OptionsGetSelect?.ukuranSeragam.map((item, index) => (
                                <Select.Option value={item?.ukuran}>
                                    {item?.ukuran}
                                </Select.Option>
                            ))}
                        </Select>
                        <div className='mt-2'>Nama Bank</div>
                        <Input id="BankRekening" value={DetailDriver?.BankRekening} onChange={gantivalue} placeholder='Masukkan Nama Bank' />
                        <div className='mt-2'>Nomor Rekening</div>
                        <Input id="Norek" value={DetailDriver?.Norek} onChange={gantivalue} placeholder='Masukkan Nomor Rekening' />
                        {/* <div className='mt-2'>Total Penjualan</div>
                        <Input id="totalPenjualan" value={DetailDriver?.totalPenjualan} onChange={gantivalue} placeholder='Masukkan Total Penjualan' /> */}
                    </Col>

                </Row>
            </Modal>
        </div >
    )
}

export default ModalKendaraan