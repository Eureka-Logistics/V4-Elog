  import React, { useState } from "react";
import Baseurl from "../../../../Api/BaseUrl";
import axios from "axios";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { Button, Card, Col, Input, Row, Select } from "antd";
import useBanksStore from "../../../../zustand/Store/NamaNamaBank";

function CreateMitraCabang() {
  const { idmitra } = useParams();
  const [IDTambahData, setIDTambahData] = useState("");
  const [DataBank, setDataBank] = useState("");
  const [DataAccountName, setDataAccountName] = useState("");
  const [DataAccountNumber, setDataAccountNumber] = useState("");
  const [DataCabangPIC, setDataCabangPIC] = useState("");
  const [DataCabangEmail, setDataCabangEmail] = useState("");
  const [DataCabangTelp, setDataCabangTelp] = useState("");
  const { banks } = useBanksStore();
  // const mitraId = useParams();
  console.log("ini mitra id", idmitra);

  const TambahData = async () => {
    try {
      const respons = await axios.post(
        `${Baseurl}mitra/create-mitra-cabangRek`,
        {
          id_mitra: parseInt(idmitra),
          bank: DataBank.value,
          account_name: DataAccountName,
          account_number: DataAccountNumber,
          cabang_pic: DataCabangPIC,
          cabang_email: DataCabangEmail,
          cabang_telp: DataCabangTelp,
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

  return (
    <div>
      {/* <h5>Create New Mitra Cabang</h5> */}
      {/* <hr /> */}
     <Card>
     <h5>
        Data Contact PIC
      </h5>
      <hr/>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={8}>
          <label style={{ fontWeight: "bold" }}>PIC Name :</label>
          <Input
            className="mt-2 mb-2"
            name="account_name"
            placeholder="Exp: Malahawi"
            onChange={(e) => {
              console.log(e.target.value);
              setDataCabangPIC(e.target.value);
            }}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <label style={{ fontWeight: "bold" }}>PIC Number Phone :</label>
          <Input
            className="mt-2 mb-2"
            name="cabang_telp"
            placeholder="Exp: 082313708xxx / +6282313708xxx"
            onChange={(e) => {
              console.log(e.target.value);
              setDataCabangTelp(e.target.value);
            }}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <label style={{ fontWeight: "bold" }}>PIC Email :</label>
          <Input
            className="mt-2 mb-2"
            name="cabang_email"
            placeholder="Exp: example@gamil.com"
            onChange={(e) => {
              console.log(e.target.value);
              setDataCabangEmail(e.target.value);
            }}
          />
        </Col>
      </Row>
      <br/>
      <h5>
        Data Account Bank
      </h5>
      <hr/>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={8}>
          <label style={{ fontWeight: "bold" }}>Bank :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2"
            showSearch
            value={DataBank}
            optionFilterProp="value"
            placeholder="Select Bank"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              // setIDCodeEmployee(options.key);
              setDataBank(options);
            }}
          >
            {banks &&
              banks.map((i) => <select value={i.name}>{i.name}</select>)}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <label style={{ fontWeight: "bold" }}>PIC Account Name :</label>
          <Input
            className="mt-2 mb-2"
            name="account_name"
            placeholder="Exp: Malahawi S."
            onChange={(e) => {
              console.log(e.target.value);
              setDataAccountName(e.target.value);
            }}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <label style={{ fontWeight: "bold" }}>PIC Account Number :</label>
          <Input
            className="mt-2 mb-2"
            name="account_number"
            placeholder="Exp: 2861628118"
            onChange={(e) => {
              console.log(e.target.value);
              setDataAccountNumber(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24} className="d-flex justify-content-end mt-2">
          <Button type="primary">
            <span onClick={TambahData}>Save</span>
          </Button>
        </Col>
      </Row>
     </Card>
    </div>
  );
}

export default CreateMitraCabang;
