import { Button, Card, Checkbox, Select } from 'antd'
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
    const handleSelect = (driverId) => {
        const selectedDriver = drivers.find(driver => driver.id === driverId);
        if (selectedDriver) {
            const updatedSelectedData = selectedDriver; // menambahkan selectedDriver sebagai item baru dalam array
            updatedSelectedData.selectedData = [...selectedData]
            setGabunganData(updatedSelectedData)
        }
    };
    const PengadaanDetail = async () => {
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
            setmapping(data.data.data)
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
            setOptionNamaNamaDriver(data.data.data);
        } catch (error) {

        }
    }
    console.log("selectedData", selectedData);
    // console.log("selectedData", selectedData[0].id_mpd);
    const Approvesp = async () => {
        const body = selectedData.map(item => ({
            "id_mpd": item.id_mpd,
            "id_unit": item.id_unit,
            "id_supir": 34, // Sesuaikan dengan kebutuhan Anda
            "kendaraan": "GRAND MAX", // Sesuaikan dengan kebutuhan Anda
            "berat": item.berat,
            "qty": item.qty,
            "koli": item.koli,
            "ikat": item.ikat
        }));
        try {
            const data = await axios.post(`${BaseUrlRace}sp/approve-sp`, body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                }
            )
            console.log(data.data.data);
            setOptionNamaNamaDriver(data.data.data);
        } catch (error) {

        }
    }
    useEffect(() => {
        PengadaanDetail()
        SelectDriver()
    }, [])

    return (
        <div>
            <Row>
                <Col sm={6}>
                    <Row>
                        <Col sm={6}>
                            <h4>Mapping Pengiriman</h4>
                        </Col>
                        <Col className="d-flex justify-content-end" sm={6}>
                            <h5 style={{ color: "#5197FF" }}>
                                {OptionNamaNamaDriver.length === 0 ? "Mapping Otomatis" :
                                    <Select
                                        showSearch
                                        optionFilterProp='children'
                                        style={{ width: 300 }} placeholder="Select Driver Dan Mapping" onChange={Approvesp}>
                                        {OptionNamaNamaDriver && OptionNamaNamaDriver.map((i) => (
                                            <Select.Option key={i.idKendaraan} value={i.idDriver}>{i.Driver}</Select.Option>
                                        ))}
                                    </Select>}
                            </h5>
                        </Col>
                    </Row>
                    <div className="div-no-scrollbar" style={{ padding: "0px", height: "800px", backgroundColor: "", overflow: "auto" }}>
                        <CardMapping DataApi={DataApi} />
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