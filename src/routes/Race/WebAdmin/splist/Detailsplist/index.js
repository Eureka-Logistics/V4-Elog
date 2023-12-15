import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import bk from "../../../../../assets/img/Group 18.png";
import { Card, Divider, Image, Steps, Table, Tag } from "antd";
import drivericon from "../../../../../assets/img/drivericon.png";
import "./style.css";
import axios from "axios";
import Baseurl, { BaseUrlRace } from "../../../../../Api/BaseUrl";
import { useParams } from "react-router-dom";
import moment from "moment";
import MapsGoogle from "../../../../../components/MapsGoole";
import ListModalFaktur from "./ListModalFaktur";
function DetailSPListRace({ AlamatMuatBongkarCoordinate }) {
  const { sm } = useParams();
  const [Loading, setLoading] = useState(false);
  const [DataApi, setDataApi] = useState([]);
  const [ModalBukaTutup, setModalBukaTutup] = useState(false)
  const [DetailHistory, setDetailHistory] = useState();
  const getDetailApi = async () => {
    setLoading(true);
    try {
      const data = await axios.get(`${BaseUrlRace}sp/get-sm-detail?msm=${sm}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (Array.isArray(data)) {
        setDataApi(data.data.data[0]);
        setLoading(false);
      } else {
        setDataApi([data.data.data[0]]);
        setLoading(false);
      }
    } catch (error) { }
  };

  const HistoryKendaraan = async () => {
    try {
      const datas = await axios.get(
        `${Baseurl}sm/get-history-kendaraan?id_msm=${sm}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setDetailHistory(datas.data.data);
    } catch (error) { }
  };

  console.log(`test`, DetailHistory);
  console.log(DataApi);
  useEffect(() => {
    getDetailApi();
    HistoryKendaraan();
  }, []);

  const [visible, setVisible] = useState(false);
  const [Gambarbukti, setImage] = useState("");
  const tableData = DataApi.map((item, index) => [
    {
      key: "driver1-" + index,
      label: "Driver",
      value: item.driver,
    },
    // {
    //     key: 'mitraPickup-' + index,
    //     label: 'Mitra Pickup',
    //     value: item.mitraPickup,
    // },
    {
      key: "unit1-" + index,
      label: "Nopol",
      value: item.nopol,
    },
    {
      key: "kendaraanMitra1-" + index,
      label: "Vehicle",
      value: item.jenisKendaraan,
    },
    // Add other rows as needed
  ]).flat();

  const columns = [
    {
      title: "Informasi",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Data",
      dataIndex: "value",
      key: "value",
    },
  ];
  return (
    <div>
      <Row>
        {DataApi &&
          DataApi.map((i) => (
            <Col style={{ backgroundColor: "" }}>
              <Row>
                <Col>
                  <h3>Detail SJ</h3>
                </Col>
              </Row>
              <div>List Faktur</div>
              <Button onClick={() => setModalBukaTutup(true)} >Lihat List Faktur</Button>
              <div>No. SJ</div>
              <div style={{ fontWeight: "bold" }}>{i?.msm}</div>
              <br />
              <div>Np. SP</div>
              <div style={{ fontWeight: "bold" }}>{i.sp}</div>
              <br />
              <div>Customer</div>
              <div style={{ fontWeight: "bold" }}>{i?.customer}</div>
              <br />
              <div>Jenis Barang</div>
              <div style={{ fontWeight: "bold" }}>{i?.jenisBarang}</div>
              <br />
              <div>SJ Erl</div>
              <div style={{ fontWeight: "bold" }}>{i?.sjErl}</div>
              <br />
              <div>Sales Erl</div>
              <div style={{ fontWeight: "bold" }}>{i?.salesErl}</div>
              <br />
              <div>Pickup Address</div>
              <div style={{ fontWeight: "bold" }}>{i?.alamatMuat?.alamat}</div>
              <br />
              <div>Destination Address</div>
              <div style={{ fontWeight: "bold" }}>{i?.alamatBongkar?.alamat}</div>
              <br />
              <div>Sekolah Tujuan</div>
              <div style={{ fontWeight: "bold" }}>{i?.sekolahTujuan}</div>
              <br />
              <div>Berat</div>
              <div style={{ fontWeight: "bold" }}>{i?.berat}</div>
              <br />
              <div>Koli</div>
              <div style={{ fontWeight: "bold" }}>{i?.koli}</div>
              <br />
              <div>Qty</div>
              <div style={{ fontWeight: "bold" }}>{i?.qty}</div>
              <br />
              <div>Ikat</div>
              <div style={{ fontWeight: "bold" }}>{i?.ikat}</div>
            </Col>
          ))}
        {Loading === true ? (
          <div>Loading</div>
        ) : (
          <Col
            md={6}
            style={{
              backgroundColor: "#1A3368",
              backgroundImage: `url(${bk})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right center",
              backgroundSize: "auto",
            }}
          >
            <h3 className="mt-3" style={{ color: "white" }}>
              Tracking Pengiriman
            </h3>
            <Container>
              <MapsGoogle
                posisiDriver={DataApi?.positionDriverNow}
                // AlamatMuatBongkarCoordinate={AlamatMuatBongkarCoordinate}
                width={"auto"}
                height={300}
              />
              <Row style={{ height: "432px" }}>
                <Col style={{ backgroundColor: "", marginTop: 10 }}>
                  <Steps
                    className="my-custom-steps"
                    direction="vertical"
                    size="small"
                    current={5}
                    style={{
                      padding: "20px",
                      width: 400,
                      height: 500,
                      color: "white",
                    }}
                    items={DataApi?.[0]?.statusKendaraan.map((item, index) => ({
                      title: <span style={{ color: "white" }}>{item.status}</span>,
                      description: (<>
                        <span style={{ color: "white" }}>
                          {item.keterangan === undefined
                            ? "Belum ada Data"
                            : `${item.keterangan} (${item.date})`}
                        </span>
                        <span style={{ marginRight: 20 }} className="mr-3">
                          <Button className="mr-4" size="small"
                            onClick={() => { setImage(item.foto); setVisible(true) }}
                          >Lihat Foto</Button>


                        </span>
                      </>
                      ),
                    }))}
                  />
                </Col>
              </Row>
            </Container>
            <Row style={{ marginTop: 350 }}>
              <Container style={{ display: "flex", justifyContent: "center" }}>
                <Card style={{ borderRadius: 15, width: 700 }}>
                  <Row>
                    <Col md={12}>
                      <h5>Informasi Driver</h5>
                      <Table
                        dataSource={tableData}
                        columns={columns}
                        pagination={false}
                      />
                    </Col>
                    {/* <Col sm={4}>
                                        <div style={{ backgroundColor: "#1f3d7d", padding: 10, borderRadius: 15 }}>
                                            <div style={{ color: "white", fontWeight: "bold" }}>
                                                <p>{DataApi[0]?.sp}</p>
                                                <p>{DataApi[0]?.sm}</p>
                                                <p>{DataApi[0]?.destination}</p>
                                            </div>
                                        </div>
                                    </Col> */}
                  </Row>
                </Card>
              </Container>
              {/* <p className='d-flex justify-content-center' style={{ color: "white" }}>Butuh Bantuan? <span><a className='ms-2' style={{ color: "#5297FF", textDecoration: "none" }}>Klik Disini</a></span></p> */}
            </Row>
          </Col>
        )}

      </Row>
      <Image
        width={50}
        style={{
          display: 'none',
        }}
        src={Gambarbukti}
        preview={{
          visible,
          src: Gambarbukti,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
      <ListModalFaktur DataApi={DataApi} ModalBukaTutup={ModalBukaTutup} setModalBukaTutup={setModalBukaTutup} />
    </div>

  );
}

export default DetailSPListRace;
