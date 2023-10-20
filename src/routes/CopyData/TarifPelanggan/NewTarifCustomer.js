import React, { useEffect, useState } from "react";
import Baseurl from "../../../Api/BaseUrl";
import axios from "axios";
import { Button, Card, Col, Input, Row, Select } from "antd";
import { InputGroup, Form } from "react-bootstrap";
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
  const [DataBiayaMuat, setDataBiayaMuat] = useState(0);
  const [DataBiayaBongkar, setDataBiayaBongkar] = useState(0);
  const [DataBiayaOvertonase, setDataBiayaOvertonase] = useState(0);
  const [DataBiayaMultimuat, setDataBiayaMultimuat] = useState(0);
  const [DataBiayaMultiDrop, setDataBiayaMultiDrop] = useState(0);
  const [DataBiayaTambahan, setDataBiayaTambahan] = useState(0);
  const [DataBiayaMel, setDataBiayaMel] = useState(0);
  const [DataBiayaLain, setDataBiayaLain] = useState(0);
  const [TotalBiaya, setTotalBiaya] = useState("");
  const [KodeID, setKodeID] = useState("");
  const [id_price_eureka, setid_price_eureka] = useState("");
  const [DataIdPriceEureka, setDataPriceIdEureka] = useState("");
  const [DataDiskonPersen, setDataDiskonPersen] = useState("");
  const [DataDiskonRupiah, setDataDiskonRupiah] = useState("");
  const [NilaiDiskon, setNilaiDiskon] = useState("");
  const [MinTonase1, setMinTonase1] = useState(0);
  const [MinTonase2, setMinTonase2] = useState(0);
  const [MinTonase3, setMinTonase3] = useState(0);
  const [MinTonase4, setMinTonase4] = useState(0);
  const [MinTonase5, setMinTonase5] = useState(0);
  const [Tarif1, setTarif1] = useState(0);
  const [Tarif2, setTarif2] = useState(0);
  const [Tarif3, setTarif3] = useState(0);
  const [Tarif4, setTarif4] = useState(0);
  const [Tarif5, setTarif5] = useState(0);



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
      console.log("response", respons.data.kodeTarif);
      setKodeID(respons.data.kodeTarif);
      setIDTambahData(respons.data);
      setDataTarifKatalog(respons.data.getPrice);
      console.log(respons.data.getPrice);
      setid_price_eureka(respons.data.IdPriceEureka);
      setDataPriceIdEureka(respons.data.IdPriceEureka);
    } catch (error) {}
  };

  const TambahData = async () => {
    try {
      const respons = await axios.post(
        `${Baseurl}tarif/create-tarifCustomer`,
        {
          id_price_eureka: parseInt(DataIdPriceEureka),
          id_muat_kota: parseInt(IDMuatKota),
          id_tujuan_kota: parseInt(IDBongkarKota),
          id_customer: parseInt(IDCustomer),
          id_kendaraan_jenis: parseInt(IDJenisKendaraan),
          service_type: IDServiceType,
          jenis_kiriman: DataJenisKiriman,
          diskon: DataDiskonRupiah,
          diskon_type: "",
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
          total_biaya: TotalBiaya,
          diskon_percent: DataDiskonPersen,
          diskon_rupiah: parseInt(DataDiskonRupiah),
          min_tonas_1: MinTonase1,
          min_tonas_2: MinTonase2,
          min_tonas_3: MinTonase3,
          min_tonas_4: MinTonase4,
          min_tonas_5: MinTonase5,
          tarif_2: Tarif2,
          tarif_3: Tarif3,
          tarif_4: Tarif4,
          tarif_5: Tarif5,
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

      if (respons.data && respons.data.exists) {
        // Show SweetAlert2 warning message
        Swal.fire({
          icon: "warning",
          title: "Data Exists",
          text: "The data already exists!",
        });
      } else {
        // Data does not exist, proceed with setting IDTambahData and showing success message
        setIDTambahData(respons.data);

        // Show SweetAlert2 success message
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data Berhasil di Tambahkan!",
        }).then(() => {
          // Reload the window after the success message is closed
          // window.location.reload();
          window.location.href = '/pelanggantarif';
        });
      }
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error);
      // Show SweetAlert2 error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Data Sudah Ada !",
      });
    }
  };

  useEffect(() => {
    // fetchData();
    GetSelectData();
    // if (!isNaN(DataTarifKatalog) && !isNaN(DataDiskon)) {
    //   if (DataDiskonType === "Presentase") {
    //     const diskonPercentage = DataDiskon / 100;
    //     const totalBiayaAfterDiskon =
    //       DataTarifKatalog - DataTarifKatalog * diskonPercentage;
    //     setTotalBiaya(totalBiayaAfterDiskon);
    //   } else if (DataDiskonType === "Amount") {
    //     const totalBiayaAfterDiskon = DataTarifKatalog - DataDiskon;
    //     setTotalBiaya(totalBiayaAfterDiskon);
    //   }
    // }
  }, [
    DataTarifKatalog,
    IDJenisKendaraan,
    IDServiceType,
    DataDiskon,
    IDMuatKota,
    IDBongkarKota,
  ]);

  function formatRupiah(number) {
    // Jika number bukan tipe number, ubah ke tipe number
    if (typeof number !== "number") {
      number = 0;
    }

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  }

  const formatRupiahs = (value) => {
    // Convert the input value to a number and add 'rp' symbol
    const formattedValue = `${parseInt(value).toLocaleString("id-ID")}`;
    return formattedValue;
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

  const handleChangse = (e) => {
    const value = e.target.value;
    setDataBiayaBongkar(value);
    console.log(formatRupiahs(value)); // Log the formatted value with 'rp' symbol
    console.log(`asdsa`, formatRupiahs(DataBiayaBongkar)); // Log the formatted value with 'rp' symbol
  };

  const handleDiskonChange = (e, isPersen) => {
  const nilaiDiskon = parseFloat(e.target.value);

  if (isPersen) {
    // Menghitung Diskon (Rp.) berdasarkan Diskon (%)
    const nilaiDiskonRupiah = (nilaiDiskon / 100) * DataTarifKatalog;
    const nilaiDiskonPersen = Math.round(nilaiDiskon * 100) / 100; // Memastikan dua digit di belakang koma
    setDataDiskonPersen(isNaN(nilaiDiskonPersen) ? '' : nilaiDiskonPersen);
    setDataDiskonRupiah(nilaiDiskonRupiah || 0);

    // Menghitung total biaya setelah diskon
    const totalBiaya = DataTarifKatalog - nilaiDiskonRupiah;
    setTotalBiaya(totalBiaya);
  } else {
    setDataDiskonRupiah(nilaiDiskon || 0);

    // Menghitung Diskon (%) berdasarkan Diskon (Rp.)
    const nilaiDiskonPersen = Math.round((nilaiDiskon / DataTarifKatalog) * 10000) / 100; // Memastikan dua digit di belakang koma
    setDataDiskonPersen(isNaN(nilaiDiskonPersen) ? '' : nilaiDiskonPersen);

    // Menghitung total biaya setelah diskon
    const totalBiaya = DataTarifKatalog - nilaiDiskon;
    setTotalBiaya(totalBiaya);
  }
};


  return (
    <Card>
      <h5 style={{ fontWeight: "bold", color: "#1A5CBF" }}>
        New Tarif Customer
      </h5>
      <hr />
      <br />
      <Row>
        <Col span={6}>
          {/* <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Kode Tarif Customer:</label> */}
          <Form.Group style={{ marginBottom: "10px" }}>
            <Form.Label style={{ fontWeight: `bold`, fontFamily: 'NoirPro' }}>
              Kode Tarif Customer:
            </Form.Label>
            <Form.Control
              disabled
              value={KodeID.kodeTarifCustomer}
              name="getPrice"
            />
          </Form.Group>
          {/* Menghubungkan input tarif dengan state tarif */}

          {/* <Input
            className="mt-2 mb-2"
            name="getPrice"
            value={KodeID.kodeTarifCustomer}
            disabled
          /> */}
        </Col>
        <Col span={6} style={{ width: "100%" }}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Customer :</label>
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
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Kota Muat :</label>
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
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Kota Tujuan :</label>
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
      </Row>
      <Row>
        <Col span={6} style={{ width: "100%" }}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Jenis Kendaraan :</label>
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
        <Col span={6} style={{ width: "100%" }}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Jenis Layanan :</label>
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
              // setIDServiceType(options.children  === "Retail" ? "Reguler" : options.children);
              setIDServiceType(options.children)
            }}
          >
            {IDTambahData &&
              IDTambahData?.serviceType?.map((CustomerItem) => (
                <Select.Option value={CustomerItem?.serviceType  }>
                  {CustomerItem?.serviceType}
                </Select.Option>
              ))}
          </Select>
        </Col>
        <Col span={6} style={{ width: "100%" }}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Via :</label>
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
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Jenis Kiriman:</label>
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
      <h5 style={{ fontWeight: "bold", color: "#1A5CBF" }}>Tarif Customer</h5>
      <br />
      <Row>
        <Col span={4}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Kode Tarif Eureka</label>
          <Form.Control
            className="mt-2"
            disabled
            value={DataIdPriceEureka}
            onChange={(e) => {
              console.log(e.target.value);
              setDataPriceIdEureka(e.target.value);
              // name = "getPrice";
              // setCustomer(options.key);
            }}
          ></Form.Control>
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Tarif Katalog :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Form.Control
            className="mt-2"
            disabled
            value={formatRupiah(DataTarifKatalog)}
            onChange={(e) => {
              console.log(e.target.value);
              setIDTambahData(e.target.value);
              setDataBiayaJalan(parseFloat(e.target.value));
              setDataTarifKatalog(parseFloat(e.target.value));
              // name = "getPrice";
              // setCustomer(options.key);
            }}
          />

          {/* <Input
            className="mt-2 mb-2"
            name="getPrice"
            value={formatRupiah(DataTarifKatalog)}
            disabled
            onChange={(e) => {
              console.log(e.target.value);
              setIDTambahData(e.target.value);
              setDataBiayaJalan(parseFloat(e.target.value));
              setDataTarifKatalog(parseFloat(e.target.value));
              setCustomer(options.key);
            }}
          /> */}
        </Col>
        {/* <Col span={6} style={{ width: "100%" }}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Jenis Diskon :</label>
          <Select
            className="mt-2 mb-2"
            showSearch
            placeholder="Select Jenis Diskon"
            optionFilterProp="value"
            style={{ width: "100%" }}
            onChange={(value) => {
              console.log(value);
              setDataDiskonType(value);
            }}
          >
            <Select.Option value="Amount">Amount</Select.Option>
            <Select.Option value="Presentase">Presentase</Select.Option>
          </Select>
        </Col> */}
        <Col span={7}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Diskon (%) :</label>
          <Input
            type="text"
            className="mt-2 mb-2"
            name="diskon_percent"
            placeholder="Input Diskon (%)"
            value={DataDiskonPersen}
            onChange={(e) => handleDiskonChange(e, true)}
          />
        </Col>
        <Col span={7}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Diskon (Rp.) :</label>
          <Input
            type="text"
            className="mt-2 mb-2"
            name="diskon_rupiah"
            placeholder="Input Diskon (Rp.)"
            value={DataDiskonRupiah}
            onChange={(e) => handleDiskonChange(e, false)}
          />
        </Col>
        {/* <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Diskon :</label>
          <Input
            type="number"
            className="mt-2 mb-2"
            name="diskon"
            placeholder="Input Diskon"
            onChange={(e) => {
              console.log(e.target.value);
              setDataDiskon(parseFloat(e.target.value));
            }}
          />
        </Col> */}
        <Col span={10}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Total Biaya :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Form.Control
            className="mt-2"
            disabled
            name="biaya_jalan"
            placeholder="Total Biaya"
            value={formatRupiah(TotalBiaya)} // Display the calculated total biaya
            // Disable the input because it is calculated automatically
            onChange={(e) => {
              console.log(e.target.value);
              setTotalBiaya(e.target.value);
              // name = "getPrice";
              // setCustomer(options.key);
            }}
            // <Input
            //   className="mt-2 mb-2"
            //   name="biaya_jalan"
            //   placeholder="Total Biaya"
            //   value={formatRupiah(TotalBiaya)}
            //   disabled
            //   onChange={(e) => {
            //     console.log(e.target.value);
            //     setTotalBiaya(e.target.value);
            //   }}
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
        <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Min Tonase :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="min_tonase_1"
            // placeholder="-"
            value={toRupiah(MinTonase1)}
            // value={MinTonase1}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setMinTonase1(inputAngka); // Set nilai tanpa tanda titik
            }}
            // onChange={(e) => {
            //   console.log(e.target.value);
            //   setDataBiayaMuat(e.target.value);
            // }}
          />
        </Col>
      </Row>
      <br />
      <hr />
      <h5 style={{ fontWeight: "bold", color: "#1A5CBF" }}>Biaya Tambahan</h5>
      <br />
      <Row>
        <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Biaya Muat :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="biaya_muat"
            // placeholder="-"
            value={toRupiah(DataBiayaMuat)}
            // value={DataBiayaMuat}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setDataBiayaMuat(inputAngka); // Set nilai tanpa tanda titik
            }}
            // onChange={(e) => {
            //   console.log(e.target.value);
            //   setDataBiayaMuat(e.target.value);
            // }}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Biaya Bongkar :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="biaya_bongkar"
            value={toRupiah(DataBiayaBongkar)}
            // value={DataBiayaMuat}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setDataBiayaBongkar(inputAngka); // Set nilai tanpa tanda titik
            }}
            // placeholder="-"
            // onChange={(e) => {
            //   console.log(e.target.value);
            //   setDataBiayaBongkar(e.target.value);
            // }}
            // onChange={handleChangse}
            // value={DataBiayaBongkar}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Biaya Overtonase :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="biaya_overtonase"
            value={toRupiah(DataBiayaOvertonase)}
            // value={DataBiayaMuat}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setDataBiayaOvertonase(inputAngka); // Set nilai tanpa tanda titik
            }}
            // placeholder="-"
            // value={DataBiayaOvertonase}
            // onChange={(e) => {
            //   console.log(e.target.value);
            //   setDataBiayaOvertonase(e.target.value);
            // }}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Biaya MultiDrop :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="biaya_muat"
            value={toRupiah(DataBiayaMultiDrop)}
            // value={DataBiayaMuat}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setDataBiayaMultiDrop(inputAngka); // Set nilai tanpa tanda titik
            }}
            // placeholder="-"
            // value={DataBiayaMultiDrop}
            // onChange={(e) => {
            //   console.log(e.target.value);
            //   setDataBiayaMultiDrop(e.target.value);
            // }}
          />
        </Col>
      </Row>
      <Row>
        {/* <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Biaya Jalan :</label>
          <Input
            type="text"
            className="mt-2 mb-2"
            name="biaya_jalan"
            value={toRupiah(DataBiayaJalan)}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, "");
              setDataBiayaJalan(inputAngka);
            }}
          />
        </Col> */}
        <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Biaya Tambahan :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="biaya_tambahan"
            value={toRupiah(DataBiayaTambahan)}
            // value={DataBiayaMuat}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setDataBiayaTambahan(inputAngka); // Set nilai tanpa tanda titik
            }}
            // placeholder="-"
            // value={DataBiayaTambahan}
            // onChange={(e) => {
            //   console.log(e.target.value);
            //   setDataBiayaTambahan(e.target.value);
            // }}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Biaya Mel :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="biaya_mel"
            value={toRupiah(DataBiayaMel)}
            // value={DataBiayaMuat}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setDataBiayaMel(inputAngka); // Set nilai tanpa tanda titik
            }}
            // value={DataBiayaMel}
            // onChange={(e) => {
            //   console.log(e.target.value);
            //   setDataBiayaMel(e.target.value);
            // }}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Biaya Lain :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="biaya_lain"
            value={toRupiah(DataBiayaLain)}
            // value={DataBiayaMuat}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setDataBiayaLain(inputAngka); // Set nilai tanpa tanda titik
            }}
            // value={DataBiayaLain}
            // onChange={(e) => {
            //   console.log(e.target.value);
            //   setDataBiayaLain(e.target.value);
            // }}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Biaya Multimuat :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="biaya_multimuat
            "
            value={toRupiah(DataBiayaMultimuat)}
            // value={DataBiayaMuat}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setDataBiayaMultimuat(inputAngka); // Set nilai tanpa tanda titik
            }}
            // value={DataBiayaMultimuat}
            // onChange={(e) => {
            //   console.log(e.target.value);
            //   setDataBiayaMultimuat(e.target.value);
            // }}
          />
        </Col>
      </Row>
      <hr/>
      <Row>
      <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Biaya Jalan 2 :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="tarif_2"
            value={toRupiah(Tarif2)}
            // value={DataBiayaMuat}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setTarif2(inputAngka); // Set nilai tanpa tanda titik
            }}
           
          />
        </Col>
      <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Biaya Jalan 3 :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="tarif_3"
            value={toRupiah(Tarif3)}
            // value={DataBiayaMuat}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setTarif3(inputAngka); // Set nilai tanpa tanda titik
            }}
           
          />
        </Col>
      <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Biaya Jalan 4 :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="tarif_4"
            value={toRupiah(Tarif4)}
            // value={DataBiayaMuat}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setTarif4(inputAngka); // Set nilai tanpa tanda titik
            }}
           
          />
        </Col>
      <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Biaya Jalan 5 :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="tarif_5"
            value={toRupiah(Tarif5)}
            // value={DataBiayaMuat}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setTarif5(inputAngka); // Set nilai tanpa tanda titik
            }}
           
          />
        </Col>
    
      </Row>
      {/* Min Tonase */}
      <Row>
      <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Min Tonase 2 :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="min_tonase_2"
            value={toRupiah(MinTonase2)}
            // value={DataBiayaMuat}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setMinTonase2(inputAngka); // Set nilai tanpa tanda titik
            }}
           
          />
        </Col>
      <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Min Tonase 3 :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="min_tonase_3"
            value={toRupiah(MinTonase3)}
            // value={DataBiayaMuat}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setMinTonase3(inputAngka); // Set nilai tanpa tanda titik
            }}
           
          />
        </Col>
      <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Min Tonase 4 :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="min_tonase_4"
            value={toRupiah(MinTonase4)}
            // value={DataBiayaMuat}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setMinTonase4(inputAngka); // Set nilai tanpa tanda titik
            }}
           
          />
        </Col>
      <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}>Min Tonase 5 :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="min_tonase_5"
            value={toRupiah(MinTonase5)}
            // value={DataBiayaMuat}
            onChange={(e) => {
              const inputAngka = e.target.value.replace(/\D/g, ""); // Menghilangkan semua karakter non-angka
              setMinTonase5(inputAngka); // Set nilai tanpa tanda titik
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
            Submitt
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default NewTarifCustomer;
