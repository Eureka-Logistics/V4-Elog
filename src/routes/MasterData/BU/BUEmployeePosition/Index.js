import {
  Button,
  Card,
  Col,
  Pagination,
  Row,
  Space,
  Table,
  Tag,
  Modal,
  Alert,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../../Api/BaseUrl";
import axios from "axios";
import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import CreateBUEmployee from "../BUEmployee/CreateBUEmployee";
import CreateEmployeePosition from "./CreateEmployeePosition";
import AddNewPosition from "./AddNewPosition";
import { httpClient } from "../../../../Api/Api";

function Index() {
  const router = useHistory();
  const [DataBuEmployeePosition, setDataBuEmployeePosition] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [listData, setListData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Pagginatios, setPagginations] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState([]);
  const [apaIni, setapaIni] = useState("");
  const [customer, setCustomer] = useState("Pilih Customer");
  const [selectedValue, setSelectedValue] = useState(null);

  const handleView = (id) => {
    router.push(`/DataBuEmployeePositionEditDetail/${id}`);
    console.log("ini id_bu", id);
  };

  const handleAdds = () => {
    router.push(`/mastermitraPIC/`);
    // router.push(`/pelanggantarifcerate/`);
  };

  const fetchData = async (page = 1) => {
    try {
      const respons = await axios.get(
        `${Baseurl}bu/get-bu-employee-position?limit=${limit}&page=${page}&filter=${selectedValue}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log("ini data BU", respons.data.data.order);
      setDataBuEmployeePosition(respons.data.data.order);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDataSelectt = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}bu/get-employee-position-filter`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // setMuatKotaOptionsSelect (response.data);
      console.log(response.data.filter);
      setFilter(response.data.filter);

      // Cek apakah permintaan berhasil (kode status 200-299)
      if (response.status >= 200 && response.status < 300) {
        // Mengembalikan data yang diterima dari permintaan
        return response.data;
      } else {
        // Menangani situasi ketika permintaan tidak berhasil (status error)
        throw new Error("Permintaan tidak berhasil.");
      }
    } catch (error) {
      // Menangani kesalahan jaringan atau kesalahan lain yang terjadi selama permintaan
      console.error("Kesalahan saat mengambil data:", error.message);
      throw error; // Lanjutkan penanganan kesalahan di tempat lain jika perlu
    }
  };

  useEffect(() => {
    fetchData();
    getDataSelectt();
  }, [limit, apaIni, selectedValue]);

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Kode",
      dataIndex: "code",
      key: "code",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Nama Atasan",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        if (text === "" || text === "-") {
          return (
            <span>
              <Tag color="red" onClick={() => showInformation(record?.code)}>
                Tambah Nama Atasan
              </Tag>
            </span>
          );
        } else {
          return (
            <span>
              <Tag color="green"> {text} </Tag>{" "}
              <Tag
                style={{ marginLeft: "2px" }}
                color="red"
                onClick={() => handleDelete(record.employeeId)}
              >
                x
              </Tag>
            </span>
          );
        }
      },
    },
    {
      title: "Aksi",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleView(record.id)} type="primary">
            <span style={{ display: "flex", alignItems: "center" }}>
              <FormOutlined />
            </span>
          </Button>
          {/* <Button danger onClick={() => handleDelete(record.buId)}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <DeleteOutlined />
            </span>
          </Button> */}
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    // router.push(`/CreateBuEmployeePositionEditDetail/`);
    // router.push(`/pelanggantarifcerate/`);
    showModal();
  };

  const ubahHalaman = (pages) => {
    fetchData(pages);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showInformation = (record) => {
    console.log(`test`, record);
    const closeModal = () => {
      Modal.destroyAll();
    };
    Modal.info({
      title: "Input Nama Atasan",
      content: (
        <div>
          <div
            type="default"
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "30px",
              zIndex: 1, // Pastikan tombol "X" ada di atas modal
            }}
          >
            <CloseCircleOutlined style={{ fontSize: "20px" }} />
          </div>
          <AddNewPosition
            fetchData={fetchData}
            closeModal={closeModal}
            record={record}
          />
        </div>
      ),
      okButtonProps: { style: { display: "none" } },
    });
  };

  const showDeleteConfirmationModal = (record) => {
    Modal.confirm({
      title: "Konfirmasi Hapus Data",
      content: `Anda yakin ingin menghapus data employee bernama ${record.name}?`,
      okText: "Yakin",
      okType: "danger",
      cancelText: "Batal",
      onOk: () => handleDelete(record.employeeId), // Panggil fungsi handleDelete dengan ID employee
    });
  };

  const handleDelete = (employeeId) => {
    Modal.confirm({
      title: "Klik 'OK' untuk menghapus Data !",
      icon: <ExclamationCircleOutlined />,
      content: "Klik 'Cancel' jika tidak jadi untuk menghapus data",
      onOk() {
        const datas = {
          id_employee: employeeId,
        };
        httpClient
          .post(`bu/del-employee-position`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = listData.filter(
                (item) => item.id_employee !== employeeId
              );
              setListData(newOrder);
              fetchData();
              // Reload the data after successful deletion if necessary
              // fetchData();
            }
          })
          .catch(function (error) {
            console.log(error.message);
          });
      },
      onCancel() {},
    });
  };

  const alertStyle = {
    fontFamily: "NoirPro", // Replace this with your desired font-family
    fontSize: "16px", // Replace this with your desired font size
     // Replace this with your desired font weight
    color: "black", // Replace this with your desired text color
  };

  return (
    <div>
      <Card>
        <h5 style={{ fontWeight: "bold" }}>Data BU Employee Position</h5>
        <hr />
        <Row>
          
        </Row>
        <Row className=" mb-3">
          <Col span={4}>
            <label style={{fontFamily: 'NoirPro'}}>
              Pilih Kode Employee
            </label>
            <Select
              // value={apaIni}
              className="mt-2"
              showSearch
              optionFilterProp="children"
              placeholder="Select Kode"
              style={{ width: "100%" }}
              onChange={(value) => {
                setSelectedValue(value);
              }}
            >
              {filter.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.position}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={20} className="d-flex justify-content-end">
            <Button
              style={{ backgroundColor: "#1A5CBF", color: "white" }}
              onClick={handleAdd}
            >
              New Position
            </Button>
          </Col>
        </Row>
        {selectedValue ? (
          <Table
            style={{ width: "100%", overflow: "auto" }}
            dataSource={DataBuEmployeePosition}
            columns={columns}
            pagination={{
              total: Pagginatios?.DataBuEmployeePosition,
              current: page,
              pageSize: limit,
            }}
            onChange={(pagination) => setPage(pagination.current)}
          />
          
        ) : (
          <div style={alertStyle}>
            <Alert
              message="Pilih terlebih dahulu Kode Employeenya, Jika A (Asmen), M (Manager), G (GL), K (KACAB), D (Direktur) !"
              type="info"
              showIcon
            />
          </div>
        )}
        <Modal
          title={
            <span style={{ color: "#1A5CBF" }}>
              <h5 style={{ fontWeight: "bold" }}> Create Employee Position</h5>
            </span>
          }
          visible={isModalVisible}
          footer={null}
          onCancel={() => setIsModalVisible(false)}
        >
          <CreateEmployeePosition />
        </Modal>
        
        {/* <div style={{ overflowX: "auto" }}>
          <Table
            className="mt-3"
            dataSource={DataBuEmployeePosition}
            columns={columns}
            pagination={false}
          />
        </div>
        <div className="mt-3 d-flex justify-content-end">
          <Pagination
            onChange={ubahHalaman}
            showSizeChanger
            defaultCurrent={1}
            total={total}
          />
        </div> */}
        
      </Card>
    </div>
  );
}

export default Index;