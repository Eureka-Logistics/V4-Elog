import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tag,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../Api/BaseUrl";
import axios from "axios";
import { style } from "d3-selection";

const CheckboxGroup = Checkbox.Group;

function MonitoringSJ() {
  const jobdesk = localStorage.getItem("jobdesk");
  console.log(`jobdeks`, jobdesk);
  const [Customers, setCustomers] = useState("");
  const [DataBU, setDataBU] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [selectedRecord1, setSelectedRecord1] = useState(null);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedRecord2, setSelectedRecord2] = useState(null);

  // const checkboxLabels = ["Rekap Distribusi Barang", "SPO Angkut"];
  const checkboxLabels = [
    "Rekap Distribusi Barang",
    "SPO Angkut",
    "SPO Kuli",
    "Packing List",
  ];

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

  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal1 = (record) => {
    setSelectedRecord1(record);
    setIsModalVisible1(true);
  };

  const handleOk1 = () => {
    setIsModalVisible1(false);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };

  const showModal2 = (record) => {
    setSelectedRecord2(record);
    setIsModalVisible2(true);
  };

  const handleOk2 = () => {
    setIsModalVisible(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  const dataSource = [
    {
      key: "1",
      sm: ["SMG23-002664", "SP01718/10/23/SMG"],
      rute: ["PT. Macrosentra Niagaboga", "Semarang-Bogor"],
      pickUp: ["PT. EUREKA LOGISTICS (EL)", "B 9056 TEV - Kambali"],
      tglMuat: "01 Oct 23",
      suksesKirim: "03 Oct 23",
      diserahkan : "0",
      ap : 'Belum Tersedia',
      invoice : 'Belum Tersedia'
    },
    {
      key: "2",
      sm: ["SMG23-002664", "SP01718/10/23/SMG"],
      rute: ["PT. Macrosentra Niagaboga", "Semarang-Bogor"],
      pickUp: ["PT. EUREKA LOGISTICS (EL)", "B 9056 TEV - Kambali"],
      tglMuat: "01 Oct 23",
      suksesKirim: "03 Oct 23",
      diserahkan : "0",
      ap : 'Belum Tersedia',
      invoice : 'Belum Tersedia'
    },
    {
      key: "3",
      sm: ["SMG23-002664", "SP01718/10/23/SMG"],
      rute: ["PT. Macrosentra Niagaboga", "Semarang-Bogor"],
      pickUp: ["PT. EUREKA LOGISTICS (EL)", "B 9056 TEV - Kambali"],
      tglMuat: "01 Oct 23",
      suksesKirim: "03 Oct 23",
      diserahkan : "0",
      ap : 'Belum Tersedia',
      invoice : 'Belum Tersedia'
    },
    {
      key: "4",
      sm: ["SMG23-002664", "SP01718/10/23/SMG"],
      rute: ["PT. Macrosentra Niagaboga", "Semarang-Bogor"],
      pickUp: ["PT. EUREKA LOGISTICS (EL)", "B 9056 TEV - Kambali"],
      tglMuat: "01 Oct 23",
      suksesKirim: "03 Oct 23",
      diserahkan : "0",
      ap : 'Belum Tersedia',
      invoice : 'Belum Tersedia'
    },
    {
      key: "5",
      sm: ["SMG23-002664", "SP01718/10/23/SMG"],
      rute: ["PT. Macrosentra Niagaboga", "Semarang-Bogor"],
      pickUp: ["PT. EUREKA LOGISTICS (EL)", "B 9056 TEV - Kambali"],
      tglMuat: "01 Oct 23",
      suksesKirim: "03 Oct 23",
      diserahkan : "0",
      ap : 'Belum Tersedia',
      invoice : 'Belum Tersedia'
    },
  ];

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "SM/SP",
      dataIndex: "sm",
      key: "sm",
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{record.sm[0]}</div>
          <div>{record.sm[1]}</div>
        </div>
      ),
    },
    {
      title: "RUTE",
      dataIndex: "rute",
      key: "rute",
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{record.rute[0]}</div>
          <div>{record.rute[1]}</div>
        </div>
      ),
    },
    {
      title: "PICK UP",
      dataIndex: "rute",
      key: "rute",
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{record.rute[0]}</div>
          <div>{record.rute[1]}</div>
        </div>
      ),
    },
    {
      title: "TglMuat",
      dataIndex: "tglMuat",
      key: "tglMuat",
      render: (text, record) => <Tag color="green">{record.tglMuat}</Tag>,
    },
    {
      title: "SuksesKirim",
      dataIndex: "suksesKirim",
      key: "suksesKirim",
    },
    {
      title: "Receive SJ",
      dataIndex: "receiveSJ",
      key: "receiveSJ",
      render: (text, record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Terima
        </Button>
      ),
    },
    {
      title: "Diserahkan",
      dataIndex: "diserahkan",
      key: "diserahkan",
    },
    {
      title: "SJonAP",
      dataIndex: "sj_onAP",
      key: "sj_onAP",
      render: (text, record) => (
        <Button type="primary" onClick={() => showModal1(record)}>
          Terima
        </Button>
      ),
    },
    {
      title: "AP",
      dataIndex: "ap",
      key: "ap",
    },
    {
      title: "SJonAR",
      dataIndex: "sj_onAP",
      key: "sj_onAP",
      render: (text, record) => (
        <Button type="primary" onClick={() => showModal2(record)}>
          Terima
        </Button>
      ),
    },
    {
      title: "Invoice",
      dataIndex: "invoice",
      key: "invoice",
    },
  ];

  const checkboxData = [
    ["Rekap Distribusi Barang", "SPO Angkut"],
    ["SPO Kuli", "Packing List"],
    ["Surat muat asli", "Surat jalan Asli"],
    // Add more rows as needed
  ];

  const dataModal = [
    {
      key: '1',
      tgl: '2023-10-03 09:07:44',
      role: 'Aji Prasetyo',
      action: 'Diterima',
    },
   
  ];
  
  const columnsModal = [
    {
      title: 'Tgl',
      dataIndex: 'tgl',
      key: 'tgl',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => <Tag color="blue">{record.action}</Tag>,

    },
  ];

  return (
    <div>
      <Card>
        <h5>
          MonitoringSJ (<i>operasional</i>)
        </h5>
        <hr />
        <Row gutter={[16,16]}>
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4}>
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
                  <Select.Option key={item.id_bu} value={item.name_bu}>
                    {item.name_bu}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4}>
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
                  <Select.Option key={item.id_bu} value={item.name_bu_brench}>
                    {item.name_bu_brench}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4}>
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
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4}>
            <label className="mb-2" style={{ fontWeight: "bold" }}>
              Mulai :
            </label>
            <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
          </Col>
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4}>
            <label className="mb-2" style={{ fontWeight: "bold" }}>
              Selesai :
            </label>
            <DatePicker
              style={{ width: "100%" }}
              format="DD-MM-YYYY"
              // defaultValue={moment()}
            />
          </Col>
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4}>
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
        <Row gutter={[16,16]}>
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4}>
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
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4}>
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
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4}>
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
          <Col sm={12}
                  md={4}
                  xs={24}
                  lg={4}>
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
        <hr />
        <Table
          style={{ overflowX: "auto" }}
          dataSource={dataSource}
          columns={columns}
        />
        
        <Modal
          width={800}
          title={
            <div>
              <span style={{ marginRight: "8px" }}>Terima SJ</span>

              <Tag color="green">
                {" "}
                {`${selectedRecord ? selectedRecord.sm[0] : ""}`}
              </Tag>
              <span>Role anda : {jobdesk}</span>
            </div>
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {/* Render the details of the selected record inside the modal */}
          <Row gutter={[16,16]}>
            <Col span={12}>
              <label className="mt-2" style={{ fontWeight: "bold" }}>
                No Invoice
              </label>
              <Input className="mt-2" placeholder="No Invoice Vendor"></Input>
            </Col>
            <Col span={12}>
              <label className="mt-2" style={{ fontWeight: "bold" }}>
                No Invoice
              </label>
              <DatePicker
                className="mt-2"
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                placeholder="dd-mm-yyy"
              />
            </Col>
          </Row>
          <>
            {checkboxData.map((row, rowIndex) => (
              <Row key={rowIndex} className="mt-2">
                {row.map((label, colIndex) => (
                  <Col key={colIndex} span={12}>
                    <Checkbox>{label}</Checkbox>
                  </Col>
                ))}
              </Row>
            ))}
          </>
          <Row className="mt-2">
           <Col span={24}>
            <label style={{fontWeight: 'bold'}}>
              Keterangan
            </label>
            <Input.TextArea className="mt-2">
            </Input.TextArea>
           </Col>
          </Row>
          <Row className="mt-2">
            <Col span={24}>
            <Button type="primary">
              Submit Terima Surat Jalan
            </Button>
            </Col>
          </Row>
          <Row >
            <Col span={24}>
              <label style={{fontWeight: 'bold'}}>
                History
              </label>
              <Table className="mt-2" pagination={false} style={{overflowX: 'auto'}} dataSource={dataModal} columns={columnsModal} />;
            </Col>
          </Row>
        </Modal>
        {/* 2 */}
        <>
        <Modal
          width={800}
          title={
            <div>
              <span style={{ marginRight: "8px" }}>Terima SJJ</span>

              <Tag color="green">
                {" "}
                {`${selectedRecord ? selectedRecord.sm[0] : ""}`}
              </Tag>
              <span>Role anda : {jobdesk}</span>
            </div>
          }
          visible={isModalVisible1}
          onOk={handleOk1}
          onCancel={handleCancel1}
        >
          {/* Render the details of the selected record inside the modal */}
          <Row gutter={[16,16]}>
            <Col span={12}>
              <label className="mt-2" style={{ fontWeight: "bold" }}>
                No Invoice
              </label>
              <Input className="mt-2" placeholder="No Invoice Vendor"></Input>
            </Col>
            <Col span={12}>
              <label className="mt-2" style={{ fontWeight: "bold" }}>
                No Invoice
              </label>
              <DatePicker
                className="mt-2"
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                placeholder="dd-mm-yyy"
              />
            </Col>
          </Row>
          <>
            {checkboxData.map((row, rowIndex) => (
              <Row key={rowIndex} className="mt-2">
                {row.map((label, colIndex) => (
                  <Col key={colIndex} span={12}>
                    <Checkbox>{label}</Checkbox>
                  </Col>
                ))}
              </Row>
            ))}
          </>
          <Row className="mt-2">
           <Col span={24}>
            <label style={{fontWeight: 'bold'}}>
              Keterangan
            </label>
            <Input.TextArea className="mt-2">
            </Input.TextArea>
           </Col>
          </Row>
          <Row className="mt-2">
            <Col span={24}>
            <Button type="primary">
              Submit Terima Surat Jalan
            </Button>
            </Col>
          </Row>
          <Row >
            <Col span={24}>
              <label style={{fontWeight: 'bold'}}>
                History
              </label>
              <Table className="mt-2" pagination={false} style={{overflowX: 'auto'}} dataSource={dataModal} columns={columnsModal} />;
            </Col>
          </Row>
        </Modal>
        </>
        {/* 3 */}
        <>
        <Modal
          width={800}
          title={
            <div>
              <span style={{ marginRight: "8px" }}>Terima SJJJ</span>

              <Tag color="green">
                {" "}
                {`${selectedRecord ? selectedRecord.sm[0] : ""}`}
              </Tag>
              <span>Role anda : {jobdesk}</span>
            </div>
          }
          visible={isModalVisible2}
          onOk={handleOk2}
          onCancel={handleCancel2}
        >
          {/* Render the details of the selected record inside the modal */}
          <Row gutter={[16,16]}>
            <Col span={12}>
              <label className="mt-2" style={{ fontWeight: "bold" }}>
                No Invoice
              </label>
              <Input className="mt-2" placeholder="No Invoice Vendor"></Input>
            </Col>
            <Col span={12}>
              <label className="mt-2" style={{ fontWeight: "bold" }}>
                No Invoice
              </label>
              <DatePicker
                className="mt-2"
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                placeholder="dd-mm-yyy"
              />
            </Col>
          </Row>
          <>
            {checkboxData.map((row, rowIndex) => (
              <Row key={rowIndex} className="mt-2">
                {row.map((label, colIndex) => (
                  <Col key={colIndex} span={12}>
                    <Checkbox>{label}</Checkbox>
                  </Col>
                ))}
              </Row>
            ))}
          </>
          <Row className="mt-2">
           <Col span={24}>
            <label style={{fontWeight: 'bold'}}>
              Keterangan
            </label>
            <Input.TextArea className="mt-2">
            </Input.TextArea>
           </Col>
          </Row>
          <Row className="mt-2">
            <Col span={24}>
            <Button type="primary">
              Submit Terima Surat Jalan
            </Button>
            </Col>
          </Row>
          <Row >
            <Col span={24}>
              <label style={{fontWeight: 'bold'}}>
                History
              </label>
              <Table className="mt-2" pagination={false} style={{overflowX: 'auto'}} dataSource={dataModal} columns={columnsModal} />;
            </Col>
          </Row>
        </Modal>
        </>
      </Card>
    </div>
  )
}

export default MonitoringSJ;