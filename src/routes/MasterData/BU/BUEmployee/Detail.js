  import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Baseurl from "../../../../Api/BaseUrl";
import axios from "axios";
import { Button, Card, Col, Input, Row, Select, Upload, message } from "antd";
import Swal from "sweetalert2";
import { UploadOutlined } from "@ant-design/icons";

function Detail() {
  const { idEmploye } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [DataDetailEmployee, setDataDetailEmployee] = useState("");
  const [DataKodeEmployee, setDataKodeEmployee] = useState("");
  const [DataFullName, setDataFullName] = useState("");
  const [DataDesignation, setDataDesignation] = useState("");
  const [DataCodeEmployeePosition, setDataCodeEmployeePosition] = useState("");
  const [IDBu, setIDBu] = useState("");
  const [IDBuBrench, setIDBuBrench] = useState("");
  const [IDgl, setIDgl] = useState("");
  const [IDASM, setIDASM] = useState("");
  const [IDMGR, setIDMGR] = useState("");
  const [IDKacab, setIDKacab] = useState("");
  const [IDAMD, setIDAMD] = useState("");
  const [DataNomorTelepon, setDataNomorTelepon] = useState("");
  const [DataEmail, setDataEmail] = useState("");
  const [DataPhoto, setDataPhoto] = useState("");
  const [DataBU, setDataBU] = useState("");
  const [DataBuBrench, setDataBuBrench] = useState("");
  const [DataBuEmployee, setDataBuEmployee] = useState("");
  const [DataJobLevel, setDataJobLevel] = useState("");
  const [DataEdit, setDataEdit] = useState("");
  const [DataSelect, setDataSelect] = useState("");
  const [IDKodeEmployeePosition, setIDKodeEmployeePosition] = useState("");
  const [DataSelecttEmployee, setDataSelecttEmployee] = useState("");
  const [DataGL, setDataGL] = useState("");
  const [DataASM, setDATAASM] = useState("");
  const [DataAMD, setDataAMD] = useState("");
  const [DataKacab, setDataKacab] = useState("");
  const [DataMGR, setDataMGR] = useState("");


  const DetailEmployee = async (idEmploye) => {
    try {
      const respons = await axios.get(
        `${Baseurl}bu/get-bu-employee-detail?id_employee=${idEmploye}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setDataDetailEmployee(respons.data.data);
      console.log("ini detail", respons.data.data);
      setDataFullName(respons.data.data.fullname || "");
      setDataDesignation(respons.data.data.designation || "");
      setDataCodeEmployeePosition(
        respons.data.data.code_employee_position || ""
      );
      setDataNomorTelepon(respons.data.data.no_telp || "");
      setDataEmail(respons.data.data.email || "");
      setDataPhoto(respons.data.data.photo || "");
      setDataBU(respons.data.data.id_bu || "");
      setIDBu(respons.data.data.id_bu || "");
      setIDBuBrench(respons.data.data.id_bu_brench || "");
      setIDgl(respons.data.data.id_gl || "");
      setIDASM(respons.data.data.id_asm || "");
      setIDMGR(respons.data.data.id_mgr || "");
      setIDKacab(respons.data.data.id_kacab || "");
      setIDAMD(respons.data.data.id_amd || "");
      setDataBuBrench(respons.data.data.id_bu_brench || "");
      setDataBuEmployee(respons.data.data.id_employee || "");
      setDataJobLevel(respons.data.data.job_level || "");
      setDataKodeEmployee(respons.data.data.code_employee || "");
      setIDKodeEmployeePosition(respons.data.data.code_employee_position || "");
      // setDataGL(respons.data.data.fullname || "");
      // setDATAASM(respons.data.data.fullname || "");
      // setDataAMD(respons.data.data.fullname || "");
      // setDataKacab(respons.data.data.fullname || "");
      // setDataMGR(respons.data.data.fullname || "");
    

      // setDataJobLevel(respons.data.data.job_level || "");
    } catch (error) {}
  };

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

  const GetSelectBUEmployee = async () => {
    try {
      const respons = await axios.get(`${Baseurl}bu/get-select`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("responssssscarismid", respons.data.user);
      setDataSelecttEmployee(respons.data.user);
      // setDataGL(respons.data.user.fullname);
    } catch (error) {}
  };

  const EditDetailEmployee = async () => {
    try {
      const data = {
        id_employee: idEmploye,
        code_employee: DataKodeEmployee,
        fullname: DataFullName,
        job_level: DataJobLevel,
        designation: DataDesignation.value,
        code_employee_position: IDKodeEmployeePosition,
        id_bu: IDBu,
        id_bu_brench: IDBuBrench,
        id_gl: IDgl,
        id_asm: IDASM,
        id_mgr: IDMGR,
        id_kacab: IDKacab,
        id_amd: IDAMD,
        no_telp: DataNomorTelepon,
        email: DataEmail,
        photo: DataPhoto,
      };

      const response = await axios.post(`${Baseurl}bu/edit-bu-employee`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      setDataEdit(response.data);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Tarif has been saved",
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
        title: "Isi Semua Data Terlebih dahulu",
        // text: "Isi Semua Data",
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    }
  };

  useEffect(() => {
    DetailEmployee(idEmploye);
    DataSelectEmployee();
    GetSelectBUEmployee();
    // FetchDataBUEmployee();
  }, []);

  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div>
      <Card>
        <h5>Edit dan Detail Bisnis Unit Employee</h5>
        <hr />
        <Row>
        <Col  span={8}>
            <label style={{ fontWeight: "bold" }}>Photo :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Card className="mt-2">
                <Upload
                accept=".jpg"
                  name="avatar"
                  showUploadList={false}
                  action="/upload" // Replace with your upload endpoint
                  onChange={handleUploadChange}
                >
                  <img
                    src={DataDetailEmployee?.photo}
                    alt="ini gambar"
                    style={{ cursor: "pointer" }}
                  />
                  <hr />
                  <div style={{ marginTop: 8 }}>
                    <UploadOutlined /> Upload Photo
                  </div>
                </Upload>
              </Card>
         
            </div>
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>Full Name :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Input
                className="mt-2"
                value={DataFullName}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataFullName(e.target.value);
                }}
              />
            </div>
            <label style={{ fontWeight: "bold" }} className="mt-3">No. Telepon :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Input
                type="number"
                className="mt-2"
                value={DataNomorTelepon}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataNomorTelepon(e.target.value);
                }}
              />
              </div>
          </Col>
          <Col span={8}>
            <label style={{ fontWeight: "bold" }}>Job Level :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Input
                className="mt-2"
                value={DataJobLevel}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataJobLevel(e.target.value);
                }}
              />
            </div>
            <label style={{ fontWeight: "bold" }} className="mt-3">Email :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Input
                className="mt-2"
                value={DataEmail}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataEmail(e.target.value);
                }}
              />
            </div>
          </Col>
          
        </Row>
        <Row>
          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>Bisnis Unit :</label>
            <Select
              className="mt-2"
              showSearch
              value={DataBU}
              optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options);
                setDataBU(options);
                setIDBu(options.key);
              }}
            >
              {DataSelect &&
                DataSelect.BU.map((CustomerItem) => (
                  <Select.Option
                    key={CustomerItem.id}
                    value={CustomerItem.nameBu}
                  >
                    {CustomerItem.BU}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>Bisnis Unit Brench :</label>

            <Select
              className="mt-2"
              showSearch
              value={DataBuBrench}
              optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options);
                setDataBuBrench(options);
                setIDBuBrench(options.key);
              }}
            >
              {DataSelect &&
                DataSelect.BuBrench.map((CustomerItem) => (
                  <Select.Option
                    key={CustomerItem.idBuBrench}
                    value={CustomerItem.codeBuBrench}
                  >
                    {CustomerItem.codeBuBrench}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>Employee Position :</label>

            <Select
              className="mt-2"
              showSearch
              value={DataCodeEmployeePosition}
              optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options);
                setDataCodeEmployeePosition(options);
                setIDKodeEmployeePosition(options.key);
              }}
            >
              {DataSelect &&
                DataSelect.BuEmployee.map((CustomerItem) => (
                  <Select.Option
                    key={CustomerItem.codeEmployeePosition}
                    value={CustomerItem.name}
                  >
                    {CustomerItem.BuEmployee}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>Kode Employee :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Input
                className="mt-2"
                value={DataKodeEmployee}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataKodeEmployee(e.target.value);
                }}
              />
            </div>
          </Col>

        </Row>

        <Row>
         
          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>Designation :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Select
                className="mt-2"
                showSearch
                value={DataDesignation}
                optionFilterProp="value"
                style={{ width: "100%" }}
                onChange={(e, options) => {
                  console.log(options);
                  setDataDesignation(options);
                  // setIDKodeEmployeePosition(options.key);
                }}
              >
                {DataSelect &&
                  DataSelect.designation.map((CustomerItem) => (
                    <Select.Option
                      // key={CustomerItem.codeEmployeePosition}
                      value={CustomerItem.designation}
                    >
                      {CustomerItem.designation}
                    </Select.Option>
                  ))}
              </Select>
              {/* <Input
                className="mt-2"
                value={DataDesignation}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataDesignation(e.target.value);
                }}
              /> */}
            </div>
          </Col>
          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>GL :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Select
                className="mt-2"
                showSearch
                value={DataGL}
                optionFilterProp="value"
                style={{ width: "100%" }}
                onChange={(e, options) => {
                  console.log(options);
                  setDataGL(options.value);
                  setIDgl(options.key);
                }}
              >
                {DataSelecttEmployee &&
                  DataSelecttEmployee.map((CustomerItem) => (
                    <Select.Option
                      key={CustomerItem.id_gl}
                      value={CustomerItem.fullname}
                    >
                      {CustomerItem.fullname}
                    </Select.Option>
                  ))}
              </Select>
              {/*            
              <Input
                className="mt-2"
                value={IDgl}
                onChange={(e) => {
                  console.log(e.target.value);
                  setIDgl(e.target.value);
                }}
              /> */}
            </div>
          </Col>
          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>ASMEN :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
            <Select
                className="mt-2"
                showSearch
                value={DataASM}
                optionFilterProp="value"
                style={{ width: "100%" }}
                onChange={(e, options) => {
                  console.log(options);
                  setDATAASM(options.value);
                  setIDASM(options.key);
                }}
              >
                {DataSelecttEmployee &&
                  DataSelecttEmployee.map((CustomerItem) => (
                    <Select.Option
                      key={CustomerItem.id_asm}
                      value={CustomerItem.fullname}
                    >
                      {CustomerItem.fullname}
                    </Select.Option>
                  ))}
              </Select>
              {/* <Input
                className="mt-2"
                value={IDASM}
                onChange={(e) => {
                  console.log(e.target.value);
                  setIDASM(e.target.value);
                }}
              /> */}
            </div>
          </Col>
          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>MANAGER :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
            <Select
                className="mt-2"
                showSearch
                value={DataMGR}
                optionFilterProp="value"
                style={{ width: "100%" }}
                onChange={(e, options) => {
                  console.log(options);
                  setDataMGR(options.value);
                  setIDMGR(options.key);
                }}
              >
                {DataSelecttEmployee &&
                  DataSelecttEmployee.map((CustomerItem) => (
                    <Select.Option
                      key={CustomerItem.id_mgr}
                      value={CustomerItem.fullname}
                    >
                      {CustomerItem.fullname}
                    </Select.Option>
                  ))}
              </Select>
            </div>
          </Col>
        </Row>
        <Row>
        

         
        
          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>AMD :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
            <Select
                className="mt-2"
                showSearch
                value={DataAMD}
                optionFilterProp="value"
                style={{ width: "100%" }}
                onChange={(e, options) => {
                  console.log(options);
                  setDataAMD(options.value);
                  setIDAMD(options.key);
                }}
              >
                {DataSelecttEmployee &&
                  DataSelecttEmployee.map((CustomerItem) => (
                    <Select.Option
                      key={CustomerItem.id_amd}
                      value={CustomerItem.fullname}
                    >
                      {CustomerItem.fullname}
                    </Select.Option>
                  ))}
              </Select>
              
            </div>
          </Col>

          <Col className="mt-2" span={6}>
            <label style={{ fontWeight: "bold" }}>KEPALA CABANG :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
            <Select
                className="mt-2"
                showSearch
                value={DataKacab}
                optionFilterProp="value"
                style={{ width: "100%" }}
                onChange={(e, options) => {
                  console.log(options);
                  setDataKacab(options.value);
                  setIDKacab(options.key);
                }}
              >
                {DataSelecttEmployee &&
                  DataSelecttEmployee.map((CustomerItem) => (
                    <Select.Option
                      key={CustomerItem.id_kacab}
                      value={CustomerItem.fullname}
                    >
                      {CustomerItem.fullname}
                    </Select.Option>
                  ))}
              </Select>
           
            </div>
          </Col>
        </Row>
       

        <Row>
          <Col span={24} className="d-flex justify-content-end mt-2">
            <Button type="primary">
              <span onClick={EditDetailEmployee}>Save</span>
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Detail;
