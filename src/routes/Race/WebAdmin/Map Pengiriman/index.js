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
    const PengadaanDetail = async () => {
        setLoadingGan(true)
        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-pengadaan-detail`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                }
            )
            console.log(data.data.data);
            setmapping(data?.data?.data)
            setLoadingGan(false)

        } catch (error) {

        }
    }
    const SelectDriver = async () => {
        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-driver-approve`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                }
            )
            console.log(data.data.data);
            setOptionNamaNamaDriver(data?.data?.data);
        } catch (error) {

        }
    }
    const Approvesp = async () => {
        const body = [];
        selectedData.forEach((item) => {
            body.push({
                "id_mpd": item.id_mpd,
                "id_unit": DataSelectDriver?.idKendaraan,
                "id_supir": DataSelectDriver?.id_supir,
                "kendaraan": DataSelectDriver?.Kendaraan,
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
            // Anda bisa menggunakan responses yang merupakan array dari setiap data yang dikembalikan oleh API call
            setOptionNamaNamaDriver(responses);
            SelectDriver();
            PengadaanDetail();
    
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
    

    useEffect(() => {
        PengadaanDetail()
        SelectDriver()
    }, [])
    console.log("selectedData", selectedData);
    return (
        <div>
            <Row>
                <Col sm={6}>
                    <Row style={{ backgroundColor: "" }}>
                        <Col sm={6} style={{ backgroundColor: "" }}>
                            {/* <h4>Mapping Pengiriman</h4> */}
                        </Col>
                        <Col className="d-flex justify-content-end" sm={6}>
                            <h5 style={{ color: "#5197FF" }}>
                                {OptionNamaNamaDriver.length === 0 ? "Mapping Otomatis" :
                                    <Select
                                        showSearch
                                        optionFilterProp='children'
                                        style={{ width: 300 }} placeholder="Select Driver Dan Mapping"
                                        onChange={(value, option) => {
                                            console.log(`Option data:`, option);
                                            console.log(`Selected value:`, value);

                                            setDataSelectDriver({
                                                id_supir: option.idDriver,
                                                Kendaraan: option.Kendaraan,
                                                idKendaraan: option.idKendaraan,
                                            });
                                        }}
                                    >
                                        {OptionNamaNamaDriver && OptionNamaNamaDriver.map((i, index) => (
                                            <option key={index} Kendaraan={i?.Kendaraan} idDriver={i.idDriver} idKendaraan={i.idKendaraan} value={i.idKendaraan}>
                                                {i.Driver}
                                            </option>
                                        ))}
                                    </Select>}
                            </h5>
                            <Button className='ms-2' onClick={Approvesp} type='primary' size='sm'>Mapping</Button>
                        </Col>
                    </Row>
                    <div className="div-no-scrollbar" style={{ padding: "0px", height: "800px", backgroundColor: "", overflow: "auto" }}>
                        <CardMapping DataApi={DataApi} LoadingGan={LoadingGan} />
                    </div>


                </Col>
                <Col sm={6}>
                    <Card className="div-no-scrollbar" style={{ padding: "0px", height: "800px", backgroundColor: "", overflow: "auto" }} >
                        <Row>
                            <h5>Driver Tersedia</h5>
                            <MappingDriverCard OptionNamaNamaDriver={OptionNamaNamaDriver} DataApi={DataApi} />
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MapPengiriman