import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
// import { httpClient } from "../../../util/Api";
import { httpClient } from "../../../../Api/Api";
import isiDatamasterMitraDetailZustand from "../../../../zustand/Store/IsiDataMasterMitraDetail/Store";
import { Button, Input, Select, notification } from "antd";
import Swal from "sweetalert2";
import Baseurl from "../../../../Api/BaseUrl";

function DataReferensi({ mitraId, SemuaDataUntukEdit, setActiveTab }) {
  const id_mitras = mitraId;
  const [datareverensis, setDataReference] = useState({
    akta_pendirian: null,
    akta_perubahan_dasar: null,
    po_legalitas: null,
    ktp_legalitas: null,
    akta_susunan_direksi: null,
    surat_domisili: null,
    npwp_legalitas: null,
    skt_legalitas: null,
    nppkp_legalitas: null,
    siup_legalitas: null,
    ijin_pendirian: null,
    ppmd_legalitas: null,
    ijin_usaha: null,
    tdp_legalitas: null,
    surat_kuasa: null,
    qty_cdd: null,
    qty_cde: null,
    qty_fuso: null,
    lama_bekerja: null,
    lama_usaha: null,
    jenis_kartu_kredit: null,
    laporan_keuangan: null,
    status_usaha: null,
    omset_bulanan: null,
    affiliasi: null,
    qty_motor: null,
    qty_grandmax: null,
    qty_l300: null,
    qty_traga: null,
    qty_wingbox: null,
    qty_trailer20: null,
    qty_trailer40: null,
    rp_motor: null,
    rp_grandmax: null,
    rp_l300: null,
    rp_traga: null,
    rp_cde: null,
    rp_cdd: null,
    rp_fuso: null,
    rp_wingbox: null,
    rp_trailer20: null,
    rp_trailer40: null,
    nilai_ruu: null,
    periode_sewa: null,
    pembayaran: null,
    metode_pembayaran: null,
    bank_penerbit: null,
    asset_mesin: null,
    jumlah_unit: null,
    nilai_sewa: null,
  });
  const { data, setData } = isiDatamasterMitraDetailZustand();

  console.log(`oper bang datareverensis`, datareverensis);

  useEffect(() => {
    const datareverensi = async () => {
      httpClient
        .get(`mitra/get-detail-mitra?id_mitra=${id_mitras}`)
        .then(({ data }) => {
          if (data.status.code === 200) {
            setDataReference({
              akta_pendirian: data.data.akta_pendirian,
              akta_perubahan_dasar: data.data.akta_perubahan_dasar,
              po_legalitas: data.data.po_legalitas,
              ktp_legalitas: data.data.ktp_legalitas,
              akta_susunan_direksi: data.data.akta_susunan_direksi,
              surat_domisili: data.data.surat_domisili,
              npwp_legalitas: data.data.npwp_legalitas,
              skt_legalitas: data.data.skt_legalitas,
              nppkp_legalitas: data.data.nppkp_legalitas,
              siup_legalitas: data.data.siup_legalitas,
              ijin_pendirian: data.data.ijin_pendirian,
              ppmd_legalitas: data.data.ppmd_legalitas,
              ijin_usaha: data.data.ijin_usaha,
              tdp_legalitas: data.data.tdp_legalitas,
              surat_kuasa: data.data.surat_kuasa,
              qty_cdd: data.data.qty_cdd,
              qty_cde: data.data.qty_cde,
              qty_fuso: data.data.qty_fuso,
              lama_bekerja: data?.data?.lama_bekerja,
              lama_usaha: data.data.lama_usaha,
              jenis_kartu_kredit: data.data.jenis_kartu_kredit,
              laporan_keuangan: data.data.laporan_keuangan,
              status_usaha: data.data.status_usaha,
              omset_bulanan: data.data.omset_bulanan,
              affiliasi: data.data.affiliasi,
              qty_motor: data.data.qty_motor,
              qty_grandmax: data.data.qty_grandmax,
              qty_l300: data.data.qty_l300,
              qty_traga: data.data.qty_traga,
              qty_wingbox: data.data.qty_wingbox,
              qty_trailer20: data.data.qty_trailer20,
              qty_trailer40: data.data.qty_trailer40,
              rp_motor: data.data.rp_motor,
              rp_grandmax: data.data.rp_grandmax,
              rp_l300: data.data.rp_l300,
              rp_traga: data.data.rp_traga,
              rp_cde: data.data.rp_cde,
              rp_cdd: data.data.rp_cdd,
              rp_fuso: data.data.rp_fuso,
              rp_wingbox: data.data.rp_wingbox,
              rp_trailer20: data.data.rp_trailer20,
              rp_trailer40: data.data.rp_trailer40,
              nilai_ruu: data.data.nilai_ruu,
              periode_sewa: data.data.periode_sewa,
              pembayaran: data.data.pembayaran,
              metode_pembayaran: data.data.metode_pembayaran,
              bank_penerbit: data.data.bank_penerbit,
              asset_mesin: data.data.asset_mesin,
              jumlah_unit : data.data.jumlah_unit,
              nilai_sewa : data.data.nilai_sewa,
            });
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    };
    datareverensi();
  }, []);
  if (!datareverensis) {
    return <p>Loading...</p>;
  }

  const EditMitras = async () => {
    const datasemua = {
      ...data,
      ...datareverensis,
    };
    try {
      const response = await axios.post(
        `${Baseurl}mitra/edit-mitra`,
        datasemua,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // If you want to update the state with the edited data, you can do so here.
      // For example:
      console.log(response);
      // Check if the save operation was successful and redirect to the desired page
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data has been Changed",
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      } else if (response.status === 500) {
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Something went wrong!',
        //     // footer: '<a href="">Why do I have this issue?</a>'
        //   })
        // console.log(`error`);
      }
    } catch (error) {
      console.log(`ini error`, error.status);
      if (!data) {
        alert("harus isi data dan klik tombol referensi dulu ");
      }
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map((element) => {
          return `${element.field}: ${element.message}`;
        });
        const errorMessage = errorMessages.join("\n");

        notification.error({
          description: errorMessage,
        });
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.status
      ) {
        notification.error({
          description: error.response.data.status.message,
        });
      }
    }
  };

  const handleInputChange = (e, fieldName) => {
    const value = e;

    setDataReference((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  return (
    <div>
      <br />
      <h5>
        <b>DATA REFERENSI PELANGGAN (Customer Reference Data)</b>
      </h5>
      <br />
      <hr />
      <br />

      <Row>
        <Col sm={6}>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>PURCHASE ORDER</b>
              </Form.Label>
            </Col>
            <Col>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.po_legalitas}
                onChange={(e) => {
                  handleInputChange(e, "po_legalitas");
                  console.log(e);
                }}
              >
                <option value="">Pilih PO</option>
                <option value="ADA">ADA</option>
                <option value="TIDAK">TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>KTP PENANDATANGAN</b>
              </Form.Label>
            </Col>
            <Col>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.ktp_legalitas}
                onChange={(e) => {
                  handleInputChange(e, "ktp_legalitas");
                  console.log(e);
                }}
              >
                <option value="">Pilih KTP Legalitas</option>
                <option value="ADA">ADA</option>
                <option value="TIDAK">TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>AKTA PENDIRIAN</b>
              </Form.Label>
            </Col>
            <Col>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.akta_pendirian}
                onChange={(e) => {
                  handleInputChange(e, "akta_pendirian");
                  console.log(e);
                }}
              >
                <option value="">Pilih Akta Pendirian</option>
                <option value="ADA">ADA</option>
                <option value="TIDAK">TIDAK</option>
              </Select>
            </Col>
          </Row>
          {/* <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>AKTA PENDIRIAN</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                value={datareverensis.akta_pendirian}
                onChange={(e) => {
                  handleInputChange(e, "akta_pendirian");
                  console.log(e.target.value);
                }}
              >
                <option value="">Pilih Akta Pendirian</option>
                <option value="1">ADA</option>
                <option value="1">TIDAK</option>
              </Form.Select>
            </Col>
          </Row> */}
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>AKTA PERUBAHAN DASAR TERBARU</b>
              </Form.Label>
            </Col>
            <Col>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.akta_pendirian}
                onChange={(e) => {
                  handleInputChange(e, "akta_perubahan_dasar");
                  console.log(e);
                }}
              >
                <option value=" ">Pilih Akta Perubahan Dasar</option>
                <option value="ADA">ADA</option>
                <option value="TIDAK">TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>AKTA SUSUNAN DIREKSI TERBARU</b>
              </Form.Label>
            </Col>
            <Col>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.akta_susunan_direksi}
                onChange={(e) => {
                  handleInputChange(e, "akta_susunan_direksi");
                  console.log(e);
                }}
              >
                <option value="">Pilih PO</option>
                <option value="ADA">ADA</option>
                <option value="TIDAK">TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>SURAT DOMISILI</b>
              </Form.Label>
            </Col>
            <Col>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.surat_domisili}
                onChange={(e) => {
                  handleInputChange(e, "surat_domisili");
                  console.log(e);
                }}
              >
                <option value="">Pilih PO</option>
                <option value="ADA">ADA</option>
                <option value="TIDAK">TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>NPWP</b>
              </Form.Label>
            </Col>
            <Col>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.npwp_legalitas}
                onChange={(e) => {
                  handleInputChange(e, "npwp_legalitas");
                  console.log(e);
                }}
              >
                <option value="">Pilih PO</option>
                <option value="ADA">ADA</option>
                <option value="TIDAK">TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>SKT</b>
              </Form.Label>
            </Col>
            <Col>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.skt_legalitas}
                onChange={(e) => {
                  handleInputChange(e, "skt_legalitas");
                  console.log(e);
                }}
              >
                <option value="">Pilih PO</option>
                <option value="ADA">ADA</option>
                <option value="TIDAK">TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>NPPKP / SPPKP</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">{datareverensis?.nppkp_legalitas}</option>
                <option value="1">TIDAK</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>NIB (SIUP/SIUB/SIUJK/SIUPAL)</b>
              </Form.Label>
            </Col>
            <Col>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.siup_legalitas}
                onChange={(e) => {
                  handleInputChange(e, "siup_legalitas");
                  console.log(e);
                }}
              >
                <option value="">Pilih PO</option>
                <option value="ADA">ADA</option>
                <option value="TIDAK">TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>IJIN PENDIRIAN KPPA</b>
              </Form.Label>
            </Col>
            <Col>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.ijin_pendirian}
                onChange={(e) => {
                  handleInputChange(e, "ijin_pendirian");
                  console.log(e);
                }}
              >
                <option value="">Pilih PO</option>
                <option value="ADA">ADA</option>
                <option value="TIDAK">TIDAK</option>
              </Select>
            </Col>
          </Row>
          {/* <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>PERSETUJUAN PENANAMAN MODAL DARI BPKM</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">ADA</option>
                <option value="1">TIDAK</option>
              </Form.Select>
            </Col>
          </Row> */}
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>IJIN USAHA TETAP DARI BPKM</b>
              </Form.Label>
            </Col>
            <Col>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.ijin_usaha}
                onChange={(e) => {
                  handleInputChange(e, "ijin_usaha");
                  console.log(e);
                }}
              >
                <option value="">Pilih PO</option>
                <option value="ADA">ADA</option>
                <option value="TIDAK">TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>TDP</b>
              </Form.Label>
            </Col>
            <Col>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.tdp_legalitas}
                onChange={(e) => {
                  handleInputChange(e, "tdp_legalitas");
                  console.log(e);
                }}
              >
                <option value="">Pilih PO</option>
                <option value="ADA">ADA</option>
                <option value="TIDAK">TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>SURAT KUASA (PENANDATANGAN KONTRAK BUKAN DIREKSI)</b>
              </Form.Label>
            </Col>
            <Col>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.surat_kuasa}
                onChange={(e) => {
                  handleInputChange(e, "surat_kuasa");
                  console.log(e);
                }}
              >
                <option value="">Pilih PO</option>
                <option value="ADA">ADA</option>
                <option value="TIDAK">TIDAK</option>
              </Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>ASSET MESIN</b>
              </Form.Label>
            </Col>
            <Col>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.asset_mesin}
                onChange={(e) => {
                  handleInputChange(e, "asset_mesin");
                  console.log(e);
                }}
              >
                <option value="">Pilih DATA</option>
                <option value="MILIK SENDIRI">MILIK SENDIRI</option>
                <option value="MILIK NEGARA">MILIK NEGARA</option>
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <div>
          <hr />
          <h5>DATA KEUANGAN (Accounting Information)</h5>

          <hr />
          <br />
          <b>A. PERORANGAN</b>
          <br />
          <br />
          <Row className="align-items-center mb-2">
            <Col sm={4}>
              <Form.Label>
                <b>LAMANYA BEKERJA :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.lama_bekerja}
              onChange={(e) => {
                handleInputChange(e.target.value, "lama_bekerja");
                console.log(e.target.value);
              }}
              />
    
            </Col>
            <Col sm={4}>
              <Form.Label>
                <b>JENIS KARTU KREDIT :</b>
              </Form.Label>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.jenis_kartu_kredit}
                onChange={(e) => {
                  handleInputChange(e, "jenis_kartu_kredit");
                  console.log(e);
                }}
              >
               <option>{datareverensis?.jenis_kartu_kredit}</option>
                <option>TIDAK ADA</option>
                <option>VISA</option>
                <option>MASTER CARD</option>
                <option>AMERICAN STANDARD</option>
              </Select>
            </Col>
            <Col sm={4}>
              <Form.Label>
                <b>BANK PENERBIT :</b>
              </Form.Label>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.bank_penerbit}
                onChange={(e) => {
                  handleInputChange(e, "bank_penerbit");
                  console.log(e);
                }}
              >
               <option>{datareverensis?.bank_penerbit}</option>
                <option>BCA</option>
                <option>BRI</option>
                <option>BNI</option>
                <option>MANDIRI</option>
                <option>PERMATA</option>
              </Select>
              
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <b>B. BADAN USAHA</b>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={3}>
              <Form.Label>
                <b>LAPORAN KEUANGAN :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.laporan_keuangan}
              onChange={(e) => {
                handleInputChange(e.target.value, "laporan_keuangan");
                console.log(e.target.value);
              }}
              />
            </Col>
            <Col sm={3}>
              <Form.Label>
                <b>LAMA USAHA (TAHUN/YEAR) :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.lama_usaha}
              onChange={(e) => {
                handleInputChange(e.target.value, "lama_usaha");
                console.log(e.target.value);
              }}
              />
            </Col>
            <Col sm={3}>
              <Form.Label>
                <b>STATUS USAHA :</b>
              </Form.Label>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.status_usaha}
                onChange={(e) => {
                  handleInputChange(e, "status_usaha");
                  console.log(e);
                }}
              >
                <option>{datareverensis?.status_usaha}</option>
                <option>TIDAK ADA</option>
                <option>BCA</option>
                <option>BRI</option>
                <option>BNI</option>
                <option>MANDIRI</option>
                <option>PERMATA</option>
              </Select>
            </Col>
            <Col sm={3}>
              <Form.Label>
                <b>OMSET BULANAN :</b>
              </Form.Label>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.omset_bulanan}
                onChange={(e) => {
                  handleInputChange(e, "omset_bulanan");
                  console.log(e);
                }}
              >
               <option>{datareverensis?.omset_bulanan}</option>
                <option>TIDAK ADA</option>
                <option>BCA</option>
                <option>BRI</option>
                <option>BNI</option>
                <option>MANDIRI</option>
                <option>PERMATA</option>
              </Select>
            
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={3}>
              <Form.Label>
                <b>PERUSAHAAN AFFILIASI YANG PERNAH MENYEWA DI EUREKA :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.affiliasi}
              onChange={(e) => {
                handleInputChange(e.target.value, "affiliasi");
                console.log(e.target.value);
              }}
              />
              
            </Col>
          </Row>
          <br />
          <hr />
          <br />
          <b>DATA UNIT (Unit Data)</b>
          <br />
          <br />
          <Row className="align-items-center">
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>QTY MOTOR :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.qty_motor}
              onChange={(e) => {
                handleInputChange(e.target.value, "qty_motor");
                console.log(e.target.value);
              }}
              />
            
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>QTY GRANDMAX :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.qty_grandmax}
              onChange={(e) => {
                handleInputChange(e.target.value, "qty_grandmax");
                console.log(e.target.value);
              }}
              />
            
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>QTY L300 :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.qty_l300}
              onChange={(e) => {
                handleInputChange(e.target.value, "qty_l300");
                console.log(e.target.value);
              }}
              />
             
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>QTY TRAGA :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.qty_traga}
              onChange={(e) => {
                handleInputChange(e.target.value, "qty_traga");
                console.log(e.target.value);
              }}
              />
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>QTY CDE :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.qty_cde}
              onChange={(e) => {
                handleInputChange(e.target.value, "qty_cde");
                console.log(e.target.value);
              }}
              />
             
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>QTY CDD :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.qty_cdd}
              onChange={(e) => {
                handleInputChange(e.target.value, "qty_cdd");
                console.log(e.target.value);
              }}
              />
             
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>QTY FUSO :</b>
              </Form.Label> <Input 
              value={datareverensis?.qty_fuso}
              onChange={(e) => {
                handleInputChange(e.target.value, "qty_fuso");
                console.log(e.target.value);
              }}
              />
            
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>QTY WINGBOX :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.qty_wingbox}
              onChange={(e) => {
                handleInputChange(e.target.value, "qty_wingbox");
                console.log(e.target.value);
              }}
              />
            
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>QTY TRAILER 20" :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.qty_trailer20}
              onChange={(e) => {
                handleInputChange(e.target.value, "qty_trailer20");
                console.log(e.target.value);
              }}
              />
             
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>QTY TRAILER 40" :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.rp_trailer40}
              onChange={(e) => {
                handleInputChange(e.target.value, "rp_trailer40");
                console.log(e.target.value);
              }}
              />
            
            </Col>
          </Row>
          <br />
          <hr />
          <br />
          <b>DATA SEWA (Order Data)</b>
          <br />
          <br />
          <Row className="align-items-center">
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>BIAYA MOTOR :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.rp_motor}
              onChange={(e) => {
                handleInputChange(e.target.value, "rp_motor");
                console.log(e.target.value);
              }}
              />
             
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>BIAYA GRANDMAX :</b>
              </Form.Label> <Input 
              value={datareverensis?.rp_grandmax}
              onChange={(e) => {
                handleInputChange(e.target.value, "rp_grandmax");
                console.log(e.target.value);
              }}
              />
             
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>BIAYA L300 :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.rp_l300}
              onChange={(e) => {
                handleInputChange(e.target.value, "rp_l300");
                console.log(e.target.value);
              }}
              />
              
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>BIAYA TRAGA :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.rp_traga}
              onChange={(e) => {
                handleInputChange(e.target.value, "rp_traga");
                console.log(e.target.value);
              }}
              />
              
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>BIAYA CDE :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.rp_cde}
              onChange={(e) => {
                handleInputChange(e.target.value, "rp_cde");
                console.log(e.target.value);
              }}
              />
              
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>BIAYA CDD :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.rp_cdd}
              onChange={(e) => {
                handleInputChange(e.target.value, "rp_cdd");
                console.log(e.target.value);
              }}
              />
            
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>BIAYA FUSO :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.rp_fuso}
              onChange={(e) => {
                handleInputChange(e.target.value, "rp_fuso");
                console.log(e.target.value);
              }}
              />
            
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>BIAYA WINGBOX :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.rp_wingbox}
              onChange={(e) => {
                handleInputChange(e.target.value, "rp_wingbox");
                console.log(e.target.value);
              }}
              />
             
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>BIAYA TRAILER 20" :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.rp_trailer20}
              onChange={(e) => {
                handleInputChange(e.target.value, "rp_trailer20");
                console.log(e.target.value);
              }}
              />
             
            </Col>
            <Col>
              <Form.Label style={{ fontSize: "10px" }}>
                <b>BIAYA TRAILER 40" :</b>
              </Form.Label>
              <Input 
              value={datareverensis?.rp_trailer40}
              onChange={(e) => {
                handleInputChange(e.target.value, "rp_trailer40");
                console.log(e.target.value);
              }}
              />
             
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col sm={3}>
              <Form.Label>
                <b>NILAI RUU (%)</b>
              </Form.Label>
              <Input 
              value={datareverensis?.nilai_ruu}
              onChange={(e) => {
                handleInputChange(e.target.value, "nilai_ruu");
                console.log(e.target.value);
              }}
              />
            
            </Col>
            <Col sm={3}>
              <Form.Label>
                <b>JUMLAH WAKTU PEMBAYARAN (ToP)</b>
              </Form.Label>
              <Input 
              value={datareverensis?.pembayaran}
              onChange={(e) => {
                handleInputChange(e.target.value, "pembayaran");
                console.log(e.target.value);
              }}
              />
              
            </Col>
            <Col sm={3}>
              <Form.Label>
                <b>METODE PEMBAYARAN</b>
              </Form.Label>
              <Select
                style={{ width: "100%" }}
                value={datareverensis.metode_pembayaran}
                onChange={(e) => {
                  handleInputChange(e, "metode_pembayaran");
                  console.log(e);
                }}
              >
                <option>TRANSFER</option>
                <option>TUNAI MUKA</option>
                <option>TUNAI / CASH</option>
                <option>CHECK / GIRO</option>
                <option>CREDIT CARD</option>
              </Select>
          
            </Col>
            
            <Col sm={3} >
              <Form.Label>
                <b>PERIODE SEWA (BULAN/MONTH)</b>
              </Form.Label>
              <Form.Control aria-label="Default select example"></Form.Control>
            </Col>
          </Row>
          <Row>
          <Col sm={3}>
              <Form.Label>
                <b>JUMLAH UNIT</b>
              </Form.Label>
              <Input 
              value={datareverensis?.jumlah_unit}
              onChange={(e) => {
                handleInputChange(e.target.value, "jumlah_unit");
                console.log(e.target.value);
              }}
              />
            
            </Col>
          <Col sm={3}>
              <Form.Label>
                <b>NILAI SEWA</b>
              </Form.Label>
              <Input 
              value={datareverensis?.nilai_sewa}
              onChange={(e) => {
                handleInputChange(e.target.value, "nilai_sewa");
                console.log(e.target.value);
              }}
              />
            
            </Col>
          </Row>
        </div>
        <Col sm={24} className="d-flex justify-content-end mt-2">
          <Button onClick={EditMitras} type="primary" htmlType="submit">
            Save Changed
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default DataReferensi;
