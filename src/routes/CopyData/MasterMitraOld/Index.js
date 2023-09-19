import { Card, Space, Tag, Pagination, Button, Select, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Col, Row, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useHistory } from "react-router-dom";
import CreateMitraModal from "./CreateMitraModal";
import { httpClient } from "../../../Api/Api";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
} from "@ant-design/icons";
import XLSX from "xlsx";

const SamplePage = () => {
  const history = useHistory();
  const [order, setOrder] = useState([]);
  const [dataapiawal, setDataapiawal] = useState([]);
  const [mitraId, setMitraID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [DataPagination, setDataPagination] = useState("");
  const [SearchData, setSearchData] = useState("");
  const [PilihTahun, setTahun] = useState("");
  const [StatusMitra, setStatusMitra] = useState("");
  const [filter, setFilter] = useState("");

  // const ubahPerHalaman = (perhalaman) => {
  //   fetchData(perhalaman);
  // };

  const columnss = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Mitra Code",
      dataIndex: "mitraCode",
      key: "mitraCode",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (text) => (
          <Tag
            color={
              text === "aktif" ? "green" : text === "tidak aktif" ? "red" : "red"
            }
            title={text === "tidak aktif" ? "Status tidak aktif" : ""}
          >
            {text}
          </Tag>
        ),
      },
    {
      title: "Mitra Name",
      dataIndex: "mitraName",
      key: "mitraName",
    },
    {
      title: "Awal Kontrak",
      dataIndex: "awalKontrak",
      key: "awalKontrak",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Akhir Kontrak",
      dataIndex: "akhirKontrak",
      key: "akhirKontrak",
      render: (text) => <Tag color="red">{text}</Tag>,
    },
    {
      title: "PIC",
      dataIndex: "pic",
      key: "pic",
    },
    {
      title: "Aksi",
      key: "no",
      render: (row) => (
        <Space size="middle">
          <Button onClick={() => buttondetailMitra(row.mitraId)} type="primary">
            <span style={{ display: "flex", alignItems: "center" }}>
              <FormOutlined />
            </span>
          </Button>
          <Button danger onClick={() => handleDelete(row.mitraId)}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <DeleteOutlined />
            </span>
          </Button>
        </Space>
      ),
    },
  ];

  const columns = [
    {
      name: "No.",
      selector: (row) => row.no,
    },
    {
      name: "Mitra Code",
      selector: (row) => <Tag color="blue">{row.mitraCode}</Tag>,
    },
    {
      name: "Status",
      selector: (row) =>
        row.status === "habis kontrak" ? (
          <Tag color="red">Habis Kontrak</Tag>
        ) : row.status === "aktif" ? (
          <Tag color="green">Aktif</Tag>
        ) : row.status === "tidak aktif" ? (
          <Tag color="yellow">Tidak Aktif</Tag>
        ) : (
          ""
        ),
    },
    
    {
      name: "Mitra Name",
      selector: (row) => row.mitraName,

      // width: "100px",
    },
    {
      name: "Mitra Address",
      selector: (row) => row.mitraAddress,
    },
    {
      name: "Awal Kontrak",
      selector: (row) => row.awalKontrak,
    },
    {
      name: "Akhir Kontrak",
      selector: (row) => row.akhirKontrak,
    },

    {
      name: "Pic",
      selector: (row) => row.pic,
      width: "150px",
    },

    {
      name: " Opsi",
      selector: (row) => (
        <>
          <Space size="middle">
            <Button
              onClick={() => buttondetailMitra(row.mitraId)}
              type="primary"
              className="mt-2"
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                <FormOutlined />
              </span>
            </Button>
            <Button
              danger
              onClick={() => handleDelete(row.mitraId)}
              className="mt-2"
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                <DeleteOutlined />
              </span>
            </Button>
          </Space>
        </>
      ),
    },
  ];

  const router = useHistory();

  const handleEdit = (id) => {
    router.push(`/mastermitra/edit/${id}`);
  };

  const buttondetailMitra = (mitraId) => {
    setMitraID(mitraId);
    history.push(`/mastermitradetaill/${mitraId}`);
  };

  const fetchData = async (page = 1, perhalaman = 10) => {
    setLoading(true);
    httpClient

      .get(
        `mitra/get-mitra?limit=${perhalaman}&page=${page}&status=${StatusMitra}`
      )
      .then(({ data }) => {
        if (data.status.code === 200) {
          const dataawal = data.data.order;
          setDataapiawal(dataawal);
          setDataPagination(data.data.totalData);

          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const ubahHalaman = (page) => {
    fetchData(page);
  };

  const handleDelete = (mitraId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this customer?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        const datas = {
          id: mitraId,
        };
        httpClient
          .post(`mitra/del-mitra`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = order.filter((item) => item.mitraId !== mitraId);
              setOrder(newOrder);
              // window.location.reload();
              fetchData();
            }
          })
          .catch(function (error) {
            console.log(error.message);
          });
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    fetchData();
  }, [filter, StatusMitra]);

  // const handlePageChange = (page) => {
  //   setPageInfo((prevPageInfo) => ({
  //     ...prevPageInfo,
  //     currentPage: page,
  //   }));
  // };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const exportToExcel = () => {
    // Map your table data to the format expected by XLSX
    const dataToExport = dataapiawal.map((item, index) => ({
      No: { t: "s", v: index + 1, s: { alignment: { horizontal: "center", vertical: 'center' }, color: { rgb: "6495ED" } } },
      "Mitra Code": {  t: "s",
      v: item.mitraCode,
      s: { alignment: { horizontal: "center" } },},
      "Mitra Name": {  t: "s",
      v: item.mitraName,
      s: { alignment: { horizontal: "center" } },},
      "Status": {  t: "s",
      v: item.status,
      s: { alignment: { horizontal: "center" } },},
     
      "Awal Kontrak": {  t: "s",
      v: item.awalKontrak,
      s: { alignment: { horizontal: "center" } },},
      "Akhir Kontrak": {  t: "s",
      v: item.akhirKontrak,
      s: { alignment: { horizontal: "center" } },},
      "PIC": {  t: "s",
      v: item.pic,
      s: { alignment: { horizontal: "center" } },},
      // Add other columns here as needed
    }));
  
    // Convert the data to a worksheet
    const ws = XLSX.utils.json_to_sheet(dataToExport);
  
    // Set column widths
    ws["!cols"] = [
      { wch: 5 },
      { wch: 15 },
      { wch: 25 },
      { wch: 11 },
      { wch: 25 },
      { wch: 25 },
      { wch: 16 },
    ];
  
    // Create a new workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Table Data");
  
    // Write the workbook to a buffer
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  
    // Create a Blob from the buffer
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  
    // Define the file name
    const fileName = "table_data.xlsx";
  
    // Check if the browser supports saving files
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // For IE
      window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      // For other browsers, create a download link and trigger a click event
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return (
    <div>
      <Card>
        <h5 style={{ color: "#113D7F", fontWeight: "bold" }}>
          Data Master Mitra
        </h5>
        <Row>
          <Col>
            {/* <Row className="d-flex justify-content-end">
              <Col sm={3}>
                <Form.Control
                  placeholder={`Cari kode mitra / Nama Mitra`}
                  onChange={handleFilterChange}
                />
              </Col>
            </Row> */}
            <Row className="mt-3">
              <Col sm={2}>
                <label
                  className="mb-2"
                  htmlFor="StatusMitra"
                  style={{ fontWeight: "400", fontFamily: "NoirPro" }}
                >
                  Search Status:
                </label>
                <Select
                  value={StatusMitra}
                  showSearch
                  placeholder="Select Status"
                  style={{
                    width: "100%",
                    border: "1px solid #1A5CBF",
                    borderRadius: "5px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                  onChange={(e, options) => {
                    console.log(options);
                    setStatusMitra(options.value);
                  }}
                >
                  <option value={"0"}>Tidak Aktif</option>
                  <option value={"1"}>Aktif</option>
                  <option value={"2"}>Habis Kontrak</option>
                </Select>
              </Col>
              <Col sm={10} className="d-flex justify-content-end mt-3">
                <Button style={{color: 'white', backgroundColor: 'green', fontFamily: 'NoirPro'}} onClick={exportToExcel}>
                  Export Excel
                </Button>
                <CreateMitraModal />
              </Col>
            </Row>

            <Table
            style={{ overflow: "auto"}}
            className="mt-3"
              columns={columnss}
              dataSource={dataapiawal}
              pagination={false}
            />
            {/* <DataTable
              className="mt-3"
              columns={columns}
              data={dataapiawal}
             
            /> */}
            <div className="mt-5 d-flex justify-content-end">
              <Pagination
                onChange={ubahHalaman}
                showSizeChanger
                defaultCurrent={1} // Change this to your desired default page number
                total={DataPagination}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SamplePage;
