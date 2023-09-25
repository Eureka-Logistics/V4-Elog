import React, { useEffect, useState } from "react";
import { Card, DatePicker, Input, Row, Col, notification, Select } from "antd";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { httpClient } from "../../../../Api/Api";
import { InputGroup, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { number } from "prop-types";
import CreateMitraModal from "../../../MasterData/Purchasing/MasterMitra/CreateMitraModal";
import axios from "axios";
import Baseurl from "../../../../Api/BaseUrl";
import moment from "moment";
import DataBaru from "./Databaru";
import useBanksStore from "../../../../zustand/Store/NamaNamaBank";

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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [datanyaPT, setDatanyaPT] = useState("");
  const [isiValues, setIsiValues] = useState("");
  const [DataOptions, setDataOptions] = useState("");
  const { banks } = useBanksStore();
  const [DataSelect, setDataSelect] = useState("");
  const [DataWilayah, setDataWilayah] = useState("");
  const [KodeProvinsi, setKodeProvinsi] = useState(1);
  const [KodeKota, setKodeKota] = useState([]);
  const [SelectNPWP, setSelectNPWP] = useState("");
  const [IDProvinsiNPWP, setIDProvinsiNPWP] = useState(1);
  const [IDKecamatanNPWP, setIDKecamatanNPWP] = useState("");
  const [IDKotaNPWP, setIDKotaNPWP] = useState("");
  const [PicID, setPicID] = useState("");
  const [DataPIC, setDataPIC] = useState("");
  const [DataJenisKiriman, setDataJenisKiriman] = useState("");

  const formik = useFormik({
    initialValues: {
      kode: "",
      title: "",
      nama_mitra: "",
      pic_id: PicID,
      jenis: "",
      jenis_usaha: "",
      kepemilikan: "",
      jumlah_armada: "",
      jumlah_sdm_operasional: "",
      cabang: "",
      jenis_kiriman: DataJenisKiriman,
      wilayah: KodeProvinsi,
      tujuan: KodeKota,
      kontrak: "",
      awal_kontrak: "",
      akhir_kontrak: "",
      direktur: "",
      tahun_berdiri: "",
      npwp_id: "",
      npwp_name: "",
      npwp_address: "",
      npwp_jalan: "",
      npwp_blok: "",
      npwp_nomor: "",
      npwp_rt: "",
      npwp_rw: "",
      npwp_kelurahan: "",
      npwp_kecamatan: "",
      npwp_kota: IDKotaNPWP,
      npwp_provinsi: IDProvinsiNPWP,
      npwp_kodepos: "",
      is_taxable: "",
      telepon: "",
      contact_person: "",
      telp: "",
      fax: "",
      email: "",
      alamat: "",
      homepage: "",
      pembayaran: "",
      nama_bank: "",
      nama_akun: "",
      no_rek: "",
      status_usaha: "",
      metode_pembayaran: "",
      type: "",
      memo: "",
      po_legalitas: "",
      ktp_legalitas: "",
      akta_pendirian: "",
      akta_perubahan_dasar: "",
      akta_susunan_direksi: "",
      surat_domisili: "",
      npwp_legalitas: "",
      skt_legalitas: "",
      nppkp_legalitas: "",
      siup_legalitas: "",
      ijin_pendirian: "",
      ppmd_legalitas: "",
      ijin_usaha: "",
      tdp_legalitas: "",
      surat_kuasa: "",
      lama_bekerja: 0,
      jenis_kartu_kredit: "",
      bank_penerbit: "",
      laporan_keuangan: "",
      status_usaha: "",
      lama_usaha: 0,
      omset_bulanan: 0,
      asset_tanah: "",
      asset_bangunan: "",
      asset_kendaraan: "",
      asset_mesin: "",
      affiliasi: "",
      jumlah_unit: "",
      periode_sewa: "",
      nilai_sewa: 0,
      nilai_ruu: "",

      metode_pembayaran: "",
      qty_motor: 0,
      rp_motor: 0,
      qty_grandmax: 0,
      rp_grandmax: 0,
      qty_l300: 0,
      rp_l300: 0,
      qty_traga: 0,
      rp_traga: 0,
      qty_cde: 0,
      rp_cde: 0,
      qty_cdd: 0,
      rp_cdd: 0,
      qty_fuso: 0,
      rp_fuso: 0,
      qty_wingbox: 0,
      rp_wingbox: 0,
      qty_trailer20: 0,
      rp_trailer20: 0,
      qty_trailer40: 0,
      rp_trailer40: 0,
      top: "",
    },
    validationSchema: Yup.object({
      nama_perusahaan: Yup.string().max(30, "Must be 30 characters or less"),
    }),
    onSubmit: (values) => {
      console.log(`values dari sini`, values);
      setIsiValues(values);

      httpClient
        .post("mitra/create-mitra", {
          ...values,
          npwp_address:
            formik.values.npwp_jalan !== ""
              ? "Jalan" +
                " " +
                formik.values.npwp_jalan +
                ", Provinsi" +
                " " +
                formik.values.npwp_provinsi +
                " " +
                ", " +
                " " +
                formik.values.npwp_kota +
                " " +
                ", Kecamatan" +
                " " +
                formik.values.npwp_kecamatan +
                " " +
                ", Kelurahan" +
                " " +
                formik.values.npwp_kelurahan +
                " " +
                ", Blok" +
                " " +
                formik.values.npwp_blok +
                " " +
                ", Nomor" +
                " " +
                formik.values.npwp_nomor +
                " " +
                ", RT" +
                " " +
                formik.values.npwp_rt +
                " " +
                ", RW" +
                " " +
                formik.values.npwp_rw +
                " " +
                ", Kode POS : " +
                " " +
                formik.values.npwp_kodepos
              : " ",
        })
        .then(({ data }) => {
          notification.success({
            message: "Success",
            description: data.message,
          });
          setTimeout(() => router.push("/mastermitra"), 1000);
        })
        .catch(function (error) {
          if (
            error.response.data.errors &&
            Array.isArray(error.response.data.errors)
          ) {
            error.response.data.errors.forEach((errorItem) => {
              notification.error({
                message: "Error",
                description: errorItem.message,
              });
            });
          } else if (
            error.response &&
            error.response.data &&
            error.response.data.status &&
            error.response.data.status.message
          ) {
            notification.error({
              message: "Error",
              description: error.response.data.status.message,
            });
          } else {
            console.log("No matching conditions.");
          }
          console.log(error.message);
        });
    },
  });

  const url = window.location.href;
  const idMpFix = url.substring(url.lastIndexOf("/") + 1);

  const OptionsData = async () => {
    const data = await axios.get(
      `${Baseurl}mitra/get-select-mitraPic`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    console.log(data.data, "ini data options");
    setDataOptions(data.data);
  };

  const GetSelectMitra = async () => {
    const data = await axios.get(
      `${Baseurl}mitra/get-select-mitra`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    console.log(data.data, "ini data select");
    setDataSelect(data.data);
  };

  const GetSelectWilayah = async () => {
    const data = await axios.get(
      `${Baseurl}customer/get-select-create-address?idProv=${KodeProvinsi}&idKota=${KodeProvinsi}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    console.log(data.data, "ini data wilayah");
    setDataWilayah(data.data);
  };

  const GetSelectNPWP = async () => {
    const data = await axios.get(
      `${Baseurl}customer/get-select-create-address?idProv=${IDProvinsiNPWP}&idKota=${IDKotaNPWP}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    console.log(data.data, "ini data wilayah");
    setSelectNPWP(data.data);
  };

  useEffect(() => {
    OptionsData();
    GetSelectMitra();
    GetSelectWilayah();
    GetSelectNPWP();
  }, [KodeProvinsi, IDProvinsiNPWP, IDKotaNPWP]);

  const formatNpwp = (value) => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/[^\d]/g, "");

    // Divide into sections
    const section1 = numericValue.substr(0, 2);
    const section2 = numericValue.substr(2, 3);
    const section3 = numericValue.substr(5, 3);
    const section4 = numericValue.substr(8, 1);
    const section5 = numericValue.substr(9, 3);
    const section6 = numericValue.substr(12, 3);

    // Build formatted NPWP with conditional dots
    let formattedNpwp = section1;
    if (section2) formattedNpwp += `.${section2}`;
    if (section3) formattedNpwp += `.${section3}`;
    if (section4) formattedNpwp += `-${section4}`;
    if (section5) formattedNpwp += `.${section5}`;
    if (section6) formattedNpwp += `.${section6}`;

    return formattedNpwp;
  };
  const handleNpwpChange = (event) => {
    const formattedValue = formatNpwp(event.target.value);
    formik.handleChange({
      target: {
        name: "npwp_id",
        value: formattedValue,
      },
    });
  };

  function capitalizeWords(input) {
    const words = input.split(" ");
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return capitalizedWords.join(" ");
  }

  const jenisKirimanOptions = [
    { label: "RETAIL", value: "RETAIL" },
    { label: "CHARTER", value: "CHARTER" },
    { label: "FCL", value: "FCL" },
    { label: "LCL", value: "LCL" },
  ];

  const options = [
    {
      value: "RETAIL",
    },
    {
      value: "CHARTER",
    },
    {
      value: "FCL",
    },
    {
      value: "LCL",
    },
  ];

  // const { label, value, closable, onClose } = props;
  // const onPreventMouseDown = (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  // };

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Col span={24} className="d-flex justify-content-end">
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
        </Col>

        <h5 style={{ color: "#1A5CBF" }}>
          NAMA DAN ALAMAT PERUSAHAAN(Sold to Party )
        </h5>

        <hr />
        <Row>
          <Col span={4}>
            <Form.Group style={{ marginBottom: "10px" }}>
              <Form.Label style={{ fontWeight: "bold" }}>
                Kode Mitra :
              </Form.Label>
              <InputGroup>
                <Form.Control
                  disabled
                  name="kode_mitra"
                  value={formik.values.kode_mitra}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.kode_mitra}
                  placeholder="Automatic Input"
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col span={4}>
            <div style={{ marginBottom: "10px" }}>
              <label
                style={{
                  fontWeight: "bold",
                  display: "block",
                  color: "black",
                  fontFamily: "NoirPro",
                }}
              >
                Title:
              </label>
              <Select
                showSearch
                className="mt-2"
                value={formik.values.title}
                style={{ width: "100%" }}
                onChange={(e) => {
                  console.log(e);
                  formik.setFieldValue("title", e);
                }}
              >
                <option value="CV">CV</option>
                <option value="PT">PT</option>
                <option value="KOPERASI">KOPERASI</option>
                <option value="PD">PD</option>
                <option value="UD">UD</option>
                <option value="YAYASAN">YAYASAN</option>
                <option value="LEMBAGA">LEMBAGA</option>
                <option value="KPPA">KPPA</option>
                <option value="Rep Office">Rep Office</option>
                <option value="Mr.">Mr. </option>
                <option value="Mrs.">Mrs. </option>
                <option value="Miss.">Miss. </option>
              </Select>
              {/* <Select
                  name="title"
                  style={{ width: "100%", marginTop: "10px" }}
                  onChange={(value) => {
                    formik.setFieldValue("title", value);
                  }}
                >
                  {DataOptions &&
                    DataOptions.jabatan.map((i) => (
                      <option key={i.jabatan} value={i.jabatan}>
                        {i.jabatan}
                      </option>
                    ))}
                </Select>
                {formik.errors.title && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {formik.errors.title}
                  </div>
                )} */}
            </div>
          </Col>
          <Col span={8}>
            <Form.Group style={{ marginBottom: "10px" }}>
              <Form.Label style={{ fontWeight: "bold" }}>
                Nama Mitra :
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: EUREKA LOGISTICS (EL)"
                  name="nama_mitra"
                  value={formik.values.nama_mitra}
                  onChange={(e) => {
                    // Mengubah teks ke huruf kapital dan kemudian memperbarui nilai di formik
                    formik.handleChange(e);
                    formik.setFieldValue(
                      "nama_mitra",
                      e.target.value.toUpperCase()
                    );
                  }}
                  isInvalid={!!formik.errors.nama_mitra}
                  style={{ textTransform: "uppercase" }} // Mengatur text-transform menjadi uppercase
                />
              </InputGroup>
            </Form.Group>
          </Col>

          <Col span={8}>
            <Form.Group style={{ marginBottom: "10px" }}>
              <Form.Label style={{ fontWeight: "bold" }}>
                Kode Perusahaan (Singkatan Nama Mitras) :
              </Form.Label>
              <InputGroup>
                <Form.Control
                  name="kode"
                  placeholder="Exp: EL"
                  value={formik.values.kode}
                  onChange={(e) => {
                    // Mengubah teks ke huruf kapital dan kemudian memperbarui nilai di formik
                    formik.handleChange(e);
                    formik.setFieldValue("kode", e.target.value.toUpperCase());
                  }}
                  isInvalid={!!formik.errors.kode}
                  style={{ textTransform: "uppercase" }} // Mengatur text-transform menjadi uppercase
                  maxLength={3} // Menambahkan maxLength untuk membatasi panjang input menjadi 3 huruf
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm={8}>
            <Form.Group style={{ marginBottom: "10px" }}>
              <Form.Label style={{ fontWeight: "bold" }}>
                Jenis Usaha :
              </Form.Label>
              <InputGroup>
                <Form.Control
                  name="jenis_usaha"
                  placeholder="Exp: EXPRESS DAN LOGISTIK"
                  value={formik.values.jenis_usaha}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const formattedInput = capitalizeWords(inputValue);

                    // Memperbarui nilai di formik
                    formik.setFieldValue("jenis_usaha", formattedInput);
                  }}
                  isInvalid={!!formik.errors.jenis_usaha}
                />
              </InputGroup>
            </Form.Group>
          </Col>

          <Col sm={8}>
            <Form.Group style={{ marginBottom: "10px" }}>
              <Form.Label style={{ fontWeight: "bold" }}>
                Jenis Kepemilikan :
              </Form.Label>
              <Select
                value={formik.values.kepemilikan}
                placeholder="Pilih Jenis Kepemilikan"
                style={{ width: "100%" }}
                onChange={(e) => {
                  console.log(e);
                  formik.setFieldValue("kepemilikan", e);
                }}
              >
                <option value="SWASTA NASIONAL">SWASTA NASIONAL</option>
                <option value="SWASTA ASING">SWASTA ASING</option>
                <option value="BUMN">BUMN</option>
                <option value="BUMD">BUMD</option>
                <option value="JOIN OPERATION">JOIN OPERATION</option>
                <option value="KSO">KSO</option>
                <option value="PERSEORANGAN">PERSEORANGAN</option>
              </Select>
              {/* <InputGroup>
                  <Form.Control
                    name="kepemilikan"
                    value={formik.values.kepemilikan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.kepemilikan}
                  />
                </InputGroup> */}
            </Form.Group>
          </Col>
          <Col sm={8}>
            <Form.Group style={{ marginBottom: "10px" }}>
              <Form.Label style={{ fontWeight: "bold" }}>
                Home Page (Website):
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: https://www.puninar.com/"
                  name="homepage"
                  value={formik.values.homepage}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.homepage}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col span={8} className="mb-2">
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                PIC Purchasing :
              </Form.Label>
              <Select
                showSearch
                optionFilterProp="value"
                name="pic_id"
                style={{ width: "100%", marginTop: "10px" }}
                onChange={(value, e) => {
                  formik.setFieldValue("pic_id", e.key);
                  console.log(e.key);
                  console.log(e.value);
                  setPicID(e.key);
                  setDataPIC(e.value);
                }}
              >
                {DataSelect &&
                  DataSelect.marketing.map((i) => (
                    <option key={i.id} value={i.fullname}>
                      {i.fullname}
                    </option>
                  ))}
              </Select>
              {/* <InputGroup>
                  <Form.Control
                    name="pic_id"
                    value={formik.values.pic_id}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pic_id}
                  />
                </InputGroup> */}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Alamat :</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: Jl Cakung Cilincing KM 1.5, Cakung Barat, Jakarta Timur"
                  name="alamat"
                  style={{ height: "80px" }}
                  as="textarea"
                  value={formik.values.alamat}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const formattedInput = capitalizeWords(inputValue);

                    // Memperbarui nilai di formik
                    formik.setFieldValue("alamat", formattedInput);
                  }}
                  isInvalid={!!formik.errors.alamat}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Direktur :</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: Raja D.M Hutauruk"
                  name="direktur"
                  value={formik.values.direktur}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const formattedInput = capitalizeWords(inputValue);

                    // Memperbarui nilai di formik
                    formik.setFieldValue("direktur", formattedInput);
                  }}
                  isInvalid={!!formik.errors.direktur}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group style={{ marginBottom: "10px" }}>
              <Form.Label style={{ fontWeight: "bold" }}>
                Jumlah Armada :
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: 680"
                  name="jumlah_armada"
                  value={formik.values.jumlah_armada}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.jumlah_armada}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Jumlah SDM Operasional :{" "}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: 538"
                  name="jumlah_sdm_operasional"
                  value={formik.values.jumlah_sdm_operasional}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.jumlah_sdm_operasional}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Cabang : </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: Jakarta"
                  name="cabang"
                  value={formik.values.cabang}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const formattedInput = capitalizeWords(inputValue);

                    // Memperbarui nilai di formik
                    formik.setFieldValue("cabang", formattedInput);
                  }}
                  isInvalid={!!formik.errors.cabang}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Jenis Kiriman :
              </Form.Label>
              {/* <Select
                mode="multiple"
                name="jenis_kiriman"
                placeholder="Pilih Jenis Kiriman"
                style={{
                  width: "100%",
                }}
                options={options}
                onChange={(e) => {
                  console.log(e);
                  setDataJenisKiriman(e);
                }}
              /> */}
              <Select
                style={{ width: "100%" }}
                name="jenis_kiriman"
                placeholder="Pilih Jenis Kiriman"
                mode="multiple"
                onChange={(selectedValues) => {
                  
                  const nonEmptyValues = selectedValues.filter(
                    (value) => value !== ""
                  );

                 
                  if (nonEmptyValues.length > 0) {
                    const formattedValue = nonEmptyValues
                      .map((value) => value.toString())
                      .join(",");
                    formik.setFieldValue("jenis_kiriman", formattedValue);
                  } else {
                   
                    formik.setFieldValue("jenis_kiriman", "");
                  }

                  console.log(selectedValues);
                }}
              >
                {jenisKirimanOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label type="number" style={{ fontWeight: "bold" }}>
                Jenis Mitra:{" "}
              </Form.Label>
              <Select
                value={formik.values.jenis}
                style={{ width: "100%" }}
                onChange={(e) => {
                  console.log(e);
                  formik.setFieldValue("jenis", e);
                }}
              >
                <option value="Vendor Darat">Vendor Darat</option>
                <option value="Vendor Laut">Vendor Laut</option>
                <option value="Vendor Udara">Vendor Udara</option>
                <option value="Vendor Darat dan Laut">
                  Vendor Darat dan Laut
                </option>
                <option value="Vendor Darat dan Udara">
                  Vendor Darat dan Udara
                </option>
                <option value="Vendor Kirim Mobil">Vendor Kirim Mobil</option>
                <option value="Vendor Internasional">
                  Vendor Internasional
                </option>
                <option value="Vendor Dokumney dan Paket">
                  Vendor Dokumney dan Paket
                </option>
              </Select>
              {/* <InputGroup>
                  <Form.Control
                    name="jenis"
                    value={formik.values.jenis}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.jenis}
                  />
                </InputGroup> */}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Wilayah (Operasional):
              </Form.Label>
              <Select
                showSearch // Aktifkan fitur pencarian
                placeholder="Silahkan Pilih Wilayah"
                name="wilayah"
                style={{ width: "100%" }}
                onChange={(value, e, options) => {
                  formik.setFieldValue("wilayah", value);
                  setKodeProvinsi(e.key);
                  console.log(e.key);
                }}
                filterOption={(inputValue, option) =>
                  option.props.children
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
                }
              >
                {DataWilayah &&
                  DataWilayah.provinsi.map((i) => (
                    <option key={i.id} value={i.provName}>
                      {i.provName}
                    </option>
                  ))}
              </Select>
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Tujuan :</Form.Label>
              <Select
                mode="multiple"
                placeholder="Silahkan Pilih Tujuan"
                name="tujuan"
                style={{ width: "100%" }}
                onChange={(value, e) => {
                  // Mengubah value menjadi string dengan koma sebagai pemisah
                  const formattedValue = value.join(",");
                  formik.setFieldValue("tujuan", formattedValue);

                  // Mengambil key dari elemen pertama dalam array e
                  if (e.length > 0) {
                    setKodeKota(e[0].key);
                    console.log(e[0].key);
                  }
                }}
              >
                {DataWilayah &&
                  DataWilayah.kota.map((i) => (
                    <option key={i.id} value={i.kotaName}>
                      {i.kotaName}
                    </option>
                  ))}
              </Select>
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Tahun Berdiri :{" "}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: 2019"
                  name="tahun_berdiri"
                  value={formik.values.tahun_berdiri}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.tahun_berdiri}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Awal Kontrak :
              </Form.Label>
              {/* <InputGroup>
                  <Form.Control
                    name="awal_kontrak"
                    value={formik.values.awal_kontrak}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.awal_kontrak}
                  />

                </InputGroup> */}

              {/* <DatePicker
                placeholder="Tanggal Berapa"
                required
                format={"DD-MM-YYYY"}
                style={{ width: "100%" }}
                onChange={(date) =>
                  handlechangeAmbilBensin(
                    "TanggalBerapa",
                    date && date.format("DD-MM-YYYY"),
                    formik.setFieldValue("awal_kontrak", date)

                  )
                }
              ></DatePicker> */}
              <DatePicker
                style={{ width: "100%" }}
                value={
                  formik.values.awal_kontrak
                    ? moment(formik.values.awal_kontrak, "DD-MM-YYYY")
                    : null
                }
                format="DD-MM-YYYY" // Format "tanggal bulan tahun"
                onChange={(date) => {
                  formik.setFieldValue("awal_kontrak", date);
                }}
              />
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Akhir Kontrak :
              </Form.Label>
              {/* <InputGroup>
                  <Form.Control
                    name="akhir_kontrak"
                    value={formik.values.akhir_kontrak}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.akhir_kontrak}
                  />
                </InputGroup> */}
              <DatePicker
                style={{ width: "100%" }}
                value={
                  formik.values.akhir_kontrak
                    ? moment(formik.values.akhir_kontrak, "DD-MM-YYYY")
                    : null
                }
                format="DD-MM-YYYY" // Format "tanggal bulan tahun"
                onChange={(date, dateString) => {
                  formik.setFieldValue("akhir_kontrak", dateString);
                }}
              />
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Tahun Register :
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: 2023"
                  type="number"
                  name="tahun_awal_kontrak"
                  value={formik.values.tahun_awal_kontrak}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.tahun_awal_kontrak}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col span={8}>
            <Form.Group>
              <Form.Label type="number" style={{ fontWeight: "bold" }}>
                Telp. Kantor:{" "}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: (021) 460-2278"
                  name="telepon"
                  value={formik.values.telepon}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.telepon}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label type="number" style={{ fontWeight: "bold" }}>
                Fax. Kantor:{" "}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: (021) 460-2278"
                  name="fax"
                  value={formik.values.fax}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.fax}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Kontrak <i>(Tahun)</i> :
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: 2"
                  type="number"
                  name="kontrak"
                  value={formik.values.kontrak}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.kontrak}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col span={24}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Memo :</Form.Label>
              <InputGroup>
                <Form.Control
                  style={{ height: "150px", overflowWrap: "break-word" }}
                  placeholder="Inputkan Memo jika diperlukan"
                  as="textarea"
                  name="memo"
                  value={formik.values.memo}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.memo}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <br />
        <hr />
        <h5 style={{ color: "#1A5CBF" }}>Data Perpajakan (Tax Information)</h5>
        <hr />
        <Row>
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>No. NPWP :</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: 01.300.326.4-046.000"
                  type="text"
                  name="npwp_id"
                  value={formik.values.npwp_id}
                  onChange={handleNpwpChange}
                  isInvalid={!!formik.errors.npwp_id}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.npwp_id}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Status Usaha :{" "}
              </Form.Label>
              <Select
                value={formik.values.status_usaha}
                style={{ width: "100%" }}
                onChange={(e) => {
                  console.log(e);
                  formik.setFieldValue("status_usaha", e);
                }}
              >
                <option value="PKP">PKP</option>
                <option value="NON PKP">NON PKP</option>
              </Select>
              {/* <InputGroup>
                  <Form.Control
                    name="status_usaha"
                    value={formik.values.status_usaha}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.status_usaha}
                  />
                </InputGroup> */}
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                NPWP Name :{" "}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: PT. NOO Logistics"
                  name="npwp_name"
                  value={formik.values.npwp_name}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.npwp_name}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Jalan : </Form.Label>
              <InputGroup>
                <Form.Control
                  name="npwp_jalan"
                  placeholder="Nama Jalan"
                  value={formik.values.npwp_jalan}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const formattedInput = capitalizeWords(inputValue);

                    // Memperbarui nilai di formik
                    formik.setFieldValue("npwp_jalan", formattedInput);
                  }}
                  isInvalid={!!formik.errors.npwp_jalan}
                />
              </InputGroup>
              {/* <InputGroup>
                <Form.Control
                  placeholder="Nama Jalan"
                  name="npwp_jalan"
                  value={formik.values.npwp_jalan}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.npwp_jalan}
                />
              </InputGroup> */}
            </Form.Group>
          </Col>
          <Col span={4}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Provinsi :{" "}
              </Form.Label>
              <Select
                showSearch
                // mode="multiple"
                placeholder="Pilih Provinsi"
                name="npwp_provinsi"
                style={{ width: "100%" }}
                onChange={(value, e, options) => {
                  formik.setFieldValue("npwp_provinsi", value);
                  setIDProvinsiNPWP(e.key);
                  console.log(e.key);
                }}
              >
                {SelectNPWP &&
                  SelectNPWP.provinsi.map((i) => (
                    <option key={i.id} value={i.provName}>
                      {i.provName}
                    </option>
                  ))}
              </Select>
              {/* <InputGroup>
                <Form.Control
                  placeholder="Nama Provinsi"
                  name="npwp_provinsi"
                  value={formik.values.npwp_provinsi}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.npwp_provinsi}
                />
              </InputGroup> */}
            </Form.Group>
          </Col>
          <Col span={4}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Kota : </Form.Label>
              <Select
                showSearch
                // mode="multiple"
                placeholder="Pilih Kota"
                name="npwp_kota"
                style={{ width: "100%" }}
                onChange={(value, e, options) => {
                  formik.setFieldValue("npwp_kota", value);
                  setIDKotaNPWP(e.key);
                  console.log(e.key);
                }}
              >
                {SelectNPWP &&
                  SelectNPWP.kota.map((i) => (
                    <option key={i.id} value={i.kotaName}>
                      {i.kotaName}
                    </option>
                  ))}
              </Select>
              {/* <InputGroup>
                <Form.Control
                  placeholder="Nama Kota"
                  name="npwp_kota"
                  value={formik.values.npwp_kota}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.npwp_kota}
                />
              </InputGroup> */}
            </Form.Group>
          </Col>
          <Col span={4}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Kecamatan :{" "}
              </Form.Label>

              <InputGroup>
                <Form.Control
                  placeholder="Nama Kecamatan"
                  name="npwp_kecamatan"
                  value={formik.values.npwp_kecamatan}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.npwp_kecamatan}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col span={4}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Kelurahan :{" "}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Nama Kelurahan"
                  name="npwp_kelurahan"
                  value={formik.values.npwp_kelurahan}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.npwp_kelurahan}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col span={4}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Blok :</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Blok"
                  name="npwp_blok"
                  value={formik.values.npwp_blok}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.npwp_blok}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col span={4}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Nomor :</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Nomor"
                  type="number"
                  name="npwp_nomor"
                  value={formik.values.npwp_nomor}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.npwp_nomor}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col span={4}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>RT : </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="RT"
                  type="number"
                  name="npwp_rt"
                  value={formik.values.npwp_rt}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.npwp_rt}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col span={4}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>RW : </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="RW"
                  type="number"
                  name="npwp_rw"
                  value={formik.values.npwp_rw}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.npwp_rw}
                />
              </InputGroup>
            </Form.Group>
          </Col>

          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Kode POS :{" "}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Kode Pos"
                  type="number"
                  name="npwp_kodepos"
                  value={formik.values.npwp_kodepos}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.npwp_kodepos}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col span={24}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Alamat NPWP :{" "}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Automatic Input"
                  style={{ height: "100px", overflowWrap: "break-word" }}
                  name="npwp_address"
                  as="textarea"
                  disabled
                  // value={formik.values.npwp_address}
                  // value={
                  //   formik.values.npwp_jalan +
                  //   (formik.values.npwp_kota ? "Kota" + formik.values.npwp_kota : "")
                  // }
                  value={
                    formik.values.npwp_jalan !== ""
                      ? "Jalan" +
                        " " +
                        formik.values.npwp_jalan +
                        ", Provinsi" +
                        " " +
                        formik.values.npwp_provinsi +
                        " " +
                        "," +
                        " " +
                        formik.values.npwp_kota +
                        " " +
                        ", Kecamatan" + 
                        " " +
                        formik.values.npwp_kecamatan +
                        " " +
                        ", Kelurahan" +
                        " " +
                        formik.values.npwp_kelurahan +
                        " " +
                        ", Blok" +
                        " " +
                        formik.values.npwp_blok +
                        " " +
                        ", Nomor" +
                        " " +
                        formik.values.npwp_nomor +
                        " " +
                        ", RT" +
                        " " +
                        formik.values.npwp_rt +
                        " " +
                        ", RW" +
                        " " +
                        formik.values.npwp_rw +
                        " " +
                        ", Kode POS : " +
                        " " +
                        formik.values.npwp_kodepos
                      : " "
                  }
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.npwp_address}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <br />
        <hr />
        <h5 style={{ color: "#1A5CBF" }}>
          DATA ACCOUNTING (Accounting Information)
        </h5>
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
                onChange={(e) => {
                  console.log(e);
                  formik.setFieldValue("nama_bank", e);
                }}
                showSearch
                optionFilterProp="children"

                // value={NamaBank}
                // onChange={(e) => {
                //   console.log(e);
                //   setDataNamaBank(e);
                // }}
              >
                {banks &&
                  banks.map((i) => <select value={i.name}>{i.name}</select>)}
              </Select>
            </Form.Group>
          </Col>
          {/* <Col span={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>Bank : </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="nama_bank"
                    value={formik.values.nama_bank}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nama_bank}
                  />
                </InputGroup>
              </Form.Group>
            </Col> */}
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Account Name :{" "}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: BANK MANDIRI"
                  name="nama_akun"
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
                Account Number :{" "}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: 156-000-484-7499"
                  type="number"
                  name="no_rek"
                  value={formik.values.no_rek}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.no_rek}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <br />
        <hr />
        <Row>
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Currency :{" "}
              </Form.Label>
              <Select
                value={formik.values.currency}
                style={{ width: "100%" }}
                onChange={(e) => {
                  console.log(e);
                  formik.setFieldValue("currency", e);
                }}
              >
                <option value="Rupiah (RP.)">Rupiah (Rp)</option>
              </Select>
              {/* <InputGroup>
                  <Form.Control
                  placeholder="Select "
                    name="currency"
                    value={formik.values.currency}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.currency}
                  />
                </InputGroup> */}
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Term of payment (Hari):{" "}
              </Form.Label>
              <Select
                value={formik.values.pembayaran}
                style={{ width: "100%" }}
                onChange={(e) => {
                  console.log(e);
                  formik.setFieldValue("pembayaran", e);
                }}
              >
                <option value={0}>0</option>
                <option value={7}>7</option>
                <option value={14}>14</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
              </Select>
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Type Of Payment :{" "}
              </Form.Label>
              {/* <InputGroup>
                  <Form.Control
                    name="pembayaran"
                    value={formik.values.pembayaran}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.pembayaran}
                  />

                </InputGroup> */}
              <Select
                name="metode_pembayaran"
                style={{ width: "100%" }}
                onChange={(value) => {
                  formik.setFieldValue("metode_pembayaran", value);
                }}
              >
                {DataSelect &&
                  DataSelect.jenisPembayaran.map((i) => (
                    <option key={i.name} value={i.value}>
                      {i.value}
                    </option>
                  ))}
              </Select>
              {/* <Select
                  value={formik.values.metode_pembayaran}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    console.log(e);
                    formik.setFieldValue("metode_pembayaran", e);
                  }}
                >
                  <option value={"DP"}>DP</option>
                  <option value={"CASH"}>CASH</option>
                  <option value={"CHECK"}>CHECK</option>
                  <option value={"TRANSFER"}>TRANSFER</option>
                  <option value={"CREDIT CARD"}>CREDIT CARD</option>
                </Select> */}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Contact Person :{" "}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: Januar S."
                  name="contact_person"
                  value={formik.values.contact_person}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.contact_person}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Email : </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: elief.pratama@puninar.com"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.email}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col span={8}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Telp : </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Exp: +62345798xxx"
                  name="telp"
                  value={formik.values.telp}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.telp}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="mt-2">
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Tipe : </Form.Label>
              <Select
                style={{ width: "100%" }}
                onChange={(label) => {
                  formik.setFieldValue("type", label);
                }}
              >
                <option value={"elogs"}>ELOGS</option>
                <option value={"race"}>RACE</option>
                <option value={"masdis"}>MASDIS</option>
                <option value={"katarasa"}>KATARASA</option>
                <option value={"jaja"}>JAJA</option>
              </Select>
            </Form.Group>
          </Col>
          <Col span={8} className="mt-2">
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Jumlah Unit :
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  name="jumlah_unit"
                  value={formik.values.jumlah_unit}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.jumlah_unit}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        {/* DATA REFERENSI */}

        <hr />
        <h5>
          DATA REFERENSI PELANGGAN <i>(Customer Reference Data)</i>
        </h5>
        <hr />
        <>
          <Row>
            <Col span={3} className="mt-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Purchace Order{" "}
                </Form.Label>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Select
                style={{ width: "100%" }}
                onChange={(label) => {
                  formik.setFieldValue("po_legalitas", label);
                }}
              >
                <option value={"ADA"}>ADA</option>
                <option value={"TIDAK"}>TIDAK</option>
              </Select>
            </Col>
            <Col span={3} className="mt-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  {" "}
                  NPPKP / SPPKP{" "}
                </Form.Label>
              </Form.Group>
            </Col>
            <Col span={10} className="mt-2">
              <Select
                style={{ width: "100%" }}
                onChange={(label) => {
                  formik.setFieldValue("nppkp_legalitas", label);
                }}
              >
                <option value={"ADA"}>ADA</option>
                <option value={"TIDAK"}>TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="mt-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  KTP Penandatanganan{" "}
                </Form.Label>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Select
                style={{ width: "100%" }}
                onChange={(label) => {
                  formik.setFieldValue("ktp_legalitas", label);
                }}
              >
                <option value={"ADA"}>ADA</option>
                <option value={"TIDAK"}>TIDAK</option>
              </Select>
            </Col>
            <Col span={3} className="mt-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  {" "}
                  NIB (SIUP/SIUB/SIUJK/SIUPAL){" "}
                </Form.Label>
              </Form.Group>
            </Col>
            <Col span={10} className="mt-2">
              <Select
                style={{ width: "100%" }}
                onChange={(label) => {
                  formik.setFieldValue("siup_legalitas", label);
                }}
              >
                <option value={"ADA"}>ADA</option>
                <option value={"TIDAK"}>TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="mt-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  {" "}
                  Akta Pendirian{" "}
                </Form.Label>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Select
                style={{ width: "100%" }}
                onChange={(label) => {
                  formik.setFieldValue("akta_pendirian", label);
                }}
              >
                <option value={"ADA"}>ADA</option>
                <option value={"TIDAK"}>TIDAK</option>
              </Select>
            </Col>
            <Col span={3} className="mt-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  {" "}
                  Ijin Pendirian KPPA{" "}
                </Form.Label>
              </Form.Group>
            </Col>
            <Col span={10} className="mt-2">
              <Select
                style={{ width: "100%" }}
                onChange={(label) => {
                  formik.setFieldValue("ijin_pendirian", label);
                }}
              >
                <option value={"ADA"}>ADA</option>
                <option value={"TIDAK"}>TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="mt-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  {" "}
                  Akta Perubahan Dasar Terbaru{" "}
                </Form.Label>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Select
                style={{ width: "100%" }}
                onChange={(label) => {
                  formik.setFieldValue("akta_perubahan_dasar", label);
                }}
              >
                <option value={"ADA"}>ADA</option>
                <option value={"TIDAK"}>TIDAK</option>
              </Select>
            </Col>
            <Col span={3} className="mt-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  {" "}
                  Persetujuan Penanaman Modal{" "}
                </Form.Label>
              </Form.Group>
            </Col>
            <Col span={10} className="mt-2">
              <Select
                style={{ width: "100%" }}
                onChange={(label) => {
                  formik.setFieldValue("ppmd_legalitas", label);
                }}
              >
                <option value={"ADA"}>ADA</option>
                <option value={"TIDAK"}>TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="mt-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  {" "}
                  Akta Susunan Direksi Terbaru{" "}
                </Form.Label>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Select
                style={{ width: "100%" }}
                onChange={(label) => {
                  formik.setFieldValue("akta_susunan_direksi", label);
                }}
              >
                <option value={"ADA"}>ADA</option>
                <option value={"TIDAK"}>TIDAK</option>
              </Select>
            </Col>
            <Col span={3} className="mt-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  {" "}
                  Ijin Usaha Tetap dari BPKM{" "}
                </Form.Label>
              </Form.Group>
            </Col>
            <Col span={10} className="mt-2">
              <Select
                style={{ width: "100%" }}
                onChange={(label) => {
                  formik.setFieldValue("ijin_usaha", label);
                }}
              >
                <option value={"ADA"}>ADA</option>
                <option value={"TIDAK"}>TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="mt-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  {" "}
                  Surat Domisili{" "}
                </Form.Label>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Select
                style={{ width: "100%" }}
                onChange={(label) => {
                  formik.setFieldValue("surat_domisili", label);
                }}
              >
                <option value={"ADA"}>ADA</option>
                <option value={"TIDAK"}>TIDAK</option>
              </Select>
            </Col>
            <Col span={3} className="mt-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}> TDP </Form.Label>
              </Form.Group>
            </Col>
            <Col span={10} className="mt-2">
              <Select
                style={{ width: "100%" }}
                onChange={(label) => {
                  formik.setFieldValue("tdp_legalitas", label);
                }}
              >
                <option value={"ADA"}>ADA</option>
                <option value={"TIDAK"}>TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="mt-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}> NPWP </Form.Label>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Select
                style={{ width: "100%" }}
                onChange={(label) => {
                  formik.setFieldValue("npwp_legalitas", label);
                }}
              >
                <option value={"ADA"}>ADA</option>
                <option value={"TIDAK"}>TIDAK</option>
              </Select>
            </Col>
            <Col span={3} className="mt-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  {" "}
                  Surat Kuasa{" "}
                </Form.Label>
              </Form.Group>
            </Col>
            <Col span={10} className="mt-2">
              <Select
                style={{ width: "100%" }}
                onChange={(label) => {
                  formik.setFieldValue("surat_kuasa", label);
                }}
              >
                <option value={"ADA"}>ADA</option>
                <option value={"TIDAK"}>TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="mt-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}> SKT </Form.Label>
              </Form.Group>
            </Col>
            <Col span={8} className="mt-2">
              <Select
                style={{ width: "100%" }}
                onChange={(label) => {
                  formik.setFieldValue("skt_legalitas", label);
                }}
              >
                <option value={"ADA"}>ADA</option>
                <option value={"TIDAK"}>TIDAK</option>
              </Select>
            </Col>
          </Row>
        </>

        {/* DATA KEUANGAN */}

        <hr />
        <h5>
          DATA KEUANGAN <i>(Accounting Information)</i>
        </h5>
        <hr />
        <>
          <Row className="mb-2">
            <Col span={24}>
              <h6 style={{ color: "#3d75c9" }}>A. PERORANGAN</h6>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              {" "}
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  LAMANYA BEKERJA :{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder="0"
                    name="lama_bekerja"
                    value={formik.values.lama_bekerja}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.lama_bekerja}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={8}>
              {" "}
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  JENIS KARTU KREDIT :{" "}
                </Form.Label>
                <Select
                  style={{ width: "100%" }}
                  onChange={(label) => {
                    formik.setFieldValue("jenis_kartu_kredit", label);
                  }}
                >
                  <option value={"tidak ada"}>TIDAK ADA</option>
                  <option value={"visa"}>VISA</option>
                  <option value={"master card"}>MASTER CARD</option>
                  <option value={"american standard"}>AMERICAN STANDARD</option>
                </Select>
              </Form.Group>
            </Col>
            <Col span={8}>
              {" "}
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  BANK PENERBIT :{" "}
                </Form.Label>
                <Select
                  style={{ width: "100%" }}
                  onChange={(label) => {
                    formik.setFieldValue("bank_penerbit", label);
                  }}
                >
                  <option value={"BCA"}>BCA</option>
                  <option value={"BRI"}>BRI</option>
                  <option value={"BNI"}>BNI</option>
                  <option value={"MANDIRI"}>MANDIRI</option>
                  <option value={"PERMATA"}>PERMATA</option>
                </Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="mb-2 mt-2">
              <h6 style={{ color: "#3d75c9" }}>B. BADAN USAHA</h6>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col span={6}>
              {" "}
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  LAPORAN KEUANGAN :{" "}
                </Form.Label>
                <Select
                  style={{ width: "100%" }}
                  onChange={(label) => {
                    formik.setFieldValue("laporan_keuangan", label);
                  }}
                >
                  <option value={"TIDAK"}>TIDAK</option>
                  <option value={"ADA"}>ADA</option>
                </Select>
              </Form.Group>
            </Col>
            <Col span={6}>
              {" "}
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  LAMANYA USAHANYA :{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder="0"
                    name="lama_usaha"
                    value={formik.values.lama_usaha}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.lama_usaha}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={6}>
              {" "}
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  STATUS USAHA :{" "}
                </Form.Label>
                <Select
                  style={{ width: "100%" }}
                  onChange={(label) => {
                    formik.setFieldValue("status_usaha", label);
                  }}
                >
                  <option value={"BESAR"}>BESAR</option>
                  <option value={"MENENGAH"}>MENENGAH</option>
                  <option value={"KECIL"}>KECIL</option>
                </Select>
              </Form.Group>
            </Col>
            <Col span={6}>
              {" "}
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  OMSET BULANAN :{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder="0"
                    name="omset_bulanan"
                    value={formik.values.omset_bulanan}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.omset_bulanan}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col span={6}>
              {" "}
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  ASSET TANAH :{" "}
                </Form.Label>
                <Select
                  style={{ width: "100%" }}
                  onChange={(label) => {
                    formik.setFieldValue("asset_tanah", label);
                  }}
                >
                  <option value={"MILIK SENDIRI"}>MILIK SENDIRI</option>
                  <option value={"SEWA"}>SEWA</option>
                </Select>
              </Form.Group>
            </Col>
            <Col span={6}>
              {" "}
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  ASSET BANGUNAN :{" "}
                </Form.Label>
                <Select
                  style={{ width: "100%" }}
                  onChange={(label) => {
                    formik.setFieldValue("asset_bangunan", label);
                  }}
                >
                  <option value={"MILIK SENDIRI"}>MILIK SENDIRI</option>
                  <option value={"SEWA"}>SEWA</option>
                </Select>
              </Form.Group>
            </Col>
            <Col span={6}>
              {" "}
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  ASSET KENDARAAN :{" "}
                </Form.Label>
                <Select
                  style={{ width: "100%" }}
                  onChange={(label) => {
                    formik.setFieldValue("asset_kendaraan", label);
                  }}
                >
                  <option value={"MILIK SENDIRI"}>MILIK SENDIRI</option>
                  <option value={"SEWA"}>SEWA</option>
                </Select>
              </Form.Group>
            </Col>
            <Col span={6}>
              {" "}
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  ASSET MESIN :{" "}
                </Form.Label>
                <Select
                  style={{ width: "100%" }}
                  onChange={(label) => {
                    formik.setFieldValue("asset_mesin", label);
                  }}
                >
                  <option value={"MILIK SENDIRI"}>MILIK SENDIRI</option>
                  <option value={"SEWA"}>SEWA</option>
                </Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col span={6}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  PERUSAHAAN AFFILIASI YANG PERNAH MENYEWA DI EUREKA{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="0"
                    name="affiliasi"
                    value={formik.values.affiliasi}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.affiliasi}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </>

        {/* DATA UNIT */}

        <hr />
        <h5>
          DATA UNIT (<i>Unit Data</i>)
        </h5>
        <hr />
        <>
          <Row>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  QTY MOTOR{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="qty_motor"
                    value={formik.values.qty_motor}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_motor}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  QTY GRANDMAX{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="qty_grandmax"
                    value={formik.values.qty_grandmax}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_grandmax}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  QTY L300{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    className="mt-3"
                    // placeholder="Exp: Januar S."
                    name="qty_l300"
                    value={formik.values.qty_l300}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_l300}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  QTY TRAGA{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="qty_traga"
                    value={formik.values.qty_traga}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_traga}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>QTY CDE </Form.Label>
                <InputGroup>
                  <Form.Control
                    className="mt-3"
                    // placeholder="Exp: Januar S."
                    name="qty_cde"
                    value={formik.values.qty_cde}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_cde}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>QTY CDD </Form.Label>
                <InputGroup>
                  <Form.Control
                    className="mt-3"
                    // placeholder="Exp: Januar S."
                    name="qty_cdd"
                    value={formik.values.qty_cdd}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_cdd}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>QTY CDE </Form.Label>
                <InputGroup>
                  <Form.Control
                    className="mt-3"
                    // placeholder="Exp: Januar S."
                    name="qty_cde"
                    value={formik.values.qty_cde}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_cde}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  QTY FUSO{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="qty_fuso"
                    value={formik.values.qty_fuso}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_fuso}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  QTY WINGBOX{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="qty_wingbox"
                    value={formik.values.qty_wingbox}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_wingbox}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={3}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  QTY TRAILER 20"{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    className="mt-3"
                    // placeholder="Exp: Januar S."
                    name="qty_trailer20"
                    value={formik.values.qty_trailer20}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_trailer20}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={3}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  QTY TRAILER 40"{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    className="mt-3"
                    // placeholder="Exp: Januar S."
                    name="qty_trailer40"
                    value={formik.values.qty_trailer40}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.qty_trailer40}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </>

        {/* DANA SEWA */}
        <hr />
        <h5>
          DATA SEWA (<i>Order Data</i>)
        </h5>
        <hr />
        <>
          <Row>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  BIAYA MOTOR{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="rp_motor"
                    value={formik.values.rp_motor}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_motor}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  BIAYA GRANDMAX{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="rp_grandmax"
                    value={formik.values.rp_grandmax}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_grandmax}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  BIAYA L300{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="rp_l300"
                    value={formik.values.rp_l300}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_l300}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  BIAYA TRAGA{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="rp_traga"
                    value={formik.values.rp_traga}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_traga}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  BIAYA CDE{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="rp_cde"
                    value={formik.values.rp_cde}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_cde}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  BIAYA CDD{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="rp_cdd"
                    value={formik.values.rp_cdd}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_cdd}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  BIAYA FUSO{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="rp_fuso"
                    value={formik.values.rp_fuso}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_fuso}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={2}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  BIAYA WINGBOX{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="rp_wingbox"
                    value={formik.values.rp_wingbox}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_wingbox}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={3}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  BIAYA TRAILER 20"{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="rp_trailer20"
                    value={formik.values.rp_trailer20}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_trailer20}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={3}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  BIAYA TRAILER 40"{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="rp_trailer40"
                    value={formik.values.rp_trailer40}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.rp_trailer40}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col span={6}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  NILAI RUU (%){" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="nilai_ruu"
                    value={formik.values.nilai_ruu}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nilai_ruu}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={6}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  NILAI SEWA{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="nilai_sewa"
                    value={formik.values.nilai_sewa}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.nilai_sewa}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col span={6}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  JUMLAH WAKTU PEMBAYARAN (ToP){" "}
                </Form.Label>
                <InputGroup>
                  <Select
                    value={formik.values.top}
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      console.log(e);
                      formik.setFieldValue("top", e);
                    }}
                  >
                    <option value={0}>0</option>
                    <option value={7}>7</option>
                    <option value={14}>14</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={60}>60</option>
                  </Select>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col span={6}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  METODE PEMBAYARAN{" "}
                </Form.Label>
                <InputGroup>
                  <Select
                    name="metode_pembayaran"
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      formik.setFieldValue("metode_pembayaran", value);
                    }}
                  >
                    {DataSelect &&
                      DataSelect.jenisPembayaran.map((i) => (
                        <option key={i.name} value={i.value}>
                          {i.value}
                        </option>
                      ))}
                  </Select>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col className="mt-2" span={6}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  PERIODE SEWA (BULAN/MONTH){" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    // placeholder="Exp: Januar S."
                    name="periode_sewa"
                    value={formik.values.periode_sewa}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.periode_sewa}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </>

        {/* DATA LAMA */}

        <Row>
          <Col span={24} className="justify-content-end d-flex mt-3">
            <Button type="submit">Save</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SamplePage;
