import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Baseurl from '../../../../Api/BaseUrl';
import { Button, Card, Col, Pagination, Row, Space, Table, Tag, Modal, Input } from 'antd';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import CreateBUEmployee from './CreateBUEmployee';

function IndexEmployee() {
  const router = useHistory();
  const [DataBuEmployeeAll, setBuEmployeeAll] = useState("");
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [CariNamaBu, setCariNamaBu] = useState("");
  const handleView = (idEmploye) => {
    router.push(`/EditDetailEmployeeBU/${idEmploye}`);
    console.log("ini id_bu", );
  };

  const handleAdd = () => {
    // router.push(`/CreateDataEmployee/`);
    // router.push(`/pelanggantarifcerate/`);
    showModal();
  };
  
  const fetchData = async (pages = 1) => {
    try {
      const respons = await axios.get(
        `${Baseurl}bu/get-bu-employee?limit=${limit}&page=${pages}&keyword=${CariNamaBu}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setTotal(respons.data.data.totalData);
      //   console.log("responssssscarismid", respons.data.data);

      // setDataBU(respons.data.data.order);
      setBuEmployeeAll(respons.data.data.order);
      console.log("ini data BU", respons.data.data);
      //   setSJList(respons.data?.data?.sj);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, [CariNamaBu]);

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Kode Employee",
      dataIndex: "employeCode",
      key: "employeCode",
      render: (text) => <Tag color="magenta">{text}</Tag>,
    },
    // {
    //   title: "Bisnis Unit",
    //   dataIndex: "BU",
    //   key: "BU",
    // },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text, record) => <img src={record.photo} alt="Employee Photo" />,
    },
    {
      title: "Level JOB",
      dataIndex: "levelJob",
      key: "levelJob",
    },
   
    {
      title: "Aksi",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleView(record.idEmploye)} type="primary">
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

  const ubahHalaman = (pages) => {
    fetchData(pages);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Place your logic here to handle OK button click
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  

  return (
    <div>
     <Card>
      <h5 style={{fontWeight:'bold'}}>
        Data Bisnis Unit Employee
      </h5>
      <hr />
      <Row gutter={[16,16]}>
      <Col xs={24} sm={12} md={6} lg={6}>
        <label style={{width: '100%', fontWeight: 'bold', fontFamily: 'NoirPro'}} className='mb-2'>
          Search Employee Name :
        </label>
            <Input
              style={{
                width: "100%",
                border: "1px solid #1A5CBF",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
              onChange={(e) => {
                setCariNamaBu(e.target.value);
              }}
              placeholder="Search Employee Name"
            ></Input>
          </Col>
          <Col xs={24} sm={12} md={12} lg={18} className="d-flex justify-content-end">
            <Button style={{backgroundColor: '#1A5CBF', color: 'white'}} onClick={handleAdd}>New Bisnis Unit</Button>
          </Col>
        </Row>
        <Modal
          title={<span style={{ color: "#1A5CBF" }}><h5 style={{fontWeight: 'bold'}}>Create Bisnis Unit Employee</h5></span>}
          visible={isModalVisible}
          footer={null}
          onCancel={() => setIsModalVisible(false)}
          width={1200}
        >
          <CreateBUEmployee />
        </Modal>
      <div style={{ overflowX: "auto" }}>
          <Table
            className="mt-3"
            // onRowClicked={IniRowClick}
            dataSource={DataBuEmployeeAll}
            columns={columns}
            pagination={false}
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
     </Card>
    </div>
  )
}

export default IndexEmployee
