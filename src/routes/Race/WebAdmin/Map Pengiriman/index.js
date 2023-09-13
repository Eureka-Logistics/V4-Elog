    import { Button, Card, Checkbox } from 'antd'
    import React from 'react'
    import { Col, Row } from 'react-bootstrap'
    import CardMapping from './CardComponent Mapping/index'
    import "./style.css"
    function MapPengiriman() {

        const handleCardClick = (id) => {
            console.log(`Card dengan ID ${id} telah diklik`);
        };


        
        return (
            <div>
                <Row>
                    <Col sm={6}>
                        <Row>
                            <Col sm={6}>
                                <h4>Mapping Pengiriman</h4>
                            </Col>
                            <Col className="d-flex justify-content-end" sm={6}>
                                <h5>Mapping Otomatis</h5>
                            </Col>
                        </Row>
                        <div className="div-no-scrollbar" style={{ padding: "0px", height: "800px", backgroundColor: "", overflow: "auto" }}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} onClick={() => handleCardClick(index)}>
                                    <CardMapping />
                                </div>
                            ))}
                        </div>

                        {/* Card Mapping */}
                        {/* End Card Mapping */}
                    </Col>
                    <Col sm={6}>
                        <Card style={{ padding: "0px", height: 800 }}>
                            <Row>
                                <h5>Driver Tersedia</h5>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }

    export default MapPengiriman