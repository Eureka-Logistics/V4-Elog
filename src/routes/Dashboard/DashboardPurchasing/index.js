import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Baseurl from '../../../Api/BaseUrl'
import { Col, Row } from 'react-bootstrap'
import { Card } from 'antd'
import {
    CheckCircleOutlined,
    TeamOutlined,
    CloseOutlined,
    CheckOutlined,
    PieChartOutlined
} from '@ant-design/icons';
function Index() {
    const [DataAwal, setDataAwal] = useState("")

    const ApiAwal = async () => {
        try {
            const data = await axios.get(`${Baseurl}information/get-inform-mitra`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            console.log(data.data.mitra[0]);
            setDataAwal(data.data.mitra[0])
        } catch (error) {

        }
    }

    useEffect(() => {
        ApiAwal()
    }, [])
    return (
        <div>
            <Row>
                <Col sm={3}>
                    <Card style={{ backgroundColor: "white", textAlign: 'center' }}>
                        <Row>

                            <Col span={2}>
                                <div style={{ color: "grey" }}>
                                Jumlah Mitra
                                </div>
                                <h5>
                                    {DataAwal?.jumlahMitra}
                                </h5>
                            </Col>
                            <Col span={2}>
                                <div style={{ fontSize: "30px", backgroundColor: '#00BFFF', borderRadius: "50%", width: "60px", height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <CheckOutlined style={{ color: "white" }}>
                                    </CheckOutlined>
                                </div>
                            </Col>

                        </Row>

                    </Card>
                </Col>
                <Col sm={3}>
                    <Card style={{ backgroundColor: "white", textAlign: 'center' }}>
                        <Row>

                            <Col span={2}>
                                <div style={{ color: "grey" }}>
                                Unit Mitra
                                </div>
                                <h5>
                                    {DataAwal?.unitMitra}
                                </h5>
                            </Col>
                            <Col span={2}>
                                <div style={{ fontSize: "30px", backgroundColor: '#00BFFF', borderRadius: "50%", width: "60px", height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <TeamOutlined style={{ color: "white" }}>
                                    </TeamOutlined>
                                </div>
                            </Col>

                        </Row>

                    </Card>
                </Col>
                    <Col sm={3}>
                        <Card style={{ backgroundColor: "white", textAlign: 'center' }}>
                            <Row>

                                <Col span={2}>
                                    <div style={{ color: "grey" }}>
                                    Driver Mitra
                                    </div>
                                    <h5>
                                        {DataAwal?.driverMitra}
                                    </h5>
                                </Col>
                                <Col span={2}>
                                    <div style={{ fontSize: "30px", backgroundColor: '#00BFFF', borderRadius: "50%", width: "60px", height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <PieChartOutlined style={{ color: "white" }}>
                                        </PieChartOutlined>
                                    </div>
                                </Col>

                            </Row>

                        </Card>
                    </Col>
            </Row>

        </div>
    )
}

export default Index