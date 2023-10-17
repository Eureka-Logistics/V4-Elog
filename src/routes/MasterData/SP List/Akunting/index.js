import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import Baseurl from '../../../../Api/BaseUrl';
import { Card, Tag, Pagination } from 'antd';
import { Button, Row, Form, Col, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "../../Monitoring SP List Akunting/style.css"
function Index() {
    const [DataAwal, setDataAwal] = useState([]);
    const [Loading, Isloading] = useState(false)
    const [search, setSearch] = useState("")
    // const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState("");


    const history = useHistory()
    const fetchData = async (page = 1) => {
        Isloading(true)
        try {
            const response = await axios.get(`${Baseurl}sp/get-SP-akunting?limit=10&page=${page}&keyword=${search}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            setDataAwal(response.data.data.order);
            setTotalRows(response.data.totalData);
            Isloading(false)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [search]);
    let limit = 1
    const columns = [
        {
            name: "No",
            selector: (row, index) => limit++,
            width: "50px",
            wrap: true,
        },
        {
            name: "SO ID",
            selector: (row) => row.sp,
            width: "200px",
            wrap: true,
            cell: (row) => (
                <Tag color='blue'>
                    {row.sp}
                </Tag>
            ),
        },
        {
            name: "Perusahaan",
            selector: (row) => row.perusahaan,
            // width: "200px",
            // wrap: true,
        },
        {
            name: "Service",
            selector: (row) => row.service,
            width: "150px",
            wrap: true,
            cell: (row) => (
                <Tag color={row.service === "Charter" ? "blue" : row.service === "Retailer" ? "green" : "default"}>
                    {row.service}
                </Tag>
            ),
        },
        {
            name: "sales Name",
            selector: (row) => row.salesName,
            // width: "150px",
            // wrap: true,
        },
        {
            name: "Pickup Date",
            selector: (row) => new Date(row.pickupDate).toLocaleDateString('en-CA'),
            wrap: true,
        },
        {
            name: "Approve By Akunting",
            cell: (row) => {
                if (row.approveAct === "N" && row.dateApproveAct === "1970-01-01 07:00:00") {
                    return <Tag color="yellow">Waiting</Tag>;
                } else {
                    return <Tag color="green">Approve</Tag>;
                }
            },
        },
    ];

    const buttonarahin = (row) => {
        history.push(`/masterdata/splistdetailakunting/${row.idmp}`);
    };

    const handlePageChange = (page) => {
        fetchData(page);
    }



    return (
        <div>
            <Card>
                <Row>
                    <h5 style={{ color: '#1A5CBF', fontWeight: 'bold' }}>Waiting Approve SO </h5>
                    <div className="d-flex justify-content-end">
                        <Col sm={3}>
                            <Form.Control
                                type="text"
                                placeholder="Cari No SO "
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />
                        </Col>
                    </div>
                </Row>
                <Col className='mt-2'>
                    {Loading ? "loading" : (
                        <DataTable
                            columns={columns}
                            data={DataAwal}
                            onChangePage={handlePageChange}
                            paginationTotalRows={totalRows}
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
                        />

                    )}
                    <style>
                        {`
          .rdt_TableBody .rdt_TableRow:hover {
            cursor: pointer;
            background-color: #C7E1FB;
          }
          
        `}
                    </style>
                    <div className='d-flex justify-content-end mt-3'>

                        <Pagination
                            showSizeChanger
                            // onShowSizeChange={onShowSizeChange}
                            onChange={handlePageChange}
                            defaultCurrent={1}
                            total={totalRows}
                        />
                    </div>
                </Col>
            </Card>

        </div>
    );
}

export default Index;
