import React, { useEffect, useState } from "react";
import Baseurl from "../../../Api/BaseUrl";
import axios from "axios";
import { useParams } from "react-router";
import { Button, Card, Col, Input, Row, Select, Table, Space} from "antd";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { FormOutlined } from "@ant-design/icons";

function DataNewCustomerAddress() {
  let nomor = 1;
  const { id } = useParams();
  const [DataDetailAddress, setDataDetailAddress] = useState();
  const router = useHistory();

  const fetchData = async (id) => {
    try {
      const respons = await axios.get(
        `${Baseurl}customer/get-customer-address?id_customer=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("response", respons.data.data);
      setDataDetailAddress(respons.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData(id);
  }, []);

  const handleDetail = (customerAddressId) => {
    console.log(customerAddressId);
    router.push(`/editdetailmastercustomeralamat/${customerAddressId}`);
  };

  const columns = [
    {
      title: "Customer Code",
      dataIndex: "customerAddressId",
      width: "10px",
    },
    {
      title: "PIC Name",
      dataIndex: "pic",
      key: "pic",
    },
    {
      title: "Phone Number",
      dataIndex: "hp",
      key: "hp",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Customer Name",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      key: "alamat",
    },
    {
      title: "City",
      dataIndex: "kota",
      key: "kota",
    },
    {
      title: "Action",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          
          <Button onClick={() => handleDetail(record.customerAddressId)} type="primary">
            <span style={{ display: "flex", alignItems: "center" }}>
              <FormOutlined />
            </span>
          </Button>
         
          {/* <Button danger onClick={() => handleDelete(record.custId)}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <DeleteOutlined />
            </span>
          </Button> */}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <h4 className="mb-5">Data Detail Alamat Customer</h4>
        <Table
          style={{ width: "100%", overflow: "auto" }}
          dataSource={DataDetailAddress}
          columns={columns}
          pagination={false}
        //   pagination={{ total : Pagginatios?.totalPage, current: page, pageSize: limit }}
        //   onChange={(pagination) => setPage(pagination.current)}
        />
      </Card>
    </div>
  );
}

export default DataNewCustomerAddress;
