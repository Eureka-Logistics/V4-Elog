import { Button, Card, Col, Input, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../../Api/BaseUrl";
import Swal from "sweetalert2";
import useBanksStore from "../../../../zustand/Store/NamaNamaBank";
import moment from "moment";


function NewDataMasterMitra() {
  const { banks } = useBanksStore();
  const [IDTambahData, setIDTambahData] = useState("");
  const [DataKode, setDataKode] = useState("");
  const [DataTitle, setDataTitle] = useState("");
  const [DataNamaMitra, setDataNamaMitra] = useState("");
  const [DataJenis, setDataJenis] = useState("");
  const [DataJenisUsaha, setDataJenisUsaha] = useState("");
  const [DataKepemilikan, setDataKepemilikan] = useState("");
  const [DataJumlahArmada, setDataJumlahArmada] = useState("");
  const [DataJumlahSDMOperasional, setDataJumlahSDMOperasional] = useState("");
  const [DataCabang, setDataCabang] = useState("");
  const [DataJenisKiriman, setDataJenisKiriman] = useState("");
  const [DataWilayah, setDataWilayah] = useState("");
  const [DataTujuan, setDataTujuan] = useState("");
  const [DataAwalKontrak, setDataAwalKontrak] = useState("");
  const [DataAkhirKontrak, setDataAkhirKontrak] = useState(""); 
  const [DataDirektur, setDataDirektur] = useState("");
  const [DataTahunBerdiri, setDataTahunBerdiri] = useState("");
  const [DataNPWPID, setDataNPWPID] = useState("");
  const [DataNPWPName, setDataNPWPName] = useState("");
  const [DataNPWPAddress, setDataNPWPAddress] = useState("");
  const [DataNPWPJalan, setDataNPWPJalan] = useState("");
  const [DataNPWPBlok, setDataNPWPBlok] = useState("");
  const [DataNPWPNomor, setDataNPWNomor] = useState("");
  const [DataNPWPRT, setDataNPWPRT] = useState("");
  const [DataNPWPRW, setDataNPWPRW] = useState("");
  const [DataKelurahan, setDataKelurahan] = useState("");
  const [DataKecamatan, setDataKecamatan] = useState("");
  const [DataNPWPKota, setDataNPWPKota] = useState("");
  const [DataNPWPProvinsi, setDataNPWPProvinsi] = useState("");
  const [DataNPWPKodePos, setDataNPWPKodePos] = useState("");
  const [DataIsTaxable, setDataIsTaxable] = useState("");
  const [DataTelepon, setDataTelepon] = useState("");
  const [DataContactPerson, setDataContactPerson] = useState("");
  const [DataTelp, setDataTelp] = useState("");
  const [DataFax, setDataFax] = useState("");
  const [DataEmail, setDataEmail] = useState("");
  const [DataAlamat, setDataAlamat] = useState("");
  const [DataHomePage, setDataHomePage] = useState(""); 
  const [DataPembayaran, setDataPembayaran] = useState("");
  const [DataNamaBank, setDataNamaBank] = useState("");
  const [DataNomorRek, setDataNomorRek] = useState("");
  const [DataStatusUsaha, setDataStatusUsaha] = useState("");
  const [DataMetodePembayaran, setDataMetodePembayaran] = useState("");
  const [DataType, setDataType] = useState("");
  const [DataMemo, setDataMemo] = useState("");
  const [DataOptions, setDataOptions] = useState("");


  const TambahData = async () => {
    try {
      const respons = await axios.post(
        `${Baseurl}mitra/create-mitra`,
        {
          kode: DataKode,
          title: "",
          nama_mitra: "",
          jenis: "",
          jenis_usaha: "",
          kepemilikan: "",
          jumlah_armada: "",
          jumlah_sdm_operasional: "",
          cabang: "",
          jenis_kiriman: "",
          wilayah: "",
          tujuan: "",
          awal_kontrak: "",
          akhir_kontrak: "",
          direktur: "",
          tahun_berdiri: "",
          npwp_id: "",
          npwp_name: "",
          npwp_address: "",
          npwp_jalan: "",
          npwp_blok: "",
          npwp_nomor: "",
          npwp_rt: "",
          npwp_rw: "",
          npwp_kelurahan: "",
          npwp_kecamatan: "",
          npwp_kota: "",
          npwp_provinsi: "",
          npwp_kodepos: "",
          is_taxable: "",
          telepon: "",
          contact_person: "",
          telp: "",
          fax: "",
          email: "",
          alamat: "",
          homepage: "",
          pembayaran: "",
          nama_bank: "",
          nama_akun: "",
          no_rek: "",
          status_usaha: "",
          metode_pembayaran: "",
          type: "",
          memo: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log("response", respons.data);
      setIDTambahData(respons.data);

      // Show SweetAlert2 success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data has been added successfully!",
      }).then(() => {
        // Reload the window after the success message is closed
        // window.location.reload();
      });
    } catch (error) {
      // Handle error if needed
    }
  };

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
    console.log(data.data, "ini data options");
    setDataOptions(data.data);
  };

  useEffect(() => {
    OptionsData();
  }, []);

  return (
    <div>
      <h5>NAMA DAN ALAMAT PERUSAHAAN(Sold to Party )</h5>
      <Card>
        <Row>
          <Col span={6}>
          <label style={{ fontWeight: "bold" }}>Kode Mitra</label>
            <Input
              className="mt-2 mb-2"
              name="kode"
              placeholder="Exp: EM00298"
              onChange={(e) => {
                console.log(e.target.value);
                setDataKode(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
        <Col span={24} className="d-flex justify-content-end">
          <Button
            style={{
              backgroundColor: "#1A5CBF",
              color: "	white",
              borderColor: "#AFEEEE",
            }}
            onClick={TambahData}
          >
            Submit
          </Button>
        </Col>
      </Row>
      </Card>
    </div>
  );
}

export default NewDataMasterMitra;
