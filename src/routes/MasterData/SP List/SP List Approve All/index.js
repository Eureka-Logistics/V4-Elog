import { Card, Pagination, Tag, Tooltip, notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import Baseurl from '../../../../Api/BaseUrl';
import '../../Monitoring SP List Akunting/style.css'
function Index() {
    const [DataAwalASP, setDataAwalASP] = useState("")
    const [TotalCurrentPage, setTotalCurrentPage] = useState("")
    const columns = [
        {
            name: "No",
            selector: (row, index) => (TotalCurrentPage.currentPage - 1) * 10 + index + 1,
            width: "70px",
            wrap: true,
        },
        {
            name: "SO ID",
            selector: (row) => row.sp,
            wrap: true,
        },
        {
            name: "Perusahaan",
            selector: (row) => row.perusahaan,
            wrap: true,
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
          },
        {
            name: "Service",
            selector: (row) => row.service,
        },
        {
            name: "Vehicle",
            selector: (row) => row.kendaraan,
        },
        {
            name: "Pickup Date",
            selector: (row) => new Date(row.pickupDate).toLocaleDateString("en-CA"),
            wrap: true,
        },
        {
            name: "Destination",
            selector: (row) => row.destination,
            wrap: true,
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
            width: "200px",
            wrap: true,
        },

    ]
    const SpData = async (page= 1) => {
        try {
            const data = await axios.get(`${Baseurl}sp/get-SP-all-approve?limit=10&page=${page}&keyword=&statusSP=&customerId=&cabang=&sales=&buId=`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            setDataAwalASP(data.data.data.order)
            setTotalCurrentPage(data.data.data)
            console.log(data.data.data);
        } catch (error) {
            notification.error({
                message: 'Error!',
                description: error.response.data.status.message
            });
        }
    }
    useEffect(() => {
        SpData()
    }, [])

const ubahpaggination = (page) =>{
    SpData(page)
}

    return (
        <div>
            <Card>
                <style>
                    {`
          .rdt_TableBody .rdt_TableRow:hover {
            cursor: pointer;
            background-color: #C7E1FB;
          }
          
        `}
                </style>

                <DataTable
                    columns={columns}
                    data={DataAwalASP}
                    customStyles={{
                        headCells: {
                          style: {
                            backgroundColor: '#1a5cbf',
                            color: '#fff',
                            width:"100%"
                          },
                        },
                      }}
                // onRowClicked={RowClick}
                />
                <div className="d-flex justify-content-end mt-3">
                    <Pagination
                        showSizeChanger
                        onChange={ubahpaggination}
                        // defaultPageSize={10}
                        size="default"
                        total={TotalCurrentPage.totalPage}
                        defaultCurrent={1}
                    />
                </div>
            </Card>
        </div>
    )
}

export default Index;