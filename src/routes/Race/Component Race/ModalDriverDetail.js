import { Button, DatePicker, Form, Input, Modal, Upload } from 'antd'
import moment from 'moment';
import React from 'react'
import { Col, Row } from 'react-bootstrap';


function ModalDriverDetail({ modal1Open, setModal1Open, DetailSemuaDriver, setDetailSemuaDriver }) {

    function handleChange(e) {
        if (e.target.name === "jeniskepemilikan") {
            setDetailSemuaDriver?.(prevState => ({
                ...prevState,
                simType: e.target.value
            }));
        } else if (e.target.name === "policeNumber") {
            setDetailSemuaDriver?.(prevState => ({
                ...prevState,
                policeNumber: e.target.value
            }));
        } else if (e.target.name === "driverKtp") {
            setDetailSemuaDriver?.(prevState => ({
                ...prevState,
                driverKtp: e.target.value
            }));
        } else if (e.target.name === "jenisKepemilikan") {
            setDetailSemuaDriver?.(prevState => ({
                ...prevState,
                jenisKepemilikan: e.target.value
            }));
        } else if (e.target.name === "numberSim") {
            setDetailSemuaDriver?.(prevState => ({
                ...prevState,
                numberSim: e.target.value
            }));
        } else if (e.target.name === "simType") {
            setDetailSemuaDriver?.(prevState => ({
                ...prevState,
                simType: e.target.value
            }));
        } else if (e.target.name === "platColor") {
            setDetailSemuaDriver?.(prevState => ({
                ...prevState,
                platColor: e.target.value
            }));
        } else if (e.target.name === "vehicleMerk") {
            setDetailSemuaDriver?.(prevState => ({
                ...prevState,
                vehicleMerk: e.target.value
            }));
        } else if (e.target.name === "noTelp1") {
            setDetailSemuaDriver?.(prevState => ({
                ...prevState,
                noTelp1: e.target.value
            }));
        } else if (e.target.name === "noTelp2") {
            setDetailSemuaDriver?.(prevState => ({
                ...prevState,
                noTelp2: e.target.value
            }));
        } else if (e.target.name === "vehicleWidth") {
            setDetailSemuaDriver?.(prevState => ({
                ...prevState,
                vehicleWidth: e.target.value
            }));
        } else if (e.target.name === "vehicleHeight") {
            setDetailSemuaDriver?.(prevState => ({
                ...prevState,
                vehicleHeight: e.target.value
            }));
        } else if (e.target.name === "vehicle") {
            setDetailSemuaDriver?.(prevState => ({
                ...prevState,
                vehicle: e.target.value
            }));
        } else if (e.target.name === "ukuran_seragam") {
            setDetailSemuaDriver?.(prevState => ({
                ...prevState,
                ukuran_seragam: e.target.value
            }));
        } else if (e.target.name === "norek") {
            setDetailSemuaDriver?.(prevState => ({
                ...prevState,
                norek: e.target.value
            }));
        } else if (e.target.name === "bankRekening") {
            setDetailSemuaDriver?.(prevState => ({
                ...prevState,
                bankRekening: e.target.value
            }));
        }
    }


    console.log(DetailSemuaDriver);

    function CreateDriver() {
        console.log(DetailSemuaDriver);
        setModal1Open(false)
    }

    return (
        <Modal
            title="Detail Driver"
            width="1000px"
            style={{
                top: 20,
            }}
            open={modal1Open} x1
            onOk={() => CreateDriver()}
            onCancel={() => setModal1Open(false)}
        >

            <Row >
                <Col sm={4}>
                    <Col sm={4} className='d-flex justify-content-center' style={{ width: "280px", height: "280px", position: "relative" }} >
                        <img src={DetailSemuaDriver?.vehicleImage}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                objectFit: "contain"
                            }}
                        />
                    </Col>
                    <Col sm={12} style={{ display: "flex", justifyContent: "center" }} className='mt-3'>
                        <Upload
                            accept='image/jpeg , image/png'
                            onChange={(info) => {
                                console.log(info.file, info.fileList);
                            }}>
                            <Button
                                onChange={(e) => { console.log(e); }}
                            >Upload</Button>
                        </Upload>
                    </Col>
                    <Col sm={12} className='mt-3'>

                        <Form.Item
                            label="Tanggal Masuk"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ margin: 0 }}
                        >
                            <DatePicker
                                format={"DD-MM-YYYY"}
                                value={moment(DetailSemuaDriver?.dateIn, 'DD-MM-YYYY')}
                                onChange={(date, dateString) => {
                                    setDetailSemuaDriver?.(prevState => ({
                                        ...prevState,
                                        dateIn: dateString
                                    }));
                                }}
                            />
                        </Form.Item>

                    </Col>
                    <Col sm={12} >
                        <Form.Item
                            label="Tanggal SIM"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ margin: 0 }}
                        >
                            <DatePicker
                                format={"DD-MM-YYYY"}
                                value={moment(DetailSemuaDriver?.tglSim, 'DD-MM-YYYY')}
                                onChange={(date, dateString) => {
                                    setDetailSemuaDriver?.(prevState => ({
                                        ...prevState,
                                        tglSim: dateString
                                    }));
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col sm={12} >
                        <Form.Item
                            label="Tanggal Lahir"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ margin: 0 }}
                        >
                            <DatePicker
                                format={"DD-MM-YYYY"}
                                value={moment(DetailSemuaDriver?.dateBirth, 'DD-MM-YYYY')}
                                onChange={(date, dateString) => {
                                    setDetailSemuaDriver?.(prevState => ({
                                        ...prevState,
                                        dateBirth: dateString
                                    }));
                                }}
                            />
                        </Form.Item>
                    </Col>

                </Col>
                <Col sm={4}>
                    <Col className='' sm={12}>
                        <Form.Item
                            label="Nik"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ margin: 0 }}
                        >
                            <Input
                                disabled
                                value={DetailSemuaDriver?.nik === null ? "-" : DetailSemuaDriver?.nik}
                                showSearch
                                optionFilterProp="children"
                                id="nik"
                                name=""

                            >

                            </Input>
                        </Form.Item>
                    </Col>
                    <Col className='' sm={12}>
                        <Form.Item
                            label="Nama Driver"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ margin: 0 }}
                        >
                            <Input
                                value={DetailSemuaDriver?.simType}
                                showSearch
                                optionFilterProp="children"
                                id=""
                                name="simType"
                                onChange={(e) => handleChange(e)}
                            >

                            </Input>
                        </Form.Item>
                    </Col>
                    <Col className='' sm={12}>
                        <Form.Item
                            label="Jenis Driver"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ margin: 0 }}
                        >
                            <Input
                                value={DetailSemuaDriver?.jenisKepemilikan}
                                showSearch
                                optionFilterProp="children"
                                id=""
                                name="jenisKepemilikan"
                                onChange={(e) => handleChange(e)}
                            >

                            </Input>
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <Form.Item
                            label="Perusahaan"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ margin: 0 }}
                        >
                            <Input
                                value={DetailSemuaDriver?.policeNumber}
                                showSearch
                                optionFilterProp="children"
                                id=""
                                name="policeNumber"
                                onChange={(e) => handleChange(e)}
                            >

                            </Input>
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <Form.Item
                            label="No KTP"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                value={DetailSemuaDriver?.driverKtp}
                                showSearch
                                optionFilterProp="children"
                                id=""
                                name="driverKtp"
                                onChange={(e) => handleChange(e)}
                            >

                            </Input>
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <Form.Item
                            label="No SIM"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                value={DetailSemuaDriver?.numberSim}
                                showSearch
                                optionFilterProp="children"
                                id=""
                                name="numberSim"
                                onChange={(e) => handleChange(e)}
                            >

                            </Input>
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <Form.Item
                            label="Jenis SIM"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                value={DetailSemuaDriver?.simType}
                                showSearch
                                optionFilterProp="children"
                                id=""
                                name="simType"
                                onChange={(e) => handleChange(e)}
                            >

                            </Input>
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <Form.Item
                            label="Agama"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                value={DetailSemuaDriver?.platColor}
                                showSearch
                                optionFilterProp="children"
                                id=""
                                name="platColor"
                                onChange={(e) => handleChange(e)}
                            >

                            </Input>
                        </Form.Item>
                    </Col>
                </Col>
                <Col sm={4}>
                    <Col className='' sm={12}>
                        <Form.Item
                            label="No Telp"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                value={DetailSemuaDriver?.noTelp1}
                                showSearch
                                type='number'
                                optionFilterProp="children"
                                id=""
                                name="noTelp1"
                                onChange={(e) => handleChange(e)}
                            >

                            </Input>
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <Row>
                            <Col style={{}}>
                                <Form.Item
                                    label="No Telp 2"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        value={DetailSemuaDriver?.noTelp2}
                                        showSearch
                                        type='number'
                                        optionFilterProp="children"
                                        id=""
                                        name="noTelp2"
                                        onChange={(e) => handleChange(e)}
                                    >

                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col className='' sm={12}>
                                <Form.Item
                                    label="Email"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        disabled
                                        value={DetailSemuaDriver?.driverEmail}
                                        showSearch
                                        optionFilterProp="children"
                                        id=""
                                        onChange={(e) => handleChange(e)}
                                        name="driverEmail"
                                    >

                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col sm={12}>
                                <Form.Item
                                    label="Vehicle Type"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        value={DetailSemuaDriver?.vehicle}
                                        showSearch
                                        optionFilterProp="children"
                                        id=""
                                        name="vehicle"
                                        onChange={(e) => handleChange(e)}
                                    >

                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col sm={12}>
                                <Form.Item
                                    label="Ukuran Seragam"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        value={DetailSemuaDriver?.ukuran_seragam}
                                        showSearch
                                        optionFilterProp="children"
                                        id=""
                                        name="ukuran_seragam"
                                        onChange={(e) => handleChange(e)}
                                    >

                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col sm={12}>
                                <Form.Item
                                    label="Nama Bank"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        value={DetailSemuaDriver?.bankRekening}
                                        showSearch
                                        optionFilterProp="children"
                                        id=""
                                        name="bankRekening"
                                        onChange={(e) => handleChange(e)}
                                    >

                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col sm={12}>
                                <Form.Item
                                    label="Nomor Rekening"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        value={DetailSemuaDriver?.norek}
                                        showSearch
                                        optionFilterProp="children"
                                        id=""
                                        name="norek"
                                        onChange={(e) => handleChange(e)}
                                    >

                                    </Input>
                                </Form.Item>
                            </Col>

                            <Col sm={12}>
                                <Form.Item
                                    label="Alamat"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        value={DetailSemuaDriver?.driverAddress}
                                        showSearch
                                        optionFilterProp="children"
                                        id=""
                                        name="driverAddress"
                                        onChange={(e) => handleChange(e)}
                                    >

                                    </Input>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>

        </Modal>
    )
}

export default ModalDriverDetail
