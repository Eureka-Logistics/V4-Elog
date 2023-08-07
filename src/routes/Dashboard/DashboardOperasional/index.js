import { Card, Pagination, Tag, Row, Col, Button } from "antd";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import Baseurl from "../../../Api/BaseUrl";
import axios from "axios";
import {
  CheckCircleOutlined,
  TeamOutlined,
  CloseOutlined,
  CheckOutlined,
  PieChartOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
// import { Col, Row } from 'react-bootstrap';
import { format } from "date-fns";
import ElogGif from "../../../assets/Loader_Elogs1.gif";
function Index() {
  const [inform, setinform] = useState("");
  const [Data, setData] = useState("");
  const [STNK, setStnk] = useState("");
  const jobdesk = localStorage.getItem("jobdesk");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [currentPageSTNK, setCurrentPageSTNK] = useState(1);
  const [pageSizeSTNK, setPageSizeSTNK] = useState(5);
  const [JumlahExpSIM, setJumlahExpSIM] = useState("");
  const [JumlahExpSTNK, setJumlahExpSTNK] = useState("");

  const paginatedData = Data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const paginatedDataSTNK = STNK.slice(
    (currentPageSTNK - 1) * pageSizeSTNK,
    currentPageSTNK * pageSizeSTNK
  );

  const columns = [
    {
      name: "No",
      width: "10%",
      selector: (row, index) => (currentPage - 1) * pageSize + index + 1,
      
    },
    {
      name: "Nama Driver",
      width: "60%",
      selector: (row) => row.driverName,
    },
    {
      name: "Tanggal SIM",
      selector: (row) => {
        const date = new Date(row.simDate);
        const formattedDate = format(date, "dd-MM-yyyy");
        return <Tag color="#DB260E">{formattedDate}</Tag>;
      },
      
    },
    
  ];
  const STNKTable = [
    {
      name: "No",
      width: "10%",
      selector: (row, index) =>
        (currentPageSTNK - 1) * pageSizeSTNK + index + 1,
        
    },
    {
      name: "Kode Kendaraan",
      selector: (row) => row.kendaraanKode,
    },
    {
      name: "No Polisi",
      selector: (row) => row.nopol,
    },
    {
      name: "Tanggal SIM",
      selector: (row) => {
        return <Tag color="#DB260E ">{row?.tglStnk}</Tag>;
      },
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Baseurl}information/get-inform-ops`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        const data = response.data?.operasional?.[0];
        console.log(response.data?.operasional?.[0]);
        setinform(response.data?.operasional?.[0]);
        setData(response.data.operasional?.[0]?.sim.driver);
        setStnk(response.data.operasional?.[0]?.stnk?.noplat);
        setJumlahExpSIM(response.data?.operasional?.[0]?.sim?.SimExpired);
        setJumlahExpSTNK(response.data?.operasional?.[0]?.stnk?.ExpireStnk);
        console.log(response.data.operasional?.[0]?.stnk.driver);
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error Login, Silahkan Login Kembali ",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        if (localStorage.getItem("token") === null) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error Login, Silahkan Login Kembali ",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          // history.push('/signin');
        }
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    localStorage.getItem("jobdesk");
    fetchData();
  }, []);

  if (!inform) {
    return <img src={ElogGif} width="100%"></img>;
  }



  return (
    <div>
      {/* <h5>Dashboard {jobdesk}</h5> */}
      <Row>
        <Col span={6}>
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
                  <UserOutlined style={{ color: "white" }}></UserOutlined>
                </div>
              </Col>
              <Col span={24} className="d-flex justify-content-center mt-2">
                <h6 style={{ color: "black", fontWeight: "bold" }}>
                  Driver Eureka
                </h6>
              </Col>
              <Col span={24} className="d-flex justify-content-center">
                <h4 style={{ color: "#1A5CBF", fontWeight: "bold" }}>
                  {inform?.EurekaDriver}
                </h4>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
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
                  <UserAddOutlined style={{ color: "white" }}></UserAddOutlined>
                </div>
              </Col>
              <Col span={24} className="d-flex justify-content-center mt-2">
                <h6 style={{ color: "black", fontWeight: "bold" }}>
                  Driver Sewa
                </h6>
              </Col>
              <Col span={24} className="d-flex justify-content-center">
                <h4 style={{ color: "#1A5CBF", fontWeight: "bold" }}>
                  {inform?.SewaDriver}
                </h4>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
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
                <h6 style={{ color: "black", fontWeight: "bold" }}>
                  Total Driver
                </h6>
              </Col>
              <Col span={24} className="d-flex justify-content-center">
                <h4 style={{ color: "#1A5CBF", fontWeight: "bold" }}>
                  {inform?.totalDriver}
                </h4>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <Row>
              <Col span={24} className="d-flex justify-content-center">
                <div
                  style={{
                    fontSize: "30px",
                    backgroundColor: "#47AF89",
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
                <h6 style={{ color: "black", fontWeight: "bold" }}>
                  Driver aktif
                </h6>
              </Col>
              <Col span={24} className="d-flex justify-content-center">
                <h4
                  style={{
                    color: "#1A5CBF",
                    fontWeight: "bold",
                    marginRight: "5px",
                  }}
                >
                  {inform?.activeDriver}
                </h4>
                <h4 style={{ color: "black", fontWeight: "bold" }}>/</h4>
                <h4
                  style={{
                    color: "#F08080",
                    fontWeight: "bold",
                    marginLeft: "5px",
                  }}
                >
                  {inform?.totalDriver}
                </h4>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Card>
        <Button
          style={{
            backgroundColor: "#FFBEB5",
            color: "#9B0101",
            fontWeight: "bold",
          }}
        >
          Jumlah SIM EXPIRED : {JumlahExpSIM}
        </Button>
        <DataTable
          columns={columns}
          data={paginatedData}
        />
        <div className="d-flex mt-3 justify-content-end">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={Data.length}
            onChange={(page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            }}
          />
        </div>
      </Card>
      <Card>
      <Button
          style={{
            backgroundColor: "#FFBEB5",
            color: "#9B0101",
            fontWeight: "bold",
          }}
        >
          Jumlah STNK EXPIRED : {JumlahExpSTNK}
        </Button>
        <div className="mt-2">
          <DataTable
            columns={STNKTable}
            data={paginatedDataSTNK}
            // title={
            //   <Tag color="#f50">Jumlah STNK EXPIRED : {JumlahExpSTNK}</Tag>
            // }
          />
        </div>
        <div className="d-flex mt-3 justify-content-end">
          <Pagination
            current={currentPageSTNK}
            pageSize={pageSizeSTNK}
            total={STNK.length}
            onChange={(page, pageSizeSTNK) => {
              setCurrentPageSTNK(page);
              setPageSizeSTNK(pageSizeSTNK);
            }}
          />
        </div>
      </Card>
    </div>
  );
}

export default Index;
