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
  const [DataSelecttEmployee, setDataSelecttEmployee] = useState("");
  const [DataBU, setDataBU] = useState("");
  const [DataGl, setDataGl] = useState("");
  const [DataASM, setDataASM] = useState("");
  const [DataMgr, setDataMgr] = useState("");
  const [DataKacab, setDataKacab] = useState("");
  const [DataAmd, setDataAmd] = useState("");
  const [PosisiGL, setPosisiGL] = useState("");
  const [PosisiASM, setPosisiASM] = useState("");
  const [PosisiMGR, setPosisiMGR] = useState("");
  const [PosisiKACAB, setPosisiKACAB] = useState("");
  const [PosisiAMD, setPosisiAMD] = useState("");
  const [DataSelectLagi, setDataSelectLagi] = useState("");
  // const [DataMgr, setDataMgr] = useState("");

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
        window.location.reload();
      });
    } catch (error) {
      // Handle error if needed
    }
  };

  useEffect(() => {
    DataSelectEmployee();
    GetSelectBUEmployee();
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

  const GetSelectBUEmployee = async () => {
    try {
      const respons = await axios.get(`${Baseurl}bu/get-select`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("responssssscarismid", respons.data.user);
      console.log("responss11", respons.data);
      setDataSelecttEmployee(respons.data.user);
      setDataSelectLagi(respons.data);
      // setDataGL(respons.data.user.fullname);
    } catch (error) {}
  };

  return (
    <div>
      <h5>Data Employee</h5>
      <hr />
      <Row gutter={[16, 16]}>
        {/* <Col xs={24} sm={12} md={10} lg={10}>
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
        <Col xs={24} sm={12} md={4} lg={4}>
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
        <Col xs={24} sm={12} md={8} lg={8}>
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
        <Col xs={24} sm={12} md={6} lg={6}>
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
        <Col xs={24} sm={12} md={6} lg={6}>
          <label style={{ fontWeight: "bold" }}>BU Brench :</label>
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

        {/* <Col span={12}>
          <label style={{ fontWeight: "bold" }}>Employee Position :</label>
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
                  value={DataItem.namePosition}
                >
                  {DataItem.BuEmployee}
                </Select.Option>
              ))}
          </Select>
        </Col> */}
        {/* <label style={{ fontWeight: "bold" }}>Job Level :</label> */}
        {/* Menghubungkan input tarif dengan state tarif */}
        <Col span={24}>
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
      <Row className="mt-2">
        <Col xs={24} sm={12} md={6} lg={6}>
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
        <Col xs={24} sm={12} md={6} lg={6}>
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
        <Col xs={24} sm={12} md={3} lg={3}>
          <label style={{ fontWeight: "bold" }}>Kode BU :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Pilih Bisnis Unit "
            optionFilterProp="value"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              console.log(options.key);
              setIDBu(options.key);
              setDataBU(options.value);
            }}
          >
            {DataSelect &&
              DataSelect?.BU.map((CustomerItem) => (
                <Select.Option
                  key={CustomerItem?.id}
                  value={CustomerItem?.nameBu}
                >
                  {CustomerItem?.id}
                </Select.Option>
              ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={9} lg={9}>
          <label style={{ fontWeight: "bold" }}>Nama Bisnis Unit :</label>

          <Input
            disabled
            className="mt-2 mb-2"
            name="nameBu "
            placeholder="Automatic Input"
            value={DataBU}
          />
        </Col>
      </Row>
      {/* <Row gutter={[16, 16]}>
     
      </Row> */}

      <br />
      <h5>Wilayah Group Leader</h5>
      <hr />
      <Row gutter={[16,16]} className="mt-2">
        <Col xs={24} sm={12} md={3} lg={3}>
          <label style={{ fontWeight: "bold" }}>ID GL :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Pilih GL"
            optionFilterProp="value"
            style={{ width: "95%" }}
            onChange={(e, options) => {
              console.log(options.key);
              setIDgl(options.key);
              setDataGl(options.value);
              setPosisiGL(options.value2);
            }}
          >
            {DataSelect &&
              DataSelect?.BuEmployee
                .filter((item) => item.codeEmployeePosition.startsWith("G"))
                .map((CustomerItem) => (
                  <Select.Option
                    key={CustomerItem?.codeEmployeePosition}
                    value={CustomerItem?.name}
                    value2={CustomerItem?.namePosition}
                  >
                    {CustomerItem?.codeEmployeePosition}
                  </Select.Option>
                ))}
          </Select>
          {/* <Input
            className="mt-2 mb-2"
            name="id_gl"
            placeholder="Exp: G1004"
            onChange={(e) => {
              console.log(e.target.value);
              setIDgl(e.target.value);
            }}
          /> */}
        </Col>
        <Col xs={24} sm={12} md={10} lg={10}>
          <label style={{ fontWeight: "bold" }}>Nama Group Leader :</label>
          <Input
            disabled
            style={{ width: "100%" }}
            className="mt-2 mb-2"
            name="name"
            placeholder="Automatic Input"
            value={DataGl}
          />
        </Col>

        <Col xs={24} sm={12} md={10} lg={10}>
          <label style={{ fontWeight: "bold" }}>Position Grup Leader :</label>
          <Input
            disabled
            className="mt-2 mb-2"
            name="namePosition"
            placeholder="Automatic Input"
            value={PosisiGL}
          />
        </Col>
      </Row>
      <br />
      <h5>Wilayah ASMEN</h5>
      <hr />
      <Row className="mt-2">
        <Col xs={24} sm={12} md={3} lg={3}>
          <label style={{ fontWeight: "bold" }}>ID ASM :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Pilih ASMEN"
            optionFilterProp="value"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              console.log(options.key);
              setIDAsm(options.key);
              setDataASM(options.value);
              setPosisiASM(options.value2);
            }}
          >
            {DataSelect &&
              DataSelect?.BuEmployee
                .filter(
                  (item) =>
                    item.codeEmployeePosition.startsWith("A") &&
                    item.codeEmployeePosition !== "AMD101"
                )
                .map((CustomerItem) => (
                  <Select.Option
                  key={CustomerItem?.codeEmployeePosition}
                  value={CustomerItem?.name}
                  value2={CustomerItem?.namePosition}
                >
                  {CustomerItem?.codeEmployeePosition}
                  </Select.Option>
                ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={10} lg={10}>
          <label style={{ fontWeight: "bold" }}>Nama ASMEN :</label>
          <Input
            disabled
            className="mt-2 mb-2"
            name="name"
            placeholder="Automatic Input"
            value={DataASM}
          />
        </Col>
        <Col xs={24} sm={12} md={10} lg={10}>
          <label style={{ fontWeight: "bold" }}>Position ASMEN :</label>
          <Input
            disabled
            className="mt-2 mb-2"
            name="namePosition"
            placeholder="Automatic Input"
            value={PosisiASM}
          />
        </Col>
      </Row>
      <br />
      <h5>Wilayah Manager</h5>
      <hr />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={3} lg={3}>
          <label style={{ fontWeight: "bold" }}>ID MGR :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Pilih Manager"
            optionFilterProp="value"
            style={{ width: "98%" }}
            onChange={(e, options) => {
              console.log(options.key);
              setIDMgr(options.key);
              setDataMgr(options.value);
              setPosisiMGR(options.value2);
            }}
          >
             {DataSelect &&
              DataSelect?.BuEmployee
                .filter((item) => item.codeEmployeePosition.startsWith("M"))
                .map((CustomerItem) => (
                  <Select.Option
                    key={CustomerItem?.codeEmployeePosition}
                    value={CustomerItem?.name}
                    value2={CustomerItem?.namePosition}
                  >
                    {CustomerItem?.codeEmployeePosition}
                  </Select.Option>
                ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={10} lg={10}>
          <label style={{ fontWeight: "bold" }}>Nama Manager :</label>
          <Input
            disabled
            className="mt-2 mb-2"
            name="name"
            placeholder="Automatic Input"
            value={DataMgr}
          />
        </Col>
        <Col xs={24} sm={12} md={10} lg={10}>
          <label style={{ fontWeight: "bold" }}>Position Manager :</label>
          <Input
            disabled
            className="mt-2 mb-2"
            name="namePosition"
            placeholder="Automatic Input"
            value={PosisiMGR}
          />
        </Col>
      </Row>
      <br />
      <h5>Wilayah Kepala Cabang</h5>
      <hr />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={3} lg={3}>
          <label style={{ fontWeight: "bold" }}>ID KACAB:</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Pilih Kepala Cabang"
            optionFilterProp="value"
            style={{ width: "100%" }}
            onChange={(e, options) => {
              console.log(options.key);
              setIDKacab(options.key);
              setDataKacab(options.value);
              setPosisiKACAB(options.value2);
            }}
          >
           {DataSelect &&
              DataSelect?.BuEmployee
                .filter((item) => item.codeEmployeePosition.startsWith("K"))
                .map((CustomerItem) => (
                  <Select.Option
                    key={CustomerItem?.codeEmployeePosition}
                    value={CustomerItem?.name}
                    value2={CustomerItem?.namePosition}
                  >
                    {CustomerItem?.codeEmployeePosition}
                  </Select.Option>
                ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={10} lg={10}>
          <label style={{ fontWeight: "bold" }}>Nama Kepala Cabang :</label>
          <Input
            disabled
            className="mt-2 mb-2"
            name="name"
            placeholder="Automatic Input"
            value={DataKacab}
          />
        </Col>
        <Col xs={24} sm={12} md={10} lg={10}>
          <label style={{ fontWeight: "bold" }}>Position Kepala Cabang :</label>
          <Input
            disabled
            className="mt-2 mb-2"
            name="namePosition"
            placeholder="Automatic Input"
            value={PosisiKACAB}
          />
        </Col>
      </Row>
      <br />
      <h5>Wilayah AMD</h5>
      <hr />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={3} lg={3}>
          <label style={{ fontWeight: "bold" }}>ID AMD :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Select
            className="mt-2 mb-2"
            showSearch
            //   value={DataDetailAddress?.kode_wilayah}
            placeholder="Pilih AMD"
            optionFilterProp="value"
            style={{ width: "95%" }}
            onChange={(e, options) => {
              console.log(options.key);
              setIDAmd(options.key);
              setDataAmd(options.value);
              setPosisiAMD(options.value2);
            }}
          >
            {DataSelect &&
              DataSelect?.BuEmployee
                .filter((item) => item.codeEmployeePosition.startsWith("Z"))
                .map((CustomerItem) => (
                  <Select.Option
                    key={CustomerItem?.codeEmployeePosition}
                    value={CustomerItem?.name}
                    value2={CustomerItem?.namePosition}
                  >
                    {CustomerItem?.codeEmployeePosition}
                  </Select.Option>
                ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={10} lg={10}>
          <label style={{ fontWeight: "bold" }}>Nama AMD :</label>
          <Input
            disabled
            className="mt-2 mb-2"
            name="name"
            placeholder="Automatic Input"
            value={DataAmd}
          />
        </Col>
        <Col xs={24} sm={12} md={10} lg={10}>
          <label style={{ fontWeight: "bold" }}>Position AMD :</label>
          <Input
            disabled
            className="mt-2 mb-2"
            name="namePosition"
            placeholder="Automatic Input"
            value={PosisiAMD}
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
    </div>
  );
}

export default CreateBUEmployee;
