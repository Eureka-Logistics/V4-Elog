import React, { useState, useEffect } from "react";
import { Button, Card, Col, Input, Row, Select } from "antd";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import * as Yup from "yup"; // Import Yup library
import { parseDateTimeSkeleton } from "@formatjs/icu-skeleton-parser";
import { right } from "@popperjs/core";
import userEvent from "@testing-library/user-event";

const { Option } = Select;

function DetailTarifPelanggan() {
  const [DataTambah, setDataTambah] = useState("");
  const [DetailDataTarif, setDetailDataTarif] = useState("");
  const [KotaYangDiTuju, setKotaYangDiTuju] = useState("");
  const [jenisKendaraan, setJenisKendaraan] = useState("");
  const [ViaData, setDataVia] = useState("");
  const [mitraId, setmitraId] = useState("");
  const { id_price } = useParams();
  const [Kiriman, setJenisKiriman] = useState("");
  const [viaData, setViaData] = useState("");
  const [ServiceType, setServiceType] = useState([]);
  const [tarif, setTarif] = useState(null); // State untuk menyimpan nilai tarif yang akan diubah
  const [ritase, setRitase] = useState(null); // State untuk menyimpan nilai ritase yang akan diubah
  const [DetailSemua, setDetailSemua] = useState("");
  const [customers, setCustomers] = useState(""); // State untuk menyimpan nilai uang jalan yang akan diubah
  const [discount, setDiskon] = useState(""); // State untuk menyimpan nilai uang jalan yang akan diubah
  const [TipeDiskon, setTipeDiskon] = useState(""); // State untuk menyimpan nilai uang jalan yang akan diubah
  const [IDcustomers, setIDcustomers] = useState(""); // State untuk menyimpan nilai uang jalan yang akan diubah
  const [IDKendaraanJenis, setIDKendaraanJenis] = useState("");
  const [IDKotaMuat, setIDKotaMuat] = useState("");
  const [IDTujuanKota, setIDTujuanKota] = useState("");
  const [IDBiayaJalan, setIDBiayaJalan] = useState("");
  const [IDBiayaLain, setIDBiayaLain] = useState("");
  const [JenisVia, setJenisVia] = useState("");
  const [IDBiayaMuat, setIDBiayaMuat] = useState("");
  const [IDBiayaBongkar, setIDBiayaBongkar] = useState("");
  const [IDBiayaOvertonase, setIDBiayaOvertonase] = useState("");
  const [IDBiayaMultiMuat, setIDBiayaMultiMuat] = useState("");
  const [IDBiayaMultiDrop, setIDBiayaMultiDrop] = useState("");
  const [IDBiayaTambahan, setIDBiayaTambahan] = useState("");
  const [IDBiayaMel, setIDBiayaMel] = useState("");

  const fetchData = async () => {
    try {
      const respons = await axios.get(`${Baseurl}tarif/get-select`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      //   console.log("responssssscarismid", respons.data.data);

      setDataTambah(respons.data);
      //   setSJList(respons.data?.data?.sj);
    } catch (error) {}
  };

  const DetailTarifPelanggan = async (id_price) => {
    try {
      const respons = await axios.get(
        `${Baseurl}tarif/get-detail-tarifCustomer?id_price=${id_price}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setDetailSemua(respons.data.order[0]);
      setIDcustomers(respons.data.order[0].id_customer);
      setIDKendaraanJenis(respons.data.order[0].id_kendaraan_jenis);
      setIDKotaMuat(respons.data.order[0].id_muat_kota);
      setDetailDataTarif(respons.data.order[0]);
      setJenisKiriman(respons.data.order[0].jenisKiriman);
      setDataVia(respons.data);
      setCustomers(respons.data.order[0]?.customer);
      setmitraId(respons.data.order[0]?.kotaAsal);
      setKotaYangDiTuju(respons.data.order[0]?.kotaTujuan);
      setJenisKendaraan(respons.data.order[0]?.kendaraanJenis);
      setServiceType(respons.data.order[0]?.service_type);
      setTipeDiskon(respons.data.order[0]?.diskon_type);
      setDiskon(respons.data.order[0]?.diskon);
      setIDTujuanKota(respons.data.order[0]?.id_tujuan_kota);
      setIDBiayaJalan(respons.data.order[0]?.biaya_jalan);
      setIDBiayaLain(respons.data.order[0]?.biaya_lain);
      setJenisVia(respons.data.order[0]?.via);


    } catch (error) {}
  };
  console.log(`customers`, DetailSemua);
  console.log(`IDcustomers`, IDcustomers);

  const EditTarif = async () => {
    try {
      const data = {
        id_price: id_price,
        id_muat_kota: parseInt(IDKotaMuat),
        id_tujuan_kota: parseInt(IDTujuanKota),
        id_kendaraan_jenis: parseInt(IDKendaraanJenis),
        service_type: ServiceType,
        jenis_kiriman: Kiriman,
        id_customer: parseInt(IDcustomers),
        via: JenisVia,
        diskon: parseInt(discount),
        diskon_type: TipeDiskon,
        biaya_jalan: parseInt(IDBiayaJalan),
        biaya_lain: parseInt(IDBiayaLain),
        biaya_muat: "",
        biaya_bongkar: "",
        biaya_overtonase: "",
        biaya_multimuat: "",
        biaya_multidrop: "",
        biaya_tambahan: "",
      };

      const response = await axios.post(
        `${Baseurl}tarif/edit-tarifCustomer`,
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
          text: "Tarif has been saved",
          // footer: '<a href="">Why do I have this issue?</a>'
        });
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
    DetailTarifPelanggan(id_price);
  }, [ritase]);

  const handleChange = (value) => {
    console.log(`Selected option: ${value}`);
    setViaData(value);
  };

  return (
    <div>
      <Card>
        <h4>Edit dan Detail Tarif Customer</h4>
        <Row>
          <Col className="mt-2" span={8}>
            <label>Customer :</label>

            <Select
              className="mt-2"
              showSearch
              value={customers}
              optionFilterProp="value"
              style={{ width: "90%" }}
              onChange={(e, options) => {
                console.log(options);
                setCustomers(options);
                setIDcustomers(options.key);
              }}
            >
              {DataTambah &&
                DataTambah.customer.map((CustomerItem) => (
                  <Select.Option
                    key={CustomerItem.idCustomer}
                    value={CustomerItem.Customer}
                  >
                    {CustomerItem.customer}
                  </Select.Option>
                ))}
            </Select>
          </Col>

          <Col className="mt-2" span={8}>
            <label>Kota Muat :</label>
            <Select
              className="mt-2"
              showSearch
              value={mitraId}
              optionFilterProp="value"
              style={{ width: "90%" }}
              onChange={(e, options) => {
                console.log(options.key);
                setmitraId(options);
                setIDKotaMuat(options.key);
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
          <Col className="mt-2" span={8}>
            <label>Kota Tujuan :</label>
            <Select
              className="mt-2"
              showSearch
              value={KotaYangDiTuju}
              optionFilterProp="value"
              style={{ width: "90%" }}
              onChange={(e, options) => {
                console.log(options.key);
                setIDTujuanKota(options.key);
                setKotaYangDiTuju(options);
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
        </Row>
        <Row>
          <Col className="mt-2" span={8}>
            <label>Jenis Kendaraan :</label>
            <Select
              className="mt-2"
              showSearch
              value={jenisKendaraan}
              optionFilterProp="value"
              style={{ width: "90%" }}
              onChange={(e, options) => {
                setIDKendaraanJenis(options.key);
                setJenisKendaraan(options);
              }}
            >
              {DataTambah &&
                DataTambah.jenisKendaraan.map((KendaraanItem) => (
                  <Select.Option
                    key={KendaraanItem.idjenis}
                    value={KendaraanItem.jenisKendaraan}
                  >
                    {KendaraanItem.jenisKendaraan}
                  </Select.Option>
                ))}
            </Select>
          </Col>

          <Col className="mt-2" span={8}>
            <label>Service Type :</label>
            <Select
              className="mt-2"
              // placeholder={DetailDataTarif.service_type}
              value={ServiceType}
              style={{ width: "90%" }}
              onChange={(e) => setServiceType(e)}
            >
              <Option value="Reguler">Reguler</Option>
              <Option value="Express">Express</Option>
            </Select>
          </Col>
          <Col className="mt-2" span={8}>
            <label>Jenis Kiriman :</label>
            <Select
              className="mt-2"
              value={Kiriman}
              style={{ width: "90%" }}
              onChange={(e) => setJenisKiriman(e)}
            >
              <Option value="Retail">Retail</Option>
              <Option value="Charter">Charter</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col className="mt-2" span={8}>
            <label>Discount Type :</label>
            <Select
              className="mt-2"
              // placeholder={TipeDiskon}
              value={TipeDiskon}
              style={{ width: "90%" }}
              onChange={(e) => setTipeDiskon(e)}
            >
              <Option value="amount">Amount</Option>
              <Option value="diskon">Diskon</Option>
            </Select>
          </Col>
          <Col className="mt-2" span={8} style={{ maxWidth: "60%" }}>
            <label>Discount :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "30px" }}>
              <Input
                className="mt-2"
                value={discount}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDiskon(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col className="mt-2" span={8}>
          <label>Via :</label>
            <Select
              className="mt-2"
              value={JenisVia}
              style={{ width: "92%" }}
              onChange={(e) => setJenisVia(e)}
            >
              <Option value="Darat">Darat</Option>
              <Option value="Laut">Laut</Option>
              <Option value="Udara">Udara</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <hr />
        <h4>Biaya Tambahan</h4>
        <Row>
          <Col className="mt-2" span={8}>
          <label>Biaya Muat :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "30px" }}>
              <Input
                className="mt-2"
                value={IDBiayaJalan}
                onChange={(e) => {
                  console.log(e.target.value);
                  setIDBiayaJalan(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col className="mt-2" span={8}>
          <label>Tarif Katalog :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "30px" }}>
              <Input
                className="mt-2"
                value={IDBiayaJalan}
                onChange={(e) => {
                  console.log(e.target.value);
                  setIDBiayaJalan(e.target.value);
                }}
              />
            </div>
          </Col>
        </Row>
        <br />
        <Row>
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

export default DetailTarifPelanggan;
