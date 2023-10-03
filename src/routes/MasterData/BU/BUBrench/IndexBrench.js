import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Baseurl from '../../../../Api/BaseUrl';
import { Button, Card, Col, Modal, Pagination, Row, Space, Table, Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined } from '@ant-design/icons';
import { httpClient } from '../../../../Api/Api';
import CreateBuBrench from './CreateBuBrench';

function IndexBrench() {
  const router = useHistory();
  const [DataBrench, setDataBrench] = useState("");
  const [total, setTotal] = useState(0);
  const [limits, setLimits] = useState(5);
  const [page, setPage] = useState("");
  const [listData, setListData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const fetchData = async (pages = 1) => {
    try {
      const respons = await axios.get(
        `${Baseurl}bu/get-bu-brench?limit=${limits}&page=${pages}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setDataBrench(respons.data.data.order);
      console.log("ini data BU", respons.data.data);
      setTotal(respons.data.data.order.totalData);
      setLimits(respons.data.data.limit)
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
      title: "Bu Brench ID",
      dataIndex: "bubrenchId",
      key: "bubrenchId",
      render: (text) => <Tag color="magenta">{text}</Tag>,
    },
    {
      title: "Bisnis Unit Kode",
      dataIndex: "buCode",
      key: "buCode",
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      key: "alamat",
    },
    {
      title: "No Telp",
      dataIndex: "noTelp",
      key: "noTelp",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === 1 ? 'green' : 'red'}>
          {status === 1 ? 'Aktif' : 'Tidak Aktif'}
        </Tag>
      ),
    },
   
    {
      title: "Aksi",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleView(record.bubrenchId)} type="primary">
            <span style={{ display: "flex", alignItems: "center" }}>
              <FormOutlined />
            </span>
          </Button>
          <Button danger onClick={() => handleDelete(record.bubrenchId)}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <DeleteOutlined />
            </span>
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    // router.push(`/CreatedDataBuBrench/`);
    // router.push(`/pelanggantarifcerate/`);
    showModal();
  };
  const ubahHalaman = (pages) => {
    fetchData(pages);
  };

  const handleView = (bubrenchId) => {
    router.push(`/DetailBuBrench/${bubrenchId}`);
    console.log("ini id_bu", bubrenchId);
  };

  const handleDelete = (bubrenchId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Tarif?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        const datas = {
          id_bu_brench: bubrenchId,
        };
        httpClient
          .post(`bu/delete-bu-brench`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = listData.filter((item) => item.id_bu_brench !== bubrenchId);
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
          Data Bisnis Unit Brench 
        </h5>
        <hr />
      <Row>
          <Col span={24} className="d-flex justify-content-end">
            <Button style={{backgroundColor: '#1A5CBF', color: 'white'}} onClick={handleAdd}>New BU Brench</Button>
          </Col>
        </Row>
        <Modal
          title={<span style={{ color: "#1A5CBF" }}><h5 style={{fontWeight: 'bold'}}>Create Bisnis Unit Brench</h5></span>}
          visible={isModalVisible}
          footer={null}
          onCancel={() => setIsModalVisible(false)}
        >
          <CreateBuBrench />
        </Modal>
        <div style={{ overflowX: "auto" }}>
          <Table
            className="mt-3"
            // onRowClicked={IniRowClick}
            dataSource={DataBrench}
            columns={columns}
            pagination={false}
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

export default IndexBrench
