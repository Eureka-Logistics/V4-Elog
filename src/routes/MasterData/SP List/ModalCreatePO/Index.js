import { Button, Form, Input, Modal } from 'antd';
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
                title="Modal Create PO"
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
                    <Row>
                    {Array.from({ length: 3 }).map((_, index) => (
                            <Col md={4}>
                            <Form.Item
                                key={index}
                                label={`PO number ${index + 1} Mitra Name`}
                                name={`po_number_${index + 1}`}
                                rules={[
                                    {
                                        required: false,
                                        message: `Please input PO number ${index + 1}!`,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            </Col>
                    ))}
                    </Row>
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