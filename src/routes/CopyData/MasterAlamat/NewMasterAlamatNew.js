import { Card, Col, Row, Select, Input, notification, Button } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
// import Swal from "sweetalert2";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../Api/BaseUrl";
// import Swal from "sweetalert2";

function NewMasterAlamatNew() {
  const [DataDetailAddress, setDataDetailAddress] = useState("");
  const [DataCustomer, setDataCustomer] = useState("");
  const [Customer, setCustomer] = useState("");
  const [DataPIC, setDataPIC] = useState("");
  const [DataJabatan, setDataJabatan] = useState("");
  const [DataEmail, setDataEmail] = useState("");
  const [DataAlamat, setDataAlamat] = useState("");
  const [DataAlamatDetail, setDataAlamatDetail] = useState("");
  const [DataKodeWilayah, setDataKodeWilayah] = useState("");
  const [DataKota, setDataKota] = useState("");
  const [DataKecamatan, setDataKecamatan] = useState("");
  const [DataRitase, setDataRitase] = useState(0);
  const [DataHP, setDataHP] = useState("");
  const [DataLat, setDataLat] = useState("");
  const [DataLon, setDataLon] = useState("");
  const [CustomersData, setCustomerData] = useState("");
  const [DataTambah, setDataTambah] = useState("");
  const [IDProvinsi, setIDProvinsi] = useState("");
  const [DataProvinsi, setDataProvinsi] = useState("");

  const GetSelectData = async () => {
    try {
      const respons = await axios.get(
        `${Baseurl}customer/get-select-create-address?idProv=${DataProvinsi}&idKota=${DataKota}`,
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
  }, [DataKodeWilayah, DataKecamatan, DataKota, DataProvinsi]);

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
            `${Baseurl}customer/create-customer-address`,
            {
              id_customer: parseInt(Customer),
              pic: DataPIC,
              jabatan: DataJabatan,
              email: DataEmail,
              alamat: DataAlamat,
              ritase: parseInt(DataRitase),
              hp: DataHP,
              id_provinsi: parseInt(DataProvinsi),
              id_kota: parseInt(DataKota),
              id_kecamatan: parseInt(DataKecamatan),
              lat: parseInt( DataLat),
              lon: parseInt(DataLon),
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
            <label style={{ fontWeight: "bold" }}>Alamat :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Input Alamat"
              name="alamat"
              onChange={(e) => {
                console.log(e.target.value);
                setDataAlamat(e.target.value);
                // setCustomer(options.key);
              }}

              //   onChange={formik.handleChange}
            />
          </Col>
          <Col span={24}>
            <label style={{ fontWeight: "bold" }}>Alamat Detail :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Input Alamat Detail"
              onChange={(e) => {
                console.log(e.target.value);
                setDataAlamatDetail(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>Pic :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Input PIC Name"
              onChange={(e) => {
                console.log(e.target.value);
                setDataPIC(e.target.value);
              }}
            />
          </Col>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>Jabatan :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Input Jabatan"
              onChange={(e) => {
                console.log(e.target.value);
                setDataJabatan(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>Telp / HP :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Input Phone Number"
              onChange={(e) => {
                console.log(e.target.value);
                setDataHP(e.target.value);
                // setCustomer(options.key);
              }}
              //   placeholder={DataDetailAddress?.customer}
              //   value={CustomersData}
            />
          </Col>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>Email :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Email"
              onChange={(e) => {
                console.log(e.target.value);
                setDataEmail(e.target.value);
                // setCustomer(options.key);
              }}
              //   placeholder={DataDetailAddress?.customer}
              //   value={CustomersData}
            />
          </Col>
          {/* <Col span={8}>
            <label style={{ fontWeight: "bold" }}>Ritase :</label>
            <Input
              className="mt-2 mb-2"
              placeholder="Ritase"
              onChange={(e) => {
                console.log(e.target.value);
                setDataRitase(e.target.value);
                
              }}
             
            />
          </Col> */}
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>Lat :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="latitude"
              onChange={(e) => {
                console.log(e.target.value);
                setDataLat(e.target.value);
                // setCustomer(options.key);
              }}
              //   placeholder={DataDetailAddress?.customer}
              //   value={CustomersData}
            />
          </Col>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>Lon :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder="Longitude"
              onChange={(e) => {
                console.log(e.target.value);
                setDataLon(e.target.value);
                // setCustomer(options.key);
              }}
              //   placeholder={DataDetailAddress?.customer}
              //   value={CustomersData}
            />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>Provinsi :</label>

            <Select
              className="mt-2"
              showSearch
              //   value={DataDetailAddress?.kode_wilayah}
              placeholder="Select Provinsi"
              optionFilterProp="value"
              style={{ width: "90%" }}
              onChange={(e, options) => {
                console.log(options.key);
                setDataProvinsi(options.key);
              }}
            >
              {DataTambah &&
                DataTambah?.provinsi?.map((CustomerItem) => (
                  <Select.Option
                    key={CustomerItem?.id}
                    value={CustomerItem?.provName}
                  >
                    {CustomerItem?.provName}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>Kota :</label>

            <Select
              className="mt-2"
              showSearch
              placeholder="Select Kota"
              optionFilterProp="label"
              style={{ width: "90%" }}
              options={KotaOptions}
              onChange={(e, options) => {
                console.log(options);
                setDataKota(options.value);
              }}
            ></Select>
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>Kecamatan :</label>

            <Select
              className="mt-2"
              showSearch
              placeholder="Select Kecamatan"
              optionFilterProp="label"
              style={{ width: "90%" }}
              options={KecamatanOptions}
              onChange={(e, options) => {
                console.log(options);
                setDataKecamatan(options.value);
              }}
            ></Select>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="d-flex justify-content-end" span={24}>
            <Button onClick={TambahData} type="primary">Save</Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default NewMasterAlamatNew;
