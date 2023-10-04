import React, { useEffect, useState } from "react";
import {
  // Table,
  Button,
  Space,
  Card,
  Modal,
  Col,
  Tag,
  Pagination,
  Select,
  Row,
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
import Baseurl from "../../../Api/BaseUrl";
import axios from "axios";
import { Table } from "react-bootstrap";

const SamplePage = () => {
  const router = useHistory();
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  let nomor = 1;

  const columns = [
    // {
    //   title: "id_price",
    //   dataIndex: "id_price",
    //   key: "id_price",
    // },
    // {
    //   title: "id_muat_kota",
    //   dataIndex: "id_muat_kota",
    //   key: "id_muat_kota",
    // },
    // {
    //   title: "id_tujuan_kota",
    //   dataIndex: "id_tujuan_kota",
    //   key: "id_tujuan_kota",
    // },
    // {
    //   title: "id_kendaraan_jenis",
    //   dataIndex: "id_kendaraan_jenis",
    //   key: "id_kendaraan_jenis",
    // },
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },

    // {
    //   title: "Jenis Pelayanan",
    //   dataIndex: "service_type",
    //   key: "service_type",
    //   render: (text) => {
    //     let tagColor = "";
    //     if (text === "Retail") {
    //       tagColor = "lime";
    //     } else if (text === "Charter") {
    //       tagColor = "orange";
    //     } else if (text === "reguler") {
    //       tagColor = "blue";
    //     }
    //     return <Tag color={tagColor}>{text}</Tag>;
    //   },
    // },
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
        }
        return <Tag color={tagColor}>{jenis_kiriman}</Tag>;
      },
    },
    // {
    //   title: "Tarif",
    //   dataIndex: "tarif",
    //   key: "tarif",
    //   render: (tarif) => formatRupiah(tarif), // Menggunakan fungsi formatRupiah untuk mengubah angka menjadi format Rupiah
    // },
    // {
    //   title: "Ritase",
    //   dataIndex: "ritase",
    //   key: "ritase",
    // },
    // {
    //   title: "Uang Jalan",
    //   dataIndex: "uang_jalan",
    //   key: "uang_jalan",
    //   render: (uang_jalan) => formatRupiah(uang_jalan),
    // },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    // },
    // {
    //   title: "Tanggal Pembuatan",
    //   dataIndex: "date_created",
    //   key: "date_created",
    // },
    // {
    //   title: "id_user",
    //   dataIndex: "id_user",
    //   key: "id_user",
    // },
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
      title: "Max Tonase(kg/koli)",
      dataIndex: "max_tonase",
      key: "max_tonase",
    },
    {
      title: "Harga",
      dataIndex: "harga_selanjutnya",
      key: "harga_selanjutnya",
    },

    {
      title: "Action",
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
  ];

  const formatRupiah = (angka) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(angka);
  };
  const handleView = (id_price) => {
    console.log(`ini idnya `, id_price);
    router.push(`tarif_eureka_edit_detail/${id_price}`);
  };
  const [listData, setListData] = useState([]);
  const [muatKota, setMuatKota] = useState("");
  const [kotaTujuan, setKotaTujuan] = useState("");
  const [kotaTujuannOptionSelect, setKotaTujuanOpionSelect] = useState("");
  const [muatKotaOptionSelect, setMuatKotaOptionsSelect] = useState("");

  const fetchData = async (limit = 10, pageSize = 1) => {
    try {
      const response = await httpClient.get(
        `tarif/get-tarifeureka?limit=${limit}&page=${pageSize}&id_muat_kota=${muatKota}&id_tujuan_kota=${kotaTujuan}&id_kendaraan_jenis=`
      );
      const data = response.data;

      if (data.status.code === 200) {
        console.log(response.data.data.order, "respons");
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
  }, [muatKota, kotaTujuan]);

  const handleAdd = (id) => {
    router.push(`/tarif_eurekacreate`);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Yakin untuk menghapus tarif ini? ",
      icon: <ExclamationCircleOutlined />,
      content: "Tindakan ini tidak dapat dibatalkan",
      onOk() {
        const datas = {
          id_price: id,
        };
        httpClient
          .post(`tarif/delete-tarifEureka`, datas)
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

  const onShowSizeChange = (current, pageSize) => {
    fetchData(current, pageSize);
  };

  return (
    <div>
      <Card>
        <h3 style={{ color: "#1A5CBF" }}>Data Tarif Eureka</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          {/* <Button type="default">Cari Pricelist</Button> */}
        </div>
        <Row className="mt-3 mb-4">
          <Col sm={6}>
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
          <Col sm={6}>
            <label
              className="mb-2"
              htmlFor="muatKotaSelect"
              style={{ fontWeight: "bold" }}
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

          <Col sm={12} className="d-flex justify-content-end mt-4">
            <Button
              style={{ backgroundColor: "#1A5CBF", color: "white" }}
              onClick={handleAdd}
            >
              New Tarif
            </Button>
          </Col>
        </Row>

        <Table
          dataSource={listData}
          columns={columns}
          scroll={{
            x: 1300,
          }}
          pagination={{
            showSizeChanger: true,
            onChange: onShowSizeChange,
            defaultCurrent: 1,
            total: 500,
          }}
        />

        {/* <Pagination
      showSizeChanger
      onChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
    /> */}
        <Table responsive>
          <thead style={{ backgroundColor: "#1A5CBF", color: "white" }}>
            <tr>
              <th>No.</th>
              <th>Jenis Kiriman</th>
              <th>Muat</th>
              <th>Tujuan</th>
              <th>Jenis Kendaraan</th>
              <th>Tarif</th>
              <th>Max Tonase(kg/koli)</th>
              <th>Harga</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listData.map((record, index) => (
              <tr key={record.id}>
                <td>{index + 1}</td>

                <td>
                  <Tag
                    color={
                      record.jenis_kiriman === "Reguler"
                        ? "magenta"
                        : record.jenis_kiriman === "Retail"
                        ? "yellow"
                        : "green"
                    }
                  >
                    {record.jenis_kiriman}
                  </Tag>
                </td>
                <td>{record.kotaAsal}</td>
                <td>{record.kotaTujuan}</td>
                <td>{record.kendaraanJenis}</td>
                <td>
                  {`${new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(record.tarif)}`}
                </td>
                <td>{record.max_tonase}</td>
                <td>
                  {`${new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(record.harga_selanjutnya)}`}
                </td>
               
                <td>
                  <Button
                    onClick={() => handleView(record.id_price)}
                    type="primary"
                  >
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          showSizeChanger
          onChange={onShowSizeChange}
          defaultCurrent={1}
          total={total} // Menggunakan total yang ada pada state
        />
      </Card>
    </div>
  );
};

export default SamplePage;
