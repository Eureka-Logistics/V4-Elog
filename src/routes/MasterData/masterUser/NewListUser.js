import { Button, Card, Col, Input, Row, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../Api/BaseUrl";
import Swal from "sweetalert2";

function NewListUser() {
  const [DataTambah, setDataTambah] = useState("");
  const [UserName, setUserName] = useState("");
  const [NamaLengkap, setNamaLengkap] = useState("");
  const [Email, setEmail] = useState("");
  const [NoTelepon, setNoTelepon] = useState("");
  const [IDCabang, setIDCabang] = useState("");
  const [DataCabang, setDataCabang] = useState("");
  const [Perusahaan, setPerusahaan] = useState("");
  const [KodeCabang, setKodeCabang] = useState("");
  const [Level, setLevel] = useState("");
  const [Divisi, setDivisi] = useState("");
  const [IDUserLevel, setIDUserLevel] = useState("");
  const [IDUserGroup, setIDUserGroup] = useState("");
  const [SelectOptions, setSelectOptions] = useState("");
  const [Group, setGroup] = useState("");

  const TambahData = async () => {
    try {
      const respons = await axios.post(
        `${Baseurl}user/create-user`,
        {
          username: UserName,
          nama_lengkap: NamaLengkap,
          email: Email,
          no_telp: NoTelepon,
          id_cabang: parseInt(IDCabang),
          perusahaan: Perusahaan,
          kode_cabang: KodeCabang,
          level: Level,
          divisi: Divisi,
          user_level: parseInt(IDUserLevel),
          user_group: parseInt(IDUserGroup),
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

  const fetchData = async () => {
    try {
      const respons = await axios.get(
        `${Baseurl}user/get-select-user?keyword1=&keyword=&keyword2=`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("responssssscarismid", respons.data);
      setSelectOptions(respons.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <h5>Create New User</h5>
      <hr />
      <Row>
        <Col span={12}>
          <label style={{ fontWeight: "bold", fontFamily: "NoirPro" }}>
            Username :
          </label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="username"
            placeholder="Input Username"
            onChange={(e) => {
              console.log(e.target.value);
              setUserName(e.target.value);
            }}
          />
        </Col>
        <Col span={12}>
          <label style={{ fontWeight: "bold", fontFamily: "NoirPro" }}>
            Nama Lengkap :
          </label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="nama_lengkap"
            placeholder="Input Nama lengkap"
            onChange={(e) => {
              console.log(e.target.value);
              setNamaLengkap(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <label style={{ fontWeight: "bold", fontFamily: "NoirPro" }}>
            Email :
          </label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="email"
            placeholder="Input Email"
            onChange={(e) => {
              console.log(e.target.value);
              setEmail(e.target.value);
            }}
          />
        </Col>
        <Col span={12}>
          <label style={{ fontWeight: "bold", fontFamily: "NoirPro" }}>
            No. Telepon :
          </label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="number"
            className="mt-2 mb-2"
            name="no_telp"
            placeholder="Input Nomor Telepon"
            onChange={(e) => {
              console.log(e.target.value);
              setNoTelepon(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <label style={{ fontWeight: "bold" ,  fontFamily: "NoirPro" }}>ID Cabang :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Pilih ID Cabang"
            optionFilterProp="value"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              console.log(options.key);
              setIDCabang(options.key);
              setKodeCabang(options.value);
              setDataCabang(options.value2);
            }}
          >
            {SelectOptions &&
              SelectOptions?.cabang.map((CustomerItem) => (
                <Select.Option
                  key={CustomerItem?.id}
                  value={CustomerItem?.kodecabang}
                  value2={CustomerItem?.cabang}
                >
                  {CustomerItem?.id}
                </Select.Option>
              ))}
          </Select>
        </Col>
        <Col span={4}>
          <label style={{ fontWeight: "bold",  fontFamily: "NoirPro"  }}>Kode Cabang :</label>
          <Input
            disabled
            style={{ width: "100%" }}
            className="mt-2 mb-2"
            name="kode_cabang"
            placeholder="Automatic Input"
            value={KodeCabang}
          />
        </Col>
        <Col span={4}>
          <label style={{ fontWeight: "bold",  fontFamily: "NoirPro"  }}>Cabang :</label>
          <Input
            disabled
            style={{ width: "100%" }}
            className="mt-2 mb-2"
            name="cabang"
            placeholder="Automatic Input"
            value={DataCabang}
          />
        </Col>
        <Col span={12}>
          <label style={{ fontWeight: "bold", fontFamily: "NoirPro" }}>
           Perusahaan :
          </label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="perusahaan"
            placeholder="Input Perusahaan Exp. LOG"
            onChange={(e) => {
              console.log(e.target.value);
              setPerusahaan(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
      <Col span={4}>
          <label style={{ fontWeight: "bold" ,  fontFamily: "NoirPro" }}> User Level :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Pilih Level User"
            optionFilterProp="value"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              console.log(options.key);
              setIDUserLevel(options.key);
              setLevel(options.value);
            }}
          >
            {SelectOptions &&
              SelectOptions?.levelUser.map((CustomerItem) => (
                <Select.Option
                  key={CustomerItem?.id}
                  value={CustomerItem?.levelUser}
                 
                >
                  {CustomerItem?.id}
                </Select.Option>
              ))}
          </Select>
        </Col>
        <Col span={8}>
          <label style={{ fontWeight: "bold",  fontFamily: "NoirPro"  }}>Level :</label>
          <Input
            disabled
            style={{ width: "100%" }}
            className="mt-2 mb-2"
            name="level"
            placeholder="Automatic Input"
            value={Level}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold" ,  fontFamily: "NoirPro" }}> User Group :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Pilih User Group"
            optionFilterProp="value"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              console.log(options.key);
              setIDUserGroup(options.key);
              setGroup(options.value);
            }}
          >
            {SelectOptions &&
              SelectOptions?.group.map((CustomerItem) => (
                <Select.Option
                  key={CustomerItem?.id}
                  value={CustomerItem?.group}
                 
                >
                  {CustomerItem?.group}
                </Select.Option>
              ))}
          </Select>
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: "bold", fontFamily: "NoirPro" }}>
            Divisi :
          </label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="divisi"
            placeholder="Input Divisi"
            onChange={(e) => {
              console.log(e.target.value);
              setDivisi(e.target.value);
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
  );
}

export default NewListUser;
