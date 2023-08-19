import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react'

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
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {Array.from({ length: 3 }).map((_, index) => (
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
                    ))}

                    {/* <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    > */}
                    {/* <Button type="primary" htmlType="submit">
                            Submit
                        </Button> */}
                    {/* </Form.Item> */}
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