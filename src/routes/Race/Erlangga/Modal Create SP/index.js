import { Button, Form, Modal, Select, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { BaseUrlRace } from '../../../../Api/BaseUrl';
import axios from 'axios';
import { array } from 'prop-types';

function ModalCreateaSPRace({ modal1Open, setModal1Open, Refresh }) {
    const [Seleckan, setSeleckan] = useState({
        data_noref: [],
        seleckan_noref: "",
        data_sekolah: "",
        seleckan_sekolah: "",
    })
    useEffect(() => {
        if (modal1Open ) {
            SelectData()
        }
    },[modal1Open])


    const SelectData = async () => {

        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-select-sp?noref=${Seleckan.seleckan_noref}`,
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4MzM3Mzg2LCJleHAiOjE2OTg0MjM3ODZ9.G3wsj2FXma8aAISzJbzhqmnrWs6DSOYDgHrF7RMsQS0',
                        "Content-Type": "application/json",
                        // Authorization: localStorage.getItem("token"),
                    },
                }
            );
            console.log(data.data);
            let updatedSeleckanSekolah;
            if (Array.isArray(data.data.sekolah)) {
                updatedSeleckanSekolah = data.data.sekolah;
            } else {
                updatedSeleckanSekolah = [data?.data?.sekolah];
            }

            setSeleckan(item => ({
                ...item,
                data_noref: data?.data?.noref,
                data_sekolah: updatedSeleckanSekolah || []
            }));

        } catch (error) {

        }
    }


    const CreateSP = async () => {
        const body =
        {
            "memo": Seleckan.seleckan_noref,
        }
        try {
            const data = await axios.post(`${BaseUrlRace}sp/create-sp`, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4MzM3Mzg2LCJleHAiOjE2OTg0MjM3ODZ9.G3wsj2FXma8aAISzJbzhqmnrWs6DSOYDgHrF7RMsQS0',
                    // Authorization: localStorage.getItem("token"),
                },
            })
            CreateSPDetail(null)
        } catch (error) {

        }
    }

    const CreateSPDetail = async () => {
        const body =
        {
            "memo": Seleckan.seleckan_noref,
            "sekolah": Seleckan.seleckan_sekolah,
        }
        try {
            const data = await axios.post(`${BaseUrlRace}sp/create-sp-detail`, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4MzM3Mzg2LCJleHAiOjE2OTg0MjM3ODZ9.G3wsj2FXma8aAISzJbzhqmnrWs6DSOYDgHrF7RMsQS0',
                    // Authorization: localStorage.getItem("token"),
                },
            })
            notification.success({
                message: data.data.status.message
            });

        } catch (error) {

        }
    }

    useEffect(() => {
        SelectData();
    }, [Seleckan.seleckan_noref]);
    return (
        <div>
            <Modal
                title="Create SP"
                width={800}
                style={{
                    top: 20,
                }}
                open={modal1Open}
                onOk={() => setModal1Open(false)}
                onCancel={() => setModal1Open(false)}
            >
                <Form>
                    <Row>
                        <Col style={{ backgroundColor: "" }} md={4}>
                            <Form.Item
                                label="Select Memo"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    showSearch
                                    optionFilterProp='children'
                                    onChange={(e) => {
                                        setSeleckan(item => ({
                                            ...item,
                                            seleckan_noref: e
                                        }))
                                        console.log(e)

                                    }}
                                >
                                    {Seleckan && Seleckan.data_noref.map((i, id) => (
                                        <option key={id} value={i?.referensi}>{i?.referensi}</option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col style={{ backgroundColor: "" }} md={4}>
                            <Form.Item
                                label="Pilih Sekolah"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    disabled={!Seleckan.seleckan_noref}
                                    showSearch
                                    optionFilterProp='children'
                                    onChange={(e) => {
                                        setSeleckan(item => ({
                                            ...item,
                                            seleckan_sekolah: e
                                        }))
                                        console.log(e)
                                    }}
                                // value={Seleckan?.seleckan_sekolah[0]?.sekolah}
                                >
                                    {Seleckan && Seleckan?.data_sekolah.length > 0 ? (
                                        Seleckan?.data_sekolah.map((i, id) => (
                                            <option key={id} value={i?.sekolah}>{i?.sekolah}</option>
                                        ))
                                    ) : (
                                        <option>Loading...</option>
                                    )}


                                </Select>
                            </Form.Item>
                        </Col>
                        <Col className='d-flex justify-content-center' md={4}>
                            <Form.Item
                                label="Create SP"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Button onClick={() => CreateSP()} disabled={!Seleckan.seleckan_sekolah} type='primary'>Create SP</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div >
    )
}

export default ModalCreateaSPRace