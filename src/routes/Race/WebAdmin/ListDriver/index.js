import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CardListDriver from './CardListDriver'

function ListDriver() {
    return (
        <div>
            <Row>
                <Col sm={9}>
                    <h4 style={{ color: "#1A3368" }}>List Driver</h4>
                </Col>
                <Col sm={3}>
                    <Input
                        width={"100%"}
                        prefix={<SearchOutlined />}
                        placeholder="Tulis pencarian Anda di sini"
                    />
                </Col>
                <div className='mt-5'>

                <CardListDriver/>
                </div>
            </Row>
        </div>
    )
}

export default ListDriver