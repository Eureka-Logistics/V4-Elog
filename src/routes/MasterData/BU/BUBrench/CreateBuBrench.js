import axios from "axios";
<<<<<<< HEAD
import React, { useState } from "react";
import Baseurl from "../../../../Api/BaseUrl";
import { Button, Card, Col, Input, Row } from "antd";
=======
import React, { useEffect, useState } from "react";
import Baseurl from "../../../../Api/BaseUrl";
import { Button, Card, Col, Input, Row, Select } from "antd";
>>>>>>> maya
import Swal from "sweetalert2";

function CreateBuBrench() {
  const [DataCodeBu, setDataCodeBu] = useState("");
  const [IDBuBrench, setIDBuBrench] = useState("");
  const [IDBu, setIDBu] = useState("");
  const [DataIDBuBrench, setDataIDBuBrench] = useState("");
  const [DataIDBu, setDataIDBu] = useState("");
  const [DataTambah, setDataTambah] = useState("");
<<<<<<< HEAD
=======
  const [NoTelepon, setNoTelepon] = useState("");
  const [Alamat, setAlamat] = useState("");
  const [dataBU, setDataBU] = useState("");
>>>>>>> maya

  const TambahData = async () => {
    try {
      const respons = await axios.post(
        `${Baseurl}bu/create-bu-brench`,
        {
          id_bu_brench: IDBuBrench,
          code_bu_brench: DataCodeBu,
          id_bu: IDBu,
<<<<<<< HEAD
=======
          no_telp: NoTelepon,
          alamat: Alamat
>>>>>>> maya
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

<<<<<<< HEAD
=======
  const fetchData = async () => {
    try {
      const respons = await axios.get(`${Baseurl}bu/get-select-bu-brench`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
        console.log("responssssscarismid", respons.data.data);
        setDataBU(respons.data.data)

     
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
   
  }, []);


>>>>>>> maya
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
<<<<<<< HEAD
            placeholder="Input ID BU Brench"
=======
            placeholder="Exp. 1102"
>>>>>>> maya
            onChange={(e) => {
              console.log(e.target.value);
              setIDBuBrench(e.target.value);
            }}
          />
        </Col>
<<<<<<< HEAD
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
=======
          <Col span={24}>
            <label style={{ fontWeight: "bold" }}>ID BU :</label>
            <Select
              className="mt-2"
              showSearch
              name="id_bu"
              placeholder="Pilih BU"
              // optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.key);
                setIDBu(options.key)
              }}
            >
              {dataBU &&
                dataBU.BU.map((item) => (
                  <Select.Option
                    key={item.id}
                    value={item.nameBu}
                  >
                    {item.nameBu}
                  </Select.Option>
                ))}
            </Select>
            {/* <Input
              type="number"
              className="mt-2 mb-2"
              name="id_bu"
              placeholder="Input ID BU"
              onChange={(e) => {
                console.log(e.target.value);
                setIDBu(e.target.value);
              }}
            /> */}
          </Col>
        <Col span={24} className="mt-2">
>>>>>>> maya
          <label style={{ fontWeight: "bold" }}>Code BU Brench :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            className="mt-2 mb-2"
            name="code_bu_brench"
<<<<<<< HEAD
            placeholder="Input Code BU Brench"
=======
            placeholder="Exp. YGK"
>>>>>>> maya
            onChange={(e) => {
              console.log(e.target.value);
              setDataCodeBu(e.target.value);
            }}
          />
        </Col>
<<<<<<< HEAD
=======
        <Col span={24}>
          <label style={{ fontWeight: "bold" }}>Nomor Telepon :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
          type="number"
            className="mt-2 mb-2"
            name="no_telp"
            placeholder="Input No Telepon"
            onChange={(e) => {
              console.log(e.target.value);
              setNoTelepon(e.target.value);
            }}
          />
        </Col>
        <Col span={24}>
          <label style={{ fontWeight: "bold" }}>Alamat :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input.TextArea
            className="mt-2 mb-2"
            name="alamat"
            placeholder="Input Alamat"
            onChange={(e) => {
              console.log(e.target.value);
              setAlamat(e.target.value);
            }}
          />
        </Col>
>>>>>>> maya
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
