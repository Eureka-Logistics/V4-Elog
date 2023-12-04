import { FileExcelOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  Popconfirm,
  Row,
  Select,
  Table,
  Tag,
  notification,
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
    } catch (error) { }
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
      title: "SM/SP",
      dataIndex: "sm",
      key: "sm",
      render: (text, record) =>
        <>
          <Tag color="blue">{record.sm}</Tag>
          <Tag color="green">{record.sp}</Tag>
        </>
    },
    {
      title: "Rute",
      dataIndex: "destination",
      key: "destination",
      render: (text, record) =>
        <>
          <Tag color="red">{record.destination}</Tag>
          <Tag color="orange">{record.sekolahTujuan}</Tag>
        </>
    },

    {
      title: "Driver",
      dataIndex: "nopol",
      key: "nopol",
      render: (text, record) =>
        <div style={{  }}>
          <Tag color="purple">{record.driver}</Tag>
          <Tag color="red">{record.jenis_kendaraan}</Tag>
          <Tag color="yellow">{record.nopol}</Tag>
        </div>
    },
    {
      title: "Tgl Muat",
      dataIndex: "pickupDate",
      key: "pickupDate",
      render: (text, record) => 
      <div style={{ whiteSpace: "nowrap" }}>
      <Tag color="yellow">{record.pickupDate}</Tag>
      </div>
    },
    {
      title: "onProcess",
      dataIndex: "onProcess",
      render: (text, record) => {
        const datanya = {
          "keterangan": "Menerima pesanan",
          "status": "on Procees",
          "statusId": 1
        }
        if (record?.onProcess !== "-") {
          return  <div style={{ whiteSpace: "nowrap" }}>
         <Tag color="green">{record.onProcess}</Tag> </div>; // Render the onProcess value
        } else {
          // Render Popconfirm with Button when record.onProcess is falsy
          return (
            <Popconfirm
              title="Yakin untuk confirm?"
              onConfirm={() => {
                StatusDriver(record, datanya);
                // setModal1Open(true);
                // setCurrentTitle("onProcess");
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" type="primary">
                OK
              </Button>
            </Popconfirm>
          );
        }
      },
    },

    {
      title: "OnPickup",
      dataIndex: "onPickup",
      key: "onPickup",
      render: (text, record) => {
        const onPickup = record?.onPickup
        const datanya = {
          "keterangan": "Tiba di lokasi muat",
          "status": "on Pickup",
          "statusId": 2
        }
        if (onPickup != "-") {
          return <div style={{ whiteSpace: "nowrap" }}> <Tag color="green">{onPickup}</Tag></div>;
         
        } else {
          return (
            <Popconfirm
              title="Yakin untuk confirm?"
              onConfirm={() => {
                StatusDriver(record, datanya);
                // setModal1Open(true);
                // setCurrentTitle("onProcess");
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" type="primary">
                OK
              </Button>
            </Popconfirm>
          );
        }
      },
    },

    {
      title: "Unloading",
      dataIndex: "unloading",
      render: (text, record) => {
        const datanya = {
          "keterangan": "Barang sudah sampai tempat tujuan/bongkar.",
          "status": "unloading",
          "statusId": 5
        }
        if (record?.unloading != "-") {
          return <div style={{ whiteSpace: "nowrap" }}><Tag color="green">{record.unloading}</Tag></div>; // Render the onPickup value
        } else {
          // Render the Button when record.onPickup is falsy
          return (
            <Popconfirm
              title="Yakin untuk confirm?"
              onConfirm={() => {
                StatusDriver(record, datanya);
                // setModal1Open(true);
                // setCurrentTitle("onProcess");
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" type="primary">
                OK
              </Button>
            </Popconfirm>
          );
        }
      },
    },

    {
      title: "onDelivery",
      dataIndex: "onDelivery",
      render: (text, record) => {
        const datanya = {
          keterangan: "Dalam Perjalanan Menuju Bongkar",
          status: "on Delivery",
          statusId: 3
        };

        if (record?.onDelivery != "-") {
          return <div style={{ whiteSpace: "nowrap" }}><Tag color="green">{record.onDelivery}</Tag></div>; // Render the onPickup value
        } else {
          // Render the Button when record.onPickup is falsy
          return (
            <Popconfirm
              title="Yakin untuk confirm?"
              onConfirm={() => {
                StatusDriver(record, datanya);
                // setModal1Open(true);
                // setCurrentTitle("onProcess");
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" type="primary">
                OK
              </Button>
            </Popconfirm>
          );
        }
      },
    },

    {
      title: "Succes Bongkar",
      dataIndex: "SuccesBongkar",
      key: "SuccesBongkar",
      render: (text, record) => {
        const datanya = {
          keterangan: "Barang sudah diterima dengan Jumlah Lengkap",
          status: "Success",
          statusId: 9
        };
        if (record?.SuccesBongkar != "-") {
          return <div style={{ whiteSpace: "nowrap" }}><Tag color="green">{record.SuccesBongkar}</Tag></div>; // Render the onPickup value
        } else {
          // Render the Button when record.onPickup is falsy
          return (
            <Popconfirm
              title="Yakin untuk confirm?"
              onConfirm={() => {
                StatusDriver(record, datanya);
                // setModal1Open(true);
                // setCurrentTitle("onProcess");
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" type="primary">
                OK
              </Button>
            </Popconfirm>
          );
        }
      },
    },
    {
      title: "Document Complete",
      dataIndex: "DocumentComplete",
      key: "DocumentComplete",
      render: (text, record) => {
        const datanya = {
          keterangan: "Dokumen diserahkan telah diterima customer",
          status: "Doc Complete",
          statusId: 19
        };

        if (record?.DocumentComplete != "-") {
          return <div style={{ whiteSpace: "nowrap" }}><Tag color="green">{record.DocumentComplete}</Tag></div>; // Render the onPickup value
        } else {
          // Render the Button when record.onPickup is falsy
          return (
            <Popconfirm
              title="Yakin untuk confirm?"
              onConfirm={() => {
                StatusDriver(record, datanya);
                // setModal1Open(true);
                // setCurrentTitle("onProcess");
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" type="primary">
                OK
              </Button>
            </Popconfirm>
          );
        }
      },
    },
  ];

  const OptionStatus = async () => {
    const data = await axios.get(`${BaseUrlRace}sp/get-option-status`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
    console.log(data.data.data);
  }
  const StatusDriver = async (a, b) => {
    console.log(`log dari klik untuk post`, a);
    console.log(`log dari klik untuk post b `, b);
    OptionStatus()
    const body = {
      "id_kendaraan": a.idkendaraan,
      "no_polisi": a.nopol,
      "id_pengemudi": a.driverId,
      "nama_driver": a.driver,
      "id_msm": a.idMsm,
      "action": b.statusId, //id status
      "empty_load": b.status,// status nya apa
      "keterangan": b.keterangan,// keterangan status
      "customer": a.customer,
      "posisi": "",// sring kosong
      "longitude": "106.821810",
      "latitude": "-6.193125",
      "tujuan": a.destination
    }
    const data = await axios.post(`${BaseUrlRace}sp/add-status-driver`, body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
    notification.success({
      message: "Sukses",
      description: data.data.status.message,
    })
    console.log(data.data.status.message);
    fetchData()
  }

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
        { wch: 12 }, // IDKendaraan
        { wch: 13 }, // NoPol
        { wch: 18 }, // jenis Kendaraan
        { wch: 34 }, // Customer
        { wch: 20 }, // OnProsess
        { wch: 20 }, // OnPickUp 
        { wch: 20 }, // OnDeliv
        { wch: 20 }, // OnLoad
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
