import { Button, Card, Input, Select, Table, Tag, Col, Row, DatePicker } from "antd";
import React, { useState } from "react";

import ModalOKE from "./ModalOKE";
import ModalMemo from "../component/ModalMemo";
import { ExportOutlined, FileExcelOutlined } from "@ant-design/icons";

function TableComponenetReportKiriman() {
  const [modal1Open, setModal1Open] = useState(false);
  const [ModalMemoOpen, setModalMemoOpen] = useState(false);
  const [judulModal, setCurrentTitle] = useState("");

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "SM",
      dataIndex: "sm",
      key: "sm",
      render: (text, record) => <Tag color="blue">{record.sm}</Tag>,
    },
    {
      title: "Cust",
      dataIndex: "cust",
      key: "cust",
    },
    {
      title: "Rute",
      dataIndex: "rute",
      key: "rute",
    },
    {
      title: "Barang",
      dataIndex: "brg",
      key: "brg",
    },
    {
      title: "Berat (KG)",
      dataIndex: "berat",
      key: "berat",
    },
    {
      title: "Mitra",
      dataIndex: "mitra",
      key: "mitra",
    },
    {
      title: "No Plat",
      dataIndex: "noPlat",
      key: "noPlat",
      render: (text, record) => <Tag color="magenta">{record.noPlat}</Tag>,
    },
    {
      title: "Pengemudi",
      dataIndex: "pengemudi",
      key: "pengemudi",
    },
    {
      title: "Tgl Muat",
      dataIndex: "tglMuat",
      key: "tglMuat",
      render: (text, record) => <Tag color="green">{record.tglMuat}</Tag>,
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

  return (
    <div>
      <Card>
        <h4>
          Monitoring Kiriman <i>operasional</i> 
        </h4>
        <hr/>
        <Row gutter={[16,16]}>
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4}>
            <div>
              <label style={{ fontWeight: "bold" }}>BU</label>
              <Select
                placeholder="Pt Eureka Logistics (LOG)"
                style={{ width: "100%" }}
              ></Select>
            </div>
          </Col>
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4}>
            <div>
              <label style={{ fontWeight: "bold" }}>Cabang</label>
              <Select
                placeholder="Semua Cabang"
                style={{ width: "100%" }}
              ></Select>
            </div>
          </Col>
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4}>
            <div>
              <label style={{ fontWeight: "bold" }}>Mitra</label>
              <Select
                placeholder="Semua Mitra"
                style={{ width: "100%" }}
              ></Select>
            </div>
          </Col>
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4}>
            <div>
              <label style={{ fontWeight: "bold" }}>Customer</label>
              <Select
                placeholder="Semua Customer"
                style={{ width: "100%" }}
              ></Select>
            </div>
          </Col>
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4}>
            <div>
              <label style={{ fontWeight: "bold" }}>Mulai</label>
              <DatePicker style={{ width: "100%" }}></DatePicker>
            </div>
          </Col>
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4}>
            <div>
              <label style={{ fontWeight: "bold" }}>Selesai</label>
              <DatePicker style={{ width: "100%" }}></DatePicker>
            </div>
          </Col>
        </Row>
        <Row gutter={[16,16]}>
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4} className="mt-2">
            <div>
              <label style={{ fontWeight: "bold" }}>Sukses Pengiriman</label>
              <Select
                placeholder="Semua Sukses"
                style={{ width: "100%" }}
              ></Select>
            </div>
          </Col>
        </Row>
        <Row gutter={[16,16]}>
          <Col span={12} className="d-flex justify-content-end"></Col>
          <Col sm={12}
                  md={12}
                  xs={24}
                  lg={12} className="d-flex justify-content-end">
            <Button
              style={{
                backgroundColor: "#00a65a",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileExcelOutlined />
            </Button>
            <Input
              placeholder="Cari Report"
              className="mb-3"
              style={{ width: "50%" }}
            />
          </Col>
        </Row>
        <Table
          style={{ overflowX: "auto" }}
          dataSource={dataSource}
          columns={columns}
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

export default TableComponenetReportKiriman;
