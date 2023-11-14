import {
  Button,
  Card,
  Drawer,
  Form,
  Input,
  Pagination,
  Select,
  Skeleton,
  Table,
  Tag,
  notification,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Baseurl from "../../../../Api/BaseUrl";
import MapContainer from "../../../MasterData/Monitoring/Test";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import icondriver from "../../../../assets/img/drivericon.png";
import telponicon from "../../../../assets/img/telponicon.png";
import whatsappicon from "../../../../assets/img/whatsappicon.png";
import "./style.css";
import { getCoordinates } from "../../../../Api/Geocode";
import MapsGoogle from "../../../../components/MapsGoole";
import useCoordinateRaceMap from "../../../../zustand/Store/coordinateMapRace/RaceMaps";
import DetailSPListRace from "../splist/Detailsplist";
function SMList({ }) {
  const [Open, setOpen] = useState(false);
  const [CariSJ, SetCariSJ] = useState("");
  const [NamaSupir, setNamaSupir] = useState("");
  const [LoadingBang, setLoadingBang] = useState(false);
  const [DetailDataPerClick, setDetailDataPerClick] = useState([]);
  const showDefaultDrawer = (e) => {
    setOpen(true);
  };
  const { Coordinate, setCoordinate, JarakDanWaktu } = useCoordinateRaceMap();
  console.log(`CoordinateRaceMap`, Coordinate);
  const [AlamatMuatBongkarCoordinate, setAlamatMuatBongkarCoordinate] =
    useState({
      AlamatMuat: "",
      AlamatBongkar: "",
    });
  const [DataApi, setDataApi] = useState({
    Data: null,
    totalData: "",
    totalPage: "",
    currentPage: 1,
    limit: 10,
  });

  const DataApiSM = async (s = 1) => {
    setLoadingBang(true);
    try {
      const dataa = await axios.get(
        `https://api.eurekalogistics.co.id/sm/get-sm?limit=${DataApi.limit}&page=${s}&keyword=${CariSJ}&kodeCabang=&mitra1=&mitra2=&mitra3=&id_bu=&id_bu_brench=`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setDataApi((data) => ({
        ...data,
        Data: dataa?.data?.data?.order,
        totalData: dataa?.data?.data?.totalData,
        totalPage: dataa?.data?.data?.totalPage,
        currentPage: dataa?.data?.data?.currentPage,
      }));
      setLoadingBang(false);
    } catch (error) {
      notification.error({
        message: error.response.data.status.message,
      });
    }
  };
  useEffect(() => {
    DataApiSM();
  }, [CariSJ, DataApi.limit]);

  const history = useHistory();
  const pindahdetailsp = () => {
    if (
      !DetailDataPerClick?.other?.id_mpd ||
      !DetailDataPerClick?.other?.id_msm
    ) {
      notification.error({
        message: "Error",
        description: "Tidak ada id_mpd || id_msm",
      });
    } else {
      history.push(
        `/race/detailsplistrace/${DetailDataPerClick?.other?.id_mpd}/${DetailDataPerClick?.other?.id_msm}`
      );
    }
  };

  function sendMessage() {
    const phoneNumber = "6281221871961";
    const name = NamaSupir;
    const message = `Halo ${name},
        
        Semoga Anda dalam keadaan baik-baik saja. Saya ingin menanyakan bagaimana keadaan Anda selama melakukan perjalanan dan proses pengangkutan barang. Apakah semuanya berjalan lancar atau ada kendala tertentu yang perlu kami ketahui? Apabila ada masalah atau hambatan, tolong beritahu kami agar kami bisa memberikan bantuan atau solusi secepatnya. Terima kasih atas perhatian dan kerja keras Anda. Kami menghargai dedikasi Anda dalam menjalankan tugas ini.
   
        
Salam hangat,
[Tim Race]`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
  }
  const onClose = () => {
    setOpen(false);
  };
  console.log(`DataApi`, DataApi);

  function Paginations(s, u) {
    DataApiSM(s);
    setDataApi((items) => ({
      ...items,
      limit: u,
    }));
  }
  const [isDataFetched, setIsDataFetched] = useState(false);
  useEffect(() => {
    setIsDataFetched(true);
    const fetchData = async () => {
      const AlamatMuat = await getCoordinates(
        DetailDataPerClick?.other?.m_pengadaan_detail?.muat?.alamat ||
        DetailDataPerClick?.other?.m_pengadaan_detail?.muat?.alamat_detail
      );
      const Bongkar = await getCoordinates(
        DetailDataPerClick?.other?.m_pengadaan_detail?.bongkar?.alamat ||
        DetailDataPerClick?.other?.m_pengadaan_detail?.bongkar?.alamat_detail
      );

      setAlamatMuatBongkarCoordinate((item) => ({
        ...item,
        AlamatMuat: AlamatMuat,
        AlamatBongkar: Bongkar,
      }));
      setCoordinate({
        AlamatMuat,
        Bongkar,
      });
      // console.log(`ini dari DetailDataPerClick`, AlamatMuat);
      // console.log(`ini dari DetailDataPerClick`, Bongkar);
    };
    setIsDataFetched(false);
    fetchData();
  }, [DetailDataPerClick]);

  console.log(`DetailDataPerClick`, DetailDataPerClick);
  const tableData = [DetailDataPerClick];

  const columns = [
    {
      title: 'Driver',
      dataIndex: 'driver1',
      key: 'driver1',
    },
    {
      title: 'Vehicle',
      dataIndex: 'kendaraanMitra1',
      key: 'kendaraanMitra1',
    },
    {
      title: 'Unit',
      dataIndex: 'unit1',
      key: 'unit1',
    },
    {
      title: 'SP',
      dataIndex: 'sp',
      key: 'sp',
    },
    {
      title: 'SM',
      dataIndex: 'sm',
      key: 'sm',
    },
    {
      title: 'Pickup Date',
      dataIndex: 'tglPickup',
      key: 'tglPickup',
    },
    // Add other columns as needed
  ];

  const tableData2 = [
    {
      key: 'jarak',
      label: 'Jarak',
      value: JarakDanWaktu?.jarak?.text
    },
    {
      key: 'waktu',
      label: 'Waktu',
      value: JarakDanWaktu?.waktu?.text
    },
    {
      key: 'customer',
      label: 'Customer',
      value: DetailDataPerClick.customer
    },
    {
      key: 'destination',
      label: 'Destination',
      value: DetailDataPerClick.destination
    },
    {
      key: 'muatAlamat',
      label: 'Alamat Muat',
      value: DetailDataPerClick?.other?.m_pengadaan_detail?.muat?.alamat
    },
    {
      key: 'bongkarAlamat',
      label: 'Alamat Bongkar',
      value: DetailDataPerClick?.other?.m_pengadaan_detail?.bongkar?.alamat
    },
    // Add other rows as needed
  ];

  const columns2 = [
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Informasi',
      dataIndex: 'value',
      key: 'value',
    },
  ];
  return (
    <div>
      {DetailDataPerClick ? (
        <Drawer
          title={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
              <span style={{ marginRight: 10 }}>Tracking Pengiriman</span>
              <div>{DetailDataPerClick?.sm}</div>
              <Button
                onClick={pindahdetailsp}
                className="mt-3"
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
            </div>
          }
          width={3220}
          closable={false}
          onClose={onClose}
          open={Open}
        >
          <Card
            bodyStyle={{ padding: 0 }}
            style={{ height: 350, overflow: "hidden" }}
          >
            {!isDataFetched ? (
              <MapsGoogle
                AlamatMuatBongkarCoordinate={AlamatMuatBongkarCoordinate}
                width={730}
                height={350}
              />
            ) : (
              <div>Loading...</div> // tampilkan pesan loading atau komponen lainnya saat data belum selesai di-fetch
            )}

            {/* <MapContainer AlamatMuatBongkarCoordinate={AlamatMuatBongkarCoordinate} /> */}
          </Card>
          <Card bodyStyle={{ padding: 0 }} style={{ height: "auto", marginTop: 0, paddingTop: 0 }}>
            <Container>
              <p style={{ fontWeight: "bold", fontSize: 20 }}>
                Informasi Driver
              </p>
              <Row style={{ marginTop: "" }}>
                <Table dataSource={tableData} columns={columns} pagination={false} />
              </Row>
              <Row style={{}} className="align-items-center">
                <Col style={{ backgroundColor: "" }} >
                  <Col style={{ backgroundColor: "" }}>
                    <div style={{ fontWeight: "bold", fontSize: 20, marginBottom: 4, marginTop: 10 }}>
                      Informasi Perjalanan
                    </div>
                  </Col>
                  <Table dataSource={tableData2} columns={columns2} pagination={false} />
                </Col>
                {/* <Col className="d-flex justify-content-end">
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
                </Col> */}
              </Row>
            </Container>
          </Card>
        </Drawer>
      ) : (
        <>Loading</>
      )}
      <Row>
        <Col className="ms-3" sm={4} md={2}>
          <Form.Item>
            <div style={{ fontWeight: "bold" }}>Cari SJ</div>
            <Input
              onChange={(e) => {
                SetCariSJ(e.target.value);
              }}
            />
          </Form.Item>
        </Col>
        <Col className="ms-3" sm={4} md={2}>
          <Form.Item>
            <div style={{ fontWeight: "bold" }}>Cari Nama Customer</div>
            <Input
              onChange={(e) => {
                SetCariSJ(e.target.value);
              }}
            />
          </Form.Item>
        </Col>
        <Col className="ms-3" sm={4} md={2}>
          <Form.Item>
            <div style={{ fontWeight: "bold" }}>Cari Pic Alamat</div>
            <Select
              onChange={(e) => {
                SetCariSJ(e.target.value);
              }}
            />
          </Form.Item>
        </Col>
        <Col>
          <div style={{ fontWeight: "bold", marginTop: 20 }}></div>
          <Pagination
            className="d-flex justify-content-end"
            // current={1}
            onChange={(page, size) => Paginations(page, size)}
            total={DataApi.totalData}
          // pageSize={10}
          />
        </Col>
      </Row>
      <Row>
        {!DataApi.Data && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            Loading...
          </div>
        )}

        {DataApi.Data &&
          DataApi.Data.map((i, currentIndex) => {
            const index =
              (DataApi.currentPage - 1) * DataApi.limit + currentIndex;

            // rest of your code
            return (
              <>
                {LoadingBang ? (
                  <Skeleton />
                ) : (
                  <Col sm={12} md={6}>
                    <Card
                      hoverable
                      size="lg"
                      onClick={async (e) => {
                        // console.log(`ini i i`, i);
                        setNamaSupir(i?.driver1);
                        setDetailDataPerClick(i);
                        showDefaultDrawer(i);
                      }}
                      style={{
                        height: 230,
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Container>
                        <Row style={{ marginTop: -10 }}>
                          <Col>
                            <Button disabled type="primary">
                              {index + 1}
                            </Button>
                          </Col>
                          <Col sm={6}>
                            <h3>
                              <Tag style={{ fontSize: 18 }} color="orange">
                                {i.sp}
                              </Tag>
                            </h3>
                          </Col>
                          <Col sm={4}>
                            <h3>
                              <Tag style={{ fontSize: 18 }} color="blue">
                                {i.sm}
                              </Tag>
                            </h3>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Row style={{ backgroundColor: "" }}>
                            <Col sm={6} md={4}>
                              <p
                                style={{
                                  marginBottom: "0px",
                                  fontWeight: "bold",
                                }}
                              >
                                Pelanggan
                              </p>
                            </Col>
                            <Col sm={6} md={4}>
                              <p
                                style={{
                                  marginBottom: "0px",
                                  fontWeight: "bold",
                                  display: "",
                                  justifyContent: "",
                                }}
                              >
                                Tanggal Pick Up
                              </p>
                            </Col>

                            <Col sm={4} md={4}>
                              <p style={{ marginTop: "", fontWeight: "bold" }}>
                                Kendaraan Pickup
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={6} md={4}>
                              <p
                                style={{
                                  marginTop: "0px",
                                  marginBottom: "0px",
                                  fontWeight: "bold",
                                }}
                              >
                                <Tag color="yellow">{i.bu}</Tag>
                              </p>
                            </Col>
                            <Col md={4}>
                              <p
                                style={{
                                  backgroundColor: "",
                                  fontWeight: "bold",
                                }}
                              >
                                <Tag color="blue">{i.tglPickup}</Tag>
                              </p>
                            </Col>
                            <Col sm={6} md={4}>
                              <p
                                style={{ marginTop: "0px", fontWeight: "bold" }}
                              >
                                <Tag color="green">{i?.kendaraanPickup}</Tag>{" "}
                              </p>
                            </Col>
                          </Row>
                        </Row>

                        <Row style={{ backgroundColor: "" }}>
                          <Col>
                            <div style={{ marginTop: "", fontWeight: "bold" }}>
                              Destination
                            </div>
                            <div style={{ marginTop: "", fontWeight: "bold" }}>
                              <Tag color="teal">{i.destination}</Tag>
                            </div>
                          </Col>
                          <Col style={{}}>
                            <div
                              style={{
                                justifyContent: "end",
                                display: "flex",
                                marginTop: "",
                                fontWeight: "bold",
                              }}
                            >
                              Nama Driver
                            </div>
                            <div
                              style={{
                                justifyContent: "end",
                                display: "flex",
                                marginTop: "",
                                fontWeight: "bold",
                              }}
                            >
                              <Tag color="purple">{i?.driver1}</Tag>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </Card>
                  </Col>
                )}
              </>
            );
          })}
      </Row>
      <DetailSPListRace AlamatMuatBongkarCoordinate={AlamatMuatBongkarCoordinate}/>
    </div>
  );
}

export default SMList;
