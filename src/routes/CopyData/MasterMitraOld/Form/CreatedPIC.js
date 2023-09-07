import { Button, Card, Col, Input, Row, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../../Api/BaseUrl";
import Swal from "sweetalert2";
import { useParams } from "react-router";

function CreatedPIC() {
  const { id_mitra } = useParams();
  // console.log(id_mitra);
  // const url = window.location.href;
  // const mitraId = url.substring(url.lastIndexOf("/") + 1);

  const [DataSelect, setDataSelect] = useState("");
  const [IDTambahData, setIDTambahData] = useState("");
  const [IDMitra, setIDMitra] = useState("");
  const [DataMitra, setDataMitra] = useState("");
  const [DataNama, setDataNama] = useState("");
  const [DataTelepon, setDataTelepon] = useState("");
  const [DataEmail, setDataEmail] = useState("");
  const [DataJabatan, setDataJabatan] = useState("");
  const [DataKTP, setDataKTP] = useState("");
  const mitraId = useParams();

  // const GetDataMitra = async (id_mitra) => {
  //   try {
  //     const datas = await axios.get(
  //       `${Baseurl}mitra/get-detail-mitra?id_mitra=${id_mitra}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     console.log("response", datas.data);
  //     // setDataSelect(respons.data);
  //   } catch (error) {}
  // };

  const GetSelectData = async () => {
    try {
      const respons = await axios.get(`${Baseurl}mitra/get-select-mitraPic`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("response", respons.data);
      setDataSelect(respons.data);
    } catch (error) {}
  };

  const TambahData = async () => {
    try {
      const respons = await axios.post(
        `${Baseurl}mitra/create-mitra-pic`,
        {
          id_mitra: parseInt(mitraId.mitraId),
          nama: DataNama,
          telepon: DataTelepon,
          email: DataEmail,
          jabatan: DataJabatan,
          ktp: DataKTP,
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

  useEffect(() => {
    GetSelectData(id_mitra);
    // GetDataMitra(id_mitra);
    // console.log("ini id mitra", mitraId);
  }, []);

  return (
    <div>
      <Card>
        <h5>New Data Master Mitra PIC</h5>
        <hr />
        <br />
        <Row>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}> Jabatan : </label>
            <Input
              type="text"
              className="mt-2 mb-2"
              name="jabatan"
              placeholder="Exp: Direktur Keuangan"
              onChange={(e) => {
                console.log(e.target.value);
                setDataJabatan(e.target.value);
              }}
            />
            {/* <Select
              className="mt-2 mb-2"
              showSearch
              placeholder="Select Jabatan"
              optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.value);
                setDataJabatan(options.value);
              }}
            >
              {DataSelect &&
                DataSelect?.jabatan?.map((JabatanID) => (
                  <Select.Option value={JabatanID?.jabatan}>
                    {JabatanID?.jabatan}
                  </Select.Option>
                ))}
            </Select> */}
          </Col>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>Nama PIC :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              type="text"
              className="mt-2 mb-2"
              name="nama"
              placeholder="Input Nama PIC"
              onChange={(e) => {
                console.log(e.target.value);
                setDataNama(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>Email :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              type="text"
              className="mt-2 mb-2"
              name="email"
              placeholder="Input Email"
              onChange={(e) => {
                console.log(e.target.value);
                setDataEmail(e.target.value);
              }}
            />
          </Col>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>Telepon :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              type="number"
              className="mt-2 mb-2"
              name="telepon"
              placeholder="Input Nomor Telepon"
              onChange={(e) => {
                console.log(e.target.value);
                setDataTelepon(e.target.value);
              }}
            />
          </Col>
          <Col span={12}>
            <label style={{ fontWeight: "bold" }}>KTP :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <Input
              type="number"
              className="mt-2 mb-2"
              name="ktp"
              placeholder="Input Nomor KTP"
              onChange={(e) => {
                console.log(e.target.value);
                setDataKTP(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} className="d-flex justify-content-end">
            <Button
              style={{
                backgroundColor: "#87CEFA",
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

export default CreatedPIC;
