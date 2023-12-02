import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { BaseUrlRace } from '../../../../../Api/BaseUrl'
import { Card, Input } from 'antd'
import { Col, Row } from 'react-bootstrap'

function DetailSpRace() {
    const { idMp } = useParams()

    const GetDetail = () => {
        try {
            const data = axios.get(`${BaseUrlRace}sp/get-sp-detail?id_mp=${idMp}`)
            console.log(data.data);
        } catch (error) {

        }
    }
    useEffect(() => {
        GetDetail()
    }, [])
    return (
        <div>
            <Card>
                <Row>
                    <Col>
                        <div className='mt-2'>No SP</div>
                        <Input></Input>
                    </Col>
                    <Col>
                        <div className='mt-2'>No SP</div>
                        <Input></Input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='mt-2'>No SP</div>
                        <Input></Input>
                    </Col>
                    <Col>
                        <div className='mt-2'>No SP</div>
                        <Input></Input>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div className='mt-2'>No SP</div>
                        <Input></Input>
                    </Col>
                    <Col>
                        <div className='mt-2'>No SP</div>
                        <Input></Input>
                    </Col>
                    <Col>
                        <div className='mt-2'>No SP</div>
                        <Input></Input>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <div className='mt-2'>No SP</div>
                        <Input></Input>
                    </Col>
                    <Col>
                        <div className='mt-2'>No SP</div>
                        <Input></Input>
                    </Col>
                    <Col md={6}>
                        <div className='mt-2'>No SP</div>
                        <Input></Input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='mt-2'>Alamat Invoice</div>
                        <Input></Input>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default DetailSpRace