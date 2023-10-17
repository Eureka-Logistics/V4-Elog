import { Card, Input, Pagination, message, notification } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import Baseurl from '../../../Api/BaseUrl';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function CancelSPListSales() {
    const [DataAwal, setDataAwal] = useState("")
    const [CariSP, setCariSP] = useState("")
    const [DataPaginations, setDataPaginations] = useState("")

    const columns = [
        {
            name: 'No',
            width: '50px',
            selector: row => row.no,
        },
        {
            name: 'No SP',
            selector: row => row.sp,
            width: '150px',
        },
        {
            name: 'Perusahaan',
            width: '220px',
            selector: row => row.perusahaan,
        },
        {
            name: 'Marketing',
            selector: row => row.marketing,
            width: '150px',
        },
        {
            name: 'Service',
            selector: row => row.service,
            width: '150px',
        },
        {
            name: 'Kendaraan',
            selector: row => row.vehicle,
            width: '150px',
        },
        {
            name: 'Message',
            selector: row => row.massage,
        },
    ];

    const DataApiAwal = async (page = 1) => {
        try {
            const data = await axios.get(`${Baseurl}sp/get-list-cancel-do?limit=10&page=${page}&keyword=${CariSP}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token")
                    },

                }
            )
            setDataPaginations(data.data.data?.totalData)
            setDataAwal(data.data.data.order)
        } catch (error) {
            notification.error({
                message: error.response.data.status.message
            })
        }
    }

    useEffect(() => {
        DataApiAwal()
    }, [CariSP])
    const onPaginationChange = (page) => {
        DataApiAwal(page)
    }
    const history = useHistory();
    const pindahspdetail = (row) => {
        history.push(`/masterdata/splistdetailakunting/${row.idmp}`);
        console.log(row);
    }

    return (
        <div>
            <Card>
                <div className='d-flex justify-content-end'>
                    <Row>
                        <Col style={{ width: "100%" }} sm={6}>
                            <Input
                                placeholder='Cari SP'
                                onChange={(e) => setCariSP(e.target.value)}
                            />
                        </Col>
                    </Row>
                </div>
                <Row>
                    <DataTable
                        columns={columns}
                        data={DataAwal}
                        onRowClicked={pindahspdetail}
                        title="Reject SP Sales"
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
                    <div className='mt-3 d-flex justify-content-end'>
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
                            onChange={onPaginationChange}
                            size="default"
                            total={DataPaginations}
                            defaultCurrent={1}
                        />
                    </div>
                </Row>
            </Card>
        </div>
    )
}

export default CancelSPListSales