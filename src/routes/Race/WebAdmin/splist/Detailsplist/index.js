import React from 'react'
import { Col, Row } from 'react-bootstrap'
import bk from "../../../../../assets/img/Group 18.png"
function DetailSPListRace() {
    return (
        <div>
            <Row>
                <Col style={{ backgroundColor: "" }}>
                    <h3>Detail SJ</h3>
                    <div>No. SP</div>
                    <div style={{ fontWeight: "bold" }}>SP22163/09/23/JKT</div>
                    <br />
                    <div>No. SJ</div>
                    <div style={{ fontWeight: "bold" }}>JKT23-009443</div>
                    <br />
                    <div>Customer</div>
                    <div style={{ fontWeight: "bold" }}>PT. Serena Indopangan Industri</div>
                    <br />
                    <div>Service</div>
                    <div style={{ fontWeight: "bold" }}>Charter</div>
                    <br />
                    <div>Pickup Date</div>
                    <div style={{ fontWeight: "bold" }}>01-09-2023 (17:07)</div>
                    <br />
                    <div>Pickup Address</div>
                    <div style={{ fontWeight: "bold" }}>Jl. Haji Muhammad Ashari No.35, Cibinong, Bogor Jawa Barat</div>
                    <br />
                    <div>Destination Address</div>
                    <div style={{ fontWeight: "bold" }}>Jl. S Parman No.17/21 RT.07 RW.01 Tegal Sari Kec. Tepanyar Kel. Sarinah, Jakarta Pusat</div>
                    <br />
                    <div>Weight</div>
                    <div style={{ fontWeight: "bold" }}>2000Kg</div>
                    <br />
                    <div>Koli</div>
                    <div style={{ fontWeight: "bold" }}>-</div>
                    <br />
                    <div>Pcs</div>
                    <div style={{ fontWeight: "bold" }}>-</div>
                    <br />
                    <div>Items</div>
                    <div style={{ fontWeight: "bold" }}>-</div>
                </Col>
                <Col style={{
                    backgroundColor: "#1A3368",
                    backgroundImage: `url(${bk})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right center',  
                    backgroundSize: 'auto'  
                }}>
                    <h3 style={{ color: "white" }}>Tracking Pengiriman</h3>
                </Col>


            </Row>
        </div>
    )
}

export default DetailSPListRace