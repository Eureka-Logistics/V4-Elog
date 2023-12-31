import React, { useEffect, useState } from "react";
import { Card, DatePicker, Input, Row, Col, notification, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { httpClient } from "../../../Api/Api";
import { InputGroup, Form } from "react-bootstrap";
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
  const [kotaOptions, setKotaOptions] = useState([]);
  const [wilayah, setWilayah] = useState("");
  const [wilayahOptions, setWilayahOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      id_customer: "",
      pic: "",
      jabatan: "",
      email: "",
      alamat: "",
      kecamatan: "",
      kota: "",
      kode_wilayah: "",
      ritase: "",
      hp: "",
      lat: "",
      lon: "",
      id_provinsi: "",
      id_kecamatan: "",
      id_kota: "",
    },

    validationSchema: Yup.object({
      // id_customer: Yup.string().max(30, "Must be 30 characters or less"),
      nama_perusahaan: Yup.string().required("Masukkan Nama Perusahaan"),
      // jenis_barang: Yup.string().required("Type Of Goods is required"),
      // jenis_usaha: Yup.string().required("Type Of Business is required"),
      // tahun_berdiri: Yup.number()
      //   .typeError("Year of Establishment must be a number")
      //   .integer("Year of Establishment must be an integer")
      //   .required("Year of Establishment is required"),
      // npwp: Yup.string().required("NPWP is required"),
      // alamat_npwp: Yup.string().required("NPWP Address is required"),
      // alamat_kantor: Yup.string().required("Office Address is required"),
      // telepon: Yup.string().required("Telephone is required"),
      // hp: Yup.string().required("Mobile Number is required"),
      // mata_uang: Yup.string().required("Currency is required"),
      // jenis_pembayaran: Yup.string().required("Type Of Payment is required"),
      // ktp: Yup.string().required("KTP is required"),
      // tdp: Yup.string().required("TDP is required"),
      // siup: Yup.string().required("SIUP is required"),
      // Add more validations for other fields as needed
    }),
    onSubmit: (values) => {
      httpClient
        .post("customer/create-customer-address", values)
        .then(({ data }) => {
          notification.success({
            message: "Success",
            description: data.message,
          });
          // setTimeout(() => router.push("/masteralamat"), 1000);
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
    const url = window.location.href;
    const idMpFix = url.substring(url.lastIndexOf("/") + 1);
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

    // Fetch province options
    httpClient
      .get(`wilayah/get-provinsi?keyword=${provinsi}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setProvinsiOptions(
            data.data.order.map((x) => ({
              label: x.provinsi,
              value: x.idProv,
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
      setProvinsi(value.label);
      console.log(value.label);
      httpClient
        .get(`wilayah/get-provinsi?keyword=${value.label}`)
        .then(({ data }) => {
          if (data.status.code === 200) {
            setProvinsiOptions(
              data.data.order.map((x) => ({
                label: x.provinsi,
                value: x.idProv,
              }))
            );
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
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
    }
  };

  return (
    <div>
      <Card>
        <h4>New Master Alamat</h4>
        <Form onSubmit={formik.handleSubmit} className="mt-">
      
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Nama Perusahaan</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="nama_perusahaan"
                    value={formik.values.nama_perusahaan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nama_perusahaan}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jenis Barang</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jenis_barang"
                    value={formik.values.jenis_barang}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_barang}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jenis Usaha</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jenis_usaha"
                    value={formik.values.jenis_usaha}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_usaha}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Tanggal Berdiri </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tgl_berdiri"
                    value={formik.values.tgl_berdiri}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tgl_berdiri}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Tahun Berdiri</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tahun_berdiri"
                    value={formik.values.tahun_berdiri}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tahun_berdiri}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label>KTP</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="ktp"
                    value={formik.values.ktp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.ktp}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={9}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>NPWP</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="npwp"
                    value={formik.values.npwp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.npwp}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Alamat NPWP</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="alamat_npwp"
                    value={formik.values.alamat_npwp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.alamat_npwp}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Alamat Kantor</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="alamat_kantor"
                    value={formik.values.alamat_kantor}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.alamat_kantor}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Telepon</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="telepon"
                    value={formik.values.telepon}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.telepon}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>HP</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="hp"
                    value={formik.values.hp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.hp}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>TDP</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="tdp"
                    value={formik.values.tdp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.tdp}
                  />
                </InputGroup>
              </Form.Group>
             
            </Col>
            <Col span={7}>
            <Form.Group style={{ marginBottom: "10px" }}>
                
                <Form.Label>Kode Wilayah</Form.Label>
                <InputGroup>
                  <Select
                    style={{ width: 200, marginRight: 8 }}
                    options={provinsiOptions}
                    value={provinsi}
                    isSearchable
                    placeholder="Select Provinsi"
                    name="provinsi"
                    styles={customStylesReactSelect}
                    onChange={onSelectChange}
                    autoFocus
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Kota</Form.Label>
                <InputGroup>
                  <Select
                    style={{ width: 200 }}
                    options={kotaOptions}
                    value={kota}
                    isSearchable
                    placeholder="Select Kota"
                    name="kota"
                    styles={customStylesReactSelect}
                    onChange={onSelectChange}
                  />
                </InputGroup>
              </Form.Group> 
              
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Kecamatan</Form.Label>
                <InputGroup>
                  <Select
                    style={{ width: 200 }}
                    options={wilayahOptions}
                    value={wilayah}
                    isSearchable
                    placeholder="Select Kecamatan"
                    name="kecamatan"
                    styles={customStylesReactSelect}
                    onChange={onSelectChange}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Mata Uang</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="mata_uang"
                    value={formik.values.mata_uang}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.mata_uang}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Jenis Pembayaran</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="jenis_pembayaran"
                    value={formik.values.jenis_pembayaran}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis_pembayaran}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>SIUP</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="siup"
                    value={formik.values.siup}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.siup}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          {/* <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <Form.Group>
                <Form.Label>KTP</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="ktp"
                    value={formik.values.ktp}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.ktp}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row> */}
          <Row style={{ marginBottom: "10px" }}>
            <Col span={12}>
              <Form.Group>
                <Form.Label>Latitude</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="lat"
                    value={formik.values.lat}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.lat}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={12}>
              <Form.Group>
                <Form.Label>Longitude</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="lon"
                    value={formik.values.lon}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.lon}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <Row className="mt-5" style={{ marginBottom: "10px" }}>
          <Col span={8}></Col>
          <Col span={3}></Col>
          <Col span={3}></Col>
          <Col span={10} className="d-flex justify-content-end">
            <Button
              onClick={formik.handleSubmit}
              style={{ backgroundColor: "green", color: "white" }}
            >
              Save
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SamplePage;
