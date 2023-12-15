import React, { useEffect, useState } from "react";
import { Card, Tag, Tooltip, notification } from "antd";
import { Col, Row, Form, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
import Token from "../../../Api/Token";
import { useHistory } from "react-router-dom";
import { Pagination } from "antd";

function SPList() {
  const [isiData, setIsiData] = useState([]);
  const [destinationData, setDestinationData] = useState([]);
  const [pagination, setPagination] = useState("");
  const [TotalPage, setTotalPage] = useState("");
  const history = useHistory();
  const [spId, setSpId] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [loading, setloading] = useState(false)
  const dataapi = async (page = 1) => {
    setloading(true)
    try {
      const isi = await axios.get(
        `${Baseurl}sp/get-SP?limit=${pageSize}&page=${page}&keyword=${spId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const isidata = isi.data.data.order;
      setTotalPage(isi.data.data.totalData);
      setPagination({
        currentPage: isi.data.data.currentPage,
        limit: isi.data.data.limit,
      });

      setIsiData(isidata);
    } catch (error) {
      console.log(error.response.data.status.message);
      notification.error({
        message: "Error",
        description: error.response.data.status.message,
      })
    } finally {
      setloading(false)
    }

  };
  useEffect(() => {
    dataapi(pagination.currentPage, spId);
  }, [spId, pageSize]);

  const onPaginationChange = (page) => {
    console.log(page);
    // Perbarui state pageSize dengan nilai baru
    // Panggil dataapi dengan page baru
    dataapi(page);
  };

  useEffect(() => {
    // dataapi(pagination.currentPage, spId);
  }, [pagination.currentPage, spId, TotalPage]);


  const getDestinationData = async (idmp) => {
    const isi = await axios.get(`${Baseurl}sp/get-SP-detail?idmp=${idmp}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const isis = isi.data.data.map((item) => ({
      idmp: idmp,
      kendaraan: item.kendaraan,
      pickupAddress: item.pickupAddress,
      perusahaan: item.perusahaan,
      destination: item.destination,
      via: item.via,
      item: item.item,
      qty: item.qty,
      service: item.service,
      pickupDate: item.pickupDate,
    }));

    setDestinationData((prevData) => [...prevData, ...isis]);
  };





  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
      width: "70px",
      wrap: true,
    },
    {
      name: "SO ID",
      selector: (row) => row.sp,
      width: "150px",
      wrap: true,
    },
    {
      name: "Perusahaan",
      selector: (row) => row.perusahaan,
      // wrap: true,
      // width: "120px",
    },
    {
      name: "Marketing",
      selector: (row) => (
        <Tooltip title={<>
          {"Kacap: " + row?.kacab} <br />
          {"Asm: " + row?.asm} <br />
          {"gl: " + row?.gl} <br />
          {"mgr: " + row?.mgr} <br />
          {"amd: " + row?.amd} <br />
        </>}
        >
          {row?.salesName}
        </Tooltip>
      ),
      // width: "100px",
      // wrap: true,
    },
    {
      name: "Service",
      selector: (row) => row.service,
      // width: "80px",
      // wrap: true,
    },
    {
      name: "Vehicle",
      selector: (row) => row.kendaraan,
      // width: "80px",
      // wrap: true,
    },
    {
      name: "Pickup Date",
      selector: (row) => new Date(row.pickupDate).toLocaleDateString("en-CA"),
      // width: "100px",
      // wrap: true,
    },
    {
      name: "Destination",
      selector: (row) => row.destination,
      // width: "150px",
      // wrap: true,
    },

    {
      name: "Approved/Decline Act",
      selector: (row) => {
        const date = new Date(row.dateApproveAct);

        return isNaN(date.getTime()) ? (
          "-"
        ) : (
          <Tag color="green">{date.toLocaleDateString("en-CA")}</Tag>
        );
      },
      width: "160px",
      wrap: true,
    },

  ];



  const RowClick = (row) => {
    console.log("RowClick", row);
    window.open(`/masterdata/operasional/detailsp/${row.idmp}`, '_blank');
  };

  const buttonarahin = (page) => {
    dataapi(page);
    // history.push(`/masterdata/splistdetailakunting/${idmp}`);
  };



  return (
    <div>
      <Card>
        <Row>
          <Col>
            <h5 style={{ color: `#1A5CBF`, fontWeight: 'bold' }}>Approve SO</h5>
            <div className="d-flex justify-content-end">
              <Col sm={3}>
                <Form.Group controlId="spId">
                  <Form.Control
                    type="text"
                    value={spId}
                    placeholder="Cari No SO "
                    onChange={(e) => setSpId(e.target.value)}
                  />
                </Form.Group>
                <br />
              </Col>
            </div>
            <style>
              {`
          .rdt_TableBody .rdt_TableRow:hover {
            cursor: pointer;
            background-color: #C7E1FB;
          }
          
        `}
            </style>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">Loading</div>
            ) : (
              <>
                <DataTable
                  columns={columns}
                  data={isiData}
                  onRowClicked={RowClick}
                  customStyles={{
                    headCells: {
                      style: {
                        backgroundColor: '#1a5cbf',
                        color: '#fff',
                        width:"100%"
                      },
                    },
                  }}
                />
                <div className="d-flex justify-content-end mt-3">
                  <Pagination
                    showSizeChanger
                    onChange={buttonarahin}
                    size="default"
                    total={TotalPage}
                    defaultCurrent={1}
                  />
                </div>
              </>
            )}

          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default SPList;
