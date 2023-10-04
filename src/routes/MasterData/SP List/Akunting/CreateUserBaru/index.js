import { Button, Form, Input, Select, notification } from 'antd';
import { Col, Container, Row } from 'react-bootstrap';
import './style.css'
import axios from 'axios';
import Baseurl from '../../../../../Api/BaseUrl';
import { useEffect, useState } from 'react';

function CreateUserBaru() {
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [selectoptions, setselectoptions] = useState("")
    const [IDcode_bu, setIDcode_bu] = useState()
    const [id_bu, setid_bu] = useState("")
    const [id_bu_brench, setid_bu_brench] = useState("")
    const [KodeCabang, setKodeCabang] = useState("")




    const handleChange = (value, e) => {
        console.log("Selected value:", value);
        setIDcode_bu(value?.code_bu)
    };
    const select = async (value) => {
        try {
            const data = await axios.get(`${Baseurl}auth/get-select?id_bu=${id_bu}&id_bu_brench=${id_bu_brench}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            console.log(data?.data);
            setselectoptions(data?.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        select()
    }, [id_bu_brench, id_bu])

    const [selectedIdKaryawan, setSelectedIdKaryawan] = useState(null); // State untuk menyimpan idKaryawan

    const createuser = async (combinedValues) => {
        const payload = {
            ...combinedValues,
            id_karyawan: selectedIdKaryawan,
            // id_cabang: "",
            id_bu_brench:id_bu_brench,
            no_telp: parseInt(combinedValues.no_telp),
            perusahaan: IDcode_bu,
            kode_cabang: combinedValues?.id_cabang,
            // id_bu: "",
            // id_bu_brench: "",
            level: combinedValues?.user_level,
            // user_level: "",
            // user_group: ""
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
        const combinedValues = { ...values1, ...values2, id_karyawan: selectedIdKaryawan };
        console.log(combinedValues);
        createuser(combinedValues);
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
                height: '700px',
                backgroundColor: '#EBECF1'
            }}>
                <Row>
                    <Col sm={6} style={{ backgroundColor: 'white', width: "400px", borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', height: 600 }}>
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

                                        {/* <Form.Item
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
                                        </Form.Item> */}
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
                                            <Select placeholder="Pilih Bisnis Unit " showSearch optionFilterProp='children' onChange={(e, label) => {
                                                setKodeCabang(label?.code_bu_brench)
                                                setid_bu_brench(label.value)
                                            }}
                                            >
                                                {Array.isArray(selectoptions?.divisi) && selectoptions?.divisi.map((i) => (
                                                    <option value={i?.divisi}>{i?.divisi}</option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        {/* <Form.Item
                                            label={"Level"}
                                            name="level"
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Please input your level!',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Pilih Level " onChange={(e, label) => {
                                                console.log(label);
                                            }}
                                            >
                                                {selectoptions && selectoptions.userLevel.map((i) => (
                                                    <option value={i.id}>{i?.level}</option>
                                                ))}
                                            </Select>
                                        </Form.Item> */}
                                    </Form>
                                </div>
                            </Col>
                        </Container>
                    </Col>
                    <Col sm={6} style={{ backgroundColor: '#463acc', width: "400px", borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: 600 }}>
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
                                    label="Bisnis Unit"
                                    name="id_bu"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your Bisnis Unit!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Pilih Bisnis Unit " onChange={(e, label) => {
                                        console.log(label);
                                        handleChange(label)
                                        setid_bu(label?.value)

                                    }}
                                    >
                                        {selectoptions && selectoptions?.BU.map((i) => (
                                            <option code_bu={i.code_bu} value={i.id_bu}>{i?.name_bu}</option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Kode Perusahaan"
                                    // name="perusahaan"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your perusahaan!',
                                        },
                                    ]}
                                >
                                    <Input value={IDcode_bu} />
                                </Form.Item>
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
                                    <Select placeholder="Pilih Bisnis Unit " onChange={(e, label) => {
                                        console.log(`darao cabang`, label);
                                        setKodeCabang(label?.code_bu_brench)
                                        setid_bu_brench(label.value)
                                    }}
                                    >
                                        {Array.isArray(selectoptions?.bubrench) && selectoptions?.bubrench.map((i) => (
                                            <option code_bu_brench={i?.code_bu_brench} value={i?.id_bu_brench}>{i?.code_bu_brench}</option>
                                        ))}
                                    </Select>
                                </Form.Item>



                                <Form.Item
                                    label="Karyawan"
                                    name="id_karyawan"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your Karyawan!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Pilih Bisnis Unit " showSearch optionFilterProp='children' onChange={(e, label) => {
                                        console.log(label);
                                        setSelectedIdKaryawan(label.value); // asumsikan label.value adalah idKaryawan
                                    }}

                                    >
                                        {Array.isArray(selectoptions?.karyawan) && selectoptions?.karyawan.map((i) => (
                                            <option value={i?.idKaryawan}>{i?.nama} - {i.nik}</option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                {/* <Form.Item
                                    label="Kode Cabang"
                                    // name="kode_cabang"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your Kode Cabang!',
                                        },
                                    ]}
                                >
                                    <Input value={KodeCabang} />
                                </Form.Item> */}


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
                                    <Select placeholder="Pilih UserLevel " showSearch optionFilterProp='children' onChange={(e, label) => {
                                        console.log(label);

                                    }}
                                    >
                                        {Array.isArray(selectoptions?.userLevel) && selectoptions?.userLevel.map((i) => (
                                            <option value={i?.id}>{i.level}</option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                {/* <Form.Item
                                    label="User Group"
                                    name="user_group"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your User Group!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Pilih UserLevel " showSearch optionFilterProp='children' onChange={(e, label) => {
                                        console.log(label);

                                    }}
                                    >
                                        {Array.isArray(selectoptions?.userLevel) && selectoptions?.userLevel.map((i) => (
                                            <option value={i?.id}>{i.level}</option>
                                        ))}
                                    </Select>
                                </Form.Item> */}
                                <Button style={{ marginTop: "20px", width: "100%", backgroundColor: "#0028ff", }} type="primary" htmlType="submit">
                                    Submit
                                </Button>

                            </Form>
                        </Container>
                    </Col>
                </Row>
            </div >
        </>
    );
}

export default CreateUserBaru;
