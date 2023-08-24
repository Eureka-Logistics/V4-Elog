import React, { useEffect, useState } from "react";
import { Card, DatePicker, Input, Row, Col, notification } from "antd";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { httpClient } from "../../../Api/Api";
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
  const [jenisLayanan, setJenisLayanan] = useState("");
  const [jenisKiriman, setJenisKiriman] = useState("");
  const [via, setVia] = useState("");
  const [IdMitra, setIdMitra] = useState("");
  const [Tarif, setTarif] = useState(10000);
  const [Ritase, setRitase] = useState(0.1);
  const [UangJalan, setUangJalan] = useState(10000);
  const [viaOptions, setViaOptions] = useState([]);
  const [jenisDiskon, setJenisDiskon] = useState("");
  const [KodeID, setKodeID] = useState("");
  const [DataLeadTime, setDataLeadTime] = useState("");

  const optjenisLayanan = [
    {
      value: 1,
      label: "Retail",
    },
    {
      Value: 2,
      label: "Charter",
    },
  ];
  const optjenisKiriman = [
    {
      value: 1,
      label: "Express",
    },
    {
      Value: 2,
      label: "Reguler",
    },
  ];
  const optjenisDiskon = [
    {
      value: "Amount",
      label: "Amount",
    },
    {
      Value: "Persen",
      label: "Persen",
    },
  ];

  const formik = useFormik({
    initialValues: {
      id_muat_kota: kota?.value,
      id_tujuan_kota: kotaTujuan?.value,
      id_kendaraan_jenis: jenisKendaraan?.value,
      id_mitra: IdMitra?.value,
      service_type: jenisLayanan,
      jenis_kiriman: jenisKiriman,
      via: via?.label,
      tarif: Tarif,
      ritase: Ritase,
      uang_jalan: UangJalan,
    },
    validationSchema: Yup.object({
      id_customer: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      httpClient
        .post(
          "tarif/create-tarifEureka",
          {
            ...values,
            service_type: jenisLayanan,
            jenis_kiriman: jenisKiriman.label,
            tarif: Tarif,
            ritase: Ritase,
            uang_jalan: UangJalan,
          }
          // values,
          // service_type: jenisLayanan,
          // ,
        )
        .then(({ data }) => {
          notification.success({
            message: "Success",
            description: data.message,
          });
          setTimeout(() => router.push("/tarif_eureka"), 1000);
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
      .get("wilayah/get-kota")
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
      .get(
        "tarif/get-select?idMuat=&idBogkar=&idJenisKendaraan=&service_type=Reguler"
      )
      .then(({ data }) => {
        if (data.status.code === 200) {
          console.log("customer", data.kodeTarif);
          setKodeID(data.kodeTarif);
          setCustomerOptions(
            data.customer.map((x) => ({
              label: x.Customer,
              value: x.idCustomer,
            }))
          );
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });

    httpClient
      .get("sp/get-SP-select-detail?keyword=&companyId=")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setViaOptions(
            data.data.via.map((x) => ({
              label: x.via,
              value: x.id,
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
    } else if (e.name === "via") {
      setVia(value);
      formik.setFieldValue("via", value.label);
    } else if (e.name === "id_mitra") {
      setIdMitra(value);
      formik.setFieldValue("id_mitra", value.value);
    } else if (e.name === "tarif") {
      // setIdMitra(value);
      formik.setFieldValue("tarif", value);
    } else if (e.name === "jenis_kiriman") {
      // setIdMitra(value);
      formik.setFieldValue("jenis_kiriman", value);
    } else if (e.name === "ritase") {
      // setIdMitra(value);
      formik.setFieldValue("ritase", value);
    }
  };

  console.log("ini dia muat kota", jenisLayanan);

  return (
    <div>
      <Card>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <h4 style={{color: '#1A5CBF'}}>Buat Tarif Eureka Baru</h4>
            </Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={4}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: `bold`}}>Kode Tarif Eureka</Form.Label>
                <Form.Control disabled value={KodeID.kodeTarifEureka} />
              </Form.Group>
            </Col>
            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: `bold`}}>Kota Muat</Form.Label>
                <InputGroup>
                  <Select
                    options={kotaOptions}
                    value={kota}
                    isSearchable
                    placeholder="Select Kota Muat"
                    name="id_muat_kota"
                    styles={customStylesReactSelect}
                    onChange={onSelectChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: `bold`}}>Kota Tujuan</Form.Label>
                <InputGroup>
                  <Select
                    options={kotaOptions}
                    value={kotaTujuan}
                    isSearchable
                    placeholder="Select Kota Tujuan"
                    name="id_tujuan_kota"
                    styles={customStylesReactSelect}
                    onChange={onSelectChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: `bold`}}>Jenis kendaraan </Form.Label>
                <InputGroup>
                  <Select
                    options={jenisKendaraanOptions}
                    value={jenisKendaraan}
                    isSearchable
                    placeholder="Select Jenis Kendaraan"
                    name="id_kendaraan_jenis"
                    styles={customStylesReactSelect}
                    onChange={onSelectChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col span={4}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: `bold`}}>Via</Form.Label>
                <InputGroup>
                  <Select
                    options={viaOptions}
                    value={via}
                    isSearchable
                    placeholder="Select Via"
                    name="via"
                    styles={customStylesReactSelect}
                    onChange={onSelectChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: `bold`}}>Jenis Kiriman</Form.Label>
                <InputGroup>
                  <Select
                    options={optjenisKiriman}
                    name="jenis_kiriman"
                    value={jenisKiriman}
                    onChange={(e) => setJenisKiriman(e)}
                    isInvalid={!!formik.errors.jenis_kiriman}
                    styles={customStylesReactSelect}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: `bold`}}>Jenis Layanan</Form.Label>
                <InputGroup>
                  <Select
                    options={optjenisLayanan}
                    name="service_type"
                    // value={jenisLayanan}
                    onChange={(e) => setJenisLayanan(e.label)}
                    isInvalid={!!formik.errors.service_type}
                    styles={customStylesReactSelect}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: `bold`}}>Lead Time</Form.Label>
                <InputGroup>
                  <Form.Control
                    // name="tarif"
                    type="number"
                    // Menambahkan desimal dengan step 0.01
                    // value={Tarif}
                    // onChange={(e) => setTarif(e.target.value)}
                    // isInvalid={!!formik.errors.tarif}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
           
          </Row>
        
          <br />
          <hr />
          <h4 style={{color: '#1A5CBF'}}>Biaya Penanganan</h4>
          <br />
          <Row>
            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: `bold`}}>Tarif</Form.Label>
                <InputGroup>
                  <Form.Control
                    // name="tarif"
                    type="number"
                    step="0.01" // Menambahkan desimal dengan step 0.01
                    value={Tarif}
                    onChange={(e) => setTarif(e.target.value)}
                    isInvalid={!!formik.errors.tarif}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{fontWeight: `bold`}}>Ritase</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="ritase"
                    type="number"
                    value={Ritase}
                    onChange={(e) => setRitase(e.target.value)}
                    isInvalid={!!formik.errors.ritase}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={6}>
              <Form.Group>
                <Form.Label style={{fontWeight: `bold`}}>Uang Jalan</Form.Label>
                <InputGroup>
                  <Form.Control
                    // name="uang_jalan"
                    type="number"
                    value={UangJalan}
                    onChange={(e) => setUangJalan(e.target.value)}
                    isInvalid={!!formik.errors.uang_jalan}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={24} className="d-flex justify-content-end">
              <Form.Group>
                <Button type="submit">Simpan Tarif</Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default SamplePage;
