import { Card, Col, Form, Input, Pagination, Row, Select, Table, Tag } from "antd";
import React from "react";

function SjListCabang() {
  const dataSource = [
    {
      key: "1",
      so: "11-SO-23-000076",
      sm: "21-SJ-23-000082",
      service: "Retail",
      destination: "Jakarta-JAKTIM, Kota",
      tglPickUp: "2023-11-18 10:21:59",
    },
  ];

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "SP",
      dataIndex: "so",
      key: "so",
    },
    {
      title: "SM",
      dataIndex: "sm",
      key: "sm",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
    },

    {
      title: "Tanggal PickUp",
      dataIndex: "tglPickUp",
      key: "tglPickUp",
    },
  ];
  return (
    <div>
      <Card>
        <h5 style={{ color: "#f05423" }}>List SJ</h5>
        <hr />
        <Row>
        <Col className="ms-3" sm={6} md={4}>
          <Form.Item>
            <div style={{  fontFamily: 'NoirPro' }}>Cari SJ</div>
            <Input
            //   onChange={(e) => {
            //     SetCariSJ(e.target.value);
            //   }}
            />
          </Form.Item>
        </Col>
        <Col className="ms-3" sm={6} md={4}>
          <Form.Item>
            <div style={{  fontFamily: 'NoirPro' }}>Cari Nama Customer</div>
            <Input
            //   onChange={(e) => {
            //     SetCariSJ(e.target.value);
            //   }}
            />
          </Form.Item>
        </Col>
        <Col className="ms-3" sm={6} md={4}>
          <Form.Item>
            <div style={{  fontFamily: 'NoirPro' }}>Cari Pic Alamat</div>
            <Select
            //   onChange={(e) => {
            //     SetCariSJ(e.target.value);
            //   }}
            />
          </Form.Item>
        </Col>
       
      </Row>
      </Card>
      <Card>
        <Table
          style={{ overflowX: "auto" }}
          dataSource={dataSource}
          columns={columns}
          pagination={false} // Menyembunyikan pagination
        />
      </Card>
    </div>
  );
}

export default SjListCabang;
