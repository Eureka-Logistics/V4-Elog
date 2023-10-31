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
        if (modal1Open) {
            SelectData()
        }
    }, [modal1Open])


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
            setSeleckan(item => ({
                ...item,
                seleckan_sekolah: data?.data?.sekolah?.[0]
            }))
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
            const data = await axios.post(`${BaseUrlRace}sp/creates-sp`, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4MzM3Mzg2LCJleHAiOjE2OTg0MjM3ODZ9.G3wsj2FXma8aAISzJbzhqmnrWs6DSOYDgHrF7RMsQS0',
                    // Authorization: localStorage.getItem("token"),
                },
            })
            CreateSPDetail(null)
            setModal1Open(false)
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
                okText={!Seleckan.seleckan_sekolah ? "Pilih Sekolah Dahulu" : "Create SP"}
                confirmLoading={!Seleckan.seleckan_sekolah}
                onOk={() => {
                    CreateSP()
                    setSeleckan(item=>({
                            ...item,
                            seleckan_sekolah : "",
                            seleckan_noref : "",
    
                        }))
                }}
                onCancel={() => {
                    setModal1Open(false)
                    // setSeleckan(item=>({
                    //     ...item,
                    //     seleckan_sekolah : "",
                    //     seleckan_noref : "",

                    // }))
                }}
            >
                <Form>
                    <Row>
                        <Col style={{ backgroundColor: "" }} >
                            <Form.Item
                                label="Select SJ"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    showSearch
                                    optionFilterProp='children'
                                    value={Seleckan?.seleckan_noref}
                                    onChange={(e) => {
                                        setSeleckan(item => ({
                                            ...item,
                                            seleckan_noref: e
                                        }))

                                    }}
                                >
                                    {Seleckan && Seleckan.data_noref.map((i, id) => (
                                        <option key={id} value={i?.referensi}>{i?.referensi}</option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col style={{ backgroundColor: "" }} >
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
                                    value={Seleckan?.seleckan_sekolah?.sekolah}
                                    onChange={(e, key) => {
                                        setSeleckan(item => ({
                                            ...item,
                                            seleckan_sekolah: e
                                        }))
                                        // setSeleckan()
                                        // console.log(key,e)
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
                       
                    </Row>
                </Form>
            </Modal>
        </div >
    )
}

export default ModalCreateaSPRace