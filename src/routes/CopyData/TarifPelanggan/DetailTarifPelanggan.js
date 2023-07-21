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

function DetailTarifPelanggan() {
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
  const [BiayaLainnya, setBiayaLainnya] = useState(""); // State untuk menyimpan nilai uang jalan yang akan diubah

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
      console.log("response", respons.data.order[0]);
      setDetailDataTarif(respons.data.order[0]);
      setDataVia(respons.data);
      //   console.log("responssssscarismid", respons.data.data);

      //   setDataTambah(respons.data);
      //   setSJList(respons.data?.data?.sj);
    } catch (error) {}
  };

  const EditTarif = async () => {
    try {
      const data = {
        id_price: id_price,
        id_muat_kota: parseInt(mitraId),
        id_tujuan_kota: parseInt(KotaYangDiTuju),
        id_kendaraan_jenis: parseInt(jenisKendaraan),
        service_type: ServiceType,
        jenis_kiriman: Kiriman,
        id_customer: parseInt(customers),
        // via: viaData,
        diskon: parseInt(discount),
        diskon_type: TipeDiskon,
        biaya_jalan: parseInt(BiayaJalan),
        biaya_lainnya: parseInt(BiayaLainnya),
      };

      const response = await axios.post(`${Baseurl}tarif/edit-tarifCustomer`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

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

        setTimeout(() => {
          window.location.href = "/pelanggantarif"; // Replace with the actual path to the "tarif_eureka" page
        }, 1000); // 1000 milliseconds (1 seconds) delay
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
  }, [ ritase]);

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
              placeholder={DetailDataTarif.customer}
              optionFilterProp="value"
              style={{ width: "90%" }}
              onChange={(e, options) => {
                console.log(options.key);
                setCustomers(options.key);
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
              placeholder={DetailDataTarif.kotaAsal}
              optionFilterProp="value"
              style={{ width: "90%" }}
              onChange={(e, options) => {
                console.log(options.key);
                setmitraId(options.key);
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
              placeholder={DetailDataTarif.kotaTujuan}
              optionFilterProp="value"
              style={{ width: "90%" }}
              onChange={(e, options) => {
                console.log(options.key);
                setKotaYangDiTuju(options.key);
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
              placeholder={DetailDataTarif.kendaraanJenis}
              optionFilterProp="value"
              style={{ width: "90%" }}
              onChange={(e, options) => setJenisKendaraan(options.key)}
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
            <label>Jenis Layanan :</label>
            <Select
              className="mt-2"
              placeholder={DetailDataTarif.service_type}
              style={{ width: "90%" }}
              onChange={(e) => setJenisKiriman(e)}
            >
              <Option value="Retail">Retail</Option>
              <Option value="Charter">Charter</Option>
            </Select>
          </Col>
          <Col className="mt-2" span={8}>
            <label>Jenis Kiriman :</label>
            <Select
              className="mt-2"
              placeholder={DetailDataTarif.jenisKiriman}
              style={{ width: "90%" }}
              onChange={(e) => setServiceType(e)}
            >
              <Option value="Expres">Expres</Option>
              <Option value="Reguler">Reguler</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col className="mt-2" span={8}>
            <label>Discount Type :</label>
            <Select
              className="mt-2"
              placeholder={DetailDataTarif.diskon_type}
              style={{ width: "90%" }}
              onChange={(e) => setTipeDiskon(e)}
            >
              <Option value="amount">amount</Option>
              <Option value="diskon">diskon</Option>
            </Select>
          </Col>
          <Col className="mt-2" span={8} style={{ maxWidth: "60%" }}>
            <label>Discount :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "30px" }}>
              <Input
                className="mt-2"
                placeholder={DetailDataTarif.diskon}
                value={discount}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDiskon(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col className="mt-2" span={8}>
            <label>Biaya Jalan :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "30px" }}>
              <Input
                className="mt-2"
                placeholder={DetailDataTarif.biaya_jalan}
                value={BiayaJalan}
                onChange={(e) => {
                  console.log(e.target.value);
                  setBiayaJalan(e.target.value);
                }}
              />
            </div>
          </Col>
        </Row>
        <br />
        <hr />
        <h4>Biaya Tambahan</h4>
        <Row>
          <Col className="mt-2" span={8}>
            <label>Biaya Lainnya :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "30px" }}>
              <Input
                className="mt-2"
                placeholder={DetailDataTarif.biaya_lain}
                value={BiayaLainnya}
                onChange={(e) => {
                  console.log(e.target.value);
                  setBiayaLainnya(e.target.value);
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
