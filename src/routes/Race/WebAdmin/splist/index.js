import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Drawer, Input, Select, Space, Timeline } from "antd";
import { size } from "lodash";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./style.css";
import map from "../../../../assets/img/peta.png";
import icondriver from "../../../../assets/img/drivericon.png";
import telponicon from "../../../../assets/img/telponicon.png";
import whatsappicon from "../../../../assets/img/whatsappicon.png";
import truck from "../../../../assets/img/Truck Illu 1.png";
import vespa from "../../../../assets/img/vesva.png";
import ListPengiriman from "./ListPengirimanCardComponent";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MapContainer from "../../../MasterData/Monitoring/Test";
import { BaseUrlRace } from "../../../../Api/BaseUrl";
import * as XLSX from "xlsx";
import axios from "axios";
function SpListRace() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [OptionsState, setOptionsState] = useState("");
  const NamaCabang = localStorage.getItem("cabang");
  const LoginCabang = localStorage.getItem("loginBu")
  const [Cabang, setCabang] = useState(
    ""
  );
  // const [Cabang, setCabang] = useState(
  //   NamaCabang === "RCCGK" ? "JKT" : NamaCabang
  // );
  const showDefaultDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [CariDisini, setCariDisini] = useState("");
  console.log(CariDisini);
  const pindahdetailsp = () => {
    history.push(`/race/detailsplistrace/:idmp`);
  };

  function sendMessage() {
    const phoneNumber = "6281221871961";
    const name = "Bapak Budiawan Suprapto";
    const message = `Halo ${name},
        
        Semoga Anda dalam keadaan baik-baik saja. Saya ingin menanyakan bagaimana keadaan Anda selama melakukan perjalanan dan proses pengangkutan barang. Apakah semuanya berjalan lancar atau ada kendala tertentu yang perlu kami ketahui? Apabila ada masalah atau hambatan, tolong beritahu kami agar kami bisa memberikan bantuan atau solusi secepatnya. Terima kasih atas perhatian dan kerja keras Anda. Kami menghargai dedikasi Anda dalam menjalankan tugas ini.
   
        
Salam hangat,
[Tim Race]`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
  }

  const pilihcabangselect = async () => {
    try {
      const data = await axios.get(`${BaseUrlRace}sp/get-cabang`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4MzM3Mzg2LCJleHAiOjE2OTg0MjM3ODZ9.G3wsj2FXma8aAISzJbzhqmnrWs6DSOYDgHrF7RMsQS0',
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(data.data.data);
      setOptionsState(data.data.data);
    } catch (error) { }
  };


  const [Spdata, setSpdata] = useState({
    Isi: null,
    Paggination: null,
    size: 10,
  });
  const [filtertanggal, setfiltertanggal] = useState("")
  const exportToExcel = async (page = 1) => {
    try {
      setExporting(true);
      const response = await axios.get(
        `${BaseUrlRace}sp/get-sp?limit=${Spdata?.size}&page=${page}&cabang=${Cabang}&keyword=${CariDisini}&tglSp=${filtertanggal}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setExporting(false);
      const data = response.data.data.order; // Assuming this is the array you want to export

      // Convert data to Excel format
      const ws = XLSX.utils.json_to_sheet(data);

      const columnWidths = [
        { wch: 5 }, // no
        { wch: 12 }, // idmp
        { wch: 20 }, // so
        { wch: 10 }, // cabang
        { wch: 35 }, // sales
        { wch: 23 }, // sj erlangga
        { wch: 18 }, // kendaraan
        { wch: 35 }, // sekolah tujuan

        // Add more objects for additional columns as needed
      ];

      // Apply width to specific columns
      ws["!cols"] = columnWidths;

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // Save the Excel file
      XLSX.writeFile(wb, "Export_Data_SP.xlsx");
    } catch (error) {
      // Handle error
      setExporting(false);
      console.error("Error exporting data: ", error);
    }
  };

  useEffect(() => {
    pilihcabangselect();
  }, [Cabang, filtertanggal]);

  return (
    <div>
      <Drawer
        title="Tracking Pengiriman"
        width={3220}
        closable={false}
        onClose={onClose}
        open={open}
      >
        <Card
          bodyStyle={{ padding: 0 }}
          style={{ height: 455, overflow: "hidden" }}
        >
          <MapContainer />
        </Card>
        <Card bodyStyle={{ padding: 0 }} style={{ height: 270 }}>
          <Container>
            <p style={{ fontWeight: "bold", fontSize: 20 }}>Informasi Driver</p>
            <Row style={{ marginTop: "20px" }}>
              <Col sm={2}>
                <img
                  src={icondriver}
                  style={{
                    height: "80px",
                    width: "93px",
                    borderRadius: "10px",
                  }}
                ></img>
              </Col>
              <Col sm={6}>
                <p style={{ fontWeight: "bold" }}>Budiawan Suprapto</p>
                <p style={{ fontWeight: "bold" }}>P1239100</p>
                <p style={{ fontWeight: "bold" }}>B2 UMUM</p>
              </Col>
              <Col
                sm={4}
                className="d-flex justify-content-end align-items-center"
              >
                <img
                  src={telponicon}
                  style={{
                    height: "80px",
                    width: "93px",
                    borderRadius: "10px",
                  }}
                ></img>
                <img
                  onClick={sendMessage}
                  src={whatsappicon}
                  style={{
                    height: "80px",
                    width: "93px",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                ></img>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col>
                <div style={{ fontWeight: "bold", fontSize: 20 }}>
                  Informasi Perjalanan
                </div>
              </Col>
              <Col className="d-flex justify-content-end">
                <Button
                  onClick={pindahdetailsp}
                  style={{
                    backgroundColor: "blue",
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "white",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  Cek Detail
                </Button>
              </Col>
            </Row>
            <Col>
              <div className="timeline-container">
                <div className="timeline-line"></div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-label">Ready</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-label">Pick Up</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-label">Delivery</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-label">Unloading</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-label">Success</div>
                </div>
              </div>
            </Col>
          </Container>
        </Card>
      </Drawer>
      {/* <Row>
        <Col sm={12}>
          <Card>
            <Row>
              <Col sm={8}>
                <Row>
                  <Col style={{ backgroundColor: "white" }}>
                    05 September 2023
                  </Col>
                </Row>
                <Row>
                  <Col style={{ backgroundColor: "white" }}>
                    Jumlah Pengiriman Anda
                  </Col>
                </Row>
              </Col>
              <Col sm={2} style={{ backgroundColor: "white" }}>
                02 <br /> Selesai
              </Col>
              <Col sm={2} style={{ backgroundColor: "white" }}>
                10 <br /> Total
              </Col>
            </Row>
          </Card>
        </Col>
      </Row> */}
      <Row>
        <Col sm={4}>
          <h5 style={{ fontSize: 30 }}>List Pengiriman</h5>
        </Col>
        <Col sm={2} className="d-flex justify-content-end">
          <Button
            style={{
              backgroundColor: "green",
              color: "white",
              fontFamily: "NoirPro",
            }}
            onClick={exportToExcel}
            disabled={exporting} // Disable the button when exporting is in progress
          >
            {exporting ? "Exporting..." : "Export to Excel"}
          </Button>
        </Col>
        <Col sm={2}>
          <DatePicker
            onChange={(e, w) => setfiltertanggal(w)}
            style={{ width: '100%' }}

            placeholder="Filter Tanggal"
          />
        </Col>
        <Col sm={2}>
          <Input
            onChange={(e) => setCariDisini(e.target.value)}
            style={{ height: "50px", width: '100%' }}
            addonBefore={<SearchOutlined />}
            placeholder="Cari Disini"
          />
        </Col>

        {!LoginCabang && (
          <Col sm={2}>
            <Select
              optionFilterProp="children"
              showSearch
              onChange={(e) => setCabang(e)}
              placeholder={Cabang}
              style={{ width: "100%" }}
              value={Cabang}
            >
              <Select.Option
                value={""}
              >
                -
              </Select.Option>
              {OptionsState &&
                OptionsState.map((data, index) => (
                  <Select.Option
                    description={data?.description}
                    key={data.whid}
                    whid={data?.whid}
                    value={data.cabangId}
                  >
                    {data?.description}
                  </Select.Option>
                ))}
            </Select>
          </Col>
        )}


      </Row>
      <ListPengiriman
        Cabang={Cabang}
        CariDisini={CariDisini}
        setOpen={setOpen}
        filtertanggal={filtertanggal}
      />
    </div>
  );
}

export default SpListRace;
