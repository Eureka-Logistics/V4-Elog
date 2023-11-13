import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Baseurl from '../../../../Api/BaseUrl'
import DataTable from 'react-data-table-component'
import { Card, Input, Pagination, Select, Tag } from 'antd'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import ElogLoadingGif from "../../../../assets/Loader_Elogs1.gif";
function ListPageSpPurchasing() {
    const [MultiSelect, setMultiSelect] = useState(1)
    const [loading, setloading] = useState(false)
    const [dataApi, setdataApi] = useState("")
    const [searchSO, setsearchSO] = useState("")
    const [paggination, setPagginations] = useState({
        totalData: 10,
        limit: 10,
        currentPage: 1
    })
    console.log(`totalData`,paggination?.totalPage);
    const [asw, setasw] = useState('')
    const history = useHistory();
    const datasp = async (e = 1) => {
        try {
            setloading(true)
            const data = await axios.get(`${Baseurl}sp/get-list-purch?limit=${paggination.limit}&page=${paggination.currentPage}&is_multi=${MultiSelect}&keyword=${searchSO}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            const response = await data.data.data.order
            setPagginations({
                totalPage: data.data.data.totalPage,
                limit: data.data.data.limit,
                currentPage: data.data.data.currentPage,
                totalData: data.data.data.totalData,
            })
            setdataApi(response)
            setasw(response)
            setloading(false)
        } catch (error) {

        }
    }

    const table = [
        {
            name: "No",
            selector: (row) => row.no,
            width: "80px"
        },
        {
            name: "No SP",
            selector: (row) =>
                row.sp,
        },
        {
            name: "Sales",
            selector: (row) =>
                row.salesName,
        },
        {
            name: "Perusahaan",
            selector: (row) =>
                row.perusahaan,
        },
        {
            name: "Service",
            selector: (row) => row.service,
            cell: (row, index) => {
                if (row.service === "charter" || row.service === "Charter") {
                    return <Tag color="blue">Charter
                        <br />
                        {row.pickupDate}
                    </Tag>
                } else {
                    return <Tag color="yellow">Retail
                        <br />
                        {row.pickupDate}</Tag>
                }
            }
        },
        {
            name: "Approve Act",
            selector: (row) =>
                row.dateApproveAct,
        },
        {
            name: "Approve Ops",
            selector: (row) =>
                row.dateApproveOps,
        },
    ]
    useEffect(() => {
        datasp();
    }, [MultiSelect, paggination.limit, paggination.currentPage, searchSO]);


    function selectmulti() {
        if (MultiSelect === 1) {
            return <>Multi Drop</>
        } else if (MultiSelect === 0)
            return <>Tidak Multi Drop</>

    }

    function onShowSizeChanges(e) {
        setPagginations(prevPaggination => ({
            ...prevPaggination,
            currentPage: e
        }));
        console.log(paggination);
    }
    function onShowSizeChange(e, b) {
        console.log(b); // Ini akan mencetak limit baru yang dipilih oleh pengguna dari size changer
        setPagginations(prevPaggination => ({
            ...prevPaggination,
            limit: b
        }));
        console.log(paggination); // Perlu diingat bahwa ini mungkin tidak mencetak perubahan terbaru karena setPagginations bersifat asynchronous
    }

    const buttonarahin = (row) => {
        history.push(`/masterdata/purchasing/detailsp/${row.idmp}`);
    };
    // if (!dataApi) {
    //     return <>loading...</>
    // }
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
                <div>
                    <Row className='mb-3'>
                        <Col sm={2}>
                            <Select
                                placeholder={selectmulti()}
                                style={{ width: "100%" }}
                                onChange={(e) => setMultiSelect(e)}
                                value={MultiSelect}
                            >
                                <option value={"-"}>All</option>
                                <option value={1}>Multi Drop</option>
                                <option value={0}>Tidak MultiDrop</option>
                                <option disabled value={2}>Semua</option>
                            </Select>
                        </Col>
                        <Col sm={2}>
                            <Input
                                placeholder={"Cari SO"}
                                style={{ width: "100%" }}
                                onChange={(e) => setsearchSO(e.target.value)}
                            >

                            </Input>
                        </Col>
                    </Row>
                </div>
                {loading ? <img className="d-flex justify-content-center" src={ElogLoadingGif} width="800px" /> :
                    <DataTable
                        columns={table}
                        data={dataApi}
                        onRowClicked={buttonarahin}
                        className="myCustomTable"
                        customStyles={{
                            headCells: {
                                style: {
                                    backgroundColor: '#1a5cbf',
                                    color: '#fff',
                                    width: "100%"
                                },
                            },
                        }}
                    />
                }
                <div className="d-flex justify-content-end mt-3">
                    <Pagination
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}
                        onChange={onShowSizeChanges}
                        defaultCurrent={1}
                        total={paggination.totalData}
                    />
                </div>
            </Card>
        </div >
    )
}

export default ListPageSpPurchasing