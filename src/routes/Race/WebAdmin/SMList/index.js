import { Button, Card, Drawer, Form, Input, Pagination, Tag, notification } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Baseurl from '../../../../Api/BaseUrl';
import MapContainer from "../../../MasterData/Monitoring/Test"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import icondriver from "../../../../assets/img/drivericon.png"
import telponicon from "../../../../assets/img/telponicon.png"
import whatsappicon from "../../../../assets/img/whatsappicon.png"
import "./style.css"
import { getCoordinates } from '../../../../Api/Geocode';
import MapsGoogle from '../../../../components/MapsGoole';
import useCoordinateRaceMap from '../../../../zustand/Store/coordinateMapRace/RaceMaps';
function SMList({ }) {
    const [Open, setOpen] = useState(false)
    const [CariSJ, SetCariSJ] = useState("")
    const [DetailDataPerClick, setDetailDataPerClick] = useState([])
    const showDefaultDrawer = (e) => {
        setOpen(true);

    };
    const { Coordinate, setCoordinate } = useCoordinateRaceMap()
    console.log(`CoordinateRaceMap`, Coordinate);
    const [AlamatMuatBongkarCoordinate, setAlamatMuatBongkarCoordinate] = useState({
        AlamatMuat: "",
        AlamatBongkar: "",
    })
    const [DataApi, setDataApi] = useState({
        Data: null,
        totalData: "",
        totalPage: "",
        currentPage: 1,
        limit: 10,
    })

    const DataApiSM = async (s = 1) => {
        try {
            const dataa = await axios.get(`https://api.eurekalogistics.co.id/sm/get-sm?limit=${DataApi.limit}&page=${s}&keyword=${CariSJ}&kodeCabang=&mitra1=&mitra2=&mitra3=&id_bu=&id_bu_brench=`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            setDataApi(data => ({
                ...data,
                Data: dataa?.data?.data?.order,
                totalData: dataa?.data?.data?.totalData,
                totalPage: dataa?.data?.data?.totalPage,
                currentPage: dataa?.data?.data?.currentPage
            }));
        } catch (error) {
            notification.error({
                message: error.response.data.status.message
            });
        }
    }
    useEffect(() => {
        DataApiSM()
    }, [CariSJ, DataApi.limit])




    const history = useHistory()
    const pindahdetailsp = () => {
        if (!DetailDataPerClick?.other?.id_mpd || !DetailDataPerClick?.other?.id_msm) {
            notification.error({
                message: "Error",
                description: "Tidak ada id_mpd || id_msm",
            })
        } else {

            history.push(`/race/detailsplistrace/${DetailDataPerClick?.other?.id_mpd}/${DetailDataPerClick?.other?.id_msm}`)
        }
    }

    function sendMessage() {
        const phoneNumber = "6281221871961";
        const name = "Bapak Budiawan Suprapto";
        const message = `Halo ${name},
        
        Semoga Anda dalam keadaan baik-baik saja. Saya ingin menanyakan bagaimana keadaan Anda selama melakukan perjalanan dan proses pengangkutan barang. Apakah semuanya berjalan lancar atau ada kendala tertentu yang perlu kami ketahui? Apabila ada masalah atau hambatan, tolong beritahu kami agar kami bisa memberikan bantuan atau solusi secepatnya. Terima kasih atas perhatian dan kerja keras Anda. Kami menghargai dedikasi Anda dalam menjalankan tugas ini.
   
        
Salam hangat,
[Tim Race]`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
    }
    const onClose = () => {
        setOpen(false);
    };


    function Paginations(s, u) {
        DataApiSM(s)
        setDataApi(items => ({
            ...items,
            limit: u
        }))
    }
    const [isDataFetched, setIsDataFetched] = useState(false);
    useEffect(() => {
        setIsDataFetched(true)
        const fetchData = async () => {
            const AlamatMuat = await getCoordinates(DetailDataPerClick?.other?.m_pengadaan_detail?.muat?.alamat || DetailDataPerClick?.other?.m_pengadaan_detail?.muat?.alamat_detail);
            const Bongkar = await getCoordinates(DetailDataPerClick?.other?.m_pengadaan_detail?.bongkar?.alamat || DetailDataPerClick?.other?.m_pengadaan_detail?.bongkar?.alamat_detail);

            setAlamatMuatBongkarCoordinate(item => ({
                ...item,
                AlamatMuat: AlamatMuat,
                AlamatBongkar: Bongkar,
            }));
            setCoordinate({
                AlamatMuat,
                Bongkar,
            });
            // console.log(`ini dari DetailDataPerClick`, AlamatMuat);
            // console.log(`ini dari DetailDataPerClick`, Bongkar);
        };
        setIsDataFetched(false)
        fetchData();
    }, [DetailDataPerClick]);



    return (
        <div>

            {DetailDataPerClick ?
            
            <Drawer
                title={`Tracking Pengiriman` + " " + DetailDataPerClick?.destination}
                width={3220}
                closable={false}
                onClose={onClose}
                open={Open}
            >
                <Card bodyStyle={{ padding: 0 }} style={{ height: 350, overflow: 'hidden' }}>

                    {!isDataFetched ? (

                        <MapsGoogle AlamatMuatBongkarCoordinate={AlamatMuatBongkarCoordinate} width={730} height={350} />
                    ) : (
                        <div>Loading...</div> // tampilkan pesan loading atau komponen lainnya saat data belum selesai di-fetch
                    )}

                    {/* <MapContainer AlamatMuatBongkarCoordinate={AlamatMuatBongkarCoordinate} /> */}
                </Card>
                <Card bodyStyle={{ padding: 0 }} style={{ height: "auto" }}>
                    <Container>
                        <p style={{ fontWeight: "bold", fontSize: 20 }}>Informasi Driver</p>
                        {Array.isArray(DetailDataPerClick) ? DetailDataPerClick.map((i, index) => (
                            <Row style={{ marginTop: "20px" }}>
                                <Col >
                                    <p style={{ fontWeight: "bold" }}>{i.driver1}</p>
                                    <p style={{ fontWeight: "bold" }}>{i.kendaraanMitra1}</p>
                                    <p style={{ fontWeight: "bold" }}>{i.unit1}</p>
                                </Col>
                                <Col >
                                    <p style={{ fontWeight: "bold" }}>{i.sp}</p>
                                    <p style={{ fontWeight: "bold" }}>{i.sm}</p>
                                    <p style={{ fontWeight: "bold" }}>{i.tglPickup}</p>

                                </Col>

                                <Col className='d-flex justify-content-end align-items-center'>
                                    <img src={telponicon} style={{ height: "80px", width: "93px", borderRadius: "10px" }}></img>
                                    <img onClick={sendMessage} src={whatsappicon} style={{ height: "80px", width: "93px", borderRadius: "10px", cursor: "pointer" }}></img>
                                </Col>
                            </Row>
                        )) : null}
                        <hr />
                        <Row style={{}} className="align-items-center">
                            <Col style={{ backgroundColor: "" }} md={8}>
                                <Col style={{ backgroundColor: "" }} >
                                    <div style={{ fontWeight: "bold", fontSize: 20 }}>Informasi Perjalanan</div>
                                </Col>
                                <Row>
                                    <Col style={{ backgroundColor: "" }}>
                                        <div style={{ fontWeight: "bold" }}>Customer</div>
                                        <div style={{ fontWeight: "bold", marginTop: 5 }}>Destination</div>
                                        <div style={{ fontWeight: "bold", marginTop: 5 }}>Alamat Muat</div>
                                        <div style={{ fontWeight: "bold", marginTop: 5 }}>Alamat Bongkar</div>
                                    </Col>
                                    <Col >
                                        <div style={{ fontWeight: "bold" }}>{DetailDataPerClick?.customer}</div>
                                        <div style={{ fontWeight: "bold", marginTop: 5 }}>{DetailDataPerClick?.destination}</div>
                                        <div style={{ fontWeight: "bold", marginTop: 5 }}>{DetailDataPerClick?.other?.m_pengadaan_detail?.muat?.alamat_detail}</div>
                                        <div style={{ fontWeight: "bold", marginTop: 5 }}>{DetailDataPerClick?.other?.m_pengadaan_detail?.bongkar?.alamat_detail}</div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className='d-flex justify-content-end'>
                                <Button
                                    onClick={pindahdetailsp}
                                    style={{
                                        backgroundColor: "blue",
                                        fontWeight: "bold",
                                        fontSize: 20,
                                        color: 'white',
                                        cursor: 'pointer',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Cek Detail
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Card>
            </Drawer>
            : <>Loading</>}
            <Row>
                <Col className='ms-3' sm={4} md={2}>
                    <Form.Item>
                        <div style={{ fontWeight: "bold" }}>
                            Cari SJ
                        </div>
                        <Input onChange={(e) => { SetCariSJ(e.target.value) }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {!DataApi.Data && (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                        Loading...
                    </div>

                )}
                <Pagination className='d-flex justify-content-end'
                    // current={1}
                    onChange={(page, size) => Paginations(page, size)}
                    total={DataApi.totalData}
                // pageSize={10}
                />
                {DataApi.Data && DataApi.Data.map((i, currentIndex) => {
                    const index = (DataApi.currentPage - 1) * DataApi.limit + currentIndex;
                    // rest of your code
                    return (
                        <Col sm={12} md={6} >
                            <Card hoverable onClick={async (e) => {
                                console.log(`ini i i`, i);
                                setDetailDataPerClick(i);
                                showDefaultDrawer(i)
                                console.log(`ini log i`, i);
                            }} style={{ height: 230, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                                <Container>
                                    <Row style={{ marginTop: -10 }}>
                                        <Col>
                                            <Button disabled type='primary'>{index + 1}</Button>
                                        </Col>
                                        <Col sm={6}>
                                            <h3><Tag style={{ fontSize: 18 }} color='orange'>{i.sp}</Tag></h3>
                                        </Col>
                                        <Col sm={4}>
                                            <h3><Tag style={{ fontSize: 18 }} color='orange'>{i.sm}</Tag></h3>
                                        </Col>
                                    </Row>
                                    <Row className='mt-3'>
                                        <Row>

                                            <Col sm={6} md={7} >
                                                <p style={{ marginBottom: "0px", fontWeight: "bold" }}>Pelanggan</p>
                                            </Col>
                                            <Col sm={6} md={5}>
                                                <p style={{ marginBottom: "0px", fontWeight: "bold", display: "flex", justifyContent: "center" }}>Tanggal Pick Up</p>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col sm={6} md={6}>
                                                <p style={{ marginTop: "0px", marginBottom: "0px", fontWeight: "bold" }}><Tag color='yellow'>{i.bu}</Tag></p>
                                            </Col>

                                            <Col sm={6} md={5} className='ms-4'>
                                                <p style={{ backgroundColor: "", marginBottom: "20px", fontWeight: "bold", display: "flex", justifyContent: "end" }}><Tag color="blue">{i.tglPickup}</Tag></p>
                                            </Col>

                                        </Row>

                                    </Row>

                                    <Row style={{ backgroundColor: "" }}>
                                        <Col sm={4} md={4}>
                                            <p style={{ marginTop: "20px", fontWeight: "bold" }}>Kendaraan Pickup</p>
                                            <p style={{ marginTop: "-10px", fontWeight: "bold" }}>{i?.kendaraanPickup}</p>
                                        </Col>
                                        <Col sm={4} md={4}>
                                            <p style={{ marginTop: "20px", fontWeight: "bold" }}>Destination</p>
                                            <p style={{ marginTop: "-10px", fontWeight: "bold" }}><Tag color="teal">{i.destination}</Tag></p>
                                        </Col>
                                        <Col>
                                            <p style={{ marginTop: "20px", fontWeight: "bold" }}>Nama Driver</p>
                                            <p style={{ marginTop: "-10px", fontWeight: "bold" }}>{i?.driver1}</p>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div >
    )
}

export default SMList