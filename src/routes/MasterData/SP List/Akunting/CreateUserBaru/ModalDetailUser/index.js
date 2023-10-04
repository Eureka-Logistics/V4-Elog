import { Form, Input, Modal, notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Baseurl from '../../../../../../Api/BaseUrl';

function ModalDetailUser({ modal1Open, setModal1Open, detailData, userlist }) {
    const [formData, setFormData] = useState({
        username: '',
        namapanjang: '',
        divisi: '',
        perusahaan: ''
    });
    useEffect(() => {
        if (detailData) {
            setFormData({
                id: detailData.userId || '',
                username: detailData.username || '',
                namapanjang: detailData.fullname || '',
                divisi: detailData.divisi || '',
                perusahaan: detailData.perusahaan || ''
            });
        }
    }, [detailData]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData);
    };

    const edit = async () => {
        const payload = {
            ...formData,
            id: formData.id,
            nama_lengkap: formData.namapanjang,
        };
        try {
            const data = await axios.post(`${Baseurl}user/edit-user`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            console.log(data);
            notification.success({
                message: data.data.status.message
            })
            userlist()
            setModal1Open(false)
        } catch (error) {

        }
    }

    return (
        <div>
            <Modal
                title={`Edit User ${detailData?.username}`}
                style={{
                    top: 150,
                }}
                width={800}
                visible={modal1Open}
                onOk={() => edit(false)}
                onCancel={() => setModal1Open(false)}
            >
                <Form
                    layout='vertical'
                    style={{
                        maxWidth: "auto",
                    }}
                >
                    <Row>
                        <Col>
                            <Form.Item label="Username">
                                <Input name="username" value={formData.username} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item label="Nama Panjang">
                                <Input name="namapanjang" value={formData.namapanjang} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item label="Divisi">
                                <Input name="divisi" value={formData.divisi} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item label="Perusahaan">
                                <Input name="perusahaan" value={formData.perusahaan} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
}

export default ModalDetailUser;
