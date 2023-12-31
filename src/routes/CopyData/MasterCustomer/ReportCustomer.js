import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Table,
  Tag,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../Api/BaseUrl";
import { BookOutlined } from "@ant-design/icons";
import XLSX from "xlsx";
import tableStyle from "./tableStyle.css";
import { useHistory } from "react-router-dom";

function ReportCustomer() {
  const [DataReportCust, setDataReportCust] = useState("");
  const history = useHistory();
  const [GetSelectData, setGetSelectData] = useState("");
  const [Customers, setCustomers] = useState("");
  const [TanggalPickUp, setTanggalPickUp] = useState("");
  const [TanggalPemesanan, setTanggalPemesanan] = useState("");
  const [CustomersOptions, setCustomersOptions] = useState("");
  const [PickupOptions, setPickUpOptions] = useState("");
  const [PemesananOptions, setPemesananOptions] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [DataBUOptions, setDataBUOptions] = useState("");
  const [DataBU, setDataBU] = useState("");
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [CariDestination, setCariDestination] = useState("");
  const [Keyword, setKeyword] = useState("");
  const [CariTanggal, setCariTanggal] = useState({
    tgl_pickup: "",
    tgl_bongkar: "",
  });

  console.log(`CariTanggal`, CariTanggal);

  const fetchData = async () => {
    try {
      const respons = await axios.get(
        `${Baseurl}customer/get-report-customer?limit=${limit}&page=${currentPage}&keyword=${Keyword}&statusSP=&customerId=${Customers}&cabang=&sales=&buId=${DataBU}&tgl_pickup=${CariTanggal?.tgl_pickup}&tgl_bongkar=${CariTanggal?.tgl_bongkar}&destination=${CariDestination}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("responssssscarismid", respons.data.data.totalPage);
      setDataReportCust(respons.data.data.order);
      setTotal(respons.data.data.totalData);
      // setCurrentPage(respons.data.data.setCurrentPage)
    } catch (error) {}
  };

  const getDataSelectt = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}customer/get-select-customer`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // setMuatKotaOptionsSelect (response.data);
      console.log(response.data);
      setCustomersOptions(response.data);

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

  const getDataSelectBU = async () => {
    try {
      const response = await axios.get(`${Baseurl}customer/get-bu-customer`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      // setMuatKotaOptionsSelect (response.data);
      console.log(response.data.data, "ini bu");
      setDataBUOptions(response.data.data);

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

  useEffect(() => {
    fetchData();
    getDataSelectt();
    getDataSelectBU();
  }, [
    Customers,
    currentPage,
    limit,
    CariTanggal,
    CariDestination,
    DataBU,
    Keyword,
  ]);

  const dataSource = [
    // {
    //   key: "1",
    //   no_sp: "SP00013/01/23/JKT",
    //   no_spk: "JKT23-000010",
    //   sales: "M. Iqbal",
    //   service: "Charter",
    //   jenis_barang: "Buku",
    //   via: "Darat",
    //   kendaraan: "Wingbox",
    //   status: "Batal",
    //   nama_perusahaan: "Sari Agrotama Persada,PT",
    //   penginput: "Amelia D. N.",
    //   tgl_pickup: "01/01/2023 16:19:00",
    //   tgl_pesan: "01/01/2023 16:20:00",
    //   biaya: "4025000",
    // },
    // {
    //   key: "2",
    //   no_sp: "SP00014/01/23/JKT",
    //   no_spk: "JKT23-000009",
    //   sales: "M. Iqbal",
    //   service: "Charter",
    //   jenis_barang: "Buku",
    //   via: "Darat",
    //   kendaraan: "Wingbox",
    //   status: "Aktif",
    //   nama_perusahaan: "PT. Wilmar Cahaya Indonesia Tbk",
    //   penginput: "Amelia D. N.",
    //   tgl_pickup: "01/01/2023 16:23:00",
    //   tgl_pesan: "02/01/2023 16:23:00",
    //   biaya: "2875000",
    // },
  ];

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "No SP",
      dataIndex: "sp",
      key: "sp",
      render: (sp) => <Tag color="blue">{sp}</Tag>,
    },
    // {
    //   title: "No SPK",
    //   dataIndex: "spk",
    //   key: "spk",
    //   render: (spk) => <Tag color="volcano">{spk}</Tag>,
    // },
    {
      title: "Nama Sales",
      dataIndex: "salesName",
      key: "salesName",
    },
    // {
    //   title: "Service",
    //   dataIndex: "service",
    //   key: "service",
    // },
    // {
    //   title: "Jenis Barang",
    //   dataIndex: "jenisBarang",
    //   key: "jenisBarang",
    // },
    // {
    //   title: "Via",
    //   dataIndex: "via",
    //   key: "via",
    // },
    {
      title: "Jenis Kendaraan",
      dataIndex: "kendaraan",
      key: "kendaraan",
    },
    // {
    //   title: "Status",
    //   dataIndex: "starus",
    //   key: "starus",
    //   render: (starus) => (
    //     <Tag color={starus === "Aktif" ? "green" : "red"}>{starus}</Tag>
    //   ),
    // },
    {
      title: "Nama Perusahaan",
      dataIndex: "perusahaan",
      key: "perusahaan",
    },
    // {
    //   title: "Nama Penginput",
    //   dataIndex: "adminName",
    //   key: "adminName",
    // },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: "Tgl Pickup",
      dataIndex: "pickupDate",
      key: "pickupDate",
      render: (pickupDate) => {
        // Mengubah format tgl pickup menjadi "YYYY-MM-DD HH:mm:ss" dengan zona waktu Indonesia
        const formattedPickUp = new Date(pickupDate).toLocaleString("id-ID", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        // Ganti karakter '/' dengan karakter '-'
        const formattedPickUpWithHyphen = formattedPickUp.replace(/\//g, "-");

        // Ganti karakter titik (.) dengan karakter titik dua (:)
        const formattedPickUpWithColon = formattedPickUpWithHyphen.replace(
          /\./g,
          ":"
        );

        return <Tag color="magenta">{formattedPickUpWithColon}</Tag>;
      },
    },
    {
      title: "Tgl Pesanan",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (orderDate) => {
        // Mengubah format tgl pesanan menjadi "YYYY-MM-DD HH:mm:ss"
        const formattedOrderDate = new Date(orderDate).toLocaleString("id-ID", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        const formattedOrderDateWithHyphen = formattedOrderDate.replace(
          /\//g,
          "-"
        );
        const formattedOrderDateWithColon =
          formattedOrderDateWithHyphen.replace(/\./g, ":");

        return <Tag color="purple">{formattedOrderDateWithColon}</Tag>;
      },
    },
    {
      title: "Biaya",
      dataIndex: "biaya",
      key: "biaya",
      render: (biaya) => (
        <span>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(biaya)}
        </span>
      ),
    },
  ];

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const sheetData = DataReportCust.map((item, index) => ({
      "No.": index + 1,
      "No SP": item.sp,
      "No SPK": item.spk,
      "Nama Sales": item.salesName,
      Service: item.service,
      "Jenis Barang": item.jenisBarang,
      "Jenis Kendaraan": item.kendaraan,
      Status: item.starus,
      "Nama Perusahaan": item.perusahaan,
      "Nama Penginput": item.adminName,
      Destination: item.destination,
      "Tgl Pickup": formatPickUpForExport(item.pickupDate),
      "Tgl Pesanan": formatOrderDateForExport(item.orderDate),
      Biaya: item.biaya,
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);

    // Set column widths
    worksheet["!cols"] = [
      { width: 5 }, // No.
      { width: 20 }, // No SP
      { width: 20 }, // No SPK
      { width: 20 }, // Nama Sales
      { width: 15 }, // Service
      { width: 15 }, // Jenis Barang
      { width: 16 }, // Jenis Kendaraan
      { width: 12 }, // Status
      { width: 27 }, // Nama Perusahaan
      { width: 17 }, // Nama Penginput
      { width: 32 }, // Destination
      { width: 30 }, // Tgl Pickup
      { width: 30 }, // Tgl Pesanan
      { width: 13 }, // Biaya
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "report.xlsx");
  };

  function formatOrderDateForExport(orderDate) {
    const formattedOrderDate = new Date(orderDate).toLocaleString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Ganti karakter '/' dengan karakter '-'
    const formattedOrderDateWithHyphen = formattedOrderDate.replace(/\//g, "-");

    // Ganti karakter titik (.) dengan karakter titik dua (:)
    const formattedOrderDateWithColon = formattedOrderDateWithHyphen.replace(
      /\./g,
      ":"
    );

    return formattedOrderDateWithColon;
  }

  function formatPickUpForExport(pickupDate) {
    const formattedPickUp = new Date(pickupDate).toLocaleString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Ganti karakter '/' dengan karakter '-'
    const formattedPickUpWithHyphen = formattedPickUp.replace(/\//g, "-");

    // Ganti karakter titik (.) dengan karakter titik dua (:)
    const formattedPickUpWithColon = formattedPickUpWithHyphen.replace(
      /\./g,
      ":"
    );

    return formattedPickUpWithColon;
  }

  const RowClick = (record, index) => {
    console.log(record, index);
    window.open(`/masterdata/splistdetailakunting/${record.idmp}`, "_blank");
    // history.push(`/masterdata/splistdetailakunting/${record.idmp}`);
  };

 

  return (
    <div>
      <Card>
        <h5>Report Customer</h5>
        <hr />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={4} lg={4}>
            <label
              className="mb-2"
              htmlFor="muatKotaSelect"
              style={{ fontWeight: "bold", fontFamily: "NoirPro" }}
            >
              Search Nama Perusahaan :
            </label>
            <Select
              value={Customers}
              name="customerName"
              optionFilterProp="children"
              placeholder="Select Customer"
              showSearch
              style={{
                width: "100%",
                border: "1px solid #1A5CBF",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
              onChange={(e, options) => {
                console.log(options);
                setCustomers(options.value);
              }}
            >
              <Select.Option value="">-</Select.Option>
              {CustomersOptions &&
                CustomersOptions.customer.map((item, index) => (
                  <Select.Option value={item.customerId} key={item.customerId}>
                    {item.customerName}
                  </Select.Option>
                ))}
            </Select>
          </Col>

          <Col xs={24} sm={12} md={4} lg={4}>
            <label
              className="mb-2"
              htmlFor="muatKotaSelect"
              style={{ fontWeight: "bold", fontFamily: "NoirPro" }}
            >
              Search Tanggal Mulai :
            </label>
            <DatePicker
              onChange={(date, dateString) => {
                setCariTanggal((prevState) => ({
                  ...prevState,
                  tgl_pickup: dateString,
                }));
              }}
              showSearch
              style={{
                width: "100%",
                border: "1px solid #1A5CBF",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={4} lg={4}>
            <label
              className="mb-2"
              htmlFor="muatKotaSelect"
              style={{ fontWeight: "bold", fontFamily: "NoirPro" }}
            >
              Search Tanggal Selesai :
            </label>
            <DatePicker
              onChange={(date, dateString) => {
                setCariTanggal((prevState) => ({
                  ...prevState,
                  tgl_bongkar: dateString,
                }));
              }}
              showSearch
              style={{
                width: "100%",
                border: "1px solid #1A5CBF",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            ></DatePicker>
          </Col>
          <Col xs={24} sm={12} md={4} lg={4}>
            <label
              className="mb-2"
              style={{ fontWeight: "bold", fontFamily: "NoirPro" }}
            >
              Cari BU :
            </label>
            <Select
              value={DataBU}
              name="customerName"
              optionFilterProp="children"
              placeholder="Select Customer"
              showSearch
              style={{
                width: "100%",
                border: "1px solid #1A5CBF",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
              onChange={(e, options) => {
                console.log(options);
                setDataBU(options.value);
              }}
            >
              <Select.Option value="">-</Select.Option>
              {DataBUOptions &&
                DataBUOptions.map((item, index) => (
                  <Select.Option value={item.id_bu} key={item.id_bu}>
                    {item.name_bu}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4} lg={4}>
            <label
              style={{
                width: "100%",
                fontWeight: "bold",
                fontFamily: "NoirPro",
              }}
              className="mb-2 "
            >
              Search Destination :
            </label>
            <Input
              style={{
                width: "10  0%",
                border: "1px solid #1A5CBF",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
              onChange={(e) => {
                setCariDestination(e.target.value);
              }}
              placeholder="Search Destination"
            ></Input>
          </Col>
          <Col xs={24} sm={12} md={4} lg={4}>
            <label
              style={{
                width: "100%",
                fontWeight: "bold",
                fontFamily: "NoirPro",
              }}
              className="mb-2 "
            >
              Search Nomor SP :
            </label>
            <Input
              style={{
                width: "10  0%",
                border: "1px solid #1A5CBF",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              placeholder="Search Nomor SP"
            ></Input>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            className="mt-4 d-flex justify-content-end"
          >
            {" "}
            <Button
              style={{ backgroundColor: "green", color: "white" }}
              onClick={exportToExcel}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                Export Excel
              </span>
            </Button>
          </Col>
        </Row>

        <Table
          size="sm"
          className="mt-3 responsive-table"
          style={{ overflowX: "auto" }}
          dataSource={DataReportCust}
          onRow={(record, index) => {
            return {
              onClick: () => RowClick(record, index),
              style: {
                cursor: "pointer",
              },
            };
          }}
          customStyles={{
            headCells: {
              style: {
                backgroundColor: "#1a5cbf",
                color: "#fff",
                width: "100%",
              },
            },
          }}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: limit,
            total,
            onChange: (page) => setCurrentPage(page),
          }}
          onChange={(pagination) => {
            setCurrentPage(pagination.current);
            setLimit(pagination.pageSize);
          }}
        />
      </Card>
    </div>
  );
}

export default ReportCustomer;
