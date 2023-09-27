import { Card, Col, Row, Select, Table, Tag } from "antd";
import React from "react";

function ReportCustomer() {


  const dataSource = [
    {
      key: "1",
      no_sp: "SP00013/01/23/JKT",
      no_spk: "JKT23-000010",
      sales: "M. Iqbal",
      service: "Charter",
      jenis_barang: "Buku", 
      via: "Darat",
      kendaraan: "Wingbox",
      status: "Batal",
      nama_perusahaan: "Sari Agrotama Persada,PT",
      penginput: "Amelia D. N.",
      tgl_pickup: "01/01/2023 16:19:00",
      tgl_pesan: "01/01/2023 16:20:00",
      biaya: "4025000",
    },
    {
      key: "2",
      no_sp: "SP00014/01/23/JKT",
      no_spk: "JKT23-000009",
      sales: "M. Iqbal",
      service: "Charter",
      jenis_barang: "Buku", 
      via: "Darat",
      kendaraan: "Wingbox",
      status: "Aktif",
      nama_perusahaan: "PT. Wilmar Cahaya Indonesia Tbk",
      penginput: "Amelia D. N.",
      tgl_pickup: "01/01/2023 16:23:00",
      tgl_pesan: "02/01/2023 16:23:00",
      biaya: "2875000",
    },
    
  ];
 
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "No SP",
      dataIndex: "no_sp",
      key: "no_sp",
    },
    {
      title: "No SPK",
      dataIndex: "no_spk",
      key: "no_spk",
    },
    {
      title: "Nama Sales",
      dataIndex: "sales",
      key: "sales",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Jenis Barang",
      dataIndex: "jenis_barang",
      key: "jenis_barang",
    },
    {
      title: "Via",
      dataIndex: "via",
      key: "via",
    },
    {
      title: "Jenis Kendaraan",
      dataIndex: "kendaraan",
      key: "kendaraan",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <Tag color={status === "Aktif" ? "green" : "red"}>
            {status}
          </Tag>
        ),
      },
    {
      title: "Nama Perusahaan",
      dataIndex: "nama_perusahaan",
      key: "nama_perusahaan",
    },
    {
      title: "Nama Penginput",
      dataIndex: "penginput",
      key: "penginput",
    },
    {
      title: "Tgl Pickup",
      dataIndex: "tgl_pickup",
      key: "tgl_pickup",
      render: (tgl_pickup) => (
        <Tag color="magenta">
          {tgl_pickup}
        </Tag>
      ),
    },
    {
      title: "Tgl Pesanan",
      dataIndex: "tgl_pesan",
      key: "tgl_pesan",
      render: (tgl_pesan) => (
        <Tag color="blue">
          {tgl_pesan}
        </Tag>
      ),
    },
    {
      title: "Biaya",
      dataIndex: "biaya",
      key: "biaya",
      render: (biaya) => (
        <span>
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(biaya)}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <h5>Report Customer</h5>
        <hr />
        <Row>
          <Col span={6}>
          <label
              className="mb-2"
              htmlFor="muatKotaSelect"
              style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}
            >
              Search Nama Perushaan :
            </label>
            <Select  
            showSearch
            style={{
                width: "100%",

                border: "1px solid #1A5CBF",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              }}>

            </Select>
          </Col>
          <Col span={6}>
          <label
              className="mb-2"
              htmlFor="muatKotaSelect"
              style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}
            >
              Search Tanggal Mulai :
            </label>
            <Select  
            showSearch
            style={{
                width: "100%",

                border: "1px solid #1A5CBF",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              }}>

            </Select>
          </Col>
          <Col span={6}>
          <label
              className="mb-2"
              htmlFor="muatKotaSelect"
              style={{ fontWeight: "bold", fontFamily: 'NoirPro' }}
            >
              Search Tanggal Selesai :
            </label>
            <Select
            showSearch
            style={{
                width: "100%",
                border: "1px solid #1A5CBF",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              }}>

            </Select>
          </Col>
        </Row>
        <Table className="mt-3" pagination={false} style={{overflowX: 'auto'}} dataSource={dataSource} columns={columns} />;
      </Card>
    </div>
  );
}

export default ReportCustomer;
