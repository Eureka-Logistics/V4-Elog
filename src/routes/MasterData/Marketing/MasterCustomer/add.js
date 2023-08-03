import React, { useEffect, useState } from "react";
import {
  Card,
  DatePicker,
  Input,
  Row,
  Col,
  notification,
  Button,
  Select,
} from "antd";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { httpClient } from "../../../../Api/Api";
import { InputGroup, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Label } from "recharts";

const { RangePicker } = DatePicker;

const { Search } = Input;

const onSearch = (value) => console.log(value);

const SamplePage = () => {
  const router = useHistory();

  const [data, setData] = useState([]);
  const [orderDataTable, setOrderDataTable] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [detailSp, setDetailSp] = useState([]);
  const [isiValues, setIsiValues] = useState("");
  const [jenisPembayaran, setJenisPembayaran] = useState("");

  const optjenisPembayaran = [
    {
      value: "1",
      label: "Cash",
    },
    {
      Value: "2",
      label: "Credit",
    },
  ];
  const optionToP = [
    {
      value: "1",
      label: "7 Hari",
    },
    {
      Value: "2",
      label: "14 Hari",
    },
    {
      Value: "2",
      label: "20 Hari",
    },
    {
      Value: "2",
      label: "30 Hari",
    },
    {
      Value: "2",
      label: "60 Hari",
    },
  ];

  const formik = useFormik({
    initialValues: {
      kode_customer: "",
      nama_perusahaan: "",
      jenis_barang: "",
      jenis_usaha: "",
      tgl_berdiri: "",
      tahun_berdiri: "",
      npwp: "",
      alamat_npwp: "",
      alamat_kantor: "",
      telepon: "",
      hp: "",
      mata_uang: "",
      jenis_pembayaran: "",
      ktp: "",
      tdp: "",
      siup: "",
      pkp: "",
      tax_pic: "",
      tax_position: "",
      tax_email: "",
      tax_phone_office: "",
      tax_mobile: "",
      invoice_pic: "",
      invoice_address: "",
      invoice_position: "",
      invoice_phone_office: "",
      invoice_mobile: "",
      invoice_email: "",
      pic_office: "",
      pic_position: "",
      pic_phone: "",
      pic_number: "",
      pic_fax: "",
      pic_email: "",
      pic_birth: "",
      fax: "",
      email: "",
      bank_pic: "",
      bank_position: "",
      bank_phone_office: "",
      bank_mobile: "",
      bank_email: "",
      nama_bank: "",
      nama_akun: "",
      no_rek: "",
      top: "",
      jenis_angkutan: "",
      kemasan: "",
      unique_cus: "",
      foto_kantor: "",
      foto_pic: "",
      foto_ktp: "",
      foto_npwp: "",
      manager: "",
      manager_memo: "",
      manager_date: "",
      akunting: "",
      akunting_memo: "",
      akunting_date: "",
      direktur: "",
      direktur_memo: "",
      direktur_date: "",
      mou_file: "",
      tgl_bergabung: "",
    },
    validationSchema: Yup.object({
      nama_perusahaan: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      console.log(`values dari sini`, values);
      setIsiValues(values);
      httpClient
        .post("customer/create-customer", values)
        .then(({ data }) => {
          notification.success({
            message: "Success",
            description: data.message,
          });
          setTimeout(() => router.push("/mastercustomersss"), 1000);
        })
        .catch(function (error) {
          notification.error({
            message: "Error",
            description: error.message,
          });
          console.log(error.message);
        });
    },
    //   httpClient
    //     .post("customer/create-customer", values)

    //     .then(({ data }) => {
    //       notification.success({
    //         message: "Success",
    //         description: data.message,
    //       });
    //       setTimeout(() => router.push("/mastercustomer"), 1000);
    //     })
    //     .catch(function (error) {
    //       notification.error({
    //         message: "Error",
    //         description: error.message,
    //       });
    //       console.log(error.message);
    //     });
    // },
  });

  useEffect(() => {
    const url = window.location.href;
    const idMpFix = url.substring(url.lastIndexOf("/") + 1);
    // httpClient
    //   .get(`sp/get-SP-all-detail?idmp=${idMpFix}`)
    //   .then(({ data }) => {
    //     if (data.status.code === 200) {
    //       setOrderDataTable(data.detail);
    //       setOrder(data);
    //       setTimeout(() => {
    //         formik.setFieldValue("service", data.service);
    //         formik.setFieldValue("order_date", data.order_date);
    //         formik.setFieldValue("pickupDate", data.pickup_date);
    //       }, 1000);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
    // httpClient
    //   .get(`sp/get-SP-massage?id_mp=${idMpFix}`)
    //   .then(({ data }) => {
    //     if (data.status.code === 200) {
    //       setData(data.data);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
  }, []);

  const customStylesReactSelect = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      width: "100%",
      minWidth: "100%",
    }),
  };

  return (
    <div>
      <Card>
        <h5>New Master Customer test</h5>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            {/* <Col span={3}>
              <Button type="submit">Save and load photo customer</Button>
            </Col> */}
          </Row>
          <br />
          <hr />
          <h5>Customer Data</h5>
          <hr/>
          <br />
          <Row style={{ marginBottom: "10px" }} >
            <Col span={12}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Customer Code :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="kode_customer"
                    placeholder="Automatic Input Code"
                    value={formik.values.kode_customer}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.kode_customer}
                    disabled
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Date Register :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tgl_bergabung"
                    placeholder="Tanggal Bergabung"
                    value={formik.values.tgl_bergabung}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tgl_bergabung}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Customer Name :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="nama_perusahaan"
                    placeholder="Nama Perusahaan"
                    value={formik.values.nama_perusahaan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nama_perusahaan}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Business :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jenis_usaha"
                    placeholder="Jenis Usaha"
                    value={formik.values.jenis_usaha}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_usaha}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Customer Address :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="alamat_kantor"
                    placeholder="Alamat Kantor"
                    value={formik.values.alamat_kantor}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.alamat_kantor}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Company Anniversary :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tahun_berdiri"
                    placeholder="Tahun Berdiri"
                    value={formik.values.tahun_berdiri}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tahun_berdiri}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: "bold" }}>Item :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jenis_barang"
                    placeholder="Jenis Barang"
                    value={formik.values.jenis_barang}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_barang}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Telp Office :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="telepon"
                    placeholder="Telepon Office"
                    value={formik.values.telepon}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.telepon}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Fax Office :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="fax"
                    placeholder="Fax Office"
                    value={formik.values.fax}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.fax}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <hr />
          <h5 style={{ fontWeight: "bold" }}>Contact Person</h5>
          <hr />
          <br />
          <Row>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  PIC Office :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pic_office"
                    placeholder="PIC Office"
                    value={formik.values.pic_office}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pic_office}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  PIC Position :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pic_position"
                    placeholder="PIC Position"
                    value={formik.values.pic_position}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pic_position}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  PIC Email :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pic_email"
                    placeholder="PIC Email"
                    value={formik.values.pic_email}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pic_email}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  PIC Phone :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                   type="number"
                    name="pic_phone"
                    placeholder="PIC Phone"
                    value={formik.values.pic_phone}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pic_phone}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  PIC Birth :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pic_birth"
                    placeholder="PIC Birth"
                    value={formik.values.pic_birth}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pic_birth}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  PIC Fax :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="pic_fax"
                    placeholder="PIC Fax"
                    value={formik.values.pic_fax}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pic_fax}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <hr />
          <h5 style={{ fontWeight: "bold" }}>TAX</h5>
          <hr />
          <br />
          <Row>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  NPWP Number :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                   type="number"
                    name="npwp"
                    placeholder="Nomor NPWP"
                    value={formik.values.npwp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={16}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  NPWP Address :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="alamat_npwp"
                    placeholder="Alamat NPWP"
                    value={formik.values.alamat_npwp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.alamat_npwp}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  KTP Number :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                   type="number"
                    name="ktp"
                    placeholder="Nomor KTP"
                    value={formik.values.ktp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.ktp}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={16}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  TDP Address :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tdp"
                    placeholder="TDP Address"
                    value={formik.values.tdp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tdp}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  TAX PIC :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tax_pic"
                    placeholder="TAX PIC"
                    value={formik.values.tax_pic}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tax_pic}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  TAX Position :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tax_position"
                    placeholder="TAX Position"
                    value={formik.values.tax_position}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tax_position}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  TAX Email :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tax_email"
                    placeholder="TAX Email"
                    value={formik.values.tax_email}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tax_email}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  TAX Phone Office :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                   type="number"
                    name="tax_phone_office"
                    placeholder="TAX Phone Office"
                    value={formik.values.tax_phone_office}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tax_phone_office}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  TAX Mobile :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                   type="number"
                    name="tax_mobile"
                    placeholder="TAX Mobile"
                    value={formik.values.tax_mobile}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tax_mobile}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <hr />
          <h5> TERM OF PAYMENT </h5>
          <hr />
          <br />
          <Row>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Bank Name :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="nama_bank"
                    placeholder="Nama Bank"
                    value={formik.values.nama_bank}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nama_bank}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Account Name :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="nama_akun"
                    placeholder="Nama Akun"
                    value={formik.values.nama_akun}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nama_akun}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Account Number :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                   type="number"
                    name="no_rek"
                    placeholder="Nomor Rekening"
                    value={formik.values.no_rek}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.no_rek}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <label style={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Type Of Payment:{" "}
                </label>
                <InputGroup>
                  <Select
                    style={{ width: "100%" }}
                    options={optjenisPembayaran}
                    name="jenis_pembayaran"
                    value={jenisPembayaran}
                    onChange={(e) => setJenisPembayaran(e)}
                    isInvalid={!!formik.errors.jenis_pembayaran}
                    // styles={customStylesReactSelect}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>ToP :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="top"
                    placeholder="ToP"
                    value={formik.values.top}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.top}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  BANK PIC :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="bank_pic"
                    placeholder="Bank PIC"
                    value={formik.values.bank_pic}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.bank_pic}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  BANK Position :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="bank_position"
                    placeholder="Bank Position"
                    value={formik.values.bank_position}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.bank_position}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  BANK Email :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="bank_email"
                    placeholder="Bank Email"
                    value={formik.values.bank_email}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.bank_email}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  BANK Office Phone :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                   type="number"
                    name="bank_phone_office"
                    placeholder="Bank Office Phone"
                    value={formik.values.bank_phone_office}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.bank_phone_office}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  BANK Mobile :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                   type="number"
                    name="bank_mobile"
                    placeholder="Bank Mobile"
                    value={formik.values.bank_mobile}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.bank_mobile}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <hr />
          <h5> INVOICE </h5>
          <hr />
          <br />
          <Row>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Inv PIC :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="invoice_pic"
                    placeholder="Invoice PIC"
                    value={formik.values.invoice_pic}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.invoice_pic}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Inv Position :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="invoice_position"
                    placeholder="Invoice Position"
                    value={formik.values.invoice_position}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.invoice_position}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Inv Email :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="invoice_email"
                    placeholder="Invoice Email"
                    value={formik.values.invoice_email}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.invoice_email}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Inv Office Phone :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                   type="number"
                    name="invoice_phone_office"
                    placeholder=" Inv Office Phone"
                    value={formik.values.invoice_phone_office}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.invoice_phone_office}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Inv Mobile :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                   type="number"
                    name="invoice_mobile"
                    placeholder="Invoice Mobile"
                    value={formik.values.invoice_mobile}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.invoice_mobile}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
           
          </Row>

          <Col span={24} className="d-flex justify-content-end mt-5">
            <Button
              onClick={formik.handleSubmit}
              style={{
                backgroundColor: "#00a65a",
                color: "white",
                borderColor: "#008d4c",
              }}
            >
              Save and load photo customer
            </Button>
          </Col>
        </Form>
      </Card>
    </div>
  );
};

export default SamplePage;
