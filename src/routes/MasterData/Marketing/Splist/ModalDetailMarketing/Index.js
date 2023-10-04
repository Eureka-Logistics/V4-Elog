import { Button, Form, Input, Modal } from 'antd'
import React from 'react'

function ModalDetailMarketing({ modal1Open, setModal1Open, name, detailsemua }) {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Modal
                title={`Detail Marketing` + " " + name}
                style={{
                    top: 20,
                    width: 1000
                }}
                open={modal1Open}
                onOk={() => setModal1Open(false)}
                onCancel={() => setModal1Open(false)}
            >
                <Form
                    initialValues={{
                        asm: detailsemua?.asm,
                        kacab : detailsemua?.kacab,
                        gl : detailsemua?.gl,
                        kacab : detailsemua?.kacab,
                        mgr : detailsemua?.mgr,
                        amd : detailsemua?.amd,
                    }}
                    labelAlign="left"
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                        textAlign: "start"
                    }}
                  
                    layout='horizontal'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"

                >
                    <Form.Item
                        label="Kacap"
                        name="kacab"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Asm"
                        name="asm"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input
                            value={detailsemua?.asm} />
                    </Form.Item>
                    <Form.Item
                        label="Gl"
                        name="gl"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mgr"
                        name="mgr"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Amd"
                        name="amd"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>



                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ModalDetailMarketing