import React, { useEffect, useState } from 'react'
import Baseurl from '../../../../Api/BaseUrl';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Col, Input, Row, Select } from 'antd';

function AddNewPosition() {
    const [IDTambahData, setIDTambahData] = useState("");
    const [IDEmployee, setIDEmployee] = useState("");
    const [DataEmployee, setDataEmployee] = useState("");
    const [DataCodeBuEmployeePosition, setDataCodeBuEmployeePosition] = useState("");
    const [DataSelect, setDataSelect] = useState("");

    const TambahData = async () => {
        try {
          const respons = await axios.post(
            `${Baseurl}bu/add-employee-position`,
            {
                id_employee: parseInt(IDEmployee),
                code_employee_position: DataCodeBuEmployeePosition,
              
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

      const fetchDataSelect = async () => {
        try {
          const respons = await axios.get(`${Baseurl}bu/get-select-add-position?keyword=`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          });
          console.log("response", respons.data);
          //   console.log("responssssscarismid", respons.data.data);
    
          setDataSelect(respons.data);
          //   setSJList(respons.data?.data?.sj);
        } catch (error) {}
      };
    
useEffect(() => {
  fetchDataSelect();
}, []);

  return (
    <div>
      <Row>
        <Col span={24}>
        <label style={{ fontWeight: "bold" }}>Employee Name :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Pilih  "
            optionFilterProp="value"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              console.log(options.key);
              setIDEmployee(options.key);
              setDataEmployee(options.value);
            }}
          >
            {DataSelect &&
              DataSelect?.employee.map((CustomerItem) => (
                <Select.Option
                  key={CustomerItem?.id_employee}
                  value={CustomerItem?.name}
                >
                  {CustomerItem?.name}
                </Select.Option>
              ))}
          </Select>
        </Col>
      </Row>
      <Row>
      <Col span={24}>
          <label style={{ fontWeight: "bold" }}>Kode Employee :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            className="mt-2 mb-2"
            name="code_employee_position"
            placeholder="Exp: G1002"
            onChange={(e) => {
              console.log(e.target.value);
              setDataCodeBuEmployeePosition(e.target.value);
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24} className="d-flex justify-content-end mt-2">
          <Button type="primary">
            <span onClick={TambahData}>Save Data</span>
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default AddNewPosition
