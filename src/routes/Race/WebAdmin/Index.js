import { Card, Col, Row } from 'antd'
import React from 'react'
import './style.css';

function Index() {
    return (
        <>
            <div style={{ fontSize: 25, display: "flex", justifyContent: "start" }}>Halaman Utama</div>
            <Row className='mt-3'>
                <Col sm={6}>
                    <Card style={{ backgroundColor: "#dd4b39", height: 120, padding: 0 }}>
                        <div style={{ color: "white", marginTop: "-15px", marginLeft: "-10px", fontSize: 15, alignItems: "flex-start", justifyContent: "flex-start", display: "flex", height: "120%" }}>
                            Waiting SPK
                        </div>
                        <div style={{ color: "white", fontWeight: 500, fontSize: 30, marginLeft: "-10px" }}>Waiting SPK</div>
                    </Card>
                </Col>
                <Col sm={6}>
                    <Card style={{ backgroundColor: "#f39c12", height: 120 }}>
                        <div style={{ color: "white", marginTop: "-15px", marginLeft: "-10px", fontSize: 15, alignItems: "flex-start", justifyContent: "flex-start", display: "flex", height: "120%" }}>
                            SM
                        </div>
                        <div style={{ color: "white", fontWeight: 500, fontSize: 30, marginLeft: "-10px" }}>SM List</div>
                    </Card>
                </Col>
                <Col sm={6}>
                    <Card style={{ backgroundColor: "#39cccc", height: 120 }}>
                        <div style={{ color: "white", marginTop: "-15px", marginLeft: "-10px", fontSize: 15, alignItems: "flex-start", justifyContent: "flex-start", display: "flex", height: "120%" }}>
                            SPK
                        </div>
                        <div style={{ color: "white", fontWeight: 500, fontSize: 30, marginLeft: "-10px" }}>SPK Status</div>
                    </Card>
                </Col>
                <Col sm={6}>
                    <Card style={{ backgroundColor: "#00a65a", height: 120 }}>
                        <div style={{ color: "white", marginTop: "-15px", marginLeft: "-10px", fontSize: 15, alignItems: "flex-start", justifyContent: "flex-start", display: "flex", height: "100%" }}>
                            SO
                        </div>
                        <div style={{ color: "white", fontWeight: 500, fontSize: 30, marginLeft: "-10px" }}>SP List</div>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Index