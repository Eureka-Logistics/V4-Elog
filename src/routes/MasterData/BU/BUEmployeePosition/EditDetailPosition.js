import { Button, Card, Col, Input, Row } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import Baseurl from '../../../../Api/BaseUrl';
import Swal from 'sweetalert2';


function EditDetailPosition() {
  const { id } = useParams();
  const [DataDetail, setDataDetail] = useState("");
  const [IDEmployee, setIDEmployee] = useState("");
  const [DataCodeEmployee, setDataCodeEmployee] = useState("");
  const [DataNamaEmployee, setDataNamaEmployee] = useState("");
  const [DataEdit, setDataEdit] = useState("");

  const DetailDataEmployeePosition = async (id) => {
    try {
      const respons = await axios.get(
        `${Baseurl}bu/get-bu-employee-detail-position?id_employee_position=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      ;
      console.log('ini data detail', respons.data.data );
      setDataDetail(respons.data.data);
      setDataNamaEmployee(respons.data.data.name_employee_position || "");
      setDataCodeEmployee(respons.data.data.code_employee_position || "");
      setIDEmployee(respons.data.data.id_employee_position || "");
    } catch (error) {}
  };

  const EditDetailEmployeePosition = async () => {
    try {
      const data = {
        name_employee_position: DataNamaEmployee,
        id_employee_position : IDEmployee,
        code_employee_position: DataCodeEmployee,
      };

      const response = await axios.post(
        `${Baseurl}bu/edit-bu-employee-position`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setDataEdit(response.data); 
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data has been saved",
          // footer: '<a href="">Why do I have this issue?</a>'
        });
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
        title: "Data Sudah Ada ",
        // text: "Isi Semua Data",
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    }
  };

  useEffect(() => {
    DetailDataEmployeePosition (id);
  }, []);

  return (
    <div>
      <Card>
        <h5>
          Data Edit Employee Position
        </h5>
        <hr />
        <Row >
          <Col span={24} className='mt-3'>
          <label style={{fontWeight: 'bold'}}>Nama Bisnis Unit Employee :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "30px" }}>
              <Input
                className="mt-2"
                value={DataNamaEmployee}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataNamaEmployee(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col span={24} className='mt-3'>
          <label style={{fontWeight: 'bold'}}>Code Bisnis Unit Employee :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "30px" }}>
              <Input
                className="mt-2"
                value={DataCodeEmployee}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataCodeEmployee(e.target.value);
                }}
              />
            </div>
          </Col>
<<<<<<< HEAD
          <Col span={24} className='mt-3'>
          <label style={{fontWeight: 'bold'}}>ID Bisnis Unit Employee :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
=======
          {/* <Col span={24} className='mt-3'>
          <label style={{fontWeight: 'bold'}}>ID Bisnis Unit Employee :</label>
           
>>>>>>> maya
            <div style={{ paddingRight: "30px" }}>
              <Input
                className="mt-2"
                value={IDEmployee}
                onChange={(e) => {
                  console.log(e.target.value);
                  setIDEmployee(e.target.value);
                }}
              />
            </div>
<<<<<<< HEAD
          </Col>
=======
          </Col> */}
>>>>>>> maya
        </Row>
        <Row>
          <Col span={24} className="d-flex justify-content-end mt-2">
            <Button type="primary">
              <span onClick={EditDetailEmployeePosition}>Save</span>
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default EditDetailPosition
