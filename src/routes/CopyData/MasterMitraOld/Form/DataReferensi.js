import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
// import { httpClient } from "../../../util/Api";
import { httpClient } from "../../../../Api/Api";
import isiDatamasterMitraDetailZustand from "../../../../zustand/Store/IsiDataMasterMitraDetail/Store";
import { Button, Select, notification } from "antd";
import Swal from "sweetalert2";
import Baseurl from "../../../../Api/BaseUrl";

function DataReferensi({ mitraId, SemuaDataUntukEdit, setActiveTab }) {
  const id_mitras = mitraId;
  const [DataKodeMitra, setDataKodeMitra] = useState("");
  const [DataKodeInisial, setDataKodeInisial] = useState("");
  const [DataQRKode, setDataQRKode] = useState("");
  const [DataNamaMitra, setDataNamaMitra] = useState("");
  const [DataTitle, setDataTitle] = useState("");
  const [DataJenisUsaha, setDataJenisUsaha] = useState("");
  const [DataKepemilikan, setDataKepemilikan] = useState("");
  const [DataJumlahArmada, setDataJumlahArmada] = useState("");
  const [DataJumlahSDMOperasional, setDataJumlahSDMOperasional] = useState("");
  const [DataCabang, setDataCabang] = useState("");
  const [DataJenisKiriman, setDataJenisKiriman] = useState("");
  const [DataWilayah, setDataWilayah] = useState("");
  const [DataTujuan, setDataTujuan] = useState("");
  const [DataTahunAwalKontrak, setDataTahunAwalKontrak] = useState("");
  const [DataAwalKontrak, setDataAwalKontrak] = useState("");
  const [DataAkhirKontrak, setDataAkhirKontrak] = useState("");
  const [DataKontrak, setDataKontrak] = useState("");
  const [DataTahunBerdiri, setDataTahunBerdiri] = useState("");
  const [DataNPWPID, setDataNPWPID] = useState("");
  const [DataNPWPName, setDataNPWPName] = useState("");
  const [DataNPWPAddress, setDataNPWPAddress] = useState("");
  const [DataNPWPJalan, setDataNPWPJalan] = useState("");
  const [DataBlok, setDataBlok] = useState("");
  const [DataNPWPNomor, setDataNPWPNomor] = useState("");
  const [DataNPWPRT, setDataNPWPRT] = useState("");
  const [DataNPWPRW, setDataNPWPRW] = useState("");
  const [DataNPWKelurahan, setDataNPWKelurahan] = useState("");
  const [DataNPWPKecamatan, setDataNPWPKecamatan] = useState("");
  const [DataNPWPKota, setDataNPWPKota] = useState("");
  const [DataNPWPProvinsi, setDataNPWPProvinsi] = useState("");
  const [DataNPWPKodePos, setDataNPWPKodePos] = useState("");
  const [DataISTaxAble, setDataISTaxAble] = useState("");
  const [DataContactPerson, setDataContactPerson] = useState("");
  const [DataTelp, setDataTelp] = useState("");
  const [DataFax, setDataFax] = useState("");
  const [DataEmail, setDataEmail] = useState("");
  const [DataAlamat, setDataAlamat] = useState("");
  const [DataHomePage, setDataHomePage] = useState("");
  const [DataPembayaran, setDataPembayaran] = useState("");
  const [DataNamaAkunBank, setDataNamaAkunBank] = useState("");
  const [DataNamaBankk, setDataNamaBankk] = useState("");
  const [DataNoRek, setDataNoRek] = useState("");
  const [DataCurrency, setDataCurrency] = useState("");
  const [DataDirektur, setDataDirektur] = useState("");
  const [DataTelepon, setDataTelepon] = useState("");
  const [DataPICPurchasing, setDataPICPurchasing] = useState("");
  const [DataStatusUsaha, setDataStatusUsaha] = useState("");
  const [DataTop, setDataTop] = useState("");
  const [DataTahunRegister, setDataTahunRegister] = useState("");
  const [DataMemo, setDataMemo] = useState("");
  const [DataType, setDataType] = useState("");
  const [DataPicId, setDataPicId] = useState("");
  const [selectMitraPIC, setselectMitraPIC] = useState("");
  const [DataPic, setDataPic] = useState("");
  const [DataIDPic, setDataIDPic] = useState("");
  const [PoLegalitas, setPoLegalitas] = useState("");
  const [KTPLegalitas, setKTPLegalitas] = useState("");
  const [AktaPendirian, setAktaPendirian] = useState("");
  const [AktaPerubahanDasar, setAktaPerubahanDasar] = useState("");
  const [AktaSusunanDireksi, setAktaSusunanDireksi] = useState("");
  const [SuratDomisili, setSuratDomisili] = useState("");
  const [NPWPLegalitas, setNPWPLegalitas] = useState("");
  const [SktLegalitas, setSktLegalitas] = useState("");
  const [NppkpLegalitas, setNppkpLegalitas] = useState("");
  const [SiupLegalitas, setSiupLegalitas] = useState("");
  const [IjinPenidirian, setIjinPendirian] = useState("");
  const [PPMDLegalitas, setPPMDLegalitas] = useState("");
  const [IjinUsaha, setIjinUsaha] = useState("");
  const [TDPLegalitas, setTDPLegalitas] = useState("");
  const [SuratKuasaLegalitas, setSuratKuasaLegalitas] = useState("");
  const [LamaBekerjaLegalitas, setLamaBekerjaLegalitas] = useState("");
  const [JenisKartuKredit, setJenisKartuKredit] = useState("");
  const [StatusUsaha, setStatusUsaha] = useState("");
  const [LamaUsaha, setLamaUsaha] = useState("");
  const [OmsetBulanan, setOmsetBulanan] = useState("");
  const [AssetTanah, setAssetTanah] = useState("");
  const [AssetBangunan, setAssetBangunan] = useState("");
  const [AssetKendaraan, setAssetKendaran] = useState("");
  const [AssetMesin, setAssetMesin] = useState("");
  const [Affiliasi, setAffiliasi] = useState("");
  const [JumlahUnit, setJumlahUnit] = useState("");
  const [PeriodeSewa, setPeriodeSewa] = useState("");
  const [NilaiSewa, setNilaiSewa] = useState("");
  const [NilaiRUU, setNilaiRUU] = useState("");
  const [QtyMotor, setQtyMotor] = useState("");
  const [RpMotor, setRpMotor] = useState("");
  const [QtyGrandMax, setQtyGrandMax] = useState("");
  const [RpGrandmax, setRpGrandmax] = useState("");
  const [Qty1300, setQty1300] = useState("");
  const [Rp1300, setRp1300] = useState("");
  const [QtyTraga, setQtyTraga] = useState("");
  const [RpTraga, setRpTraga] = useState("");
  const [QtyCDE, setQtyCDE] = useState("");
  const [RpCDE, setRpCDE] = useState("");
  const [QtyCDD, setQtyCDD] = useState("");
  const [RpCDD, setRpCDD] = useState("");
  const [QtyFuso, setQtyFuso] = useState("");
  const [RpFuso, setRpFuso] = useState("");
  const [QtyWingbox, setQtyWingbox] = useState("");
  const [RpWingbox, setRpWingbox] = useState("");
  const [QtyTrailer20, setQtyTrailer20] = useState("");
  const [RpTrailer20, setRpTrailer20] = useState("");
  const [QtyTrailer40, setQtyTrailer40] = useState("");
  const [RpTrailer40, setRpTrailer40] = useState("");
  const [BankPenerbit, setBankPenerbit] = useState("");
  const [LaporanKeuangan, setLaporankeuanga] = useState("");
  const [DataJenis, setDataJenis] = useState("");
  const [TypeOfPayment, setTypeOfPayment] = useState("");
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
  });
  const { data, setData } = isiDatamasterMitraDetailZustand();

  console.log(`oper bang datareverensis`, datareverensis.po_legalitas);

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

  const EditMitra = () => {
    setActiveTab("keuangan");
    const data = {
      id_mitra: mitraId,
      jenis: DataJenis,
      kode_mitra: DataKodeMitra,
      nama_mitra: DataNamaMitra,
      kode: DataKodeInisial,
      qrcode: DataQRKode,
      title: DataTitle,
      jenis_usaha: DataJenisUsaha,
      kepemilikan: DataKepemilikan,
      jumlah_armada: DataJumlahArmada,
      jumlah_sdm_operasional: DataJumlahSDMOperasional,
      cabang: DataCabang,
      jenis_kiriman: DataJenisKiriman,
      wilayah: DataWilayah,
      tujuan: DataTujuan,
      tahun_awal_kontrak: DataTahunAwalKontrak,
      awal_kontrak: DataAwalKontrak,
      akhir_kontrak: DataAkhirKontrak,
      kontrak: DataKontrak,
      direktur: DataDirektur,
      tahun_berdiri: DataTahunBerdiri,
      npwp_id: DataNPWPID,
      npwp_name: DataNPWPName,
      npwp_address: DataNPWPAddress,
      npwp_jalan: DataNPWPJalan,
      npwp_blok: DataBlok,
      npwp_nomor: DataNPWPNomor,
      npwp_rt: DataNPWPRT,
      npwp_rw: DataNPWPRW,
      npwp_kelurahan: DataNPWKelurahan,
      npwp_kecamatan: DataNPWPKecamatan,
      npwp_kota: DataNPWPKota,
      npwp_provinsi: DataNPWPProvinsi,
      npwp_kodepos: DataNPWPKodePos,
      is_taxable: DataISTaxAble,
      telepon: DataTelepon,
      contact_person: DataContactPerson,
      telp: DataTelp,
      fax: DataFax,
      email: DataEmail,
      alamat: DataAlamat,
      homepage: DataHomePage,
      pembayaran: DataPembayaran,
      nama_bank: DataNamaBankk,
      nama_akun: DataNamaAkunBank,
      no_rek: DataNoRek,
      currency: DataCurrency,
      status_usaha: DataStatusUsaha,
      top: DataTop,
      memo: DataMemo,
      type: DataType,
      metode_pembayaran: TypeOfPayment,
      pic_id: DataPicId,
      po_legalitas: PoLegalitas,
      ktp_legalitas: KTPLegalitas,
      akta_pendirian: AktaPendirian,
      akta_perubahan_dasar: AktaPerubahanDasar,
      akta_susunan_direksi: AktaSusunanDireksi,
      surat_domisili: SuratDomisili,
      npwp_legalitas: NPWPLegalitas,
      skt_legalitas: SktLegalitas,
      nppkp_legalitas: NppkpLegalitas,
      siup_legalitas: SiupLegalitas,
      ijin_pendirian: IjinPenidirian,
      ppmd_legalitas: PPMDLegalitas,
      ijin_usaha: IjinUsaha,
      tdp_legalitas: TDPLegalitas,
      surat_kuasa: SuratKuasaLegalitas,
      lama_bekerja: LamaBekerjaLegalitas,
      jenis_kartu_kredit: JenisKartuKredit,
      bank_penerbit: BankPenerbit,
      laporan_keuangan: LaporanKeuangan,
      status_usaha: StatusUsaha,
      lama_usaha: LamaUsaha,
      omset_bulanan: OmsetBulanan,
      asset_tanah: AssetTanah,
      asset_bangunan: AssetBangunan,
      asset_kendaraan: AssetKendaraan,
      asset_mesin: AssetMesin,
      affiliasi: Affiliasi,
      jumlah_unit: JumlahUnit,
      periode_sewa: PeriodeSewa,
      nilai_sewa: NilaiSewa,
      nilai_ruu: NilaiRUU,
      qty_motor: parseInt(QtyMotor),
      rp_motor: parseInt(RpMotor),
      qty_grandmax: parseInt(QtyGrandMax),
      rp_grandmax: parseInt(RpGrandmax),
      qty_l300: parseInt(Qty1300),
      rp_l300: parseInt(Rp1300),
      qty_traga: parseInt(QtyTraga),
      rp_traga: parseInt(RpTraga),
      qty_cde: parseInt(QtyCDE),
      rp_cde: parseInt(RpCDE),
      qty_cdd: parseInt(QtyCDD),
      rp_cdd: parseInt(RpCDD),
      qty_fuso: parseInt(QtyFuso),
      rp_fuso: parseInt(RpFuso),
      qty_wingbox: parseInt(QtyWingbox),
      rp_wingbox: parseInt(RpWingbox),
      qty_trailer20: parseInt(QtyTrailer20),
      rp_trailer20: parseInt(QtyTrailer20),
      qty_trailer40: parseInt(QtyTrailer40),
      rp_trailer40: parseInt(RpTrailer40),
    };
    setData(data);
  };

  const EditMitras = async () => {
    try {
      const response = await axios.post(`${Baseurl}mitra/edit-mitra`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
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
        </Col>
      </Row>
      <Row>
        <Col sm={24} className="d-flex justify-content-end">
          <Button onClick={EditMitras} type="primary" htmlType="submit">
            Save Changed
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default DataReferensi;
