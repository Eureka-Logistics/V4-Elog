import { Card, Button, Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'
import driver from "../../../../../assets/img/drivericon.png"
import { Col, Row } from 'react-bootstrap'
import CardMapping from '../CardComponent Mapping'
import CardMappingStoreRace from '../../../../../zustand/Store/DriverMappingCardRace/MappingStore'
import { database } from "../../../../../firebase/firebase"
import { getDatabase, ref, get, set, push, on, off } from "firebase/database";

function MappingDriverCard() {
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
    
    const matchedData = datadummy.find(data => data.id === gabunganData.id);
    if (matchedData) {
        console.log('Data cocok:', matchedData);
    } else {
        console.log('Tidak ada data yang cocok');
    }


    const [DariFirebase, setDariFirebase] = useState([]);

    useEffect(() => {
        const dbRef = ref(getDatabase(), 'drivers/');

        get(dbRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const dataArray = Object.keys(data).map(key => data[key]);
                    console.log(dataArray);
                    setDariFirebase(dataArray);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);


    const asu = DariFirebase.map((i) => (
        i?.name
    ))
    console.log(`DariFirebase`, asu);









    function writeUserData() {
        const db = getDatabase();
        push(ref(db, 'drivers/'), {
            name: "Budiawan Suprapto",
            id: "P1239100",
            licenseType: "B2 UMUM",
            image: "path_to_driver_image",
            selectedData: ""
        });
    }
    // writeUserData()
    useEffect(() => {
        const testasu = datadummy.find(i => matchedData?.id === i.id);
        if (testasu) {
            const data = datadummy.map(item =>
                (item?.id === testasu?.id ? { ...item, ...testasu } : item)
            );
            setDataAkhirnya(data);
        }
    }, [datadummy, matchedData]);


    return (
        <div >
            {(DataAkhirnya.length > 0 ? DataAkhirnya : datadummy).map((data, index) => (
                <Card className='mt-3' style={{ borderRadius: 10, backgroundColor: "#ccd8f3", padding: "0px", margin: "0px", height: "auto" }}>
                    <Card className='card-2' style={{ marginTop: "-15px", borderRadius: 10, marginRight: -20, marginLeft: -20 }}>
                        <Row>
                            <Col sm={2}>
                                <img src={driver}></img>
                            </Col>
                            <Col sm={5}>
                                <div style={{ fontWeight: "bold", fontSize: 20 }}>
                                    {data.name}
                                </div>
                                <div className='mt-4' style={{ fontWeight: "bold", fontSize: 20 }}>
                                    P1239100 - B2 UMUM
                                </div>
                            </Col>
                            <Col sm={3} className='mt-3'>
                                <div style={{ color: "#1F3D7D", fontSize: 20, fontWeight: "bold", textAlign: 'center' }}>Jumlah</div>
                                <div style={{ color: "#1F3D7D", fontWeight: "bold", fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{data.selectedData?.length || 0}</div>
                            </Col>
                            <Col>
                                <Button onClick={toggleHide} style={{ marginTop: '10px' , backgroundColor :"blue" , color:"white" , borderRadius :10}}>{isHidden ? 'Show' : 'Hide'}</Button>
                            </Col>
                        </Row>
                    </Card>
                    {!isHidden ? (
                        (data.selectedData?.length || 0) === 0 ? (
                            <div className='d-flex justify-content-center' style={{ color: "#A2A2A2", fontSize: 20, marginTop: -20 }}>
                                Belum Ada Pengiriman
                            </div>
                        ) : (
                            <div style={{ color: "#A2A2A2", fontSize: 20, marginTop: -20 }}>
                                <div style={{ marginTop: -20 }}>
                                    {data.selectedData?.map((item, index) => (
                                        <Card key={item.id} style={{ padding: "0px", borderRadius: "10px", marginRight: -20, marginLeft: -20 }}>
                                            <Row style={{ backgroundColor: "", height: 30 }}>
                                                {/* <Button onClick={() => handleRemoveData(item.id)} color='red'>Hapus {index + 1}</Button> */}

                                                <Col>
                                                    <h4>{item.id}</h4>
                                                </Col>
                                                <Col className='d-flex justify-content-end'>
                                                    <Button disabled={item.status === "Waiting"} style={{ height: 30, width: 80 }}>
                                                        {item.status}
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Row className='mt-3'>
                                                <Col sm={7}>
                                                    <p>Pelanggan</p>
                                                </Col>
                                                <Col className='d-flex justify-content-start' style={{}} sm={5}>
                                                    <p>Tanggal Pick Up</p>
                                                </Col>
                                                <Col style={{ marginTop: -15 }} sm={8}>
                                                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.pelanggan}</p>
                                                </Col>
                                                <Col style={{ marginTop: -15 }} sm={4}>
                                                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.tanggalPickUp}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={3}>
                                                    <p>Asal Muatan</p>
                                                </Col>
                                                <Col sm={3} className='d-flex justify-content-start'>
                                                    <p>Tujuan Muatan</p>
                                                </Col>
                                                <Col sm={3} className='d-flex justify-content-start'>
                                                    <p>Kendaraan</p>
                                                </Col>
                                                <Col sm={3} className='d-flex justify-content-start' style={{}}>
                                                    <p>Tonase</p>
                                                </Col>
                                                <Col sm={3} style={{ marginTop: -15 }}>
                                                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.asalMuatan}</p>
                                                </Col>
                                                <Col sm={3} className='d-flex justify-content-start' style={{ marginTop: -15 }}>
                                                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.tujuanMuatan}</p>
                                                </Col>
                                                <Col sm={3} className='d-flex justify-content-start' style={{ marginTop: -15 }}>
                                                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.kendaraan}</p>
                                                </Col>
                                                <Col sm={3} className='d-flex justify-content-start' style={{ marginTop: -15 }}>
                                                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.tonase}</p>
                                                </Col>
                                            </Row>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )
                    ) : (
                        <div className='d-flex justify-content-center' style={{ color: "#A2A2A2", fontSize: 20, marginTop: -20 }}>
                            Tersedia {data.selectedData?.length || 0}
                        </div>
                    )}
                </Card>
            ))}

        </div>
    )
}

export default MappingDriverCard;
