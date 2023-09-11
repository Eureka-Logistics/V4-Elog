import { Card, Col, Row, Select, Tag, Table, Alert } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Baseurl from "../../Api/BaseUrl";
import { httpClient } from "../../Api/Api";

function Tarif() {
  const [listData, setListData] = useState([]);
  const [muatKota, setMuatKota] = useState("");
  const [kotaTujuan, setKotaTujuan] = useState("");
  const [JenisKendaraan, setJenisKendaraan] = useState("");
  const [kotaTujuannOptionSelect, setKotaTujuanOpionSelect] = useState("");
  const [muatKotaOptionSelect, setMuatKotaOptionsSelect] = useState("");
  const [jenisKendaraanOptionSelect, setjenisKendaraanOptionSelect] =
    useState("");
  const [DataTarifMitra, setDataTarifMitra] = useState("");
  const [DataTarifCustomer, setDataTarifCustomer] = useState("");
  const [eurekaPagination, setEurekaPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [mitraPagination, setMitraPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [customerPagination, setCustomerPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [totalDataEureka, settotalDataEureka] = useState("");
  const [totalDataMitra, settotalDataMitra] = useState("");
  const [totalDataCustomer, settotalDataCustomer] = useState("");

  const getDataSelectt = async () => {
    try {
      const response = await axios.get(`${Baseurl}tarif/get-select`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      // setMuatKotaOptionsSelect (response.data);
      console.log(response.data);
      setMuatKotaOptionsSelect(response.data);
      setKotaTujuanOpionSelect(response.data);
      setjenisKendaraanOptionSelect(response.data);
      // Cek apakah permintaan berhasil (kode status 200-299)
      if (response.status >= 200 && response.status < 300) {
        // Mengembalikan data yang diterima dari permintaan
        return response.data;
      } else {
        // Menangani situasi ketika permintaan tidak berhasil (status error)
        throw new Error("Permintaan tidak berhasil.");
      }
    } catch (error) {
      // Menangani kesalahan jaringan atau kesalahan lain yang terjadi selama permintaan
      console.error("Kesalahan saat mengambil data:", error.message);
      throw error; // Lanjutkan penanganan kesalahan di tempat lain jika perlu
    }
  };

  const [currnt, setcurrnt] = useState(1);
  const [currnt2, setcurrnt2] = useState(1);
  const [currnt3, setcurrnt3] = useState(1);
  const fetchDataTarifEureka = async (pagination = 1) => {
    try {
      const response = await httpClient.get(
        `tarif/get-tarifeureka?limit=10&page=${currnt}&id_muat_kota=${muatKota}&id_tujuan_kota=${kotaTujuan}&id_kendaraan_jenis=${JenisKendaraan}`
      );
      const data = response.data;

      if (data.status.code === 200) {
        console.log(response.data.data, "respons");
        setListData(data.data.order);
        settotalDataEureka(data.data.totalData);
      } else {
        console.log("Error: ", data.status.message);
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  const fetchDataTarifMitra = async (limit = 10, pageSize = 1) => {
    try {
      const response = await httpClient.get(
        `tarif/get-tarifMitra?limit=${limit}&page=${currnt2}&id_muat_kota=${muatKota}&id_tujuan_kota=${kotaTujuan}&id_kendaraan_jenis=${JenisKendaraan}`
      );
      const data = response.data;

      if (data.status.code === 200) {
        console.log(response.data.data.order, "respons");
        setDataTarifMitra(data.data.order);
        settotalDataMitra(data.data.totalData);
      } else {
        console.log("Error: ", data.status.message);
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  const fetchDataTarifCustomer = async (limit = 10, pageSize = 1) => {
    try {
      const response = await httpClient.get(
        `tarif/get-tarifCustomer?limit=${limit}&page=${currnt3}&id_muat_kota=${muatKota}&id_tujuan_kota=${kotaTujuan}&id_kendaraan_jenis=${JenisKendaraan}`
      );
      const data = response.data;

      if (data.status.code === 200) {
        console.log(response.data.data.order, "respons");
        setDataTarifCustomer(data.data.order);
        settotalDataCustomer(data.data.totalData);
      } else {
        console.log("Error: ", data.status.message);
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  const handleEurekaTableChange = (pagination) => {
    // setEurekaPagination(pagination);
    fetchDataTarifEureka(pagination);
    setcurrnt(pagination);
  };

  const handleMitraTableChange = (pagination) => {
    setMitraPagination(pagination);
    setcurrnt2(pagination);
  };

  const handleCustomerTableChange = (pagination) => {
    setCustomerPagination(pagination);
    setcurrnt3(pagination);
  };

  useEffect(() => {
    fetchDataTarifEureka(eurekaPagination.pageSize, eurekaPagination.current);
    fetchDataTarifMitra(mitraPagination.pageSize, mitraPagination.current);
    fetchDataTarifCustomer(
      customerPagination.pageSize,
      customerPagination.current
    );
    getDataSelectt();
  }, [
    muatKota,
    kotaTujuan,
    JenisKendaraan,
    eurekaPagination,
    currnt,
    currnt2,
    currnt3,
  ]);

  const Eureka = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Jenis Kiriman",
      dataIndex: "jenis_kiriman",
      key: "jenis_kiriman",
      render: (jenis_kiriman) => {
        let tagColor = "";
        if (jenis_kiriman === "Reguler") {
          tagColor = "green";
        } else if (jenis_kiriman === "Reguler") {
          tagColor = "green";
        } else if (jenis_kiriman === "Charter") {
          tagColor = "blue";
        } else if (jenis_kiriman === "Express") {
          tagColor = "blue";
        }
        return <Tag color={tagColor}>{jenis_kiriman}</Tag>;
      },
    },
    {
      title: "Muat",
      dataIndex: "kotaAsal",
      key: "kotaAsal",
      width: "20%",
    },
    {
      title: "Tujuan",
      dataIndex: "kotaTujuan",
      key: "kotaTujuan",
    },
    {
      title: "Jenis Kendaraan",
      dataIndex: "kendaraanJenis",
      key: "kendaraanJenis",
    },
    {
      title: "Tarif",
      dataIndex: "tarif",
      key: "tarif",
      render: (tarif) => formatRupiah(tarif),
    },
  ];

  const Mitra = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Jenis Kiriman",
      dataIndex: "jenis_kiriman",
      key: "jenis_kiriman",
      render: (jenis_kiriman) => {
        let tagColor = "";
        if (jenis_kiriman === "Reguler") {
          tagColor = "green";
        } else if (jenis_kiriman === "Reguler") {
          tagColor = "green";
        } else if (jenis_kiriman === "Charter") {
          tagColor = "blue";
        } else if (jenis_kiriman === "Express") {
          tagColor = "blue";
        }
        return <Tag color={tagColor}>{jenis_kiriman}</Tag>;
      },
    },
    {
      title: "Mitra",
      dataIndex: "mitra",
      key: "mitra",
      width: "20%",
    },
    {
      title: "Muat",
      dataIndex: "kotaAsal",
      key: "kotaAsal",
      width: "20%",
    },
    {
      title: "Tujuan",
      dataIndex: "kotaTujuan",
      key: "kotaTujuan",
    },
    {
      title: "Jenis Kendaraan",
      dataIndex: "kendaraanJenis",
      key: "kendaraanJenis",
    },
    {
      title: "Tarif",
      dataIndex: "tarif",
      key: "tarif",
      render: (tarif) => formatRupiah(tarif),
    },
  ];

  const Customer = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Jenis Kiriman",
      dataIndex: "jenisKiriman",
      key: "jenisKiriman",
      render: (jenisKiriman) => {
        let tagColor = "";
        if (jenisKiriman === "Reguler") {
          tagColor = "green";
        } else if (jenisKiriman === "Reguler") {
          tagColor = "green";
        } else if (jenisKiriman === "Charter") {
          tagColor = "blue";
        } else if (jenisKiriman === "Express") {
          tagColor = "blue";
        }
        return <Tag color={tagColor}>{jenisKiriman}</Tag>;
      },
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      width: "20%",
    },
    {
      title: "Muat",
      dataIndex: "kotaAsal",
      key: "kotaAsal",
      width: "20%",
    },
    {
      title: "Tujuan",
      dataIndex: "kotaTujuan",
      key: "kotaTujuan",
    },
    {
      title: "Jenis Kendaraan",
      dataIndex: "kendaraanJenis",
      key: "kendaraanJenis",
    },
    {
      title: "Tarif",
      dataIndex: "biaya_jalan",
      key: "biaya_jalan",
      render: (biaya_jalan) => formatRupiah(biaya_jalan),
    },
  ];

  const formatRupiah = (angka) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(angka);
  };

  const alertStyle = {
    fontFamily: "Arial, sans-serif", // Replace this with your desired font-family
    fontSize: "16px", // Replace this with your desired font size
    fontWeight: "bold", // Replace this with your desired font weight
    color: "black", // Replace this with your desired text color
  };

  return (
    <div>
      <Card>
        <h5>Silahkan Pilih Tarif</h5>
        <hr />
        <Row className="mt-3 mb-4">
          <Col sm={6}>
            <label
              className="mb-2"
              htmlFor="muatKotaSelect"
              style={{ fontFamily: "NoirPro" }}
            >
              Search Muat :
            </label>
            <Select
              value={muatKota}
              name="namaKota"
              showSearch
              optionFilterProp="children"
              placeholder="Select Muat Kota"
              style={{
                width: "100%",

                border: "1px solid #1A5CBF",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
              onChange={(e, options) => {
                console.log(options);
                setMuatKota(options.value);
              }}
            >
              <Select.Option value="">-</Select.Option>
              {muatKotaOptionSelect &&
                muatKotaOptionSelect.muatKota.map((item, index) => (
                  <Select.Option value={item.idKota}>
                    {item.namaKota}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col sm={6}>
            <label
              className="mb-2"
              htmlFor="muatKotaSelect"
              style={{ fontFamily: "NoirPro" }}
            >
              Search Tujuan :
            </label>
            <Select
              value={kotaTujuan}
              name="kotaTujuan"
              showSearch
              optionFilterProp="children"
              placeholder="Select Muat Kota"
              style={{
                width: "100%",

                border: "1px solid #1A5CBF",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
              onChange={(e, options) => {
                console.log(options);
                setKotaTujuan(options.value);
              }}
            >
              <Select.Option value="">-</Select.Option>
              {kotaTujuannOptionSelect &&
                kotaTujuannOptionSelect.tujuanKota.map((item, index) => (
                  <Select.Option value={item.idKota}>
                    {item.namaKota}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col sm={6}>
            <label
              className="mb-2"
              htmlFor="muatKotaSelect"
              style={{ fontFamily: "NoirPro" }}
            >
              Search Jenis Kendaraan :
            </label>
            <Select
              value={JenisKendaraan}
              name="jenisKendaraan"
              showSearch
              optionFilterProp="children"
              placeholder="Select Jenis Kendaraan"
              style={{
                width: "100%",

                border: "1px solid #1A5CBF",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
              onChange={(e, options) => {
                console.log(options);
                setJenisKendaraan(options.value);
              }}
            >
              <Select.Option value="">-</Select.Option>
              {jenisKendaraanOptionSelect &&
                jenisKendaraanOptionSelect.jenisKendaraan.map((item, index) => (
                  <Select.Option value={item.idjenisKendaraan}>
                    {item.jenisKendaraan}
                  </Select.Option>
                ))}
            </Select>
          </Col>
        </Row>
      </Card>
      {/* Tarif Eureka */}
      {muatKota && kotaTujuan && JenisKendaraan ? (
        // Display the table when all conditions are met
        <div>
          <Card>
            <h5>Data Tarif Eureka</h5>
            <hr />
            <Table
              dataSource={listData}
              columns={Eureka}
              scroll={{
                x: 800,
              }}
              pagination={{
                total: totalDataEureka,
                onChange: handleEurekaTableChange,
              }}
            />
          </Card>
        </div>
      ) : (
        // Display the alert when any of the conditions is not met
        <div style={alertStyle}>
          <Alert
            message="Pilih terlebih dahulu filter Muat, Bongkar & Jenis Kendaraan!"
            type="info"
            showIcon
          />
        </div>
      )}
      {/* Tarif Mitra */}
      {muatKota && kotaTujuan && JenisKendaraan && (
        <Card>
          <h5>Data Tarif Mitra</h5>
          <hr />
          <Table
            dataSource={DataTarifMitra}
            columns={Mitra}
            scroll={{
              x: 800,
            }}
            pagination={{
              // current: mitraPagination.current,
              // pageSize: mitraPagination.pageSize,
              total: totalDataMitra, // Set the total number of items here
              onChange: handleMitraTableChange,
            }}
          />
        </Card>
      )}

      {/* Tarif Customer */}

      {muatKota && kotaTujuan && JenisKendaraan && (
        <Card>
          <h5>Data Tarif Customer</h5>
          <hr />
          <Table
            dataSource={DataTarifCustomer}
            columns={Customer}
            scroll={{
              x: 800,
            }}
            pagination={{
              // current: customerPagination.current,
              // pageSize: customerPagination.pageSize,
              total: totalDataCustomer, // Set the total number of items here
              onChange: handleCustomerTableChange,
            }}
          />
        </Card>
      )}
    </div>
  );
}

export default Tarif;
