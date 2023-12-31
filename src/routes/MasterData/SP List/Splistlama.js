import React, { useEffect, useState } from "react";
import { Card, Input, Select, Tag, Tooltip, notification, Button, DatePicker } from "antd";
import { Col, Row, Form } from "react-bootstrap";
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
import { array, func } from "prop-types";
// import "../Monitoring SP List Akunting/style.css"
import NamaCabangStore from "../../../zustand/Store/NamaCabang";
function SPListlama() {
  const DetailUserLoginZustandState = DetailUserLoginZustand(
    (i) => i?.DetailUserLoginZustandState
  );
  const NamaCabang = NamaCabangStore((state) => state.NamaCabang);
  const [pilihtanggal, setpilihtanggal] = useState("")

  const [isiData, setIsiData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [destinationData, setDestinationData] = useState([]);
  const [search, setSearch] = useState([]);
  const [CustumerValue, setCustumerValue] = useState("");
  const [CariCabangValue, setCariCabangValue] = useState("");
  const [CariSalesValue, setCariSalesValue] = useState("");
  const [CariBu, setCariBu] = useState("");
  const router = useHistory();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
  });
  const { SPFilter, setSPFilter } = SpStore((items) => ({
    SPFilter: items.SPFilter,
    setSPFilter: items.setSPFilter,
  }));
  const { userProfileZustand, setuserProfileZustand } = DetailUserLoginZustand(
    (i) => ({
      userProfileZustand: i.DetailUserLoginZustandState,
      setuserProfileZustand: i.setDetailUserLoginZustand,
    })
  );
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
        value: item.cabang,
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
        },
      });
      console.log(`nin`, data.data.data.id);
      // setCariSalesValue(data?.data?.data?.id)
    } catch (error) {
      console.error(error);
    }
  };
  console.log(`CariCabangValue`, CariCabangValue);
  console.log(`CariCabangOptions`, CariCabangOptions);

  function ganticabang() {
    if (!CariCabangValue) {
      return NamaCabang;
    } else if (CariCabangValue) {
      return CariCabangValue;
    }
  }

  const ApiDataAwal = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const data = await axios.get(
        `${Baseurl}sp/get-SP-all?limit=${pageSize}&page=${page}&keyword=${search}&statusSP=&customerId=${CustumerValue}&codeBrench=${ganticabang()}&sales=${CariSalesValue}&buId=${CariBu}&tglSp=${pilihtanggal}`,
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
      console.log(`error`,error);
      if (Array.isArray(error?.response?.data?.status)) {
        error.response.data.status.forEach((element) => {
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

  useEffect(async () => {
    // await setuserProfileZustand()
    await detail();
    await setSPFilter();
    await ApiDataAwal();
  }, [search, CustumerValue, CariCabangValue, CariSalesValue, CariBu,pilihtanggal]);
  // console.log(`DetailUserLoginZustandState`, DetailUserLoginZustandState.id);
  // useEffect(() => {
  //   // Set nilai awal dari CariSalesValue
  //   setCariSalesValue(userProfileZustand.id);
  // }, []); // Dependency array kosong berarti ini akan dijalankan sekali saat komponen dimuat

  let number = 1;
  const columns = [
    {
      name: "No",
      width: "80px",
      wrap: true,
      selector: (row, index) => (
        <>
          {(pagination.currentPage - 1) * 10 + index + 1}
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00f510" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-check"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /><path d="m16 19 2 2 4-4" /></svg> */}
        </>
      ),
    },

    {
      name: "SO ID",
      selector: (row) => {
        let tagColor = "blue";

        if (row.service.toLowerCase() === "charter") {
          tagColor = "blue";
        } else if (
          row.service.toLowerCase() === "retail" ||
          row.service.toLowerCase() === "retailer"
        ) {
          tagColor = "gold";
        }
        let issue = "";
        if (
          (row?.is_issue === 1 && localStorage.getItem("level") === "admin") ||
          (localStorage.getItem("level") === "sales" &&
            localStorage.getItem("level") === "account receivable")
        ) {
          issue = (
            <svg
              style={{ marginLeft: 2 }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f82020"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-mail-warning"
            >
              <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              <path d="M20 14v4" />
              <path d="M20 22v.01" />
            </svg>
          );
        }
        return (
          <>
            <Tag className="flex" color={tagColor}>
              {row.sp}
              <br />
              {row?.service}
              {issue}
            </Tag>
          </>
        );
      },
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
        <Tooltip
          title={
            <>
              {"Gl: " + row?.gl} <br />
              {"Asm: " + row?.asm} <br />
              {"Mgr: " + row?.mgr} <br />
              {"Kacab: " + row?.kacab} <br />
              {"Amd: " + row?.amd} <br />
            </>
          }
        >
          {row?.salesName}
        </Tooltip>
      ),
      width: "100px",
      wrap: true,
    },
    // {
    //   name: "Service",
    //   selector: (row) => row?.service,
    //   width: "100px",
    //   wrap: true,
    // },
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
    // {
    //   name: "Sales",
    //   selector: (row) => {
    //     const tanggal = row.dateApproveSales;
    //     return row?.approveAct === "Y" ? (
    //       <Tag color="green">
    //         Approved <br /> {tanggal}
    //       </Tag>
    //     ) : row?.approveSales === "Y" && tanggal !== "Invalid Date" ? (
    //       <Tag color="green">
    //         Approved <br /> {tanggal}
    //       </Tag>
    //     ) : row?.approveSales === "N" && tanggal !== "Invalid Date" ? (
    //       <Tag color="red">
    //         Reject <br /> {tanggal}
    //       </Tag>
    //     ) : (
    //       <Tag color="blue">
    //         Pass <br /> {tanggal}
    //       </Tag>
    //     );
    //   },
    //   width: "170px",
    // },
    // {
    //   name: "Akunting",
    //   selector: (row) => {
    //     const tanggal = row.dateApproveAct;
    //     return row?.approveAct === "Y" ? (
    //       <Tag color="green">
    //         Approved <br /> {tanggal}
    //       </Tag>
    //     ) : (row?.approveAct === "N" && tanggal === "1970-01-01 07:00:00") ||
    //       "Invalid Date" ? (
    //       <Tag color="yellow">
    //         Waiting <br /> {tanggal ? "-" : tanggal}
    //       </Tag>
    //     ) : (row?.approveAct === "N" && tanggal !== "1970-01-01 07:00:00") ||
    //       "Invalid Date" ? (
    //       <Tag color="red">
    //         Diverted <br /> {tanggal}
    //       </Tag>
    //     ) : (
    //       <Tag color="blue">
    //         Pass <br /> {tanggal}
    //       </Tag>
    //     );
    //   },
    //   width: "170px",
    // },
    {
      name: "Operasional",
      selector: (row) => {
        const dateApproveOps = row?.dateApproveOps;
        const isValidDate = !isNaN(new Date(dateApproveOps));
        const data = isValidDate ? dateApproveOps : "-";
        const idops = row?.idops;
        const approveOps = row?.approveOps;
        if (row?.approveOps === "Y") {
          return (
            <Tag color="green">
              Approved <br /> {data}
            </Tag>
          );
        } else if (
          (approveOps === "N" && dateApproveOps === "Invalid Date") ||
          dateApproveOps.toLowerCase() === "invalid date"
        ) {
          return (
            <Tag color="yellow">
              Waiting <br /> -
            </Tag>
          );
        } else if (
          dateApproveOps !== "Invalid date" &&
          idops !== 0 &&
          approveOps === "N"
        ) {
          return (
            <Tag color="blue">
              Diverted <br /> {data}
            </Tag>
          );
        } else if (approveOps === "N" && dateApproveOps !== "Invalid date") {
          return (
            <Tag color="red">
              Reject <br /> {data}
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
            ) : (row.approvePurch === "N" && date === "1970-01-01 07:00:00") ||
              "Invalid date" ? (
              <Tag color="yellow">
                Waiting <br /> {date ? "-" : date}
              </Tag>
            ) : (row.approvePurch === "N" && date != "1970-01-01 07:00:00") ||
              "Invalid date" ? (
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

  const handleView = () => {
    const newTab = window.open(`/sm/`, "_blank");
    if (newTab) {
      newTab.focus();
    } else {
      // Handling if the browser blocks pop-up
      // You can display a message or take an alternative action here
      window.alert("Pop-up blocked. Please allow pop-ups for this site.");
    }
  };

  const handleView2 = () => {
    const newTab = window.open(`/sp/`, "_blank");
    if (newTab) {
      newTab.focus();
    } else {
      // Handling if the browser blocks pop-up
      // You can display a message or take an alternative action here
      window.alert("Pop-up blocked. Please allow pop-ups for this site.");
    }
  };

  const exportToExcel = async () => {
    try {
      setExporting(true);
      await ApiDataAwal(); // Call the function to fetch data

      // Assuming you have the data in isiData, you can use a library like xlsx to export it to Excel
      const XLSX = require("xlsx");

      // Create a worksheet
      const ws = XLSX.utils.json_to_sheet(isiData);

      // Set specific column widths
      ws["!cols"] = [
        { width: 5 }, //1
        { width: 10 }, //idmp 2
        { width: 20 }, //sp 3
        { width: 27 }, //sales name 4
        { width: 15 }, //gl 5
        { width: 15 }, //asm 6
        { width: 15 }, //mgr 7
        { width: 15 }, //kacab 8
        { width: 15 }, //amd 9
        { width: 40 }, //perusahaan 10
        { width: 15 }, //kendaraan 11
        { width: 15 }, //service 12
        { width: 25 }, //pickup 13
        { width: 20 }, //approvesales
        { width: 20 }, //dateapprovesales
        { width: 20 }, //approveact
        { width: 20 }, //dateapproveact
        { width: 20 }, //approveops
        { width: 10 }, //idops
        { width: 20 }, //operationalname
        { width: 20 }, //dateapproveops
        { width: 20 }, //approvepurch
        { width: 20 }, //dateapprovepurch
        { width: 20 }, //destination

        // Add more objects for other columns if needed
      ];

      // Create a workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

      // Save the Excel file
      XLSX.writeFile(wb, "exported_data.xlsx");
    } catch (error) {
      // Handle errors
    }
  };


  const [exporting, setExporting] = useState(false);


  return (
    <div>
      <Card>
        <Row>
          <h5 style={{ color: "#1A5CBF", fontWeight: "bold" }}>SO List</h5>
          <Col>
            {/* <h1>SP List</h1> */}
            <Row>
              <Col >
                <Form.Group controlId="bu">
                  <Select
                    options={CariBUOptions}
                    optionFilterProp="label"
                    onChange={(e) => setCariBu(e)}
                    showSearch
                    placeholder="Cari Bu"
                    style={{
                      width: "100%",
                      border: "1px solid #1A5CBF",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col >
                <Form.Group controlId="bu">
                  <DatePicker
                    onChange={(e, w) => setpilihtanggal(w)}
                    placeholder="Filter Tahun"
                    picker="year"
                    style={{
                      width: "100%",
                      border: "1px solid #1A5CBF",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                    }} />


                </Form.Group>
              </Col>
              <Col >
                <Form.Group controlId="cabang">
                  <Select
                    optionFilterProp="label"
                    showSearch
                    options={CariCabangOptions}
                    value={ganticabang()}
                    onChange={(e) => setCariCabangValue(e)}
                    placeholder="Cari Cabang"
                    style={{
                      width: "100%",
                      border: "1px solid #1A5CBF",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col >
                <Form.Group controlId="sales">
                  <Select
                    optionFilterProp="label"
                    options={CariSalesOptions}
                    value={CariSalesValue} // ini akan membuat komponen ini controlled component
                    onChange={(e) => setCariSalesValue(e)}
                    showSearch
                    placeholder="Cari Sales"
                    style={{
                      width: "100%",
                      border: "1px solid #1A5CBF",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col >
                <Form.Group controlId="search">
                  <Select
                    options={CariCustomerOptions}
                    showSearch
                    optionFilterProp="label"
                    onChange={(e) => setCustumerValue(e)}
                    placeholder="Cari Customer"
                    style={{
                      width: "100%",
                      border: "1px solid #1A5CBF",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                </Form.Group>
              </Col>

              <Col
                style={{ display: "flex", justifyContent: "flex-end" }}

              >
                <Form.Group controlId="search">
                  <Input
                    style={{
                      width: "100%",
                      border: "1px solid #1A5CBF",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                    placeholder="Cari No SO"
                    onChange={handleSearchChange}
                  />
                </Form.Group>
              </Col>
              <Col
                style={{ display: "flex", justifyContent: "flex-end" }}
                sm={2}
              >
                <Form.Group controlId="search">
                  <Select
                    style={{
                      width: "100%",
                      border: "1px solid #1A5CBF",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                    placeholder="Filter SP Approve"
                    onChange={handleSearchChange}
                  >
                    <option disabled value={1}>
                      Sp Sudah Approve
                    </option>
                  </Select>
                </Form.Group>
              </Col>
            </Row>
            <br />

            <Row>
              <Col sm={12} className="justify-content-end d-flex">
                <Button
                  style={{ backgroundColor: "green", color: "white" }}
                  onClick={exportToExcel}
                  disabled={exporting}
                >
                  {exporting ? "Exporting..." : "Export Excel (XLSX)"}
                </Button>
                <Button
                  style={{ backgroundColor: "#1A5CBF", color: "white" }}
                  onClick={handleView}
                >
                  Email SM
                </Button>
                <Button
                  style={{ backgroundColor: "#1A5CBF", color: "white" }}
                  onClick={handleView2}
                >
                  Email SP
                </Button>
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
                  customStyles={{
                    headCells: {
                      style: {
                        backgroundColor: "#1a5cbf",
                        color: "#fff",
                        width: "100%",
                      },
                    },
                  }}
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
