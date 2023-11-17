import { Button, Card, Checkbox, Select, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import CardMapping from './CardComponent Mapping/index'
import "./style.css"
import MappingDriverCard from './MaapingDriverCard'
import CardMappingStoreRace from '../../../../zustand/Store/DriverMappingCardRace/MappingStore'
import axios from 'axios'
import { BaseUrlRace } from '../../../../Api/BaseUrl'
function MapPengiriman() {
    const { selectedData, addData, removeData, drivers, setGabunganData } = CardMappingStoreRace();
    const [DataApi, setmapping] = useState("")
    const [OptionNamaNamaDriver, setOptionNamaNamaDriver] = useState("")
    const [LoadingGan, setLoadingGan] = useState(false)
    const [DataSelectDriver, setDataSelectDriver] = useState([])
    const [selectIdDriverDanVehicle, setSelectIdDriverDanVehicle] = useState({
        idDriver: "",
        idKendaraan: "",
        kendaraan: "",
        selectDriver: [],
        selectKendaraan: []
    });
    const [OptionSelect, setOptionSelect] = useState({
        Kecamatan: [],
        Sales: [],
        SelectKecamatan: "",
        SelectSales: "",
    })
    const [SelectKecamatan, setSelectKecamatan] = useState("")
    const [SelectSales, setSelectSales] = useState("")
    console.log(`selectedData`, selectedData);
    const PengadaanDetail = async () => {
        setLoadingGan(true)
        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-pengadaan-detail?kecamatan=${SelectKecamatan}&sales=${SelectSales}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                }
            )
            setmapping(data?.data?.data)
            setLoadingGan(false)
            console.log(`datri sales dan kceamatan `, data.data);
            setOptionSelect(item => ({
                Kecamatan: data?.data?.kecamatan,
                Sales: data?.data?.sales
            })

            );

        } catch (error) {

        }
    }


    console.log(`OptionSelect`, OptionSelect);
    // const SelectDriver = async () => {
    //     try {
    //         const data = await axios.get(`${BaseUrlRace}sp/get-driver-approve`,
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: localStorage.getItem('token'),
    //                 },
    //             }
    //         )
    //         // setOptionNamaNamaDriver(data?.data?.data);
    //     } catch (error) {

    //     }
    // }
    const SelectDriver2 = async () => {
        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-sm`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                }
            )
            setOptionNamaNamaDriver(data?.data?.data);
        } catch (error) {

        }
    }
    const Approvesp = async () => {
        const body = [];
        selectedData.forEach((item) => {
            body.push({
                "id_mpd": item.id_mpd,
                "id_unit": selectIdDriverDanVehicle?.idKendaraan,
                "id_supir": selectIdDriverDanVehicle?.idDriver,
                "kendaraan": selectIdDriverDanVehicle?.kendaraan,
                "berat": item.berat,
                "qty": item.qty,
                "koli": item.koli,
                "ikat": item.ikat,
            });
        });

        try {
            const responses = await Promise.all(body.map(async (item) => {
                const response = await axios.post(`${BaseUrlRace}sp/approve-sp`, item, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                });
                return response.data;
            }));

            // Ambil data dari setiap response dan lakukan operasi yang diperlukan
            responses.forEach((data) => {
                // Periksa apakah data yang diterima valid
                if (data && data.data) {
                    // Lakukan operasi dengan data
                }
            });

            // Setelah semua API call berhasil, lakukan operasi yang diperlukan
            setDataSelectDriver("")
            setOptionNamaNamaDriver(responses);
            PengadaanDetail();
            SelectDriver2("")
            addData("")
            CardMappingStoreRace.setState({ selectedData: "" })
            // selectedData("")
            notification.success({
                message: "Sukses",
            });
        } catch (error) {
            if (error?.response?.data && error?.response?.data?.status && error?.response?.data?.status?.message) {
                const messages = error.response.data.status.message.split(',');
                messages.forEach((element) => {
                    notification.error({
                        message: "Error",
                        description: element.trim(),
                    });
                });
            }
        }
    };


    const SelectDriverdanKendaraan = async () => {
        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-driver-kendaraan`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                }
            )
            setSelectIdDriverDanVehicle(item => ({
                ...item,
                selectDriver: data.data.Driver,
                selectKendaraan: data.data.kendaraan,
            }))
        } catch (error) {

        }
    }
    useEffect(() => {
        SelectDriverdanKendaraan()
        PengadaanDetail()
        // SelectDriver()
        SelectDriver2()

    }, [SelectKecamatan, SelectSales])

    console.log(OptionNamaNamaDriver);
    console.log(`selectreddata`, selectedData);
    return (
        <div>
            <Card>
                <Row>

                    <Col md={3} className="" >
                        <div>Cari Driver</div>
                        <Select style={{ width: "100%" }} placeholder={selectedData.length === 0 ? "Pilih SJ Dahulu" : "Cari Driver"}
                            optionFilterProp='children'
                            showSearch
                            disabled={selectedData.length === 0}
                            onChange={(e) => setSelectIdDriverDanVehicle(item => ({
                                ...item,
                                idDriver: e
                            }))}
                        >
                            {
                                selectIdDriverDanVehicle.selectDriver && selectIdDriverDanVehicle.selectDriver.length > 0
                                    ? selectIdDriverDanVehicle.selectDriver.map((item) => (
                                        <Select.Option key={item.idDriver} value={item.idDriver}>{item.driverName}</Select.Option>
                                    ))
                                    : <option>Loading data...</option>
                            }


                        </Select>
                    </Col>
                    <Col md={3} className="" >
                        <div>Cari Kendaraan</div>
                        <Select
                            optionFilterProp='children'
                            showSearch
                            disabled={!selectIdDriverDanVehicle.idDriver}
                            onChange={(e, option) => {
                                console.log(e, option);
                                setSelectIdDriverDanVehicle(item => ({
                                    ...item,
                                    idKendaraan: e,
                                    kendaraan: option.option.jenisKendaraan
                                }))
                            }}
                            style={{ width: "100%" }} placeholder={!selectIdDriverDanVehicle.idDriver ? "Pilih Driver Dahulu" : "Cari Kendaraan"}>
                            {
                                selectIdDriverDanVehicle.selectKendaraan && selectIdDriverDanVehicle.selectKendaraan.length > 0
                                    ? selectIdDriverDanVehicle.selectKendaraan.map((item) => (
                                        <Select.Option key={item.kendaranId} option={item} value={item.kendaranId}>{item.jenisKendaraan} - {item.polisiNumber}</Select.Option>
                                    ))
                                    : <option>Loading data...</option>
                            }

                        </Select>
                    </Col>
                    <Col>
                        <div className='mt-3'></div>
                        <Button loading={LoadingGan === true} disabled={!selectIdDriverDanVehicle.idKendaraan || !selectedData} className='ms-2' onClick={() => {Approvesp()
                        setLoadingGan(true)
                        }} type='primary' size='sm'>Mapping</Button>
                    </Col>
                    <Col className="" >
                        <div>Filter Kecamatan</div>
                        <Select
                            optionFilterProp='children'
                            showSearch
                            onChange={(e, option) => {
                                console.log(e);
                                // setOptionSelect(item => ({
                                //     ...item,
                                //     SelectKecamatan: e,
                                // }))
                                setSelectKecamatan(e)
                            }}
                            style={{ width: "100%" }} placeholder={"Cari kecamatan"}>
                            <Select.Option key={""} value={""}> - </Select.Option>

                            {
                                OptionSelect?.Kecamatan.map((item) => (
                                    <Select.Option key={item.kecamatan} value={item.kecamatan}>{item.kecamatan} </Select.Option>
                                ))
                            }

                        </Select>
                    </Col>
                    <Col className="" >
                        <div>Filter Sales</div>
                        <Select
                            optionFilterProp='children'
                            showSearch
                            onChange={(e, option) => {
                                console.log(e);
                                // setOptionSelect(item => ({
                                //     ...item,
                                //     SelectSales: e,
                                // }))
                                setSelectSales(e)
                            }}
                            style={{ width: "100%" }} placeholder={"Cari Sales"}>
                            <Select.Option key={""} value={""}> - </Select.Option>

                            {
                                OptionSelect?.Sales.map((item) => (
                                    <Select.Option key={item.sales} value={item.sales}>{item.sales} </Select.Option>
                                ))
                            }

                        </Select>
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Row style={{ backgroundColor: "" }}>

                        </Row>
                        <div className="div-no-scrollbar" style={{ padding: "0px", height: "800px", backgroundColor: "", overflow: "auto" }}>
                            <CardMapping DataApi={DataApi} LoadingGan={LoadingGan} />
                        </div>


                    </Col>
                    <Col sm={6}>
                        <Card className="div-no-scrollbar" style={{ padding: "0px", height: "800px", backgroundColor: "", overflow: "auto" }} >
                            <Row>
                                <h5>Driver Tersedia</h5>
                                <MappingDriverCard SelectDriver2={SelectDriver2}PengadaanDetail={PengadaanDetail}OptionNamaNamaDriver={OptionNamaNamaDriver} />
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default MapPengiriman