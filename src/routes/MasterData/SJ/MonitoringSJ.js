import { Card, Col, DatePicker, Row, Select, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../Api/BaseUrl";
import axios from "axios";

function MonitoringSJ() {
  const [Customers, setCustomers] = useState("");
  const [DataBU, setDataBU] = useState("");

  const SelectCustomerss = async () => {
    try {
      const respons = await axios.get(
        `${Baseurl}tarif/get-select?idMuat=&idBogkar=&idJenisKendaraan=&service_type=`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("responssssscarismid", respons.data);
      // setCustomers(respons.data.data)
      setCustomers(respons.data);
    } catch (error) {}
  };

  const SelectBU = async () => {
    try {
      const respons = await axios.get(`${Baseurl}bu/get-select`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("responssssscarismid", respons.data);
      setDataBU(respons.data);
    } catch (error) {}
  };

  useEffect(() => {
    SelectCustomerss();
    SelectBU();
  }, []);


  const dataSource = [
    {
      key: '1',
      sm: ['SMG23-002664', 'SP01718/10/23/SMG'],
      age: 32,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'SM/SP',
      dataIndex: 'sm',
      key: 'sm',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.sm[0]}</div>
          <div>{record.sm[1]}</div>
        </div>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div>
      <Card>
        <h5>
          Monitoring (<i>operasional</i>)
        </h5>
        <hr />
        <Row>
          <Col span={4}>
            <label style={{ fontWeight: "bold" }}>BU :</label>
            <Select
              className="mt-2"
              showSearch
              name="id_bu"
              //   placeholder="Pilih BU"
              defaultValue=" PT Eureka Logistics (LOG)"
              // optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.key);
                // setIDBu(options.key)
              }}
            >
             

              {DataBU &&
                DataBU.bu.map((item) => (
                  <Select.Option
                    key={item.id_bu}
                    value={item.name_bu}
                  >
                    {item.name_bu}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col span={4}>
            <label style={{ fontWeight: "bold" }}>Cabang :</label>
            <Select
              className="mt-2"
              showSearch
              name="id_bu"
              defaultValue="Semua Cabang"
              //   placeholder="Pilih Cabang"
              // optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.key);
                // setIDBu(options.key)
              }}
            >
             {DataBU &&
                DataBU.buBrench.map((item) => (
                  <Select.Option
                    key={item.id_bu}
                    value={item.name_bu_brench}
                  >
                    {item.name_bu_brench}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col span={4}>
            <label style={{ fontWeight: "bold" }}>Mitra :</label>
            <Select
              className="mt-2"
              showSearch
              name="id_bu"
              defaultValue="Semua Mitra"
              //   placeholder="Pilih Cabang"
              // optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.key);
                // setIDBu(options.key)
              }}
            >
              <Select.Option key="Semua Mitra" value="Semua Mitra">
                Semua Mitra
              </Select.Option>
              <Select.Option key="Eureka Logistics" value="Eureka Logistics">
                Eureka Logistics
              </Select.Option>
              <Select.Option key="Mitra" value="Mitra">
                Mitra
              </Select.Option>
            </Select>
          </Col>
          <Col span={4}>
            <label className="mb-2" style={{ fontWeight: "bold" }}>
              Mulai :
            </label>
            <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
          </Col>
          <Col span={4}>
            <label className="mb-2" style={{ fontWeight: "bold" }}>
              Selesai :
            </label>
            <DatePicker
              style={{ width: "100%" }}
              format="DD-MM-YYYY"
              // defaultValue={moment()}
            />
          </Col>
          <Col span={4}>
            <label style={{ fontWeight: "bold" }}>AR :</label>
            <Select
              className="mt-2"
              showSearch
              name="id_bu"
              defaultValue="Semua Status"
              //   placeholder="Pilih Cabang"
              // optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.key);
                // setIDBu(options.key)
              }}
            >
              <Select.Option key="Semua Status" value="Semua Status">
                Semua Status
              </Select.Option>
              <Select.Option key="Sudah Terinvoice" value="Sudah Terinvoice">
                Sudah Terinvoice
              </Select.Option>
              <Select.Option key="Belum Terinvoice" value="Belum Terinvoice">
                Belum Terinvoice
              </Select.Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <label className="mt-2" style={{ fontWeight: "bold" }}>
              AP :
            </label>
            <Select
              className="mt-2"
              showSearch
              name="id_bu"
              defaultValue="Semua Status"
              //   placeholder="Pilih Cabang"
              // optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.key);
                // setIDBu(options.key)
              }}
            >
              <Select.Option key="Semua Status" value="Semua Status">
                Semua Status
              </Select.Option>
              <Select.Option key="Sudah Bayar" value="Sudah Bayar">
                Sudah Bayar
              </Select.Option>
              <Select.Option key="Belum Bayar" value="Belum Bayar">
                Belum Bayar
              </Select.Option>
            </Select>
          </Col>
          <Col span={4}>
            <label className="mt-2" style={{ fontWeight: "bold" }}>
              Diserahkan OPS :
            </label>
            <Select
              className="mt-2"
              showSearch
              name="id_bu"
              defaultValue="Semua Status"
              //   placeholder="Pilih Cabang"
              // optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.key);
                // setIDBu(options.key)
              }}
            >
              <Select.Option key="Semua Status" value="Semua Status">
                Semua Status
              </Select.Option>
              <Select.Option key="Sudah diserahkan" value="Sudah diserahkan">
                Sudah diserahkan
              </Select.Option>
              <Select.Option key="Belum diserahkan" value="Belum diserahkan">
                Belum diserahkan
              </Select.Option>
            </Select>
          </Col>
          <Col span={4}>
            <label className="mt-2" style={{ fontWeight: "bold" }}>
              Sukses Pengiriman :
            </label>
            <Select
              className="mt-2"
              showSearch
              name="id_bu"
              defaultValue="Semua Status"
              //   placeholder="Pilih Cabang"
              // optionFilterProp="value"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.key);
                // setIDBu(options.key)
              }}
            >
              <Select.Option key="Sukses Mengirim" value="Sukses Mengirim">
                Sukses Mengirim
              </Select.Option>
              <Select.Option
                key="Belum Selesai Mengirim"
                value="Belum Selesai Mengirim"
              >
                Belum Selesai Mengirim
              </Select.Option>
              <Select.Option key="Semua Status" value="Semua Status">
                Semua Status
              </Select.Option>
            </Select>
          </Col>
          <Col span={4}>
            <label className="mt-2" style={{ fontWeight: "bold" }}>
              Customer :
            </label>
            <Select
              className="mt-2"
              showSearch
              name="id_bu"
              defaultValue="Semua Customer"
              style={{ width: "100%" }}
              onChange={(e, options) => {
                console.log(options.key);
                // setIDBu(options.key)
              }}
            >
              {Customers &&
                Customers.customer.map((item) => (
                  <Select.Option key={item.idCustomer} value={item.Customer}>
                    {item.Customer}
                  </Select.Option>
                ))}
            </Select>
          </Col>
        </Row>
        <hr/>
        <Table dataSource={dataSource} columns={columns} />;
      </Card>
    </div>
  );
}

export default MonitoringSJ;
