import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../Api/BaseUrl";
import { useHistory } from "react-router-dom";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { httpClient } from "../../../Api/Api";

function ListUser() {
  const router = useHistory();

  const [DataUser, setDataUser] = useState("");
  const [UserOptions, setUserOptions] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [Cabangs, setCabangs] = useState("");
  const [KodeCabangs, setKodeCabangs] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [SelectOptions, setSelectOptions] = useState("");
  const [cabangOptions, setCabangOptions] = useState([]);

  const fetchData = async () => {
    try {
      const respons = await axios.get(
        `${Baseurl}user/get-user?page=${currentPage}&limit=${limit}&keyword=${KodeCabangs}&divisi=${Cabangs}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("responssssscarismid", respons.data.data.order);
      setDataUser(respons.data.data.order);
      setTotal(respons.data.data.totalData);
    } catch (error) {}
  };

  const getDataSelectt = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}user/get-select-user?keyword1=&keyword=&keyword2=`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // setMuatKotaOptionsSelect (response.data);
      console.log("ini options select", response.data);
      setUserOptions(response.data);
      setCabangOptions(response.data.cabang);
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

  // const OptionsSelect = async () => {
  //   try {
  //     const respons = await axios.get(
  //       `${Baseurl}user/get-select-user?keyword1=&keyword=&keyword2=`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     console.log("responssssscarismid", respons.data);
  //     setSelectOptions(respons.data);
  //   } catch (error) {}
  // };

  useEffect(() => {
    fetchData();
    getDataSelectt();
    // OptionsSelect();
  }, [currentPage, limit, Cabangs, KodeCabangs]);

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },

    // {
    //   title: "User ID",
    //   dataIndex: "userId",
    //   key: "userId",
    //   render: (userId) => <Tag color="blue"> {userId}</Tag>,
    // },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Kode Cabang",
      dataIndex: "kode_cabang",
      key: "kode_cabang",
    },

    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Level User",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Perusahaan",
      dataIndex: "perusahaan",
      key: "perusahaan",
    },
    {
      title: "Divisi",
      dataIndex: "divisi",
      key: "divisi",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "No Telepon",
      dataIndex: "no_telp",
      key: "no_telp",
    },
    {
      title: "Aksi",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          <Button
            style={{ backgroundColor: "#1a5cbf", color: "white" }}
            onClick={() => handleShowModal(record)}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <FormOutlined />
            </span>
            {/* <DeleteOutlined /> */}
          </Button>

          <Button danger onClick={() => handleDelete(record.userId)}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <DeleteOutlined />
            </span>
            {/* <DeleteOutlined /> */}
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    router.push(`/NewListDataUsers/`);
    // router.push(`/pelanggantarifcerate/`);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Yakin untuk menghapus tarif ini?",
      icon: <ExclamationCircleOutlined />,
      content: "Tindakan ini tidak dapat dibatalkan.",
      onOk() {
        const datas = {
          id: id,
        };
        httpClient
          .post(`user/del-user`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = DataUser.filter((item) => item.userId !== id);
              setDataUser(newOrder);
              // Reload the data after successful deletion if necessary
              fetchData();
              // window.location.reload();
            }
          })
          .catch(function (error) {
            console.log(error.message);
          });
      },
      onCancel() {},
    });
  };

  // const handleShowModal = (user) => {
  //   setSelectedUser(user);
  //   setIsModalVisible(true);
  // };

  // Function to handle hiding the modal
  const handleHideModal = () => {
    setSelectedUser(null);
    setIsModalVisible(false);
  };

  const [formData, setFormData] = useState({
    id: "",
    username: "",
    nama_lengkap: "",
    email: "",
    no_telp: "",
    id_cabang: "",
    perusahaan: "",
    kode_cabang: "",
    level: "",
    divisi: "",
    user_level: "",
    user_group: "",
  });

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setFormData({
      id: user.userId,
      username: user.username,
      nama_lengkap: user.fullname,
      email: user.email,
      no_telp: user.no_telp,
      id_cabang: user.id_cabang,
      perusahaan: user.perusahaan,
      kode_cabang: user.kode_cabang,
      level: user.level,
      divisi: user.divisi,
      user_level: user.user_level,
      user_group: user.user_group,
    });
    setIsModalVisible(true);
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission (API call)
  const handleEditUser = () => {
    const editUserData = {
      id: selectedUser.userId,
      ...formData,
    };

    axios
      .post(`${Baseurl}user/edit-user`, editUserData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.status.code === 200) {
          // Handle success, update UI or take any other necessary actions
          console.log("User edited successfully");
          fetchData(); // Refresh data after editing
          handleHideModal();
        } else {
          // Handle error
          console.error("Failed to edit user:", response.data.status.message);
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error("Error editing user:", error.message);
      });
  };

  return (
    <div>
      <Card>
        <h5>Data List User</h5>
        <hr />
        <Row>
          <Col span={6}>
            <label
              className="mb-3"
              style={{ fontWeight: "bold", fontFamily: "NoirPro" }}
            >
              Search Divisi :
            </label>
            <Select
              value={Cabangs}
              name="levelUser"
              optionFilterProp="children"
              showSearch
              style={{
                width: "100%",
                border: "1px solid #1A5CBF",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
              onChange={(e, options) => {
                console.log(options);
                setCabangs(options.value);
              }}
            >
              <Select.Option value="">-</Select.Option>
              {UserOptions &&
                UserOptions.levelUser.map((item, index) => (
                  <Select.Option value={item.levelUser}>
                    {item.levelUser}
                  </Select.Option>
                ))}
            </Select>
          </Col>

          {/* <Col span={18} className="d-flex justify-content-end mt-4">
            <Button
              style={{ backgroundColor: "#1A5CBF", color: "white" }}
              onClick={handleAdd}
            >
              New User
            </Button>
          </Col> */}
        </Row>

        <Table
          className="mt-3"
          // pagination={false}
          style={{ overflowX: "auto" }}
          dataSource={DataUser}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: limit,
            total,
            onChange: (page) => setCurrentPage(page),
          }}
          onChange={(pagination) => {
            setCurrentPage(pagination.current);
            setLimit(pagination.pageSize);
          }}
        />
      </Card>

      <Modal
        width={800}
        title="Edit Detail Users"
        visible={isModalVisible}
        onCancel={handleHideModal}
        footer={[
          <Button key="cancel" onClick={handleHideModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleEditUser}>
            Save
          </Button>,
        ]}
      >
        {/* Render form inputs for editing user details */}
        {selectedUser && (
          <div>
            <Row>
              <Col span={4}>
                <label htmlFor="userId" className="form-label mt-2">
                  User ID
                </label>
                <Input
                  value={formData.id}
                  onChange={(e) => handleInputChange("id", e.target.value)}
                  disabled
                />
              </Col>
              <Col span={8}>
                <label htmlFor="username" className="form-label mt-2">
                  Username
                </label>
                <Input
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                />
              </Col>
              <Col span={12}>
                <label htmlFor="nama_lengkap" className="form-label mt-2">
                  Full Name
                </label>
                <Input
                  value={formData.nama_lengkap}
                  onChange={(e) =>
                    handleInputChange("nama_lengkap", e.target.value)
                  }
                />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <label htmlFor="email" className="form-label mt-2">
                  Email
                </label>
                <Input
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </Col>
              <Col span={12}>
                <label htmlFor="no_telp" className="form-label mt-2">
                  Phone Number
                </label>
                <Input
                  value={formData.no_telp}
                  onChange={(e) => handleInputChange("no_telp", e.target.value)}
                />
              </Col>
            </Row>

            <Row>
              {/* <Col span={12}>
                <label htmlFor="id_cabang" className="form-label mt-2">
                  Branch ID
                </label>
                <Input
                  value={formData.id_cabang}
                  onChange={(e) => handleInputChange('id_cabang', e.target.value)}
                />
              </Col> */}
            </Row>
            <Row>
              <Col span={12}>
                <label htmlFor="perusahaan" className="form-label mt-2">
                  Perusahaan
                </label>
                <Input
                  value={formData.perusahaan}
                  onChange={(e) =>
                    handleInputChange("perusahaan", e.target.value)
                  }
                />
              </Col>
              <Col span={12}>
                <label htmlFor="kode_cabang" className="form-label mt-2">
                  Kode Cabang
                </label>
                <Select
                 showSearch
                 style={{ width: "100%" }}
                  value={formData.kode_cabang}
                  onChange={(value) => handleInputChange("kode_cabang", value)}
                >
                  {cabangOptions.map((cabang) => (
                    <Select.Option key={cabang.id} value={cabang.kodecabang}>
                      {cabang.kodecabang}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row></Row>
            <Row>
              <Col span={12}>
                <label htmlFor="level" className="form-label mt-2">
                  Level
                </label>
                
                <Input
                  value={formData.level}
                  onChange={(e) => handleInputChange("level", e.target.value)}
                />
              </Col>
              <Col span={12}>
                <label htmlFor="divisi" className="form-label mt-2">
                  Divisi
                </label>
                
                <Input
                  value={formData.divisi}
                  onChange={(e) => handleInputChange("divisi", e.target.value)}
                />
              </Col>
            </Row>
            <Row></Row>
            {/* <Row>
              <Col span={12}>
                <label htmlFor="user_level" className="form-label mt-2">
                  User Level
                </label>
                <Input
                  value={formData.user_level}
                  onChange={(e) => handleInputChange('user_level', e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <label htmlFor="user_group" className="form-label mt-2">
                  User Group
                </label>
                <Input
                  value={formData.user_group}
                  onChange={(e) => handleInputChange('user_group', e.target.value)}
                />
              </Col>
            </Row> */}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ListUser;
