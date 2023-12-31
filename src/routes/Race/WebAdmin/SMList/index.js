import {
  Button,
  Card,
  DatePicker,
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
import * as XLSX from "xlsx";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Baseurl, { BaseUrlRace } from "../../../../Api/BaseUrl";
import MapContainer from "../../../MasterData/Monitoring/Test";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import icondriver from "../../../../assets/img/drivericon.png";
import telponicon from "../../../../assets/img/telponicon.png";
import whatsappicon from "../../../../assets/img/whatsappicon.png";
import "./style.css";
import { JadikanNamaJalan, getCoordinates } from "../../../../Api/Geocode";
import MapsGoogle from "../../../../components/MapsGoole";
import useCoordinateRaceMap from "../../../../zustand/Store/coordinateMapRace/RaceMaps";
import DetailSPListRace from "../splist/Detailsplist";
import { getDatabase, ref } from "firebase/database";
import { onValue } from "firebase/database";
import { database, firestore } from "../../../../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import moment from "moment";
// import { firestore } from "../../../../firebase/firebase";

function SMList({ }) {
  const firestoresss = firestore;
  const [LokasiDriverlanglot, setLokasiDriverlanglot] = useState(0)
  async function LokasiDriver(id) {
    // Use id directly if it's already a string or number
    const stringId = String(id);
    console.log(`id`, id, `type of id:`, stringId);

    const unsub = onSnapshot(doc(firestoresss, "location", stringId),
      (doc) => {
        if (doc.exists()) {
          console.log("Lokasi Driver: ", doc.data());
          setLokasiDriverlanglot(doc.data())
          // JadikanNamaJalan(doc.data()?.latitude, doc.data()?.longitude)

        } else {
          console.log("No such document!");
        }
      },
      (error) => {
        console.error("Error fetching document: ", error);
      }
    );
  }

  // console.log(`LokasiDriver`, LokasiDriverlanglot);

  const [Open, setOpen] = useState(false);
  const [CariSJ, SetCariSJ] = useState("");
  const [NamaSupir, setNamaSupir] = useState("");
  const [LoadingBang, setLoadingBang] = useState(false);
  const [DetailDataPerClick, setDetailDataPerClick] = useState([]);
  const [exporting, setExporting] = useState(false);
  const [OptionsState, setOptionsState] = useState("");
  const NamaCabang = localStorage.getItem("cabang");

  const [Cabang, setCabang] = useState(
    NamaCabang === "RCCGK" ? "JKT" : NamaCabang
  );
  const showDefaultDrawer = (e) => {
    setOpen(true);
  };
  const { Coordinate, setCoordinate, JarakDanWaktu, AmbilCoordinates } = useCoordinateRaceMap();
  // console.log(`CoordinateRaceMap`, Coordinate);
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
  const [tanggalfilter, settanggalfilter] = useState("")
  const [SekolahTujuan, setSekolahTujuan] = useState("")
  const [FilterSales, setFilterSales] = useState("")
  const DataApiSM = async (s = 1) => {
    setLoadingBang(true);
    try {
      const dataa = await axios.get(
        // `https://api.eurekalogistics.co.id/sm/get-sm?limit=${DataApi.limit}&page=${s}&keyword=${CariSJ}&kodeCabang=&mitra1=&mitra2=&mitra3=&id_bu=&id_bu_brench=`,
        `${BaseUrlRace}sp/get-sm-all?limit=${DataApi.limit}&page=${s}&keyword=${CariSJ}&kodeCabang=&mitra1=&mitra2=&mitra3&tglSm=${tanggalfilter}&sekolahTujuan=${SekolahTujuan}&sales=${FilterSales}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // console.log("data pagination", dataa);
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
    pilihcabangselect();
  }, [CariSJ, DataApi.limit, Cabang, tanggalfilter, SekolahTujuan, FilterSales]);
  const history = useHistory();
  const pindahdetailsp = () => {
    if (
      !DetailDataPerClick?.idMsm ||
      !DetailDataPerClick?.idMsm
    ) {
      notification.error({
        message: "Error",
        description: "Tidak ada id_mpd || idMsm",
      });
    } else {
      history.push(
        `/race/detailsplistrace/${DetailDataPerClick?.sm}`
      );
    }
  };
  console.log(`DetailDataPerClick`, DetailDataPerClick);
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
  // console.log(`DataApi`, DataApi);

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
        DetailDataPerClick?.alamatMuat ||
        DetailDataPerClick?.other?.m_pengadaan_detail?.muat?.alamat_detail
      );
      const Bongkar = await getCoordinates(
        DetailDataPerClick?.alamatBongkar ||
        DetailDataPerClick?.other?.m_pengadaan_detail?.bongkar?.alamat_detail
      );
      // useCoordinateRaceMap.setState({ AmbilCoordinates: [...AlamatMuat, ...Bongkar] })

      setAlamatMuatBongkarCoordinate((item) => ({
        ...item,
        AlamatMuat: AlamatMuat,
        AlamatBongkar: Bongkar,

      }));
      // AmbilCoordinates(AlamatMuat)
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

  // console.log(`AmbilCoordinates`, AmbilCoordinates);
  // console.log(`DetailDataPerClick`, DetailDataPerClick);
  const tableData = [DetailDataPerClick];

  const columns = [
    {
      title: 'Driver',
      dataIndex: 'driver',
      key: 'driver',
    },
    {
      title: 'Kendaraan',
      dataIndex: 'jenis_kendaraan',
      key: 'jenis_kendaraan',
    },
    {
      title: 'Nopol',
      dataIndex: 'nopol',
      key: 'nopol',
    },
    // {
    //   title: 'SP',
    //   dataIndex: 'sp',
    //   key: 'sp',
    // },
    {
      title: 'Sekolah Tujuan',
      dataIndex: 'sekolahTujuan',
      key: 'sekolahTujuan',
    },
    {
      title: 'Pickup Date',
      dataIndex: 'tglPickup',
      key: 'tglPickup',
      render: (tglPickup) => {
        return moment(tglPickup).format("YYYY-MM-DD")
      }
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
      value: DetailDataPerClick?.alamatMuat
    },
    {
      key: 'bongkarAlamat',
      label: 'Alamat Bongkar',
      value: DetailDataPerClick?.alamatBongkar
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


  const sm = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'SM',
      dataIndex: 'sm',
      key: 'sm',
    },
    {
      title: 'Status SM',
      dataIndex: 'statusKiriman',
      key: 'statusKiriman',
      render: (statusKiriman) => {
        if (statusKiriman === "Doc Complete") {
          return <Tag color="green">Doc Complete</Tag>
        } else {
          return statusKiriman
        }
      }
    },
    {
      title: 'SP',
      dataIndex: 'sp',
      key: 'sp',
    },
    {
      title: 'Driver',
      dataIndex: 'driver',
      key: 'driver',
    },
    {
      title: 'Jenis Kendaraan',
      dataIndex: 'jenis_kendaraan',
      key: 'jenis_kendaraan',
    },
    {
      title: 'NoPol',
      dataIndex: 'nopol',
      key: 'nopol',
    },
    {
      title: 'Sales Erl',
      dataIndex: 'salesErl',
      key: 'salesErl',
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Sekolah Tujuan',
      dataIndex: 'sekolahTujuan',
      key: 'sekolahTujuan',
    },
    {
      title: 'Tgl Pickup',
      dataIndex: 'tglPickup',
      key: 'tglPickup',
      render: (tglPickup) => {
        return moment(tglPickup).format("YYYY-MM-DD")
      }
    },
  ];

  const exportToExcel = async (s = 1) => {
    try {
      setExporting(true);
      const response = await axios.get(
        `${BaseUrlRace}sp/get-sm-all?limit=${DataApi.limit}&page=${s}&keyword=${CariSJ}&kodeCabang=${Cabang}&mitra1=&mitra2=&mitra3`,
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
      XLSX.writeFile(wb, "Export_Data_SJ.xlsx");
    } catch (error) {
      notification.error({
        message: error.response.data.status.message
      })
      // Handle error
      setExporting(false);
      console.error("Error exporting data: ", error);
    }
  };


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

  return (
    <div>
      {/* <DetailSPListRace AlamatMuatBongkarCoordinate={AlamatMuatBongkarCoordinate} /> */}

      {DetailDataPerClick ? (
        <Drawer
          title={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
              <span style={{ marginRight: 10 }}>Pengiriman</span>
              <div style={{ fontSize: 25 }}>{DetailDataPerClick?.sm}</div>
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
            style={{ height: 250, overflow: "hidden" }}
          >
            {!isDataFetched ? (
              <MapsGoogle
                AlamatMuatBongkarCoordinate={AlamatMuatBongkarCoordinate}
                width={730}
                height={250}
                posisiDriver={LokasiDriverlanglot}
              />
            ) : (
              <div></div> // tampilkan pesan loading atau komponen lainnya saat data belum selesai di-fetch
            )}

            {/* <MapContainer AlamatMuatBongkarCoordinate={AlamatMuatBongkarCoordinate} /> */}
          </Card>
          <Card bodyStyle={{ padding: 0 }} style={{ height: "auto", marginTop: 0, paddingTop: 0 }}>
            <Container>
              <p style={{ fontWeight: "bold", fontSize: 20 }}>
                Informasi Driver
              </p>
              <Row style={{ marginTop: "" }}>
                <Table dataSource={tableData} columns={columns} load pagination={false} />
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
        <Col >
          <h4 className="mt-3" style={{ fontFamily: 'NoirPro' }}>
            Daftar Surat Jalan
          </h4>
        </Col>
      </Row>
      <Row>
        <Col >
          <DatePicker style={{ width: "100%" }} placeholder="filter tanggal" onChange={(e, w) => settanggalfilter(w)} />
        </Col>
        <Col md={2}>
          <Input placeholder="filter Sekolah Tujuan"
            onChange={(e, w) => setSekolahTujuan(e.target.value)} />
        </Col>
        <Col  md={2} className="mx-4">
          <Form.Item>
            <Input placeholder="filter pencarian sj"
              onChange={(e) => {
                SetCariSJ(e.target.value);
              }}
            />
          </Form.Item>
        </Col>
        <Col  md={2}>
          <Form.Item>
            <Input placeholder="filter Sales"
              onChange={(e) => {
                setFilterSales(e.target.value);
              }}
            />
          </Form.Item>
        </Col>
        <Col
        >
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

      </Row>

      <Row>
        {/* pagination={{
          total: DataApi.totalData,
          onChange: (page, pageSize) => {
            console.log(`Current page: ${page}, Page size: ${pageSize}`);
          }
        }} */}
        <Table dataSource={DataApi.Data} loading={LoadingBang} columns={sm} className="mb-5" pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: async () => {
                LokasiDriver(record?.driverId);
                setNamaSupir(record.driver1);
                setDetailDataPerClick(record);
                showDefaultDrawer(record);
              } // click row
              // you can also add other event handlers here if needed
            };
          }} />
        <Pagination
          className="d-flex justify-content-end"
          // current={1}
          onChange={(page, size) => Paginations(page, size)}
          total={DataApi.totalData}
        // pageSize={10}
        />
        {!DataApi.Data && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >

          </div>
        )}

        {/* {DataApi.Data &&
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
          })} */}

      </Row>
    </div>
  );
}

export default SMList;
