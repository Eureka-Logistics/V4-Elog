import { Card, Pagination, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import Baseurl from '../../../../Api/BaseUrl';

function Index() {
    const [DataAwalASP, setDataAwalASP] = useState("")
    const columns = [
        {
            name: "No",
            selector: (row) => row.no,
            width: "70px",
            wrap: true,
        },
        {
            name: "SP ID",
            selector: (row) => row.sp,
            width: "150px",
            wrap: true,
        },
        {
            name: "Perusahaan",
            selector: (row) => row.perusahaan,
            wrap: true,
            width: "120px",
        },
        {
            name: "Marketing",
            selector: (row) => row.salesName,
            width: "100px",
            wrap: true,
        },
        {
            name: "Service",
            selector: (row) => row.service,
            width: "80px",
            wrap: true,
        },
        {
            name: "Vehicle",
            selector: (row) => row.kendaraan,
            width: "80px",
            wrap: true,
        },
        {
            name: "Pickup Date",
            selector: (row) => new Date(row.pickupDate).toLocaleDateString("en-CA"),
            width: "100px",
            wrap: true,
        },
        {
            name: "Destination",
            selector: (row) => row.destination,
            width: "150px",
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
            width: "160px",
            wrap: true,
        },

    ]
    const SpData = async () => {
        try {
            const data = await axios.get(`${Baseurl}sp/get-SP-all-approve?limit=10&page=1&keyword=&statusSP=&customerId=&cabang=&sales=&buId=`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            setDataAwalASP(data.data.data.order)
            console.log(data.data.data.order);
        } catch (error) {

        }
    }
    useEffect(() => {
        SpData()
    }, [])
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
                // onRowClicked={RowClick}
                />
                <div className="d-flex justify-content-end mt-3">
              <Pagination
                showSizeChanger
                // onChange={buttonarahin}
                // defaultPageSize={10}
                size="default"
                // total={TotalPage}
                defaultCurrent={1}
              />
            </div>
            </Card>
        </div>
    )
}

export default Index;