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
import moment from "moment";
import useBanksStore from "../../../../zustand/Store/NamaNamaBank";
const { RangePicker } = DatePicker;

const onSearch = (value) => console.log(value);
const SamplePage = () => {
  const router = useHistory();
  const { banks } = useBanksStore();
  const [data, setData] = useState([]);
  const [orderDataTable, setOrderDataTable] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [detailSp, setDetailSp] = useState([]);
  const [isiValues, setIsiValues] = useState("");
  const [jenisPembayaran, setJenisPembayaran] = useState("");
  const [TOP, setTOP] = useState("");
  const [JenisKiriman, setJenisKiriman] = useState("");
  const [Currency, setCurrency] = useState("");
  const [Manager, setManager] = useState("");
  const [Direktur, setDirektur] = useState("");
  const [Akunting, setAkunting] = useState("");

  const optjenisPembayaran = [
    {
      value: 1,
      label: "Cash",
    },
    {
      value: 2,
      label: "Credit",
    },
  ];
  const optionToP = [
    {
      value: 1,
      label: "7",
    },
    {
      value: 2,
      label: "14",
    },
    {
      value: 3,
      label: "20",
    },
    {
      value: 4,
      label: "30",
    },
    {
      value: 5,
      label: "60",
    },
  ];
  const optionCurrency = [
    {
      value: 1,
      label: "Rupiah (Rp.)",
    },
  ];
  const optionJenisKiriman = [
    {
      value: 1,
      label: "Retail",
    },
    {
      value: 2,
      label: "Charter",
    },
  ];
  const OptionsDireksi = [
    {
      value: "Y",
      label: "ADA",
    },
    {
      value: "N",
      label: "TIDAK ADA",
    },
  ];

  const formik = useFormik({
    initialValues: {
      kode_customer: "",
      nama_perusahaan: "",
      jenis_barang: "",
      jenis_usaha: "",
      tgl_berdiri: 0,
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
      invoice_mobile: 0,
      invoice_email: "",
      pic_office: "",
      pic_position: "",
      pic_phone: "",
      pic_number: "",
      pic_fax: "",
      pic_email: "",
      pic_birth: 0,
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
      top: 0,
      jenis_angkutan: "",
      kemasan: "",
      unique_cus: "",
      foto_kantor: "",
      foto_pic: "",
      foto_ktp: "",
      foto_npwp: "",
      manager: "Y",
      manager_memo: "",
      manager_date: 0,
      akunting: "Y",
      akunting_memo: "",
      akunting_date: 0,
      direktur: "Y",
      direktur_memo: "",
      direktur_date: 0,
      mou_file: "",
      tgl_bergabung: "",
    },
    validationSchema: Yup.object({
      nama_perusahaan: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Masukkan Nama Perusahaan !"),
      alamat_kantor: Yup.string()
        .max(1000, "Must be 1000 characters or less")
        .required("Masukkan Customer Address !"),
      npwp: Yup.string()
      .max(30, "Must be 30 characters or less")
        .required("Masukkan Nomor NPWP !"),
      alamat_npwp: Yup.string()
        .max(1000, "Must be 1000 characters or less")
        .required("Masukkan NPWP Address !"),
      pic_office: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Masukkan PIC Office !"),
      pic_position: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Masukkan PIC Position !"),
        pic_phone: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Masukkan PIC Phone !"),      
      jenis_usaha: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Masukkan Jenis Usaha !"),
      // // Anda dapat menambahkan aturan validasi lainnya untuk setiap field
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
          let errorMessage = "Terjadi kesalahan.";

          if (
            error.response &&
            error.response.data &&
            error.response.data.status
          ) {
            const status = error.response.data.status;

            if (status.code === 500) {
              errorMessage = "Ada data yang belum terinputkan";
              if (status.message) {
                errorMessage += ` Detail: ${status.message}`;
              }
            } else {
              errorMessage = error.response.data.status.message;
            }
          }

          notification.error({
            message: "Error",
            description: errorMessage,
          });

          console.error(error.message);
          if (
            error.response &&
            error.response.data &&
            error.response.data.status
          ) {
            console.error(error.response.data.status.message);
          }
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
        <h5>New Master Customer</h5>
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
          <hr />
          <br />
          <Row style={{ marginBottom: "10px" }}>
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
            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Date Register :
                </Form.Label>
                <InputGroup>
                  <DatePicker
                    style={{ width: "100%" }}
                    name="tgl_bergabung"
                    placeholder="YYYY-MM-DD"
                    selected={
                      formik.values.tgl_bergabung
                        ? moment(formik.values.tgl_bergabung).toDate()
                        : null
                    }
                    onChange={(date) =>
                      formik.setFieldValue(
                        "tgl_bergabung",
                        moment(date).format("YYYY-MM-DD")
                      )
                    }
                    isInvalid={!!formik.errors.tgl_bergabung}
                  />
                  {formik.errors.tgl_bergabung && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.tgl_bergabung}
                    </Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Tanggal Berdiri :
                </Form.Label>
                <InputGroup>
                  <DatePicker
                    style={{ width: "100%" }}
                    name="tgl_berdiri"
                    placeholder="YYYY-MM-DD"
                    selected={
                      formik.values.tgl_berdiri
                        ? moment(formik.values.tgl_berdiri).toDate()
                        : null
                    }
                    onChange={(date) =>
                      formik.setFieldValue(
                        "tgl_berdiri",
                        moment(date).format("YYYY-MM-DD")
                      )
                    }
                    isInvalid={!!formik.errors.tgl_berdiri}
                  />
                  {formik.errors.tgl_berdiri && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.tgl_berdiri}
                    </Form.Control.Feedback>
                  )}
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
                    onChange={(e) =>
                      formik.setFieldValue(
                        "nama_perusahaan",
                        e.target.value.toUpperCase()
                      )
                    }
                    isInvalid={!!formik.errors.nama_perusahaan}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.nama_perusahaan}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Business :
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    name="jenis_usaha"
                    placeholder="Jenis Usaha"
                    value={formik.values.jenis_usaha}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.jenis_usaha && !!formik.errors.jenis_usaha
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.jenis_usaha}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Jenis Kiriman :
                </Form.Label>
                <InputGroup>
                  <Select
                    style={{ width: "100%" }}
                    options={optionJenisKiriman}
                    name="jenis_angkutan"
                    // value={TOP}

                    placeholder="Select Jenis Kiriman"
                    onChange={(value, label) => {
                      setJenisKiriman(label.label);
                      formik.setFieldValue(`jenis_angkutan`, label.label);
                      console.log(label.label);
                    }}
                    isInvalid={!!formik.errors.jenis_angkutan}
                    // styles={customStylesReactSelect}
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
                    as="textarea"
                    name="alamat_kantor"
                    placeholder="Alamat Kantor"
                    value={formik.values.alamat_kantor}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.alamat_kantor}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.alamat_kantor}
                  </Form.Control.Feedback>
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
                    type="number"
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
                    type="number"
                    placeholder="Fax Office"
                    value={formik.values.fax}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.fax}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col span={12}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Email Customer :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="email"
                    type="text"
                    placeholder="Email Customer"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.email}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  HP Customer :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="hp"
                    type="text"
                    placeholder="HP Customer"
                    value={formik.values.hp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.hp}
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
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    name="pic_office"
                    placeholder="PIC Office"
                    value={formik.values.pic_office}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.pic_office && !!formik.errors.pic_office
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.pic_office}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  PIC Position :
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    name="pic_position"
                    placeholder="PIC Position"
                    value={formik.values.pic_position}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.pic_position &&
                      !!formik.errors.pic_position
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.pic_position}
                  </Form.Control.Feedback>
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
                <InputGroup className="mb-3">
                  <Form.Control
                    type="number"
                    name="pic_phone"
                    placeholder="PIC Phone"
                    value={formik.values.pic_phone}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.pic_phone && !!formik.errors.pic_phone
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.pic_phone}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  PIC Number :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="pic_number"
                    placeholder="PIC Number"
                    value={formik.values.pic_number}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pic_number}
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
                  <DatePicker
                    style={{ width: "100%" }}
                    name="pic_birth"
                    placeholder="YYYY-MM-DD"
                    selected={
                      formik.values.pic_birth
                        ? moment(formik.values.pic_birth).toDate()
                        : null
                    }
                    onChange={(date) =>
                      formik.setFieldValue(
                        "pic_birth",
                        moment(date).format("YYYY-MM-DD")
                      )
                    }
                    isInvalid={!!formik.errors.pic_birth}
                  />
                  {formik.errors.pic_birth && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.pic_birth}
                    </Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
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
          <h5 style={{ fontWeight: "bold" }}>DATA PIC</h5>
          <hr />
          <br />
          <Row>
            <Col span={12}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Manager :
                </Form.Label>
                <InputGroup>
                  <Select
                    style={{ width: "100%" }}
                    options={OptionsDireksi}
                    name="manager"
                    // value={TOP}

                    placeholder="Ada atau Tidak Ada"
                    onChange={(value, label) => {
                      setManager(label.value);
                      formik.setFieldValue(`manager`, label.value);
                      // console.log(label.label);
                      console.log(label.value);
                    }}
                    isInvalid={!!formik.errors.manager}
                    // styles={customStylesReactSelect}
                  />
                  {/* <Form.Control
                    name="manager"
                    placeholder="Manager Name"
                    value={formik.values.manager}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.manager}
                  /> */}
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Manager Date :
                </Form.Label>
                <InputGroup>
                  <DatePicker
                    style={{ width: "100%" }}
                    name="manager_date"
                    placeholder="YYYY-MM-DD"
                    selected={
                      formik.values.manager_date
                        ? moment(formik.values.manager_date).toDate()
                        : null
                    }
                    onChange={(date) =>
                      formik.setFieldValue(
                        "manager_date",
                        moment(date).format("YYYY-MM-DD")
                      )
                    }
                    isInvalid={!!formik.errors.manager_date}
                  />
                  {formik.errors.manager_date && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.manager_date}
                    </Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Manager Memo :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    name="manager_memo"
                    placeholder="Memo Manager if you need"
                    value={formik.values.manager_memo}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.manager_memo}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          {/* Akunting */}
          <Row className="mt-3">
            <Col span={12}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Akunting :
                </Form.Label>
                <InputGroup>
                  <Select
                    style={{ width: "100%" }}
                    options={OptionsDireksi}
                    name="akunting"
                    // value={TOP}

                    placeholder="Ada atau Tidak Ada"
                    onChange={(value, label) => {
                      setAkunting(label.value);
                      formik.setFieldValue(`akunting`, label.value);
                      // console.log(label.label);
                      console.log(label.value);
                    }}
                    isInvalid={!!formik.errors.akunting}
                    // styles={customStylesReactSelect}
                  />
                  {/* <Form.Control
                    name="akunting"
                    placeholder="Akunting Name"
                    value={formik.values.akunting}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.akunting}
                  /> */}
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Akunting Date :
                </Form.Label>
                <InputGroup>
                  <DatePicker
                    style={{ width: "100%" }}
                    name="akunting_date"
                    placeholder="YYYY-MM-DD"
                    selected={
                      formik.values.akunting_date
                        ? moment(formik.values.akunting_date).toDate()
                        : null
                    }
                    onChange={(date) =>
                      formik.setFieldValue(
                        "akunting_date",
                        moment(date).format("YYYY-MM-DD")
                      )
                    }
                    isInvalid={!!formik.errors.akunting_date}
                  />
                  {formik.errors.akunting_date && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.akunting_date}
                    </Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Akunting Memo :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    name="akunting_memo"
                    placeholder="Memo Akunting if you need"
                    value={formik.values.akunting_memo}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.akunting_memo}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          {/* Direktur */}
          <Row className="mt-3">
            <Col span={12}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Direktur :
                </Form.Label>
                <InputGroup>
                  <Select
                    style={{ width: "100%" }}
                    options={OptionsDireksi}
                    name="direktur"
                    // value={TOP}

                    placeholder="Ada atau Tidak Ada"
                    onChange={(value, label) => {
                      setDirektur(label.value);
                      formik.setFieldValue(`direktur`, label.value);
                      // console.log(label.label);
                      console.log(label.value);
                    }}
                    isInvalid={!!formik.errors.direktur}
                    // styles={customStylesReactSelect}
                  />
                  {/* <Form.Control
                    name="direktur"
                    placeholder="Direktur Name"
                    value={formik.values.direktur}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.direktur}
                  /> */}
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Direktur Date :
                </Form.Label>
                <InputGroup>
                  <DatePicker
                    style={{ width: "100%" }}
                    name="direktur_date"
                    placeholder="YYYY-MM-DD"
                    selected={
                      formik.values.direktur_date
                        ? moment(formik.values.direktur_date).toDate()
                        : null
                    }
                    onChange={(date) =>
                      formik.setFieldValue(
                        "direktur_date",
                        moment(date).format("YYYY-MM-DD")
                      )
                    }
                    isInvalid={!!formik.errors.direktur_date}
                  />
                  {formik.errors.direktur_date && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.direktur_date}
                    </Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Direktur Memo :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    name="direktur_memo"
                    placeholder="Memo Direktur if you need"
                    value={formik.values.direktur_memo}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.direktur_memo}
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
                    type="text"
                    name="npwp"
                    placeholder="Nomor NPWP"
                    value={formik.values.npwp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.npwp}
                  </Form.Control.Feedback>
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
                    as="textarea"
                    name="alamat_npwp"
                    placeholder="Alamat NPWP"
                    value={formik.values.alamat_npwp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.alamat_npwp}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.alamat_npwp}
                  </Form.Control.Feedback>
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
                    as="textarea"
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
                <Select
                  style={{ width: "100%" }}
                  name="nama_bank"
                  value={formik.values.nama_bank}
                  onChange={(e) => formik.setFieldValue("nama_bank", e)}
                  showSearch
                  optionFilterProp="children"
                >
                  {banks &&
                    banks.map((i) => <select value={i.name}>{i.name}</select>)}
                </Select>
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
                    // value={jenisPembayaran}
                    placeholder="Select Type Of Payment"
                    onChange={(label, value) => {
                      setJenisPembayaran(value.label);
                      formik.setFieldValue(`jenis_pembayaran`, value.label);
                      console.log(value.label);
                    }}
                    isInvalid={!!formik.errors.jenis_pembayaran}
                    // styles={customStylesReactSelect}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={4}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <label style={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Term Of Payment :{" "}
                </label>
                <InputGroup>
                  <Select
                    style={{ width: "100%" }}
                    options={optionToP}
                    name="top"
                    // value={TOP}

                    placeholder="Select ToP"
                    onChange={(value, label) => {
                      setTOP(label.label);
                      formik.setFieldValue(`top`, label.label);
                      console.log(label.label);
                    }}
                    isInvalid={!!formik.errors.top}
                    // styles={customStylesReactSelect}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={4}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <label style={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Currency:{" "}
                </label>
                <InputGroup>
                  <Select
                    style={{ width: "100%" }}
                    options={optionCurrency}
                    name="mata_uang "
                    placeholder="Select Currency"
                    onChange={(value, label) => {
                      setCurrency(label.label);
                      formik.setFieldValue(`mata_uang`, label.label);
                      console.log(label.label);
                    }}
                    isInvalid={!!formik.errors.mata_uang}
                    // styles={customStylesReactSelect}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            {/* <Col span={8}>
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
            </Col> */}
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
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Inv Address :
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    as="textarea"
                    name="invoice_address"
                    placeholder="Invoice Address"
                    value={formik.values.invoice_address}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.invoice_address}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Col span={24} className="d-flex justify-content-end mt-5">
            <Button
              onClick={formik.handleSubmit}
              style={{
                backgroundColor: "#1a5cbf",
                color: "white",
                borderColor: "#1a5cbf",
              }}
            >
              Save Customer
            </Button>
          </Col>
        </Form>
      </Card>
    </div>
  );
};

export default SamplePage;
