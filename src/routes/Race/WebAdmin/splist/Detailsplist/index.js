import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import bk from "../../../../../assets/img/Group 18.png"
import { Card, Divider, Steps, Tag } from 'antd'
import drivericon from "../../../../../assets/img/drivericon.png"
import './style.css'
import axios from 'axios'
import Baseurl from '../../../../../Api/BaseUrl'
import { useParams } from 'react-router-dom'
import moment from 'moment'
function DetailSPListRace() {
    const { idmp, id_msm } = useParams();
    const [DataApi, setDataApi] = useState([])
    const [DetailHistory, setDetailHistory] = useState()
    const getDetailApi = async () => {
        try {
            const data = await axios.get(`${Baseurl}sm/get-sm-detail?id_mpd=${idmp}&id_msm=${id_msm}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                })
            if (Array.isArray(data)) {
                setDataApi(data.data.data[0]);
            } else {
                setDataApi([data.data.data[0]]);
            }

        } catch (error) {

        }
    }


    const HistoryKendaraan = async () => {
        try {
            const datas = await axios.get(`${Baseurl}sm/get-history-kendaraan?id_msm=${id_msm}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                })
            setDetailHistory(datas.data.data)
        } catch (error) {

        }
    }

    console.log(`test`, DetailHistory);
    console.log(DataApi);
    useEffect(() => {
        getDetailApi()
        HistoryKendaraan()
    }, [])
    return (
        <div>
            <Row>
                {DataApi && DataApi.map((i) => (
                    <Col style={{ backgroundColor: "" }}>
                        <h3>Detail SJ</h3>
                        <div>Np. SP</div>
                        <div style={{ fontWeight: "bold" }}>{i.sp}</div>
                        <br />
                        <div>No. SJ</div>
                        <div style={{ fontWeight: "bold" }}>{i?.sm}</div>
                        <br />
                        <div>Customer</div>
                        <div style={{ fontWeight: "bold" }}>{i?.customer}</div>
                        <br />
                        <div>Service</div>
                        <div style={{ fontWeight: "bold" }}>{i?.service}</div>
                        <br />
                        <div>Pickup Date</div>
                        <div style={{ fontWeight: "bold" }}>{i?.tglPickup}</div>
                        <br />
                        <div>Pickup Address</div>
                        <div style={{ fontWeight: "bold" }}>{i?.pickupAddress}</div>
                        <br />
                        <div>Destination Address</div>
                        <div style={{ fontWeight: "bold" }}>{i?.destination}</div>
                        <br />
                        <div>Weight</div>
                        <div style={{ fontWeight: "bold" }}>{i?.weight}</div>
                        <br />
                        <div>Koli</div>
                        <div style={{ fontWeight: "bold" }}>{i?.koli}</div>
                        <br />
                        <div>Items</div>
                        <div style={{ fontWeight: "bold" }}>{i?.items}</div>
                    </Col>
                ))}
                <Col style={{
                    backgroundColor: "#1A3368",
                    backgroundImage: `url(${bk})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right center',
                    backgroundSize: 'auto'
                }}>
                    <h3 className='mt-3' style={{ color: "white" }}>Tracking Pengiriman</h3>
                    <Container>
                        <Row style={{ height: "432px" }}>
                            <Col style={{ backgroundColor: "" , marginTop : 50}}>
                                <Steps
                                    className="my-custom-steps"
                                    direction="vertical"
                                    size="small"
                                    current={5}
                                    style={{ padding: '20px', width: 400, height: 500 }}
                                    items={[
                                        {
                                            title: DetailHistory?.[0]?.keterangan,
                                            description: DetailHistory?.[0]?.status === undefined ? "Belum ada Data" : DetailHistory?.[0]?.status + " " + moment(DetailHistory?.[0]?.pickupDate).format("DD-MM-YYYY"),
                                        },
                                        {
                                            title: DetailHistory?.[1]?.keterangan,
                                            description: DetailHistory?.[1]?.status === undefined ? "Belum ada Data" : DetailHistory?.[1]?.status + " " + moment(DetailHistory?.[1]?.pickupDate).format("DD-MM-YYYY"),
                                        },
                                        {
                                            title: DetailHistory?.[2]?.keterangan,
                                            description: DetailHistory?.[2]?.status === undefined ? "Belum ada Data" : DetailHistory?.[2]?.status + " " + moment(DetailHistory?.[2]?.pickupDate).format("DD-MM-YYYY"),
                                        },

                                    ]}
                                />
                            </Col>
                        </Row>
                    </Container>
                    <Row style={{ marginTop: 80 }}>
                        <Container style={{ display: "flex", justifyContent: "center" }}>
                            <Card style={{ borderRadius: 15, width: 700 }} >
                                <Row>
                                    <Col sm={8}>
                                        <h5>Informasi Driver</h5>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={drivericon} alt="Driver Icon" style={{ marginRight: '15px' }} />
                                            <div style={{ fontWeight: "bold", marginTop: 20 }}>
                                                <p>{DataApi?.[0]?.driver1}</p>
                                                <p>{DataApi?.[0]?.mitraPickup}</p>
                                                <p>{DataApi?.[0]?.unit1 }</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm={4}>
                                        <div style={{ backgroundColor: "#1f3d7d", padding: 10, borderRadius: 15 }}>
                                            <div style={{ color: "white", fontWeight: "bold" }}>
                                                <p>{DataApi[0]?.sp}</p>
                                                <p>{DataApi[0]?.sm}</p>
                                                <p>{DataApi[0]?.destination}</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Container>
                        {/* <p className='d-flex justify-content-center' style={{ color: "white" }}>Butuh Bantuan? <span><a className='ms-2' style={{ color: "#5297FF", textDecoration: "none" }}>Klik Disini</a></span></p> */}

                    </Row>
                </Col>


            </Row>
        </div>
    )
}

export default DetailSPListRace