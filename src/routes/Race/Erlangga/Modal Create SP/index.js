import { Button, Form, Input, Modal, Select, Table, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { BaseUrlRace } from '../../../../Api/BaseUrl';
import axios from 'axios';
import { array } from 'prop-types';

function ModalCreateaSPRace({ modal1Open, setModal1Open, Refresh, IDCabang }) {
    const [Seleckan, setSeleckan] = useState({
        data_noref: [],
        seleckan_noref: "",
        data_sekolah: "",
        seleckan_sekolah: "",
        sales: ""
    })
    useEffect(() => {
        if (modal1Open) {
            SelectData()
        }
    }, [modal1Open])
    console.log(`IDCabang`, IDCabang);
    const [SelectSekolahforEach, setSelectSekolahforEach] = useState("")
    console.log(`Seleckan.sales`, Seleckan.sales);
    const SelectData = async () => {
        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-select-sp?noref=${Seleckan.seleckan_noref}&cabang=${IDCabang}`,
                {
                    headers: {
                        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4MzM3Mzg2LCJleHAiOjE2OTg0MjM3ODZ9.G3wsj2FXma8aAISzJbzhqmnrWs6DSOYDgHrF7RMsQS0',
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                },
            );
            console.log(data.data);
            setSeleckan(item => ({
                ...item,
                seleckan_sekolah: data?.data?.sekolah?.[0],
            }))
            // SelectDataForeach()
            let updatedSeleckanSekolah;
            if (Array.isArray(data.data.sekolah)) {
                updatedSeleckanSekolah = data.data.sekolah;
            } else {
                updatedSeleckanSekolah = [data?.data?.sekolah];
            }

            setSeleckan(item => ({
                ...item,
                data_noref: data?.data?.noref,
                // sales:data?.data?.noref,
                data_sekolah: updatedSeleckanSekolah || []
            }));

        } catch (error) {

        }
    }


    const CreateSP = async () => {
        const body =
        {
            "memo": Seleckan.seleckan_noref,
            "cabang": IDCabang,
            "sales": Seleckan.sales
        }
        try {
            const data = await axios.post(`${BaseUrlRace}sp/create-sp`, body, {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4ODMxNjI1LCJleHAiOjE2OTg5MTgwMjV9.RIV1GBzazVw4NK-mi648hOxO7139bTKGKtP6jYVLGnc',
                    Authorization: localStorage.getItem("token"),
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
            "sekolah": Seleckan.seleckan_sekolah.sekolah,
            "sales": Seleckan.sales
        }
        try {
            const data = await axios.post(`${BaseUrlRace}sp/create-sp-detail`, body, {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4ODMxNjI1LCJleHAiOjE2OTg5MTgwMjV9.RIV1GBzazVw4NK-mi648hOxO7139bTKGKtP6jYVLGnc',
                    Authorization: localStorage.getItem("token"),
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


    // const SelectDataForeach = async () => {
    //     try {
    //         Seleckan.data_noref.forEach(async (datafor) => {
    //             const data = await axios.get(`${BaseUrlRace}sp/get-select-sp?noref=${datafor.referensi}`,
    //                 {
    //                     headers: {
    //                         Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4MzM3Mzg2LCJleHAiOjE2OTg0MjM3ODZ9.G3wsj2FXma8aAISzJbzhqmnrWs6DSOYDgHrF7RMsQS0',
    //                         "Content-Type": "application/json",
    //                     },
    //                 }
    //             );
    //             const datas = data.data.sekolah.map((item) => ({
    //                 item: item.sekolah
    //             }))
    //             console.log(`ini datas`, data.data.sekolah)
    //             setSelectSekolahforEach(data.data.sekolah)
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     SelectDataForeach()
    // }, [])

    console.log(`SelectSekolahforEach`, SelectSekolahforEach);

    // const columns = [
    //     {
    //         title: 'referensi',
    //         dataIndex: 'referensi',
    //         key: 'referensi',
    //     },
    //     {
    //         title: 'Button',
    //         key: 'button',
    //         render: () => {
    //             return <Button>{}</Button>;
    //         },
    //     },
    // ];





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
                    setSeleckan(item => ({
                        ...item,
                        seleckan_sekolah: "",
                        seleckan_noref: "",

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
                                    onChange={(e, children) => {
                                        console.log(`ini dari select`, children);
                                        setSeleckan(item => ({
                                            ...item,
                                            seleckan_noref: e,
                                            sales: children?.sales
                                        }))

                                    }}
                                >
                                    {Seleckan && Seleckan.data_noref.map((i, id) => (
                                        <option key={id} children={i?.sales} sales={i?.sales} value={i?.referensi}>{i?.referensi}</option>
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
                    {/* <Row>
                        <Col>
                            {Seleckan && Seleckan.data_noref.map((data, index) => (
                                <p>{data?.referensi}</p>
                            ))}
                        </Col>
                        <Col>
                            {SelectSekolahforEach && SelectSekolahforEach.map((i) => (
                                <p>{i?.sekolah}</p>
                            ))}
                        </Col>
                    </Row> */}
                    {/* <Table columns={columns} dataSource={Seleckan.data_noref} /> */}
                </Form>
            </Modal>
        </div >
    )
}

export default ModalCreateaSPRace