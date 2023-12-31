import { Card, Tag, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useHistory } from "react-router-dom";
import Baseurl from "../../../../Api/BaseUrl";
import LoadingElogGif from "../../../../assets/Loader_Elogs1.gif"
// import { format } from 'date-fns';
import { Pagination } from 'antd';

function SplistOperasional() {
  const [dataApi, setdataapi] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const history = useHistory();
  const [datamobil, setDatamobil] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      name: "No",
      selector: (row) => row?.no,
      width: "80px",
    },
    {
      name: "No SP",
      selector: (row) => row?.sp,
      wrap: true,
      width: "150px"
    },
    {
      name: " Perusahaan",
      selector: (row) => row?.perusahaan,
      wrap: true,
      // width: "220px"
    },
    {
      name: "Marketing",
      selector: (row) => (
        <Tooltip title={<>
          {"Kacab: " + row?.kacab} <br />
          {"Asm: " + row?.asm} <br />
          {"gl: " + row?.gl} <br />
          {"mgr: " + row?.mgr} <br />
          {"amd: " + row?.amd} <br />
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
      wrap: true,
      width: "100px",
    },
    // {
    //   name: "Vehicle",
    //   selector: (row) => row.vehicles.map(v => v.kendaraan).join(', '),
    //   width: "80px"
    // },

    {
      name: "Pickup Date",
      selector: (row) => new Date(row.pickupDate).toLocaleDateString('en-CA'),
      wrap: true,
      width: "120px"
    },

    {
      name: "Approve By Akunting",
      cell: (row) => {
        const approveact = row.approveAct;
        const dateApproveAct = row.dateApproveAct;
        let displayText =
          approveact === "Y" && dateApproveAct !== "Invalid Date" ? (
            <Tag color="green">
              Approve <br /> <small>{dateApproveAct}</small>
            </Tag>
          ) : approveact === "Y" && dateApproveAct !== "Invalid Date" ? (
            <Tag color="red">
              Reject <br /> <small>{dateApproveAct}</small>
            </Tag>
          ) : (
            <Tag color="yellow">
              Waiting <br /> <small>Menunggu</small> 
            </Tag>
          );

        return <>{displayText}</>;
      },
      // width: "150px",
    },
    {
      name: "Approve By Ops",
      selector: (row) => {
        const approveact = row.approveOps;
        const dateApproveAct = row.dateApproveOps;
        let displayText;

        if (approveact === "Y" && dateApproveAct !== "Invalid Date") {
          displayText = (
            <Tag color="green">
              Approve <br /> <small>{dateApproveAct}</small>
            </Tag>
          );
        } else if (approveact !== "Y" && dateApproveAct !== "Invalid Date") {
          displayText = (
            <Tag color="red">
              Reject <br /> <small>{dateApproveAct}</small>
            </Tag>
          );
        } else {
          displayText = (
            <Tag color="yellow">
              Waiting <br /> <small>Menunggu</small> 
            </Tag>
          );
        }

        return <>{displayText}</>;
      },
    },

    {
      name: "Approve By Purchasing",
      selector: (row) => {
        const approveact = row.approvePurch;
        const dateApproveAct = row.dateApprovePurch;
        let displayText;
    
        if (approveact === "Y" && dateApproveAct !== "Invalid Date") {
          displayText = (
            <Tag color="green">
              Approve <br /> <small>{dateApproveAct}</small>
            </Tag>
          );
        } else if (approveact === "N" && dateApproveAct === "Invalid Date") {
          displayText = (
            <Tag color="yellow">
              Waiting <br /> <small>Menunggu</small> {/* Ubah teks ini jika "dateApproveAct" tidak valid */}
            </Tag>
          );
        } else {
          displayText = (
            <Tag color="red">
              Reject <br /> <small>{dateApproveAct === "Invalid Date" ? '---' : dateApproveAct}</small>
            </Tag>
          );
        }
    
        return <>{displayText}</>;
      },
      // width: "150px",
    }
    
    // {
    //   name: "Detail",
    //   selector: (row) => (
    //     <Button size="sm" onClick={() => buttonarahin(row?.idmp)}>
    //       Detail
    //     </Button>
    //   ),
    // },
  ];

  const buttonarahin = (row) => {
    history.push(`/masterdata/purchasing/detailsp/${row.idmp}`);
  };

  useEffect(() => {
    const dataapi = async () => {
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
        const isi = data.data.data.order.map((item) => ({
          no: item?.no,
          idmp: item?.idmp,
          sp: item?.sp,
          salesName: item?.salesName,
          perusahaan: item?.perusahaan,
          service: item?.service,
          pickupDate: item?.pickupDate,
          approveAct: item?.approveAct,
          dateApproveAct: item?.dateApproveAct,
          approveOps: item?.approveOps,
          idops: item?.idops,
          operationalName: item?.operationalName,
          dateApproveOps: item?.dateApproveOps,
          approvePurch: item?.approvePurch,
          dateApprovePurch: item?.dateApprovePurch,
        }));

        const detailPromises = isi?.map(item => detailSP(item?.idmp));
        const details = await Promise.all(detailPromises);

        const combinedData = isi?.map((item, index) => ({
          ...item,
          vehicles: details[index]
        }));

        setTotalRows(data?.data?.data?.totalData);
        setCombinedData(combinedData);
        setLoading(false)
      } catch (error) {

      }

    };
    dataapi();
  }, [filter, page]);

  console.log();
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const detailSP = async (idmp) => {
    try {
      const response = await axios.get(
        `${Baseurl}sp/get-SP-all-detail?idmp=${idmp}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      return response?.data?.detail?.map((item) => ({
        kendaraan: item?.kendaraan,
        destination: item?.destination
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
  }, [datamobil]);

  return (
    <div>
      <Card>
        <Row>
          <h5>Approve SP</h5>
          <Col>
            <Row>
              <div className="d-flex justify-content-end">
                <Col sm={3}>
                  <Form.Control
                    type="text"
                    placeholder="Cari No SP "
                    onChange={handleFilterChange}
                  />
                </Col>
              </div>
            </Row>
            {(loading ?
              (
                <img src={LoadingElogGif}></img>
              ) : (<DataTable
                columns={columns}
                data={combinedData}
                onRowClicked={buttonarahin}
                customStyles={{
                  headCells: {
                    style: {
                      backgroundColor: '#1a5cbf',
                      color: '#fff',
                      width:"100%"
                    },
                  },
                }}
              // pagination
              // paginationServer
              // paginationTotalRows={totalRows}
              // onChangePage={setPage}
              />))}
            <div className="mt-3 d-flex justify-content-end">
              <style>
                {`
          .rdt_TableBody .rdt_TableRow:hover {
            cursor: pointer;
            background-color: #C7E1FB;
          }
          
        `}
              </style>

              <Pagination
                showSizeChanger
                onShowSizeChange={setPage}
                onChange={setPage}
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

export default SplistOperasional;
