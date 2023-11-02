import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Baseurl from "../../../../Api/BaseUrl";
import { Button, Card, Col, Input, Row, Select } from "antd";
import Swal from "sweetalert2";

function EditDetailBrench() {
  const { bubrenchId } = useParams();
  const [DataBrenchh, setDataBrenchh] = useState("");
  const [IDBuBrench, setIDBuBrench] = useState("");
  const [NamaBrench, setNamaBrench] = useState("");
  const [DataCodeBrench, setDataCodeBrench] = useState("");
  const [DataEdit, setDataEdit] = useState("");
  const [DataSelect, setDataSelect] = useState("");
  const [IDBuCode, setIDBuCode] = useState("");
  const [Alamat, setAlamat] = useState("");
  const [NomorTelepon, setNomorTelepon] = useState("");

  const DetailBrench = async (bubrenchId) => {
    try {
      const respons = await axios.get(
        `${Baseurl}bu/get-bu-brench-detail?id_bu_brench=${bubrenchId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setDataBrenchh(respons.data.data);
      console.log("ini data detail", respons.data.data);
      setNamaBrench(respons.data.data.name_bu_brench || "");
      setIDBuCode(respons.data.data.code_bu_brench || "");
      setIDBuBrench(respons.data.data.id_bu || "");
      setAlamat(respons.data.data.alamat || "");
      setNomorTelepon(respons.data.data.no_telp | "");
    } catch (error) {}
  };

  const GetSelect = async () => {
    try {
      const respons = await axios.get(`${Baseurl}bu/get-select-bu-brench`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("ini data select", respons.data.data.BU);
      setDataSelect(respons.data.data);
    } catch (error) {}
  };

  const EditDetailDataBrench = async () => {
    try {
      const data = {
        id_bu_brench: bubrenchId,
        code_bu_brench: IDBuCode,
        id_bu: IDBuBrench,
        name_bu_brench: NamaBrench,
        alamat: Alamat,
        no_telp: NomorTelepon,

      };

      const response = await axios.post(`${Baseurl}bu/edit-bu-brench`, data, {
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
        title: "Data Sudah Ada",
        // text: "Isi Semua Data",
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    }
  };

  useEffect(() => {
    DetailBrench(bubrenchId);
    GetSelect();
  }, []);

  return (
    <div>
      <Card>
        <h5>Data Detail Bisnis Unit Brench</h5>
        <hr />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12} className="mt-3">
            <label style={{ fontWeight: "bold" }}>Nama BU Brench :</label>
            <div >
              <Input
              style={{width: '100%'}}
                className="mt-2"
                value={NamaBrench}
                onChange={(e) => {
                  console.log(e.target.value);
                  setNamaBrench(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} className="mt-3">
            <label style={{ fontWeight: "bold" }}>Nomor Telepon :</label>
            <div >
              <Input
               style={{width: '100%'}}
              type="number"
                className="mt-2"
                value={NomorTelepon}
                onChange={(e) => {
                  console.log(e.target.value);
                  setNomorTelepon(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} >
            <label style={{ fontWeight: "bold" }}>Code BU Brench :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div >
            <Input
             style={{width: '100%'}}
                className="mt-2"
                value={IDBuCode}
                onChange={(e) => {
                  console.log(e.target.value);
                  setIDBuCode(e.target.value);
                }}
              />
            {/* <Select
              className="mt-2"
              showSearch
              value={DataCodeBrench}
              optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.key);
                setDataCodeBrench(options);
                setIDBuCode(options.key);
              }}
            >
              { DataSelect &&
                DataSelect.BU.map((KotaItem) => (
                  <Select.Option
                    key={KotaItem.id}
                    value={KotaItem.codeBu}
                  >
                    {KotaItem.BU}
                  </Select.Option>
                ))}
            </Select> */}
            </div>
          </Col>
          <Col  xs={24} sm={12} md={12} lg={12}>
            <label style={{fontWeight: "bold"}}>ID BU Brench :</label>
            <div >
            <Input
             style={{width: '100%'}}
                className="mt-2"
                value={IDBuBrench}
                onChange={(e) => {
                  console.log(e.target.value);
                  setIDBuBrench(e.target.value);
                }}
              />
            </div>
            {/* <Select
              className="mt-2"
              showSearch
              value={IDBuBrench}
              optionFilterProp="value"
              style={{ width: "98%" }}
              onChange={(e, options) => {
                console.log(options.key);
                // setmitraId(options);
                setIDBuBrench(options.key);
              }}
            >
              { DataSelect &&
                DataSelect.BU.map((KotaItem) => (
                  <Select.Option
                    key={KotaItem.id}
                    // value={KotaItem.nameBu}
                  >
                    {KotaItem.BU}
                  </Select.Option>
                ))}
            </Select> */}
          </Col>
          <Col span={24} >
            <label style={{ fontWeight: "bold" }}>Alamat :</label>
            <div >
              <Input.TextArea
               style={{width: '100%'}}
                className="mt-2"
                value={Alamat}
                onChange={(e) => {
                  console.log(e.target.value);
                  setAlamat(e.target.value);
                }}
              />
            </div>
          </Col>
          
         
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} className="d-flex justify-content-end mt-2">
            <Button type="primary">
              <span onClick={EditDetailDataBrench}>Save</span>
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default EditDetailBrench;