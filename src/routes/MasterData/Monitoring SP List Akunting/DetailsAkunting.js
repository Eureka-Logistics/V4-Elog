import { Alert, Card, Modal, Input, Select, message, Tag } from "antd";
import { Col, Row, Form, Button, Table } from "react-bootstrap";
import React from "react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import mobil from "../../redux toolkit/store/ZustandStore";
import Baseurl from "../../../Api/BaseUrl";
import Swal from "sweetalert2";
import { CheckCircleOutlined } from "@ant-design/icons";
import useServiceStatusStore from "../../../zustand/Store/StatusService";
import ModalDetailMarketing from "../Marketing/Splist/ModalDetailMarketing/Index";
import DetailKendaraanSOdiSemuaSO from "../DetailKendaraanDiSemuaSO/Index";
import "./style.css"
function DetailsAkunting() {
  const history = useHistory();
  const [detailData, setDetailData] = useState([]);
  const [memo, setMemo] = useState([]);
  const [jobdesk, setJobdesk] = useState(localStorage.getItem("jobdesk"));
  const { isicombinedData, setisiCombinedData } = mobil((item) => ({
    sp: item.sp,
  }));
  const [modal1Open, setModal1Open] = useState(false);
  const [modal1OpenDetail, setmodal1OpenDetail] = useState(false);
  const { idmp } = useParams();
  const [idmpd, setidmpd] = useState("")
  const [comment, setComment] = useState([]);
  const [ApproveAkuntingStatus, setApproveAkuntingStatus] = useState("");
  const [ApproveAkuntingTgl, setApproveAkuntingTgl] = useState("");
  const [Kendaraan_operasional, setkendaraan_operasional] = useState("");
  const [tgl_act_4, settgl_act_4] = useState("");
  const [Kendaraan_purchasing, setKendaraan_purchasing] = useState("");
  const [tgl_act_5, settgl_act_5] = useState("");
  const [MessageRejectSP, setMessageRejectSP] = useState("");
  const [IDMessageRejectSP, setIDMessageRejectSP] = useState("");
  const [KeteranganRejectSP, setKeteranganRejectSP] = useState("");
  // message reject
  let statusservice = detailData?.service
  const MessageReject = async () => {
    try {
      const data = await axios.get(
        `${Baseurl}sp/get-do-massage?limit=10334&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setMessageRejectSP(data.data.data.order);
    } catch (error) { }
  };

  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await axios.get(
          `${Baseurl}sp/get-SP-all-detail?keyword=&idmp=${idmp}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setDetailData(response.data);
        const memos = response.data.memo;
        setidmpd(response.data?.detail?.[0]?.idmpd);
        setMemo(memos);
      } catch (error) {
        console.error("Failed to fetch detail data:", error);
        // handle error appropriately
      }
    };
    getDetail();
    comments();
    MessageReject();
  }, [idmp, memo, Kendaraan_operasional, ApproveAkuntingStatus]);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
  ];

  const tombolApprove = async () => {
    const body = {
      id_mp: idmp,
    };

    Swal.fire({
      title: "Apakah yakin untuk approve?",
      text: "jika belum, silahkan cek lagi",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = await axios.post(
            `${Baseurl}sp/approve-SP-akunting`,
            body,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            }
          );

          const approve = data.status;
          StausApprove()
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data telah disetujui.",
          });
          comments();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan dalam memproses data.",
          });
          console.error(error);
        }
      }
    });
  };

  const rejectbutton = () => {
    Swal.fire({
      title: "Apakah yakin untuk Reject?",
      text: "jika belum, silahkan cek lagi",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const body = {
          id_mp: idmp,
        };

        try {
          const data = await axios.post(
            `${Baseurl}sp/reject-SP-akunting`,
            body,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          StausApprove()
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Telah di Reject",
          });
          // window.location.reload();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan dalam memproses data.",
          });
          console.error(error);
        }
      }
    });
  };

  const RejectSP = async () => {
    try {
      const data = await axios.post(
        `${Baseurl}sp/cancel-sp`,
        {
          id_mp: idmp,
          id_massage_do: IDMessageRejectSP,
          keterangan: KeteranganRejectSP,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      Swal.fire("Berhasil!", "Permintaan berhasil!", "success");
      setDetailData()
      comments()
    } catch (error) {
      message.error(error.response.data.status.message)
    }
  };
  const comments = async () => {
    const api = await axios.get(`${Baseurl}sp/get-SP-massage?id_mp=${idmp}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const comment = api.data.data;
    setComment(comment);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setJobdesk(localStorage.getItem("jobdesk"));
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  console.log(jobdesk);

  const handlePrint = () => {
    const printWindow = window.open(
      `https://elogs.eurekalogistics.co.id/operasional/sm/printsm/${idmp}`,
      "_blank"
    );
    printWindow.onload = function () {
      printWindow.print();
    };
  };

  const pindahedit = () => {
    history.push(`/masterdata/edit-sp/${idmp}`);
  };

  ///to IDR
  const total = detailData?.Totalprice;
  const rupiah = total?.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  // console.log(`TOTAL KESELURUHAN : ${rupiah}`);
  const [actSalesStatus, setactSalesStatus] = useState("");
  const StausApprove = async () => {
    try {
      const data = await axios.get(
        `${Baseurl}sp/get-status-approve?id_mp=${idmp}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(data.data.status.message);
      setactSalesStatus(data.data.status.message.act_sales);
      setApproveAkuntingStatus(data.data.status.message.act_akunting);
      setApproveAkuntingTgl(data.data.status.message.tgl_act_3);
      setkendaraan_operasional(data.data.status.message.kendaraan_operasional);
      settgl_act_4(data.data.status.message.tgl_act_4);
      setKendaraan_purchasing(data.data.status.message.kendaraan_purchasing);
      settgl_act_5(data.data.status.message.tgl_act_5);
    } catch (error) { }
  };

  useEffect(() => {
    StausApprove();
  }, []);

  console.log(`Kendaraan_operasional`, Kendaraan_operasional);

  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentReject, setCommentReject] = useState("");

  const BuatMessage = async () => {
    try {
      const data = await axios.post(
        `${Baseurl}sp/create-massage-do`,
        {
          massage: commentReject,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      message.success(`${data.data.status.message}`);
      MessageReject();
      setCommentReject(""); // Mengatur ulang nilai commentReject menjadi string kosong
      setIDMessageRejectSP(null); // Mengatur ulang nilai IDMessageRejectSP menjadi null
      setKeteranganRejectSP(null); // Mengatur ulang nilai KeteranganRejectSP menjadi null
      setShowCommentInput(false);
    } catch (error) {
      // Munculkan pesan error
      if (error.response && error.response.status === 402) {
        // Pesan khusus untuk error 402
        message.error(`${error.response.data.status.message}`);
      } else {
        message.error("Terjadi kesalahan!");
      }
    }
  };
  const DetailMarketing = () => {
    setmodal1OpenDetail(true)
  }
  let nuomber = 1
  return (
    <div>
      <Card>
        <Row>
          <h5>Detail SO</h5>
          {/* Modal Reject*/}
          <Modal
            title="Batalkan SO Sales"
            style={{
              top: 180,
            }}
            open={modal1Open}
            onOk={() => {
              RejectSP();
              setModal1Open(false);
            }}
            onCancel={() => setModal1Open(false)}
          >
            <Row>
              <Col sm={12}>
                <Select
                  showSearch
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  placeholder="Pilih Alasan Reject"
                  onChange={(e, options) => {
                    setIDMessageRejectSP(e);
                    setKeteranganRejectSP(options.children);
                    console.log(IDMessageRejectSP);
                    console.log(options.children);
                  }}
                >
                  {MessageRejectSP &&
                    MessageRejectSP.map((item) => (
                      <Select.Option key={item.message} value={item.id}>
                        {item.no + " - " + item.massage}
                      </Select.Option>
                    ))}
                </Select>
              </Col>
              <div className="mt-3" onClick={() => setShowCommentInput(true)}>
                <i>
                  Tidak ada Comment?
                  <span>
                    <a style={{ color: "blue" }}>Klik di sini</a>
                  </span>{" "}
                  untuk menambahkan
                </i>
              </div>
              {showCommentInput && (
                <Col sm={12} className="mt-2">
                  <Input
                    size="large"
                    value={commentReject}
                    onChange={(e) => setCommentReject(e.target.value)}
                    placeholder="Tambahkan komentar baru di sini"
                  />
                  <Button className="mt-2" size="sm" onClick={BuatMessage}>
                    Tambahkan
                  </Button>
                </Col>
              )}
            </Row>
          </Modal>
          <Row>
            <div className="d-flex justify-content-end">
              {/* {jobdesk === "sales" && (
                <>
                  <Button size="sm" onClick={() => tombolApprove()}>
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => rejectbutton()}
                  >
                    Reject SO
                  </Button>
                </>
              )} */}

              {jobdesk !== "operasional" &&
                jobdesk !== "sales" &&
                jobdesk !== "purchasing" &&
                ApproveAkuntingStatus !== "Y" ? (
                <>
                  <Button size="sm" onClick={() => tombolApprove()}>
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => rejectbutton()}
                  >
                    Reject SO
                  </Button>
                </>
              ) : (
                <>
                  {ApproveAkuntingStatus === "Y" &&
                    ApproveAkuntingTgl !== null ? (
                    <Alert type="success" message="Approve Akunting" banner />
                  ) : ApproveAkuntingStatus === "N" &&
                    ApproveAkuntingTgl !== "1970-01-01T00:00:00.000Z" || "2023-10-11T03:21:34.000Z" ? (
                    <Alert type="info" message="Waiting Akunting" banner />
                  ) : ApproveAkuntingStatus === "N" &&
                    ApproveAkuntingTgl !== null && ApproveAkuntingTgl === "1970-01-01T00:00:00.000Z" || "2023-10-11T03:21:34.000Z" ? (
                    <Alert type="error" message="Reject Akunting" banner />
                  ) : null}

                  {Kendaraan_operasional === "Y" && tgl_act_4 != null ? (
                    <Alert type="success" message="Approve Operasional" banner />
                  ) : Kendaraan_operasional === "N" && tgl_act_4 != "1970-01-01T00:00:00.000Z" || "2023-10-11T03:21:34.000Z" ? (
                    <Alert type="info" message="Waiting Operasional" banner />
                  ) : Kendaraan_operasional === "N" && tgl_act_4 === "1970-01-01T00:00:00.000Z" || "2023-10-11T03:21:34.000Z" ? (
                    <Alert type="error" message="Reject Operasional" banner />
                  ) : null}

                  {Kendaraan_purchasing === "Y" && tgl_act_5 !== null ? (
                    <Alert type="success" message="Approve Purchasing" banner />
                  ) : Kendaraan_purchasing === "N" && tgl_act_5 !== "1970-01-01T00:00:00.000Z" || "2023-10-11T03:21:34.000Z" ? (
                    <Alert type="info" message="Waiting Purchasing" banner />
                  ) : Kendaraan_purchasing === "N" && tgl_act_5 === "1970-01-01T00:00:00.000Z" || "2023-10-11T03:21:34.000Z" ? (
                    <Alert type="error" message="Reject Purchasing" banner />
                  ) : null}
                </>
              )}

              <div class="ms-3">
                <Button size="sm" onClick={() => handlePrint()} variant="primary">
                  Print
                </Button>
              </div>

              {/* {jobdesk === "sales" && actSalesStatus === "Y" ? ( */}
              {jobdesk === "sales" || actSalesStatus === "Y" ? (
                <>
                  <Button
                    size="sm"
                    className="mx-2"
                    onClick={() => setModal1Open(true)}
                    variant="danger"
                  >
                    Batalkan SO Sales
                  </Button>
                  <Button size="sm" onClick={pindahedit} variant="primary">
                    Edit SO
                  </Button>
                </>
              ) : (
                ""
              )}
              {/* ? jobdesk === "sales" && actSalesStatus === "Y" : <>
              <Button size="sm" disabled onClick={() => setModal1Open(true)} variant="danger">
                Reject SP Sales
              </Button>
              <Button size="sm" onClick={pindahedit} variant="primary">
                Edit SJ
              </Button>
            </> : "" */}
            </div>
          </Row>


          {/* <Modal> */}
          {/* <Modal.Header closeButton>
              <Modal.Title>Approve Driver</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label>Vehicle Type</Form.Label>
              <Form.Select></Form.Select>

              <Form.Label>Kode Kendaraan</Form.Label>
              <Form.Select></Form.Select>

              <Form.Label>Select Driver</Form.Label>
              <Form.Select></Form.Select>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary">Save Changes</Button>
            </Modal.Footer> */}
          {/* </Modal> */}

          <Col sm={6}>
            <Form>
              <Form.Group>
                <Form.Label>No.SO</Form.Label>
                <Form.Control disabled value={detailData?.sp} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Marketing</Form.Label>
                <div style={{ position: 'relative' }}>
                  <Form.Control disabled value={detailData?.marketing} />
                  <Tag
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'RGB(81 130 243)',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                    onClick={() => DetailMarketing()}
                    type="primary"
                  >
                    Lihat Detail Marketing
                  </Tag>
                </div>
              </Form.Group>
              <ModalDetailMarketing detailsemua={detailData} modal1Open={modal1OpenDetail} setModal1Open={setmodal1OpenDetail} name={detailData?.marketing} />
              <Form.Group>
                <Form.Label>Service</Form.Label>
                <Form.Control disabled value={detailData?.service} />
              </Form.Group>
              <Row>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label>Jenis Barang</Form.Label>
                    <Form.Control disabled value={detailData?.jenisBarang} />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label>Packing</Form.Label>
                    <Form.Control disabled value={detailData?.jenisBarang} />
                  </Form.Group>
                </Col>
              </Row>


            </Form>
          </Col>
          <Col sm={6}>
            <Form>
              {/* <Form.Group>
                <Form.Label>Via</Form.Label>
                <Form.Control disabled value={detailData?.detail?.[0]?.via} />
              </Form.Group> */}
              <Form.Group>
                <Form.Label>Customer</Form.Label>
                <Form.Control disabled value={detailData?.customer} />
              </Form.Group>
              <Form.Group>
                <Form.Label>No Telp Customer</Form.Label>
                <Form.Control disabled value={detailData?.telpCustomer} />
              </Form.Group>
              <Row>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label>Tgl Pickup</Form.Label>
                    <Form.Control disabled value={detailData?.pickup_date} />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label>Tgl Bongkar</Form.Label>
                    <Form.Control disabled value={detailData?.bongkar_date} />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group>
                <Form.Label>Asuransi</Form.Label>
                <Form.Control
                  disabled
                  value={
                    detailData?.asuransi === "Y"
                      ? "Menggunakan Asuransi"
                      : "Tidak Menggunakan Asuransi"
                  }
                />
              </Form.Group>
            </Form>
          </Col>
          {/* <Form.Group>
            <Form.Label>Pickup Address</Form.Label>
            <Form.Control
              disabled
              value={detailData?.detail?.[0]?.pickupAddress}
            />
          </Form.Group> */}
          <Col sm={12}>
            <Form.Group className="mt-4">
              <Form.Label>Alamat Invoice</Form.Label>
              <Form.Control disabled value={detailData?.alamatInvoice} />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Table responsive>
              <thead></thead>
              <tbody>
                {detailData &&
                  detailData.detail &&
                  detailData.detail.map((data, index) => (
                    <>
                      <tr style={{ fontWeight: "bold" }}>
                        <td colSpan={10}>
                          <br />
                          <br />{" "}
                        </td>
                      </tr>

                      <tr
                        style={{
                          fontWeight: "bold",
                          backgroundColor: '#1a5cbf',

                        }}
                      >

                        <td style={{ backgroundColor: 'transparent', color: 'white' }}>{index + 1}.</td>
                        <td colSpan={10} style={{ backgroundColor: 'transparent', color: 'white' }}>Alamat Muat</td>

                      </tr>
                      <tr key={index}>
                        <td>
                          {/* {index + 1}
                            <span>
                              <Button
                                size="md"
                                variant="danger"
                                onClick={() => deltebutton(data.idmpd)}
                                className="mt-2"
                              >
                                X
                              </Button>
                            </span> */}
                        </td>
                        <td colSpan={2}>{data.pickup}</td>
                      </tr>
                      {detailData &&
                        detailData.detail[index].tujuan &&
                        detailData.detail[index].tujuan.map((data, index2) => (
                          <>
                            <tr
                              style={{
                                fontWeight: "bold",
                                backgroundColor: "#B7D1F8",

                              }}
                            >
                              <td style={{ backgroundColor: "transparent" }}>No. {index2 + 1}</td>
                              <td style={{ backgroundColor: "transparent" }}>Alamat Bongkar</td>
                              <td style={{ backgroundColor: "transparent" }} >NO SJ</td>
                              <td style={{ backgroundColor: "transparent" }}>Service</td>
                              <td style={{ backgroundColor: "transparent" }}>Qty</td>
                              <td style={{ backgroundColor: "transparent" }}>Berat</td>
                              <td colSpan={1} style={{ backgroundColor: "transparent", textAlign: "right" }}>Biaya Jalan</td>
                              <td style={{ backgroundColor: "transparent", textAlign: "right" }} >Jumlah ({data?.service[0]})</td>
                            </tr>
                            <tr>
                              <td>{index2 + 1}</td>
                              <td >{data.destination}</td>
                              <td>{data.noSJ} <br /> <Tag>{data.kendaraan}</Tag><Tag>{data.item}</Tag></td>
                              <td>{data?.service}<br /> <Tag>{data.shipmentName}</Tag><Tag>{data?.via}</Tag></td>
                              <td>{data.qty}</td>
                              <td>{data.berat}</td>
                              <td style={{ textAlign: "right" }}>{data.Price?.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })}</td>

                              <td style={{ textAlign: "right", fontWeight: "bold" }}>
                                {(data.berat * data.Price).toLocaleString("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                })}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={6}></td>
                              <td style={{ backgroundColor: "transparent", fontWeight: "bold", textAlign: "right" }} width="150px">Harga Muat</td>
                              <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.harga_muat?.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })}</td>
                            </tr>
                            <tr>
                              <td colSpan={6}></td>
                              <td style={{ backgroundColor: "transparent", fontWeight: "bold", textAlign: "right" }} width="150px">Biaya Mel</td>
                              <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.biayaMel?.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })}</td></tr>
                            <tr>  <td colSpan={6}></td>
                              <td style={{ backgroundColor: "transparent", fontWeight: "bold", textAlign: "right" }} width="150px">Biaya Lain</td>
                              <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.biayaLain?.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })}</td>
                            </tr>
                            <tr>  <td colSpan={6}></td>
                              <td style={{ backgroundColor: "transparent", fontWeight: "bold", textAlign: "right" }} width="150px">Biaya Bongkar</td>
                              <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.harga_bongkar?.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })}</td></tr>
                            <tr>   <td colSpan={6}></td>
                              <td style={{ backgroundColor: "transparent", fontWeight: "bold", textAlign: "right" }} width="150px">Biaya Multi Drop</td>
                              <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.biaya_multi_drop?.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })}</td> </tr>
                            <tr>
                              <td colSpan={6}></td>
                              <td style={{ backgroundColor: "transparent", fontWeight: "bold", textAlign: "right" }} width="150px">Biaya Multi Muat</td>
                              <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.biaya_multimuat?.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })}</td> </tr>
                            <tr>  <td colSpan={6}></td>
                              <td style={{ backgroundColor: "transparent", fontWeight: "bold", textAlign: "right" }} width="150px">Biaya Over Tonase</td>
                              <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.biaya_overtonase?.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })}</td> </tr>
                            <tr>   <td colSpan={6}></td>
                              <td style={{ backgroundColor: "transparent", fontWeight: "bold", textAlign: "right" }} width="150px">Biaya Tambahan</td>
                              <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.biaya_tambahan?.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })}</td> </tr>
                            <tr>   <td colSpan={6}></td>
                              <td style={{ backgroundColor: "transparent", fontWeight: "bold", textAlign: "right" }} width="150px">Total SJ {index2 + 1}</td>
                              <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.total?.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })}</td> </tr>
                          </>
                        ))}
                    </>
                  ))}
              </tbody>

              {/* <tfoot>
                <tr style={{ fontWeight: "bold" }}>
                  {jobdesk !== "operasional" && (
                    <>
                      <td colSpan={20} width="150px" style={{ textAlign: 'end' }}>
                        Sub Total
                      </td>
                    </>
                  )}
                  {jobdesk !== "operasional" && (
                    <>
                      <td width="150px">
                        {detailData?.subTotal?.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </td>
                    </>
                  )}
                </tr>
              </tfoot> */}

            </Table>
            {/* <div style={{ backgroundColor: "blue", width: "100%" }}>
            </div>
            <tfoot>

              <tr style={{ fontWeight: "bold" }}>
                {jobdesk !== "operasional" && (
                  <>
                    <td style={{ textAlign: 'end' }} colSpan={20} width="150px" >
                      Total Muat
                    </td>
                  </>
                )}
                {jobdesk !== "operasional" && (
                  <>
                    <td width="130px" style={{ paddingLeft: "10px", textAlign: "right" }}>
                      {detailData?.totalMuat?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </>
                )}
              </tr>
            </tfoot> */}
            <Row>
              <Col span={10}></Col>
              <Col
                span={2}
                style={{}}
                className="d-flex justify-content-end mb-2 mb-2"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Total Muat</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="130px" style={{ paddingLeft: "10px" }}>
                      {detailData?.totalMuat?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                span={10}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end mb-2"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Total Bongkar</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="130px" style={{ paddingLeft: "10px" }}>
                      {detailData?.totalBongkar?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>

            {/* <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end mb-2"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Biaya Overtonase</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="130px" style={{ paddingLeft: "10px" }}>
                      {detailData?.totalovertonase?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined ? "Rp 0,00" : detailData?.totalovertonase?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row> */}
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end mb-2"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Biaya Multimuat</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="130px" style={{ paddingLeft: "10px" }}>
                      {detailData?.biayaMultiMuat?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined ? "Rp 0,00" : detailData?.biayaMultiMuat?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end mb-2"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Biaya Mel</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="130px" style={{ paddingLeft: "10px" }}>
                      {detailData?.biayaMel?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR"
                      })
                        === undefined ? "Rp 0,00" : detailData?.biayaMel?.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end mb-2"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Biaya Lain</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="130px" style={{ paddingLeft: "10px" }}>
                      {detailData?.biayaLain?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined ? "Rp 0,00" : detailData?.biayaLain?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end mb-2"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Biaya Tambahan</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="130px" style={{ paddingLeft: "10px" }}>
                      {detailData?.biayaTambahan?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined ? "Rp 0,00" : detailData?.biayaTambahan?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end mb-2"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Harga Selanjutnya</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="130px" style={{ paddingLeft: "10px" }}>
                      {detailData?.hargaSelanjutnya?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined ? "Rp 0,00" : detailData?.hargaSelanjutnya?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end mb-2"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Total Overtonase</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="130px" style={{ paddingLeft: "10px" }}>
                      {detailData?.totalovertonase?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined ? "Rp 0,00" : detailData?.totalovertonase?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end mb-2"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Biaya Multidrop</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="130px" style={{ paddingLeft: "10px" }}>
                      {detailData?.biayaMultiDrop?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined ? "Rp 0,00" : detailData?.biayaMultiDrop?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
            {/* <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end mb-2"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Total Biaya Lain</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="130px" style={{ paddingLeft: "10px" }}>
                      {detailData?.totalBiayaLain?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined ? "Rp 0,00" : detailData?.totalBiayaLain?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row> */}
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end mb-2"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Biaya Jalan</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="130px" style={{ paddingLeft: "10px" }}>
                      {detailData?.tarif?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined ? "Rp 0,00" : detailData?.tarif?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end mb-2"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>TOTAL KESELURUHAN</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="130px" style={{ paddingLeft: "10px" }}>
                      {detailData?.totalFix?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
            {/* 
            <Row>
              <Col span={9}></Col>
              <Col
                span={2}
                style={{ }}
                className="d-flex justify-content-end mb-2 mb-2"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Total Muat</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="130px" style={{ paddingLeft: "10px" }}>
                      {detailData?.totalMuat?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
            <Row className="d-flex">
                <Col span={9}></Col>
                <Col  className="d-flex justify-content-end mb-2" span={1}>
                  <tr style={{ fontWeight: "bold" }}>
                    {jobdesk !== "operasional" && (
                      <>
                        <td style={{ textAlign: 'end' }} colSpan={20} width="150px" >
                          Total Bongkar
                        </td>
                      </>
                    )}
                    {jobdesk !== "operasional" && (
                      <>
                        <td width="130px" style={{ paddingLeft: "10px", textAlign: "right" }}>
                          {detailData?.totalBongkar?.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </td>
                      </>
                    )}
                  </tr>
                </Col>

            </Row>

            <tfoot>
              <tr style={{ fontWeight: "bold" }}>
                {jobdesk !== "operasional" && (
                  <>
                    <td style={{ textAlign: 'end' }} colSpan={20} width="150px" >
                      Biaya Multimuat
                    </td>
                  </>
                )}
                {jobdesk !== "operasional" && (
                  <>
                    <td width="130px" style={{ paddingLeft: "10px", textAlign: "right" }}>
                      {detailData?.biayaMultiMuat?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined ? "Rp 0,00" : detailData?.biayaMultiMuat?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </>
                )}
              </tr>
            </tfoot>
            <tfoot>
              <tr style={{ fontWeight: "bold" }}>
                {jobdesk !== "operasional" && (
                  <>
                    <td style={{ textAlign: 'end' }} colSpan={20} width="150px" >
                      Biaya Mel
                    </td>
                  </>
                )}
                {jobdesk !== "operasional" && (
                  <>
                    <td width="130px" style={{ paddingLeft: "10px", textAlign: "right" }}>
                      {detailData?.biayaMel?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR"
                      })
                        === undefined ? "Rp 0,00" : detailData?.biayaMel?.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                    </td>
                  </>
                )}
              </tr>
            </tfoot>
            <tfoot>
              <tr style={{ fontWeight: "bold" }}>
                {jobdesk !== "operasional" && (
                  <>
                    <td style={{ textAlign: 'end' }} colSpan={20} width="150px" >
                      Biaya Lain
                    </td>
                  </>
                )}
                {jobdesk !== "operasional" && (
                  <>
                    <td width="150px" style={{ textAlign: "right" }}>
                      {detailData?.biayaLain?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined ? "Rp 0,00" : detailData?.biayaLain?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </>
                )}
              </tr>
            </tfoot>
            <tfoot>
              <tr style={{ fontWeight: "bold" }}>
                {jobdesk !== "operasional" && (
                  <>
                    <td style={{ textAlign: 'end' }} colSpan={20} width="150px" >
                      Biaya Tambahan
                    </td>
                  </>
                )}
                {jobdesk !== "operasional" && (
                  <>
                    <td width="150px" style={{ textAlign: "right" }}>
                      {detailData?.biayaTambahan?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined ? "Rp 0,00" : detailData?.biayaTambahan?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </>
                )}
              </tr>
            </tfoot>
            <tfoot>
              <tr style={{ fontWeight: "bold" }}>
                {jobdesk !== "operasional" && (
                  <>
                    <td style={{ textAlign: 'end' }} colSpan={20} width="150px" >
                      Harga Selanjutnya
                    </td>
                  </>
                )}
                {jobdesk !== "operasional" && (
                  <>
                    <td width="150px" style={{ textAlign: "right" }}>
                      {detailData?.hargaSelanjutnya?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined ? "Rp 0,00" : detailData?.hargaSelanjutnya?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </>
                )}
              </tr>
            </tfoot>
            <tfoot>
              <tr style={{ fontWeight: "bold" }}>
                {jobdesk !== "operasional" && (
                  <>
                    <td style={{ textAlign: 'end' }} colSpan={20} width="150px" >
                      Total Overtonase
                    </td>
                  </>
                )}
                {jobdesk !== "operasional" && (
                  <>
                    <td width="150px" style={{ textAlign: "right" }}>
                      {detailData?.totalovertonase?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined ? "Rp 0,00" : detailData?.totalovertonase?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </>
                )}
              </tr>
            </tfoot>
            <tfoot>
              <tr style={{ fontWeight: "bold" }}>
                {jobdesk !== "operasional" && (
                  <>
                    <td style={{ textAlign: 'end' }} colSpan={20} width="150px" >
                      Biaya Multidrop
                    </td>
                  </>
                )}
                {jobdesk !== "operasional" && (
                  <>
                    <td width="150px" style={{ textAlign: "right" }}>
                      {detailData?.biayaMultiDrop?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined ? "Rp 0,00" : detailData?.biayaMultiDrop?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </>
                )}
              </tr>
            </tfoot>
            <tfoot>
              <tr style={{ fontWeight: "bold" }}>
                {jobdesk !== "operasional" && (
                  <>
                    <td style={{ textAlign: 'end' }} colSpan={20} width="150px" >
                      Biaya Jalan
                    </td>
                  </>
                )}
                {jobdesk !== "operasional" && (
                  <>
                    <td width="150px" style={{ textAlign: "right" }}>
                      {detailData?.tarif?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined ? "Rp 0,00" : detailData?.tarif?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </>
                )}
              </tr>
            </tfoot> */}
            {jobdesk !== "operasional" && (
              <>


                <Row>
                  <Col
                    span={20}
                    style={{ marginLeft: "10px" }}
                    className="d-flex justify-content-end mt-2 mb-2"
                  >
                    <tr style={{ fontWeight: "bold" }}>
                      {/* {jobdesk !== "operasional" && (
                    <>
                      <td colSpan={8} width="140px" className="text-right">
                      Biaya Muat :
                      </td>
                    </>)} */}
                      {/* {jobdesk !== "operasional" && (
                        <>
                          <div>
                            <td style={{ paddingRight: "20px" }}>
                              TOTAL KESELURUHAN
                            </td>
                            <td style={{ paddingRight: "10px" }}>:</td>
                            <td width="150px" style={{ paddingLeft: "10px" }}>
                              {detailData?.totalFix?.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })}
                            </td>
                          </div>
                        </>
                      )} */}
                    </tr>
                  </Col>
                </Row>

                {/* <p
                  className="d-flex justify-content-end"
                  style={{ fontWeight: "bold" }}
                >
                  Biaya Muat :
                  {detailData?.totalMuat?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p> */}
                {/* <p
                  className="d-flex justify-content-end"
                  style={{ fontWeight: "bold" }}
                >
                  Biaya Bongkar :
                  {detailData?.totalBongkar?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p> */}
                {/* <p
                  className="d-flex justify-content-end"
                  style={{ fontWeight: "bold" }}
                >
                  Biaya MultiDrop :
                  {detailData?.biaya_multidrop?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p> */}
                {/* <p
                  className="d-flex justify-content-end"
                  style={{ fontWeight: "bold" }}
                >
                  Biaya Overtonase :
                  {detailData?.biaya_overtonase?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p> */}
                {/* <p
                  className="d-flex justify-content-end"
                  style={{ fontWeight: "bold" }}
                >
                  Biaya Mel :
                  {detailData?.Totalprice?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p> */}
                {/* <p
                  className="d-flex justify-content-end"
                  style={{ fontWeight: "bold" }}
                >
                  Biaya Inap :
                  {detailData?.Totalprice?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p> */}
                {/* <hr />
                <p
                  className="d-flex justify-content-end"
                  style={{ fontWeight: "bold" }}
                >
                  TOTAL KESELURUHAN :
                  {detailData?.Totalprice?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p> */}
              </>
            )}
            {/* <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Muat :{detailData?.biaya_muat?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Bongkar :{detailData?.biaya_muat_bongkar?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya MultiDrop :{detailData?.biaya_multidrop?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Overtonase :{detailData?.biaya_overtonase?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Mel :{detailData?.Totalprice?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </p>
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              Biaya Inap :{detailData?.Totalprice?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </p>
            <hr />
            <p
              className="d-flex justify-content-end"
              style={{ fontWeight: "bold" }}
            >
             TOTAL KESELURUHAN : {detailData?.Totalprice?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </p> */}
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Isi Memo</Form.Label>
              <Form.Control disabled value={memo} />
            </Form.Group>
            <div className=" mt-5">
              <DetailKendaraanSOdiSemuaSO idmpd={idmpd} />
            </div>
            <br />
            <br />

            <Table responsive>
              <thead>
                <tr style={{ fontWeight: "bold", backgroundColor: "#f4dddd" }}>
                  <td style={{ backgroundColor: 'transparent' }}>No</td>
                  <td style={{ backgroundColor: 'transparent' }}>Comment</td>
                  <td style={{ backgroundColor: 'transparent' }}>User</td>
                  <td style={{ backgroundColor: 'transparent' }}>Tgl Comment</td>
                </tr>
              </thead>
              <tbody>
                {comment &&
                  comment.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data?.chat}</td>
                      <td>{data?.user}</td>
                      <td>
                        <Tag color="success">
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <CheckCircleOutlined
                              style={{ fontSize: "15px", marginRight: "5px" }}
                            />
                            {data.tgl_chat}
                          </span>
                        </Tag>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default DetailsAkunting;