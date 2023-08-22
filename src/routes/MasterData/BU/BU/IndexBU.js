import axios from "axios";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../../Api/BaseUrl";
import { Card, Space, Table, Tag, Button, Col, Row, Modal } from "antd";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../../../Api/Api";
import CreateBU from "./CreateBU";

function IndexBU() {
  const router = useHistory();
  const [GetDataBU, setDataBU] = useState("");
  const [listData, setListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleView = (buId) => {
    router.push(`/dataBisnisUnit/${buId}`);
    console.log("ini id_bu", buId);
  };

  const fetchData = async () => {
    try {
      const respons = await axios.get(
        `${Baseurl}bu/get-bu?limit=${limit}&page=${currentPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      //   console.log("responssssscarismid", respons.data.data);

      setDataBU(respons.data.data.order);
      console.log("ini data BU", respons.data.data.order);
      //   setSJList(respons.data?.data?.sj);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, limit]);

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Kode Bisnis Unit",
      dataIndex: "buCode",
      key: "buCode",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Nama Bisnis Unit",
      dataIndex: "buName",
      key: "buName",
    },
    {
      title: "CBU",
      dataIndex: "cbu",
      key: "cbu",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === 1 ? 'green' : 'red'}>
          {status === 1 ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: "Aksi",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleView(record.buId)} type="primary">
            <span style={{ display: "flex", alignItems: "center" }}>
              <FormOutlined />
            </span>
          </Button>
          <Button danger onClick={() => handleDelete(record.buId)}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <DeleteOutlined />
            </span>
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    // router.push(`/createdataBU/`);
    // router.push(`/pelanggantarifcerate/`);
    showModal();
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

  const handleDelete = (buId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Tarif?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        const datas = {
          id_bu: buId,
        };
        httpClient
          .post(`bu/delete-bu`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = listData.filter((item) => item.id_bu !== buId);
              setListData(newOrder);
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
      <Card>
        <h5 style={{fontWeight:'bold'}}>Data Bisnis Unit</h5>
        <hr />
        <Row>
          <Col span={24} className="d-flex justify-content-end">
            <Button style={{backgroundColor: '#1A5CBF', color: 'white'}} onClick={handleAdd}>New Bisnis Unit</Button>
          </Col>
        </Row>
        <Modal
          title={<span style={{ color: "#1A5CBF" }}><h5 style={{fontWeight: 'bold'}}>New Bisnis Unit</h5></span>}
          visible={isModalVisible}
          footer={null}
          onCancel={() => setIsModalVisible(false)}
        >
          <CreateBU />
        </Modal>
        <div style={{ overflowX: "auto" }}>
          <Table
            className="mt-3"
            // onRowClicked={IniRowClick}
            dataSource={GetDataBU}
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
        </div>
      </Card>
    </div>
  );
}

export default IndexBU;
