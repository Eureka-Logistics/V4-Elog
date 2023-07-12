import React, { useEffect, useState } from "react";
import { Card, DatePicker, Input, Row, Col, notification } from "antd";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { httpClient } from "../../util/Api";
import { InputGroup, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const { RangePicker } = DatePicker;

const onSearch = (value) => console.log(value);

const SamplePage = () => {
  const router = useHistory();

  const [data, setData] = useState([]);
  const [orderDataTable, setOrderDataTable] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [detailSp, setDetailSp] = useState([]);
  const [provinsi, setProvinsi] = useState("");
  const [provinsiOptions, setProvinsiOptions] = useState([]);
  const [kota, setKota] = useState("");
  const [kotaTujuan, setKotaTujuan] = useState("");
  const [kotaOptions, setKotaOptions] = useState([]);
  const [wilayah, setWilayah] = useState("");
  const [wilayahOptions, setWilayahOptions] = useState([]);
  const [jenisKendaraan, setJenisKendaraan] = useState("");
  const [jenisKendaraanOptions, setJenisKendaraanOptions] = useState([]);
  const [customer, setCustomer] = useState("");
  const [customerOptions, setCustomerOptions] = useState([]);
  const [jenisDesignation, setJenisDesignation] = useState("");
  const optDesignation = [
    {
      value: "Group Leader",
      label: "Group Leader",
    },
    {
      Value: "Staff",
      label: "Staff",
    },
    {
      Value: "Manager",
      label: "Manager",
    },
    {
      Value: "Kacab",
      label: "Kacab",
    },
    {
      Value: "AMD",
      label: "AMD",
    },
    {
      Value: "Direktur",
      label: "Direktur",
    },
  ];
  const [jenisEmpPos, setEmpPos] = useState("");
  const optEmpPos = [
    {
      value: "Group Leader",
      label: "Group Leader",
    },
    {
      Value: "Staff",
      label: "Staff",
    },
    {
      Value: "Manager",
      label: "Manager",
    },
    {
      Value: "Kacab",
      label: "Kacab",
    },
    {
      Value: "AMD",
      label: "AMD",
    },
    {
      Value: "Direktur",
      label: "Direktur",
    },
  ];

  const formik = useFormik({
    initialValues: {
      code_employee: "P2090  ",
      fullname: "",
      job_level: "",
      designation: "status",
      code_employee_position: "",
      id_bu: 12,
      id_bu_brench: 1106,
      id_gl: "G1009",
      id_asm: "A1002",
      id_mgr: "M1001",
      id_kacab: "K1001",
      id_amd: "D1001",
      no_telp: "",
      email: "",
      photo: "",
    },
    validationSchema: Yup.object({
      code_employee: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      httpClient
        .post("bu/create-bu-employee", values)
        .then(({ data }) => {
          notification.success({
            message: "Success",
            description: data.message,
          });
          setTimeout(() => router.push("/buemploye"), 1000);
        })
        .catch(function (error) {
          notification.error({
            message: "Error",
            description: error.message,
          });
          console.log(error.message);
        });
    },
  });

  useEffect(() => {
    // const url = window.location.href;
    // const idMpFix = url.substring(url.lastIndexOf("/") + 1);
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
    // // Fetch province options
    httpClient
      .get("wilayah/get-kota?limit=10&page=1&keyword=")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setKotaOptions(
            data.data.order.map((x) => ({
              label: x.kotaName,
              value: x.idKota,
            }))
          );
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
    httpClient
      .get("vehicle/get-type?keyword=")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setJenisKendaraanOptions(
            data.data.order.map((x) => ({
              label: x.type,
              value: x.id,
            }))
          );
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
    httpClient
      .get("customer/get-customer?limit=10&page=1&keyword=")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setCustomerOptions(
            data.data.order.map((x) => ({
              label: x.custName,
              value: x.custId,
            }))
          );
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
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

  const onSelectChange = (value, e) => {
    if (e.name === "provinsi") {
      formik.setFieldValue("id_provinsi", value.value);
      setProvinsi(value);
      httpClient
        .get(`wilayah/get-kota?provinsi=${value.value}`)
        .then(({ data }) => {
          if (data.status.code === 200) {
            setKotaOptions(
              data.data.order.map((x) => ({
                label: x.kotaName,
                value: x.idKota,
              }))
            );
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } else if (e.name === "kota") {
      formik.setFieldValue("id_kota", value.value);
      setKota(value);
      httpClient
        .get(
          `wilayah/get-kecamatan?limit=10&page=1&keyword=&provinsi=${provinsi?.value}&idkota=${value.value}`
        )
        .then(({ data }) => {
          if (data.status.code === 200) {
            setWilayahOptions(
              data.data.order.map((x) => ({
                label: x.kecamatanName,
                value: x.idKecamatan,
              }))
            );
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } else if (e.name === "kecamatan") {
      formik.setFieldValue("id_kecamatan", value.value);
      setWilayah(value);
    } else if (e.name === "id_kendaraan_jenis") {
      formik.setFieldValue("id_kendaraan_jenis", value.value);
      setJenisKendaraan(value);
    } else if (e.name === "id_customer") {
      formik.setFieldValue("id_customer", value.value);
      setCustomer(value);
    } else if (e.name === "id_muat_kota") {
      formik.setFieldValue("id_muat_kota", value.value);
      setKota(value);
    } else if (e.name === "id_tujuan_kota") {
      setKotaTujuan(value);
      formik.setFieldValue("id_tujuan_kota", value.value);
    }
  };

  return (
    <div>
      <Card>
        <Form onSubmit={formik.handleSubmit}>
        <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <h2>Buat BU Employee Baru</h2>
            </Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}>
              <Button type="submit">Simpan BU Employee </Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={7}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>KODE EMPLOYE</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="code_employee"
                    value={formik.values.code_employee}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.code_employee}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>EMPLOYE POSITION</Form.Label>
                <InputGroup>
                  <Select
                    options={optEmpPos}
                    name="code_employee_position"
                    value={jenisEmpPos}
                    onChange={(e) => setEmpPos(e)}
                    isInvalid={!!formik.errors.code_employee_position}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>FULL NAME</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="fullname"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.fullname}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Form.Group>
                <Form.Label>JOB LEVEL</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="job_level"
                    value={formik.values.job_level}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.job_level}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={12}>
              <Form.Group>
                <Form.Label>DESIGNATION</Form.Label>
                <InputGroup>
                  <Select
                    options={optDesignation}
                    name="designation"
                    value={jenisDesignation}
                    onChange={(e) => setJenisDesignation(e)}
                    isInvalid={!!formik.errors.designation}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group>
                <Form.Label>CODE EMPLOYE POSITION</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="code_employee_position"
                    value={formik.values.code_employee_position}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.code_employee_position}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default SamplePage;