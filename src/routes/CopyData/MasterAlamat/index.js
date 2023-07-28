import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Input,
  Space,
  Table,
  Modal,
  Row,
  Col,
  Select,
  Alert,
  Pagination,
} from "antd";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  FormOutlined,
  EyeFilled,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../../Api/Api";
import DataTable from "react-data-table-component";
import GetCustomerAddress from "./GetCustomerAddress";
import NewMasterAlamatNew from "./NewMasterAlamatNew";

const { confirm } = Modal;

const SamplePage = () => {
  const router = useHistory();
  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [DetailAddress, setDetailAddress] = useState([]);
  const [customer, setCustomer] = useState("Pilih Customer");
  const [customerOptions, setCustomerOptions] = useState([]);
  const [customerOptionSelect, setCustomerOptionsSelect] = useState([]);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [keywordData, setKeywordData] = useState(1);
  const [Pagginatios, setPagginations] = useState("");
  const [dataasw, setdataasw] = useState("");
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient.get(
          `customer/get-customer-address?id_customer=${customer}`
        );
        const data = response.data.data;
        setdataasw(response?.data?.data);
        console.log(`wiusadasd`, response.data.data);
        // setCustomerOptionsSelect (response.data)

        if (data.status.code === 200) {
        } else {
          console.log("Error: ", data.status.message);
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    };

    httpClient
      .get(
        `customer/get-customer?limit=${limit}&page=${page}&keyword=${customer}`
      )
      .then(({ data }) => {
        if (data.status.code === 200) {
          setCustomerAddresses(data.data.order);
          setPagginations(data.data);
          // setDetailAddress(data.data.order[0].custAddress);
          console.log("haiiii", data.data.order[0].custAddress);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });

    httpClient
      .get("customer/get-select-create-address?idProv=11&idKota=1101")
      .then(({ data }) => {
        if (data.status.code === 200) {
          setCustomerOptionsSelect(data.customer);
          console.log(data.customer);
        } else {
          console.log("Error: ", data.status.message);
        }
      });
    fetchData();
  }, [limit, page, customer]);

  const handleEdit = (custId) => {
    router.push(`/editcustomer/${custId}`);
  };

  const handleDetail = (customerAddressId) => {
    console.log(customerAddressId);
    router.push(`/editdetailmastercustomeralamat/${customerAddressId}`);
  };
  const handleView = (customerAddressId, customerId) => {
    router.push(`/detailcustomerAdress/${customerAddressId}`);
  };

  const handleAdd = () => {
    // router.push(`/masteralamatadd`);
    router.push(`/CreatedMasterAlamat`);
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
              const newOrder = customerAddresses.filter(
                (item) => item.custId !== custId
              );
              setCustomerAddresses(newOrder);
              window.location.reload(); // Menambahkan reload windows setelah pembaruan daftar pelanggan
            }
          })
          .catch(function (error) {
            console.log(error.message);
          });
      },
      onCancel() {},
    });
  };

  let nomor = 1;

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
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
          {/* <Button onClick={() => handleDetail(record.custId)} type="secondary">
            <span style={{ display: "flex", alignItems: "center" }}>
              <EyeFilled />
            </span>
          </Button> */}

          <Button
            onClick={() =>
              handleDetail(record.customerAddressId, record.customerId)
            }
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
        </Space>
      ),
    },
  ];

  const customStylesReactSelect = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      width: "100%",
      minWidth: "100%",
    }),
  };

  const onSelectChange = async (value) => {
    if (value) {
      const customer = value.customer; // Mengambil nilai customer dari objek value
      setCustomer(customer); // Mengatur state customer dengan nilai yang dipilih
      const fetchData = async () => {
        try {
          const response = await httpClient.get(
            `customer/get-customer-address?id_customer=${customer}`
          );
          const data = response.data;

          if (data.status.code === 200 && data.data) {
            setCustomerAddresses(data.data);
          } else {
            console.log("Error: ", data.status.message);
          }
        } catch (error) {
          console.log("Error: ", error.message);
        }
      };

      fetchData();
    }
  };

  return (
    <>
      {/* <GetCustomerAddress customerId={customerId}/> */}
      <Card>
        <h3>Data Master Alamat</h3>
        {/* <h5 className="mt-5">Pilih Filter Customer Terlebih Dahulu</h5> */}
        <Row className="mt-3 mb-3">
          <Col span={12}>
            <Select
              value={customer}
              name="customer"
              showSearch
              optionFilterProp="children"
              placeholder="Select Customer"
              style={{ width: "100%" }}
              onChange={(e) => setCustomer(e)}
            >
              {customerOptionSelect.map((item, index) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.customer}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={showModal}>
             New Master Alamat
            </Button>
            <Modal
              title="Add New Master Alamat"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={800}
              footer={null} // Hide OK and Cancel buttons
            >
              <NewMasterAlamatNew />
            </Modal>
            {/* <Button type="primary" onClick={handleAdd}>
              New Master Alamat
            </Button> */}
          </Col>
        </Row>
        <style>
          {`
          .rdt_TableBody .rdt_TableRow:hover {
            cursor: pointer;
            background-color: #C7E1FB;
          }
          
        `}
        </style>

        <hr />

        {dataasw && dataasw.length > 0 ? (
          <Table
            style={{ width: "100%", overflow: "auto" }}
            dataSource={dataasw}
            columns={columns}
            pagination={{
              total: Pagginatios?.dataasw,
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
    </>
  );
};

export default SamplePage;
