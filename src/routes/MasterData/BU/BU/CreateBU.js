import { Button, Col, Input, Row } from "antd";
import axios from "axios";
import React, { useState } from "react";
import Baseurl from "../../../../Api/BaseUrl";
import Swal from "sweetalert2";

function CreateBU() {
  const [IDTambahData, setIDTambahData] = useState("");
  const [DataNama, setDataNama] = useState("");
  const [DataKodeBU, setDataKodeBU] = useState("");
  const [DataCBU, setDataCBU] = useState("");
  const [IDBU, setIDBU] = useState("");
  const [kodeBUError, setKodeBUError] = useState('');
  const [cbuError, setCBUError] = useState('');


  const TambahData = async () => {
    try {
      const respons = await axios.post(
        `${Baseurl}bu/create-bu`,
        {
          id_bu: parseInt(IDBU),
          name: DataNama,
          code: DataKodeBU,
          cbu: DataCBU,
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
        window.location.reload();
      });
    } catch (error) {
      // Handle error if needed
    }
  };

  // const handleKodeBUChange = (e) => {
  //   const inputValue = e.target.value;

  //   if (inputValue.length <= 3) {
  //     setDataKodeBU(inputValue.toUpperCase());
  //     setKodeBUError('');
  //   } else {
  //     setKodeBUError('Kode Bisnis Unit harus terdiri dari 3 huruf');
  //   }
  // };

  // const handleCBUChange = (e) => {
  //   const inputValue = e.target.value;

  //   if (inputValue.length <= 2) {
  //     setDataCBU(inputValue);
  //     setCBUError('');
  //   } else {
  //     setCBUError('CBU harus terdiri dari 2 huruf');
  //   }
  // };

  return (
    <div>
      <Row>
        <Col span={24}>
          <label style={{ fontWeight: "bold" }}>Kode BU :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="number"
            className="mt-2 mb-2"
            name="id_bu"
            placeholder="Input ID BU"
            onChange={(e) => {
              console.log(e.target.value);
              setIDBU(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label style={{ fontWeight: "bold" }}>Nama Bisnis Unit :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            className="mt-2 mb-2"
            name="name"
            placeholder="Exp: PT Eureka Logisticss"
            onChange={(e) => {
              console.log(e.target.value);
              setDataNama(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label style={{ fontWeight: "bold" }}>Kode Bisnis Unit :</label>
          <Input
           
            className="mt-2 mb-2"
            name="buCode"
            placeholder="Exp: LOG"
            onChange={(e) => {
              console.log(e.target.value);
              setDataKodeBU(e.target.value);
            }}
          /> </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label style={{ fontWeight: "bold" }}>CBU :</label>
          <Input
           
            className="mt-2 mb-2"
            name="cbu"
            placeholder="Exp: LG"
            onChange={(e) => {
              console.log(e.target.value);
              setDataCBU(e.target.value);
            }}
          /> </Col>
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
    </div>
  );
}

export default CreateBU;
