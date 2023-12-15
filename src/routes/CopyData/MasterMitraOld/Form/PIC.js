import React, { useEffect, useState } from "react";
import { Button, Row, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import Baseurl from "../../../../Api/BaseUrl";
import { Col, Input, Pagination, Space } from "antd";
import { useHistory } from "react-router-dom";
import CreatedPIC from "./CreatedPIC";
import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const { confirm } = Modal;

function PIC({ mitraId }) {
  const [semuaEdit, setsemuaEdit] = useState("");
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

  const handleShowModal = (row) => {
    setShowModal(true);
    console.log(row);
    setsemuaEdit(row);
    setDataNama(row.nama);
    setDataTelepon(row.telepon);
    setDataEmail(row.email);
    setDataJabatan(row.jabatan);
    setDataKTP(row.ktp)
  };

  const initialValues = {
    nama: Nama,
    email: Email,
    telpon: Telepon,
    jabatan: Jabatan,
    ktp: KTP,
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
  console.log(`mitraId`, mitraId);

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
      // console.log("response", response.data.data);
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
      width: '10%',
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
          <Button
            size="md"
            variant="primary"
            className="mt-2"
            onClick={() => handleShowModal(row)}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
                <FormOutlined />
              </span>
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
        id_mitra_pic: parseInt(semuaEdit.id_mitra_pic),
        id_mitra: parseInt(mitraId),
        nama: Nama === null ? semuaEdit.nama : Nama,
        telepon: Telepon === null ? semuaEdit.telepon : Telepon,
        email: Email === null ? semuaEdit.email : Email,
        jabatan: Jabatan === null ? semuaEdit.jabatan : Jabatan,
        ktp: KTP === null ? semuaEdit.ktp : KTP,
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
          text: "Data has been saved",
          // footer: '<a href="">Why do I have this issue?</a>'
        });
        fetchDataDetail();
        setShowModal(false);
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
    }
  };

  return (
    <div>
      <Row gutter={[16,16]}> 
        <Col  xs={24}
            sm={24}
            md={8}
            lg={8}>
          <h5>DATA PENANGGUNG JAWAB (Person In Charge)</h5>
        </Col>
        <Col  xs={24}
            sm={24}
            md={16}
            lg={16} className="d-flex justify-content-end">
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
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <div className="mb-3">
                <label htmlFor="nama" className="form-label">
                  Nama:
                </label>
                <Input
                  value={Nama === "" ? semuaEdit.nama : Nama}
                  onChange={(e) => {
                    console.log(e.target.value);
                    if (e.target.value === "") {
                      setDataNama(semuaEdit.nama);
                      setDataNama(null);
                    } else {
                      setDataNama(e.target.value);
                    }
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <Input
                  value={Email === "" ? semuaEdit.email : Email}
                  onChange={(e) => {
                    console.log(e.target.value);
                    if (e.target.value === "") {
                      setDataEmail(semuaEdit.email);
                      setDataEmail(null);
                    } else {
                      setDataEmail(e.target.value);
                    }
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telpon" className="form-label">
                  Telpon:
                </label>
                <Input
                  value={Telepon === "" ? semuaEdit.telepon : Telepon}
                  onChange={(e) => {
                    console.log(e.target.value);
                    if (e.target.value === "") {
                      setDataTelepon(semuaEdit.telepon);
                      setDataTelepon(null);
                    } else {
                      setDataTelepon(e.target.value);
                    }
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="jabatan" className="form-label">
                  Jabatan:
                </label>
                
                <Input
                  value={Jabatan === "" ? semuaEdit.jabatan : Jabatan}
                  onChange={(e) => {
                    console.log(e.target.value);
                    if (e.target.value === "") {
                      setDataJabatan(semuaEdit.jabatan);
                      setDataJabatan(null);
                    } else {
                      setDataJabatan(e.target.value);
                    }
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ktp" className="form-label">
                  KTP:
                </label>
                <Input 
                 value={KTP === "" ? semuaEdit.ktp : KTP}
                 onChange={(e) => {
                   console.log(e.target.value);
                   if (e.target.value === "") {
                     setDataKTP(semuaEdit.ktp);
                     setDataKTP(null);
                   } else {
                     setDataKTP(e.target.value);
                   }
                 }} />
              </div>
              <button
                onClick={() => EditMitraPIC(semuaEdit)}
                className="btn btn-primary"
              >
                Submit
              </button>
            </Form>
          </Formik>
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
