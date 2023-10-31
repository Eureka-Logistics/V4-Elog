import { Card, Button, Checkbox, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import driver from "../../../../../assets/img/drivericon.png"
import { Col, Row } from 'react-bootstrap'
import CardMapping from '../CardComponent Mapping'
import CardMappingStoreRace from '../../../../../zustand/Store/DriverMappingCardRace/MappingStore'
import { database } from "../../../../../firebase/firebase"
import { getDatabase, ref, get, set, push, on, off } from "firebase/database";
import moment from 'moment'

function MappingDriverCard({ DataApi, OptionNamaNamaDriver }) {
    const [availableDrivers, setAvailableDrivers] = useState([]);
    const [cards, setCards] = useState([{ id: 1 }, { id: 2 }]); // asumsi mula-mula ada dua cards
    const [isHidden, setIsHidden] = useState(false); // state untuk menyembunyikan atau menampilkan cards
    const data = false
    const datadummy = CardMappingStoreRace(state => state.drivers);
    const gabunganData = CardMappingStoreRace(state => state.gabunganData);
    const [DataAkhirnya, setDataAkhirnya] = useState([])

    const toggleHide = () => {
        setIsHidden(!isHidden);
    }
    const { selectedData, addData, removeData } = CardMappingStoreRace();

    const handleRemoveData = (id) => {
        removeData(id);
    }











    return (
        <div >
            {(Array.isArray(OptionNamaNamaDriver) ? OptionNamaNamaDriver : []).map((data, index) => (
                <Card className='mt-3' style={{ borderRadius: 10, backgroundColor: "#ccd8f3", padding: "0px", margin: "0px", height: "auto" }}>
                    <Card className='card-2' style={{ marginTop: "-15px", borderRadius: 10, marginRight: -20, marginLeft: -20, backgroundColor: "", maxHeight: 100 }}>
                        <Row >
                            <Col>
                                <Button onClick={toggleHide} style={{ marginTop: '10px', backgroundColor: "blue", color: "white", borderRadius: 10 }}>{isHidden ? 'Show' : 'Hide'}</Button>
                            </Col>
                            <Col sm={5}>
                                <div style={{ fontWeight: "bold", fontSize: 15 }}>
                                    <Tag color='blue'>{data.Driver}</Tag>
                                </div>
                                <div className='' style={{ fontWeight: "bold", fontSize: 15 }}>
                                    <Tag color='yellow'>  {data?.Kendaraan} </Tag>
                                </div>
                            </Col>
                            <Col sm={3} className='mt-1'>
                                <div style={{ color: "#1F3D7D", fontSize: 15, fontWeight: "bold", textAlign: 'center' }}>Jumlah SJ</div>
                                <div style={{ color: "blue", fontWeight: "bold", fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{data.statusSJ?.length || 0}</div>
                            </Col>

                        </Row>
                    </Card>
                    {!isHidden ? (
                        (data?.length || 0) > 0 ? (
                            <div className='d-flex justify-content-center' style={{ color: "#A2A2A2", fontSize: 20, marginTop: -20 }}>
                                Belum Ada Pengiriman {data?.statusSJ[0]?.customer}
                            </div>
                        ) : (
                            <div style={{ color: "#A2A2A2", fontSize: 20, marginTop: -20, maxHeight: 135 }}>
                                <div style={{ marginTop: -20 }}>
                                    {data?.statusSJ?.map((item, index) => (
                                        <Card key={item.id} style={{ padding: "0px", borderRadius: "10px", marginRight: -20, marginLeft: -20, maxHeight: 150, backgroundColor: "#FFF9F9" }}>
                                            <Row style={{ backgroundColor: "", height: 30 }}>
                                                {/* <Button onClick={() => handleRemoveData(item.id)} color='red'>Hapus {index + 1}</Button> */}

                                                <Col>
                                                    <h4 style={{ color: "blue" }}>{index + 1}</h4>
                                                </Col>
                                                <Col className='d-flex justify-content-start'>
                                                    <Button type='primary' disabled={item.status === "Waiting"} style={{}}>
                                                        {item.noSj}
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Row className='mt-3' style={{ backgroundColor: "" }}>
                                                <Col >
                                                    <b>Pelanggan</b>
                                                </Col>
                                                <Col style={{}}>
                                                    <b>Status</b>
                                                </Col>
                                                <Col >
                                                    <p style={{ fontWeight: "bold" }}>Tanggal Update</p>
                                                </Col>
                                                <Row>
                                                    <Col style={{ marginTop: 5 }} >
                                                        <Tag color='blue' style={{ fontSize: "16px", fontWeight: "bold" }}>{item.customer}</Tag>
                                                    </Col>
                                                    <Col style={{ marginTop: 5 }}>
                                                        <Tag color='blue' style={{ fontSize: "16px", fontWeight: "bold" }}>{item.status}</Tag>
                                                    </Col>
                                                    <Col style={{ marginTop: 5 }}>
                                                        <Tag color='blue' style={{ fontSize: "16px", fontWeight: "bold" }}>{moment(item.updateDate).format("D-MM-YYYY")}</Tag>
                                                    </Col>
                                                </Row>
                                            </Row>
                                          
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )
                    ) : (
                        <div className='d-flex justify-content-center' style={{ color: "#A2A2A2", fontSize: 20, marginTop: -20 }}>
                            Tersedia {data.statusSJ?.length || 0}
                        </div>
                    )}
                </Card>
            ))}

        </div>
    )
}

export default MappingDriverCard;
