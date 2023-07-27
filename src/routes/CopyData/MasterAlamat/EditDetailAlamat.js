import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Baseurl from "../../../Api/BaseUrl";
import Swal from "sweetalert2";
import { Card, Col, Input, Row, Select, Button } from "antd";

function EditDetailAlamat() {
  const { customerAddressId } = useParams();
  console.log(customerAddressId);
  const [DataDetailAddress, setDataDetailAddress] = useState("");
  const [DataPIC, setDataPIC] = useState("");
  const [DataJabatan, setDataJabatan] = useState("");
  const [DataEmail, setDataEmail] = useState("");
  const [DataAlamat, setDataAlamat] = useState("");
  const [DataAlamatDetail, setDataAlamatDetail] = useState("");
  const [DataKodeWilayah, setDataKodeWilayah] = useState("");
  const [DataKota, setDataKota] = useState("");
  const [DataKecamatan, setDataKecamatan] = useState("");
  const [DataRitase, setDataRitase] = useState("");
  const [DataHP, setDataHP] = useState("");
  const [DataLat, setDataLat] = useState("");
  const [DataLon, setDataLon] = useState("");
  const [CustomersData, setCustomerData] = useState("");
  const [DataTambah, setDataTambah] = useState("");
  const [DataEdit, setDataEdit] = useState("");

  const fetchData = async () => {
    try {
      const respons = await axios.get(
        `${Baseurl}customer/detail-alamat?id=${customerAddressId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("response", respons.data);
      setDataDetailAddress(respons.data?.data[0]);
      setDataPIC(respons.data?.data[0].pic || "");
      setDataAlamat(respons.data?.data[0].alamat || "");
      setDataAlamatDetail(respons.data?.data[0].alamat_detail || "");
      setCustomerData(respons.data?.data[0].customer || "");
      setDataJabatan(respons.data?.data[0].jabatan || "");
      setDataHP(respons.data?.data[0].hp || "");
      setDataEmail(respons.data?.data[0].email || "");
      setDataKodeWilayah(respons.data?.data[0].kode_wilayah || "");
    } catch (error) {}
  };

  const GetSelectData = async () => {
    try {
      const respons = await axios.get(
        `${Baseurl}customer/get-select-create-address?idProv=${DataKodeWilayah.key}&idKota=${DataKota.value}`,
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

  const EditAddress = async () => {
    try {
      const data = {
        id: customerAddressId,
        pic: DataPIC,
        jabatan: DataJabatan,
        email: DataEmail,
        alamat: DataAlamat,
        kecamatan: DataKecamatan.label,
        kota: DataKota.label,
        kode_wilayah: DataKodeWilayah.value,
        ritase: DataRitase,
        hp: DataHP,
        lat: DataLat,
        lon: DataLon,
      };

      const response = await axios.post(
        `${Baseurl}customer/edit-alamat`,
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
      setDataEdit(response.data); // Assuming the response contains the updated data

      // Check if the save operation was successful and redirect to the desired page
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Edit Address has been saved",
          // footer: '<a href="">Why do I have this issue?</a>'
        });

        // setTimeout(() => {
        //   window.location.href = "/alamatcustomer"; // Replace with the actual path to the "tarif_eureka" page
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
    fetchData();
    GetSelectData();
  }, [customerAddressId, DataKodeWilayah, DataKecamatan, DataKota]);

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

  return (
    <div>
      <Card>
        <h4 style={{fontWeight: "bold"}}>Data Detail Address Customer</h4>
        <Row>
          <Col span={24}>
            <label className="mt-2" style={{ fontWeight: "bold" }}>
              PIC :
            </label>
            <Input
              className="mt-2 mb-2"
              placeholder={DataDetailAddress?.pic}
              value={DataPIC}
              onChange={(e) => {
                console.log(e.target.value);
                setDataPIC(e.target.value);
              }}
            />
            <label style={{ fontWeight: "bold" }}>Alamat : </label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder={DataDetailAddress?.alamat}
              value={DataAlamat}
              onChange={(e) => {
                setDataAlamat(e.target.value);
              }}
            />
            <label style={{ fontWeight: "bold" }}>Alamat Detail : </label>
            <Input
              className="mt-2 mb-2"
              placeholder={DataDetailAddress?.alamat_detail}
              value={DataAlamatDetail}
              onChange={(e) => {
                console.log(e.target.value);
                setDataAlamatDetail(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>PIC :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder={DataDetailAddress?.pic}
              value={DataPIC}
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
              placeholder={DataDetailAddress?.jabatan}
              value={DataJabatan}
              onChange={(e) => {
                console.log(e.target.value);
                setDataJabatan(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>Tlp/HP :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder={DataDetailAddress?.hp}
              value={DataHP}
              onChange={(e) => {
                console.log(e.target.value);
                setDataHP(e.target.value);
              }}
            />
          </Col>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>Email :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              className="mt-2 mb-2"
              placeholder={DataDetailAddress?.email}
              value={DataEmail}
              onChange={(e) => {
                console.log(e.target.value);
                setDataEmail(e.target.value);
              }}
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
              placeholder={DataDetailAddress?.kode_wilayah}
              optionFilterProp="value"
              style={{ width: "90%" }}
              onChange={(e, options) => {
                console.log(options.key);
                setDataKodeWilayah(options);
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
              placeholder={DataDetailAddress?.kota}
              optionFilterProp="value"
              style={{ width: "90%" }}
              options={KotaOptions}
              onChange={(e, options) => {
                console.log(options);
                setDataKota(options);
              }}
            ></Select>
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>Kecamatan :</label>

            <Select
              className="mt-2"
              showSearch
              placeholder={DataDetailAddress?.kecamatan}
              optionFilterProp="value"
              style={{ width: "90%" }}
              options={KecamatanOptions}
              onChange={(e, options) => {
                console.log(options);
                setDataKecamatan(options);
              }}
            ></Select>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col span={24} className="d-flex justify-content-end">
            <Button type="primary">
              <span onClick={EditAddress}>Save</span>
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default EditDetailAlamat;
