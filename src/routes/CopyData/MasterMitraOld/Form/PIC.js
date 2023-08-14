import React, { useEffect, useState } from "react";
import { Button, Row, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import Baseurl from "../../../../Api/BaseUrl";
import { Col, Input, Pagination, Space } from "antd";
import { useHistory } from "react-router-dom";
import CreatedPIC from "./CreatedPIC";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const { confirm } = Modal;

function PIC({ mitraId }) {
  const [order, setOrder] = useState([]);
  const router = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [dataPagination, setDataPagination] = useState(0);
  const [DataMintraPIC, setDataEditMitraPIC] = useState("");
  const [Nama, setDataNama] = useState("");
  const [Telepon, setDataTelepon] = useState("");
  const [Email, setDataEmail] = useState("");
  const [Jabatan, setDataJabatan] = useState("");
  const [KTP, setDataKTP] = useState("");

  const handleShowModal = () => {
    setShowModal(true);
  };

  const initialValues = {
    nama: "",
    email: "",
    telpon: "",
    jabatan: "",
    ktp: "",
  };

  const createMitraPic = (values) => {
    axios
      .post("http://api.eurekalogistics.co.id/mitra/edit-mitra-pic", values)
      .then((response) => {
        console.log(response.data); // Replace with your desired logic for successful response
      })
      .catch((error) => {
        console.error(error); // Replace with your desired error handling logic
      });
  };

  const fetchDataDetail = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}mitra/get-mitra-pic?mitra_id=${mitraId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("response", response.data.data);
      setDataList(response.data.data);
      setDataPagination(response.data.total); // Jumlah data pagination
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataDetail();
  }, []);

  const handleSubmit = (values) => {
    createMitraPic(values);
  };

  let nomor = 1;

  const columns = [
    {
      name: "No.",
      selector: (row) => nomor++,
    },
    {
      name: "Nama",
      selector: (row) => row.nama,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Telp",
      selector: (row) => row.telepon,
    },
    {
      name: "Jabatan",
      selector: (row) => row.jabatan,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <>
          <Button size="sm" variant="primary" onClick={handleShowModal}>
            Edit
          </Button>
          {/* <Button onClick={handleDelete} size="sm" variant="danger">
            Hapus
          </Button> */}
        </>
      ),
    },
  ];

  // console.log(`ini`,mitraId);
  const handleAdd = () => {
    router.push(`/mastermitraPIC/${mitraId}`);
    // router.push(`/pelanggantarifcerate/`);
  };

  console.log();

  const EditMitraPIC = async () => {
    try {
      const data = {
        id_mitra_pic: mitraId,
        id_mitra: mitraId,
        nama: Nama,
        telepon: parseInt(Telepon),
        email: Email,
        jabatan: Jabatan,
        ktp: KTP,
      };

      const response = await axios.post(
        `${Baseurl}mitra/edit-mitra-pic`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      // If you want to update the state with the edited data, you can do so here.
      // For example:
      setDataEditMitraPIC(response.data); // Assuming the response contains the updated data

      // Check if the save operation was successful and redirect to the desired page
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

  return (
    <div>
      <Row>
        <Col span={8}>
          <h5>DATA PENANGGUNG JAWAB (Person In Charge)</h5>
        </Col>
        <Col span={16} className="d-flex justify-content-end">
          <Button onClick={handleAdd}>Tambah Data PIC</Button>
        </Col>
      </Row>
      <hr />
      <DataTable columns={columns} data={dataList} />
      <div className="mt-5 d-flex justify-content-end">
        <Pagination defaultCurrent={100} total={dataPagination} />
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Mitra PIC</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col span={24}>
            <label className="mt-2">Nama PIC :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "30px" }}>
              <Input
                className="mt-2"
                value={Nama}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataNama(e.target.value);
                }}
              />
            </div>
            </Col>
            <Col span={24}>
            <label className="mt-2">Email :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "30px" }}>
              <Input
                className="mt-2"
                value={Email}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataEmail(e.target.value);
                }}
              />
            </div>
            </Col>
            <Col span={24}>
            <label className="mt-2">Telp :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "30px" }}>
              <Input
                className="mt-2"
                value={Telepon}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataTelepon(e.target.value);
                }}
              />
            </div>
            </Col>
            <Col span={24}>
            <label className="mt-2">Jabatan :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "30px" }}>
              <Input
                className="mt-2"
                value={Jabatan}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataJabatan(e.target.value);
                }}
              />
            </div>
            </Col>
            <Col span={24}>
            <label className="mt-2">KTP :</label>
            {/* Menghubungkan input tarif dengan state tarif */}
            <div style={{ paddingRight: "30px" }}>
              <Input
                className="mt-2"
                value={KTP}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDataKTP(e.target.value);
                }}
              />
            </div>
            </Col>
          </Row>
          <Row>
          <Col span={24} className="d-flex justify-content-end mt-2">
            <Button type="primary">
              <span onClick={EditMitraPIC}>Save</span>
            </Button>
          </Col>
        </Row>
          {/* <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <div className="mb-3">
                <label htmlFor="nama" className="form-label">
                  Nama:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="nama"
                  name="nama"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <Field
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telpon" className="form-label">
                  Telpon:
                </label>
                <Field
                  type="tel"
                  className="form-control"
                  id="telpon"
                  name="telpon"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="jabatan" className="form-label">
                  Jabatan:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="jabatan"
                  name="jabatan"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ktp" className="form-label">
                  KTP:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="ktp"
                  name="ktp"
                />
              </div>
              <button onClick={EditMitraPIC} className="btn btn-primary">
                Submit
              </button>
            </Form>
          </Formik> */}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default PIC;
