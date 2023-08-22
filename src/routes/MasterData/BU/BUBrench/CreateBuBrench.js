import axios from "axios";
import React, { useState } from "react";
import Baseurl from "../../../../Api/BaseUrl";
import { Button, Card, Col, Input, Row } from "antd";
import Swal from "sweetalert2";

function CreateBuBrench() {
  const [DataCodeBu, setDataCodeBu] = useState("");
  const [IDBuBrench, setIDBuBrench] = useState("");
  const [IDBu, setIDBu] = useState("");
  const [DataIDBuBrench, setDataIDBuBrench] = useState("");
  const [DataIDBu, setDataIDBu] = useState("");
  const [DataTambah, setDataTambah] = useState("");

  const TambahData = async () => {
    try {
      const respons = await axios.post(
        `${Baseurl}bu/create-bu-brench`,
        {
          id_bu_brench: IDBuBrench,
          code_bu_brench: DataCodeBu,
          id_bu: IDBu,
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

  return (
    <div>
      <Row>
        <Col span={24}>
          <label style={{ fontWeight: "bold" }}>ID BU Brench :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="number"
            className="mt-2 mb-2"
            name="id_bu_brench"
            placeholder="Input ID BU Brench"
            onChange={(e) => {
              console.log(e.target.value);
              setIDBuBrench(e.target.value);
            }}
          />
        </Col>
        <Col span={24}>
          <label style={{ fontWeight: "bold" }}>Code BU Brench :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="number"
            className="mt-2 mb-2"
            name="id_bu"
            placeholder="Input ID BU"
            onChange={(e) => {
              console.log(e.target.value);
              setIDBu(e.target.value);
            }}
          />
        </Col>
        <Col span={24}>
          <label style={{ fontWeight: "bold" }}>Code BU Brench :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            className="mt-2 mb-2"
            name="code_bu_brench"
            placeholder="Input Code BU Brench"
            onChange={(e) => {
              console.log(e.target.value);
              setDataCodeBu(e.target.value);
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
    </div>
  );
}

export default CreateBuBrench;
