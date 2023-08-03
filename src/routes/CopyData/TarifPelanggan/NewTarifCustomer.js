import React, { useEffect, useState } from "react";
import Baseurl from "../../../Api/BaseUrl";
import axios from "axios";
import { Button, Card, Col, Input, Row, Select } from "antd";
import Swal from "sweetalert2";

function NewTarifCustomer() {
  const [IDMuatKota, setIDMuatKota] = useState(0);
  const [IDBongkarKota, setIDBongkarKota] = useState(0);
  const [IDJenisKendaraan, setIDJenisKendaraan] = useState(0);
  const [IDServiceType, setIDServiceType] = useState(0);
  const [IDTambahData, setIDTambahData] = useState("");
  const [IDCustomer, setIDCustomer] = useState("");
  const [IDVia, setIDVia] = useState("");
  const [DataMuatKota, setDataMuatKota] = useState("");
  const [DataBongkarKota, setDataBongkarKota] = useState("");
  const [DataJenisKendaraan, setDataJenisKendaraan] = useState("");
  const [DataServiceType, setDataServiceType] = useState("");
  const [DataJenisKiriman, setDataJenisKiriman] = useState("");
  const [DataTarifKatalog, setDataTarifKatalog] = useState("");
  const [DataDiskon, setDataDiskon] = useState("");
  const [DataDiskonType, setDataDiskonType] = useState("");
  const [DataBiayaJalan, setDataBiayaJalan] = useState("");
  const [DataBiayaMuat, setDataBiayaMuat] = useState("");
  const [DataBiayaBongkar, setDataBiayaBongkar] = useState("");
  const [DataBiayaOvertonase, setDataBiayaOvertonase] = useState("");
  const [DataBiayaMultimuat, setDataBiayaMultimuat] = useState("");
  const [DataBiayaMultiDrop, setDataBiayaMultiDrop] = useState("");
  const [DataBiayaTambahan, setDataBiayaTambahan] = useState("");
  const [DataBiayaMel, setDataBiayaMel] = useState("");
  const [DataBiayaLain, setDataBiayaLain] = useState("");
  const [TotalBiaya, setTotalBiaya] = useState("");

  const GetSelectData = async () => {
    try {
      const respons = await axios.get(
        `${Baseurl}tarif/get-select?idMuat=${IDMuatKota}&idBogkar=${IDBongkarKota}&idJenisKendaraan=${IDJenisKendaraan}&service_type=${IDServiceType}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("response", respons.data);
      setIDTambahData(respons.data);
      setDataTarifKatalog(respons.data.getPrice);
      console.log(respons.data.getPrice);
    } catch (error) {}
  };

  const TambahData = async () => {
    try {
      const respons = await axios.post(
        `${Baseurl}tarif/create-tarifCustomer`,
        {
          id_muat_kota: parseInt(IDMuatKota),
          id_tujuan_kota: parseInt(IDBongkarKota),
          id_customer: parseInt(IDCustomer),
          id_kendaraan_jenis: parseInt(IDJenisKendaraan),
          service_type: IDServiceType,
          jenis_kiriman: DataJenisKiriman,
          diskon: DataDiskon,
          diskon_type: DataDiskonType,
          biaya_jalan: TotalBiaya,
          biaya_muat: DataBiayaMuat,
          biaya_bongkar: DataBiayaBongkar,
          biaya_overtonase: DataBiayaOvertonase,
          biaya_multimuat: DataBiayaMultimuat,
          biaya_multidrop: DataBiayaMultiDrop,
          biaya_tambahan: DataBiayaTambahan,
          biaya_mel: DataBiayaMel,
          biaya_lain: DataBiayaLain,
          via: IDVia,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log("response", respons.data);
      setIDTambahData(respons.data);

      // Show SweetAlert2 success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data has been added successfully!",
      }).then(() => {
        // Reload the window after the success message is closed
        // window.location.reload();
      });
    } catch (error) {
      // Handle error if needed
    }
  };

  useEffect(() => {
    // fetchData();
    GetSelectData();
    if (!isNaN(DataTarifKatalog) && !isNaN(DataDiskon)) {
      if (DataDiskonType === "Persen") {
        const diskonPercentage = DataDiskon / 100;
        const totalBiayaAfterDiskon =
          DataTarifKatalog - DataTarifKatalog * diskonPercentage;
        setTotalBiaya(totalBiayaAfterDiskon);
      } else if (DataDiskonType === "Amount") {
        const totalBiayaAfterDiskon = DataTarifKatalog - DataDiskon;
        setTotalBiaya(totalBiayaAfterDiskon);
      }
    }
  }, [
    DataTarifKatalog,
    IDJenisKendaraan,
    IDServiceType,
    DataDiskon,
    IDMuatKota,
    IDBongkarKota,
  ]);

  const formatRupiah = (value) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(value);
  };
  
  return (
    <Card>
      <h5 style={{ fontWeight: "bold" }}>New Tarif Customer</h5>
      <hr />
      <br />
      <Row>
        <Col span={6} style={{ width: "100%" }}>
          <label style={{ fontWeight: "bold" }}>Customer :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Select Customer"
            optionFilterProp="value"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              console.log(options.key);
              setIDCustomer(options.key);
            }}
          >
            {IDTambahData &&
              IDTambahData?.customer?.map((CustomerItem) => (
                <Select.Option
                  key={CustomerItem?.idCustomer}
                  value={CustomerItem?.Customer}
                >
                  {CustomerItem?.customer}
                </Select.Option>
              ))}
          </Select>
        </Col>
        <Col span={6} style={{ width: "100%" }}>
          <label style={{ fontWeight: "bold" }}>Kota Muat :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Select Kota Muat"
            optionFilterProp="value"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              console.log(options.key);
              setIDMuatKota(options.key);
              setDataMuatKota(options);
            }}
          >
            {IDTambahData &&
              IDTambahData?.muatKota?.map((CustomerItem) => (
                <Select.Option
                  key={CustomerItem?.idKota}
                  value={CustomerItem?.namaKota}
                >
                  {CustomerItem?.muatKota}
                </Select.Option>
              ))}
          </Select>
        </Col>
        <Col span={6} style={{ width: "100%" }}>
          <label style={{ fontWeight: "bold" }}>Kota Tujuan :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Select Kota Muat"
            optionFilterProp="value"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              console.log(options.key);
              setIDBongkarKota(options.key);
            }}
          >
            {IDTambahData &&
              IDTambahData?.tujuanKota?.map((CustomerItem) => (
                <Select.Option
                  key={CustomerItem?.idKota}
                  value={CustomerItem?.namaKota}
                >
                  {CustomerItem?.tujuanKota}
                </Select.Option>
              ))}
          </Select>
        </Col>
        <Col span={6} style={{ width: "100%" }}>
          <label style={{ fontWeight: "bold" }}>Jenis Kendaraan :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Select Jenis Kendaraan"
            optionFilterProp="value"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              console.log(options.key);
              setIDJenisKendaraan(options.key);
            }}
          >
            {IDTambahData &&
              IDTambahData?.jenisKendaraan?.map((CustomerItem) => (
                <Select.Option
                  key={CustomerItem?.idjenisKendaraan}
                  value={CustomerItem?.jenisKendaraan}
                >
                  {CustomerItem?.jenisKendaraan}
                </Select.Option>
              ))}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={6} style={{ width: "100%" }}>
          <label style={{ fontWeight: "bold" }}>Jenis Layanan :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Select Jenis Layanan"
            optionFilterProp="value"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              console.log(options.children);
              setIDServiceType(options.children);
            }}
          >
            {IDTambahData &&
              IDTambahData?.serviceType?.map((CustomerItem) => (
                <Select.Option value={CustomerItem?.serviceType}>
                  {CustomerItem?.serviceType}
                </Select.Option>
              ))}
          </Select>
        </Col>
        <Col span={6} style={{ width: "100%" }}>
          <label style={{ fontWeight: "bold" }}>Via :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Select Via"
            optionFilterProp="value"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              console.log(options.value);
              setIDVia(options.value);
            }}
          >
            {IDTambahData &&
              IDTambahData?.via?.map((CustomerItem) => (
                <Select.Option value={CustomerItem?.via}>
                  {CustomerItem?.via}
                </Select.Option>
              ))}
          </Select>
        </Col>
        <Col span={6} style={{ width: "100%" }}>
          <label style={{ fontWeight: "bold" }}>Jenis Kiriman:</label>
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Select Jenis Kiriman"
            optionFilterProp="value"
            style={{ width: "100%" }}
            onChange={(value) => {
              console.log(value);
              setDataJenisKiriman(value);
            }}
          >
            {/* Add the options here */}
            <Select.Option value="Express">Express</Select.Option>
            <Select.Option value="Reguler">Reguler</Select.Option>
          </Select>
        </Col>
      </Row>
      <br />
      <hr />
      <h5>Tarif Customer</h5>
      <br />
      <Row>
        <Col span={6}>
          <label style={{ fontWeight: "bold" }}>Tarif Katalog :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            className="mt-2 mb-2"
            name="getPrice"
            value={DataTarifKatalog}
            disabled
            onChange={(e) => {
              console.log(e.target.value);
              setIDTambahData(e.target.value);
              setDataBiayaJalan(parseFloat(e.target.value));
              setDataTarifKatalog(parseFloat(e.target.value));
              // setCustomer(options.key);
            }}
            //   onChange={formik.handleChange}
          />
        </Col>
        <Col span={6} style={{ width: "100%" }}>
          <label style={{ fontWeight: "bold" }}>Jenis Diskon :</label>
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Select Jenis Diskon"
            optionFilterProp="value"
            style={{ width: "100%" }}
            onChange={(value) => {
              console.log(value);
              setDataDiskonType(value);
            }}
          >
            {/* Add the options here */}
            <Select.Option value="Amount">Amount</Select.Option>
            <Select.Option value="Persen">Persen</Select.Option>
          </Select>
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold" }}>Diskon :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="number"
            className="mt-2 mb-2"
            name="diskon"
            placeholder="Input Diskon"
            onChange={(e) => {
              console.log(e.target.value);
              setDataDiskon(parseFloat(e.target.value));
              // setCustomer(options.key);
            }}
            //   onChange={formik.handleChange}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold" }}>Total Biaya :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="number"
            className="mt-2 mb-2"
            name="biaya_jalan"
            placeholder="Total Biaya"
            value={TotalBiaya} // Display the calculated total biaya
            disabled // Disable the input because it is calculated automatically
            onChange={(e) => {
              console.log(e.target.value);
              setTotalBiaya(e.target.value);
            }}
          />
          {/* <Input
            type="number"
            className="mt-2 mb-2"
            name="biaya_jalan"
            placeholder="Total Biaya"
            onChange={(e) => {
              console.log(e.target.value);
              setDataBiayaJalan(e.target.value);
            }}
          /> */}
        </Col>
      </Row>
      <br />
      <hr />
      <h5>Biaya Tambahan</h5>
      <br />
      <Row>
        <Col span={6}>
          <label style={{ fontWeight: "bold" }}>Biaya Muat :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="number"
            className="mt-2 mb-2"
            name="biaya_muat"
            placeholder="-"
            onChange={(e) => {
              console.log(e.target.value);
              setDataBiayaMuat(e.target.value);
            }}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold" }}>Biaya Bongkar :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="number"
            className="mt-2 mb-2"
            name="biaya_bongkar"
            placeholder="-"
            onChange={(e) => {
              console.log(e.target.value);
              setDataBiayaBongkar(e.target.value);
            }}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold" }}>Biaya Overtonase :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="number"
            className="mt-2 mb-2"
            name="biaya_overtonase"
            placeholder="-"
            onChange={(e) => {
              console.log(e.target.value);
              setDataBiayaOvertonase(e.target.value);
            }}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold" }}>Biaya MultiDrop :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="number"
            className="mt-2 mb-2"
            name="biaya_muat"
            placeholder="-"
            onChange={(e) => {
              console.log(e.target.value);
              setDataBiayaMultiDrop(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <label style={{ fontWeight: "bold" }}>Biaya Overtonase :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="number"
            className="mt-2 mb-2"
            name="biaya_overtonase"
            placeholder="-"
            onChange={(e) => {
              console.log(e.target.value);
              setDataBiayaOvertonase(e.target.value);
            }}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold" }}>Biaya Tambahan :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="number"
            className="mt-2 mb-2"
            name="biaya_tambahan"
            placeholder="-"
            onChange={(e) => {
              console.log(e.target.value);
              setDataBiayaTambahan(e.target.value);
            }}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold" }}>Biaya Mel :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="number"
            className="mt-2 mb-2"
            name="biaya_mel"
            placeholder="-"
            onChange={(e) => {
              console.log(e.target.value);
              setDataBiayaMel(e.target.value);
            }}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold" }}>Biaya Lain :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="number"
            className="mt-2 mb-2"
            name="biaya_lain"
            placeholder="-"
            onChange={(e) => {
              console.log(e.target.value);
              setDataBiayaLain(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} className="d-flex justify-content-end">
          <Button
            className="mt-2"
            style={{
              backgroundColor: "#4169E1",
              color: "white",
              borderColor: "#87CEFA",
            }}
            onClick={TambahData}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default NewTarifCustomer;