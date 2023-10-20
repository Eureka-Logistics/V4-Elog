import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Col,
  Input,
  Pagination,
  Card,
  Modal,
  Tag,
  Select,
} from "antd";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../../Api/Api";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
import { Row } from "react-bootstrap";
import "../../../assets/style.css";
import XLSX from "xlsx";

const SamplePage = () => {
  const router = useHistory();
  const [nameFilter, setNameFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const [limit, setLimit] = useState(10);
  const [exporting, setExporting] = useState(false);


  const handleView = (id) => {
    router.push(`/detailTarifPelanggan/${id}`);
  };
  const { Search } = Input;
  const onSearch = (value) => {
    setNameFilter(value.target.value);
    setLoadingState(true);
    httpClient
      .get(
        `tarif/get-tarifCustomer?limit=${limit}&page=${currentPage}&id_muat_kota=&id_tujuan_kota=&id_kendaraan_jenis=${value.target.value}id_price=&id_customer=&berat`
      )
      .then(({ data }) => {
        if (data.status.code === 200) {
          setLoadingState(false);
          console.log("respons", data.data);
          setOrder(data.data.order);
          setTotal(data.data.totalData);
          console.log('ini data baru tanpa service', data.data.order);
        }
      })
      .catch(function (error) {
        setLoadingState(false);
        console.log(error.message);
      });
  };
  const formatRupiah = (angka) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(angka);
  };

  
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Kode Tarif",
      dataIndex: "kode_tarif",
      key: "kode_tarif",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Pelanggan",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Service",
      dataIndex: "service_type",
      key: "service_type",
      render: (text, row) => {
        return row?.service_type === 'Retail' ? (
          <Tag color="green">Retail</Tag>
        ) : row?.service_type === 'Charter' ? (
          <Tag color="magenta">Charter</Tag>
        ) : (
          ''
        );
      }
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
      title: "Jenis Kendaraan",
      dataIndex: "kendaraanJenis",
      key: "kendaraanJenis",
    },
    {
      title: "Date Created",
      dataIndex: "date_created",
      key: "date_created",
    },
    {
      title: "Biaya Jalan",
      dataIndex: "biaya_jalan",
      key: "biaya_jalan",
      render: (biaya_jalan) => formatRupiah(biaya_jalan),
    },
    // {
    //   title: "Biaya Muat",
    //   dataIndex: "-",
    //   key: "biaya_muat",
    // },
    // {
    //   title: "Biaya Bongkar",
    //   dataIndex: "biaya_bongkar",
    //   key: "biaya_bongkar",
    // },
    // {
    //   title: "Biaya Lain",
    //   dataIndex: "biaya_lain",
    //   key: "biaya_lain",
    //   render: (biaya_lain) => formatRupiah(biaya_lain),
    // },

    {
      title: "Aksi",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleView(record.id_price)} type="primary">
            <span style={{ display: "flex", alignItems: "center" }}>
              <FormOutlined />
            </span>
          </Button>
          <Button danger onClick={() => handleDelete(record.id_price)}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <DeleteOutlined />
            </span>
            {/* <DeleteOutlined /> */}
          </Button>
        </Space>
      ),
    },

    // {
    //   title: "Keterangan",
    //   dataIndex: "status",
    //   key: "status",
    // },
  ];

  const [listData, setListData] = useState([]);
  const [muatKota, setMuatKota] = useState("");
  const [kotaTujuan, setKotaTujuan] = useState("");
  const [NamaMitraa, setNamaMitraa] = useState("");
  const [kotaTujuannOptionSelect, setKotaTujuanOpionSelect] = useState("");
  const [muatKotaOptionSelect, setMuatKotaOptionsSelect] = useState("");
  const [NamaMitraOptions, setNamaMitraOptions] = useState("");

  const IniRowClick = (record) => {
    handleView(record.id_price_mitra);
  };

  const fetchData = async () => {
    try {
      const response = await httpClient.get(
        `tarif/get-tarifCustomer?limit=${limit}&page=${currentPage}&id_muat_kota=${muatKota}&id_tujuan_kota=${kotaTujuan}&id_kendaraan_jenis=&id_price=&id_customer=${NamaMitraa}&berat=all`
      );
      const data = response.data;
      console.log(data);
      if (data.status.code === 200) {
        setListData(data.data?.order);
        setTotal(data.data?.totalData);
        console.log(data.data.order, 'ini data baru');
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
      setNamaMitraOptions(response.data);
      // setnamaMitranyaoptionSelect(response.data);
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
  }, [currentPage, limit, muatKota, kotaTujuan, NamaMitraa]);

  const NamaMitraOptionsAPI = async () => {
    try {
      const data = await axios.get(`${Baseurl}mitra/get-select-mitraPic`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(`dodol`, data.data.mitra);
      setNamaMitraOptions(data.data?.mitra);
    } catch (error) {}
  };

  const handleAdd = (id) => {
    router.push(`/NewTarifCustomer/`);
    // router.push(`/pelanggantarifcerate/`);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Yakin untuk menghapus tarif ini?",
      icon: <ExclamationCircleOutlined />,
      content: "Tindakan ini tidak dapat dibatalkan.",
      onOk() {
        const datas = {
          id_price: id,
        };
        httpClient
          .post(`tarif/delete-tarifCustomer`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = listData.filter((item) => item.id_price !== id);
              setListData(newOrder);
              // Reload the data after successful deletion if necessary
              fetchData();
              // window.location.reload();
            }
          })
          .catch(function (error) {
            console.log(error.message);
          });
      },
      onCancel() {},
    });
  };

  const exportToExcel = async () => {
    setExporting(true);

  try {
    const response = await httpClient.get(
      `tarif/get-tarifCustomer?limit=${total}&page=1&id_muat_kota=${muatKota}&id_tujuan_kota=${kotaTujuan}&id_kendaraan_jenis=&id_price=&id_customer=${NamaMitraa}`
    );

    const dataToExport = response.data.data.order.map((item, index) => ({
      No: {
        t: "s",
        v: index + 1,
        s: {
          alignment: { horizontal: "center", vertical: "center" },
          color: { rgb: "6495ED" },
        },
      },
      "Kode Tarif": {
        t: "s",
        v: item.kode_tarif,
        s: { alignment: { horizontal: "center" } },
      },
      Pelanggan: {
        t: "s",
        v: item.customer,
        s: { alignment: { horizontal: "center" } },
      },
      Service: {
        t: "s",
        v: item?.service_type,
        s: { alignment: { horizontal: "center" } },
      },
      Muat: {
        t: "s",
        v: item.kotaAsal,
        s: { alignment: { horizontal: "center" } },
      },
      Bongkar: {
        t: "s",
        v: item.kotaTujuan,
        s: { alignment: { horizontal: "center" } },
      },
      "Jenis Kendaraan": {
        t: "s",
        v: item.kendaraanJenis,
        s: { alignment: { horizontal: "center" } },
      },
      "Date Created": {
        t: "s",
        v: item.date_created,
        s: { alignment: { horizontal: "center" } },
      },
      "Biaya Kirim": {
        t: "s",
        v: formatRupiah(item.biaya_jalan),
        s: { alignment: { horizontal: "center" } },
      },
      "Via": {
        t: "s",
        v: item.via,
        s: { alignment: { horizontal: "center" } },
      },
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);

    // Mengatur lebar kolom untuk kolom "Kode Tarif" dengan lebar 15
    ws["!cols"] = [
      { wch: 5 }, // Nomor
      { wch: 15 }, // kode tarif
      { wch: 35 }, // pelanggan
      { wch: 11 }, // service
      { wch: 25 }, // muat
      { wch: 25 }, // bongkar 
      { wch: 16 }, // jenis kendaraan
      { wch: 22 }, // date
      { wch: 30 }, // biaya kirim 
      { wch: 15 }, // via

    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Table Data");
    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileName = "Export Tarif Customer.xlsx";

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // For IE
      window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      // For other browsers
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  } catch (error) {
    console.error("Error exporting data:", error);
  } finally {
    // Set the exporting flag back to false after export is complete
    setExporting(false);
  }
};  

  return (
    <div>
      <Card>
        <h3 style={{ color: "#1A5CBF" }}>Data Tarif Customer</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Col span={4}>
            {/* <Search
            placeholder="Cari Pelanggan"
            allowClear
            onSearch={onSearch}
            onChange={onSearch}
            loading={loadingState}
          /> */}
          </Col>
          {/* <Button type="default">Cari Daftar Harga</Button> */}
        </div>
        <style>
          {`
          .rdt_TableBody .rdt_TableRow:hover {
            cursor: pointer;
            background-color: 	#ADD8E6;
          }
          
        `}
        </style>
        <Row>
          <Col sm={5}>
            <label
              className="mb-2"
              htmlFor="muatKotaSelect"
              style={{ fontWeight: "bold" }}
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
          <Col sm={5}>
            <label
              className="mb-2"
              htmlFor="muatKotaSelect"
              style={{ fontWeight: "bold" }}
            >
              Search Bongkar :
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
          <Col sm={5}>
            <label
              className="mb-2"
              htmlFor="MitraSelect"
              style={{ fontWeight: "bold" }}
            >
              Search Nama Customer :
            </label>
            <Select
              value={NamaMitraa}
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
                setNamaMitraa(options.value);
              }}
            >
              <Select.Option value="">-</Select.Option>
              {NamaMitraOptions &&
                NamaMitraOptions.customer.map((item, index) => (
                  <Select.Option value={item.idCustomer}>
                    {item.Customer}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col sm={9} className="d-flex justify-content-end mt-4">
            <Button
              style={{ backgroundColor: "green", color: "white" }}
              onClick={exportToExcel}
              disabled={exporting}
            >
              {exporting ? "Exporting..." : "Export Excel (XLSX)"} 
            </Button>

            <Button
              style={{ backgroundColor: "#1A5CBF", color: "white" }}
              onClick={handleAdd}
            >
              New Tarif
            </Button>
          </Col>
        </Row>
        <div style={{ overflowX: "auto" }}>
          <Table
            className="mt-5"
            onRowClicked={IniRowClick}
            dataSource={listData}
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
        </div>
      </Card>
    </div>
  );
};

export default SamplePage;