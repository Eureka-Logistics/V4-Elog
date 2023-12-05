import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { BaseUrlRace } from '../../../../../Api/BaseUrl'
import { Card, Input } from 'antd'
import { Col, Row } from 'react-bootstrap'
import { SpDetailRaceZustand } from '../../../../../zustand/Store/Race/fetch/spDetail/SpdEtail'

function DetailSpRace() {
    const { idMp } = useParams()
    const { FetcSPDetail, DataSemuaDarizustand } = SpDetailRaceZustand()
    useEffect(() => {
        FetcSPDetail(idMp)
    }, [])
    console.log(`dari zustand`,DataSemuaDarizustand);

    if (!DataSemuaDarizustand) {
        return <>loading</>
    }
    return (
        <div>
            <Card>
                <Row>
                    <Col>
                        <div className='mt-2'>No SP</div>
                        <Input value={DataSemuaDarizustand?.sp}/>
                    </Col>
                    <Col>
                        <div className='mt-2'>SJ Erl</div>
                        <Input value={DataSemuaDarizustand?.sjErl}/>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col >
                        <div className='mt-2'>Cabang</div>
                        <Input value={DataSemuaDarizustand?.cabang}></Input>
                    </Col>
                    <Col >
                        <div className='mt-2'>Tanggal Pickup</div>
                        <Input value={DataSemuaDarizustand?.tgl_pickup}></Input>
                    </Col>
                    <Col>
                        <div className='mt-2'>Jenis Barang</div>
                        <Input value={DataSemuaDarizustand?.jenisBarang}></Input>
                    </Col>
                    <Col >
                        <div className='mt-2'>Sales Erl</div>
                        <Input value={DataSemuaDarizustand?.salesErl}></Input>
                    </Col>
                </Row>
               
            </Card>
        </div>
    )
}

export default DetailSpRace