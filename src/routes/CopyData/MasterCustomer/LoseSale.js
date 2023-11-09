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
import axios from "axios";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../Api/BaseUrl";

function LoseSale() {
  const [DataApi, setDataApi] = useState({
    order: [],
    totalData: 0,
    totalPage: 0,
    limit: 10,
    currentPage: 1
  })
  const dataApi = async () => {
    try {
      const data = await axios.get(`${Baseurl}sp/get-lost-sales?limit=${DataApi.limit}&page=${DataApi.currentPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: ,
            Authorization: localStorage.getItem("token"),
          },
        })
      console.log(data.data.data);
      setDataApi(item => ({
        ...item,
        order: data.data.data.order,
        totalData: data.data.data.totalData,
        totalPage: data.data.data.totalPage,
        limit: data.data.data.limit,
        currentPage: data.data.data.currentPage,
      }))
    } catch (error) {

    }
  }
  useEffect(() => {
    dataApi()
  }, [DataApi.currentPage , DataApi.limit])

  console.log(DataApi);


  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "SP",
      dataIndex: "sp",
      key: "sp",
    },
    {
      title: "Kendaraan",
      dataIndex: "kendaraan",
      key: "kendaraan",
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
      title: "Sales Name",
      dataIndex: "salesName",
      key: "salesName",
    },
    {
      title: "Pickup Date",
      dataIndex: "pickupDate",
      key: "pickupDate",
    },
    {
      title: "Chat Mkt",
      dataIndex: "chatMkt",
      key: "chatMkt",
    },
    {
      title: "Chat Ops",
      dataIndex: "chatOps",
      key: "chatOps",
    },
    {
      title: "Chat Purch",
      dataIndex: "getChatPurch",
      key: "getChatPurch",
    },

    // {
    //   title: "Detail",
    //   key: "detail",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Button onClick={() => handleDetailClick(record)} type="primary">
    //         <span style={{ display: "flex", alignItems: "center" }}>
    //           <FormOutlined style={{ marginRight: '5px' }} /> Detail
    //         </span>
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];
  const handleDetailClick = (record, size) => {
    console.log("Detail clicked for record:", record, size);
    setDataApi(item => ({
      ...item,
      currentPage: record,
      limit: size
    }))
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
                  Search <SearchOutlined style={{ marginLeft: '5px' }} />
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
                  Print <PrinterOutlined style={{ marginLeft: '5px' }} />
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
        <Table style={{ overflowX: "auto" }} dataSource={DataApi.order} columns={columns}
          pagination={{
            total: DataApi.totalData,
            onChange: (page, pageSize) => handleDetailClick(page, pageSize),
          }} />
      </Card>
    </div>
  );
}

export default LoseSale;
