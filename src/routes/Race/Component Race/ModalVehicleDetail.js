import { Input, Modal, Form, DatePicker, Upload, Button, notification } from 'antd'
import moment from 'moment';
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Baseurl from '../../../Api/BaseUrl';
import axios from 'axios';
import Swal from 'sweetalert2';

function ModalVehicleDetailRace({ modal1Open, setModal1Open, DetailSemuaVehilce, setDetailSemuaVehilce }) {

    function handleChange(e) {
        if (e.target.name === "jeniskepemilikan") {
            setDetailSemuaVehilce(prevState => ({
                ...prevState,
                jenisKepemilikan: e.target.value
            }));
        } else if (e.target.name === "policeNumber") {
            setDetailSemuaVehilce(prevState => ({
                ...prevState,
                policeNumber: e.target.value
            }));
        } else if (e.target.name === "vendor") {
            setDetailSemuaVehilce(prevState => ({
                ...prevState,
                vendor: e.target.value
            }));
        } else if (e.target.name === "vehicleType") {
            setDetailSemuaVehilce(prevState => ({
                ...prevState,
                vehicleType: e.target.value
            }));
        } else if (e.target.name === "driverName") {
            setDetailSemuaVehilce(prevState => ({
                ...prevState,
                driverName: e.target.value
            }));
        } else if (e.target.name === "platColor") {
            setDetailSemuaVehilce(prevState => ({
                ...prevState,
                platColor: e.target.value
            }));
        } else if (e.target.name === "vehicleMerk") {
            setDetailSemuaVehilce(prevState => ({
                ...prevState,
                vehicleMerk: e.target.value
            }));
        } else if (e.target.name === "vehilceYear") {
            setDetailSemuaVehilce(prevState => ({
                ...prevState,
                vehilceYear: e.target.value
            }));
        } else if (e.target.name === "vehicleLentgth") {
            setDetailSemuaVehilce(prevState => ({
                ...prevState,
                vehicleLentgth: e.target.value
            }));
        } else if (e.target.name === "vehicleWidth") {
            setDetailSemuaVehilce(prevState => ({
                ...prevState,
                vehicleWidth: e.target.value
            }));
        } else if (e.target.name === "vehicleHeight") {
            setDetailSemuaVehilce(prevState => ({
                ...prevState,
                vehicleHeight: e.target.value
            }));
        } else if (e.target.name === "bpkbNumber") {
            setDetailSemuaVehilce(prevState => ({
                ...prevState,
                bpkbNumber: e.target.value
            }));
        } else if (e.target.name === "stnk") {
            setDetailSemuaVehilce(prevState => ({
                ...prevState,
                stnk: e.target.value
            }));
        } else if (e.target.name === "capacity") {
            setDetailSemuaVehilce(prevState => ({
                ...prevState,
                capacity: e.target.value
            }));
        } else if (e.target.name === "maxCapacity") {
            setDetailSemuaVehilce(prevState => ({
                ...prevState,
                maxCapacity: e.target.value
            }));
        }
    }

    function kubikasi() {
        const hasil = Number(DetailSemuaVehilce?.vehicleLentgth) * Number(DetailSemuaVehilce?.vehicleWidth) * Number(DetailSemuaVehilce?.vehicleHeight)
        return hasil
    }

    const EditVehicle = async (values) => {
        try {
            const data = await axios.post(`${Baseurl}vehicle/edit-vehicle`,
                {
                    ...DetailSemuaVehilce,
                    id: DetailSemuaVehilce.IdDriver,
                    id_driver: DetailSemuaVehilce.id_driver,
                    id_vendor: DetailSemuaVehilce.id_vendor,
                    // id_jenis_kendaraan: formik.values.id_jenis_kendaraan
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    }
                }
            )
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data berhasil diedit',
            });
            setModal1Open(false)
        } catch (error) {
            if (error.response.data.status) {
                error.response.data.errors.forEach((i) => {
                    let errrrr = i.message
                    notification.error({
                        message: 'ADA KESALAHAN DI FORM INPUT',
                        description: errrrr,
                    })

                })
            }
            setModal1Open(false)
            console.log(error.response.data.status.message);


        }
    }


    return (
        <Modal
            title="Detail Vehicle"
            width="1000px"
            style={{
                top: 20,
            }}
            open={modal1Open}
            onOk={() => EditVehicle()}
            onCancel={() => setModal1Open(false)}
        >

            <Row >
                <Col sm={4}>
                    <Col sm={4} className='d-flex justify-content-center' style={{ width: "280px", height: "280px", position: "relative" }} >
                        <img src={DetailSemuaVehilce?.vehicleImage}
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
                            label="Tanggal STNK"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ margin: 0 }}
                        >
                            <DatePicker
                                format={"DD-MM-YYYY"}
                                value={moment(DetailSemuaVehilce?.stnkDate, 'DD-MM-YYYY')}
                                onChange={(date, dateString) => {
                                    setDetailSemuaVehilce(prevState => ({
                                        ...prevState,
                                        stnkDate: dateString
                                    }));
                                }}
                            />
                        </Form.Item>

                    </Col>
                    <Col sm={12} >
                        <Form.Item
                            label="Tgl Exp Plat Nomor"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ margin: 0 }}
                        >
                            <DatePicker
                                format={"DD-MM-YYYY"}
                                value={moment(DetailSemuaVehilce?.expiredPlat, 'DD-MM-YYYY')}
                                onChange={(date, dateString) => {
                                    setDetailSemuaVehilce(prevState => ({
                                        ...prevState,
                                        expiredPlat: dateString
                                    }));
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col sm={12} >
                        <Form.Item
                            label="Tgl Exp Kir"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ margin: 0 }}
                        >
                            <DatePicker
                                format={"DD-MM-YYYY"}
                                value={moment(DetailSemuaVehilce?.kirDate, 'DD-MM-YYYY')}
                                onChange={(date, dateString) => {
                                    setDetailSemuaVehilce(prevState => ({
                                        ...prevState,
                                        kirDate: dateString
                                    }));
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <Form.Item
                            label="Tgl Beli"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ margin: 0 }}
                        >
                            <DatePicker
                                format={"DD-MM-YYYY"}
                                value={moment(DetailSemuaVehilce?.buyDate, 'DD-MM-YYYY')}
                                onChange={(date, dateString) => {
                                    setDetailSemuaVehilce(prevState => ({
                                        ...prevState,
                                        buyDate: dateString
                                    }));
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Col>
                <Col sm={4}>
                    <Col className='' sm={12}>
                        <Form.Item
                            label="Vehicle Code"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ margin: 0 }}
                        >
                            <Input
                                disabled
                                value={DetailSemuaVehilce.vehicleCode === null ? "-" : DetailSemuaVehilce.vehicleCode}
                                showSearch
                                optionFilterProp="children"
                                id="vehiccode"
                                name=""

                            >

                            </Input>
                        </Form.Item>
                    </Col>
                    <Col className='' sm={12}>
                        <Form.Item
                            label="Jenis Kepemilikan"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ margin: 0 }}
                        >
                            <Input
                                value={DetailSemuaVehilce?.jenisKepemilikan}
                                showSearch
                                optionFilterProp="children"
                                id=""
                                name="jeniskepemilikan"
                                onChange={(e) => handleChange(e)}
                            >

                            </Input>
                        </Form.Item>
                    </Col>
                    <Col className='' sm={12}>
                        <Form.Item
                            label="Kode Kendaraan"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ margin: 0 }}
                        >
                            <Input
                                value={DetailSemuaVehilce?.jenisKepemilikan}
                                showSearch
                                optionFilterProp="children"
                                id=""
                                name=""
                            >

                            </Input>
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <Form.Item
                            label="No Polisi"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ margin: 0 }}
                        >
                            <Input
                                value={DetailSemuaVehilce?.policeNumber}
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
                            label="Mitra"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                value={DetailSemuaVehilce?.vendor}
                                showSearch
                                optionFilterProp="children"
                                id=""
                                name="vendor"
                                onChange={(e) => handleChange(e)}
                            >

                            </Input>
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <Form.Item
                            label="Jenis Kendaraan"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                value={DetailSemuaVehilce?.vehicleType}
                                showSearch
                                optionFilterProp="children"
                                id=""
                                name="vehicleType"
                                onChange={(e) => handleChange(e)}
                            >

                            </Input>
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <Form.Item
                            label="Nama Driver"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                value={DetailSemuaVehilce?.driverName}
                                showSearch
                                optionFilterProp="children"
                                id=""
                                name="driverName"
                                onChange={(e) => handleChange(e)}
                            >

                            </Input>
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <Form.Item
                            label="Warna Plat"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                value={DetailSemuaVehilce?.platColor}
                                showSearch
                                optionFilterProp="children"
                                id=""
                                name="platColor"
                                onChange={(e) => handleChange(e)}
                            >

                            </Input>
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <Form.Item
                            label="Merk Mobil"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                value={DetailSemuaVehilce?.vehicleMerk}
                                showSearch
                                optionFilterProp="children"
                                id=""
                                name="vehicleMerk"
                                onChange={(e) => handleChange(e)}
                            >

                            </Input>
                        </Form.Item>
                    </Col>
                </Col>
                <Col sm={4}>
                    <Col className='' sm={12}>
                        <Form.Item
                            label="Tahun Mobil"
                            required
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                value={DetailSemuaVehilce?.vehilceYear}
                                showSearch
                                optionFilterProp="children"
                                id=""
                                name="vehilceYear"
                                onChange={(e) => handleChange(e)}
                            >

                            </Input>
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <Row>
                            <Col style={{}}>
                                <Form.Item
                                    label="Panjang (m)"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        value={DetailSemuaVehilce?.vehicleLentgth}
                                        showSearch
                                        type='number'
                                        optionFilterProp="children"
                                        id=""
                                        name="vehicleLentgth"
                                        onChange={(e) => handleChange(e)}
                                    >

                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col style={{}}>
                                <Form.Item
                                    label="Lebar (m)"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        value={DetailSemuaVehilce?.vehicleWidth}
                                        showSearch
                                        type='number'
                                        optionFilterProp="children"
                                        id=""
                                        name="vehicleWidth"
                                        onChange={(e) => handleChange(e)}
                                    >

                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col style={{}}>
                                <Form.Item
                                    label="Tinggi (m)"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        value={DetailSemuaVehilce?.vehicleHeight}
                                        showSearch
                                        type='number'
                                        optionFilterProp="children"
                                        id=""
                                        name="vehicleHeight"
                                        onChange={(e) => handleChange(e)}
                                    >

                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col className='' sm={12}>
                                <Form.Item
                                    label="Kubikasi (Penjumlahan Dari P x L x T)"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        disabled
                                        value={kubikasi()}
                                        showSearch
                                        optionFilterProp="children"
                                        id=""
                                        name=""
                                    >

                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col sm={12}>
                                <Form.Item
                                    label="No BPKB"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        value={DetailSemuaVehilce?.bpkbNumber}
                                        showSearch
                                        optionFilterProp="children"
                                        id=""
                                        name="bpkbNumber"
                                        onChange={(e) => handleChange(e)}
                                    >

                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col sm={12}>
                                <Form.Item
                                    label="STNK"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        value={DetailSemuaVehilce?.stnk}
                                        showSearch
                                        optionFilterProp="children"
                                        id=""
                                        name="stnk"
                                        onChange={(e) => handleChange(e)}
                                    >

                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col sm={12}>
                                <Form.Item
                                    label="Kapasitas (KG)"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        value={DetailSemuaVehilce?.capacity}
                                        showSearch
                                        optionFilterProp="children"
                                        id=""
                                        name="capacity"
                                        onChange={(e) => handleChange(e)}
                                    >

                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col sm={12}>
                                <Form.Item
                                    label="Kapasitas Max (KG)"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        value={DetailSemuaVehilce?.maxCapacity}
                                        showSearch
                                        optionFilterProp="children"
                                        id=""
                                        name="maxCapacity"
                                        onChange={(e) => handleChange(e)}
                                    >

                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col sm={12}>
                                <Form.Item
                                    label="Cabang"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input

                                        showSearch
                                        optionFilterProp="children"
                                        id=""
                                        name=""
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

export default ModalVehicleDetailRace
