import { ArrowRightOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { BaseUrlRace } from "../../Api/BaseUrl";
import axios from "axios";
import card1 from "../../../src/assets/img/dashboard race/card1.png";
import card2 from "../../../src/assets/img/dashboard race/card2.png";
import card3 from "../../../src/assets/img/dashboard race/card3.png";
import card4 from "../../../src/assets/img/dashboard race/card4.png";
import graph1 from "../../../src/assets/img/graph1.png";
import graph2 from "../../../src/assets/img/graph2.png";
import graph3 from "../../../src/assets/img/graph3.png";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function DashboardCabang() {
  const [DataDashboard, setDataDashboard] = useState("");

  const fetchData = async () => {
    try {
      const respons = await axios.get(
        `${BaseUrlRace}sp/get-sp?limit=5&page=1&cabang=JKT`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      //   setDataRequest(respons.data.data.totalData);
      console.log("ini data splist ", respons.data);
    } catch (error) {}
  };

  useEffect(() => {
    // localStorage.getItem("jobdesk");
    fetchData();
  }, []);

  const pindah = useHistory()
  const spklist = () => {
      pindah.push(`/race/splist`)
  }
  const sjlist = () => {
      pindah.push(`/race/sjlist`)
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6} lg={6}>
          <Card
            style={{
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1) ",
              height: 160,
              width: "74%",
              padding: 0,
              backgroundImage: `url(${card1})`,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24} className="d-flex justify-content-start">
                <div
                  style={{
                    color: "white",
                    marginTop: "-15px",
                    marginLeft: "-10px",
                    fontSize: 15,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    display: "flex",
                    height: "120%",
                    fontFamily: "NoirPro",
                  }}
                >
                  Surat Perjalanan Kantor
                </div>
              </Col>
              <Col sm={24} className="d-flex justify-content-start ">
                <h3 style={{ color: "white", fontWeight: "bold" }}>SPK List</h3>
              </Col>
              <Col sm={24} className="d-flex justify-content-center">
                <Button
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    
                  }}
                  onClick={spklist}
                >
                  <span>
                    <h5 style={{ textAlign: "center" }} className="mt-2">
                      Lihat
                      <ArrowRightOutlined style={{ paddingLeft: "5px" }} />
                    </h5>
                  </span>
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <Card
            style={{
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1) ",
              height: 160,
              width: "74%",
              padding: 0,
              backgroundImage: `url(${card2})`,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24} className="d-flex justify-content-start">
                <div
                  style={{
                    color: "white",
                    marginTop: "-15px",
                    marginLeft: "-10px",
                    fontSize: 15,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    display: "flex",
                    height: "120%",
                    fontFamily: "NoirPro",
                  }}
                >
                  SO
                </div>
              </Col>
              <Col sm={24} className="d-flex justify-content-start ">
                <h3 style={{ color: "white", fontWeight: "bold" }}>SP List</h3>
              </Col>
              <Col sm={24} className="d-flex justify-content-center">
                <Button
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    
                  }}
                  onClick={sjlist}
                >
                  <span>
                    <h5 style={{ textAlign: "center" }} className="mt-2">
                      Lihat
                      <ArrowRightOutlined style={{ paddingLeft: "5px" }} />
                    </h5>
                  </span>
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      
    </div>
  );
}

export default DashboardCabang;
