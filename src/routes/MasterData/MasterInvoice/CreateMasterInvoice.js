import { Card, Col, Row, Select, Input, notification, Button } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../Api/BaseUrl";

function CreateMasterInvoice() {
  const [DataAlamatDetail, setDataAlamatDetail] = useState("");
  const [DataKodeWilayah, setDataKodeWilayah] = useState("");
  const [DataKota, setDataKota] = useState("");
  const [DataKecamatan, setDataKecamatan] = useState("");
  const [DataHP, setDataHP] = useState("");
  const [DataTambah, setDataTambah] = useState("");
  const [Customer, setCustomer] = useState("");
  const [DataPIC, setDataPIC] = useState("");
  const [DataPositions, setDataPositions] = useState("");
  const [DataPhone, setDataPhone] = useState("");
  const [DataNumber, setDataNumber] = useState("");
  const [DataEmail, setDataEmail] = useState("");
  const [DataFax, setDataFax] = useState("");
  const [DataNPWP, setDataNPWP] = useState("");
  const [DataAddressNPWP, setDataAddressNPWP] = useState("");
  const [DataFormatNPWP, setDataFormatNPWP] = useState("");
  const [DataAddressOffice, setDataAddressOffice] = useState("");
  const [DataAddressGoogle, setDataAddressGoogle] = useState("");

  const GetSelectData = async () => {
    try {
      const respons = await axios.get(
        `${Baseurl}customer/get-select-create-address?idProv=${DataKodeWilayah}&idKota=${DataKota}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("response", respons.data);
      setDataTambah(respons.data);
    } catch (error) {}
  };

  useEffect(() => {
    // fetchData();
    GetSelectData();
  }, [DataKodeWilayah, DataKecamatan, DataKota]);

  const KotaOptions =
    DataTambah?.kota && Array.isArray(DataTambah?.kota)
      ? DataTambah?.kota.map((item) => ({
          label: item.kotaName,
          value: item.id,
        }))
      : [];

  const KecamatanOptions =
    DataTambah && Array.isArray(DataTambah?.kecamatan)
      ? DataTambah?.kecamatan.map((item) => ({
          label: item.kecamatanName,
          value: item.id,
        }))
      : [];

      const TambahData = async () => {
        try {
          const respons = await axios.post(
            `${Baseurl}customer/create-customer-invoice`,
            {
              customer_id: parseInt(Customer),
              pic_name: DataPIC,
              pic_position: DataPositions,
              pic_phone: DataPhone,
              pic_number: DataNumber,
              pic_email: DataEmail,
              pic_fax: DataFax,
              pic_phone: DataPhone,
              npwp: DataNPWP,
              address_npwp: DataAddressNPWP,
              format_npwp: DataFormatNPWP,
              address_office: DataAddressOffice,
              address_google: DataAddressGoogle,  
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            }
          );
      
          console.log("response", respons.data);
          setDataTambah(respons.data);
      
          // Show SweetAlert2 success message
          if (respons.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Data has been saved",
              // footer: '<a href="">Why do I have this issue?</a>'
            }).then(() => {
              // Reload the window after showing the success message
              window.location.reload();
            });;
    
         
          } else if (respons.status === 500) {
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
      

  return (
    <div>
      <Card>
        <Row>
          <Col span={24} style={{ width: "100%" }}>
            <label style={{ fontWeight: "bold" }}>Nama Pelanggan :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Select
              className="mt-2 mb-2"
              showSearch
              //   value={DataDetailAddress?.kode_wilayah}
              placeholder="Select Customer"
              optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.key);
                setCustomer(options.key);
              }}
            >
              {DataTambah &&
                DataTambah?.customer?.map((CustomerItem) => (
                  <Select.Option
                    key={CustomerItem?.id}
                    value={CustomerItem?.customer}
                  >
                    {CustomerItem?.customer}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col span={24}>
            <label style={{ fontWeight: "bold" }}> PIC Name :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Input PIC Name"
              name="pic_name"
              onChange={(e) => {
                console.log(e.target.value);
                setDataPIC(e.target.value);
                // setCustomer(options.key);
              }}

              //   onChange={formik.handleChange}
            />
          </Col>
          <Col span={24}>
            <label style={{ fontWeight: "bold" }}>PIC Position :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Input PIC Position"
              onChange={(e) => {
                console.log(e.target.value);
                setDataPositions(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>PIC Number :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Input PIC Number"
              onChange={(e) => {
                console.log(e.target.value);
                setDataNumber(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>PIC Phone :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Input Phone"
              onChange={(e) => {
                console.log(e.target.value);
                setDataPhone(e.target.value);
              }}
            />
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>PIC Email :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Input Email"
              onChange={(e) => {
                console.log(e.target.value);
                setDataEmail(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>PIC Fax :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Input PIC Fax"
              onChange={(e) => {
                console.log(e.target.value);
                setDataFax(e.target.value);
                // setCustomer(options.key);
              }}
              //   placeholder={DataDetailAddress?.customer}
              //   value={CustomersData}
            />
          </Col>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>NPWP :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Input NPWP"
              onChange={(e) => {
                console.log(e.target.value);
                setDataNPWP(e.target.value);
                // setCustomer(options.key);
              }}
              //   placeholder={DataDetailAddress?.customer}
              //   value={CustomersData}
            />
          </Col>
        </Row>
        <Row>
          
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>NPWP Address :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Input NPWP Address"
              onChange={(e) => {
                console.log(e.target.value);
                setDataAddressNPWP(e.target.value);
                // setCustomer(options.key);
              }}
              //   placeholder={DataDetailAddress?.customer}
              //   value={CustomersData}
            />
          </Col>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>Format NPWP :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Input Format NPWP"
              onChange={(e) => {
                console.log(e.target.value);
                setDataFormatNPWP(e.target.value);
                // setCustomer(options.key);
              }}
              //   placeholder={DataDetailAddress?.customer}
              //   value={CustomersData}
            />
          </Col>
        </Row>
        <Row>
          
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>Address Office :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Input Address Office"
              onChange={(e) => {
                console.log(e.target.value);
                setDataAddressOffice(e.target.value);
                // setCustomer(options.key);
              }}
              //   placeholder={DataDetailAddress?.customer}
              //   value={CustomersData}
            />
          </Col>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>Address Google :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Input Address Google"
              onChange={(e) => {
                console.log(e.target.value);
                setDataAddressGoogle(e.target.value);
                // setCustomer(options.key);
              }}
              //   placeholder={DataDetailAddress?.customer}
              //   value={CustomersData}
            />
          </Col>
        </Row>
        
      
        <Row className="mt-3">
          <Col className="d-flex justify-content-end" span={24}>
            <Button onClick={TambahData} type="primary">
              Save
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default CreateMasterInvoice;
