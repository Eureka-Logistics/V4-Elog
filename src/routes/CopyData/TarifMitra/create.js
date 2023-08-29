import React, { useEffect, useState } from "react";
import { Card, DatePicker, Input, Row, Col, notification, Alert } from "antd";
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
  // console.log(Tarif, "Tarif");
  const [Ritase, setRitase] = useState("");
  const [UangJalan, setUangJalan] = useState("");
  const [viaOptions, setViaOptions] = useState([]);
  const [jenisDiskon, setJenisDiskon] = useState("");
  const [KodeID, setKodeID] = useState("");
  const [DataLeadTime, setDataTime] = useState ("");
  const [selectJenisLayanan, setSelectJenisLayanan] = useState("")
  const [PenampungLastDataNotif, setPenampungLastDataNotif] = useState({
    MitraCode:null,
    Nama_Mitra: null,
    Kota_Muat: null,
    Kota_Tujuan: null,
    Via: null,
    Jenis_Kendaraan: null,
    Jenis_Layanan: null,
    Jenis_Kiriman: null,
    Tarif : null
  })
  const [Loading, setLoading] = useState(false)
  const optjenisLayanan = [
    {
      value: 1,
      label: "Retail",
    },
    {
      value: 2,
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
      service_type: "",
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
      setLoading(false)
      httpClient
        .post("tarif/create-tarifMitra", {
          ...values,
          service_type: jenisLayanan.label,
          jenis_kiriman: jenisKiriman.label,
          tarif: Tarif,
          ritase: Ritase,
          uang_jalan: UangJalan,
        })
        .then(({ data }) => {
          notification.success({
            message: "Success",
            description: data.status.message,
          });
          setLoading(true)
          setKota("")
          setKotaTujuan("")
          setVia("")
          setJenisKendaraan("")
          setJenisKiriman("")
          setJenisLayanan("")
          setTarif(10000)
          fetchTarifAndCustomerOptions("")
        })
        .catch(function (error) {
          notification.error({
            message: "Error",
            description: error.response.data.status.message,
          });
          console.log(error.response);
        });
    },
  });

  const fetchTarifAndCustomerOptions = () => {
    return httpClient.get("tarif/get-select?idMuat=&idBogkar=&idJenisKendaraan=&service_type=Reguler")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setKodeID(data.kodeTarif);
          setCustomerOptions(
            data.customer.map((x) => ({
              label: x.Customer,
              value: x.idCustomer,
            }))
          );
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  };



  useEffect(() => {
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
      .get("tarif/get-select?idMuat=&idBogkar=&idJenisKendaraan=&service_type=Reguler")
      .then(({ data }) => {
        if (data.status.code === 200) {
          console.log('customer', data.kodeTarif);
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
      setPenampungLastDataNotif({ ...PenampungLastDataNotif, Jenis_Kendaraan: value.label });
    } else if (e.name === "id_customer") {
      formik.setFieldValue("id_customer", value.value);
      setCustomer(value);
    } else if (e.name === "id_muat_kota") {
      formik.setFieldValue("id_muat_kota", value.value);
      setPenampungLastDataNotif({ ...PenampungLastDataNotif, Kota_Muat: value.label });
      setKota(value);
    } else if (e.name === "id_tujuan_kota") {
      setKotaTujuan(value);
      setPenampungLastDataNotif({ ...PenampungLastDataNotif, Kota_Tujuan: value.label });
      formik.setFieldValue("id_tujuan_kota", value.value);
    } else if (e.name === "via") {
      setVia(value);
      formik.setFieldValue("via", value);
      setPenampungLastDataNotif({ ...PenampungLastDataNotif, Via: value.label });
    } else if (e.name === "id_mitra") {
      setIdMitra(value);
      setPenampungLastDataNotif({ ...PenampungLastDataNotif, Nama_Mitra: value.label });
      formik.setFieldValue("id_mitra", value.value);
    } else if (e.name === "tarif") {

      // setIdMitra(value);
      formik.setFieldValue("tarif", value);
    } else if (e.name === "jenis_kiriman") {
      // setIdMitra(value);
      console.log(value);
      
      formik.setFieldValue("jenis_kiriman", value);
    } else if (e.name === "ritase") {
      // setIdMitra(value);
      formik.setFieldValue("ritase", value);
    }
  };

  const toRupiah = (angka) => {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.';
    return `Rp.${rupiah.split('', rupiah.length - 1).reverse().join('')}`;
}

  return (
    <div>
      <Card>
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <h4 style={{ color: '#1A5CBF' }}>Buat Tarif Mitra Baru</h4>
            </Col>
            <Col span={3}></Col>
            <Col span={3}></Col>

          </Row>
          {Loading &&
            <Alert
              message={`Tarif Baru Berhasil Di Buat Dengan, Nama Mitra : ${PenampungLastDataNotif.Nama_Mitra} | Kota Muat : ${PenampungLastDataNotif.Kota_Muat} | Kota Tujuan : ${PenampungLastDataNotif.Kota_Tujuan} | Via : ${PenampungLastDataNotif.Via} | Jenis Kendaraan : ${PenampungLastDataNotif.Jenis_Kendaraan} | Jenis Layanan : ${PenampungLastDataNotif.Jenis_Layanan} | Jenis Kiriman : ${PenampungLastDataNotif.Jenis_Kiriman} | Tarif : ${PenampungLastDataNotif.Tarif} `}
              type="success"
              showIcon
            />
          }
          <Row style={{ marginBottom: "10px" }}>
            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: `bold` }}>Code Tarif Mitra</Form.Label>
                <Form.Control disabled value={KodeID.kodeTarifMitra} />
                {/* <InputGroup>
                  <Input
                    // options={customerOptions}
                    value={KodeID.kodeTarifMitra}
                    disabled
                  />
                </InputGroup> */}
              </Form.Group>
            </Col>
            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: `bold` }}>Nama Mitra</Form.Label>
                <InputGroup>
                  <Select
                    options={customerOptions}
                    value={IdMitra}
                    isSearchable
                    placeholder="Select Mitra"
                    name="id_mitra"
                    styles={customStylesReactSelect}
                    onChange={onSelectChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: `bold` }}>Kota Muat</Form.Label>
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
                <Form.Label style={{ fontWeight: `bold` }}>Kota Tujuan</Form.Label>
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
                <Form.Label style={{ fontWeight: `bold` }}>Via</Form.Label>
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
                <Form.Label style={{ fontWeight: `bold` }}>Jenis kendaraan </Form.Label>
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
            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: `bold` }}>Jenis Layanan</Form.Label>

                <Select
                  options={[
                    { label: "Retail", value: "Retail" },
                    { label: "Charter", value: "Charter" }
                  ]}
                  name="service_type"
                  value={jenisLayanan}
                  onChange={(e) => {
                    setJenisLayanan(e);
                    setPenampungLastDataNotif({ ...PenampungLastDataNotif, Jenis_Layanan: e.label });
                    console.log('Updated jenisLayanan:', e.label);
                  }}
                  isInvalid={!!formik.errors.service_type}
                  styles={customStylesReactSelect}
                />

                {/* <Select
                  options={[
                    { label: "Retail", value: "Retail" },
                    { label: "Charter", value: "Charter" }
                  ]}
                  name="another_field"
                  value={selectJenisLayanan}
                  onChange={(e) => {
                    setSelectJenisLayanan(e);
                    console.log('Updated selectJenisLayanan:', e);
                  }}
                  styles={customStylesReactSelect}
                /> */}
              </Form.Group>
            </Col>

            <Col span={6}>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: `bold` }}>Jenis Kiriman</Form.Label>
                <InputGroup>
                  <Select
                    options={optjenisKiriman}
                    name="jenis_kiriman"
                    value={jenisKiriman}
                    onChange={(e) => {setJenisKiriman(e)
                      setPenampungLastDataNotif({ ...PenampungLastDataNotif, Jenis_Kiriman: e.label });
                    }}
                    isInvalid={!!formik.errors.jenis_kiriman}
                    styles={customStylesReactSelect}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <hr />

          <h4 style={{ color: '#1A5CBF' }}>
            Biaya Penanganan
          </h4>
          <Row className="mt-4">
             <Col span={6} >
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: `bold` }}>Lead Time</Form.Label>
                <InputGroup>
                  <Form.Control
                    // name="tarif"
                    type="number"
                    // value={Tarif}
                    // onChange={(e) => setTarif(e.target.value)}
                    // isInvalid={!!formik.errors.tarif}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={6} >
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label style={{ fontWeight: `bold` }}>Tarif</Form.Label>
                <InputGroup>
                  <Form.Control
                    // name="tarif"
                    type="number"
                    value={(Tarif)}
                    onChange={(e) => {
                      setTarif(e.target.value);
                      setPenampungLastDataNotif({ ...PenampungLastDataNotif, Tarif: toRupiah(e.target.value) });
                    }}
                    isInvalid={!!formik.errors.tarif}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
           
            {/* <Col span={6}>
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
            </Col> */}
          </Row>
        </Form>
        <Col span={24} className="d-flex justify-content-end">
          <Button onClick={formik.handleSubmit} >Simpan Tarif</Button>
        </Col>
      </Card>
    </div>
  );
};

export default SamplePage;
