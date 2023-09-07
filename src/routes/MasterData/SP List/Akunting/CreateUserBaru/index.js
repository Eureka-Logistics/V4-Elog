import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, notification } from 'antd';
import { Col, Container, Row } from 'react-bootstrap';
import './style.css'
import axios from 'axios';
import Baseurl from '../../../../../Api/BaseUrl';
import { array } from 'prop-types';

function CreateUserBaru() {
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();


    const createuser = async (combinedValues) => {
        const payload = {
            ...combinedValues,
        };
        try {
            const data = await axios.post(`${Baseurl}auth/register-user`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            console.log(data);
            notification.success({
                message: data.data.status.message
            })
        } catch (error) {
            if (error.response && error.response.data && error.response.data.status) {
                const errorStatus = error.response.data.status;
                if (Array.isArray(errorStatus)) {
                    errorStatus.forEach(element => {
                        notification.error({
                            message: element.message
                        });
                    });
                } else if (errorStatus.message) {
                    notification.error({
                        message: errorStatus.message
                    });
                }
            }
        }

    }

    const onFinish = () => {
        const values1 = form1.getFieldsValue();
        const values2 = form2.getFieldsValue();
        const combinedValues = { ...values1, ...values2 };

        // console.log('Form 1 values:', values1);
        // console.log('Form 2 values:', values2);
        console.log(combinedValues);
        createuser(combinedValues)
    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <> 
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#b9bfe1'
            }}>
                <Row>
                    <Col sm={6} style={{ backgroundColor: 'white', width: "400px", borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', height: 800 }}>
                        <Container>
                            <h3 style={{ fontSize: 20, fontWeight: 5020, color: "blue", marginTop: "30px", textAlign: "center" }}>Register User Baru</h3>
                            <Col className='mt-3'>
                                <div>
                                    <Form
                                        form={form1}
                                        name="basic"
                                        labelCol={{
                                            span: 24,
                                        }}
                                        wrapperCol={{
                                            span: 24,
                                        }}
                                        layout='vertical'
                                        style={{
                                            // maxWidth: 600,
                                        }}
                                        initialValues={{
                                            remember: false,
                                        }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            label="Username"
                                            name="username"
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
                                            label="Password"
                                            name="password"
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Please input your password!',
                                                },
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Form.Item
                                            label="Nama Lengkap"
                                            name="nama_lengkap"
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Please input your nama_lengkap!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Please input your email!',
                                                    type: 'email',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="No Telpon"
                                            name="no_telp"
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Please input your no_telp!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label={"Perusahaan"}
                                            name="perusahaan"
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Please input your perusahaan!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label={"Divisi"}
                                            name="divisi"
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Please input your divisi!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label={"Level"}
                                            name="level"
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Please input your level!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Col>
                        </Container>
                    </Col>
                    <Col sm={6} style={{ backgroundColor: '#463acc', width: "400px", borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: 800 }}>
                        <Container>
                            <div style={{ fontSize: 20, fontWeight: 2020, color: "blue", marginTop: "70px" }}></div>
                            <Form
                                form={form2}
                                className="custom-label"
                                name="basic"
                                labelCol={{
                                    span: 24,
                                    style: { color: 'white' }  // Tambahkan ini
                                }}
                                wrapperCol={{
                                    span: 24,
                                }}
                                layout='vertical'
                                style={{
                                    color: "white"
                                    // maxWidth: 600,
                                }}
                                initialValues={{
                                    remember: false,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >

                                <Form.Item
                                    label={"Cabang"}
                                    name="id_cabang"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your Cabang!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>


                                <Form.Item
                                    label="Kode Perusahaan"
                                    name="perusahaan"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your perusahaan!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Nama Lengkap"
                                    name="username"
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
                                    label="Kode Cabang"
                                    name="kode_cabang"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your Kode Cabang!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Bisnis Unit"
                                    name="id_bu"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your Bisnis Unit!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="ID Bisnis Unit"
                                    name="id_bu_brench"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your ID Bisnis Unit!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="User Level"
                                    name="user_level"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your User Level!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="User Group"
                                    name="user_group"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your User Group!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Button  style={{ width: "100%"  , backgroundColor:"#0028ff" ,  }} type="primary" htmlType="submit">
                                    Submit
                                </Button>

                            </Form>
                        </Container>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default CreateUserBaru;
