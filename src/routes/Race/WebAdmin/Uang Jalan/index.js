import { Button, Card, Input, Select, Table, notification } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ModalUangJalan from './modaluangjalan'
import { BaseUrlRace } from '../../../../Api/BaseUrl'
import CardMappingStoreRace from '../../../../zustand/Store/DriverMappingCardRace/MappingStore'
import { UangJalanZustand } from '../../../../zustand/Store/Race/fetch/uangjalan'

function UangJalan() {
    const [DataApi, setDataApi] = useState("")
    const [DataSelectdanHitungan, setDataSelectdanHitungan] = useState("")
    const [HargaSelect, setHargaSelect] = useState("")
    const [ModalOpen, setModalOpen] = useState(false)
    const [LiterPerKM, setLiterPerKM] = useState("")
    const [Tol, setTol] = useState("")
    const [Jarak, setJarak] = useState("")
    const { FetchDriverMapping, isidaridrivermapping } = CardMappingStoreRace()
    const [pterhitunganbbm, setpterhitunganbbm] = useState()
    const [perhitunganParkir, setperhitunganParkir] = useState()
    const [uangjalanstate, setuangjalanstate] = useState()
    const { FetchUangJalan, isibbm, isifetchuangjalan, isiinputanuangjalan, addisiinputanuangjalan } = UangJalanZustand()
    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'name',
        },
        {
            title: 'Driver',
            dataIndex: 'driver',
            key: 'driver',
        },
        {
            title: 'Kendaraan ',
            dataIndex: 'kendaraan',
            key: 'kendaraan',
        },
        {
            title: 'Bbm',
            dataIndex: 'bbm',
            key: 'bbm',
        },
        {
            title: 'makan',
            dataIndex: 'makan',
            key: 'makan',
        },
        {
            title: 'parkir',
            dataIndex: 'parkir',
            key: 'parkir',
        },
        {
            title: 'tol',
            dataIndex: 'tol',
            key: 'tol',
        },
        {
            title: 'admin',
            dataIndex: 'admin',
            key: 'admin',
        },
        {
            title: 'tanggal',
            dataIndex: 'tanggal',
            key: 'tanggal',
        },
    ]
    const jenismobil = [
        {
            "id_kendaraan_jenis": 1,
            "nama_kendaraan_jenis": "CDD",
            "status": 1,
            "kode": 3,
            "bbm": "Solar",
            "jarak_liter": 6,
            "kapasitas": 1500
        },
        {
            "id_kendaraan_jenis": 3,
            "nama_kendaraan_jenis": "CDE",
            "status": 1,
            "kode": 3,
            "bbm": "Solar",
            "jarak_liter": 7,
            "kapasitas": 2500
        },
        {
            "id_kendaraan_jenis": 5,
            "nama_kendaraan_jenis": "Fuso",
            "status": 1,
            "kode": 2,
            "bbm": "Solar",
            "jarak_liter": 8,
            "kapasitas": 0
        },
        {
            "id_kendaraan_jenis": 7,
            "nama_kendaraan_jenis": "Grand Max",
            "status": 1,
            "kode": 1,
            "bbm": "Pertalite",
            "jarak_liter": 11,
            "kapasitas": 600
        },
        {
            "id_kendaraan_jenis": 9,
            "nama_kendaraan_jenis": "L300",
            "status": 1,
            "kode": 2,
            "bbm": "Solar",
            "jarak_liter": 10,
            "kapasitas": 1000
        },
        {
            "id_kendaraan_jenis": 11,
            "nama_kendaraan_jenis": "Mobil",
            "status": 1,
            "kode": 0,
            "bbm": "Pertalite",
            "jarak_liter": 8,
            "kapasitas": 0
        },
        {
            "id_kendaraan_jenis": 13,
            "nama_kendaraan_jenis": "Moko",
            "status": 1,
            "kode": 0,
            "bbm": "Pertalite",
            "jarak_liter": 8,
            "kapasitas": 0
        },
        {
            "id_kendaraan_jenis": 15,
            "nama_kendaraan_jenis": "Motor",
            "status": 1,
            "kode": 0,
            "bbm": "Pertalite",
            "jarak_liter": 8,
            "kapasitas": 0
        },
        {
            "id_kendaraan_jenis": 17,
            "nama_kendaraan_jenis": "Traga",
            "status": 1,
            "kode": 2,
            "bbm": "Solar",
            "jarak_liter": 10,
            "kapasitas": 1500
        },
        {
            "id_kendaraan_jenis": 19,
            "nama_kendaraan_jenis": "Trailer",
            "status": 1,
            "kode": 7,
            "bbm": "Solar",
            "jarak_liter": 8,
            "kapasitas": 0
        },
        {
            "id_kendaraan_jenis": 21,
            "nama_kendaraan_jenis": "Wingbox",
            "status": 1,
            "kode": 6,
            "bbm": "Solar",
            "jarak_liter": 8,
            "kapasitas": 0
        },
        {
            "id_kendaraan_jenis": 22,
            "nama_kendaraan_jenis": "Wingbox 15",
            "status": 1,
            "kode": 6,
            "bbm": "Solar",
            "jarak_liter": 8,
            "kapasitas": 0
        },
        {
            "id_kendaraan_jenis": 23,
            "nama_kendaraan_jenis": "Wingbox 25",
            "status": 1,
            "kode": 6,
            "bbm": "Solar",
            "jarak_liter": 8,
            "kapasitas": 0
        },
        {
            "id_kendaraan_jenis": 25,
            "nama_kendaraan_jenis": "Wingbox 30",
            "status": 1,
            "kode": 6,
            "bbm": "Solar",
            "jarak_liter": 8,
            "kapasitas": 0
        },
        {
            "id_kendaraan_jenis": 27,
            "nama_kendaraan_jenis": "CDD 7-8 Ton",
            "status": 1,
            "kode": 3,
            "bbm": "Solar",
            "jarak_liter": 8,
            "kapasitas": 0
        },
        {
            "id_kendaraan_jenis": 29,
            "nama_kendaraan_jenis": "CDD 3-5 Ton",
            "status": 1,
            "kode": 3,
            "bbm": "Solar",
            "jarak_liter": 8,
            "kapasitas": 0
        },
        {
            "id_kendaraan_jenis": 31,
            "nama_kendaraan_jenis": "CDD Bak Terbuka",
            "status": 1,
            "kode": 3,
            "bbm": "Solar",
            "jarak_liter": 8,
            "kapasitas": 0
        },
        {
            "id_kendaraan_jenis": 33,
            "nama_kendaraan_jenis": "Tronton",
            "status": 1,
            "kode": 6,
            "bbm": "Solar",
            "jarak_liter": 8,
            "kapasitas": 0
        },
        {
            "id_kendaraan_jenis": 35,
            "nama_kendaraan_jenis": "Kontainer 20",
            "status": 1,
            "kode": 0,
            "bbm": "Solar",
            "jarak_liter": 8,
            "kapasitas": 0
        },
        {
            "id_kendaraan_jenis": 37,
            "nama_kendaraan_jenis": "Kontainer 40",
            "status": 1,
            "kode": 0,
            "bbm": "Solar",
            "jarak_liter": 8,
            "kapasitas": 0
        },
        {
            "id_kendaraan_jenis": 38,
            "nama_kendaraan_jenis": "Blindvan",
            "status": 1,
            "kode": 0,
            "bbm": "Pertalite",
            "jarak_liter": 8,
            "kapasitas": 0
        },
        {
            "id_kendaraan_jenis": 39,
            "nama_kendaraan_jenis": "Lainnya",
            "status": 1,
            "kode": 0,
            "bbm": "Solar",
            "jarak_liter": 8,
            "kapasitas": 0
        }
    ]
    const databensin = async () => {
        try {
            const data = await axios.get(`${BaseUrlRace}bbm/get-bbm`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                }
            )
            setDataApi(data.data.message)
            console.log(data.data.message);
        } catch (error) {

        }
    }
    useEffect(() => {
        databensin()
        FetchUangJalan()
        FetchDriverMapping()
    }, [])

    useEffect(() => {
        PerhitunganBBM()
    }, [Jarak, HargaSelect, Tol, LiterPerKM])

    function formatIDR(value) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    }
    function PerhitunganBBM() {
        const penjumlahanjarak = (Jarak / LiterPerKM) * HargaSelect
        console.log(`penjumlahanjarak`, penjumlahanjarak);
        setpterhitunganbbm(penjumlahanjarak)
        return penjumlahanjarak
    }
    function PerhitunganParkir() {
        const perhitungan = 0.15 * PerhitunganBBM();
        setperhitunganParkir(perhitungan)
        return perhitungan
    }

    function UangJalan() {
        const totalBBM = Number(PerhitunganBBM());
        const totalParkir = Number(PerhitunganParkir());
        const totalTol = Number(Tol);

        const uangjalan = totalBBM + totalParkir + totalTol;
        setuangjalanstate(uangjalan)
        return formatIDR(uangjalan);
    }


    return (
        <>
            {/* {DataApi.length <= 0 ? "Loading / datanya kosong" : */}
            <div>
                <Card>
                    <Row>
                        <div >
                            <div>Perhitungan BBM : Total jarak * km/liter * harga bbm/liter</div>
                            <div className='mt-2'>Parkir = 15% * BBM</div>
                            <div className='mt-2'>Tol = diisi user</div>
                            <div className='mt-2'>Uang jalan = BBM + Parkir + Tol</div>
                        </div>
                    </Row>
                </Card>
                <Row className='d-flex justify-content-end'>
                    <Col>
                        <Button type='primary' onClick={() => setModalOpen(true)}>Tambah Transfer UJ</Button>
                    </Col>
                </Row>

                <Table dataSource={isifetchuangjalan?.order} loading={!isifetchuangjalan} columns={columns} />
                {/* <Table columns={datatable} dataSource={DataApi} /> */}
                <ModalUangJalan uangjalanstate={uangjalanstate} perhitunganParkir={perhitunganParkir} pterhitunganbbm={pterhitunganbbm} jenismobil={jenismobil} isidaridrivermapping={isidaridrivermapping} setJarak={setJarak} setTol={setTol} setLiterPerKM={setLiterPerKM} UangJalan={UangJalan} PerhitunganParkir={PerhitunganParkir} PerhitunganBBM={PerhitunganBBM} HargaSelect={HargaSelect} formatIDR={formatIDR} setHargaSelect={setHargaSelect} DataSelectdanHitungan={DataSelectdanHitungan} setModalOpen={setModalOpen} ModalOpen={ModalOpen} setDataSelectdanHitungan={setDataSelectdanHitungan} DataApi={DataApi} />
            </div >
            {/* } */}
        </>
    )
}

export default UangJalan