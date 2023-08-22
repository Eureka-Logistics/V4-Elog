import { Col, Row } from "antd";
import React from "react";

function HeaderMasterMitra() {
  return (
    <div id="outtable" style={{ overflow: "auto", maxHeight: "700px",  }}>
      <div style={{ padding: "20px" }}>
        <table
          width="100%"
          cellpadding="1"
          style={{ border: "1px solid black" }}
        >
          <tr>
            <td width="110px" style={{ border: "1px solid black" }}>
              <div style={{ padding: "10px" }}>
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
              <div style={{ padding: "5px" }}>
                MITRA CODE <br />
                <strong>#EM00318</strong>
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
              style={{ border: "1px solid black" }}
            >
              <b>
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
                2023-07-28
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
                2025-07-27
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
                PT
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
                PT. ADHI LINTAS NUSA (ALN)
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
                Jl. Selayar , Kawasan MM 2100 Blok B2-1 , Mekarwangi, Cikarang
                Baratm Bekasi
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
                -
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
                (021) 501-16028
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
                0813-99288155
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
                (021) 501-16028
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
                1997
              </td>
            </tr>
          </>
          {/* DATA PERPAJAKAN */}
          <>
            <tr align="center">
              <td colspan="6">
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
                94.519.736.6-413.000
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
                PT. Adhi Lintas Nusa
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
                Jalan Selayar Blok B2 Nomor 1, Kawasan Industri MM2100,
                Mekarwangi, Cikarang Barat, Kab Bekasi, Jawa Barat,17530
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
                B2
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
                1
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
                -
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
                -
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
                Mekarwangi
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
                Cikarang Barat
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
                Kota Bekasi
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
                Jawa Barat
              </td>
            </tr>
          </>
          {/* DATA ACCOUNTING */}
          <>
            <tr align="center">
              <td colspan="6">
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
                BANK BCA
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
                PT. Adhi Lintas Nusa
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
                4860400168
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
                Rupiah (Rp.)
              </td>
            </tr>
          </>
          {/* DATA PENANGGUNG JAWAB */}
          <>
            <tr align="center">
              <td colspan="6">
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
                ADA LENGKAP
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
                ADA LENGKAP
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
                ADA LENGKAP
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
                ADA LENGKAP
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
                TIDAK LENGKAP
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
                ADA LENGKAP
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
                ADA LENGKAP
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
                ADA LENGKAP
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
                ADA LENGKAP
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
                TIDAK LENGKAP
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
                TIDAK LENGKAP
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
                TIDAK LENGKAP
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
                TIDAK LENGKAP
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
                ADA LENGKAP
              </td>
            </tr>
            
          </>
        </table>

        <>
          <Row style={{ paddingLeft: "16px", paddingRight: "14px" }}>
            <Col span={6} style={{  border: "1px solid black" }}>
              <b>
                DIBUAT OLEH (Created By)
              </b>
            </Col>
            <Col span={6} style={{  border: "1px solid black" }}>
             
            </Col>
            <Col span={6} style={{  border: "1px solid black"}}>
            <b>
                DIPERIKSA OLEH (Created By)
              </b>
            </Col>
            <Col span={6} style={{  border: "1px solid black" }}>
           
            </Col>
          </Row>
          <Row style={{ paddingLeft: "16px", paddingRight: "14px" }}>
            <Col span={6} style={{  border: "1px solid black" }}>
             
            </Col>
            <Col span={6} style={{  border: "1px solid black" }}>
             
            </Col>
            <Col span={6} style={{  border: "1px solid black"}}>
            
            </Col>
            <Col span={6} style={{  border: "1px solid black", height: '60px' }}>
           
            </Col>
          </Row>
          <Row style={{ paddingLeft: "16px", paddingRight: "14px" }}>
            <Col span={6} style={{  border: "1px solid black" }}>
            <div style={{padding:'10px'}}>
            <b>EVIYANA NURAINI</b> <br /> LEGAL PARTNERSHIP EUREKA
            </div>
            </Col>
            <Col span={6} style={{  border: "1px solid black" }}>
            <div style={{padding:'10px'}}>
            <b> SUKI LIE</b> <br /> DIREKTUR
            </div>
           
            </Col>
            <Col span={6} style={{  border: "1px solid black"}}>
            <div style={{padding:'10px'}}>
            <b>VITRI YENI</b> <br /> Ka. PARTNERSHIP EUREKA
            </div>
            
            </Col>
            <Col span={6} style={{  border: "1px solid black" }}>
            <div style={{padding:'10px'}}>
            <b>ERNANTO TRIATMOJO</b> <br /> ASM. AKT & KEU
            </div>
            
            </Col>
          </Row>
        </>
      </div>
    </div>
  );
}

export default HeaderMasterMitra;
