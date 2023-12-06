import axios from "axios";
import React, { useEffect } from "react";
import {
  useParams,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { BaseUrlRace } from "../../../../../Api/BaseUrl";
import { Card, Input, Tag,  Col, Row } from "antd";
import { Table } from "react-bootstrap";
import { SpDetailRaceZustand } from "../../../../../zustand/Store/Race/fetch/spDetail/SpdEtail";

function DetailSpRace() {
  const { idMp } = useParams();
  const { FetcSPDetail, DataSemuaDarizustand } = SpDetailRaceZustand();
  useEffect(() => {
    FetcSPDetail(idMp);
  }, []);
  console.log(`dari zustand`, DataSemuaDarizustand);

  if (!DataSemuaDarizustand) {
    return <>loading</>;
  }
  return (
    <div style={{fontFamily: 'NoirPro'}}>
      <Card>
        <h4>
            Detail SP 
        </h4>
        <hr/>
        <Row gutter={[16,16]}> 
          <Col xs={24} sm={12} md={12}>
            <div className="mt-2 mb-2" style={{fontWeight: 'bold'}}>No SP</div>
            <Input value={DataSemuaDarizustand?.sp} />
          </Col>
          <Col xs={24} sm={12} md={12}>
            <div className="mt-2 mb-2" style={{fontWeight: 'bold'}}>SJ Erl</div>
            <Input value={DataSemuaDarizustand?.sjErl} />
          </Col>
        </Row>
        <Row gutter={[16,16]} className="mt-3">
          <Col xs={24} sm={12} md={6}>
            <div className="mt-2 mb-2" style={{fontWeight: 'bold'}}>Cabang</div>
            <Input value={DataSemuaDarizustand?.cabang}></Input>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className="mt-2 mb-2" style={{fontWeight: 'bold'}}>Tanggal Pickup</div>
            <Input value={DataSemuaDarizustand?.tgl_pickup}></Input>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className="mt-2 mb-2" style={{fontWeight: 'bold'}}>Jenis Barang</div>
            <Input value={DataSemuaDarizustand?.jenisBarang}></Input>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className="mt-2 mb-2" style={{fontWeight: 'bold'}}>Sales Erl</div>
            <Input value={DataSemuaDarizustand?.salesErl}></Input>
          </Col>
        </Row>
        <br />
        <hr />
        <Table responsive>
          {DataSemuaDarizustand &&
            DataSemuaDarizustand.detail &&
            DataSemuaDarizustand.detail.map((data, index) => (
              <React.Fragment key={index}>
                <tr style={{ fontWeight: "bold" }}>
                  <td colSpan={10}>
                    {/* <hr /> */}
                    <br />{" "}
                  </td>
                </tr>
                <tr
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#f05423",
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  <td style={{ backgroundColor: "transparent" , height: '50px', width: '10%', justifyContent: 'center', alignContent: 'center'}}>No.</td>
                  <td style={{ backgroundColor: "transparent" }}>
                    Alamat Sekolah
                  </td>
                  <td style={{ backgroundColor: "transparent" }}>PIC Telp</td>
                  <td style={{ backgroundColor: "transparent" }}>No SM</td>

                  <td style={{ backgroundColor: "transparent" }}>
                    Sekolah Tujuan
                  </td>
                  <td style={{ backgroundColor: "transparent" }}>Kendaraan</td>
                  <td style={{ backgroundColor: "transparent" }}>Qty</td>
                  <td style={{ backgroundColor: "transparent" }}>Ikat</td>
                  <td style={{ backgroundColor: "transparent" }}>Berat</td>
                </tr>

                <tr key={index}>
                  <td style={{fontWeight: 'bold'}}>{index + 1}.</td>
                  <td>{data.alamatSekolah}</td>
                  <td>{data.picTelp}</td>
                  <td>
                    <Tag color="#B0E0E6">{data.sm}</Tag>
                  </td>
                  <td>{data.sekolahTujuan}</td>
                  <td>
                    <Tag color="#FA8072">{data.driver}</Tag>
                    <br />
                    <Tag color="#EEE8AA">{data.jenisKendaraan}</Tag>
                    <br />
                    <Tag color="#98FB98">{data.noPol}</Tag>
                  </td>
                  <td>{data.qty}</td>
                  <td>{data.ikat}</td>
                  <td>{data.berat}</td>
                </tr>
              </React.Fragment>
            ))}
        </Table>
      </Card>
    </div>
  );
}

export default DetailSpRace;
