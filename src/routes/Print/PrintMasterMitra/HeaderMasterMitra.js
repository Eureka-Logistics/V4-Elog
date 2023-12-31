import { Col, Row } from "antd";
import React from "react";
import PrintZustand from "../../../zustand/Store/untukPrint/MasterMitra";

function HeaderMasterMitra() {
  const DataKodeMitraZustand = PrintZustand((state) => state.DataKodeMitraZustand);
  console.log(`DataKodeMitraZustand`,DataKodeMitraZustand);
  return (
    <div id="outtable" style={{ overflow: "auto", maxHeight: "800px" }}>
      <div style={{ padding: "20px" }}>
        <table
          width="100%"
          cellpadding="1"
          style={{ border: "1px solid black" }}
        >
          <tr>
            <td width="110px" style={{ border: "1px solid black" }}>
              <div style={{ padding: "10px" , marginLeft: '20%'}}>
                <img
                  src="https://elogs.eurekalogistics.co.id/assets/admin/dist/img/logo-eurekalogistics.png"
                  class="img-circle"
                  width="110px"
                />
              </div>
            </td>
            <td
              align="center"
              colSpan="3"
              style={{ border: "1px solid black" }}
            >
              <b>E-FORM MASTER DATA & ANALISA SURVEY</b> <br />
              <i>Master Data Application & Survey Analysis Form</i>
            </td>
            <td width="110px" align="" style={{ border: "1px solid black" }}>
              <div style={{ padding: "5px" , marginLeft: '10%'}}>
                MITRA CODE <br />
                <strong>{DataKodeMitraZustand.kode_mitra}</strong>
              </div>
            </td>
            <td width="110px" height="100px" align="">
              <div style={{ padding: "10px" }}>
                <img
                  src="https://elogs.eurekalogistics.co.id/qr/EM00318.png"
                  class="img-circle"
                  width="100%"
                />
              </div>
            </td>
          </tr>
          <tr style={{ textAlign: "center" }}>
            <td style={{ backgroundColor: "black" }} colSpan={12}>
              {" "}
            </td>
          </tr>
          {/* Nama Dan ALAMAT PERUSAHAAN */}
          <>
            <td
              align="center"
              colSpan="8"
              style={{ border: "1px solid black" , height: '40px', paddingTop: '10px'}}
            >
              <b >
                {" "}
                NAMA DAN ALAMAT PERUSAHAAN (<i>Sold to Party</i>){" "}
              </b>
            </td>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                KONTRAK AWAL
              </td>{" "}
              <td
                width="250px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.awal_kontrak}
              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                KONTRAK AKHIR
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colSpan={3}
              >
                {" "}
                {DataKodeMitraZustand.akhir_kontrak}
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                TITLE
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.title}
                
                
              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                NAMA MITRA
              </td>{" "}
              <td
                align="left"
                colSpan={3}
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.nama_mitra}
              </td>
            </tr>
            <tr style={{ textAlign: "center" }}>
              <td style={{ backgroundColor: "black" }} colSpan={12}>
                {" "}
              </td>
            </tr>
          </>
          {/* ALAMAT */}
          <>
            <tr>
              <td
                width="100px"
                rowspan="3"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                ALAMAT
              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                JALAN
              </td>
              <td
                align="left"
                colspan="4"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.alamat}
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                KOTA
              </td>
              <td
                width="130px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                Kota Bekasi
              </td>
              <td
                width="100px"
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                PROVINSI
              </td>
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colspan="4"
              >
                {" "}
                Jawa Barat
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                KODEPOS
              </td>
              <td
                width="130px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                17530
              </td>
              <td
                width="100px"
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                HOMEPAGE
              </td>
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colspan="4"
              >
                {" "}
                {DataKodeMitraZustand.homepage}
              </td>
            </tr>
            <tr style={{ textAlign: "center" }}>
              <td style={{ backgroundColor: "black" }} colSpan={12}>
                {" "}
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                TELP. KANTOR
              </td>{" "}
              <td
                width="250px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.telepon}

              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                HP/WA
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colSpan={3}
              >
                {" "}
                {DataKodeMitraZustand.telp}

              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                FAX. KANTOR
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.fax}

              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                TAHUN BERDIRI
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colSpan={3}
              >
                {" "}
                {DataKodeMitraZustand.tahun_berdiri}
              </td>
            </tr>
          </>
          {/* DATA PERPAJAKAN */}
          <>
            <tr align="center">
              <td colspan="6"
              style={{height: '40px'}}>
                {" "}
                <b>
                  {" "}
                  DATA PERPAJAKAN (<i>Tax Information</i>){" "}
                </b>
              </td>
            </tr>{" "}
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                NO NPWP{" "}
              </td>{" "}
              <td
                style={{ border: "1px solid black", padding: "10px" }}
                width="250px"
              >
                {" "}
                {DataKodeMitraZustand.npwp_id}
              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                NAMA NPWP
              </td>{" "}
              <td
                style={{ border: "1px solid black", padding: "10px" }}
                align="left"
                colSpan={4}
              >
                {" "}
                {DataKodeMitraZustand.npwp_name}
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                TEMPAT & JALAN
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colspan="6"
              >
                {" "}
                {DataKodeMitraZustand.npwp_address}

                {/* Jalan Selayar Blok B2 Nomor 1, Kawasan Industri MM2100,
                Mekarwangi, Cikarang Barat, Kab Bekasi, Jawa Barat,17530 */}
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                BLOK{" "}
              </td>{" "}
              <td
                width="250px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.npwp_blok}

              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                NOMOR
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colSpan={4}
              >
                {" "}
                {DataKodeMitraZustand.npwp_nomor}
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                RT{" "}
              </td>{" "}
              <td
                width="250px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.npwp_rt}

              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                RW
              </td>{" "}
              <td
                colSpan={4}
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.npwp_rw}

              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                KELURAHAN{" "}
              </td>{" "}
              <td
                width="250px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.npwp_kelurahan}
              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                KECAMATAN
              </td>{" "}
              <td
                align="left"
                colSpan={4}
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.npwp_kecamatan}
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                KOTA{" "}
              </td>{" "}
              <td
                width="250px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.npwp_kota}

              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                PROVINSI
              </td>{" "}
              <td
                align="left"
                colSpan={4}
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.npwp_provinsi}

              </td>
            </tr>
          </>
          {/* DATA ACCOUNTING */}
          <>
            <tr align="center">
              <td colspan="6"
               style={{ border: "1px solid black" , height: '40px'}}>
                {" "}
                <b>
                  {" "}
                  DATA ACCOUNTING (<i>Accounting Information</i>){" "}
                </b>
              </td>
            </tr>{" "}
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                BANK NAME
              </td>{" "}
              <td
                width="250px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.nama_bank}

              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                ACCOUNT NAME
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colSpan={4}
              >
                {" "}
                {DataKodeMitraZustand.nama_akun}

              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                ACCOUNT NUMBER
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.no_rek}

              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                CURRENCY
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colSpan={4}
              >
                {" "}
                {DataKodeMitraZustand.currency}
              </td>
            </tr>
          </>
          {/* DATA PENANGGUNG JAWAB */}
          <>
            <tr align="center">
              <td colspan="6"  style={{ border: "1px solid black" , height: '40px'}}>   
                {" "}
                <b>
                  {" "}
                  DATA PENANGGUNG JAWAB (<i>Person In Charge</i>){" "}
                </b>
              </td>
            </tr>{" "}
            <tr>
              <td
                colspan="6"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                <b> PENANGGUNG JAWAB UNIT (PIC of UNIT)</b>
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                NAMA{" "}
              </td>{" "}
              <td
                width="250px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                YOGA SUPRABOWO
              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                JABATAN
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colSpan={4}
              >
                {" "}
                OPERASIONAL
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                TELP/HP{" "}
              </td>{" "}
              <td
                width="250px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                082223666670
              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                EMAIL
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colSpan={4}
              >
                {" "}
                yoga.suprabowo@aln.co.id
              </td>
            </tr>
            <tr>
              <td
              
                colspan="6"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                <b> PENANDATANGAN KONTRAK (PIC of DESCISSION MAKER)</b>
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                NAMA{" "}
              </td>{" "}
              <td
                width="250px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                SUKI LIE
              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                JABATAN
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colSpan={4}
              >
                {" "}
                DIREKTUR
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                TELP/HP{" "}
              </td>{" "}
              <td
                width="250px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                EMAIL
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colSpan={4}
              >
                {" "}
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                KTP
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                3172022411670004
              </td>
            </tr>
            <tr>
              <td
                colspan="6"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                <b> PEMBAYARAN (PIC of PAYMENT)</b>
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                NAMA{" "}
              </td>{" "}
              <td
                width="250px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                CHRIS SETYAWATI
              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                JABATAN
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colSpan={4}
              >
                {" "}
                FINANCE
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                TELP/HP{" "}
              </td>{" "}
              <td
                width="250px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                081322404527
              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                EMAIL
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colSpan={4}
              >
                {" "}
                chris.setiawati@aln.co.id
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
              </td>{" "}
              <td
                width="250px"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
              </td>
              <td
                width="100px"
                style={{ border: "1px solid black", padding: "10px" }}
              ></td>{" "}
              <td
                align="right"
                style={{ border: "1px solid black", padding: "10px" }}
                colSpan={4}
              >
                {" "}
                1
              </td>
            </tr>{" "}
            <tr style={{ textAlign: "center" }}>
              <td style={{ backgroundColor: "black" }} colSpan={12}>
                {" "}
              </td>
            </tr>
          </>
          {/* DATA REFERENSI */}
          <>
            <tr>
              <td
                align="center"
                colspan="6"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                <b>
                  {" "}
                  DATA REFERENSI(<i>Customer Reference Data</i>)
                </b>
              </td>
            </tr>
            <tr>
              <td
                colspan="6"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                <b> KRITERIA LEGALITAS DOKUMEN</b>
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                colspan="2"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                PURCHASE ORDER
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colSpan={4}
              >
                {" "}
                {DataKodeMitraZustand.po_legalitas} LENGKAP
                
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                colspan="2"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                KTP PENANDATANGAN
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colSpan={4}
              >
                {" "}
                {DataKodeMitraZustand.ktp_legalitas} LENGKAP
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                rowspan="3"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                AKTA NOTARIS
              </td>{" "}
              <td
                width="200px"
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                AKTA PENDIRIAN (Lengkap)
              </td>{" "}
              <td
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
                colSpan={4}
              >
                {" "}
                {DataKodeMitraZustand.akta_pendirian} LENGKAP
              </td>
            </tr>
            <tr>
              <td
                width="200px"
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                AKTA PERUBAHAN DASAR TERBARU
              </td>{" "}
              <td
                align="left"
                colSpan={4}
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.akta_perubahan_dasar} LENGKAP
              </td>
            </tr>
            <tr>
              <td
                width="200px"
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                AKTA SUSUNAN DIREKSI TERBARU
              </td>{" "}
              <td
                align="left"
                colSpan={4}
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.akta_susunan_direksi} LENGKAP
              </td>
            </tr>

            <tr>
              <td
                width="100px"
                colspan="2"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                SURAT DOMISILI
              </td>{" "}
              <td
                align="left"
                colSpan={4}
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.surat_domisili} LENGKAP
              </td>
            </tr>

            <tr>
              <td
                width="100px"
                rowspan="3"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                PERPAJAKAN
              </td>{" "}
              <td
                width="200px"
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                NPWP
              </td>{" "}
              <td
                align="left"
                colSpan={4}
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.npwp_legalitas} LENGKAP
              </td>
            </tr>
            <tr>
              <td
                width="200px"
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                SKT{" "}
              </td>{" "}
              <td
                align="left"
                colSpan={4}
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.skt_legalitas} 
              </td>
            </tr>
            <tr>
              <td
                width="200px"
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                NPPKP / SPPKP
              </td>{" "}
              <td
                align="left"
                colSpan={4}
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.nppkp_legalitas} LENGKAP
              </td>
            </tr>

            <tr>
              <td
                width="100px"
                rowspan="4"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                IJIN USAHA
              </td>{" "}
              <td
                width="200px"
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                NIB (SIUP/SIUB/SIUJK/SIUPAL)
              </td>{" "}
              <td
                align="left"
                colSpan={4}
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.siup_legalitas} LENGKAP
              </td>
            </tr>
            <tr>
              <td
                width="200px"
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                IJIN PENDIRIAN KPPA
              </td>{" "}
              <td
                align="left"
                colSpan={4}
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.ijin_pendirian} LENGKAP
              </td>
            </tr>
            <tr>
              <td
                width="200px"
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                PERSETUJUAN PENANAMAN MODAL DARI BPKM{" "}
              </td>{" "}
              <td
                align="left"
                colSpan={4}
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.ppmd_legalitas} LENGKAP
              </td>
            </tr>
            <tr>
              <td
                width="200px"
                align="left"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                IJIN USAHA TETAP DARI BPKM{" "}
              </td>{" "}
              <td
                align="left"
                colSpan={4}
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.ijin_usaha} LENGKAP
              </td>
            </tr>
            <tr>
              <td
                width="100px"
                colspan="2"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                TDP
              </td>{" "}
              <td
                align="left"
                colSpan={4}
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                {DataKodeMitraZustand.tdp_legalitas} LENGKAP
              </td>
            </tr>
           
          </>
          {/* DATA KEUANGAN */}
          <>
          <tr>
              <td
                align="center"
                colspan="6"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                <b>
                  {" "}
                  DATA KEUANGAN(<i>Financial Analysis</i>)
                </b>
              </td>
            </tr>
          <tr>
              <td
                align="left"
                colspan="6"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                <b>
                  {" "}
                  A. PERORANGAN
                </b>
              </td>
            </tr>
            <tr>
        <td  width="100px" style={{ border: "1px solid black", padding: "10px" }}>LAMANYA BEKERJA </td>  <td align="left"  style={{ border: "1px solid black", padding: "10px" }}>  {DataKodeMitraZustand.lama_bekerja} TAHUN</td> 
        <td  width="100px" style={{ border: "1px solid black", padding: "10px" }}>JENIS KARTU KREDIT</td>  <td align="left" style={{ border: "1px solid black", padding: "10px" }} colSpan={3}>  {DataKodeMitraZustand.jenis_kartu_kredit
}</td> 
      </tr> 
      <tr>
        <td  width="100px" style={{ border: "1px solid black", padding: "10px" }}> BANK PENERBIT </td>  <td align="left"  style={{ border: "1px solid black", padding: "10px" }}>  {DataKodeMitraZustand.bank_penerbit}</td>  
      </tr> 
      <tr>
              <td
                align="left"
                colspan="6"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                <b>
                  {" "}
                  B. BADAN USAHA
                </b>
              </td>
            </tr>
            <tr>
        <td  width="100px" style={{ border: "1px solid black", padding: "10px" }}>LAPORAN KEUANGAN </td>  <td align="left"  style={{ border: "1px solid black", padding: "10px" }}>   {DataKodeMitraZustand.laporan_keuangan}</td> 
        <td  width="100px" style={{ border: "1px solid black", padding: "10px" }}>LAMA USAHA (TAHUN/YEAR)</td>  <td align="left" style={{ border: "1px solid black", padding: "10px" }} colSpan={3}> {DataKodeMitraZustand.lama_usaha} TAHUN</td>  
      </tr> 
      <tr>
        <td  width="100px" style={{ border: "1px solid black", padding: "10px" }}>STATUS USAHA</td>  <td align="left"  style={{ border: "1px solid black", padding: "10px" }}> {DataKodeMitraZustand.status_usaha}</td> 
        <td  width="100px"  style={{ border: "1px solid black", padding: "10px" }}>OMSET BULANAN</td>  <td align="left"  style={{ border: "1px solid black", padding: "10px" }} colSpan={3}>{DataKodeMitraZustand.omset_bulanan}</td>   
      </tr> 
      <tr> 
        <td  width="100px"  style={{ border: "1px solid black", padding: "10px" }}>ASSET TANAH</td>  <td align="left"  style={{ border: "1px solid black", padding: "10px" }}> {DataKodeMitraZustand.asset_tanah}</td>  
        <td  width="100px"  style={{ border: "1px solid black", padding: "10px" }}>ASSET BANGUNAN</td>  <td align="left"  style={{ border: "1px solid black", padding: "10px" }} colSpan={3}> {DataKodeMitraZustand.asset_bangunan}</td>
      </tr> 
      <tr> 
        <td  width="100px"  style={{ border: "1px solid black", padding: "10px" }}>ASSET KENDARAAN</td>  <td align="left"  style={{ border: "1px solid black", padding: "10px" }}> {DataKodeMitraZustand.asset_kendaraan}</td>  
        <td  width="100px"  style={{ border: "1px solid black", padding: "10px" }}>ASSET MESIN</td>  <td align="left"  style={{ border: "1px solid black", padding: "10px" }} colSpan={3}> {DataKodeMitraZustand.asset_mesin}</td>
      </tr> 
       
    	<tr><td colspan="2"  width="100px"> <b> PERUSAHAAN AFFILIASI YANG PERNAH MENYEWA DI EUREKA</b></td><td align="left"  colspan="4" style={{ border: "1px solid black", padding: "10px" }}> </td>
    	</tr> 
        <tr>
              <td
                align="center"
                colspan="6"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                <b>
                  {" "}
                   DATA SEWA(<i>Order Data</i>) 
                </b>
              </td>
            </tr>
            <tr> 
        <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >JENIS MITRA</td>  <td align="left" style={{ border: "1px solid black", padding: "10px" }}  > {DataKodeMitraZustand.jenis} </td>   
        <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >JENIS KIRIMAN</td>  <td align="left" style={{ border: "1px solid black", padding: "10px" }}  colSpan={3}> {DataKodeMitraZustand.jenis_kiriman}</td>   
      </tr> 
      <tr> 
        <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >PERIODE SEWA (BULAN/MONTH)</td>  <td align="left" style={{ border: "1px solid black", padding: "10px" }}  > {DataKodeMitraZustand.periode_sewa} BULAN</td>   
        <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >NILAI RUU (%)</td>  <td align="left" style={{ border: "1px solid black", padding: "10px" }}  colSpan={3}> {DataKodeMitraZustand.nilai_ruu} %</td>   
      </tr> 
    <tr><td colspan="6"> <b> PEMBAYARAN (Payment Policy) </b></td></tr> 
      <tr> 
        <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >JUMLAH WAKTU PEMBAYARAN (ToP)</td>  <td align="left" style={{ border: "1px solid black", padding: "10px" }}  > {DataKodeMitraZustand.top}</td>  
        <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >METODE PEMBAYARAN</td>  <td align="left" style={{ border: "1px solid black", padding: "10px" }}  colSpan={3}> {DataKodeMitraZustand.metode_pembayaran}</td>
      </tr> 
          </>
          {/* DATA UNIT */}
          <>
          <tr>
              <td
                align="center"
                colspan="6"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {" "}
                <b>
                  {" "}
                  DATA UNIT(<i>Unit Data</i>)
                </b>
              </td>
            </tr>
          </>
        </table>
        <table style={{width: '100%', border: "1px solid black", padding: "10px" }} >
        <tr> 
         <td  width="70px" style={{ border: "1px solid black", padding: "10px" }}>JENIS</td>  
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }}>MOTOR</td>  
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }}>GRANDMAX</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }}>L300</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >TRAGA</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }}>CDE</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }}>CDD</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }}>FUSO</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }}>WINGBOX</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >TRAILER 20"</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }}>TRAILER 40"</td>
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }}>TOTAL UNIT</td>    
      </tr> 
      <tr>
         <td  width="70px" style={{ border: "1px solid black", padding: "10px" }}>QTY</td>  
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.qty_motor}</td>  
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.qty_grandmax}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.qty_l300}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.qty_traga}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.qty_cde}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.qty_cdd}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.qty_fuso}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.qty_wingbox}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.qty_trailer20}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.qty_trailer40}</td>  
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} > </td>  
      </tr> 
      <tr>
         <td  width="70px" style={{ border: "1px solid black", padding: "10px" }}>DISEWA</td>  
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.rp_motor}</td>  
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.rp_grandmax}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.rp_l300}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.rp_traga}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.rp_cde}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.rp_cdd}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.rp_fuso}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.rp_wingbox}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.rp_trailer20}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} >{DataKodeMitraZustand.rp_trailer40}</td> 
         <td  width="100px" style={{ border: "1px solid black", padding: "10px" }} > </td> 
      </tr> 
        </table>
        <table width="100%">
      
    </table>
  
    <table width="100%" >  
      <tr style={{ border: "1px solid black", padding: "10px" }}>
        <td  width="100px" colspan="6" style={{ border: "1px solid black", padding: "10px" }}><b>DIBUAT OLEH (Created By)</b>{" "} </td>  <td align="left"  colspan="2" style={{ border: "1px solid black", padding: "10px" }}><b> DIPERIKSA OLEH (Checked By)</b></td>  
        
      </tr>     
      <tr style={{height: '100px'}}>
        <td  width="100px" colspan="3" style={{ border: "1px solid black", padding: "10px" }}> </td>  <td align="left"  colspan="2" style={{ border: "1px solid black", padding: "10px" }}>   </td>    
        <td  width="100px" colspan="6" style={{ border: "1px solid black", padding: "10px" }}> </td>    
      </tr>     
      <tr style={{ border: "1px solid black", padding: "10px" }}>
        <td  width="100px" colspan="3" style={{ border: "1px solid black", padding: "10px" }}>  <b>EVIYANA NURAINI</b> <br /> LEGAL PARTNERSHIP EUREKA</td>  <td align="left"  colspan="3" style={{ border: "1px solid black", padding: "10px" }}>  <b> SUKI LIE</b> <br /> DIREKTUR</td>    
        <td  width="100px" colspan="6" style={{ border: "1px solid black", padding: "10px" }}>  <b>VITRI YENI</b> <br /> Ka. PARTNERSHIP EUREKA</td>    
      </tr>  
      <tr style={{ border: "1px solid black", padding: "10px" }}> 
         <td align="right"  colspan="12" style={{ border: "1px solid black", padding: "10px" }}>  </td>   
      </tr>         
  </table>
  
    <table width="100%" >  
      <tr style={{ border: "1px solid black", padding: "10px" }}>
        <td  width="100px" colspan="3" style={{ border: "1px solid black", padding: "10px" }}><b>DIPERIKSA OLEH (Checked By)</b> </td>  <td align="left"  colspan="3" style={{ border: "1px solid black", padding: "10px" }}><b> DISETUJUI OLEH (Approved By)</b></td>  
      </tr>     
      <tr style={{height: '100px'}}>
        <td  width="100px" colspan="3" style={{ border: "1px solid black", padding: "10px" }}> </td>  <td align="left"  colspan="2" style={{ border: "1px solid black", padding: "10px" }}>   </td>    
      </tr>     
      <tr style={{ border: "1px solid black", padding: "10px" }}>
        <td  width="100px" colspan="3" style={{ border: "1px solid black", padding: "10px" }}><b>ERNANTO TRIATMOJO</b>  <br/> ASM. AKT & KEU</td>  <td align="left"  colspan="3" style={{ border: "1px solid black", padding: "10px" }}> <b>ADRIANSYAH</b> <br/>KEPALA CABANG EUREKA</td>    
      </tr>  
      <tr style={{ border: "1px solid black", padding: "10px" }}> 
         <td align="right"  colspan="6" style={{ border: "1px solid black", padding: "10px" }}> 3 </td>   
      </tr>         
  </table>
 
      </div>
    </div>
  );
}

export default HeaderMasterMitra;
