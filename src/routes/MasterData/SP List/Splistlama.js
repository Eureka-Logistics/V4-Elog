import React, { useEffect, useState } from "react";
import { Card, Input, Select, Tag, Tooltip, notification } from "antd";
import { Col, Row, Form, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";
import { useHistory } from "react-router-dom";
import ElogLoadingGif from "../../.././assets/Loader_Elogs1.gif";
import Swal from "sweetalert2";
import { Pagination } from "antd";
import SpStore from "../../../zustand/Store/FilterSP";
import DetailUserLoginZustand from "../../../zustand/Store/DetailUserLogin/Index";

function SPListlama() {
  const DetailUserLoginZustandState = DetailUserLoginZustand((i) => i?.DetailUserLoginZustandState)

  const [isiData, setIsiData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [destinationData, setDestinationData] = useState([]);
  const [search, setSearch] = useState([]);
  const [CustumerValue, setCustumerValue] = useState("");
  const [CariCabangValue, setCariCabangValue] = useState("");
  const [CariSalesValue, setCariSalesValue] = useState("");
  const [CariBu, setCariBu] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
  });
  const { SPFilter, setSPFilter } = SpStore((items) => ({
    SPFilter: items.SPFilter,
    setSPFilter: items.setSPFilter,
  }));
  const { userProfileZustand, setuserProfileZustand } = DetailUserLoginZustand((i) => ({
    userProfileZustand: i.DetailUserLoginZustandState,
    setuserProfileZustand: i.setDetailUserLoginZustand,
  }))
  let nomor = 1;
  const CariCustomerOptions = SPFilter &&
    SPFilter.customer && [
      { label: "-", value: "" },
      ...SPFilter.customer.map((item) => ({
        label: item.customer,
        value: item.idcustomer,
      })),
    ];

  const CariCabangOptions = SPFilter &&
    SPFilter.cabang && [
      { label: "-", value: "" },
      ...SPFilter.cabang.map((item) => ({
        label: item.cabang,
        value: nomor++,
      })),
    ];
  const CariSalesOptions = SPFilter &&
    SPFilter.sales && [
      { label: "-", value: "" },
      ...SPFilter.sales.map((item) => ({
        label: item.sales,
        value: item.idSales,
      })),
    ];
  const CariBUOptions = SPFilter &&
    SPFilter.bu && [
      { label: "-", value: "" },
      ...SPFilter.bu.map((item) => ({
        label: item.bu,
        value: item.idbu,
      })),
    ];
  // const [Pagginations, setPagginations] = useState(1)
  const history = useHistory();
  if (!userProfileZustand.id) {
    console.log(`kosong bolo`);
  }



  const detail = async () => {
    try {
      const data = await axios.get(`${Baseurl}auth/get-profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        }
      });
      console.log(`nin`, data.data.data.id);
      // setCariSalesValue(data?.data?.data?.id)
    } catch (error) {
      console.error(error);
    }
  }


  const ApiDataAwal = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true)
      const data = await axios.get(
        `${Baseurl}sp/get-SP-all?limit=${pageSize}&page=${page}&keyword=${search}&statusSP=&customerId=${CustumerValue}&cabang=${CariCabangValue}&sales=${CariSalesValue}&buId=${CariBu}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const isidata = data?.data?.data?.order;
      setPagination({
        currentPage: data.data.data.currentPage,
        totalPage: data.data.data.totalPage,
      });

      setIsiData(isidata);
      setLoading(false);
    } catch (error) {
      if (Array.isArray(error?.response?.data?.status)) {
        error.response.data.status.forEach(element => {
          notification.error({
            message: element?.message,
          });
        });
      }
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        if (localStorage.getItem("token") === null) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error Login, Silahkan Login Kembali ",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    }
  };

  useEffect(
    async () => {
      // await setuserProfileZustand()
      await detail()
      await setSPFilter();
      await ApiDataAwal();
    },
    [search, CustumerValue, CariCabangValue, CariSalesValue, CariBu]
  );
  // console.log(`DetailUserLoginZustandState`, DetailUserLoginZustandState.id);
  // useEffect(() => {
  //   // Set nilai awal dari CariSalesValue
  //   setCariSalesValue(userProfileZustand.id);
  // }, []); // Dependency array kosong berarti ini akan dijalankan sekali saat komponen dimuat

  let number = 1
  const columns = [
    {
      name: "No",
      selector: (row, index) => (pagination.currentPage - 1) * 10 + index + 1,
      width: "80px",
      wrap: true,
    },
    {
      name: "SO ID",
      selector: (row) => row?.sp,
      width: "150px",
      wrap: true,
    },
    {
      name: "Perusahaan",
      selector: (row) => row?.perusahaan,
      width: "150px",
      wrap: true,
    },
    {
      name: "Marketing",
      selector: (row) => (
        <Tooltip title={<>
          {"Gl: " + row?.gl} <br />
          {"Asm: " + row?.asm} <br />
          {"Mgr: " + row?.mgr} <br />
          {"Kacab: " + row?.kacab} <br />
          {"Amd: " + row?.amd} <br />
        </>}
        >
          {row?.salesName}
        </Tooltip>
      ),
      width: "100px",
      wrap: true,
    },
    {
      name: "Service",
      selector: (row) => row?.service,
      width: "100px",
      wrap: true,
    },
    {
      name: "Vehicle",
      selector: (row) => row?.kendaraan,
      width: "100px",
      wrap: true,
    },
    {
      name: "Pickup Date",
      selector: (row) => {
        let date = new Date(row?.pickupDate);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, "0");
        let day = date.getDate().toString().padStart(2, "0");

        return (
          <Tag color="green">{`${year}-${month}-${day}`}</Tag> // return dalam format yyyy-mm-dd
        );
      },
      width: "120px",
      wrap: true,
    },

    {
      name: "Destination",
      selector: (row) => row?.destination,
      width: "150px",
      wrap: true,
    },

    // {
    //   name: "Tgl Approved/Decline",
    //   selector: (row) => {
    //     const dateApproveOps = row?.dateApproveOps;
    //     const isValidDate = !isNaN(new Date(dateApproveOps));

    //     const data = isValidDate ? dateApproveOps : "-";
    //     return data
    //   },
    // },
    {
      name: "Sales",
      selector: (row) => {
        const tanggal = row.dateApproveSales;
        return row?.approveAct === "Y" ? (
          <Tag color="green">
            Approved <br /> {tanggal}
          </Tag>
        ) : row?.approveAct === "N" && tanggal === "1970-01-01 07:00:00" ? (
          <Tag color="red">
            Reject <br /> {tanggal ? "-" : tanggal}
          </Tag>
        ) : row?.approveAct === "N" && tanggal !== "1970-01-01 07:00:00" ? (
          <Tag color="red">
            Reject <br /> {tanggal}
          </Tag>
        ) : (
          <Tag color="blue">
            Pass <br /> {tanggal}
          </Tag>
        );
      },
      width: "170px",
    },
    {
      name: "Akunting",
      selector: (row) => {
        const tanggal = row.dateApproveAct;
        return row?.approveAct === "Y" ? (
          <Tag color="green">
            Approved <br /> {tanggal}
          </Tag>
        ) : row?.approveAct === "N" && tanggal === "1970-01-01 07:00:00" ? (
          <Tag color="yellow">
            Waiting <br /> {tanggal ? "-" : tanggal}
          </Tag>
        ) : row?.approveAct === "N" && tanggal !== "1970-01-01 07:00:00" ? (
          <Tag color="red">
            Diverted <br /> {tanggal}
          </Tag>
        ) : (
          <Tag color="blue">
            Pass <br /> {tanggal}
          </Tag>
        );
      },
      width: "170px",
    },
    {
      name: "Operasional",
      selector: (row) => {
        const dateApproveOps = row?.dateApproveOps;
        const isValidDate = !isNaN(new Date(dateApproveOps));
        const data = isValidDate ? dateApproveOps : "-";

        if (row?.approveOps === "Y") {
          return (
            <Tag color="green">
              Approved <br /> {data}
            </Tag>
          );
        } else if (row?.approveOps === "N" && (dateApproveOps === "1970-01-01 07:00:00")) {
          return (
            <Tag color="yellow">
              Waiting <br />  -
            </Tag>
          );
        } else if (row?.approveOps === "N" && (dateApproveOps !== "1970-01-01 07:00:00")) {
          return (
            <Tag color="red">
              Diverted <br /> {data}
            </Tag>
          );
        } else if (row?.approveOps === "P") {
          return (
            <Tag color="blue">
              Pass <br /> {data}
            </Tag>
          );
        }
      },
      width: "170px",
    },


    {
      name: "Purchasing",
      selector: (row) => {
        const date = row?.dateApprovePurch;
        return (
          <>
            {row.approvePurch === "Y" && date != null ? (
              <Tag color="green">
                Approved <br /> {date}
              </Tag>
            ) : row.approvePurch === "N" && date === "1970-01-01 07:00:00" ? (
              <Tag color="yellow">
                Waiting <br /> {date ? "-" : date}
              </Tag>
            ) : row.approvePurch === "N" && date != "1970-01-01 07:00:00" ? (
              <Tag color="red">
                Diverted <br /> {date}
              </Tag>
            ) : (
              <Tag color="blue">
                Pass <br /> {date}
              </Tag>
            )}
          </>
        );
      },
      width: "180px",
    },
    // {
    //   name: "Detail",
    //   selector: (row) => <><Button size="sm" onClick={() => buttonarahin(row.idmp)}>Detail</Button></>,
    //   width: "170px",
    // },
  ];

  const RowClick = (row) => {
    history.push(`/masterdata/splistdetailakunting/${row.idmp}`);
  };
  const buttonarahin = (idmp) => {
    // history.push(`/masterdata/detailsp/${idmp}`);
    history.push(`/masterdata/splistdetailakunting/${idmp}`);
  };

  const handlePageChange = async (page, pageSize) => {
    ApiDataAwal(page);
    // setPagination({ ...pagination, currentPage: page });
    // await dataapi(page, search);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };


  return (
    <div>
      <Card>
        <Row>
          <h5 style={{ color: "#1A5CBF", fontWeight: "bold" }}>SO List</h5>
          <Col>
            {/* <h1>SP List</h1> */}
            <Row>
              <Col sm={2}>
                <Form.Group controlId="bu">
                  <Select
                    options={CariBUOptions}
                    optionFilterProp="label"
                    onChange={(e) => setCariBu(e)}
                    showSearch
                    placeholder="Cari Bu"
                    style={{
                      width: "100%", border: "1px solid #1A5CBF",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col sm={2}>
                <Form.Group controlId="cabang">
                  <Select
                    optionFilterProp="label"
                    showSearch
                    options={CariCabangOptions}
                    onChange={(e) => setCariCabangValue(e)}
                    placeholder="Cari Cabang"
                    style={{
                      width: "100%", border: "1px solid #1A5CBF",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col sm={2}>
                <Form.Group controlId="sales">
                  <Select
                    optionFilterProp="label"
                    options={CariSalesOptions}
                    value={CariSalesValue} // ini akan membuat komponen ini controlled component
                    onChange={(e) => setCariSalesValue(e)}
                    showSearch
                    placeholder="Cari Sales"
                    style={{
                      width: "100%", border: "1px solid #1A5CBF",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col sm={2}>
                <Form.Group controlId="search">
                  <Select
                    options={CariCustomerOptions}
                    showSearch
                    optionFilterProp="label"
                    onChange={(e) => setCustumerValue(e)}
                    placeholder="Cari Customer"
                    style={{
                      width: "100%", border: "1px solid #1A5CBF",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                </Form.Group>
              </Col>



              <Col
                style={{ display: "flex", justifyContent: "flex-end" }}
                sm={2}
              >
                <Form.Group controlId="search">
                  <Input
                    style={{
                      width: "150px",
                      border: "1px solid #1A5CBF",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                    placeholder="Cari No SO"
                    onChange={handleSearchChange}
                  />
                </Form.Group>
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

            {Loading ? (
              <img src={ElogLoadingGif}></img>
            ) : (
              <div className="mt-3 ">
                <DataTable
                  columns={columns}
                  data={isiData}
                  onRowClicked={RowClick}
                  className="myCustomTable"
                />
              </div>
            )}
            <div className="mt-3 d-flex justify-content-end">
              <Pagination
                showSizeChanger
                onShowSizeChange={handlePageChange}
                onChange={handlePageChange}
                defaultCurrent={1}
                total={pagination.totalPage}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default SPListlama;
