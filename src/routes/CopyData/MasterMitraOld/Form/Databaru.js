import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Checkbox,
  message,
  Card,
  notification,
} from "antd";
import axios from "axios";
import Baseurl from "../../../../Api/BaseUrl";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import CreatedPIC from "./CreatedPIC";
import PIC from "./PIC";
import useBanksStore from "../../../../zustand/Store/NamaNamaBank";
import Swal from "sweetalert2";
import { Data } from "@react-google-maps/api";
import moment from "moment";
import { PrinterOutlined } from "@ant-design/icons";
import PrintZustand from "../../../../zustand/Store/untukPrint/MasterMitra";
import { parse } from "date-fns";
import isiDatamasterMitraDetailZustand from "../../../../zustand/Store/IsiDataMasterMitraDetail/Store";

function DataBaru({ mitraId, DataOptions, setActiveTab }) {
  // const [datamiTraProfile, setDataMitraProfile] = useState([]);
  const [form] = Form.useForm();
  const router = useHistory();
  const [datanyaPT, setDatanyaPT] = useState("");
  const [namaMitra, setnamaMitra] = useState("");
  const [TypeOfPayment, setTypeOfPayment] = useState("");
  const [Status, setStatus] = useState("");
  const [Title, setTitle] = useState("");
  const [TitleSelect, setTitleSelect] = useState("");
  const [NamaBank, setDataNamaBank] = useState("");
  const { banks } = useBanksStore();
  const [DataJenis, setDataJenis] = useState("");
  const [DataDetailMitra, setDataDetailMitra] = useState("");
  const { DataKodeMitraZustand, setDataKodeMitraZustand } = PrintZustand(
    (state) => ({
      DataKodeMitraZustand: state.DataKodeMitraZustand,
      setDataKodeMitraZustand: state.setDataKodeMitraZustand,
    })
  );
  console.log(`DataKodeMitraZustand`,DataKodeMitraZustand);
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

  const handleView = () => {
    router.push(`/PrintMasterMitra/`);
    // console.log("ini id_bu", idEmploye);
  };

  // console.log(`nama mitara`, namaMitra);
  const onFinish = async (values) => {
    // console.log("Success:", values);

    try {
      const response = await axios.post(
        `${Baseurl}mitra/edit-mitra`,
        {
          ...values,
          id_mitra_pic: 1,
          id_mitra: mitraId,
          pembayaran: TypeOfPayment,
          status: Status,
          title: Title,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem(`token`),
          },
        }
      );
      message.success("Mitra successfully edited"); // Menampilkan pesan sukses
      DetailMitra();
    } catch (error) {
      // console.error("Failed to edit mitra:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  const onChange = (date, dateString) => {
    // console.log(date, dateString);
  };

  const [mitraData1state, setMitraData1state] = useState("");
  const { data, setData } = isiDatamasterMitraDetailZustand();

  const DetailMitra = async () => {
    const data = await axios.get(
      `${Baseurl}mitra/get-detail-mitra?id_mitra=${mitraId}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    setMitraData1state({
      namaMitra: data.data.data?.nama_mitra,
      typeOfPayment: data.data.data?.metode_pembayaran,
      status: data.data.data?.status,
      title: data.data.data?.title,
      dataDetailMitra: data.data.data?.data,
      kodeMitra: data.data.data?.kode_mitra,
      kodeMitraZustand: data.data.data,
      jenis: data.data.data?.jenis,
      kodeInisial: data.data.data?.kode,
      qrcode: data.data.data?.qrcode,
      jenisUsaha: data.data.data?.jenis_usaha,
      kepemilikan: data.data.data?.kepemilikan,
      jumlahArmada: data.data.data?.jumlah_armada,
      jumlahSDMOperasional: data.data.data?.jumlah_sdm_operasional,
      cabang: data.data.data?.cabang,
      jenisKiriman: data.data.data?.jenis_kiriman,
      wilayah: data.data.data?.wilayah,
      tujuan: data.data.data?.tujuan,
      tahunAwalKontrak: data.data.data?.tahun_awal_kontrak,
      awalKontrak: data.data.data?.awal_kontrak,
      akhirKontrak: data.data.data?.akhir_kontrak,
      kontrak: data.data.data?.kontrak,
      direktur: data.data.data?.direktur,
      tahunBerdiri: data.data.data?.tahun_berdiri,
      npwp_id: data.data.data?.npwp_id,
      npwp_name: data.data.data?.npwp_name,
      npwp_address: data.data.data?.npwp_address,
      npwp_jalan: data.data.data?.npwp_jalan,
      blok: data.data.data?.blok,
      npwp_nomor: data.data.data?.npwp_nomor,
      npwp_rt: data.data.data?.npwp_rt,
      npwp_rw: data.data.data?.npwp_rw,
      npwp_kelurahan: data.data.data?.npwp_kelurahan,
      npwp_kecamatan: data.data.data?.npwp_kecamatan,
      npwp_kota: data.data.data?.npwp_kota,
      npwp_provinsi: data.data.data?.npwp_provinsi,
      npwp_kodepos: data.data.data?.npwp_kodepos,
      is_taxable: data.data.data?.is_taxable,
      telepon: data.data.data?.telepon,
      contact_person: data.data.data?.contact_person,
      telp: data.data.data?.telp,
      fax: data.data.data?.fax,
      email: data.data.data?.email,
      alamat: data.data.data?.alamat,
      homepage: data.data.data?.homepage,
      pembayaran: data.data.data?.pembayaran,
      nama_bank: data.data.data?.nama_bank,
      nama_akun: data.data.data?.nama_akun,
      no_rek: data.data.data?.no_rek,
      currency: data.data.data?.currency,
      status_usaha: data.data.data?.status_usaha,
      top: data.data.data?.top,
      memo: data.data.data?.memo,
      type: data.data.data?.type,
      pic_id: data.data.data?.pic_id,
      po_legalitas: data.data.data?.po_legalitas,
      ktp_legalitas: data.data.data?.ktp_legalitas,
      akta_pendirian: data.data.data?.akta_pendirian,
      akta_perubahan_dasar: data.data.data?.akta_perubahan_dasar,
      akta_susunan_direksi: data.data.data?.akta_susunan_direksi,
      surat_domisili: data.data.data?.surat_domisili,
      npwp_legalitas: data.data.data?.npwp_legalitas,
      skt_legalitas: data.data.data?.skt_legalitas,
      nppkp_legalitas: data.data.data?.nppkp_legalitas,
      siup_legalitas: data.data.data?.siup_legalitas,
      ijin_pendirian: data.data.data?.ijin_pendirian,
      ppmd_legalitas: data.data.data?.ppmd_legalitas,
      ijin_usaha: data.data.data?.ijin_usaha,
      tdp_legalitas: data.data.data?.tdp_legalitas,
      surat_kuasa: data.data.data?.surat_kuasa,
      lama_bekerja: data.data.data?.lama_bekerja,
      jenis_kartu_kredit: data.data.data?.jenis_kartu_kredit,
      lama_usaha: data.data.data?.lama_usaha,
      omsetBulanan: data.data.data?.omset_bulanan,
      assetTanah: data.data.data?.asset_tanah,
      assetBangunan: data.data.data?.asset_bangunan,
      assetKendaran: data.data.data?.asset_kendaraan
    });

    await setnamaMitra(data.data.data?.nama_mitra);
    // console.log(data.data.data.jenis);
    setTypeOfPayment(data.data.data?.metode_pembayaran);
    setStatus(data.data.data?.status);
    setTitle(data.data.data?.title);
    setDataDetailMitra(data.data.data?.data);
    setDataKodeMitra(data.data.data?.kode_mitra || "");
    setDataKodeMitraZustand(data.data.data);
    setDataTitle(data.data.data?.title || "");
    setDataNamaMitra(data.data.data?.nama_mitra || "");
    setDataJenis(data.data.data?.jenis || "");
    setDataKodeInisial(data.data.data?.kode || "");
    setDataQRKode(data.data.data?.qrcode);
    setDataJenisUsaha(data.data.data?.jenis_usaha || "");
    setDataKepemilikan(data.data.data?.kepemilikan || "");
    setDataJumlahArmada(data.data.data?.jumlah_armada || "");
    setDataJumlahSDMOperasional(data.data.data?.jumlah_sdm_operasional || "");
    setDataCabang(data.data.data?.cabang || "");
    setDataJenisKiriman(data.data.data?.jenis_kiriman || "");
    setDataWilayah(data.data.data?.wilayah || "");
    setDataTujuan(data.data.data?.tujuan || "");
    setDataTahunAwalKontrak(data.data.data?.tahun_awal_kontrak || "");
    setDataAwalKontrak(data.data.data?.awal_kontrak || "");
    setDataAkhirKontrak(data.data.data?.akhir_kontrak || "");
    setDataKontrak(data.data.data?.kontrak || "");
    setDataDirektur(data.data.data?.direktur || "");
    setDataTahunBerdiri(data.data.data?.tahun_berdiri || "");
    setDataNPWPID(data.data.data?.npwp_id || "");
    setDataNPWPName(data.data.data?.npwp_name || "");
    setDataNPWPAddress(data.data.data?.npwp_address || "");
    setDataNPWPJalan(data.data.data?.npwp_jalan || "");
    setDataBlok(data.data.data?.blok || "");
    setDataNPWPNomor(data.data.data?.npwp_nomor || "");
    setDataNPWPRT(data.data.data?.npwp_rt || "");
    setDataNPWPRW(data.data.data?.npwp_rw || "");
    setDataNPWKelurahan(data.data.data?.npwp_kelurahan || "");
    setDataNPWPKecamatan(data.data.data?.npwp_kecamatan || "");
    setDataNPWPKota(data.data.data?.npwp_kota || "");
    setDataNPWPProvinsi(data.data.data?.npwp_provinsi || "");
    setDataNPWPKodePos(data.data.data?.npwp_kodepos || "");
    setDataISTaxAble(data.data.data?.is_taxable || "");
    setDataTelepon(data.data.data?.telepon || "");
    setDataContactPerson(data.data.data?.contact_person || "");
    setDataTelp(data.data.data?.telp || "");
    setDataFax(data.data.data?.fax || "");
    setDataEmail(data.data.data?.email || "");
    setDataAlamat(data.data.data?.alamat || "");
    setDataHomePage(data.data.data?.homepage || "");
    setDataPembayaran(data.data.data?.pembayaran || "");
    setDataNamaBankk(data.data.data?.nama_bank || "");
    setDataNamaAkunBank(data.data.data?.nama_akun || "");
    setDataNoRek(data.data.data?.no_rek || "");
    setDataCurrency(data.data.data?.currency || "");
    setDataStatusUsaha(data.data.data?.status_usaha || "");
    setDataTop(data.data.data?.top || "");
    setDataMemo(data.data.data?.memo || "");
    setDataType(data.data.data?.type || "");
    setDataBlok(data.data.data?.npwp_blok || "");
    setDataPicId(data.data.data?.pic_id || "");
    setPoLegalitas(data.data.data?.po_legalitas || "");
    setKTPLegalitas(data.data.data?.ktp_legalitas || "");
    setAktaPendirian(data.data.data?.akta_pendirian || "");
    setAktaPerubahanDasar(data.data.data?.akta_perubahan_dasar || "");
    setAktaSusunanDireksi(data.data.data?.akta_susunan_direksi || "");
    setSuratDomisili(data.data.data?.surat_domisili || "");
    setNPWPLegalitas(data.data.data?.npwp_legalitas || "");
    setSktLegalitas(data.data.data?.skt_legalitas || "");
    setNppkpLegalitas(data.data.data?.nppkp_legalitas || "");
    setSiupLegalitas(data.data.data?.siup_legalitas || "");
    setIjinPendirian(data.data.data?.ijin_pendirian || "");
    setPPMDLegalitas(data.data.data?.ppmd_legalitas || "");
    setIjinUsaha(data.data.data?.ijin_usaha || "");
    setTDPLegalitas(data.data.data?.tdp_legalitas || "");
    setSuratKuasaLegalitas(data.data.data?.surat_kuasa || "");
    setLamaBekerjaLegalitas(data.data.data?.lama_bekerja || "");
    setJenisKartuKredit(data.data.data?.jenis_kartu_kredit || "");
    setStatusUsaha(data.data.data?.status_usaha || "");
    setLamaUsaha(data.data.data?.lama_usaha || "");
    setOmsetBulanan(data.data.data?.omset_bulanan || "");
    setAssetTanah(data.data.data?.asset_tanah || "");
    setAssetBangunan(data.data.data?.asset_bangunan || "");
    setAssetKendaran(data.data.data?.asset_kendaraan || "");

    form.setFieldsValue({
      id_mitra: mitraId,
      jenis: data.data.data?.jenis,
      kode_mitra: data.data.data?.kode_mitra,
      nama_mitra: data.data.data?.nama_mitra,
      kode: data.data.data?.kode,
      kode_mitra: data.data.data?.kode_mitra,
      // kode: data.data.data?.kode,
      qrcode: data.data.data?.qrcode,
      title: data.data.data?.title,
      jenis_usaha: data.data.data?.jenis_usaha,
      kepemilikan: data.data.data?.kepemilikan,
      jumlah_armada: data.data.data?.jumlah_armada,
      jumlah_sdm_operasional: data.data.data?.jumlah_sdm_operasional,
      cabang: data.data.data?.cabang,
      jenis_kiriman: data.data.data?.jenis_kiriman,
      wilayah: data.data.data?.wilayah,
      tujuan: data.data.data?.tujuan,
      tahun_awal_kontrak: data.data.data?.tahun_awal_kontrak,
      awal_kontrak: data.data.data?.awal_kontrak,
      akhir_kontrak: data.data.data?.akhir_kontrak,
      kontrak: data.data.data?.kontrak,
      direktur: data.data.data?.direktur,
      tahun_berdiri: data.data.data?.tahun_berdiri,
      npwp_id: data.data.data?.npwp_id,
      npwp_name: data.data.data?.npwp_name,
      npwp_address: data.data.data?.npwp_address,
      npwp_jalan: data.data.data?.npwp_jalan,
      npwp_blok: data.data.data?.npwp_blok,
      npwp_nomor: data.data.data?.npwp_nomor,
      npwp_rt: data.data.data?.npwp_rt,
      npwp_rw: data.data.data?.npwp_rw,
      npwp_kelurahan: data.data.data?.npwp_kelurahan,
      npwp_kecamatan: data.data.data?.npwp_kecamatan,
      npwp_kota: data.data.data?.npwp_kota,
      npwp_provinsi: data.data.data?.npwp_provinsi,
      npwp_kodepos: data.data.data?.npwp_kodepos,
      is_taxable: data.data.data?.is_taxable,
      telepon: data.data.data?.telepon,
      contact_person: data.data.data?.contact_person,
      telp: data.data.data?.telp,
      fax: data.data.data?.fax,
      email: data.data.data?.email,
      alamat: data.data.data?.alamat,
      homepage: data.data.data?.homepage,
      pembayaran: data.data.data?.pembayaran,
      nama_bank: data.data.data?.nama_bank,
      nama_akun: data.data.data?.nama_akun,
      no_rek: data.data.data?.no_rek,
      currency: data.data.data?.currency,
      po_legalitas: data.data.data?.po_legalitas,
      ktp_legalitas: data.data.data?.ktp_legalitas,
      akta_pendirian: data.data.data?.akta_pendirian,
      akta_perubahan_dasar: data.data.data?.akta_perubahan_dasar,
      akta_susunan_direksi: data.data.data?.akta_susunan_direksi,
      surat_domisili: data.data.data?.surat_domisili,
      npwp_legalitas: data.data.data?.npwp_legalitas,
      skt_legalitas: data.data.data?.skt_legalitas,
      nppkp_legalitas: data.data.data?.nppkp_legalitas,
      siup_legalitas: data.data.data?.siup_legalitas,
      ijin_pendirian: data.data.data?.ijin_pendirian,
      ppmd_legalitas: data.data.data?.ppmd_legalitas,
      ijin_usaha: data.data.data?.ijin_usaha,
      tdp_legalitas: data.data.data?.tdp_legalitas,
      surat_kuasa: data.data.data?.surat_kuasa,
      lama_bekerja: data.data.data?.lama_bekerja,
      jenis_kartu_kredit: data.data.data?.jenis_kartu_kredit,
      bank_penerbit: data.data.data?.bank_penerbit,
      laporan_keuangan: data.data.data?.laporan_keuangan,
      status_usaha: data.data.data?.status_usaha,
      lama_usaha: data.data.data?.lama_usaha,
      omset_bulanan: data.data.data?.omset_bulanan,
      asset_tanah: data.data.data?.asset_tanah,
      asset_bangunan: data.data.data?.asset_bangunan,
      asset_kendaraan: data.data.data?.asset_kendaraan,
      asset_mesin: data.data.data?.asset_mesin,
      affiliasi: data.data.data?.affiliasi,
      jumlah_unit: data.data.data?.jumlah_unit,
      periode_sewa: data.data.data?.periode_sewa,
      nilai_sewa: data.data.data?.nilai_sewa,
      nilai_ruu: data.data.data?.nilai_ruu,
      top: data.data.data?.top,
      metode_pembayaran: data.data.data?.metode_pembayaran,
      qty_motor: data.data.data?.qty_motor,
      rp_motor: data.data.data?.rp_motor,
      qty_grandmax: data.data.data?.qty_grandmax,
      rp_grandmax: data.data.data?.rp_grandmax,
      qty_l300: data.data.data?.qty_l300,
      rp_l300: data.data.data?.rp_l300,
      qty_traga: data.data.data?.qty_traga,
      rp_traga: data.data.data?.rp_traga,
      qty_cde: data.data.data?.qty_cde,
      rp_cde: data.data.data?.rp_cde,
      qty_cdd: data.data.data?.qty_cdd,
      rp_cdd: data.data.data?.rp_cdd,
      qty_fuso: data.data.data?.qty_fuso,
      rp_fuso: data.data.data?.rp_fuso,
      qty_wingbox: data.data.data?.qty_wingbox,
      rp_wingbox: data.data.data?.rp_wingbox,
      qty_trailer20: data.data.data?.qty_trailer20,
      rp_trailer20: data.data.data?.rp_trailer20,
      qty_trailer40: data.data.data?.qty_trailer40,
      rp_trailer40: data.data.data?.rp_trailer40,
      pic_id: data.data.data?.pic_id,
      type: data.data.data?.type,
      memo: data.data.data?.memo,
    });
  };


  const EditMitra = () => {
    setActiveTab('profile');
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
  }
  const EditMitras = async () => {
    try {
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
      const response = await axios.post(`${Baseurl}mitra/edit-mitra`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      // If you want to update the state with the edited data, you can do so here.
      // For example:
      setDataDetailMitra(response.data); // Assuming the response contains the updated data

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
  useEffect(() => {
    DetailMitra();
    OptionsData();
    setDataKodeMitraZustand();
    OptionsDataSelectMitra();
  }, []);

  const OptionsData = async () => {
    const data = await axios.get(
      `${Baseurl}mitra/get-select-mitraPic`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    // console.log(data.data, "ini data options");
    setTitleSelect(data.data.jabatan);
  };

  const OptionsDataSelectMitra = async () => {
    const respons = await axios.get(
      `${Baseurl}mitra/get-select-mitra`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    console.log(respons.data, "ini data options");
    setselectMitraPIC(respons.data);
  };

  return (
    <>

      <Card>

        <h3 style={{ color: "#113D7F" }}>Detail Master Mitra</h3>
      </Card>
      <Card>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          // style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          layout="vertical"
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row>
            <Col span={8} style={{ width: "100%" }}>
              <h5>NAMA DAN ALAMAT PERUSAHAAN(Sold to Party)</h5>
            </Col>
            <Col span={4} className="d-flex justify-content-end">
              <Button onClick={() => handleView()} type="primary">
                <span style={{ display: "flex", alignItems: "center" }}>
                  <PrinterOutlined />
                </span>
              </Button>
              {/* <Button>Print Data</Button> */}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col sm={2} style={{ padding: "0px" }}>
              <Form.Item
                label="Kode Mitra :"
                style={{ fontWeight: "bold" }}
                name="kode_mitra"
              >
                <Input
                  className="mt-2"
                  disabled
                  value={DataKodeMitra}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataKodeMitra(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={2} style={{ padding: "0px" }}>
              <Form.Item
                label="Title :"
                style={{ fontWeight: "bold" }}
                name="title"
              // rules={[
              //   { required: false, message: "Please input your jenis!" },
              // ]}
              >
                <Select
                  className="mt-2"
                  value={DataTitle}
                  onChange={(e) => {
                    console.log(e);
                    setDataTitle(e);
                  }}
                >
                  <option value={"CV"}>CV</option>
                  <option value={"PT"}>PT</option>
                </Select>
                {/* <Select
                  className="mt-2"
                  value={DataTitle}
                  onChange={(e) => {
                    console.log(e);
                    setDataTitle(e);
                  }}
                >
                  {TitleSelect &&
                    TitleSelect.map((i) => (
                      <option value={i.jabatan}>{i.jabatan}</option>
                    ))}
                </Select> */}
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Mitra Name :"
                style={{ fontWeight: "bold" }}
                name="nama_mitra"
              // rules={[
              //   { required: false, message: "Please input your nama mitra!" },
              // ]}
              >
                <Input
                  className="mt-2"
                  value={DataNamaMitra}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataNamaMitra(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Kode Perusahaan (Singkatan Mitra Name)"
                style={{ fontWeight: "bold" }}
                name="kode"
              // rules={[
              //   {
              //     required: false,
              //     message: "Please input your Kode Perusahaan!",
              //   },
              // ]}
              >
                <Input
                  className="mt-2"
                  value={DataKodeInisial}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataKodeInisial(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Jenis Usaha :"
                style={{ fontWeight: "bold" }}
                name="jenis_usaha"
                rules={[
                  { required: false, message: "Please input your jenis!" },
                ]}
              >
                <Input
                  className="mt-2"
                  value={DataJenisUsaha}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataJenisUsaha(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Jenis Kepemilikan :"
                style={{ fontWeight: "bold" }}
                name="kepemilikan"
                rules={[
                  { required: false, message: "Please input your jenis!" },
                ]}
              >
                <Select
                  className="mt-2"
                  value={DataKepemilikan}
                  onChange={(e) => {
                    console.log(e);
                    setDataKepemilikan(e);
                  }}
                >
                  <option value="SWASTA">SWASTA</option>
                  <option value="NASIONAL">NASIONAL</option>
                </Select>
                {/* <Input
                  className="mt-2"
                  value={DataKepemilikan}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataKepemilikan(e.target.value);
                  }}
                /> */}
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Home Page (Website) :"
                style={{ fontWeight: "bold" }}
                name="homepage"
                rules={[
                  { required: false, message: "Please input your jenis!" },
                ]}
              >
                <Input
                  className="mt-2"
                  value={DataHomePage}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataHomePage(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            {/* <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="PIC Purchasing :"
                style={{ fontWeight: "bold" }}
                name="-"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input  className="mt-2"
                  value={DataPICPurchasing}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataPICPurchasing(e.target.value);
                  }}/>
              </Form.Item>
            </Col> */}
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="PIC Purchasing :"
                style={{ fontWeight: "bold" }}
                name="pic_id"
                rules={[
                  { required: false, message: "Please input your jenis!" },
                ]}
              >
                <Select
                  showSearch
                  className="mt-2"
                  // placeholder={DetailDataTarif.kendaraanJenis}
                  value={DataPicId}
                  optionFilterProp="value"
                  style={{ width: "90%" }}
                  onChange={(e, options) => {
                    console.log(options.key);
                    setDataPic(options);
                    setDataPicId(options.key);
                  }}
                >
                  {selectMitraPIC &&
                    selectMitraPIC.marketing.map((i) => (
                      <Select.Option key={i.id} value={i.fullname}>
                        {i.fullname}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={12} style={{ padding: "0px" }}>
              <Form.Item
                label="Alamat :"
                style={{ fontWeight: "bold" }}
                name="alamat"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input.TextArea
                  className="mt-2"
                  value={DataAlamat}
                  style={{ height: "100px" }}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataAlamat(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Direktur :"
                style={{ fontWeight: "bold" }}
                name="direktur"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input
                  className="mt-2"
                  value={DataDirektur}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataDirektur(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Jumlah Armada :"
                style={{ fontWeight: "bold" }}
                name="jumlah_armada"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input
                  className="mt-2"
                  value={DataJumlahArmada}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataJumlahArmada(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Jumlah SDM Operasional :"
                style={{ fontWeight: "bold" }}
                name="jumlah_sdm_operasional"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input
                  className="mt-2"
                  value={DataJumlahSDMOperasional}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataJumlahSDMOperasional(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Cabang :"
                style={{ fontWeight: "bold" }}
                name="cabang"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input
                  className="mt-2"
                  value={DataCabang}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataCabang(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Jenis Kiriman :"
                style={{ fontWeight: "bold" }}
                name="jenis_kiriman"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Select
                  className="mt-2"
                  value={DataJenisKiriman}
                  onChange={(e) => {
                    console.log(e);
                    setDataJenisKiriman(e);
                  }}
                >
                  <option value="RETAIL">RETAIL</option>
                  <option value="CHARTER">CHARTER</option>
                </Select>
                {/* <Input
                  className="mt-2"
                  value={DataJenisKiriman}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataJenisKiriman(e.target.value);
                  }}
                /> */}
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Jenis Mitra :"
                style={{ fontWeight: "bold" }}
                name="jenis"
              >
                <Select
                  className="mt-2"
                  value={DataJenis}
                  onChange={(e) => {
                    console.log(e);
                    setDataJenis(e);
                  }}
                >
                  <option value="Vendor Darat">Vendor Darat</option>
                  <option value="Vendor Laut">Vendor Laut</option>
                  <option value="Vendor Udara">Vendor Udara</option>
                </Select>
                {/* <Input
                  className="mt-2"
                  value={DataJenis}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataJenis(e.target.value);
                  }}
                /> */}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Wilayah :"
                style={{ fontWeight: "bold" }}
                name="wilayah"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input
                  className="mt-2"
                  value={DataWilayah}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataWilayah(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Tujuan :"
                style={{ fontWeight: "bold" }}
                name="tujuan"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input
                  className="mt-2"
                  value={DataTujuan}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataTujuan(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Tahun Berdiri :"
                style={{ fontWeight: "bold" }}
                name="tahun_berdiri"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input
                  className="mt-2"
                  value={DataTahunBerdiri}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataTahunBerdiri(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Kontrak Awal :"
                style={{ fontWeight: "bold" }}
                name="awal_kontrak"
              >
                <Input.Group compact>
                  <DatePicker
                    className="mt-2"
                    name="awal_kontrak"
                    style={{ width: "100%" }}
                    value={moment(DataAwalKontrak)} // Gunakan moment untuk mengonversi nilai tanggal
                    onChange={(date) => {
                      console.log(date);
                      setDataAwalKontrak(date); // Simpan tanggal yang dipilih dalam state
                    }}
                  />
                </Input.Group>
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Akhir Kontrak :"
                style={{ fontWeight: "bold" }}
                name="akhir_kontrak"
              >
                <Input.Group compact>
                  <DatePicker
                    className="mt-2"
                    name="akhir_kontrak"
                    style={{ width: "100%" }}
                    value={moment(DataAkhirKontrak)} // Gunakan moment untuk mengonversi nilai tanggal
                    onChange={(date) => {
                      console.log(date);
                      setDataAkhirKontrak(date); // Simpan tanggal yang dipilih dalam state
                    }}
                  />
                </Input.Group>
                {/* <br /> */}
                {/* <Checkbox>Berlaku perpanjang otomatis</Checkbox> */}
              </Form.Item>
            </Col>
            {/* <Col sm={4}>
              <Form.Item
                label="Kontrak Akhir :"
                style={{ fontWeight: "bold" }}
                name="akhir_kontrak"
              >
                <Input.Group compact>
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="akhir_kontrak"
                  />
                </Input.Group>
                <br />
                <Checkbox>Berlaku perpanjang otomatis</Checkbox>
              </Form.Item>
            </Col> */}
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Tahun Register :"
                style={{ fontWeight: "bold" }}
                name="tahun_awal_kontrak"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input
                  className="mt-2"
                  value={DataTahunBerdiri}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataTahunBerdiri(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={6} style={{ padding: "0px" }}>
              <Form.Item
                label="Telp. Kantor :"
                style={{ fontWeight: "bold" }}
                name="telp"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input
                  className="mt-2"
                  value={DataTelp}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataTelp(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={6} style={{ padding: "0px" }}>
              <Form.Item
                label="Fax. Kantor :"
                style={{ fontWeight: "bold" }}
                name="fax"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input
                  className="mt-2"
                  value={DataFax}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataFax(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={12} style={{ padding: "0px" }}>
              <Form.Item
                label="Memo :"
                name="memo"
                style={{ fontWeight: "bold", height: "138px" }}
              >
                <Input.TextArea
                  className="mt-2"
                  style={{ height: "100px" }}
                  value={DataMemo}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataMemo(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <hr></hr>
          <br />
          <br />
          <hr></hr>
          <h5 style={{ color: "#113D7F" }}>
            DATA PERPAJAKAN (Tax Information)
          </h5>
          <Row className="mt-5">
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="No. NPWP :"
                style={{ fontWeight: "bold" }}
                name="npwp_id"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input
                  className="mt-2"
                  type="text"
                  value={DataNPWPID}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataNPWPID(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Status Usaha :"
                style={{ fontWeight: "bold" }}
                name="status_usaha"
              // rules={[
              //   { required: false, message: "Please input your alamat!" },
              // ]}
              >
                <Select
                  className="mt-2"
                  value={DataStatusUsaha}
                  onChange={(e) => {
                    console.log(e);
                    setDataStatusUsaha(e);
                  }}
                >
                  <option value="PKP">PKP</option>
                  <option value="NON PKP">NON PKP</option>
                </Select>
                {/* <Input
                  className="mt-2"
                  value={DataStatusUsaha}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataStatusUsaha(e.target.value);
                  }}
                /> */}
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Nama NPWP :"
                style={{ fontWeight: "bold" }}
                name="npwp_name"
                rules={[
                  { required: false, message: "Please input your alamat!" },
                ]}
              >
                <Input
                  className="mt-2"
                  value={DataNPWPName}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataNPWPName(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col sm={2} style={{ padding: "0px", width: "20%" }}>
              <Form.Item
                label="Jalan NPWP:"
                style={{ fontWeight: "bold" }}
                name="npwp_jalan"
              >
                <Input
                  className="mt-2"
                  value={DataNPWPJalan}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataNPWPJalan(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={2} style={{ width: "20%", padding: "0px" }}>
              <Form.Item
                label="Kota :"
                style={{ fontWeight: "bold" }}
                name="npwp_kota"
              >
                <Input
                  className="mt-2"
                  value={DataNPWPKota}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataNPWPKota(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>

            <Col sm={2} style={{ width: "20%", padding: "0px" }}>
              <Form.Item
                label="Kecamatan :"
                style={{ fontWeight: "bold" }}
                name="npwp_kecamatan"
              >
                <Input
                  className="mt-2"
                  value={DataNPWPKecamatan}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataNPWPKecamatan(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={2} style={{ width: "20%", padding: "0px" }}>
              <Form.Item
                label="Kelurahan :"
                style={{ fontWeight: "bold" }}
                name="npwp_kelurahan"
              >
                <Input
                  className="mt-2"
                  value={DataNPWKelurahan}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataNPWKelurahan(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={2} style={{ width: "20%", padding: "0px" }}>
              <Form.Item
                label="Provinsi :"
                style={{ fontWeight: "bold" }}
                name="npwp_provinsi"
              >
                <Input
                  className="mt-2"
                  value={DataNPWPProvinsi}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataNPWPProvinsi(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col sm={2} style={{ width: "20%", padding: "0px" }}>
              <Form.Item
                label="Blok :"
                style={{ fontWeight: "bold" }}
                name="npwp_blok"
              >
                <Input
                  className="mt-2"
                  value={DataBlok}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataBlok(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={2} style={{ width: "20%", padding: "0px" }}>
              <Form.Item
                label="Nomor :"
                style={{ fontWeight: "bold" }}
                name="npwp_nomor"
              >
                <Input
                  type="number"
                  className="mt-2"
                  value={DataNPWPNomor}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataNPWPNomor(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={2} style={{ width: "20%", padding: "0px" }}>
              <Form.Item
                label="RT :"
                style={{ fontWeight: "bold" }}
                name="npwp_rt"
              >
                <Input
                  type="number"
                  className="mt-2"
                  value={DataNPWPRT}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataNPWPRT(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={2} style={{ width: "20%", padding: "0px" }}>
              <Form.Item
                label="RW :"
                style={{ fontWeight: "bold" }}
                name="npwp_rw"
              >
                <Input
                  type="number"
                  className="mt-2"
                  value={DataNPWPRW}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataNPWPRW(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>

            <Col sm={4} style={{ padding: "0px", width: "20%" }}>
              <Form.Item
                label="Kode Pos :"
                style={{ fontWeight: "bold" }}
                name="npwp_kodepos"
              >
                <Input
                  type="number"
                  className="mt-2"
                  value={DataNPWPKodePos}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataNPWPKodePos(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col sm={12} style={{ padding: "0px" }}>
              <Form.Item
                label="Alamat NPWP:"
                style={{ fontWeight: "bold" }}
                name="npwp_address"
              >
                <Input.TextArea
                  className="mt-2"
                  value={DataNPWPAddress}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataNPWPAddress(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <hr />
          <br />
          <h5 style={{ color: "#113D7F" }}>
            DATA ACCOUNTING (Accounting Information)
          </h5>
          <Row className="mt-4">
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Bank :"
                style={{ fontWeight: "bold" }}
                name="nama_bank"
              >
                <Select
                  className="mt-2"
                  style={{ width: "100%" }}
                  // name="nama_bank"
                  // value={formik.values.nama_bank}
                  // onChange={(e) => formik.setFieldValue("nama_bank", e)}
                  showSearch
                  optionFilterProp="children"
                  value={DataNamaBankk}
                  onChange={(e) => {
                    console.log(e);
                    setDataNamaBankk(e);
                  }}
                >
                  {banks &&
                    banks.map((i) => <select value={i.name}>{i.name}</select>)}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Account Name :"
                style={{ fontWeight: "bold" }}
                name="nama_akun"
              >
                <Input
                  className="mt-2"
                  value={DataNamaAkunBank}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataNamaAkunBank(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Account Number :"
                style={{ fontWeight: "bold" }}
                name="no_rek"
              >
                <Input
                  className="mt-2"
                  value={DataNoRek}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataNoRek(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <hr />
          <br />
          <Row className="mt-4">
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Currency :"
                style={{ fontWeight: "bold" }}
                name="currency"
              >
                <Input
                  className="mt-2"
                  value={DataCurrency}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataCurrency(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Term of payment (Hari) :"
                style={{ fontWeight: "bold" }}
              // name="-"
              >
                <Select
                  className="mt-2"
                  value={DataPembayaran}
                  onChange={(e) => {
                    console.log(e);
                    setDataPembayaran(e);
                  }}
                >
                  <option value={7}>7</option>
                  <option value={14}>14</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={60}>60</option>
                </Select>
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Type Of Payment :"
                style={{ fontWeight: "bold" }}
                name="metode_pembayaran"
              >
                {/* <Input /> */}
                <Select
                  className="mt-2"
                  value={TypeOfPayment}
                  onChange={(e) => {
                    console.log(e);
                    setTypeOfPayment(e);
                  }}
                >
                  <option value={"TUNAI MUKA"}>TUNAI MUKA</option>
                  <option value={"TUNAI"}>TUNAI</option>
                  <option value={"CHECK"}>CHECK</option>
                  <option value={"TRANSFER"}>TRANSFER</option>
                  <option value={"CREDIT CARD"}>CREDIT CARD</option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Contact Person :"
                style={{ fontWeight: "bold" }}
                name="contact_person"
              >
                <Input
                  className="mt-2"
                  value={DataContactPerson}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataContactPerson(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Email :"
                style={{ fontWeight: "bold" }}
                name="email"
              >
                <Input
                  className="mt-2"
                  value={DataEmail}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataEmail(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Telp :"
                style={{ fontWeight: "bold" }}
                name="telp"
              >
                <Input
                  className="mt-2"
                  value={DataTelp}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDataEmail(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={4} style={{ padding: "0px" }}>
              <Form.Item
                label="Status :"
                style={{ fontWeight: "bold" }}
              // name="-"
              >
                <Select
                  className="mt-2"
                  value={DataType}
                  onChange={(e) => {
                    console.log(e);
                    setDataType(e);
                  }}
                >
                  <option value={"elogs"}>ELOGS</option>
                  <option value={"race"}>RACE</option>
                  <option value={"masdis"}>MASDIS</option>
                  <option value={"katarasa"}>KATARASA</option>
                  <option value={"jaja"}>JAJA</option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <br />
          <hr />
          <Form.Item wrapperCol={{ offset: 8, span: 24 }}>
            <Row>
              <Col sm={24} className="d-flex justify-content-end">
                <Button onClick={EditMitra} type="primary" htmlType="submit">
                  Data Referensi
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
      {/* <PIC namaMitra={namaMitra}/> */}

    </>
  );
}

export default DataBaru;
