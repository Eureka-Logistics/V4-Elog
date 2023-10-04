import React, { useEffect, useState } from "react";
import {
  Button,
  Space,
  Card,
  Input,
  Pagination,
  Modal,
  Select,
  Tag,
  Table,
} from "antd";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../../Api/Api";
import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { async } from "q";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
import XLSX from "xlsx";

const SamplePage = () => {
  const router = useHistory();
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [tarifMitraDelete, setTarifMitraDelete] = useState([]);
  const [listData, setListData] = useState([]);
  const [muatKota, setMuatKota] = useState("");
  const [NamaMitranya, setNamaMitranya] = useState("");
  const [kotaTujuan, setKotaTujuan] = useState("");
  const [kotaTujuannOptionSelect, setKotaTujuanOpionSelect] = useState("");
  const [muatKotaOptionSelect, setMuatKotaOptionsSelect] = useState("");
  const [namaMitranyaoptionSelect, setnamaMitranyaoptionSelect] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [NamaMitraOptions, setNamaMitraOptions] = useState("");

  const handleView = (id) => {
    router.push(`/tarifmitraeditdetail/${id}`);
  };

  const formatRupiah = (angka) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(angka);
  };
  const columnss = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Nama Mitra",
      dataIndex: "mitra",
      key: "mitra",
    },
    {
      title: "Muat",
      dataIndex: "kotaAsal",
      key: "kotaAsal",
    },
    {
      title: "Bongkar",
      dataIndex: "kotaTujuan",
      key: "kotaTujuan",
    },
    {
<<<<<<< HEAD
=======
      title: "Jenis Kendaraan",
      dataIndex: "kendaraanJenis",
      key: "kendaraanJenis",
    },
    {
>>>>>>> maya
      title: "Biaya Kirim",
      dataIndex: "tarif",
      key: "tarif",
      render: (tarif) => formatRupiah(tarif),
    },

    {
      title: "Keterangan",
      dataIndex: "service_type",
      key: "service_type",
      render: (text) => (
        <Tag
          color={
            text === "Charter"
              ? "green"
              : text === "Retail"
              ? "blue"
              : "default"
          }
        >
          {text}
        </Tag>
      ),
    },

    {
      title: "Aksi",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => handleView(record.id_price_mitra)}
            type="primary"
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <FormOutlined />
            </span>
          </Button>
          <Button danger onClick={() => handleDelete(record.id_price_mitra)}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <DeleteOutlined />
            </span>
            {/* <DeleteOutlined /> */}
          </Button>
        </Space>
      ),
    },

    
  ];
  const columns = [
    
    {
      name: "No.",
      selector: (row) => row.no,
      width: "8%",
    },
   
    {
      name: "Nama Mitra",
      selector: (row) => row.mitra,
      width: "20%",
    },
    {
      name: "Muat",
      selector: (row) => row.kotaAsal,
      key: "kotaAsal",
    },
    {
      name: "Bongkar",
      selector: (row) => row.kotaTujuan,
      key: "kotaTujuan",
    },
   
    {
      name: "Biaya Kirim",
      selector: "tarif",
      key: "tarif",
      width: "130px",
      cell: (row) => formatRupiah(row.tarif), // Menggunakan fungsi formatRupiah untuk mengubah angka menjadi format Rupiah
    },
    {
      name: "Keterangan",
      // selector: (row) => row.perpanjangOtomatis
      width: "150px",
      selector: (row) =>
        row.service_type === "Retail" ? (
          <Tag color="green">Retail</Tag>
        ) : row.service_type === "Charter" ? (
          <Tag color="red">Charter</Tag>
        ) : (
          ""
        ),
    },
    
    {
      name: "Action",
      selector: (record) => (
        <>
         

          <Button
            danger
            className="mt-2"
            onClick={() => handleDelete(record.id_price_mitra)}
            type="danger"
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <DeleteOutlined />
            </span>
            {/* <DeleteOutlined /> */}
          </Button>
        </>
      ),
    },
  ];

  const IniRowClick = (record) => {
    handleView(record.id_price_mitra);
  };

  const fetchData = async (pages = 1) => {
    try {
      const response = await httpClient.get(
        `tarif/get-tarifMitra?limit=${limit}&page=${pages}&id_muat_kota=${muatKota}&id_tujuan_kota=${kotaTujuan}&id_kendaraan_jenis=&id_mitra=${NamaMitranya}&id_price_mitra=&keyword=`
      );
      const data = response.data;
      console.log(data);
      if (data.status.code === 200) {
        setListData(data.data.order);
        setTotal(data.data.totalData);
      } else {
        console.log("Error: ", data.status.message);
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

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
      setnamaMitranyaoptionSelect(response.data);
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

  useEffect(() => {
    fetchData();
    getDataSelectt();
    NamaMitraOptionsAPI();
  }, [muatKota, kotaTujuan, NamaMitranya]);

  const NamaMitraOptionsAPI = async () => {
    try {
      const data = await axios.get(`${Baseurl}mitra/get-select-mitraPic`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(`asu`, data.data.mitra);
      setNamaMitraOptions(data.data?.mitra);
    } catch (error) {}
  };

  const ubahHalaman = (pages) => {
    fetchData(pages);
  };

  const ubahPerHalaman = (limit) => {
    fetchData(limit);
  };

  const handleAdd = () => {
    router.push(`/tarifmitracreate`);
  };

  const handleEdit = (id) => {
    router.push(`/tarifmitraedit`);
  };

  const handleDetail = (id) => {
    router.push(`/tarifmitraeditdetail/${id}`);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Yakin untuk menghapus tarif ini ?",
      icon: <ExclamationCircleOutlined />,
      content: "Tindakan ini tidak dapat dibatalkan.",
      onOk() {
        const datas = {
          id_price_mitra: id,
        };
        httpClient
          .post(`tarif/del-tarifMitra`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = listData.filter(
                (item) => item.id_price_mitra !== id
              );
              setListData(newOrder);
              // window.location.reload();
              // Reload the data after successful deletion if necessary
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
  
  const exportData = listData.map((item) => ({
    'No': item.no,
    'Nama Mitra': item.mitra,
    Muat: item.kotaAsal,
    Bongkar: item.kotaTujuan,
    'Biaya Kirim': formatRupiah(item.tarif),
    Keterangan: item.service_type,
  }));
  
  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'exported-data';
  
    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
  
    // Set column widths for specific columns
    const columnWidths = [
      { wch: 5 }, // 'No'
      { wch: 30 }, // 'Nama Mitra'
      { wch: 30 }, // 'Muat'
      { wch: 30 }, // 'Bongkar'
      { wch: 30 }, // 'Biaya Kirim'
      { wch: 30 }, // 'Keterangan'
    ];
  
    // Apply column widths to the worksheet
    ws['!cols'] = columnWidths;
  
    // Apply blue background color to specific header cells
    const blueBackgroundColor = { fgColor: { rgb: '0000FF' } }; // '0000FF' represents blue
    const headerCells = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1']; // Adjust cell references as needed
  
    headerCells.forEach((cellRef) => {
      ws[cellRef].s = { ...ws[cellRef].s, ...blueBackgroundColor };
    });
  
    // Center content in 'No' and 'Keterangan' cells
    const centerStyle = { alignment: { vertical: 'center', horizontal: 'center' } };
    ws['B1'].s = { ...ws['B1'].s, ...centerStyle }; // Center 'No'
    ws['F1'].s = { ...ws['F1'].s, ...centerStyle }; // Center 'Keterangan'
  
    // Apply borders to all cells (including header)
    const borderStyle = { style: 'thin', color: { rgb: '000000' } }; // '000000' represents black
    for (let cellRef in ws) {
      if (cellRef[0] === '!') continue; // Skip metadata
  
      ws[cellRef].s = { ...ws[cellRef].s, ...borderStyle };
    }
  
    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'data');
  
    // Generate Excel buffer
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
    // Create a Blob and download the Excel file
    const blob = new Blob([excelBuffer], { type: fileType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName + fileExtension;
    anchor.click();
  };
  
  

  return (
    <div>
      <Card>
        <h5 style={{ color: "#1A5CBF", fontWeight: "bold" }}>
          Data Tarif Mitra
        </h5>
        <div>
          <Row className="mt-4 mb-2">
            <Col sm={3}>
              <label className="mb-2" htmlFor="muatKotaSelect">
                Search Kota Muat:
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
            <Col sm={3}>
              <label className="mb-2" htmlFor="muatKotaSelect">
                Search Kota Tujuan:
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
            <Col sm={3}>
              <label className="mb-2" htmlFor="muatKotaSelect">
                Search Nama Mitras:
              </label>
              <Select
                value={NamaMitranya}
                name="mitra"
                showSearch
                optionFilterProp="children"
                placeholder="Select Nama Mitra"
                style={{
                  width: "100%",
                  border: "1px solid #1A5CBF",
                  borderRadius: "5px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
                onChange={(e, options) => {
                  console.log(options);
                  setNamaMitranya(options.value);
                }}
              >
                <Select.Option value="">-</Select.Option>
                {NamaMitraOptions &&
                  NamaMitraOptions.map((item, index) => (
                    <Select.Option value={item.idMitra}>
                      {item.mitra}
                    </Select.Option>
                  ))}
              </Select>
            </Col>
            <Col sm={3} className="d-flex justify-content-end mt-4">
              <Button
                style={{
                  backgroundColor: "green",
                  color: "#FFFFFF",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                  borderColor: "green",
                  marginRight: "10px",
                }}
                onClick={exportToExcel}
              >
                Export Excel
              </Button>
              <Button
                style={{
                  backgroundColor: "#1A5CBF",
                  color: "#FFFFFF",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                  borderColor: "#1A5CBF",
                }}
                // type="primary"
                onClick={handleAdd}
              >
                New Tarif
              </Button>
            </Col>
            <Col sm={3} className="d-flex justify-content-end mt-4"></Col>
            {/* <Col sm={3} className="d-flex justify-content mb-2">
              <Input style={{ width: "100%" }} placeholder="Cari Pricelist" />
            </Col> */}
          </Row>
        </div>
        <style>
          {`
          .rdt_TableBody .rdt_TableRow:hover {
            cursor: pointer;
            background-color: #C7E1FB;
          }
          
        `}
        </style>
        <Table
          className="mt-5"
          onRowClicked={IniRowClick}
          dataSource={listData}
          columns={columnss}
          pagination={false}
        />
        <div className="mt-3 d-flex justify-content-end">
          <Pagination
            onChange={ubahHalaman}
            showSizeChanger
            // onShowSizeChange={ubahPerHalaman}
            defaultCurrent={100}
            total={total}
          />
        </div>
        {/* <DataTable
          onRowClicked={IniRowClick}
          columns={columns}
          data={listData}
        />
        <div className="mt-5 d-flex justify-content-end">
          <Pagination
            onChange={ubahHalaman}
            showSizeChanger
            onShowSizeChange={ubahPerHalaman}
            defaultCurrent={100}
            total={total}
          />
        </div> */}
        {/* <>
          <DataTable data={listData}  columns={columns} />
        </>
        <div className="mt-5 d-flex justify-content-end">
          <Pagination
            onChange={ubahHalaman}
            showSizeChanger
            // onShowSizeChange={ubahPerHalaman}
            defaultCurrent={100}
            total={total}
          />
        </div> */}
      </Card>
    </div>
  );
};

export default SamplePage;