import axios from "axios";
import { async } from "q";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../Api/BaseUrl";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../../Api/Api";
import {
  Card,
  Col,
  Row,
  Select,
  Button,
  Space,
  Alert,
  Table,
  Pagination,
  Modal,
} from "antd";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  FormOutlined,
  EyeFilled,
} from "@ant-design/icons";
import CreateMasterInvoice from "./CreateMasterInvoice";

function Index() {
  const router = useHistory();
  const [customer, setCustomer] = useState("Pilih Customer");
  const [customerOptionSelect, setCustomerOptionsSelect] = useState([]);
  const [dataasw, setdataasw] = useState("");
  const [DataAja, setDataAja] = useState("");
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [Pagginatios, setPagginations] = useState("");
  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const alertStyle = {
    fontFamily: "Arial, sans-serif", // Replace this with your desired font-family
    fontSize: "16px", // Replace this with your desired font size
    fontWeight: "bold", // Replace this with your desired font weight
    color: "black", // Replace this with your desired text color
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}customer/get-customer-invoice-address?id_customer=${customer}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log("ini data Address Invoice :", response?.data.data);
      //  setdataasw(response?.data?.data);
      setDataAja(response?.data?.data);
    } catch (error) {}
  };

  const GetDataSelect = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}customer/get-select-create-address?idProv=11&idKota=1101`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("ini data Address Invoice :", response.data);
      setCustomerOptionsSelect(response.data.customer);
      //   setDataAja(response?.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    GetDataSelect();
  }, [customer, limit, page]);

  console.log(customerOptionSelect);

  const handleDetail = (invoiceAddressId) => {
    console.log(invoiceAddressId);
    router.push(`/invoicecustomerdetail/${invoiceAddressId}`);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    // {
    //   title: "Customer Name",
    //   dataIndex: "customer",
    //   key: "customer",
    // },
    {
      title: "PIC Name",
      dataIndex: "picName",
      key: "picName",
    },
    {
      title: "NPWP",
      dataIndex: "npwp",
      key: "npwp",
    },

    // {
    //   title: "PIC Position",
    //   dataIndex: "picPosition",
    //   key: "picPosition",
    // },

    {
      title: "PIC Phone Number",
      dataIndex: "picPhone",
      key: "picPhone",
    },
    {
      title: "PIC Email",
      dataIndex: "picEmail",
      key: "picEmail",
    },
    // {
    //   title: "PIC Fax",
    //   dataIndex: "picFax",
    //   key: "picFax",
    // },

    {
      title: "Office Address",
      dataIndex: "addressOffice",
      key: "addressOffice",
    },

    {
      title: "Action",
      key: "no",
      render: (text, record) => (
        <Space size="middle">
          {/* <Button onClick={() => handleDetail(record.custId)} type="secondary">
            <span style={{ display: "flex", alignItems: "center" }}>
              <EyeFilled />
            </span>
          </Button> */}

          <Button
            onClick={() =>
              handleDetail(record.invoiceAddressId, record.customerId)
            }
            type="primary"
          >
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
        <h5>Data Invoice Address Customer</h5>

        <Row className="mt-3">
          <Col span={12}>
            <Select
              value={customer}
              name="customer"
              showSearch
              optionFilterProp="children"
              placeholder="Select Customer"
              style={{ width: "50%" }}
              onChange={(e) => setCustomer(e)}
            >
               <Select.Option value="">-</Select.Option>
              {customerOptionSelect.map((item, index) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.customer}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={12} className="d-flex justify-content-end">
            <Button type="primary" onClick={showModal}>
              New Master Alamat
            </Button>
            <Modal
              title="Add New Invoice Address Customer"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={800}
              footer={null} // Hide OK and Cancel buttons
            >
             <CreateMasterInvoice/>
            </Modal>
            {/* <Button type="primary" onClick={handleAdd}>
              New Master Alamat
            </Button> */}
          </Col>
        </Row>
        <hr />
        {DataAja && DataAja.length > 0 ? (
          <Table
            style={{ width: "100%", overflow: "auto" }}
            dataSource={DataAja}
            columns={columns}
            pagination={{
              total: Pagginatios?.DataAja,
              current: page,
              pageSize: limit,
            }}
            onChange={(pagination) => setPage(pagination.current)}
          />
        ) : (
          <div style={alertStyle}>
            <Alert
              message="Pilih terlebih dahulu filter customer-nya !"
              type="info"
              showIcon
            />
          </div>
        )}
      </Card>
    </div>
  );
}

export default Index;
