import axios from 'axios';
import React, { useState } from 'react'
import Baseurl from '../../../../Api/BaseUrl';
import { Button, Col, Input, Row } from 'antd';
import Swal from 'sweetalert2';

function CreateEmployeePosition() {
  const [IDTambahData, setIDTambahData] = useState("");
  const [DataCodeBuEmployeePosition, setDataCodeBuEmployeePosition] = useState("");
  const [NamaData, setNamaData] = useState("");


  const TambahData = async () => {
    try {
      const respons = await axios.post(
        `${Baseurl}bu/create-bu-employee-position`,
        {
          code_employee_position: DataCodeBuEmployeePosition,
          name_employee_position: NamaData,
          
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
 
      <Row>
        <Col span={24}>
          <label style={{ fontWeight: "bold" }}>Kode Employee Position :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            className="mt-2 mb-2"
            name="code_employee_position"
            placeholder="Exp : K1002"
            onChange={(e) => {
              console.log(e.target.value);
              setDataCodeBuEmployeePosition(e.target.value);
            }}
          />
        </Col>
        <Col span={24}>
          <label style={{ fontWeight: "bold" }}>Nama Employee Position :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
         
            className="mt-2 mb-2"
            name="name_employee_position"
            placeholder="Exp: KACAB EUREKA"
            onChange={(e) => {
              console.log(e.target.value);
              setNamaData(e.target.value);
            }}
          />
        </Col>
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
  )
}

export default CreateEmployeePosition
