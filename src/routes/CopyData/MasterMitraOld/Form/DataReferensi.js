import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
// import { httpClient } from "../../../util/Api";
import { httpClient } from "../../../../Api/Api";
import isiDatamasterMitraDetailZustand from "../../../../zustand/Store/IsiDataMasterMitraDetail/Store";
import { Button, Select, notification } from "antd";
import Swal from "sweetalert2";
import Baseurl from "../../../../Api/BaseUrl";

function DataReferensi({ mitraId, SemuaDataUntukEdit }) {
  const id_mitras = mitraId;
  const [datareverensis, setDataReference] = useState({
    akta_pendirian: null,
    akta_perubahan_dasar: null
  });
  const { data, setData } = isiDatamasterMitraDetailZustand();

  console.log(`oper bang datareverensis`, datareverensis.akta_pendirian);

  useEffect(() => {
    const datareverensi = async () => {
      httpClient
        .get(`mitra/get-detail-mitra?id_mitra=${id_mitras}`)
        .then(({ data }) => {
          if (data.status.code === 200) {
            setDataReference({
              akta_pendirian: data.data.akta_pendirian,
              akta_perubahan_dasar: data.data.akta_perubahan_dasar
            });
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    };
    datareverensi();
  }, []);
  if (!datareverensis) {
    return <p>Loading...</p>
  }
  const EditMitras = async () => {
    try {
      const response = await axios.post(`${Baseurl}mitra/edit-mitra`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      // If you want to update the state with the edited data, you can do so here.
      // For example:
      console.log(response);
      // Check if the save operation was successful and redirect to the desired page
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data has been Changed",
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      } else if (response.status === 500) {
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Something went wrong!',
        //     // footer: '<a href="">Why do I have this issue?</a>'
        //   })
        // console.log(`error`);
      }
    } catch (error) {
      console.log(`ini error`, error.status);
      if (!data) {
        alert('harus isi data dan klik tombol referensi dulu ')
      }
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map((element) => {
          return `${element.field}: ${element.message}`;
        });
        const errorMessage = errorMessages.join("\n");

        notification.error({
          description: errorMessage,
        });
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.status
      ) {
        notification.error({
          description: error.response.data.status.message,
        });
      }
    }
  };
  const handleInputChange = (e, fieldName) => {
    const value = e;
    setDataReference(prevState => ({ ...prevState, [fieldName]: value }));
  };
  return (
    <div>
      <br />
      <h5>
        <b>DATA REFERENSI PELANGGAN (Customer Reference Data)</b>
      </h5>
      <br />
      <hr />
      <br />
      <Button onClick={EditMitras}>Post</Button>
      <Row>
        <Col sm={6}>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>PURCHASE ORDER</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>KTP PENANDATANGAN</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>AKTA PENDIRIAN</b>
              </Form.Label>
            </Col>
            <Col>
              <Select style={{ width: "100%" }} value={datareverensis.akta_pendirian}
                onChange={e => {
                  handleInputChange(e, 'akta_pendirian')
                  console.log(e);
                }}>
                <option value="">Pilih Akta Pendirian</option>
                <option value="Ada Lengkap">Ada Lengkap</option>
                <option value="Tidak Lengkap">Tidak Lengkap</option>
              </Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>AKTA PENDIRIAN</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example" value={datareverensis.akta_pendirian}
                onChange={e => {
                  handleInputChange(e, 'akta_pendirian')
                  console.log(e.target.value);
                }}
              >
                <option value="">Pilih Akta Pendirian</option>
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>AKTA PERUBAHAN DASAR TERBARU</b>
              </Form.Label>
            </Col>
            <Col>
              <Select style={{ width: "100%" }} value={datareverensis.akta_pendirian}
                onChange={e => {
                  handleInputChange(e, 'akta_perubahan_dasar')
                  console.log(e);
                }}>
                <option value="Ada Lengkap">Ada Lengkap</option>
                <option value="Tidak Lengkap">Tidak Lengkap</option>
              </Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>AKTA SUSUNAN DIREKSI TERBARU</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">
                  {datareverensis?.akta_susunan_direksi}
                </option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>SURAT DOMISILI</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">{datareverensis?.surat_domisili}</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>NPWP</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">{datareverensis?.npwp_legalitas}</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>SKT</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">{datareverensis?.skt_legalitas}</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>NPPKP / SPPKP</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">{datareverensis?.nppkp_legalitas}</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>NIB (SIUP/SIUB/SIUJK/SIUPAL)</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">{datareverensis?.siup_legalitas}</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>IJIN PENDIRIAN KPPA</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">{datareverensis?.ijin_pendirian}</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>PERSETUJUAN PENANAMAN MODAL DARI BPKM</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">Ada Lengkap</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>IJIN USAHA TETAP DARI BPKM</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">{datareverensis?.ijin_usaha}</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>TDP</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">{datareverensis?.tdp_legalitas}</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col sm={5}>
              <Form.Label>
                <b>SURAT KUASA (PENANDATANGAN KONTRAK BUKAN DIREKSI)</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option value="1">{datareverensis?.surat_kuasa}</option>
                <option value="1">Tidak Lengkap</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default DataReferensi;
