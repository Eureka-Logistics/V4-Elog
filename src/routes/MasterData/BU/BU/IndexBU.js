import axios from "axios";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../../Api/BaseUrl";
import { Card, Space, Table, Tag, Button, Col, Row, Modal, Switch } from "antd";
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

  const handleView = (id) => {
    router.push(`/dataBisnisUnit/${id}`);
    console.log("ini id_bu", id);
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
    } catch (error) { }
  };

  const aktifstatus = async (asu) => {
    try {
      const respons = await axios.post(
        `${Baseurl}bu/active-bu`, {
        "id": asu
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("responssssscarismid", respons.data.data);
      fetchData()
      setDataBU(respons.data.data.order);
      console.log("ini data BU", respons.data.data.order);
      //   setSJList(respons.data?.data?.sj);
    } catch (error) { }
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
      title: "Kode BU",
      dataIndex: "buId",
      key: "buId",
      render: (buId) => <Tag color="magenta">{buId}</Tag>,
    },
    {
      title: "Nama Alias",
      dataIndex: "cbu",
      key: "cbu",
      render: (cbu) => <Tag color="blue">{cbu}</Tag>,
    },
    {
      title: "Nama Bisnis Unit",
      dataIndex: "buName",
      key: "buName",
    },

    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        const handleSwitchChange = () => {
          console.log(`sstauts`, record.id)
          if (status === 1) {
            handleDelete(record.id);
          } else {
            aktifstatus(record.id);
          }
        };

        return (
          <Switch
            checked={status === 1}
            unCheckedChildren={status !== 1 ? "in active" : ""}
            checkedChildren={status === 1 ? "active" : ""}
            onClick={handleSwitchChange}
          />
        );
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
        </Space>
      ),
    },
  ];
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
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

  const handleDelete = (id) => {
    const datas = {
      id: id,
    };
    httpClient
      .post(`bu/delete-bu`, datas)
      .then(({ data }) => {
       console.log(`data`,data);
       fetchData()
      })
      .catch(function (error) {
        console.error(`Terjadi kesalahan saat mengirim permintaan penghapusan: ${error.message}`);
      });
  };


  return (
    <div>
      <Card>
        <h5 style={{ fontWeight: 'bold' }}>Data Bisnis Unit</h5>
        <hr />
        <Row>
          <Col span={24} className="d-flex justify-content-end">
            <Button style={{ backgroundColor: '#1A5CBF', color: 'white' }} onClick={handleAdd}>New Bisnis Unit</Button>
          </Col>
        </Row>
        <Modal
          title={<span style={{ color: "#1A5CBF" }}><h5 style={{ fontWeight: 'bold' }}>New Bisnis Unit</h5></span>}
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
