import React, { useEffect, useState } from "react";
import { Button, Card, Input, Space, Modal, Tag , Table} from "antd";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../../Api/Api";
// import { Table } from "react-bootstrap";

const { confirm } = Modal;

const SamplePage = () => {
  const router = useHistory();
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const handleAdd = (id) => {
    router.push(`/mastercustomersssAdd/`);
  };

  const handleDetail = (id) => {
    router.push(`/mastercustomer/detail/${id}`);
  };

  const handleEdit = (id) => {
    // router.push(`/mastercustomer/edit/${id}`);
    // router.push(`/mastercustomerssDetail/${id}`);
    router.push(`/MastersCustomersDetails/${id}`);
  };

  const [order, setOrder] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [nameFilter, setNameFilter] = useState(null);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Kode",
      dataIndex: "custCode",
      key: "custCode",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Perusahaan",
      dataIndex: "custName",
      key: "custName",
    },
    {
      title: "Barang",
      dataIndex: "custStuff",
      key: "custStuff",
    },
    {
      title: "Nomor Telepon",
      dataIndex: "custTelephone",
      key: "custTelephone",
    },
    {
      title: "Barang",
      dataIndex: "custStuff",
      key: "custStuff",
    },
    {
      title: "Nomor Telepon",
      dataIndex: "custTelephone",
      key: "custTelephone",
    },
    {
      title: "Action",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          {/* <Button onClick={() => handleDetail(record.custId)} type="primary">
            View
          </Button> */}
          <Button onClick={() => handleEdit(record.custId)} type="primary">
            <span style={{ display: "flex", alignItems: "center" }}>
              <FormOutlined />
            </span>
          </Button>
          <Button danger onClick={() => handleDelete(record.custId)}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <DeleteOutlined />
            </span>
            {/* <DeleteOutlined /> */}
          </Button>
          {/* <Button onClick={() => handleEdit(record.custId)} type="primary">
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.custId)} type="danger">
            Delete
          </Button> */}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    httpClient
      .get(`customer/get-customer?limit=${limit}&page=${page}&keyword=`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setOrder(data.data.order);
          setTotal(data.data.totalData);
          console.log("haiiii", data.data.order[0].custAddress);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, [limit, page]);

  const onSearch = (value) => {
    setNameFilter(value.target.value);
    setLoadingState(true);
    httpClient
      .get(
        `customer/get-customer?limit=10&page=1&keyword=${value.target.value}`
      )
      .then(({ data }) => {
        if (data.status.code === 200) {
          setLoadingState(false);
          setOrder(data.data.order);
          console.log("haiiii", data.data.order);
        }
      })
      .catch(function (error) {
        setLoadingState(false);
        console.log(error.message);
      });
  };

  const handleDelete = (custId) => {
    confirm({
      title: "Are you sure you want to delete this customer?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        const datas = {
          id_customer: custId,
        };
        httpClient
          .post(`customer/del-customer`, datas)
          .then(({ data }) => {
            if (data.status.code === 200) {
              const newOrder = order.filter((item) => item.custId !== custId);
              setOrder(newOrder);
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

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of records per page

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  // Assuming your 'order' data is an array of records

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const recordsToShow = order.slice(startIndex, endIndex);


  return (
    <div>
      <Card>
        <h4 className="mb-3">Data Master Customer</h4>
        <hr />
        <Space style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={handleAdd}>
            New Customer
          </Button>
          <Input.Search
            placeholder="Search by company name"
            onSearch={onSearch}
            onChange={onSearch}
            loading={loadingState}
          />
        </Space>
        <Table
          columns={columns}
          dataSource={order}
          pagination={{ total, current: page, pageSize: limit }}
          onChange={(pagination) => setPage(pagination.current)}
          
        />

        {/* <Table responsive>
          <thead style={{ backgroundColor: "#1A5CBF", color: "white" }}>
            <tr>
              <th>No.</th>
              <th>Kode Customer</th>
              <th>Nama Perusahaan</th>
              <th>Customer Stuff</th>
              <th>Nomor Telepon</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {order.map((record, index) => (
              <tr key={record.id}>
                <td>{index + 1}</td>
                <td>
                <Tag color="blue">{record.custCode}</Tag></td>
                <td>{record.custName}</td>
                <td>{record.custStuff}</td>
                <td>{record.custTelephone}</td>
                <td>
                  <Button
                    onClick={() => handleEdit(record.custId)}
                    type="primary"
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <FormOutlined />
                    </span>
                  </Button>
                  <Button danger onClick={() => handleDelete(record.custId)}>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <DeleteOutlined />
                    </span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
         */}
      </Card>
    </div>
  );
};

export default SamplePage;
