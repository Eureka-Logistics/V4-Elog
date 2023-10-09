import React, { useEffect, useState } from 'react'
import { Button, Input, Modal, Table, notification } from 'antd';
import { Col, Row } from 'react-bootstrap';
import MapsDetailSM from '../../../../../../zustand/Store/DataUntukMapDetailSM';
import MapContainer from "../../../../Monitoring/Test"
import axios from 'axios';
import Baseurl from '../../../../../../Api/BaseUrl';
import { getCoordinates } from '../../../../../../Api/Geocode';
import ReCAPTCHA from "react-google-recaptcha";
import moment from 'moment';
function ModalMapsSJ() {
    const { dataapi } = MapsDetailSM((state) => state || null);
    const [ModalMapsSJOpen, setModalMapsSJOpen] = useState(false);
    const [Hide, setHide] = useState(false)
    const [datalokasi, setdatalokasi] = useState([])
    const NamaDestinasi = "Kota"
    const [Coordinates, setCoordinates] = useState((i) => ({
        label: NamaDestinasi,
        origin: null,
        destinasion: null
    }))
    const [LokasiTerakhirKendaraan, setLokasiTerakhir] = useState((i) => ({
        lat: null,
        lng: null
    }))
    // console.log(`dataapi?.gps_device_id`,dataapi?.gps_device_id);
    console.log(`LokasiTerakhir`, LokasiTerakhirKendaraan);
    const apiloc = async () => {
        const body = {
            "deviceId": dataapi?.gps_device_id
            // "deviceId": "113454749"
        };

        try {
            const response = await axios.post(
                `https://apigps.eurekalogistics.co.id/gps/get-location`,
                body,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    }
                }
            );
            // console.log(`testt`, response.data.data[0]);
            setdatalokasi(response.data.data)
            setLokasiTerakhir({
                lng: 97.899877,
                lat: 4.728272
                // lng: response.data.data[0].longitude,
                // lat: response.data.data[0].latitude
            });
        } catch (error) {
            console.error(error);
        }
    }

    const columns = [

        {
            title: 'Latitude',
            dataIndex: 'latitude',
        },
        {
            title: 'Longitude',
            dataIndex: 'longitude',
        },
        {
            title: 'Pool',
            dataIndex: 'hotspot',
        },
        {
            title: 'Tanggal Update',
            dataIndex: 'date_update',
            render: (text) => moment(text).format('DD-MM-YYYY HH:mm:ss')
        },
        {
            title: 'Location',
            dataIndex: 'location',
        },
    ];

  
    useEffect(() => {
        const fetchCoordinates = async () => {
            const pickup = await getCoordinates(dataapi?.pickupAddress);
            const desti = await getCoordinates(dataapi?.destination);

            setCoordinates({
                origin: pickup,
                destination: desti
            });
        };

        apiloc();
        fetchCoordinates();
    }, [dataapi?.pickupAddress, dataapi?.destination]);
    return (
        <div>
            <Button type="primary" onClick={() => {
              
                    setModalMapsSJOpen(true);
              
            }}>
                Cek Lokasi Kendaraan
            </Button>
            
            <Modal
                title={`Lokasi Kendaraan`}
                width={1000}
                style={{
                    top: 10,
                }}

                open={ModalMapsSJOpen}
                onOk={() => setModalMapsSJOpen(false)}
                onCancel={() => setModalMapsSJOpen(false)}
            >

                <Row>
                    <Col sm={6}>
                        <Input disabled value={dataapi?.pickupAddress} />
                    </Col>
                    <Col sm={6}>
                        <Input disabled value={dataapi?.destination} />
                    </Col>
                    <Row>
                        <Col sm={6}>
                            <div className='mt-3'>GPS ID : {dataapi?.gps_device_id}</div>
                        </Col>
                        <Col sm={6}>
                            <div className='mt-2 d-flex justify-content-end'>
                                <Button type='primary' size='sm' onClick={() => setHide(!Hide)}>
                                    {Hide ? 'Show Maps' : 'Hide Maps'}
                                </Button>

                            </div>
                        </Col>
                    </Row>
                </Row>
                <Row style={{ backgroundColor: "" }}>
                    <Col sm={6} style={{ backgroundColor: "" }}>
                        <div className='d-flex justify-content-start' style={{ height: '650px', marginTop: 5 }}>
                            {!Hide && (
                                <MapContainer style={{ width: '94%', height: '30%' }}
                                    origin={Coordinates?.origin}
                                    destination={Coordinates?.destination}
                                    LokasiTerakhir={LokasiTerakhirKendaraan}
                                />
                            )}

                        </div>
                    </Col>
                </Row>
                {Hide ? (
                    <Row style={{ marginTop: "-65%" }}>
                        <Col>
                            <Table dataSource={datalokasi} columns={columns} />
                        </Col>
                    </Row>
                ) : <Row style={{ marginTop: "-18%" }}>
                    <Col>
                        <Table dataSource={datalokasi} columns={columns} />
                    </Col>
                </Row>}

            </Modal>
        </div >
    )
}

export default ModalMapsSJ