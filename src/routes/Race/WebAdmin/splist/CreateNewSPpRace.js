import { Card, Form, Input, Select } from 'antd'
import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import CreateSPRace from '../../../../zustand/Store/Race/SelectCreateSP'

function CreateNewSPpRace() {
    const { SelectCreateSPRace, setSelectCreateSPRace } = CreateSPRace();

    useEffect(() => {
        setSelectCreateSPRace();
    }, [setSelectCreateSPRace]);
    console.log(SelectCreateSPRace);
    return (
        <div>
            <Card>
                <Row>
                    <Col md={3} className='mx-3'>
                        <Form.Item>
                            <p>input</p>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={3}>
                        <Form.Item>
                            <p>input</p>
                            <Select />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default CreateNewSPpRace