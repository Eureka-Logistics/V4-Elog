import { SearchOutlined } from "@ant-design/icons";
import { Card, Col, Input, Row, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { BaseUrlRace } from "../../Api/BaseUrl";
import axios from "axios";

function SPListCabang() {
  const [DataSP, setDataSP] = useState("");

  const fetchData = async () => {
    try {
      const respons = await axios.get(
        `${BaseUrlRace}sp/get-sp?limit=10&page=1&cabang=JKT`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("responsssss aja ", respons.data.data.order);
      setDataSP(respons.data.data.order);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dataSource = [
    {
      key: "1",
      so: "11-SO-23-000076",
      perusahaan: "PT. Erlangga Mahameru Pusat",
      marketing: "Rifaldi",
      vehicle: "Lainnya",
      pickup: "2023-11-18",
      destination: "Padang",
      service: "retail",
    },
  ];

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "SO ID",
      dataIndex: "so",
      key: "so",
      render: (so, record) => {
        let soTagColor = "blue"; // Default so tag color
        let serviceTagColor = "blue"; // Default service tag color

        if (record.service === "retail") {
          serviceTagColor = "blue";
        } else if (record.service === "charter") {
          serviceTagColor = "orange";
        }

        return (
          <span>
            <Tag color={soTagColor}>
              {so} <br /> 
            </Tag>
          </span>
        );
      },
    },
    {
      title: "SJ Erlangga",
      dataIndex: "SjErlangga",
      key: "SjErlangga",
    },
    {
      title: "Cabang",
      dataIndex: "cabang",
      key: "cabang",
    },
    {
      title: "Vehicle",
      dataIndex: "kendaraan",
      key: "kendaraan",
    },
    {
      title: "Sales",
      dataIndex: "sales",
      key: "sales",
    },
    {
      title: "Destination",
      dataIndex: "sekolahtujuan",
      key: "sekolahtujuan",
    },
  ];

  return (
    <div>
      <Card>
        <Row
          gutter={[16, 16]}
          style={{ paddingLeft: "2%", paddingRight: "2%" }}
        >
          <Col xs={24} sm={16} md={16} lg={16}>
            <p style={{ fontFamily: "NoirPro" }} className="mt-2">
              05 September 2023
              <br />
              Jumlah Pengiriman
            </p>
          </Col>
          <Col xs={12} sm={4} md={4} lg={4}>
            <p style={{ fontFamily: "NoirPro" }} className="mt-2">
              02
              <br />
              Selesai
            </p>
          </Col>
          <Col xs={12} sm={4} md={4} lg={4}>
            <p style={{ fontFamily: "NoirPro" }} className="mt-2">
              10
              <br />
              TOTAL
            </p>
          </Col>
        </Row>
      </Card>
      <Row>
        <Col xs={24} sm={12} md={16} lg={16}>
          <h4 style={{ fontFamily: "NoirPro" }}>List Pengiriman</h4>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={4}
          lg={4}
          className="d-flex justify-content-end"
        ></Col>
        <Col
          xs={24}
          sm={12}
          md={4}
          lg={4}
          className="d-flex justify-content-end"
        >
          <Input
            style={{ width: "100%", height: "50px" }}
            addonBefore={<SearchOutlined />}
            placeholder="Cari Disini"
          />
        </Col>
      </Row>
      <Card>
        <Table
          style={{ overflowX: "auto" }}
          dataSource={DataSP}
          columns={columns}
          pagination={false} // Menyembunyikan pagination
        />
      </Card>
    </div>
  );
}

export default SPListCabang;
