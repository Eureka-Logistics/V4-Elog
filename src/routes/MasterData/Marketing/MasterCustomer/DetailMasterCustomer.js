import React, { useState, useEffect } from "react";
import { Button, Card, Col, Input, Row, Select } from "antd";
import axios from "axios";
import Baseurl from "../../../../Api/BaseUrl";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { async } from "q";

const { Option } = Select;

function DetailMasterCustomer() {
  const { id_customer } = useParams();
  const [NamaPerusahaan, setDataNamaPerusahaan] = useState("");
  const [DetailDataMasterCustomer, setDataDetailDataMasterCustomer] =
    useState("");
  const [toPValue, setToPValue] = useState("");
  const [JenisUsahaan, setDataJenisUsahaan] = useState(null);
  const [AlamatCustomer, setDataAlamatCustomer] = useState("");
  const [CompanyAnniversaryy, setDataCompanyAnniversaryy] = useState("");
  const [JenisBarangPerusahaan, setDataJenisBarangPerusahaan] = useState("");
  const [TeleponKantor, setDataTeleponKantor] = useState("");
  const [FaxPerusahaan, setDataFaxPerusahaan] = useState("");
  const [PicOffice, setDataPicOffice] = useState("");
  const [PicPositions, setDataPicPositions] = useState("");
  const [PicEmail, setDataPicEmail] = useState("");
  const [PicPhone, setDataPicPhone] = useState("");
  const [PicBirth, setDataPicBirth] = useState("");
  const [PicFax, setDataPicFax] = useState("");
  const [NomorNPWP, setDataNomorNPWP] = useState("");
  const [AlamatNPWP, setDataAlamatNPWP] = useState("");
  const [NomorKTP, setDataNomorKTP] = useState("");
  const [NomorTDP, setDataNomorTDP] = useState("");
  const [NomorPKP, setDataNomorPKP] = useState("");
  const [TaxPIC, setDataNomorTaxPIC] = useState("");
  const [TaxPosition, setDataNomorTaxPosition] = useState("");
  const [TaxEmail, setDataTaxEmail] = useState("");
  const [TaxPhoneOffice, setDataTaxPhoneOffice] = useState("");
  const [TaxMobile, setDataTaxMobile] = useState("");
  const [NamaBank, setDataNamaBank] = useState("");
  const [NamaAkunBank, setDataNamaAkunBank] = useState("");
  const [NoRek, setDataNoRek] = useState("");
  const [ToPTimeToOptiion, setDataToPTimeToOptiion] = useState("");
  const [JenisPembayaran, setDataJenisPembayaran] = useState("");
  const [BankUntukPIC, setDataBankUntukPIC] = useState("");
  const [BankPositions, setDataBankPositions] = useState("");
  const [BankEmail, setDataBankEmail] = useState("");
  const [BankPhoneOffice, setDataBankPhoneOffice] = useState("");
  const [BankMobilee, setDataBankMobilee] = useState("");
  const [InvoiceUntukPIC, setDataInvoiceUntukPIC] = useState("");
  const [InvoicePositions, setDataInvoicePositions] = useState("");
  const [InvoiceEmail, setDataInvoiceEmail] = useState("");
  const [InvoiceMobile, setDataInvoiceMobile] = useState("");
  const [InvoicePhoneOffice, setDataInvoicePhoneOffice] = useState(DetailDataMasterCustomer?.invoice_phone_office);
  const [CodeCustomer, setDataKodeCustomer] = useState("");
  const [Loading , setLoading ]= useState(false)

  const DetailMasterCustomers = async (id_customer) => {
    setLoading(true)
    try {
      const respons = await axios.get(
        `${Baseurl}customer/get-detail-customer?id_customer=${id_customer}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log("response", respons.data.data);
      setDataDetailDataMasterCustomer(respons.data.data);
      setDataNamaPerusahaan(respons.data.data?.nama_perusahaan || "");
      setDataJenisUsahaan(respons.data.data?.jenis_usaha || "");
      setDataAlamatCustomer(respons.data.data?.alamat_kantor || "");
      setDataCompanyAnniversaryy(respons.data.data?.tahun_berdiri || "");
      setDataJenisBarangPerusahaan(respons.data.data?.jenis_barang || "");
      setDataTeleponKantor(respons.data.data?.telepon || "");
      setDataFaxPerusahaan(respons.data.data?.fax || "");
      setDataPicOffice(respons.data.data?.pic_office || "");
      setDataPicPositions(respons.data.data?.pic_position || "");
      setDataPicEmail(respons.data.data?.pic_email || "");
      setDataPicPhone(respons.data.data?.pic_phone || "");
      setDataPicBirth(respons.data.data?.pic_birth || "");
      setDataPicFax(respons.data.data?.pic_fax || "");
      setDataNomorNPWP(respons.data.data?.npwp || "");
      setDataAlamatNPWP(respons.data.data?.alamat_npwp || "");
      setDataNomorKTP(respons.data.data?.ktp || "");
      setDataNomorTDP(respons.data.data?.tdp || "");
      setDataNomorPKP(respons.data.data?.ptp || "");
      setDataNomorTaxPIC(respons.data.data?.tax_pic || "");
      setDataNomorTaxPosition(respons.data.data?.tax_position || "");
      setDataTaxEmail(respons.data.data?.tax_email || "");
      setDataTaxPhoneOffice(respons.data.data?.tax_phone_office || "");
      setDataTaxMobile(respons.data.data?.tax_mobile || "");
      setDataNamaBank(respons.data.data?.nama_bank || "");
      setDataNamaAkunBank(respons.data.data?.nama_akun || "");
      setDataNoRek(respons.data.data?.no_rek || "");
      setDataToPTimeToOptiion(respons.data.data?.top || "");
      setDataJenisPembayaran(respons.data.data?.jenis_pembayaran || "");
      setDataBankUntukPIC(respons.data.data?.bank_untuk_pic || "");
      setDataBankPositions(respons.data.data?.bank_positions || "");
      setDataBankEmail(respons.data.data?.bank_email || "");
      setDataBankPhoneOffice(respons.data.data?.bank_phone_office || "");
      setDataBankMobilee(respons.data.data?.bank_mobile || "");
      setDataInvoiceUntukPIC(respons.data.data?.invoice_pic || "");
      setDataInvoicePositions(respons.data.data?.invoice_position || "");
      setDataInvoiceEmail(respons.data.data?.invoice_email || "");
      setDataInvoiceMobile(respons.data.data?.invoice_mobile || "");
      setDataInvoicePhoneOffice(respons.data.data?.invoice_phone_office || "");
      setDataKodeCustomer(respons.data.data?.kode_customer || "");
      setToPValue(respons.data.data?.top || "");

      //   console.log("responssssscarismid", respons.data.data);

      //   setDataTambah(respons.data);
      //   setSJList(respons.data?.data?.sj);
      setLoading(false)
    } catch (error) {}
  };

  const EditMasterCustomer = async () => {
    try {
      const data = {
        kode_customer: CodeCustomer,
        id_customer: id_customer,
        nama_perusahaan: NamaPerusahaan,
        jenis_usaha: JenisUsahaan,
        alamat_npwp: AlamatNPWP,
        alamat_kantor: AlamatCustomer,
        tgl_berdiri: CompanyAnniversaryy,
        jenis_barang: JenisBarangPerusahaan,
        telepon: TeleponKantor,
        fax: FaxPerusahaan,
        pic_office: PicOffice,
        pic_position: PicPositions,
        pic_email: PicEmail,
        pic_phone: PicPhone,
        pic_birth: PicBirth,
        pic_fax: PicFax,
        npwp: NomorNPWP,
        ktp: NomorKTP,
        tdp: NomorTDP,
        pkp: NomorPKP,
        tax_pic: TaxPIC,
        tax_position: TaxPosition,
        tax_email: TaxEmail,
        tax_phone_office: TaxPhoneOffice,
        tax_mobile: TaxMobile,
        nama_bank: NamaBank,
        nama_akun: NamaAkunBank,
        no_rek: NoRek,
        jenis_pembayaran: JenisPembayaran,
        top: toPValue,
        bank_pic: BankUntukPIC,
        bank_position: BankPositions,
        bank_email: BankEmail,
        bank_phone_office: BankPhoneOffice,
        bank_mobile: BankMobilee,
        invoice_pic: InvoiceUntukPIC,
        invoice_position: InvoicePositions,
        invoice_email: InvoiceEmail,
        invoice_mobile: InvoiceMobile,
        invoice_phone_office: InvoicePhoneOffice,
      };

      const response = await axios.post(
        `${Baseurl}customer/edit-customer`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      // If you want to update the state with the edited data, you can do so here.
      // For example:
      setDataDetailDataMasterCustomer(response.data); // Assuming the response contains the updated data

      // Check if the save operation was successful and redirect to the desired page
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data Customer has been saved",
          // footer: '<a href="">Why do I have this issue?</a>'
        });

        // setTimeout(() => {
        //   window.location.href = "/mastercustomersss"; // Replace with the actual path to the "tarif_eureka" page
        // }, 1000); // 1000 milliseconds (1 seconds) delay
      } else if (response.status === 500) {
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Something went wrong!',
        //     // footer: '<a href="">Why do I have this issue?</a>'
        //   })
        console.log(`error`);
      }
    } catch (error) {
      console.log(`ini error`);
      console.error(`ini errorr`, error);
      Swal.fire({
        icon: "error",
        title: "Isi Semua Data Terlebih dahulu",
        // text: "Isi Semua Data",
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    }
  };

  useEffect(() => {
    DetailMasterCustomers(id_customer);
  }, []);

  const handleToPChange = (options) => {
    setToPValue(options.children);
  };


  
  return (
    <div>
     
      <Card>
        <h4 style={{ fontWeight: "bold" }}>CUSTOMER DATA</h4>
        <hr />
        <Row>
          {/* <Col span={12} className="mt-3">
            <label style={{ fontWeight: "bold" }}>Customer ID :</label> */}
          {/* Menghubungkan input tarif dengan state tarif */}
          {/* <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.id_customer}
            /> */}
          {/* </Col> */}
          <Col span={12} className="mt-3">
            <label style={{ fontWeight: "bold" }}>Code Customer :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.kode_customer}
              disabled
            />
          </Col>
          <Col span={12} className="mt-3">
            <label style={{ fontWeight: "bold" }}>Date Register : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.nama_perusahaan}
              value={NamaPerusahaan}
              onChange={(e) => {
                console.log(e.target.value);
                setDataNamaPerusahaan(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} className="mt-3">
            <label style={{ fontWeight: "bold" }}>Customer Name :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.nama_perusahaan}
              value={NamaPerusahaan}
              onChange={(e) => {
                console.log(e.target.value);
                setDataNamaPerusahaan(e.target.value);
              }}
            />
          </Col>
          <Col span={12} className="mt-3">
            <label style={{ fontWeight: "bold" }}>Business :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.jenis_usaha}
              value={JenisUsahaan}
              onChange={(e) => {
                console.log(e.target.value);
                setDataJenisUsahaan(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} className="mt-3">
            <label style={{ fontWeight: "bold" }}>Customer Address :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.alamat_kantor}
              value={AlamatCustomer}
              onChange={(e) => {
                console.log(e.target.value);
                setDataAlamatCustomer(e.target.value);
              }}
            />
          </Col>
          <Col span={6} className="mt-3">
            <label style={{ fontWeight: "bold" }}>Company Anniversary :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.tgl_berdiri}
              value={CompanyAnniversaryy}
              onChange={(e) => {
                console.log(e.target.value);
                setDataCompanyAnniversaryy(e.target.value);
              }}
            />
          </Col>
          <Col span={6} className="mt-3">
            <label style={{ fontWeight: "bold" }}>Item :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              name="jenis_barang"
              placeholder={DetailDataMasterCustomer.jenis_barang}
              value={JenisBarangPerusahaan}
              onChange={(e) => {
                console.log(e.target.value);
                setDataJenisBarangPerusahaan(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} className="mt-3">
            <label style={{ fontWeight: "bold" }}>Telp Office :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.telepon}
              value={TeleponKantor}
              onChange={(e) => {
                console.log(e.target.value);
                setDataTeleponKantor(e.target.value);
              }}
            />
          </Col>
          <Col span={12} className="mt-3">
            <label style={{ fontWeight: "bold" }}>Fax Office :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.fax}
              value={FaxPerusahaan}
              onChange={(e) => {
                console.log(e.target.value);
                setDataFaxPerusahaan(e.target.value);
              }}
            />
          </Col>
        </Row>
        <br />
        <hr />
        <h4 style={{ fontWeight: "bold" }}>CONTACT PERSON</h4>
        <hr />
        <br />
        <Row>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>PIC Office : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.pic_office}
              value={PicOffice}
              onChange={(e) => {
                console.log(e.target.value);
                setDataPicOffice(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>PIC Position : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.pic_position}
              value={PicPositions}
              onChange={(e) => {
                console.log(e.target.value);
                setDataPicPositions(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>PIC Email : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.pic_email}
              value={PicEmail}
              onChange={(e) => {
                console.log(e.target.value);
                setDataPicEmail(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>PIC Phone : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.pic_phone}
              value={PicPhone}
              onChange={(e) => {
                console.log(e.target.value);
                setDataPicPhone(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>PIC Birth : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.pic_birth}
              value={PicBirth}
              onChange={(e) => {
                console.log(e.target.value);
                setDataPicBirth(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>PIC Fax : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.pic_fax}
              value={PicFax}
              onChange={(e) => {
                console.log(e.target.value);
                setDataPicFax(e.target.value);
              }}
            />
          </Col>
        </Row>
        <br />
        <hr />
        <h4 style={{ fontWeight: "bold" }}>TAX</h4>
        <hr />
        <br />
        <Row className="mt-3">
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>NPWP Number : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.npwp}
              value={NomorNPWP}
              onChange={(e) => {
                console.log(e.target.value);
                setDataNomorNPWP(e.target.value);
              }}
            />
          </Col>
          <Col span={16}>
            <label style={{ fontWeight: "bold" }}>NPWP Address : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.alamat_npwp}
              value={AlamatNPWP}
              onChange={(e) => {
                console.log(e.target.value);
                setDataAlamatNPWP(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>KTP Number : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.ktp}
              value={NomorKTP}
              onChange={(e) => {
                console.log(e.target.value);
                setDataNomorKTP(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}> TDP Number : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.tdp}
              value={NomorTDP}
              onChange={(e) => {
                console.log(e.target.value);
                setDataNomorTDP(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}> NIB Number : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.pkp}
              value={NomorPKP}
              onChange={(e) => {
                console.log(e.target.value);
                setDataNomorPKP(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>TAX PIC : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.tax_pic}
              value={TaxPIC}
              onChange={(e) => {
                console.log(e.target.value);
                setDataNomorTaxPIC(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}> TAX Position : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.tax_position}
              value={TaxPosition}
              onChange={(e) => {
                console.log(e.target.value);
                setDataNomorTaxPosition(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}> TAX Email : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.tax_email}
              value={TaxEmail}
              onChange={(e) => {
                console.log(e.target.value);
                setDataTaxEmail(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>TAX Phone Office : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              // placeholder={DetailDataMasterCustomer.tax_phone_office}
              value={TaxPhoneOffice}
              onChange={(e) => {
                console.log(e.target.value);
                setDataTaxPhoneOffice(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}> TAX Position : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.tax_mobile}
              value={TaxMobile}
              onChange={(e) => {
                console.log(e.target.value);
                setDataTaxMobile(e.target.value);
              }}
            />
          </Col>
        </Row>
        <br />
        <hr />
        <h4 style={{ fontWeight: "bold" }}>TERM OF PAYMENT</h4>
        <hr />
        <br />
        <Row className="mt-3">
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>Bank Name : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.nama_bank}
              value={NamaBank}
              onChange={(e) => {
                console.log(e.target.value);
                setDataNamaBank(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}> Account Name : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.nama_akun}
              value={NamaAkunBank}
              onChange={(e) => {
                console.log(e.target.value);
                setDataNamaAkunBank(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}> Account Number : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.no_rek}
              value={NoRek}
              onChange={(e) => {
                console.log(e.target.value);
                setDataNoRek(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="mt-2" span={8}>
            <label style={{ fontWeight: "bold" }}>Type Of Payment : </label>
            <Select
              className="mt-2"
              placeholder={DetailDataMasterCustomer.jenis_pembayaran}
              style={{ width: "90%" }}
              onChange={(e) => setDataJenisPembayaran(e)}
            >
              <Option value="Cash">Cash</Option>
              <Option value="Credit">Credit</Option>
            </Select>
          </Col>
          
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>ToP : </label>
            <Select
              className="mt-2"
              placeholder={DetailDataMasterCustomer.top} // Make sure this contains a valid value
              style={{ width: "100%" }}
              onChange={(e,options)=>{console.log(options.children);handleToPChange(options)}}
              value={toPValue} // Bind the state value to the Select component
            >
              <Option value="0">---</Option>
              <Option value="1">7 Hari</Option>
              <Option value="2">14 Hari</Option>
              <Option value="3">30 Hari</Option>
              <Option value="4">60 Hari</Option>
            </Select>
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}> BANK PIC : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.bank_pic}
              value={BankUntukPIC}
              onChange={(e) => {
                console.log(e.target.value);
                setDataBankUntukPIC(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>BANK Position : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.bank_position}
              value={BankPositions}
              onChange={(e) => {
                console.log(e.target.value);
                setDataBankPositions(e.target.value);
              }}
            />
          </Col>

          <Col span={8}>
            <label style={{ fontWeight: "bold" }}> BANK Email : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.bank_email}
              value={BankEmail}
              onChange={(e) => {
                console.log(e.target.value);
                setDataBankEmail(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}> BANK Office Phone : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.bank_phone_office}
              value={BankPhoneOffice}
              onChange={(e) => {
                console.log(e.target.value);
                setDataBankPhoneOffice(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>BANK Mobile : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.bank_mobile}
              value={BankMobilee}
              onChange={(e) => {
                console.log(e.target.value);
                setDataBankMobilee(e.target.value);
              }}
            />
          </Col>
        </Row>

        <br />
        <hr />
        <h4 style={{ fontWeight: "bold" }}>INVOICE</h4>
        <hr />
        <br />
        <Row className="mt-3">
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>INV PIC : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.invoice_pic}
              value={InvoiceUntukPIC}
              onChange={(e) => {
                console.log(e.target.value);
                setDataInvoiceUntukPIC(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>INV Position : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.invoice_position}
              value={InvoicePositions}
              onChange={(e) => {
                console.log(e.target.value);
                setDataInvoicePositions(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>INV Email : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.invoice_email}
              value={InvoiceEmail}
              onChange={(e) => {
                console.log(e.target.value);
                setDataInvoiceEmail(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>INV Office Phone : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              // placeholder={DetailDataMasterCustomer.invoice_phone_office}
              value={TaxPhoneOffice}
              onChange={(e) => {
                console.log(e.target.value);
                setDataTaxPhoneOffice(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>INV Mobile : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2"
              placeholder={DetailDataMasterCustomer.invoice_mobile}
              value={InvoiceMobile}
              onChange={(e) => {
                console.log(e.target.value);
                setDataInvoiceMobile(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col span={24} className="d-flex justify-content-end">
            <Button type="primary">
              <span onClick={EditMasterCustomer}>Save</span>
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default DetailMasterCustomer;
