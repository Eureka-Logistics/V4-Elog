import { Button, Card, Col, Pagination, Row, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import Baseurl from '../../../../Api/BaseUrl';
import axios from 'axios';
import { FormOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

function Index() {
  const router = useHistory();
  const [DataBuEmployeePosition, setDataBuEmployeePosition] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [listData, setListData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleView = (id) => {
    router.push(`/DataBuEmployeePositionEditDetail/${id}`);
    console.log("ini id_bu", id);
  };

  
  const fetchData = async (pages = 1) => {
    try {
      const respons = await axios.get(
        `${Baseurl}bu/get-bu-employee-position?limit=${limit}&page=${pages}&keyword=`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

     
      console.log("ini data BU", respons.data.data.order);
      setDataBuEmployeePosition(respons.data.data.order);
      setLimit(respons.data.data.limit);
      setTotal(respons.data.data.totalData);
      //   setSJList(respons.data?.data?.sj);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    router.push(`/CreateBuEmployeePositionEditDetail/`);
    // router.push(`/pelanggantarifcerate/`);
    // showModal();
  };

  const ubahHalaman = (pages) => {
    fetchData(pages);
  };


  return (
    <div>
     <Card>
      <h5>
        Data BU Employee Position
      </h5>
      <hr />
      <Row>
          <Col span={24} className="d-flex justify-content-end">
            <Button style={{backgroundColor: '#1A5CBF', color: 'white'}} onClick={handleAdd}>New Position</Button>
          </Col>
        </Row>
      <div style={{ overflowX: "auto" }}>
          <Table
            className="mt-3"
            // onRowClicked={IniRowClick}
            dataSource={DataBuEmployeePosition}
            columns={columns}
            pagination={false }
          />
        </div>
        <div className="mt-3 d-flex justify-content-end">
          <Pagination
            onChange={ubahHalaman}
            showSizeChanger
            // onShowSizeChange={ubahPerHalaman}
            defaultCurrent={1}
            total={total}
          />
        </div>
     </Card>
    </div>
  )
}

export default Index
