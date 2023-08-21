import axios from "axios";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../../Api/BaseUrl";
import { Button, Card, Col, Input, Row, Select, Upload } from "antd";
import Swal from "sweetalert2";
import { Option } from "antd/lib/mentions";

function CreateBUEmployee() {
  const [IDTambahData, setIDTambahData] = useState("");
  const [DataKodeEmployee, setDataKodeEmployee] = useState("");
  const [DataFullName, setDataFullName] = useState("");
  const [DataDesignation, setDataDesignation] = useState("");
  const [DataCodeEmployeePosition, setDataCodeEmployeePosition] = useState("");
  const [IDBu, setIDBu] = useState("");
  const [IDBuBrench, setIDBuBrench] = useState("");
  const [IDgl, setIDgl] = useState("");
  const [IDAsm, setIDAsm] = useState("");
  const [IDMgr, setIDMgr] = useState("");
  const [IDKacab, setIDKacab] = useState("");
  const [IDAmd, setIDAmd] = useState("");
  const [DataNomorTelepon, setDataNomorTelepon] = useState("");
  const [DataPhoto, setDataPhoto] = useState(null);
  const [DataEmail, setDataEmail] = useState("");
  const [DataSelect, setDataSelect] = useState("");
  const [DataJobLevel, setDataJobLevel] = useState("");
  const [IDCodeEmployee, setIDCodeEmployee] = useState("");
  const [DataBuBrench, setDataBuBrench] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  const DataSelectEmployee = async () => {
    try {
      const respons = await axios.get(`${Baseurl}bu/get-select-bu-employee`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("responssssscarismid", respons.data.data);
      setDataSelect(respons.data.data);
    } catch (error) {}
  };

  const TambahData = async () => {
    try {
      const respons = await axios.post(
        `${Baseurl}bu/create-bu-employee`,
        {
          code_employee: DataKodeEmployee,
          fullname: DataFullName,
          job_level: DataJobLevel,
          designation: DataDesignation.value,
          code_employee_position: DataCodeEmployeePosition.value,
          id_bu: IDBu,
          id_bu_brench: IDBuBrench,
          id_gl: IDgl,
          id_asm: IDAsm,
          id_mgr: IDMgr,
          id_kacab: IDKacab,
          id_amd: IDAmd,
          no_telp: DataNomorTelepon,
          email: DataEmail,
          photo: DataPhoto,
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
    DataSelectEmployee();
  }, []);

  const handleJobLevelChange = (e) => {
    const inputValue = e.target.value.toUpperCase();
    const uppercaseRegex = /^[A-Z\s]+$/;

    if (uppercaseRegex.test(inputValue)) {
      setDataJobLevel(inputValue);
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
    }
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      // Assuming you have a backend that returns the uploaded image URL
      const uploadedImageUrl = info.file.response.imageUrl;
      setImageUrl(uploadedImageUrl);
    }
  };

  return (
    <div>
      <Row>
        {/* <Col span={8}>
          <label style={{ fontWeight: "bold" }}>Photo :</label>
          <Card>
            <Upload
              action="/your-upload-endpoint" // Replace with your actual upload endpoint
              showUploadList={false}
              onChange={handleImageUpload}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <div>Click to Upload</div>
              )}
            </Upload>
          </Card>
        </Col> */}
        <Col span={12}>
          <label style={{ fontWeight: "bold" }}>Full Name :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            className="mt-2 mb-2"
            name="fullname"
            placeholder="Input Full Name"
            onChange={(e) => {
              console.log(e.target.value);
              setDataFullName(e.target.value);
            }}
          />
        </Col>
        <Col span={12}>
          <label style={{ fontWeight: "bold" }}>Code Employee :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            className="mt-2 mb-2"
            name="code_employee"
            placeholder="Exp: P2808"
            onChange={(e) => {
              console.log(e.target.value);
              setDataKodeEmployee(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <label style={{ fontWeight: "bold" }}>Designation :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2"
            showSearch
            value={DataDesignation}
            optionFilterProp="value"
            placeholder="Select Designation"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              // setIDCodeEmployee(options.key);
              setDataDesignation(options);
            }}
          >
            {DataSelect &&
              DataSelect.designation.map((DataItem) => (
                <Select.Option
                  // key={DataItem.codeEmployeePosition}
                  value={DataItem.designation}
                >
                  {DataItem.designation}
                </Select.Option>
              ))}
          </Select>
        </Col>

        {/* <label style={{ fontWeight: "bold" }}>Job Level :</label> */}
        {/* Menghubungkan input tarif dengan state tarif */}
        <Col span={12}>
          <label style={{ fontWeight: "bold" }}>Job Level:</label>
          <Input
            className={`mt-2 mb-2 ${isInputValid ? "" : "invalid-input"}`}
            name="job_level"
            placeholder="Exp: STAFF MARKETING EUREKA LOGISTIK SURABAYA"
            onChange={handleJobLevelChange}
          />
          {!isInputValid && (
            <p style={{ color: "red" }}>
              Please enter valid UPPERCASE letters only.
            </p>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <label style={{ fontWeight: "bold" }}>Employee Position :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2"
            showSearch
            value={DataCodeEmployeePosition}
            optionFilterProp="value"
            placeholder="Select Employee Position"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              setIDCodeEmployee(options.key);
              setDataCodeEmployeePosition(options);
            }}
          >
            {DataSelect &&
              DataSelect.BuEmployee.map((DataItem) => (
                <Select.Option
                  key={DataItem.codeEmployeePosition}
                  value={DataItem.name}
                >
                  {DataItem.BuEmployee}
                </Select.Option>
              ))}
          </Select>
        </Col>
        <Col span={12}>
          <label style={{ fontWeight: "bold" }}>BU Brench :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2"
            showSearch
            value={DataBuBrench}
            optionFilterProp="value"
            placeholder="Select Employee Position"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              setIDBuBrench(options.key);
              setDataBuBrench(options);
              console.log(options.key);
            }}
          >
            {DataSelect &&
              DataSelect.BuBrench.map((DataItem) => (
                <Select.Option
                  key={DataItem.idBuBrench}
                  value={DataItem.codeBuBrench}
                >
                  {DataItem.BuBrench}
                </Select.Option>
              ))}
          </Select>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col span={12}>
          <label style={{ fontWeight: "bold" }}>No Telepon :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="number"
            className="mt-2 mb-2"
            name="no_telp"
            placeholder="Exp: 082313987829"
            onChange={(e) => {
              console.log(e.target.value);
              setDataNomorTelepon(e.target.value);
            }}
          />
        </Col>
        <Col span={12}>
          <label style={{ fontWeight: "bold" }}>Email :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            className="mt-2 mb-2"
            name="email"
            placeholder="example@example.com"
            onChange={(e) => {
              console.log(e.target.value);
              setDataEmail(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col span={8}>
          <label style={{ fontWeight: "bold" }}>ID BU :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            className="mt-2 mb-2"
            name="id_bu"
            placeholder="Exp: 13"
            onChange={(e) => {
              console.log(e.target.value);
              setIDBu(e.target.value);
            }}
          />
        </Col>
        <Col span={8}>
          <label style={{ fontWeight: "bold" }}>ID Kacab :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            className="mt-2 mb-2"
            name="id_kacab"
            placeholder="Exp: K1001"
            onChange={(e) => {
              console.log(e.target.value);
              setIDKacab(e.target.value);
            }}
          />
        </Col>
        <Col span={8}>
          <label style={{ fontWeight: "bold" }}>ID AMD :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            className="mt-2 mb-2"
            name="id_amd"
            placeholder="Exp: D1001"
            onChange={(e) => {
              console.log(e.target.value);
              setIDAmd(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col span={8}>
          <label style={{ fontWeight: "bold" }}>ID GL :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            className="mt-2 mb-2"
            name="id_gl"
            placeholder="Exp: G1004"
            onChange={(e) => {
              console.log(e.target.value);
              setIDgl(e.target.value);
            }}
          />
        </Col>
        <Col span={8}>
          <label style={{ fontWeight: "bold" }}>ID ASM :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            className="mt-2 mb-2"
            name="id_asm"
            placeholder="Exp: A1002"
            onChange={(e) => {
              console.log(e.target.value);
              setIDAsm(e.target.value);
            }}
          />
        </Col>
        <Col span={8}>
          <label style={{ fontWeight: "bold" }}>ID MGR :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            className="mt-2 mb-2"
            name="id_mgr"
            placeholder="Exp: M1001"
            onChange={(e) => {
              console.log(e.target.value);
              setIDMgr(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} className="d-flex justify-content-end mt-2">
          <Button type="primary">
            <span onClick={TambahData}>Save</span>
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default CreateBUEmployee;
