import { FormOutlined, PrinterOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import React from "react";

function LoseSale() {
  const dataSource = [
    {
      key: "1",
      spdi: "SP09101/05/22/JKT",
      perusahaan: "Sari Agrotama Persada,PT",
      tujuan: "Cikarang ->Majalengka",
      pickup_date: "13-06-2023",
      price: "3.950.000",
      mkt: "",
      ops: "Tidak Mengunakan Unit	",
      purch: "TARIF MITRA TIDAK MASUK",
    },
    {
      key: "2",
      spdi: "SP00010/01/23/JKT	",
      perusahaan: "PT. Orient Container Express",
      tujuan: "Pulo Gadung->Bekasi	",
      pickup_date: "05-01-2023",
      price: "2.800.000	",
      mkt: "",
      ops: "Tidak Mengunakan Unit",
      purch: "Tarif mitra tidak masuk",
    },
    {
      key: "3",
      spdi: "SP00032/01/23/JKT	",
      perusahaan: "PT. Maxxis International Indonesia",
      tujuan: "Cikarang ->Depok",
      pickup_date: "06-01-2023	",
      price: "2.280.000",
      mkt: "Do lost sale, ops double approve",
      ops: "Menggunakan Unit B 9261 AI",
      purch: "Menggunakan Unit PT EUREKA LOGISTICS",
    },
  ];

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "SPDI",
      dataIndex: "spdi",
      key: "spdi",
    },
    {
      title: "Perusahaan",
      dataIndex: "perusahaan",
      key: "perusahaan",
    },
    {
      title: "Tujuan",
      dataIndex: "tujuan",
      key: "tujuan",
    },
    {
      title: "Pickup Date",
      dataIndex: "pickup_date",
      key: "pickup_date",
    },
    {
      title: "Price (Rp.)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "MKT",
      dataIndex: "mkt",
      key: "mkt",
    },
    {
      title: "OPS",
      dataIndex: "ops",
      key: "ops",
    },
    {
      title: "PURCH",
      dataIndex: "purch",
      key: "purch",
    },
    {
      title: "Detail",
      key: "detail",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleDetailClick(record)} type="primary">
            <span style={{ display: "flex", alignItems: "center" }}>
              <FormOutlined style={{marginRight: '5px'}}/> Detail
            </span>
          </Button>
        </Space>
      ),
    },
  ];
  const handleDetailClick = (record) => {
    // Logika untuk menangani klik tombol "Detail" di sini
    console.log("Detail clicked for record:", record);
  };

  const customStylesReactSelect = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      width: "100%",
      minWidth: "100%",
    }),
  };

  return (
    <div>
      <Card>
        <h5>Lose Sale</h5>
        <hr />
        <p style={{ fontFamily: "NoirPro" }}>List Pengajuan Service</p>
        <Row className="mt-4" gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6} lg={6} style={{ paddingRight: "0px" }}>
            <Input.Group compact>
              <Input
                style={{ width: "18%", padding: "8px 11px" }}
                prefix={
                  <span
                    style={{
                      color: "black",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    From
                  </span>
                }
              />
              <DatePicker style={{ width: "72%" }} />
            </Input.Group>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} style={{ paddingRight: "0px" }}>
            <Input.Group compact>
              <Input
                style={{ width: "18%", padding: "8px 11px" }}
                prefix={
                  <span
                    style={{
                      color: "black",
                      display: "flex",
                      justifyContent: "center",
                      marginLeft: "10px",
                    }}
                  >
                    To
                  </span>
                }
              />
              <DatePicker style={{ width: "72%" }} />
            </Input.Group>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6}>
            <Select
              showSearch
              defaultValue="ALL"
              //   placeholder="Pilih Cabang"
              // optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.key);
                // setIDBu(options.key)
              }}
            >
              <Select.Option key="ALL" value="ALL">
                ALL
              </Select.Option>
              <Select.Option key="Cabang JKT" value="Cabang JKT">
                Cabang JKT
              </Select.Option>
              <Select.Option key="Cabang SBY" value="Cabang SBY">
                Cabang SBY
              </Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} style={{ paddingRight: "0px" }}>
            <Input.Group compact>
              <Select
                showSearch
                defaultValue="BINTANG JAYA, CV"
                //   placeholder="Pilih Cabang"
                // optionFilterProp="value"
                style={{ width: "50%" }}
                onChange={(e, options) => {
                  console.log(options.key);
                  // setIDBu(options.key)
                }}
              >
                <Select.Option key="BINTANG JAYA, CV" value="BINTANG JAYA, CV">
                  BINTANG JAYA, CV
                </Select.Option>
              </Select>

              <Button
                style={{
                  width: "25%",
                  backgroundColor: "#bad6ff",
                  color: "white",
                }}
              >
                 <span style={{ display: "flex", alignItems: "center" }}>
                 Search <SearchOutlined style={{marginLeft: '5px'}}/>
            </span>
              </Button>
              <Button
                style={{
                  width: "25%",
                  backgroundColor: "#038fde",
                  color: "white",
                }}
              >
                 <span style={{ display: "flex", alignItems: "center" }}>
                 Print <PrinterOutlined style={{marginLeft: '5px'}} />
            </span>
              </Button>
            </Input.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col span={12}></Col>
          <Col xs={24} sm={12} md={6} lg={6}></Col>

          <Col xs={24} sm={12} md={6} lg={6} className="d-flex justify-content-end">
            <label style={{ marginRight: "8px", marginTop: "10px" }}>
              Search:
            </label>
            <Input placeholder="Search" style={{ width: "100%" }} />
          </Col>
        </Row>
        <hr />
        <Table style={{ overflowX: "auto" }}  dataSource={dataSource} columns={columns} />
      </Card>
    </div>
  );
}

export default LoseSale;
