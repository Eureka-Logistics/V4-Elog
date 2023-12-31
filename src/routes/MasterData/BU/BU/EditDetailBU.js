import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import Baseurl from '../../../../Api/BaseUrl';
import { Button, Card, Col, Input, Row } from 'antd';
import { ColumnWidthOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

function DetailBU() {
  const { id } = useParams();
  const [DataDetailBU, setDataDetailBU] = useState("");
  const [DataEdit, setDataEdit] = useState("");
  const [DataNamaBU, setDataNamaBU] = useState("");
  const [DataKodeBU, setDataKodeBU] = useState("");
  const [DataCBU, setDataCBU] = useState("");
  const [DataIDBu, setDataIDBu] = useState("");
  const [DataID, setDataID] = useState("");

  const DetailBisnisUnit = async (id) => {
    try {
      const respons = await axios.get(
        `${Baseurl}bu/get-bu-detail?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setDataDetailBU(respons.data.data);
      console.log('ini data detail', respons.data.data );
      setDataNamaBU(respons.data.data.name_bu || "");
      setDataKodeBU(respons.data.data.code_bu || "");
      setDataCBU(respons.data.data.cbu || "");
      setDataIDBu(respons.data.data.id_bu || "");
      setDataID(respons.data.data.id || "" );

    } catch (error) {}
  };

  const EditDetailBU = async () => {
    try {
      const data = {
        id : id,
        id_bu: DataIDBu,
        name_bu: DataNamaBU,
        code_bu: DataKodeBU,
        cbu: DataCBU,
      };

      const response = await axios.post(
        `${Baseurl}bu/edit-bu`,
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
          text: "Data has been changed",
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
    DetailBisnisUnit(id);
  }, []);
  

  return (
    <div>
      <Card>
        <h5>
        Edit dan Detail Data Bisnis Unit
        </h5>
        <hr />
        <Row >
          <Col span={8} className='mt-3'>
          <label style={{fontWeight: 'bold'}}>Kode BU :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div>
              <Input
              disabled
                className="mt-2"
                value={DataIDBu}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataIDBu(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col span={16} className='mt-3'>
          <label style={{fontWeight: 'bold'}}>Nama Bisnis Unit :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div >
              <Input
                className="mt-2"
                value={DataNamaBU}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataNamaBU(e.target.value);
                }}
              />
            </div>
          </Col>
        </Row>
        <Row >
         
        </Row>
       
        <Row >
          <Col span={8} className='mt-3'>
          <label style={{fontWeight: 'bold'}}>Alias Bisnis Unit :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div >
              <Input
                className="mt-2"
                value={DataKodeBU}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataKodeBU(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col span={16} className='mt-3'>
          <label style={{fontWeight: 'bold'}}>CBU :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div >
              <Input
                className="mt-2"
                value={DataCBU}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataCBU(e.target.value);
                }}
              />
            </div>
          </Col>
        </Row>
        <Row >
          
        </Row>
        <Row>
          <Col span={24} className="d-flex justify-content-end mt-2">
            <Button type="primary">
              <span onClick={EditDetailBU}>Save</span>
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default DetailBU
