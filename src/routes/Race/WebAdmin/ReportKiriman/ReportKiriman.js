import { FileExcelOutlined } from "@ant-design/icons";
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
import React, { useEffect, useState } from "react";
import ModalOKE from "./ModalOke";
import ModalMemo from "./ModalMemo";
import { BaseUrlRace } from "../../../../Api/BaseUrl";
import axios from "axios";
import * as XLSX from "xlsx";

function ReportKiriman() {
  const [modal1Open, setModal1Open] = useState(false);
  const [ModalMemoOpen, setModalMemoOpen] = useState(false);
  const [judulModal, setCurrentTitle] = useState("");
  const [GetData, setGetData] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [exporting, setExporting] = useState(false);

  const fetchData = async () => {
    try {
      const respons = await axios.get(
        `${BaseUrlRace}sp/get-monitoring?page=${currentPage}&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("resposndata", respons.data.data.totalData);
      setGetData(respons.data.data.order);
      setTotal(respons.data.data.totalData);
      // setCurrentPage(respons.data.data.setCurrentPage)
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, [limit, currentPage]);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "SM",
      dataIndex: "sm",
      key: "sm",
      render: (text, record) => <Tag color="blue">{record.sm}</Tag>,
    },
    {
      title: "SP",
      dataIndex: "sp",
      key: "sp",
      render: (text, record) => <Tag color="green">{record.sp}</Tag>,
    },
    {
      title: "Cust",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Rute",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    // {
    //   title: "Alamat Muat",
    //   dataIndex: "alamatMuat",
    //   key: "alamatMuat",
    // },
    // {
    //   title: "Alamat Muat",
    //   dataIndex: "alamatMuat",
    //   key: "alamatMuat",
    // },
    // {
    //   title: "Alamat Bongkar",
    //   dataIndex: "alamatBongkar",
    //   key: "alamatBongkar",
    // },
    {
      title: "Sekolah Tujuan",
      dataIndex: "sekolahTujuan",
      key: "sekolahTujuan",
    },
    {
      title: "No Plat",
      dataIndex: "nopol",
      key: "nopol",
      render: (text, record) => <Tag color="magenta">{record.nopol}</Tag>,
    },
    {
      title: "Pengemudi",
      dataIndex: "driver",
      key: "driver",
    },
    {
      title: "Tgl Muat",
      dataIndex: "pickupDate",
      key: "pickupDate",
      render: (text, record) => <Tag color="yellow">{record.pickupDate}</Tag>,
    },
    {
      title: "OnPickup",
      dataIndex: "onPickup",
      key: "onPickup",
      render: (text, record) => (
        <Button
          onClick={() => {
            setModal1Open(true);
            setCurrentTitle("OnPickup");
          }}
          size="small"
          type="primary"
        >
          OK
        </Button>
      ),
    },
    {
      title: "Unloading",
      dataIndex: "address",
      render: (text, record) => (
        <Button
          onClick={() => {
            setModal1Open(true);
            setCurrentTitle("Unloading");
          }}
          size="small"
          type="primary"
        >
          OK
        </Button>
      ),
    },
    {
      title: "Success",
      dataIndex: "address",
      render: (text, record) => (
        <Button
          onClick={() => {
            setModal1Open(true);
            setCurrentTitle("Success");
          }}
          size="small"
          type="primary"
        >
          OK
        </Button>
      ),
    },
    {
      title: "Memo",
      dataIndex: "address",
      key: "address",
      render: (text, record) => (
        <Button
          onClick={() => {
            setModalMemoOpen(true);
            setCurrentTitle(text);
            console.log(text);
          }}
          size="small"
          type="primary"
        >
          Memo SJ
        </Button>
      ),
    },
  ];
  const dataSource = [
    {
      key: "1",
      sm: "JKT23-010445",
      cust: "PT. Arindo Pacific Chemicals",
      rute: "BOGOR-Tangerang",
      brg: "LEM",
      berat: "10000",
      mitra: "PT. EUREKA LOGISTICS (EL)",
      noPlat: "B 9848 U",
      pengemudi: "Radius Aprianto",
      tglMuat: "06 Oct 2023",
    },
    {
      key: "2",
      sm: "JKT23-010445",
      cust: "PT. Arindo Pacific Chemicals",
      rute: "BOGOR-Tangerang",
      brg: "LEM",
      berat: "10000",
      mitra: "PT. EUREKA LOGISTICS (EL)",
      noPlat: "B 9848 U",
      pengemudi: "Radius Aprianto",
      tglMuat: "06 Oct 2023",
    },
    {
      key: "3",
      sm: "JKT23-010445",
      cust: "PT. Arindo Pacific Chemicals",
      rute: "BOGOR-Tangerang",
      brg: "LEM",
      berat: "10000",
      mitra: "PT. EUREKA LOGISTICS (EL)",
      noPlat: "B 9848 U",
      pengemudi: "Radius Aprianto",
      tglMuat: "06 Oct 2023",
    },
    {
      key: "4",
      sm: "JKT23-010445",
      cust: "PT. Arindo Pacific Chemicals",
      rute: "BOGOR-Tangerang",
      brg: "LEM",
      berat: "10000",
      mitra: "PT. EUREKA LOGISTICS (EL)",
      noPlat: "B 9848 U",
      pengemudi: "Radius Aprianto",
      tglMuat: "06 Oct 2023",
    },
    {
      key: "5",
      sm: "JKT23-010445",
      cust: "PT. Arindo Pacific Chemicals",
      rute: "BOGOR-Tangerang",
      brg: "LEM",
      berat: "10000",
      mitra: "PT. EUREKA LOGISTICS (EL)",
      noPlat: "B 9848 U",
      pengemudi: "Radius Aprianto",
      tglMuat: "06 Oct 2023",
    },
  ];

  const exportToExcel = async (page = 1) => {
    try {
      setExporting(true);
      const response = await axios.get(
        `${BaseUrlRace}sp/get-monitoring?page=${currentPage}&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setExporting(false);
      const data = response.data.data.order; // Assuming this is the array you want to export

      // Convert data to Excel format
      const ws = XLSX.utils.json_to_sheet(data);

       const columnWidths = [
        { wch: 5 }, // no
        { wch: 10 }, // idmp
        { wch: 20 }, // sm
        { wch: 20 }, // sp
        { wch: 15 }, // service
        { wch: 65 }, // Alamat Muat
        { wch: 65 }, // Alamat Bongkar
        { wch: 40 }, // sekolah
        { wch: 35 }, // sales
        { wch: 15 }, // PickUpDate
        { wch: 26 }, // Destination
        { wch: 21 }, // Driver
        { wch: 21 }, // Driver
        { wch: 12}, // IDKendaraan
        { wch: 13}, // NoPol
        { wch: 18}, // jenis Kendaraan
        { wch: 34}, // Customer
        { wch: 20}, // OnProsess
        { wch: 20}, // OnPickUp 
        { wch: 20}, // OnDeliv
        { wch: 20}, // OnLoad
        // Add more objects for additional columns as needed
      ];


      // Apply width to specific columns
      ws["!cols"] = columnWidths;

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // Save the Excel file
      XLSX.writeFile(wb, "Export_Data_Monitoring.xlsx");
    } catch (error) {
      // Handle error
      setExporting(false);
      console.error("Error exporting data: ", error);
    }
  };

  return (
    <div>
      <Card>
        <h4>
          Monitoring Kiriman <i>Race</i>
        </h4>
        <hr />
        <Row gutter={[16, 16]}>
          <Col sm={12} md={4} xs={24} lg={4}>
            <div>
              <label style={{ fontWeight: "bold" }}>BU</label>
              <Select
                placeholder="Pt Eureka Logistics (LOG)"
                style={{ width: "100%" }}
              ></Select>
            </div>
          </Col>
          <Col sm={12} md={4} xs={24} lg={4}>
            <div>
              <label style={{ fontWeight: "bold" }}>Cabang</label>
              <Select
                placeholder="Semua Cabang"
                style={{ width: "100%" }}
              ></Select>
            </div>
          </Col>
          <Col sm={12} md={4} xs={24} lg={4}>
            <div>
              <label style={{ fontWeight: "bold" }}>Mitra</label>
              <Select
                placeholder="Semua Mitra"
                style={{ width: "100%" }}
              ></Select>
            </div>
          </Col>
          <Col sm={12} md={4} xs={24} lg={4}>
            <div>
              <label style={{ fontWeight: "bold" }}>Customer</label>
              <Select
                placeholder="Semua Customer"
                style={{ width: "100%" }}
              ></Select>
            </div>
          </Col>
          <Col sm={12} md={4} xs={24} lg={4}>
            <div>
              <label style={{ fontWeight: "bold" }}>Mulai</label>
              <DatePicker style={{ width: "100%" }}></DatePicker>
            </div>
          </Col>
          <Col sm={12} md={4} xs={24} lg={4}>
            <div>
              <label style={{ fontWeight: "bold" }}>Selesai</label>
              <DatePicker style={{ width: "100%" }}></DatePicker>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col sm={12} md={4} xs={24} lg={4} className="mt-2">
            <div>
              <label style={{ fontWeight: "bold" }}>Sukses Pengiriman</label>
              <Select
                placeholder="Semua Sukses"
                style={{ width: "100%" }}
              ></Select>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className="mt-2">
          <Col span={12} className="d-flex justify-content-end"></Col>
          <Col
            sm={12}
            md={12}
            xs={24}
            lg={12}
            className="d-flex justify-content-end"
          >
            <Button
            style={{
              backgroundColor: "green",
              color: "white",
              fontFamily: "NoirPro",
            }}
            onClick={exportToExcel}
            disabled={exporting} // Disable the button when exporting is in progress
          >
            {exporting ? "Exporting..." : "Export to Excel"}
          </Button>
            {/* <Button
              style={{
                backgroundColor: "#00a65a",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileExcelOutlined />
            </Button> */}
            <Input
              placeholder="Cari Report"
              className="mb-3"
              style={{ width: "50%" }}
            />
          </Col>
        </Row>
        <Table className="d-flex"
          style={{ overflowX: "auto" }}
          dataSource={GetData}
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
        <ModalOKE
          judulModal={judulModal}
          setModal1Open={setModal1Open}
          modal1Open={modal1Open}
        />
        <ModalMemo
          ModalMemo={ModalMemoOpen}
          setModalMemoOpen={setModalMemoOpen}
          judulModal={judulModal}
        />
      </Card>

    </div>
  );
}

export default ReportKiriman;
