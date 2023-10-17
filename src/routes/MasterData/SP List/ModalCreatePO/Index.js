import { Button, Card, Form, Input, Modal } from 'antd';
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';

function ModalCreatePO({ show, onHide }) {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
        // onHide(); // close the modal after submitting
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    let number = 1
    return (
        <div>
            <Modal
                title=" Buat PO"
                style={{
                    top: 20,
                }}
                width={1000}
                visible={show}
                onOk={() => form.submit()}
                onCancel={onHide}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    // style={{
                    //     maxWidth: 600,
                    // }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div>
                        <Row>
                            <Col sm={6}>
                                <div >
                                    <Card style={{ backgroundColor: "#b7d1f8" }}>
                                    <p style={{ fontWeight :"bold" }}>PO 1 Mitra 1</p>
                                        <Input className='mb-3' placeholder='sp 01' />
                                        <Input placeholder='sp 02' />
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <div >
                                    <Card style={{ backgroundColor: "#b7d1f8" }}>
                                    <p style={{ fontWeight :"bold" }}>PO 2 Mitra 2</p>
                                        <Input className='mb-3' placeholder='sp 03' />
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </Modal>
            <br />
            <br />
            {/* <Button type="primary" onClick={() => setModal2Open(true)}>
                Vertically centered modal dialog
            </Button> */}
            <Modal />
        </div>
    )
}

export default ModalCreatePO