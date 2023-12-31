import { FileExcelOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Image,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Tag,
  Upload,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import ModalOKE from "./ModalOke";
import ModalMemo from "./ModalMemo";
import { BaseUrlRace } from "../../../../Api/BaseUrl";
import axios from "axios";
import * as XLSX from "xlsx";
import ListReportKirimanZustand from "../../../../zustand/Store/Race/fetch/Report Kiriman";

function ReportKiriman() {
  const { fetchData, StatusDriverAcc, data, updatePagination, KeyPencarianApi, tanggal, functionUploadFoto } = ListReportKirimanZustand()
  const [modal1Open, setModal1Open] = useState(false);
  const [ModalMemoOpen, setModalMemoOpen] = useState(false);
  const [judulModal, setCurrentTitle] = useState("");
  const [GetData, setGetData] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);


  useEffect(() => {
    fetchData();
  }, [data.currentPage, data.limit, KeyPencarianApi, tanggal]);
  const [showImage, setShowImage] = useState({});
  const [showImage2, setShowImage2] = useState({});

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
          <Tag color="">{record.destination}</Tag>
          <Tag color="">{record.sekolahTujuan}</Tag>
        </>
    },

    {
      title: "Driver",
      dataIndex: "nopol",
      key: "nopol",
      render: (text, record) =>
        <div style={{}}>
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
          return <div style={{ whiteSpace: "nowrap" }}>
            <Tag color="green">{record.onProcess}</Tag> </div>; // Render the onProcess value
        } else {
          // Render Popconfirm with Button when record.onProcess is falsy
          return (
            <Popconfirm
              title="Yakin untuk confirm?"
              onConfirm={() => {
                StatusDriverAcc(record, datanya);
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
                StatusDriverAcc(record, datanya);
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
          return <div style={{ whiteSpace: "nowrap" }}>
            <Tag color="green">
              {record.onDelivery}</Tag></div>; // Render the onPickup value
        }

        else {
          // Render the Button when record.onPickup is falsy
          return (
            <Popconfirm
              title="Yakin untuk confirm?"
              onConfirm={() => {
                StatusDriverAcc(record, datanya);
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
      render: (text, record, index) => {
        const datanya = {
          "keterangan": "Barang sudah sampai tempat tujuan/bongkar.",
          "status": "unloading",
          "statusId": 5
        };


        const handleFileChange = (e) => {
          const file = e.file?.originFileObj;
          // setImageFile(file);
          console.log("File selected:", file);
          functionUploadFoto(record, file);
        };
        const toggleImage = (idx) => {
          setShowImage2(prevState => ({
            ...prevState,
            [idx]: !prevState[idx],
          }));
        };

        if (record?.unloading != "-" && record?.imageunloading === "-") {
          return (
            <div style={{ whiteSpace: "nowrap" }}>
              <Upload onChange={(e) => handleFileChange(e)}>
                <Button size="small" color="warning" type="danger">
                  Pilih Gambar dan Upload Gambar
                </Button>
              </Upload>
              <br />
              <Tag color="green">{record?.unloading}</Tag>
            </div>
          );
        } else if (record?.imageunloading != "-" && record?.unloading != "-") {
          return (
            <>
              <Button onClick={() => {
                console.log(index);
                toggleImage(index)
              }} size="small" color="warning" type="primary">
                Lihat Gambar
              </Button>
              {showImage2[index] && (
                <Modal
                  open={showImage2}
                  onCancel={() => setShowImage2(false)}
                >
                  <div className="d-flex justify-content-center">
                    <Image
                      width={200}
                      src={record?.imageunloading}
                    />
                  </div>
                </Modal>

              )}
              <Tag color="green">{record?.unloading}</Tag>
            </>
          )
        }

        else {
          return (
            <Popconfirm
              title="Yakin untuk confirm?"
              onConfirm={() => {
                StatusDriverAcc(record, datanya);
                setIsConfirmed(true); // Set confirmation state to true
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
      render: (text, record, index) => {
        const datanya = {
          keterangan: "Barang sudah diterima dengan Jumlah Lengkap",
          status: "Success",
          statusId: 9
        };
        const handleFileChange = (e) => {
          const file = e.file?.originFileObj;
          // setImageFile(file);
          console.log("File selected:", file);
          functionUploadFoto(record, file);
        };
        const toggleImage = (idx) => {
          setShowImage(prevState => ({
            ...prevState,
            [idx]: !prevState[idx],
          }));
        };

        const imagebuka = () => {
          return (
            <Image
              width={200}
              src={record?.imageSuccesBongkar}
            />
          )
        }
        if (record?.SuccesBongkar != "-" && record?.imageSuccesBongkar === "-") {
          return <div style={{ whiteSpace: "nowrap" }}>
            <Upload onChange={(e) => handleFileChange(e)}>
              <Button size="small" color="warning" type="danger"> Pilih Gambar dan Upload Gambar </Button><br />
            </Upload>
            <Tag color="green">{record.SuccesBongkar}</Tag></div>; // Render the onPickup value
        } else if (record?.imageSuccesBongkar != "-" && record?.SuccesBongkar != "-") {
          return (
            <>
              <Button onClick={() => {
                console.log(index);
                toggleImage(index)
              }} size="small" color="warning" type="primary">
                Lihat Gambar
              </Button>
              {showImage[index] && (
                <Modal
                  open={showImage}
                  onCancel={() => setShowImage(false)}
                >
                  <div className="d-flex justify-content-center">
                    <Image
                      width={200}
                      src={record?.imageSuccesBongkar}
                    />
                  </div>
                </Modal>

              )}
              <Tag color="green">{record?.SuccesBongkar}</Tag>
            </>
          )
        }

        else {
          // Render the Button when record.onPickup is falsy
          return (
            <Popconfirm
              title="Yakin untuk confirm?"
              onConfirm={() => {
                StatusDriverAcc(record, datanya);
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
                StatusDriverAcc(record, datanya);
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

  console.log(`KeyPencarianApi`, KeyPencarianApi);
  const exportToExcel = async (page = 1) => {
    try {
      setExporting(true);
      const response = await axios.get(
        `${BaseUrlRace}sp/get-monitoring?page=${currentPage}&limit=${limit}&sekolahTujuan=${KeyPencarianApi}`,
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
        <Row gutter={[16, 16]} style={{ display: "flex", justifyContent: "space-between" }}>
          <Col >
            <label style={{ fontWeight: "bold" }}>Sekolah Tujuan</label>
            <Input
              placeholder="Cari Sekolah Tujuan"
              style={{ width: "100%" }}
              onChange={(e) => { ListReportKirimanZustand.setState({ KeyPencarianApi: e.target.value }) }}
            ></Input>
          </Col>
          <Col>
            <label style={{ fontWeight: "bold" }}>Filter Tanggal</label>
            <DatePicker
              placeholder="Cari Tanggal"
              style={{ width: "100%" }}
              onChange={(e, dateString) => { console.log(e, dateString); ListReportKirimanZustand.setState({ tanggal: dateString }) }}
            ></DatePicker>
          </Col>
          {/* <Col sm={12} md={4} xs={24} lg={4}>
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
          */}
          <Col
            sm={12}
            md={12}
            xs={24}
            lg={12}
            className="d-flex justify-content-end"
          >
            <Button
              className="mt-3 "
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

          </Col>
        </Row>
        {/* <Row gutter={[16, 16]}>
          <Col sm={12} md={4} xs={24} lg={4} className="mt-2">
            <div>
              <label style={{ fontWeight: "bold" }}>Sukses Pengiriman</label>
              <Select
                placeholder="Semua Sukses"
                style={{ width: "100%" }}
              ></Select>
            </div>
          </Col>
        </Row>  */}

        <Table className="d-flex"
          style={{ overflowX: "auto" }}
          dataSource={data?.GetData}
          columns={columns
          }
          loading={!data?.GetData}
          pagination={{
            current: data.currentPage,
            pageSize: data.limit,
            total: data.total,
            onChange: (page, pageSize) => {
              updatePagination(page, pageSize);
            }
          }}
          onChange={(pagination) => {
            console.log(pagination);
            ListReportKirimanZustand.setState({ currentPage: pagination.current });
            setLimit(pagination.pageSize);
          }}
        />

      </Card>

    </div >
  );
}

export default ReportKiriman;
