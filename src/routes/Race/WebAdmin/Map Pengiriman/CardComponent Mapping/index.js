import { Button, Card, Checkbox } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import CardMappingStoreRace from '../../../../../zustand/Store/DriverMappingCardRace/MappingStore';
function CardMapping({ onAdd , DataApi }) {
    const { selectedData, addData, removeData } = CardMappingStoreRace();
    const data = [
        {
            "id": "JKT23-007583",
            "status": "Waiting",
            "pelanggan": "PT Mulia Boga Raya TBK",
            "tanggalPickUp": "-",
            "asalMuatan": "Kabupaten Bekasi",
            "tujuanMuatan": "Kabupaten Bandung",
            "kendaraan": "Truk",
            "tonase": "10 Ton"
        },
        {
            "id": "JKT23-007584",
            "status": "In Transit",
            "pelanggan": "PT XYZ Indonesia",
            "tanggalPickUp": "2023-09-26",
            "asalMuatan": "Kabupaten Bogor",
            "tujuanMuatan": "Kabupaten Cirebon",
            "kendaraan": "Truk",
            "tonase": "15 Ton"
        },
        {
            "id": "JKT23-007581",
            "status": "In Transit",
            "pelanggan": "PT XYZ Indonesia",
            "tanggalPickUp": "2023-09-26",
            "asalMuatan": "Kabupaten Bogor",
            "tujuanMuatan": "Kabupaten Cirebon",
            "kendaraan": "Truk",
            "tonase": "15 Ton"
        },
        {
            "id": "JKT23-022581",
            "status": "In Transit",
            "pelanggan": "PT XYZ Indonesia",
            "tanggalPickUp": "2023-09-26",
            "asalMuatan": "Kabupaten Bogor",
            "tujuanMuatan": "Kabupaten Cirebon",
            "kendaraan": "Truk",
            "tonase": "15 Ton"
        }
    ]


    const handleCheckboxChange = (item , e) => {
        console.log(e.target.checked);
        if (selectedData.find(data => data.id === item.id)) {
            removeData(item.id);
        } else {
            addData(item);
        }
        console.log(selectedData);
    }
    return (
        <div>
            {DataApi && DataApi.map(item => (
                <Card key={item.sp} style={{ padding: "0px", borderRadius: "10px" }}>
                    <Row style={{ backgroundColor: "", height: 30 }}>
                        <Col sm={1}>
                            <Checkbox onChange={(e) => {  handleCheckboxChange(item , e) }} style={{ width: 20, height: 20 }} />
                            {/* <Checkbox  style={{ width: 20, height: 20 }} /> */}

                        </Col>
                        <Col>
                            <h4>{item.sp}</h4>
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
                        <Col style={{ marginTop: -15 }} sm={7}>
                            <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.customer}</p>
                        </Col>
                        <Col style={{ marginTop: -15 }} sm={4}>
                            <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.pickupDate}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={3}>
                            <p>Penerima</p>
                        </Col>
                        <Col sm={3} className='d-flex justify-content-start'>
                            <p>Tujuan Muatan</p>
                        </Col>
                        <Col sm={3} className='d-flex justify-content-start'>
                            <p>koli</p>
                        </Col>
                        <Col sm={3} className='d-flex justify-content-start' style={{}}>
                            <p>Qty</p>
                        </Col>
                        <Col sm={3} style={{ marginTop: -15 }}>
                            <p style={{ fontSize: "12px", fontWeight: "bold" }}>{item.penerima}</p>
                        </Col>
                        <Col sm={3} className='d-flex justify-content-start' style={{ marginTop: -15 }}>
                            <p style={{ fontSize: "12px", fontWeight: "bold" }}>{item.tujuan}</p>
                        </Col>
                        <Col sm={3} className='d-flex justify-content-start' style={{ marginTop: -15 }}>
                            <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.koli}</p>
                        </Col>
                        <Col sm={3} className='d-flex justify-content-start' style={{ marginTop: -15 }}>
                            <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.qty}</p>
                        </Col>

                    </Row>
                </Card>
            ))}
        </div>
    )
}
export default CardMapping