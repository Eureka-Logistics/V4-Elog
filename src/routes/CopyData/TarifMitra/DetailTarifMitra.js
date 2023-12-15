import React, { useState, useEffect } from "react";
import { Button, Card, Col, Input, Row, Select } from "antd";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import * as Yup from "yup"; // Import Yup library
import { parseDateTimeSkeleton } from "@formatjs/icu-skeleton-parser";
import { right } from "@popperjs/core";

const { Option } = Select;

function DetailTarifMitra() {
  const [DataTambah, setDataTambah] = useState("");
  const [DetailDataTarif, setDetailDataTarif] = useState("");
  const [KotaYangDiTuju, setKotaYangDiTuju] = useState("");
  const [jenisKendaraan, setJenisKendaraan] = useState("");
  const [ViaData, setDataVia] = useState("");
  const [mitraId, setmitraId] = useState("");
  const [keywordSj, setKeywordSj] = useState("");
  const [SJList, setSJList] = useState([]);
  const [formData, setFormData] = useState(null);
  const { id_price } = useParams();
  const [Kiriman, setJenisKiriman] = useState([]);
  const [viaData, setViaData] = useState("");
  //   const [ViaNih, setViaNih] = useState([]);
  const [ServiceType, setServiceType] = useState([]);
  const [tarif, setTarif] = useState(null); // State untuk menyimpan nilai tarif yang akan diubah
  const [ritase, setRitase] = useState(null); // State untuk menyimpan nilai ritase yang akan diubah
  const [uangJalan, setUangJalan] = useState(""); // State untuk menyimpan nilai uang jalan yang akan diubah
  const [customers, setCustomers] = useState(""); // State untuk menyimpan nilai uang jalan yang akan diubah
  const [discount, setDiskon] = useState(""); // State untuk menyimpan nilai uang jalan yang akan diubah
  const [TipeDiskon, setTipeDiskon] = useState(""); // State untuk menyimpan nilai uang jalan yang akan diubah
  const [BiayaJalan, setBiayaJalan] = useState(""); // State untuk menyimpan nilai uang jalan yang akan diubah
  const [BiayaLainnya, setBiayaLainnya] = useState("");
  const [MitraSelectTambah, setMitraSelectTambah] = useState("");
  const [MitraNya, setMitraNya] = useState("");
  const [DataIDMitra, setDataIDMitra] = useState("");
  const [DataIDKotaMuat, setDataIDKotaMuat] = useState("");
  const [DataIDKotaTujuan, setDataIDKotaTujuan] = useState("");
  const [IDJenisKiriman, setIDJenisKiriman] = useState("");
  const [IDJenisKendaraan, setIDJenisKendaraan] = useState("");
  const [createdData, setCreatedData] = useState("");

  const fetchData = async () => {
    try {
      const respons = await axios.get(`${Baseurl}tarif/get-select`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("response", respons.data);
      //   console.log("responssssscarismid", respons.data.data);

      setDataTambah(respons.data);
      //   setSJList(respons.data?.data?.sj);
    } catch (error) {}
  };

  const fetchSelectMitra = async () => {
    try {
      const respons = await axios.get(`${Baseurl}mitra/get-select-mitraPic`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("response mitra", respons.data.mitra);
      //   console.log("responssssscarismid", respons.data.data);

      setMitraSelectTambah(respons.data.mitra);
      //   setSJList(respons.data?.data?.sj);
    } catch (error) {}
  };

  const DetailTarifMitra = async (id_price) => {
    try {
      const respons = await axios.get(
        `${Baseurl}tarif/get-detail-tarifMitra?id_price=${id_price}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("response", respons.data.order[0]);
      setDetailDataTarif(respons.data.order[0].id_mitra);
      setDataIDMitra(respons.data.order[0].id_mitra);
      setDataIDKotaMuat(respons.data.order[0].id_muat_kota);
      setDataIDKotaTujuan(respons.data.order[0].id_tujuan_kota);
      setCustomers(respons.data.order[0].mitra);
      setmitraId(respons.data.order[0].kotaAsal);
      setKotaYangDiTuju(respons.data.order[0].kotaTujuan);
      setIDJenisKiriman(respons.data.order[0].jenis_kiriman);
      setJenisKiriman(respons.data.order[0].jenis_kiriman);
      setIDJenisKendaraan(respons.data.order[0].id_kendaraan_jenis);
      setJenisKendaraan(respons.data.order[0].kendaraanJenis);
      setServiceType(respons.data.order[0].service_type);
      setTarif(respons.data.order[0].tarif);
      setDataVia(respons.data.order[0].via);
      setCreatedData(respons.data.order[0].date_created);
      //   console.log("responssssscarismid", respons.data.data);

      //   setDataTambah(respons.data);
      //   setSJList(respons.data?.data?.sj);
    } catch (error) {}
  };

  const EditTarif = async () => {
    try {
      const data = {
        id_price_mitra: id_price,
        id_muat_kota: parseInt(DataIDKotaMuat),
        id_tujuan_kota: parseInt(DataIDKotaTujuan),
        id_kendaraan_jenis: parseInt(IDJenisKendaraan),
        id_mitra: parseInt(DataIDMitra),
        service_type: ServiceType,
        jenis_kiriman: Kiriman,
        tarif: parseInt(tarif),
        ritase: parseInt(ritase),
        uang_jalan: parseInt(uangJalan),
        via: ViaData,
      };

      const response = await axios.post(
        `${Baseurl}tarif/update-tarifMitra`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      // If you want to update the state with the edited data, you can do so here.
      // For example:
      setDetailDataTarif(response.data); // Assuming the response contains the updated data

      // Check if the save operation was successful and redirect to the desired page
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data has been saved",
          // footer: '<a href="">Why do I have this issue?</a>'
        });
        setTimeout(() => {
          window.location.href = "/tarifmitra";
        }, 1000);
      } else if (response.status === 500) {
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Something went wrong!',
        //     // footer: '<a href="">Why do I have this issue?</a>'
        //   })
        console.log(`error`);
      }
    } catch (error) {
      console.log(`ini error`);
      console.error(`ini errorr`, error);
      Swal.fire({
        icon: "error",
        title: "Isi Semua Data Terlebih dahulu",
        // text: "Isi Semua Data",
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    }
  };

  useEffect(() => {
    fetchData();
    fetchSelectMitra();
    DetailTarifMitra(id_price);
  }, [ritase]);

  const handleChange = (value) => {
    console.log(`Selected option: ${value}`);
    setViaData(value);
  };

  const toRupiah = (angka) => {
    var rupiah = "";
    var angkarev = angka.toString().split("").reverse().join("");
    for (var i = 0; i < angkarev.length; i++)
      if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + ".";
    return `${rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("")}`;
  };

  const formatTarif = (value) => {
    // Menghapus semua karakter selain angka
    const numericValue = value.replace(/[^0-9]/g, "");

    // Menambahkan titik setiap 3 digit dari belakang
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return formattedValue;
  };

  const handleTarifChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatTarif(inputValue);

    setTarif(formattedValue);
  };

  console.log(ViaData);
  function handleClick(value, option) {
    console.log("Selected Value:", value);
    console.log("Selected Option:", option);

    // Check if ViaData is an array
    if (!Array.isArray(ViaData)) {
      setDataVia([value]);
    } else {
      // Spread the previous state only if it's an array
      setDataVia([...ViaData, value]);
    }
  }
  console.log(DataTambah.via);

  return (
    <div>
      <Card>
        <h5 style={{ color: "#113D7F", fontWeight: "bold" }}>
          Edit dan Detail Tarif Mitra
        </h5>
        <hr/>
        <Row gutter={[16, 16]}>
          <Col className="mt-2" xs={24} sm={12} md={6} lg={6}>
            <label style={{ fontWeight: "bold" }}>Nama Mitra :</label>
            <Select
              className="mt-2"
              showSearch
              // placeholder={DetailDataTarif.mitra}
              value={customers}
              optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.key);
                setCustomers(options);
                setDataIDMitra(options.key);
              }}
            >
              {MitraSelectTambah &&
                MitraSelectTambah.map((CustomerItem) => (
                  <Select.Option
                    key={CustomerItem?.idMitra}
                    value={CustomerItem?.mitra}
                  >
                    {CustomerItem?.mitra}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col className="mt-2" xs={24} sm={12} md={6} lg={6}>
            <label style={{ fontWeight: "bold" }}>Kota Muat :</label>
            <Select
              className="mt-2"
              showSearch
              // placeholder={DetailDataTarif.kotaAsal}
              value={mitraId}
              optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.key);
                setmitraId(options);
                setDataIDKotaMuat(options.key);
              }}
            >
              {DataTambah &&
                DataTambah.muatKota.map((KotaItem) => (
                  <Select.Option
                    key={KotaItem.idKota}
                    value={KotaItem.namaKota}
                  >
                    {KotaItem.muatKota}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col className="mt-2" xs={24} sm={12} md={6} lg={6}>
            <label style={{ fontWeight: "bold" }}>Kota Tujuan :</label>
            <Select
              showSearch
              className="mt-2"
              // placeholder={DetailDataTarif.kotaTujuan}
              value={KotaYangDiTuju}
              optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.key);
                setKotaYangDiTuju(options);
                setDataIDKotaTujuan(options.key);
              }}
            >
              {DataTambah &&
                DataTambah.muatKota.map((TujuanItem) => (
                  <Select.Option
                    key={TujuanItem.idKota}
                    value={TujuanItem.namaKota}
                  >
                    {TujuanItem.muatKota}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col className="mt-2" xs={24} sm={12} md={6} lg={6}>
            <label style={{ fontWeight: "bold" }}>Date Created :</label>
            <Input
              className="mt-2"
              disabled
              type="text"
              // placeholder={DetailDataTarif.tarif}
              value={createdData}
              // onChange={(e) => {
              //   console.log(e.target.value);
              //   setTarif(e.target.value);
              // }}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col className="mt-2" xs={24} sm={12} md={6} lg={6}>
            <label style={{ fontWeight: "bold" }}>Jenis Kendaraan :</label>
            <Select
              showSearch
              className="mt-2"
              // placeholder={DetailDataTarif.kendaraanJenis}
              value={jenisKendaraan}
              optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.key);
                console.log(options);
                setJenisKendaraan(options);
                setIDJenisKendaraan(options.key);
              }}
            >
              {DataTambah &&
                DataTambah.jenisKendaraan.map((KendaraanItem) => (
                  <Select.Option
                    key={KendaraanItem.idjenisKendaraan}
                    value={KendaraanItem.jenisKendaraan}
                  >
                    {KendaraanItem.jenisKendaraan}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col className="mt-2" xs={24} sm={12} md={6} lg={6}>
            <label style={{ fontWeight: "bold" }}>Service Type :</label>
            <Select
              className="mt-2"
              placeholder={DetailDataTarif.service_type}
              value={ServiceType}
              style={{ width: "100%" }}
              onChange={(e) => setServiceType(e)}
            >
              <Option value="Retail">Retail</Option>
              <Option value="Charter">Charter</Option>
            </Select>
          </Col>
          <Col className="mt-2" xs={24} sm={12} md={6} lg={6}>
            <label style={{ fontWeight: "bold" }}>Jenis Kiriman :</label>
            <Select
              className="mt-2"
              // placeholder={DetailDataTarif.jenis_kiriman}
              value={Kiriman}
              style={{ width: "100%" }}
              onChange={(e) => setJenisKiriman(e)}
            >
              <Option value="Expres">Expres</Option>
              <Option value="Reguler">Reguler</Option>
            </Select>
          </Col>
          <Col className="mt-2" xs={24} sm={12} md={6} lg={6}>
            <label style={{ fontWeight: "bold" }}>Via :</label>
            <Select
              className="mt-2"
              // placeholder={DetailDataTarif.jenis_kiriman}
              value={ViaData}
              style={{ width: "100%" }}
              onChange={(e) => setDataVia(e)}
            >
              <Option value="darat">darat</Option>
              <Option value="laut">laut</Option>
              <Option value="udara">udara</Option>
            </Select>
            
          </Col>

          {/* <Col className="mt-2" span={7}>
            <label style={{fontWeight: 'bold'}}>Via :</label>
            <Select
              placeholder={DetailDataTarif.via}
              // placeholder={DataTambah.via}
              className="mt-2"
              style={{ width: "100%" }}
              onChange={handleChange}
            >
              {DataTambah &&
                DataTambah.via.map((ViaItem) => (
                  <Select.Option value={ViaItem.via}>
                    {ViaItem.via}
                  </Select.Option>
                ))} */}
          {/* {viaData.map((viaItem, index) => (
                <Option key={index} value={viaItem.via}>
                  {viaItem.via}
                </Option>
              ))} */}
          {/* </Select>
          </Col> */}
        </Row>

        <br />
        <hr />

        <h5 style={{ color: "#113D7F", fontWeight: "bold" }}>
          Biaya Penanganan
        </h5>
        <Row gutter={[16, 16]}>
          <Col className="mt-2" xs={24} sm={12} md={6} lg={6}>
            <label style={{ fontWeight: "bold" }}>Tarif :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              type="text"
              placeholder={DetailDataTarif.tarif}
              value={tarif}
              onChange={(e) => {
                console.log(e.target.value);
                setTarif(e.target.value);
              }}
            />
          </Col>
          {/* <Col className="mt-2" xs={24} sm={12} md={6} lg={6}>
            <label style={{fontWeight: 'bold'}}>Ritase :</label>
            Menghubungkan input ritase dengan state ritase
            <Input
              placeholder={DetailDataTarif.ritase}
<<<<<<< HEAD
              value={ritase}
=======
              value={ritase}   
>>>>>>> maya
              onChange={(e) => {
                console.log(e.target.value);
                setRitase(e.target.value);
              }}
            />
          </Col> */}
        </Row>
        <br />
        <Row gutter={[16, 16]}>
          <Col span={24} className="d-flex justify-content-end">
            <Button type="primary">
              <span onClick={EditTarif}>Save</span>
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default DetailTarifMitra;
