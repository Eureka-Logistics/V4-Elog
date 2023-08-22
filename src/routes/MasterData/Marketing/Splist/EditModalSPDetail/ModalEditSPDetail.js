import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Button, Modal, Form, Input, Select } from 'antd'
import { Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import EditDetailSPModal from '../../../../../zustand/Store/EditDetailSPModal';
import axios from 'axios';
import Baseurl from '../../../../../Api/BaseUrl';
function ModalEditSPDetail({ isOpen, onClose, handleOpenModal, data, NamaKotaGlobal }) {
    const [dataas, setdatass] = useState("")
    const datawoi = EditDetailSPModal(state => state.data);
    const setData = EditDetailSPModal(state => state.setData);
   
    const formik = useFormik({
        initialValues: {
            alamatmuat: data?.alamatmuat || '',
            alamatbongkar: data?.alamatbongkar || "",
            kendaraan: data?.kendaraan || "",
            via: data?.via || "",
            alamatrute: data?.alamatrute || '',
        },
        validationSchema: Yup.object({
            alamatmuat: Yup.string().required('Alamat Muat Harus Di Isi'),
            alamatbongkar: Yup.string().required('Alamat Bongkar Harus Di Isi'),
            kendaraan: Yup.string().required('Kendaraan Harus Di Isi'),
            via: Yup.string().required('Via Harus Di Isi'),

        }),
        onSubmit: (values) => {
            console.log(values);

        },
    });
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    console.log(`datawoi zustand`, datawoi);
    const apidetailidmpd = async () => {
        try {
            const data = await axios.get(`${Baseurl}sp/get-SP-detail-purch-idmp?id_mp=${data.idmpd}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            console.log(`ini dari modal editspdetail`, data);
        } catch (error) {

        }
    }

    return (
        <div className='mt-3'>
            <div className='d-flex justify-content-end'>
                <Button type='primary' onClick={() => {
                    apidetailidmpd()
                    handleOpenModal()
                }}>Edit Detail SP </Button>
            </div>

            <Modal
                title={`Edit Detail SP`}
                style={{ top: 20 }}
                open={isOpen}
                onOk={formik.handleSubmit}
                onCancel={onClose}
                width="800px"
            >

                <Form
                    onFinish={formik.handleSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    name="Edit Detail SP"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Row>
                        <Col sm={6}>
                            <Form.Item
                                label="nama kota muat"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    id="IDNamaKotaMuat"
                                    disabled
                                    NamaKotaMuat type="text"
                                    value={data?.id_kota_muat}
                                    onChange={(value, option) => {
                                        formik.setFieldValue("IDNamaKotaMuat", option.key);
                                        // setIDMuatKota(option.key) // set alamatmuat state to option's children
                                        console.log(`IDNamaKotaMuat`, option.key);
                                    }}
                                    onBlur={formik.handleBlur}
                                >
                                    {NamaKotaGlobal && NamaKotaGlobal?.muatKota?.map((item) => (
                                        <Select.Option key={item.idKota} value={item.idKota}>
                                            {item.namaKota}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={6}>
                            <Form.Item
                                label="nama kota bongkar"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    id="IDNamaKotaBongkar"
                                    name="IDNamaKotaBongkar"
                                    disabled
                                    type="text"
                                    onChange={(value, option) => {
                                        formik.setFieldValue("IDNamaKotaBongkar", option.key);
                                        // setIDKotaBongkar(option.key)// set alamatmuat state to option's children
                                        console.log(`IDNamaKotaBongkar`, option.key);
                                    }}
                                    value={data.id_kota_bongkar}
                                    onBlur={formik.handleBlur}
                                >
                                    {NamaKotaGlobal && NamaKotaGlobal?.tujuanKota?.map((item) => (
                                        <Select.Option key={item.idKota} value={item.idKota}>
                                            {item.namaKota}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={12}>
                            <Form.Item
                                required
                                label="Pilih Rute"
                                help={formik.touched.alamatbongkar && formik.errors.alamatbongkar}
                                validateStatus={
                                    formik.touched.alamatbongkar && formik.errors.alamatbongkar
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    showSearch
                                    optionFilterProp="key"
                                    id="pilihrute"
                                    disabled
                                    name="pilihrute"
                                    type="text"
                                    onChange={(value, option) => {
                                        formik.setFieldValue("alamatrute", option);
                                        formik.setFieldValue("kendaraan", option.children[1].props.children);
                                        formik.setFieldValue("via", option.children[3].props.children);
                                        formik.setFieldValue("shipment", option.children[5].props.children);
                                        // setasilTarif(option.children[7].props.children)
                                        // setid_price_customer(value)
                                        console.log(`id_price`, value);
                                    }}
                                    value={`Kendaraan : ${data?.kendaraan} || Via : ${data?.via} || Shipment : ${data?.via} || Tarif : ${data?.biaya_jalan}`}

                                    onBlur={formik.handleBlur}
                                >
                                    {NamaKotaGlobal && NamaKotaGlobal?.muatKota?.map((item) => (
                                        <Select.Option key={item.idKota} value={item.idKota}>
                                            {item.namaKota}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={8}>
                            <Form.Item
                                required
                                label="Alamat Muat"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    showSearch
                                    optionFilterProp="children"
                                    id="alamatmuat"
                                    disabled
                                    name="alamatmuat"
                                    type="text"
                                    onChange={(value, option) => {
                                        formik.setFieldValue("alamatmuat", option.children); // set alamatmuat state to option's children
                                        formik.setFieldValue("IDalamatmuat", option.key); // set IDalamatmuat state to option's value
                                        formik.setFieldValue("IdKotaMuat", value); // set IDalamatmuat state to option's value
                                        console.log(`key`, option.key);
                                    }}
                                    value={data?.pickup}
                                    onBlur={formik.handleBlur}
                                >
                                    {/* {AlamatInvoiceOptions && AlamatInvoiceOptions.map((item) => (
                                        <Select.Option key={item.addressId} value={item.id_kota}>
                                            {item.address}
                                        </Select.Option>
                                    ))} */}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={8}>
                            <Form.Item
                                required
                                label="Alamat Bongkar"
                                help={formik.touched.alamatbongkar && formik.errors.alamatbongkar}
                                validateStatus={
                                    formik.touched.alamatbongkar && formik.errors.alamatbongkar
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    showSearch
                                    optionFilterProp="children"
                                    id="alamatbongkar"
                                    name="alamatbongkar"
                                    disabled
                                    type="text"
                                    onChange={(value, option) => {
                                        formik.setFieldValue("alamatbongkar", option.children); // set alamatbongkar state to option's children
                                        formik.setFieldValue("IDKotaBongkar", value); // set IDalamatbongkar state to option's value
                                        formik.setFieldValue("IDalamatbongkar", option.key); // set IDalamatbongkar state to option's value
                                    }}
                                    value={data?.destination}
                                    onBlur={formik.handleBlur}
                                >
                                    {/* {AlamatInvoiceOptions && AlamatInvoiceOptions.map((item) => (
                                        <Select.Option key={item.addressId} value={item.id_kota}>
                                            {item.address}
                                        </Select.Option>
                                    ))} */}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <br />
                    <hr />
                    <Row>
                        <Col sm={4}>
                            <Form.Item
                                required
                                label="Kendaraan"
                                help={formik.touched.kendaraan && formik.errors.kendaraan}
                                validateStatus={
                                    formik.touched.kendaraan && formik.errors.kendaraan
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    id="noSP"
                                    name="kendaraan"
                                    disabled
                                    type="kendaraan"
                                    labelInValue
                                    onChange={(e) => {
                                        formik.setFieldValue("kendaraan", e.value)
                                        formik.setFieldValue("idkendaraan", e.key)
                                        console.log(`ini id kendaraan`, e.key);
                                    }}
                                    value={data?.kendaraan}
                                    onBlur={formik.handleBlur}
                                >
                                    {/* {SelectTypeMobil && SelectTypeMobil.map((item) => (
                                        <Select.Option key={item.id} value={item.type}>
                                            {item.address}
                                        </Select.Option>

                                    ))} */}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                required
                                label="Via"
                                help={formik.touched.via && formik.errors.via}
                                validateStatus={
                                    formik.touched.via && formik.errors.via
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    id="via"
                                    disabled
                                    name="via"
                                    type="via"
                                    onChange={(e) => formik.setFieldValue("via", e)}
                                    value={data?.via}
                                    onBlur={formik.handleBlur}
                                >
                                    {/* {selectVia && selectVia.map((item) => (
                                        <Select.Option value={item.via}>{item.via}</Select.Option>
                                    ))} */}

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                required
                                label="Shipment"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    id="shipment"
                                    name="shipment"
                                    type="text"
                                    disabled
                                    onChange={(e) => {
                                        formik.setFieldValue("shipment", e)
                                        formik.setFieldValue("shipmentID", e)
                                        console.log(e);
                                    }}
                                    value={data?.shipmentName}
                                    onBlur={formik.handleBlur}
                                >
                                    {/* {shipmentOptions && shipmentOptions.map((item) => (
                                        <Select.Option value={item.id}>{item.shipment + " - " + formik.values.via}</Select.Option>
                                    ))} */}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={3}>
                            <Form.Item
                                label={"Berat (KG)"}
                                help={formik.touched.berat && formik.errors.berat}
                                validateStatus={
                                    formik.touched.berat && formik.errors.berat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="berat"
                                    name="berat"
                                    type="number"
                                    onChange={(e) => {
                                        formik.setFieldValue('berat', e.target.value)
                                        console.log(e.target.value);
                                    }}
                                    value={data?.berat}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                label="Qty"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="qyt"
                                    name="qyt"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={data?.qty}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                label="Koli"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="koli"
                                    name="koli"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.koli}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                label="Nama Barang"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="namabarang"
                                    name="namabarang"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={data?.item}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Form.Item
                                label="Panjang"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="panjang"
                                    name="panjang"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.panjang}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Lebar"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="lebar"
                                    name="lebar"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.lebar}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Tinggi"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="tinggi"
                                    name="tinggi"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.tinggi}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm={4}>
                            <Form.Item

                                label="Tarif"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input

                                    id="tarif"
                                    name="tarif"
                                    type="number"
                                    // onChange={(e) => setasilTarif(e.target.value)}
                                    value={data?.biaya_jalan}
                                    // value={HasilTarif === "" ? formik.values.biaya_jalan : HasilTarif}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Biaya Bongkar"
                                help={formik.touched.bongkar && formik.errors.bongkar}
                                validateStatus={
                                    formik.touched.bongkar && formik.errors.bongkar
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="bongkar"
                                    name="bongkar"
                                    type="text"
                                    onChange={e => {
                                        formik.setFieldValue("bongkar", Number(e.target.value.replace(/\D/g, '')))
                                    }}

                                    value={data?.harga_bongkar}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Biaya Muat"
                                help={formik.touched.biayamuat && formik.errors.biayamuat}
                                validateStatus={
                                    formik.touched.biayamuat && formik.errors.biayamuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="biayamuat"
                                    name="biayamuat"
                                    type="text"
                                    onChange={e => {
                                        formik.setFieldValue("biayamuat", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={data?.harga_muat}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Form.Item
                                label="Biaya Multimuat"
                                help={formik.touched.biayamultimuat && formik.errors.biayamultimuat}
                                validateStatus={
                                    formik.touched.biayamultimuat && formik.errors.biayamultimuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="biayamultimuat"
                                    name="biayamultimuat"
                                    type="text"
                                    onChange={e => {
                                        formik.setFieldValue("biayamultimuat", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={formik.values.biayamultimuat === undefined ? 0 : formik.values.biayamultimuat.toLocaleString('id-ID')}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Biaya Multidrop"
                                help={formik.touched.biayamultidrop && formik.errors.biayamultidrop}
                                validateStatus={
                                    formik.touched.biayamultidrop && formik.errors.biayamultidrop
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="biayamultidrop"
                                    name="biayamultidrop"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("biayamultidrop", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={formik.values.biayamultidrop === undefined ? 0 : formik.values.biayamultidrop.toLocaleString('id-ID')}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Biaya Mel"
                                help={formik.touched.biayamel && formik.errors.biayamel}
                                validateStatus={
                                    formik.touched.biayamel && formik.errors.biayamel
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="biayamel"
                                    name="biayamel"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("biayamel", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={formik.values.biayamel === undefined ? 0 : formik.values.biayamel.toLocaleString('id-ID')}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        <Col>
                            <Form.Item
                                label="TOTAL"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    disabled
                                    id="total"
                                    name="total"
                                    type="number"
                                    onChange={e => {
                                        formik.handleChange(e);
                                        // setPenjumlahanTotal(e.target.value);
                                    }}
                                    // value={(formik.values.shipment === "Retail" ? Hitung(HasilTarif) : HasilTarif + Hitung())}
                                    value={data?.Price}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

        </div>
    )
}

export default ModalEditSPDetail