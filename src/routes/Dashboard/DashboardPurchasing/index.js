import axios from "axios";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../Api/BaseUrl";
// import { Col, Row } from "react-bootstrap";
import { Card, Col, Row } from "antd";
import {
  CheckCircleOutlined,
  TeamOutlined,
  CloseOutlined,
  CheckOutlined,
  PieChartOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
function Index() {
  const [DataAwal, setDataAwal] = useState("");

  const ApiAwal = async () => {
    try {
      const data = await axios.get(`${Baseurl}information/get-inform-mitra`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(data.data.mitra[0]);
      setDataAwal(data.data.mitra[0]);
    } catch (error) {}
  };

  useEffect(() => {
    ApiAwal();
  }, []);
  return (
    <div>
      <Row gutter={[16,16]}>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Card style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <Row>
              <Col span={24} className="d-flex justify-content-center">
                <div
                  style={{
                    fontSize: "30px",
                    backgroundColor: "#1E90FF",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <UserAddOutlined style={{ color: "white" }}></UserAddOutlined>
                </div>
              </Col>
              <Col span={24} className="d-flex justify-content-center mt-2">
                <h6
                  className="text-dashboard-card"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Jumlah Mitra
                </h6>
              </Col>
              <Col span={24} className="d-flex justify-content-center">
                <h4 style={{ color: "#1A5CBF", fontWeight: "bold" }}>
                  {DataAwal?.jumlahMitra}
                </h4>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Card style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <Row>
              <Col span={24} className="d-flex justify-content-center">
                <div
                  style={{
                    fontSize: "30px",
                    backgroundColor: "#F28B2D",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <UserOutlined style={{ color: "white" }}></UserOutlined>
                </div>
              </Col>
              <Col span={24} className="d-flex justify-content-center mt-2">
                <h6
                  className="text-dashboard-card"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Unit Mitra
                </h6>
              </Col>
              <Col span={24} className="d-flex justify-content-center">
                <h4 style={{ color: "#1A5CBF", fontWeight: "bold" }}>
                  {DataAwal?.unitMitra}
                </h4>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Card style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <Row>
              <Col span={24} className="d-flex justify-content-center">
                <div
                  style={{
                    fontSize: "30px",
                    backgroundColor: "#C21070",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TeamOutlined style={{ color: "white" }}></TeamOutlined>
                </div>
              </Col>
              <Col span={24} className="d-flex justify-content-center mt-2">
                <h6
                  className="text-dashboard-card"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Driver Mitra
                </h6>
              </Col>
              <Col span={24} className="d-flex justify-content-center">
                <h4 style={{ color: "#1A5CBF", fontWeight: "bold" }}>
                  {DataAwal?.driverMitra}
                </h4>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      {/* <Row>
                <Col sm={3}>
                    <Card style={{ backgroundColor: "white", textAlign: 'center' }}>
                        <Row>

                            <Col span={2}>
                                <div style={{ color: "grey" }}>
                                Jumlah Mitra
                                </div>
                                <h5>
                                    {DataAwal?.jumlahMitra}
                                </h5>
                            </Col>
                            <Col span={2}>
                                <div style={{ fontSize: "30px", backgroundColor: '#00BFFF', borderRadius: "50%", width: "60px", height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <CheckOutlined style={{ color: "white" }}>
                                    </CheckOutlined>
                                </div>
                            </Col>

                        </Row>

                    </Card>
                </Col>
                <Col sm={3}>
                    <Card style={{ backgroundColor: "white", textAlign: 'center' }}>
                        <Row>

                            <Col span={2}>
                                <div style={{ color: "grey" }}>
                                Unit Mitra
                                </div>
                                <h5>
                                    {DataAwal?.unitMitra}
                                </h5>
                            </Col>
                            <Col span={2}>
                                <div style={{ fontSize: "30px", backgroundColor: '#00BFFF', borderRadius: "50%", width: "60px", height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <TeamOutlined style={{ color: "white" }}>
                                    </TeamOutlined>
                                </div>
                            </Col>

                        </Row>

                    </Card>
                </Col>
                    <Col sm={3}>
                        <Card style={{ backgroundColor: "white", textAlign: 'center' }}>
                            <Row>

                                <Col span={2}>
                                    <div style={{ color: "grey" }}>
                                    Driver Mitra
                                    </div>
                                    <h5>
                                        {DataAwal?.driverMitra}
                                    </h5>
                                </Col>
                                <Col span={2}>
                                    <div style={{ fontSize: "30px", backgroundColor: '#00BFFF', borderRadius: "50%", width: "60px", height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <PieChartOutlined style={{ color: "white" }}>
                                        </PieChartOutlined>
                                    </div>
                                </Col>

                            </Row>

                        </Card>
                    </Col>
            </Row> */}
    </div>
  );
}

export default Index;
