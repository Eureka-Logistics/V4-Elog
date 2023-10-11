import { Card, Pagination, Tag, Tooltip, notification } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Baseurl from "../../../Api/BaseUrl";
import { useHistory } from "react-router-dom";
import elogGif from "../../../assets/Loader_Elogs1.gif"
import "./style.css"
function SplistAkuntingBaru() {
  const [dataApi, setdataapi] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [filter, setFilter] = useState("");
  const [TotalCurrentPage, setTotalCurrentPage] = useState("");
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const history = useHistory();
  const [datamobil, setDatamobil] = useState([]);
  const [loading, setLoading] = useState(false);
  const [AapproveActValue, setAapproveActValue] = useState("");
  console.log(page);
  const columns = [
    {
      name: "No",
      selector: (row, index) => (TotalCurrentPage.currentPage - 1) * 10 + index + 1,
      width: "70px",
    },
    {
      name: "No SP",
      selector: (row) => row?.sp,
      width: "150px"

    },
    {
      name: " Perusahaan",
      selector: (row) => row?.perusahaan,
      width: "210px"
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

    },
    {
      name: "Service",
      selector: (row) => row?.service,
    },
    // {
    //   name: "Vehicle",
    //   selector: (row) => row?.vehicles.map(v => v.kendaraan).join(', '),
    //   width: "80px"
    // },

    {
      name: "Pickup Date",
      selector: (row) => {
        const formattedDate = new Date(row.pickupDate).toLocaleDateString('en-CA');
        return (
          <Tag color="cyan">
            {formattedDate}
          </Tag>
        );
      },
      width: "150px"
    },
    // {
    //   name: "Approve By Sales",
    //   cell: (row) => {
    //     const approveact = row?.approveSales;
    //     const dateApproveAct = row?.dateApproveSales;
    //     let displayText =
    //       approveact === "Y" && dateApproveAct !== "1970-01-01 07:00:00" ? (
    //         <Tag color="green">
    //           Approve <br /> <small>{dateApproveAct}</small>
    //         </Tag>
    //       ) : approveact === "N" && dateApproveAct === "Invalid date" || "1970-01-01 07:00:00" ? (
    //         <Tag color="red">
    //           Reject <br /> <small>{dateApproveAct}</small>
    //         </Tag>
    //       ) : (
    //         <Tag color="red">
    //           Reject <br /> <small>{dateApproveAct}</small>
    //         </Tag>
    //       );

    //     return <>{displayText}</>;
    //   },
    //   width: "150px",
    // },

    {
      name: "Approve By Akunting",
      cell: (row) => {
        const approveact = row?.approveAct;
        const dateApproveAct = row?.dateApproveAct;
        let displayText =
          approveact === "Y" && dateApproveAct !== "1970-01-01 07:00:00" || "2023-10-11 12:11:59" ? (
            <Tag color="green">
              Approve <br /> <small>{dateApproveAct}</small>
            </Tag>
          ) : approveact === "N" && dateApproveAct === "Invalid date" || "1970-01-01 07:00:00" || "2023-10-11 12:11:59" ? (
            <Tag color="yellow">
              Waiting <br /> <small>{dateApproveAct}</small>
            </Tag>
          ) : (
            <Tag color="red">
              Diverted <br /> <small>{dateApproveAct}</small>
            </Tag>
          );

        return <>{displayText}</>;
      },
      width: "150px",
    },
    {
      name: "Approve By Ops",
      selector: (row) => {
        const approveact = row?.approveOps;
        const dateApproveAct = row?.dateApproveOps;
        let displayText =
          approveact === "Y" && dateApproveAct !== "1970-01-01 07:00:00" || "2023-10-11 12:11:59" ? (
            <Tag color="green">
              Approve <br /> <small>{dateApproveAct}</small>
            </Tag>
          ) : approveact === "N" && dateApproveAct === "Invalid date" || "1970-01-01 07:00:00" || "2023-10-11 12:11:59" ? (
            <Tag color="yellow">
              Waiting <br /> <small>{dateApproveAct}</small>
            </Tag>
          ) : (
            <Tag color="red">
              Diverted <br /> <small>{dateApproveAct}</small>
            </Tag>
          );

        return <>{displayText}</>;
      },
      width: "150px",
    },

    {
      name: "Approve By Purchasing",
      selector: (row) => {
        const approveact = row?.approvePurch;
        const dateApproveAct = row?.dateApprovePurch;
        let displayText =
          approveact === "Y" && dateApproveAct !== "1970-01-01 07:00:00" || "2023-10-11 12:11:59" ? (
            <Tag color="green">
              Approve <br /> <small>{dateApproveAct}</small>
            </Tag>
          ) : approveact === "N" && dateApproveAct === "Invalid date" || "1970-01-01 07:00:00" || "2023-10-11 12:11:59" ? (
            <Tag color="yellow">
              Waiting <br /> <small>{dateApproveAct}</small>
            </Tag>
          ) : (
            <Tag color="red">
              Diverted <br /> <small>{dateApproveAct}</small>
            </Tag>
          );

        return <>{displayText}</>;
      },
      width: "150px",
    },
    // {
    //   name: "Detail",
    //   selector: (row) => (
    //     <Button size="sm" onClick={() => {
    //       buttonarahin(row.idmp, row.approveAct);
    //     }}>
    //       Detail
    //     </Button>
    //   ),
    // },

  ];

  const buttonarahin = (row, approveAct) => {
    history.push(`/masterdata/purchasing/detailsp/${row.idmp}`);
    console.log(`approveAct before setting state: `, approveAct);
    localStorage.setItem(`ApproveAct`, approveAct);
    setAapproveActValue(localStorage.getItem(`ApproveAct`));
    console.log(`AapproveActValue immediately after setting state: `, AapproveActValue);
  };


  // useEffect(() => {
  //   alert(`ini adalah nilai approveAct: ${AapproveActValue}`);
  // }, [AapproveActValue]);



  const dataapi = async (page = 1) => {
    setLoading(true)
    try {
      const data = await axios.get(
        `${Baseurl}sp/get-SP-all?limit=10&page=${page}&keyword=${filter}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setdataapi(data.data?.data?.order)
      setTotalRows(data.data.data.totalPage);
      setTotalCurrentPage(data.data.data);
      console.log(data.data.data);
      setCombinedData(combinedData);
      setLoading(false)
    } catch (error) {
      notification.error({
        message: 'Error!',
        description: error.response.data.status.message
      });
    }
  }
  useEffect(() => {
    dataapi();
  }, [filter, page]);

  // console.log();
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // const detailSP = async (idmp) => {
  //   try {
  //     const response = await axios.get(
  //       `${Baseurl}sp/get-SP-all-detail?idmp=${idmp}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     return response.data.detail.map((item) => ({
  //       kendaraan: item?.kendaraan,
  //       destination: item?.destination
  //     }));
  //   } catch (error) {
  //     console.error(error);
  //     return [];
  //   }
  // };

  // useEffect(() => {
  // }, [datamobil]);
  const onShowSizeChange = (page, pageSize) => {
    // console.log(current, pageSize);
    dataapi(page)
  };
  return (
    <div>
      <Card>
        <h5>Data SP List</h5>
        <Row>
          <Col>
            <Row>

              <div className="d-flex justify-content-end mb-3">
                <Col sm={3}>
                  <Form.Control
                    type="text"
                    placeholder="No SP "
                    onChange={handleFilterChange}

                  />
                </Col>
              </div>
            </Row>
            <style>
              {`
          .rdt_TableBody .rdt_TableRow:hover {
            cursor: pointer;
            background-color: #C7E1FB;
          }
          
        `}
            </style>
            {loading ? (
              <img className="d-flex justify-content-center" src={elogGif} width="800px" />
            ) : (

              <DataTable
                columns={columns}
                data={dataApi}
                paginationTotalRows={totalRows}
                onRowClicked={buttonarahin}
              />
            )}
            <div className="mt-3 justify-content-end d-flex">
              <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                onChange={onShowSizeChange}
                defaultCurrent={1}
                total={totalRows}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default SplistAkuntingBaru;
