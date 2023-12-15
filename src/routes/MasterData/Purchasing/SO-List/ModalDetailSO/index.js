import { DatePicker, Input, Modal, Select, message, notification } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { httpClient } from '../../../../../Api/Api';
import Baseurl from '../../../../../Api/BaseUrl';

function ModalSOList({ CreatePoModal, setCreatePoModal, modal1Open, setModal1Open, DetailData, setDetailData, getlist, createPO }) {
    const [dataDetail, setdataDetail] = useState("")
    const [judul, setjudul] = useState("")

    async function judulasu() {
        if (CreatePoModal === true) {
            setjudul("Create PO")
            setDetailData("")
            console.log(`ada`);
        } else if (CreatePoModal === false) {
            setjudul('Edit Detail PO')
        }
    }


    const approvePO = async () => {
        try {
            const data = await axios.post(`${Baseurl}sm/create-po`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
        } catch (error) {

        }
    }

    useEffect(() => {
        judulasu();
    }, [CreatePoModal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdataDetail(value)

        if (name === 'kode_mitra') {
            setDetailData(prev => ({
                ...prev,
                mitra: {
                    ...prev.mitra,
                    kode_mitra: value
                }
            }));
        } else if (name === 'nama_mitra') {
            setDetailData(prev => ({
                ...prev,
                mitra: {
                    ...prev.mitra,
                    nama_mitra: value
                }
            }))
        } else if (name === 'jenis') {
            setDetailData(prev => ({
                ...prev,
                mitra: {
                    ...prev.mitra,
                    jenis: value
                }
            }))
        } else if (name === 'cabang') {
            setDetailData(prev => ({
                ...prev,
                mitra: {
                    ...prev.mitra,
                    cabang: value
                }
            }))
        }
        else {
            setDetailData(prev => ({
                ...prev,
                [name]: value

            }));

        }
        console.log(`DetailData`, DetailData);
        console.log(`DetailData.id_mpo`, DetailData.id_mpo);

    };

    const postEdit = async () => {
        try {
            const databody = {
                id_mpo: DetailData.id_mpo,
                ...DetailData
            }
            const response = await httpClient.post(`/sm/edit-po`, databody);
            console.log(response.data.status?.message)
            notification.success({
                message: response.data.status?.message
            })
            getlist()
            setModal1Open(false)
        } catch (error) {
        }
    }



    return (
        <div>
            <Modal
                title={judul}
                width={1000}
                style={{
                    top: 20,
                }}
                open={modal1Open}
                onOk={() => {
                    if (CreatePoModal === false) {
                        postEdit()
                        setCreatePoModal(false)
                    } else {
                        approvePO()
                    }

                }}
                onCancel={() => {
                    setModal1Open(false)
                    setCreatePoModal(false)
                }
                }
            >
                <Row>
                    <Col sm={4}>
                        <div>MPO</div>
                        <Input name="mpo" value={DetailData.mpo} onChange={handleChange} placeholder='mpo' />
                    </Col>
                    <Col sm={4}>
                        <div>Service</div>
                        <Input name='service' value={DetailData?.service} onChange={handleChange} placeholder='Service' />
                    </Col>
                    <Col sm={4}>
                        <div>Top</div>
                        <Input name='top' onChange={handleChange} value={DetailData?.top} placeholder='top' />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col sm={4}>
                        <div>Overtonase</div>
                        <Input name='overtonase' value={DetailData?.overtonase} onChange={handleChange} placeholder='overtonase' />
                    </Col>
                    <Col sm={4}>
                        <div>Biaya KG</div>
                        <Input name='biaya_kg' value={DetailData?.biaya_kg} onChange={handleChange} placeholder='Biaya KG' />
                    </Col>
                    <Col sm={4}>
                        <div>Biaya Overtonase</div>
                        <Input name='biaya_overtonase' value={DetailData?.biaya_overtonase} onChange={handleChange} placeholder='Biaya Overtonase' />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col sm={4}>
                        <div>Biaya Muat</div>
                        <Input name='biaya_muat' value={DetailData?.biaya_muat} onChange={handleChange} placeholder='Biaya Muat' />
                    </Col>
                    <Col sm={4}>
                        <div>Biaya Bongkar Muat</div>
                        <Input name='biaya_bongkar_muat' value={DetailData?.biaya_bongkar_muat} onChange={handleChange} placeholder='Biaya Bongkar Muat' />
                    </Col>
                    <Col sm={4}>
                        <div>Biaya Inap</div>
                        <Input name='biaya_inap' value={DetailData?.biaya_inap} onChange={handleChange} placeholder='Biaya Inap' />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col sm={4}>
                        <div>Biaya Lain</div>
                        <Input name='biaya_lain' value={DetailData?.biaya_lain} onChange={handleChange} placeholder='Biaya Lain' />
                    </Col>
                    <Col >
                        <div>Total Keseluruhan</div>
                        <Input disabled name='total_keseluruhan' value={DetailData?.total_keseluruhan} onChange={handleChange} placeholder='Total Keseluruhan' />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col sm={4}>
                        <div>Tanggal Kirim</div>
                        <Input style={{ width: "100%" }} name='tgl_kirim' value={DetailData?.tgl_kirim} onChange={handleChange} placeholder='Tanggal Kirim' />
                    </Col>
                    <Col sm={4}>
                        <div>Via</div>
                        <Select style={{ width: "100%" }} name='via' value={DetailData?.via} onChange={(value) => handleChange({ target: { name: 'via', value } })} placeholder='Via'>
                            <option value={"Darat"}>Darat</option>
                            <option value={"Laut"}>Laut</option>
                            <option value={"Udara"}>Udara</option>

                        </Select>
                    </Col>
                    <Col sm={4}>
                        <div>Kendaraan</div>
                        <Input name='kendaraan' value={DetailData?.kendaraan} onChange={handleChange} placeholder='Kendaraan' />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col sm={4}>
                        <div>Kontainer</div>
                        <Input name='kontainer' value={DetailData?.kontainer} onChange={handleChange} placeholder='Kontainer' />
                    </Col>
                    <Col sm={4}>
                        <div>Seal</div>
                        <Input name='seal' value={DetailData?.seal} onChange={handleChange} placeholder='Seal' />
                    </Col>
                    <Col sm={4}>
                        <div>Nopol</div>
                        <Input name='nopol' value={DetailData?.nopol} onChange={handleChange} placeholder='Nopol' />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col sm={4}>
                        <div>Supir</div>
                        <Input name='supir' value={DetailData?.supir} onChange={handleChange} placeholder='Supir' />
                    </Col>
                    <Col sm={4}>
                        <div>Telp</div>
                        <Input name='telp' value={DetailData?.telp} onChange={handleChange} placeholder='Telp' />
                    </Col>
                    <Col sm={4}>
                        <div>Memo</div>
                        <Input name='memo' value={DetailData?.memo} onChange={handleChange} placeholder='Memo' />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col sm={6}>
                        <div>Tanggal PO</div>
                        <Input name='tgl_po' value={DetailData?.tgl_po} onChange={handleChange} placeholder='Tanggal PO' />
                    </Col>
                    <Col sm={6}>
                        <div>Status</div>
                        <Input name='status' value={DetailData?.status === "N" ? "Tidak Aktif" : "Aktif"} onChange={handleChange} placeholder='Status' />
                    </Col>
                </Row>
                <br />
                <hr />
                <Row >
                    <h5><b>Mitra</b></h5>
                    <Col sm={3}>
                        <div className='mt-3'>Kode Mitra</div>
                        <Input name='kode_mitra' value={DetailData?.mitra?.kode_mitra} onChange={handleChange} placeholder='Kode Mitra' />
                    </Col>
                    <Col sm={3}>
                        <div className='mt-3'>Nama Mitra</div>
                        <Input name='nama_mitra' value={DetailData?.mitra?.nama_mitra} onChange={handleChange} placeholder='Nama Mitra' />
                    </Col>
                    <Col sm={3}>
                        <div className='mt-3'>Jenis</div>
                        <Input name='jenis' value={DetailData?.mitra?.jenis} onChange={handleChange} placeholder='Jenis' />
                    </Col>
                    <Col sm={3}>
                        <div className='mt-3'>Cabang</div>
                        <Input name='cabang' value={DetailData?.mitra?.cabang} onChange={handleChange} placeholder='cabang' />
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default ModalSOList