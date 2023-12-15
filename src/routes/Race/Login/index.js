import { Button, Form, Input } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

function LoginRaceCustomer() {
    return (
        <div className='d-flex justify-content-center ' style={{ alignItems: "center", height: "100vh" }}>
            <div style={{ backgroundColor: "#5EBFF7", boxShadow: "10px 4px 20px 2px rgba(1, 1, 0.1, 0.2)", height: "auto", width: "500px", borderRadius: "10px", padding: 20 }}>
                <div className='login-from'>
                    <Row>
                        <Col className='mx-4 mt-2'>
                            <Form.Item >
                                <div>User</div>
                                <Input />
                            </Form.Item>
                            <Form.Item >
                                <div>Password</div>
                                <Input />
                            </Form.Item>
                        </Col>
                        <div className='d-flex justify-content-center' style={{ backgroundColor: "" }}>
                            <Button size='sm' type='primary'>Login</Button>
                        </div>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default LoginRaceCustomer