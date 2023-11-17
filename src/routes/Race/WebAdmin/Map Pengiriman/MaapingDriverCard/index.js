import { Card, Button, Checkbox, Tag, Popconfirm, message } from 'antd'
import React, { useEffect, useState } from 'react'
import driver from "../../../../../assets/img/drivericon.png"
import { Col, Row } from 'react-bootstrap'
import CardMapping from '../CardComponent Mapping'
import CardMappingStoreRace from '../../../../../zustand/Store/DriverMappingCardRace/MappingStore'
import { database } from "../../../../../firebase/firebase"
import { getDatabase, ref, get, set, push, on, off } from "firebase/database";
import moment from 'moment'
import axios from 'axios'
import { BaseUrlRace } from '../../../../../Api/BaseUrl'

function MappingDriverCard({ OptionNamaNamaDriver ,PengadaanDetail,SelectDriver2}) {
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


    let totalKoli = 0;
    let totalIkat = 0;
    let totalQty = 0;
    let totalBerat = 0;

    // const itemList = OptionNamaNamaDriver && OptionNamaNamaDriver?.map((item, index) => {
    //     item.dataSm?.map((i) => {
    //         // Assuming 'Driver' is a numerical value you want to add to 'totalKoli'
    //         totalKoli += i?.koli || 0;
    //         totalIkat += i?.ikat || 0;
    //         totalQty += i?.qty || 0;
    //         totalBerat += i?.berat || 0;
    //     });

    //     // If you want to log totals for each item in OptionNamaNamaDriver
    //     console.log(`Item ${index + 1} - Total Koli:`, totalKoli);
    //     console.log(`Item ${index + 1} - Total Ikat:`, totalIkat);
    //     console.log(`Item ${index + 1} - Total Qty:`, totalQty);
    //     console.log(`Item ${index + 1} - Total Berat:`, totalBerat);
    // });

    // // If you want to log the overall totals
    // console.log('Overall Total Koli:', totalKoli);
    // console.log('Overall Total Ikat:', totalIkat);
    // console.log('Overall Total Qty:', totalQty);
    // console.log('Overall Total Berat:', totalBerat);

    // console.log(`itemList`, OptionNamaNamaDriver)


    // const [datadelete, setdatadelete] = useState({
    //     id_msm: 0,
    //     id_mpd: 0

    // })

    const confirmDelete = (id_mpd, id_msm) => {
        DeleteSm(id_mpd, id_msm);
    };
    async function DeleteSm(id_mpd, id_msm) {
        let isi = {
            "id_msm": id_mpd,
            "id_mpd": id_msm
        }
        try {
            const data = await axios.post(`${BaseUrlRace}sp/delete-sm`, isi,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            SelectDriver2()
            PengadaanDetail()
        } catch (error) {

        }
    }




    return (
        <div >
            {(Array.isArray(OptionNamaNamaDriver) ? OptionNamaNamaDriver : []).map((data, index) => (
                <Card className='mt-3' style={{ borderRadius: 10, backgroundColor: "#ccd8f3", padding: "0px", margin: "0px", height: "auto" }}>
                    <Card className='card-2' style={{ marginTop: "-15px", borderRadius: 10, marginRight: -20, marginLeft: -20, backgroundColor: "#1A3368", maxHeight: 90 }}>
                        <Row >
                            <Col md={1} l style={{ backgroundColor: "" }}>
                                <Button style={{ backgroundColor: "white", borderRadius: "8px", color: "blue" }}>{index + 1}</Button>
                            </Col>
                            <Col>
                                <div style={{ fontWeight: "bold", fontSize: 15, color: "white", marginLeft: 20 }}>
                                    {data.Driver}

                                </div>
                            </Col>
                            {/* <Col>
                                <div style={{ fontSize: 10 ,color: "white"}}>{totalKoli} Koli</div>
                                <div style={{ fontSize: 10 ,color: "white"}}>{totalIkat} Ikat</div>
                                <div style={{ fontSize: 10 ,color: "white"}}>{totalQty} Qty</div>
                                <div style={{ fontSize: 10 ,color: "white"}}>{totalBerat} Berat</div>
                            </Col> */}
                            <Col sm={3} className='mt-1'>
                                <div style={{ color: "white", fontSize: 15, fontWeight: "bold", textAlign: 'center' }}>Jumlah SJ</div>
                                <div style={{ color: "white", fontWeight: "bold", fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{data.dataSm?.length || 0}</div>
                            </Col>

                        </Row>

                    </Card>

                    {!isHidden ? (
                        (data?.length || 0) > 0 ? (
                            <div className='d-flex justify-content-center' style={{ color: "#A2A2A2", fontSize: 20, marginTop: -20 }}>
                                Belum Ada Pengiriman {data?.statusSJ[0]?.customer}
                            </div>
                        ) : (
                            <>
                                <>
                                    {data?.dataSm
                                        ?.map((item, index) => (
                                            <div
                                                style={{
                                                    color: '#A2A2A2',
                                                    fontSize: 20,
                                                    marginTop: -20,
                                                    maxHeight: 135,
                                                }}
                                            >
                                                <div style={{ marginTop: -10 }}>
                                                    <Card
                                                        key={item?.id}
                                                        style={{
                                                            padding: '0px',
                                                            borderRadius: '10px',
                                                            marginRight: -20,
                                                            marginLeft: -20,
                                                            maxHeight: 130,
                                                            backgroundColor: '',
                                                        }}
                                                    >
                                                        <Row style={{ height: 30, backgroundColor: "", marginTop: -10 }}>
                                                            <Col md={2}>
                                                                <Col>

                                                                    <Tag color='blue' >
                                                                        {index + 1}
                                                                        {/* {item?.koli} */}
                                                                    </Tag>
                                                                    <Popconfirm
                                                                        title="Yakin Hapus SJ??"
                                                                        onConfirm={() =>  DeleteSm(item?.idMsm, item?.idMpd)}
                                                                        onCancel={() => message.info('Delete Dibatalkan')}
                                                                        okText="Ya"
                                                                        cancelText="Tidak"
                                                                    >
                                                                       <Button size='small' type='danger'
                                                                        // onClick={() =>
                                                                        //     DeleteSm(item?.idMsm, item?.idMpd)}
                                                                    >Hapus</Button>
                                                                    </Popconfirm>
                                                                    
                                                                </Col>
                                                                {/* <Col>
                                                                    {item?.koli}
                                                                </Col>
                                                                <Col>
                                                                    {item?.qty}
                                                                </Col>
                                                                <Col>
                                                                    {item?.ikat}
                                                                </Col>
                                                                <Col>
                                                                    {item?.berat}
                                                                </Col> */}
                                                            </Col>
                                                            <Col >
                                                                <Row>
                                                                    <div style={{ color: "#1F3D7D", fontWeight: "bold" }}> {item.sp}</div>
                                                                    <div style={{ color: "#1F3D7D", fontWeight: "bold" }}>{item.sm}</div>

                                                                </Row>

                                                            </Col>
                                                            <Col className='d-flex '>
                                                                <div style={{ color: "#1F3D7D", fontWeight: "bold" }}> {item.jenisKendaraan} - {item.nopol}</div>
                                                                {/* <div style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: "#1F3D7D", display: "flex", alignItems: "center", borderRadius: 4, gap: 8, paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8 }}>
                                                                <div style={{ color: "white", fontWeight: "bold" }}>{item.status}</div>
                                                            </div> */}
                                                            </Col>

                                                        </Row>
                                                        <Row className="mt-4" style={{ display: "flex", justifyItems: "center" }}>
                                                            <Row>
                                                                <Col md={2}></Col>
                                                                <Col style={{ marginTop: -5 }}>
                                                                    <div style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: "#EAF1FF", color: "#1F3D7D", paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, justifyItems: "center" }}>
                                                                        {item.muat}
                                                                    </div>
                                                                </Col>
                                                                <Col style={{ marginTop: -5 }}>
                                                                    <div style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: "#FEEAE4", color: "#F05423", paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, }}>
                                                                        {item.penerima}
                                                                    </div>
                                                                </Col>


                                                            </Row>
                                                        </Row>
                                                    </Card>
                                                </div>
                                            </div>
                                        ))}
                                    <Button onClick={toggleHide} style={{ backgroundColor: "#5297FF", color: "white", width: "100%", borderRadius: 10 }}>{isHidden ? 'Show' : 'Hide'}</Button>
                                </>
                            </>
                        )
                    ) : (
                        <div className='d-flex justify-content-center' style={{ fontSize: 20 }}>
                            <Button onClick={toggleHide} style={{ backgroundColor: "#5297FF", color: "white", width: "100%", borderRadius: 10 }}>{!isHidden ? 'Hide' : 'Show'}</Button>
                        </div>
                    )}
                </Card>
            ))
            }

        </div >
    )
}

export default MappingDriverCard;
