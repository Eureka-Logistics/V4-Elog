import React, { useEffect, useState } from "react";
import Baseurl from "../../../../Api/BaseUrl";
import axios from "axios";
import { Card } from "react-bootstrap";
import {
  Button,
  Col,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { useHistory } from "react-router-dom";
import CreateMitraCabang from "./CreateMitraCabang";
import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined } from "@ant-design/icons";
import useBanksStore from "../../../../zustand/Store/NamaNamaBank";
import Swal from "sweetalert2";
import DetailEditMitraCabang from "./DetailEditMitraCabang";
import { Formik, Form } from "formik";
import { httpClient } from "../../../../Api/Api";

function GetMitraCabang(idmitra) {
  const router = useHistory();
  const [DataCabang, setDataCabang] = useState("");
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [semuaEdit, setsemuaEdit] = useState("");
  const [DataEditMitraCabang, setDataMitraCabang] = useState("");
  const [DataBank, setDataBank] = useState("");
  const [DataAccountName, setDataAccountName] = useState("");
  const [DataAccountNumber, setDataAccountNumber] = useState("");
  const [DataCabangPIC, setDataCabangPIC] = useState("");
  const [DataCabangEmail, setDataCabangEmail] = useState("");
  const [DataCabangTelp, setDataCabangTelp] = useState("");
  const { banks } = useBanksStore();
  const [DataEdit, setDataEdit] = ("");

  const initialValues = {
    bank: DataBank,
    account_name: DataAccountName,
    account_number: DataAccountNumber,
    cabang_pic: DataCabangPIC,
    cabang_email: DataCabangEmail,
    cabang_telp: DataCabangTelp,
  };

  const fetchDataDetail = async (pages = 1) => {
    try {
      const response = await axios.get(
        `${Baseurl}mitra/get-mitra-cabangRek?limit=${limit}&page=${pages}&id_mitra=${idmitra.mitraId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("Ini data  Cabang ", response.data.data.order);
      setDataCabang(response.data.data.order);
      setTotal(response.data.data.order.totalData);
      setsemuaEdit(response.data.data.order);
      //   setDataAccountNumber(response.data.data.order.account_name || "")
      // Jumlah data pagination
    } catch (error) {
      console.error(error);
    }
  };

  console.log(`mitraId`, idmitra.mitraId);

  useEffect(() => {
    fetchDataDetail();
  }, []);

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    // {
    //   title: "Nama Mitra",
    //   dataIndex: "mitra",
    //   key: "mitra",
    // },
    {
      title: "Nomor Rek",
      dataIndex: "account_number",
      key: "account_number",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Nama Cabang PIC",
      dataIndex: "cabang_pic",
      key: "cabang_pic",
    },
    {
      title: "Nama Akun Bank",
      dataIndex: "account_name",
      key: "account_name",
    },
    {
      title: "Email PIC",
      dataIndex: "cabang_email",
      key: "cabang_email",
    },
    {
      title: "Nomor PIC",
      dataIndex: "cabang_telp",
      key: "cabang_telp",
    },
    {
      title: "Aksi",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          {/* <Button
            onClick={() => handleView(record.idmitra.mitraId)}
            type="primary"
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <FormOutlined />
            </span>
          </Button> */}
          <Button
            size="sm"
            // variant="primary"
            style={{backgroundColor: '#1A5CBF'}}
            onClick={() => handleShowModal(record)}
          >
           <span style={{ display: "flex", alignItems: "center" }}>
              <FormOutlined style={{color: 'white'}}/>
            </span>
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <DeleteOutlined />
            </span>
          </Button>
        </Space>
      ),
    },
  ];

  const handleShowModal = (record) => {
    setShowModals(true);
    // console.log(record);
    setsemuaEdit(record);
    setDataCabangPIC(record.cabang_pic)
    setDataCabangEmail(record.cabang_email)
    setDataCabangTelp(record.cabang_telp)
    setDataAccountName(record.account_name)
    setDataAccountNumber(record.account_number)
    setDataBank(record.bank)

    console.log("ini data semua detail Cabang", record);
  };

  const ubahHalaman = (pages) => {
    fetchDataDetail(pages);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showModalss = () => {
    setIsModalVisible2(true);
  };

  const handleOk = () => {
    // Place your logic here to handle OK button click
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAdd = () => {
    router.push(`/CreatemastermitraCabang/${idmitra.mitraId}`);
    showModal();
  };

  const handleView = () => {
    router.push(`/EditmastermitraCabang/${idmitra.mitraId}`);
    console.log("ini id_bu", idmitra.mitraId);
  };

  const handleSubmit = (values) => {
    EditMitraCabang(values);
  };

  const EditMitraCabang = async () => {
    try {
      const data = {
        id: parseInt(semuaEdit.id),
        id_mitra: parseInt(semuaEdit.idmitra),
        bank: DataBank === null ? semuaEdit.bank : DataBank,
        account_name:
          DataAccountName === null ? semuaEdit.account_name : DataAccountName,
        account_number:
          DataAccountNumber === null
            ? semuaEdit.account_number
            : DataAccountNumber,
        cabang_pic:
          DataCabangPIC === null ? semuaEdit.cabang_pic : DataCabangPIC,
        cabang_email:
          DataCabangEmail === null ? semuaEdit.cabang_email : DataCabangEmail,
        cabang_telp:
          DataCabangTelp === null ? semuaEdit.cabang_telp : DataCabangTelp,
      };

      const response = await axios.post(
        `${Baseurl}mitra/edit-mitra-cabangRek`,
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
      setDataMitraCabang(response.data); // Assuming the response contains the updated data

      // Check if the save operation was successful and redirect to the desired page
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data has been saved",
          // footer: '<a href="">Why do I have this issue?</a>'
        });
        fetchDataDetail();
        setShowModals(false);
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

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Mitra?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        const datas = {
          id: id,
        };
        httpClient
          .post(`mitra/delete-mitra-cabangRek`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = DataCabang.filter((item) => item.id !== id);
              setDataCabang(newOrder);
              // Reload the data after successful deletion if necessary
              // fetchData();
              window.location.reload();
            }
          })
          .catch(function (error) {
            console.log(error.message);
          });
      },
      onCancel() {},
    });
  };

  return (
    <div>
      <div>
        <h5>Data Mitra Cabang</h5>
      </div>
      <Row>
        <Col span={24} className="d-flex justify-content-end">
          <Button
            style={{ backgroundColor: "#1A5CBF", color: "white" }}
            onClick={handleAdd}
          >
            New Mitra Cabang
          </Button>
        </Col>
      </Row>
      <Modal
        title={
          <span style={{ color: "#1A5CBF" }}>
            <h5 style={{ fontWeight: "bold" }}>Create Mitra Cabang</h5>
          </span>
        }
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        width={1000}
      >
        <CreateMitraCabang />
      </Modal>
      <div style={{ overflowX: "auto" }}>
        <Table
          className="mt-3"
          // onRowClicked={IniRowClick}
          dataSource={DataCabang}
          columns={columns}
          pagination={false}
          // pagination={{
          //   current: currentPage,
          //   pageSize: limit,
          //   total,
          //   onChange: (page) => setCurrentPage(page),
          // }}
          // onChange={(pagination) => {
          //   setCurrentPage(pagination.current);
          //   setLimit(pagination.pageSize);
          // }}
        />
      </div>
      <div className="mt-3 d-flex justify-content-end">
        <Pagination
          onChange={ubahHalaman}
          showSizeChanger
          // onShowSizeChange={ubahPerHalaman}
          defaultCurrent={100}
          total={total}
        />
      </div>
      <Modal
        title="Edit Mitra Cabang"
        width={"1000px"}
        visible={showModals}
        onCancel={() => setShowModals(false)}
        footer={null}
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Edit Mitra PIC</Modal.Title>
        </Modal.Header> */}

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <h5>Data Mitra PIC</h5>
            <hr />
            <Row>
              <Col span={8}>
                <div className="mb-3">
                  <label
                    style={{ fontWeight: "bold" }}
                    htmlFor="cabang_pic"
                    className="form-label"
                  >
                    Nama PIC :
                  </label>
                  <Input
                    value={
                        DataCabangPIC
                    }
                    onChange={(e) => {
                      console.log(e.target.value);
                      setDataCabangPIC(e.target.value)
                    }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div className="mb-3">
                  <label
                    style={{ fontWeight: "bold" }}
                    htmlFor="cabang_email"
                    className="form-label"
                  >
                    Email PIC :
                  </label>
                  <Input
                    value={
                        DataCabangEmail
                    }
                    onChange={(e) => {
                      console.log(e.target.value);
                      setDataCabangEmail(e.target.value)
                    }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div className="mb-3">
                  <label
                    style={{ fontWeight: "bold" }}
                    htmlFor="cabang_telp"
                    className="form-label"
                  >
                    Telepon PIC :
                  </label>
                  <Input
                    value={
                        DataCabangTelp
                    }
                    onChange={(e) => {
                      console.log(e.target.value);
                      setDataCabangTelp(e.target.value)
                    }}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <h5>Data Akun Bank PIC</h5>
            <hr />
            <Row>
              <Col span={8}>
                <div className="mb-3">
                  <label
                    style={{ fontWeight: "bold" }}
                    htmlFor="bank"
                    className="form-label"
                  >
                    Bank :
                  </label>
                  <Select
                    
                    showSearch
                    value={semuaEdit.bank}
                    optionFilterProp="value"
                    // placeholder={DataBank}
                    style={{ width: "100%" }}
                    onChange={(e, options) => {
                      // setIDCodeEmployee(options.key);
                      setDataBank(options.value);
                    }}
                  >
                    {banks &&
                      banks.map((i) => (
                        <select value={i.name}>{i.name}</select>
                      ))}
                  </Select>
                </div>
              </Col>
              <Col span={8}>
                <div className="mb-3">
                  <label
                    style={{ fontWeight: "bold" }}
                    htmlFor="account_name"
                    className="form-label"
                  >
                    Nama Akun Bank :
                  </label>
                  <Input
                    value={
                        DataAccountName
                    }
                    onChange={(e) => {
                      console.log(e.target.value);
                      setDataAccountName(e.target.value)
                    }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div className="mb-3">
                  <label
                    style={{ fontWeight: "bold" }}
                    htmlFor="account_number"
                    className="form-label"
                  >
                    Nomor Rekening :
                  </label>
                  <Input
                    value={
                        DataAccountNumber
                    }
                    onChange={(e) => {
                      console.log(e.target.value);
                      setDataAccountNumber(e.target.value)
                    }}
                  />
                </div>
              </Col>
            </Row>
            <button
              onClick={() => EditMitraCabang(semuaEdit)}
              className="btn btn-primary"
            >
              Submit
            </button>
          </Form>
        </Formik>

        {/* <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default GetMitraCabang;
