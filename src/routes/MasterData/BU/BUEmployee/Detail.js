import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Baseurl from "../../../../Api/BaseUrl";
import axios from "axios";
import { Button, Card, Col, Input, Row, Select, Upload, message } from "antd";
import Swal from "sweetalert2";
import { UploadOutlined } from "@ant-design/icons";

function Detail() {
  const { idEmploye } = useParams();
  const [DataSelectLagi, setDataSelectLagi] = useState("");
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
  const [DataPositionGL, setDataPositionGL] = useState("");
  const [DataPositionASM, setDataPositionASM] = useState("");
  const [DataPositionAMD, setDataPositionAMD] = useState("");
  const [DataPositionKacab, setDataPositionKacab] = useState("");
  const [DataPositionMGR, setDataPositionMGR] = useState("");

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
      setDataDetailEmployee(respons.data);
      console.log("ini detail", respons.data);
      setDataFullName(respons.data.name || "");
      setDataDesignation(respons.data.designation || "");
      setDataCodeEmployeePosition(respons.data.position || "");
      setDataNomorTelepon(respons.data.noTelp || "");
      setDataEmail(respons.data.email || "");
      setDataPhoto(respons.data.photo || "");
      setDataBU(respons.data.bu || "");
      setIDBu(respons.data.buId || "");
      setIDBuBrench(respons.data.id_bu_brench || "");
      setIDgl(respons.data.idGl || "");
      setIDASM(respons.data.idAsm || "");
      setIDMGR(respons.data.idMgr || "");
      setIDKacab(respons.data.idKacab || "");
      setIDAMD(respons.data.idAmd || "");
      setDataBuBrench(respons.data.buBrench || "");
      setDataBuEmployee(respons.data.id_employee || "");
      setDataJobLevel(respons.data.job_level || "");
      setDataKodeEmployee(respons.data.employeeCode || "");
      setIDKodeEmployeePosition(respons.data.code_employee_position || "");
      setDataGL(respons.data.gl || "");
      setDATAASM(respons.data.asm || "");
      setDataAMD(respons.data.amd || "");
      setDataKacab(respons.data.kacab || "");
      setDataMGR(respons.data.mgr || "");
      setDataPositionGL(respons.data.positionGl || "");
      setDataPositionAMD(respons.data.positionAmd || "");
      setDataPositionASM(respons.data.positionAsm || "");
      setDataPositionKacab(respons.data.positionKacab || "");
      setDataPositionMGR(respons.data.positionMgr || "");
      // setDataPosition(respons.data.data.position || "");

      setDataJobLevel(respons.data.job_level || "");
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
      setDataSelectLagi(respons.data);
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
        id_bu_brench: DataBuBrench.key,
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
          {/* <Col  span={10}>
            <label style={{ fontWeight: "bold" }}>Photo :</label>
            <div style={{ paddingRight: "0px" }}>
              <Card className="mt-2">
                <Upload
                accept=".jpg"
                  name="avatar"
                  showUploadList={false}
                  action="/upload" 
                  onChange={handleUploadChange}
                >
                  <img
                    src={DataDetailEmployee?.photo}
                    alt="ini gambar"
                    style={{ cursor: "pointer" }}
                  />
                  <hr />
                  <div style={{ marginTop: 10 }}>
                    <UploadOutlined /> Upload Photo
                  </div>
                </Upload>
              </Card>
         
            </div>
          </Col> */}
          <Col span={4}>
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
          </Col>
          <Col span={6}>
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
          <Col span={6}>
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
        </Row>
        <Row>
          <Col className="mt-2" span={12}>
            <label style={{ fontWeight: "bold" }}>Employee Position :</label>

            <Select
              className="mt-2"
              showSearch
              value={DataCodeEmployeePosition}
              optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.value);
                setDataCodeEmployeePosition(options.value);
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

          <Col span={12} className="mt-2">
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
          </Col>
        </Row>
        <Row className="mt-2">
          <Col span={6}>
            <label style={{ fontWeight: "bold" }}>No. Telepon :</label>
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
          <Col span={6}>
            <label style={{ fontWeight: "bold" }}>Email :</label>
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
          <Col span={3}>
            <label style={{ fontWeight: "bold" }}>Bisnis Unit :</label>
            <Select
              className="mt-2"
              showSearch
              value={DataBU}
              optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options);
                setDataBU(options.value);
                setIDBu(options.key);
              }}
            >
              {DataSelect &&
                DataSelect.BU.map((CustomerItem) => (
                  <Select.Option
                    key={CustomerItem.id}
                    value={CustomerItem.nameBu}
                  >
                    {CustomerItem.id}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col span={9}>
            <label style={{ fontWeight: "bold" }}>Nama Bisnis Unit :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Input
                className="mt-2"
                value={DataBU}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataBU(e.target.value);
                }}
              />
            </div>
          </Col>
        </Row>
        {/* <Row className="mt-2">
        
        </Row> */}

        <br />
        <h5>Wilayah Group Leader</h5>
        <hr />

        <Row>
          <Col span={3}>
            <label style={{ fontWeight: "bold" }}>ID GL :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Select
                className="mt-2"
                showSearch
                value={IDgl}
                optionFilterProp="value"
                style={{ width: "100%" }}
                onChange={(e, options) => {
                  console.log(options);
                  setDataGL(options.value);
                  setDataPositionGL(options.value2);
                  setIDgl(options.key);
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
            </div>
          </Col>
          <Col span={10}>
            <label style={{ fontWeight: "bold" }}>Nama Group Leader :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Input
                disabled
                className="mt-2"
                value={DataGL}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataGL(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col span={10}>
            <label style={{ fontWeight: "bold" }}>Posisi Group Leader :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Input
                disabled
                className="mt-2"
                value={DataPositionGL}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataPositionGL(e.target.value);
                }}
              />
            </div>
          </Col>
        </Row>

        <br />
        <h5>Wilayah ASMEN</h5>
        <hr />

        <Row>
          <Col span={3}>
            <label style={{ fontWeight: "bold" }}>ID ASMEN :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Select
                className="mt-2"
                showSearch
                value={IDASM}
                optionFilterProp="value"
                style={{ width: "100%" }}
                onChange={(e, options) => {
                  console.log(options);
                  setDATAASM(options.value);
                  setDataPositionASM(options.value2);
                  setIDASM(options.key);
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
          <Col span={10}>
            <label style={{ fontWeight: "bold" }}>Nama ASMEN :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Input
                disabled
                className="mt-2"
                value={DataASM}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDATAASM(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col span={10}>
            <label style={{ fontWeight: "bold" }}>Posisi ASMEN :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Input
                disabled
                className="mt-2"
                value={DataPositionASM}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataPositionASM(e.target.value);
                }}
              />
            </div>
          </Col>
        </Row>

        <br />
        <h5>Wilayah Manager</h5>
        <hr />

        <Row>
          <Col span={3}>
            <label style={{ fontWeight: "bold" }}>ID MGR :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Select
                className="mt-2"
                showSearch
                value={IDMGR}
                optionFilterProp="value"
                style={{ width: "100%" }}
                onChange={(e, options) => {
                  console.log(options);
                  setDataMGR(options.value);
                  setIDMGR(options.key);
                  setDataPositionMGR(options.value2);
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
            </div>
          </Col>
          <Col span={10}>
            <label style={{ fontWeight: "bold" }}>Nama Manager :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Input
                disabled
                className="mt-2"
                value={DataMGR}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataMGR(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col span={10}>
            <label style={{ fontWeight: "bold" }}>Posisi Manager :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Input
                disabled
                className="mt-2"
                value={DataPositionMGR}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataPositionMGR(e.target.value);
                }}
              />
            </div>
          </Col>
        </Row>
        <br />
        <h5>Wilayah Kepala Cabang</h5>
        <hr />
        <Row>
          <Col span={3}>
            <label style={{ fontWeight: "bold" }}>ID KACAB :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Select
                className="mt-2"
                showSearch
                value={IDKacab}
                optionFilterProp="value"
                style={{ width: "100%" }}
                onChange={(e, options) => {
                  console.log(options);
                  setDataKacab(options.value);
                  setIDKacab(options.key);
                  setDataPositionKacab(options.value2);
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
            </div>
          </Col>
          <Col span={10}>
            <label style={{ fontWeight: "bold" }}>Nama Kepala Cabang :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Input
                disabled
                className="mt-2"
                value={DataKacab}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataKacab(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col span={10}>
            <label style={{ fontWeight: "bold" }}>Posisi Kepala Cabang:</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Input
                disabled
                className="mt-2"
                value={DataPositionKacab}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataPositionKacab(e.target.value);
                }}
              />
            </div>
          </Col>
        </Row>
        <br />
        <h5>Wilayah AMD</h5>
        <hr />
        <Row>
          <Col span={3}>
            <label style={{ fontWeight: "bold" }}> ID AMD :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Select
                className="mt-2"
                showSearch
                value={IDAMD}
                optionFilterProp="value"
                style={{ width: "100%" }}
                onChange={(e, options) => {
                  console.log(options);
                  setDataAMD(options.value);
                  setDataPositionAMD(options.value2);
                  setIDAMD(options.key);
                }}
              >
                 {DataSelect &&
              DataSelect?.BuEmployee
                .filter((item) => item.codeEmployeePosition.startsWith("D"))
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
            </div>
          </Col>

          <Col span={10}>
            <label style={{ fontWeight: "bold" }}>Nama AMD :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Input
                disabled
                className="mt-2"
                value={DataAMD}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataAMD(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col span={10}>
            <label style={{ fontWeight: "bold" }}>Posisi AMD :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "0px" }}>
              <Input
                disabled
                className="mt-2"
                value={DataPositionAMD}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataPositionAMD(e.target.value);
                }}
              />
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
