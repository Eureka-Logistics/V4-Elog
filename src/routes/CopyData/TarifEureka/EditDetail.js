import React, { useState, useEffect } from "react";
import { Button, Card, Col, Input, Row, Select } from "antd";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import * as Yup from "yup"; // Import Yup library

const { Option } = Select;
const validationSchema = Yup.object().shape({
  tarif: Yup.number()
    .required("Tarif is required")
    .positive("Tarif must be a positive number"),
  ritase: Yup.number()
    .required("Ritase is required")
    .positive("Ritase must be a positive number"),
  uangJalan: Yup.number()
    .required("Uang Jalan is required")
    .positive("Uang Jalan must be a positive number"),
});

function EditDetail() {
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
  const [IDMuat, setIDMuat] = useState("");
  const [IDTujuan, setIDTujuan] = useState("");
  const [IDJenisKendaraan, setIDJenisKendaraan] = useState("");
  const [DataMaintenance, setDataMaintenance] = useState("");
  const [DataVariableCost, setDataVariableCost] = useState("");
  const [DataFixedCost, setDataFixedCost] = useState("");
  const [DataAmount, setDataAmount] = useState("");
  const [DataPercent, setDataPercent] = useState("");
  const [DataDate, setDataDate] = useState("");
  const [DataMaxTonase, setDataMaxTonase] = useState("");
  const [DataSatuan, setDataSatuan] = useState("");
  const [HargaSelanjutnya, setHargaSelanjutnya] = useState("");
  const [KodeTarif, setKodeTarif] = useState("")

  const fetchData = async () => {
    try {
      const respons = await axios.get(`${Baseurl}tarif/get-select`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("responses", respons.data.kodeTarif.kodeTarifEureka);
      //   console.log("responssssscarismid", respons.data.data);

      setDataTambah(respons.data);
      //   setSJList(respons.data?.data?.sj);
    } catch (error) {}
  };

  const DetailTarifEureka = async (id_price) => {
    try {
      const respons = await axios.get(
        `${Baseurl}tarif/get-detail-tarifEureka?id_price=${id_price}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("response", respons.data.data[0]);
      setDetailDataTarif(respons.data.data[0]);
      setmitraId(respons.data.data[0].kotaAsal);
      setKotaYangDiTuju(respons.data.data[0].kotaTujuan);
      setJenisKendaraan(respons.data.data[0].kendaraanJenis);
      setIDMuat(respons.data.data[0].id_muat_kota);
      setIDTujuan(respons.data.data[0].id_tujuan_kota);
      setIDJenisKendaraan(respons.data.data[0].id_kendaraan_jenis);
      setServiceType(respons.data.data[0].service_type);
      setJenisKiriman(respons.data.data[0].jenis_kiriman);
      setRitase(respons.data.data[0].ritase);
      setTarif(respons.data.data[0].tarif);
      setUangJalan(respons.data.data[0].uang_jalan);
      setDataMaintenance(respons.data.data[0].maintenance_cost);
      setDataVariableCost(respons.data.data[0].variable_cost);
      setDataFixedCost(respons.data.data[0].fixed_cost);
      setDataAmount(respons.data.data[0].amount);
      setDataPercent(respons.data.data[0].percent);
      setDataDate(respons.data.data[0].date_created);
      setDataMaxTonase(respons.data.data[0].max_tonase);
      setDataSatuan(respons.data.data[0].satuan);
      setHargaSelanjutnya(respons.data.data[0].harga_selanjutnya);
      setDataVia(respons.data);
    } catch (error) {}
  };

  const EditTarif = async () => {
    try {
      const data = {
        id_price: id_price,
        id_muat_kota: parseInt(IDMuat),
        id_tujuan_kota: parseInt(IDTujuan),
        id_kendaraan_jenis: parseInt(IDJenisKendaraan),
        service_type: ServiceType,
        jenis_kiriman: Kiriman,
        tarif: parseInt(tarif),
        ritase: ritase,
        uang_jalan: parseInt(uangJalan),
        maintenance_cost: DataMaintenance,
        variable_cost: DataVariableCost,
        fixed_cost: DataFixedCost,
        amount: DataAmount,
        percent: DataPercent,
        satuan: DataSatuan,
        max_tonase: DataMaxTonase,
        harga_selanjutnya: HargaSelanjutnya,
        // via: viaData,
      };

      const response = await axios.post(
        `${Baseurl}tarif/edit-tarifEureka`,
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
          window.location.href = "/tarif_eureka"; 
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
    DetailTarifEureka(id_price);
  }, [ritase]);
  // viaData

  const handleChange = (value) => {
    console.log(`Selected option: ${value}`);
    setViaData(value);
  };

  useEffect(() => {
    const uangJalanValue = parseFloat(uangJalan);
    const variableCostValue = parseFloat(DataVariableCost);
    const fixedCostValue = parseFloat(DataFixedCost);
    const maintenanceCostValue = parseFloat(DataMaintenance);

    if (
      !isNaN(uangJalanValue) &&
      !isNaN(variableCostValue) &&
      !isNaN(fixedCostValue) &&
      !isNaN(maintenanceCostValue)
    ) {
      const amount =
        uangJalanValue +
        variableCostValue +
        fixedCostValue +
        maintenanceCostValue;
      setDataAmount(amount); // Set 'amount' in the state
    }
  }, [uangJalan, DataVariableCost, DataFixedCost, DataMaintenance]);

  // Calculate 'tarif' whenever 'amount' or 'percent' changes
  useEffect(() => {
    const amountValue = parseFloat(DataAmount);
    const percentValue = parseFloat(DataPercent);

    if (!isNaN(amountValue) && !isNaN(percentValue)) {
      const tarifValue = amountValue + amountValue * (percentValue / 100);
      setTarif(tarifValue); // Set 'tarif' in the state
    }
  }, [DataAmount, DataPercent]);

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

  return (
    <div>
      <Card>
        <h5 style={{ color: "#113D7F", fontWeight: "bold" }}>
          Edit dan Detail Tarif Eureka
        </h5>
        <Row>
          <Col className="mt-2" span={8}>
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
                setIDMuat(options.key);
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
                setIDTujuan(options.key);
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
          <Col className="mt-2" span={8}>
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
                setJenisKendaraan(options);
                setIDJenisKendaraan(options.key);
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
        </Row>
        <Row>
          <Col className="mt-2" span={4}>
            <label style={{ fontWeight: "bold" }}>Service Type :</label>
            <Select
              className="mt-2"
              // placeholder={DetailDataTarif.service_type}
              value={ServiceType}
              style={{ width: "100%" }}
              onChange={(e) => setServiceType(e)}
            >
              <Option value="Retail">Retail</Option>
              <Option value="Charter">Charter</Option>
            </Select>
          </Col>
          <Col className="mt-2" span={4}>
            <label style={{ fontWeight: "bold" }}>Satuan :</label>
            <Select
              className="mt-2"
              // placeholder={DetailDataTarif.service_type}
              value={DataSatuan}
              style={{ width: "100%" }}
              onChange={(e) => setDataSatuan(e)}
            >
              <Option value="Kg">Kg</Option>
              <Option value="Koli">Koli</Option>
              <Option value="Pcs">Pcs</Option>
            </Select>
          </Col>
          <Col className="mt-2" span={4}>
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
          <Col className="mt-2" span={4}>
            <label style={{ fontWeight: "bold" }}>Ritase :</label>
            {/* Menghubungkan input ritase dengan state ritase */}
            <Input
              className="mt-2"
              // placeholder={DetailDataTarif.ritase}
              value={ritase}
              onChange={(e) => {
                console.log(e.target.value);
                setRitase(e.target.value);
              }}
            />
          </Col>

          <Col className="mt-2" span={8}>
            <label style={{ fontWeight: "bold" }}>Date Created :</label>
            {/* Menghubungkan input uang jalan dengan state uangJalan */}
            <Input
              disabled
              className="mt-2"
              // placeholder={DetailDataTarif.uang_jalan}
              value={DataDate}
              onChange={(e) => setDataDate(e.target.value)}
            />
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
        <h5 style={{ color: "#113D7F" }}>Biaya Penanganan</h5>
        <hr />
        <Row>
          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>Uang Jalan :</label>
            {/* Menghubungkan input uang jalan dengan state uangJalan */}
            <Input
              type="text"
              className="mt-2"
              // placeholder={DetailDataTarif.uang_jalan}
              value={uangJalan}
              onChange={(e) => setUangJalan(e.target.value)}
            />
          </Col>
          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>Maintenance Cost :</label>
            {/* Menghubungkan input uang jalan dengan state uangJalan */}
            <Input
              className="mt-2"
              // placeholder={DetailDataTarif.uang_jalan}
              value={DataMaintenance}
              onChange={(e) => setDataMaintenance(e.target.value)}
            />
          </Col>
          {/* <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>Variable Cost :</label>
            <Input
              className="mt-2"
              value={DataVariableCost}
              onChange={(e) => setDataVariableCost(e.target.value)}
            />
          </Col> */}

          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>Fixed Cost :</label>
            {/* Menghubungkan input uang jalan dengan state uangJalan */}
            <Input
              className="mt-2"
              // placeholder={DetailDataTarif.uang_jalan}
              value={DataFixedCost}
              onChange={(e) => setDataFixedCost(e.target.value)}
            />
          </Col>
          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>Max Tonase :</label>
            {/* Menghubungkan input uang jalan dengan state uangJalan */}
            <Input
              className="mt-2"
              value={DataMaxTonase}
              onChange={(e) => setDataMaxTonase(e.target.value)}
            />
          </Col>
        </Row>
        <br />
        <hr />
        <Row>
          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>Amount :</label>
            {/* Menghubungkan input uang jalan dengan state uangJalan */}
            <Input
              disabled
              className="mt-2"
              // placeholder={DetailDataTarif.uang_jalan}
              value={toRupiah(DataAmount)}
              onChange={(e) => setDataAmount(e.target.value)}
            />
          </Col>
          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>Percent :</label>
            {/* Menghubungkan input uang jalan dengan state uangJalan */}
            <Input
              className="mt-2"
              // placeholder={DetailDataTarif.uang_jalan}
              value={DataPercent}
              onChange={(e) => setDataPercent(e.target.value)}
            />
          </Col>

          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>Tarif :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
            disabled
              className="mt-2"
              value={`${new Intl.NumberFormat("id-ID").format(tarif)}`}
              onChange={(e) => {
                console.log(e.target.value);
                setTarif(e.target.value);
              }}
            />
          </Col>
          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>Harga Selanjutnya :</label>
            {/* Menghubungkan input uang jalan dengan state uangJalan */}
            <Input
              className="mt-2"
              value={HargaSelanjutnya}
              onChange={(e) => setHargaSelanjutnya(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} className="d-flex justify-content-end mt-2">
            <Button type="primary">
              <span onClick={EditTarif}>Save</span>
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default EditDetail;