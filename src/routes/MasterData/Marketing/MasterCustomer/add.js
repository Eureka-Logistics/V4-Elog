import React, { useEffect, useState } from "react";
import { Card, DatePicker, Input, Row, Col, notification, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { httpClient } from "../../../../Api/Api";
import { InputGroup, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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

  return (
    <div>
      <Card>
        <h4>New Master Customer</h4>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}></Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            {/* <Col span={3}>
              <Button type="submit">Save and load photo customer</Button>
            </Col> */}
          </Row>
          <hr />
          <Row style={{ marginBottom: "10px" }} className="mt-5">
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: 'bold'}}>Customer Code :</Form.Label>
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
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: 'bold'}}>Office Number :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="officer_number"
                    placeholder="Officer Number"
                    value={formik.values.officer_number}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.officer_number}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: 'bold'}}>Type Of Business :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="typeof"
                    placeholder="Type Of Business"
                    value={formik.values.typeof}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.typeof}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={9}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: 'bold'}}>Customer Name :</Form.Label>
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
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: 'bold'}}>Fax :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="fax"
                    placeholder="Fax"
                    value={formik.values.fax}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.fax}
                    
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: 'bold'}}>
                  Type Of Goods (Ex :Sepatu/Shoes, Kertas/Paper, etc)
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jenis_barang"
                    placeholder="Type Of Goods"
                    value={formik.values.jenis_barang}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_barang}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={7}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: 'bold'}}>Company Name :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="nama_perusahaan"
                    placeholder="Company Name"
                    value={formik.values.nama_perusahaan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nama_perusahaan}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: 'bold'}}>Mobile Number :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="hp"
                    placeholder="Mobile Number"
                    value={formik.values.hp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.hp}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: 'bold'}}>Thn Berdiri :</Form.Label>
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
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Form.Group>
                <Form.Label style={{fontWeight: 'bold'}}>Alamat :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="alamat_npwp"
                    placeholder="Alamat"
                    value={formik.values.alamat_npwp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.alamat_npwp}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={12}>
              <Form.Group>
                <Form.Label style={{fontWeight: 'bold'}}>Email :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.email}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group>
                <Form.Label style={{fontWeight: 'bold'}}>Type Of Payment :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jenis_pembayaran"
                    placeholder="Jenis Pembayaran"
                    value={formik.values.jenis_pembayaran}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_pembayaran}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{fontWeight: 'bold'}}>Bank Name :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="bankname"
                    placeholder="Bank Name"
                    value={formik.values.bankname}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.bankname}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{fontWeight: 'bold'}}>Account Name :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="accountname"
                    placeholder="Account Name"
                    value={formik.values.accountname}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.accountname}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{fontWeight: 'bold'}}>Account Number :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="accountnumber"
                    placeholder="Account Number"
                    value={formik.values.accountnumber}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.accountnumber}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{fontWeight: 'bold'}}>Currency :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="mata_uang"
                    placeholder="Rupiah (Rp.)"
                    value={formik.values.mata_uang}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.mata_uang}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              <Form.Group>
                <Form.Label style={{fontWeight: 'bold'}}>NPWP :</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp"
                    placeholder="NPWP"
                    value={formik.values.npwp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Col span={24} className="d-flex justify-content-end">
            <Button onClick={formik.handleSubmit} style={{backgroundColor: "#00a65a", color: "white", borderColor: "#008d4c"}}>Save and load photo customer</Button>
          </Col>
        </Form>
      </Card>
    </div>
  );
};

export default SamplePage;
