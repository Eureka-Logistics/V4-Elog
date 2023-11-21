import { Button, Card, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Tooltip } from 'react-bootstrap'
import "./style.css"
import map from "../../../../assets/img/peta.png"
import icondriver from "../../../../assets/img/drivericon.png"
import telponicon from "../../../../assets/img/telponicon.png"
import whatsappicon from "../../../../assets/img/whatsappicon.png"
import truck from "../../../../assets/img/Truck Illu 1.png"
import vespa from "../../../../assets/img/vesva.png"
import axios from 'axios'
import Baseurl, { BaseUrlRace } from '../../../../Api/BaseUrl'
import "../../Erlangga/style.css"
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import OptionsCabangState from '../../../../zustand/Store/Race/optionsCabangRace'
function ListPengiriman({ setOpen, CariDisini, Cabang }) {
    const [Loading, setLoading] = useState(false)
    const DariCabang = localStorage.getItem("cabang")
    console.log(`DariCabang`,DariCabang);
    const showDefaultDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const [Spdata, setSpdata] = useState({
        Isi: null,
        Paggination: null,
        size: 10
    })
    const SpAll = async (page = 1) => {
        setLoading(true)
        try {
            // const datsa = await axios.get(`https://api.eurekalogistics.co.id/sp/get-SP-all?limit=${Spdata?.size}&page=${page}&keyword=${CariDisini}&statusSP=&customerId=&codeBrench=JKT&sales=&buId=`,
            const datsa = await axios.get(`${BaseUrlRace}sp/get-sp?limit=${Spdata?.size}&page=${page}&cabang=${Cabang}&keyword=${CariDisini}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            setSpdata(asw => ({
                ...asw,
                Isi: datsa?.data.data.order,
                Paggination: datsa?.data.data
            }))
            setLoading(false)
        } catch (error) {

        }
    }
    useEffect(() => {
        SpAll()
    }, [Spdata.size, CariDisini, Cabang])
    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            width: "70px"
        },
        {
            title: "SO ID",
            key: 'so',
            dataIndex: 'so',

        },
        // {
        //     title: "Perusahaan",
        //     dataIndex: 'perusahaan',
        //     key: 'perusahaan',
        // },
        {
            title: "Cabang",
            dataIndex: 'cabang',
            key: 'cabang',
            //   render: (text, record) => (
            //     <Tooltip title={
            //       <>
            //         {"Gl: " + record?.gl} <br />
            //         {"Asm: " + record?.asm} <br />
            //         {"Mgr: " + record?.mgr} <br />
            //         {"Kacab: " + record?.kacab} <br />
            //         {"Amd: " + record?.amd} <br />
            //       </>
            //     }>
            //       {record?.salesName}
            //     </Tooltip>
            //   ),
        },
        {
            title: "Sales",
            dataIndex: 'sales',
            key: 'sales',
        },
        {
            title: "Kendaraan",
            dataIndex: 'kendaraan',
            key: 'kendaraan',
        },
        {
            title: "Sekolah Tujuan",
            dataIndex: 'sekolahtujuan',
            key: 'sekolahtujuan',

        },
        // {
        //     title: "Sales",
        //     key: 'sales',
        //     render: (text, record) => {
        //         const tanggal = record.dateApproveSales;
        //         return record?.approveAct === "Y" ? (
        //             <Tag color="green">
        //                 Approved <br /> {tanggal}
        //             </Tag>
        //         ) : record?.approveSales === "Y" && tanggal !== "Invalid Date" ? (
        //             <Tag color="green">
        //                 Approved <br /> {tanggal}
        //             </Tag>
        //         ) : record?.approveSales === "N" && tanggal !== "Invalid Date" ? (
        //             <Tag color="red">
        //                 Reject <br /> {tanggal}
        //             </Tag>
        //         ) : (
        //             <Tag color="blue">
        //                 Pass <br /> {tanggal}
        //             </Tag>
        //         );
        //     },
        // },
        // {
        //     title: "Akunting",
        //     key: 'akunting',
        //     render: (text, record) => {
        //         const tanggal = record.dateApproveAct;
        //         return record?.approveAct === "Y" ? (
        //             <Tag color="green">
        //                 Approved <br /> {tanggal}
        //             </Tag>
        //         ) : (record?.approveAct === "N" && tanggal === "1970-01-01 07:00:00") ||
        //             "Invalid Date" ? (
        //             <Tag color="yellow">
        //                 Waiting <br /> {tanggal ? "-" : tanggal}
        //             </Tag>
        //         ) : (record?.approveAct === "N" && tanggal !== "1970-01-01 07:00:00") ||
        //             "Invalid Date" ? (
        //             <Tag color="red">
        //                 Diverted <br /> {tanggal}
        //             </Tag>
        //         ) : (
        //             <Tag color="blue">
        //                 Pass <br /> {tanggal}
        //             </Tag>
        //         );
        //     },
        // },
        // {
        //     title: "Operasional",
        //     key: 'operasional',
        //     render: (text, record) => {
        //         const dateApproveOps = record?.dateApproveOps;
        //         const isValidDate = !isNaN(new Date(dateApproveOps));
        //         const data = isValidDate ? dateApproveOps : "-";
        //         const idops = record?.idops;
        //         const approveOps = record?.approveOps;
        //         if (record?.approveOps === "Y") {
        //             return (
        //                 <Tag color="green">
        //                     Approved <br /> {data}
        //                 </Tag>
        //             );
        //         } else if (
        //             (approveOps === "N" && dateApproveOps === "Invalid Date") ||
        //             dateApproveOps.toLowerCase() === "invalid date"
        //         ) {
        //             return (
        //                 <Tag color="yellow">
        //                     Waiting <br /> -
        //                 </Tag>
        //             );
        //         } else if (
        //             dateApproveOps !== "Invalid date" &&
        //             idops !== 0 &&
        //             approveOps === "N"
        //         ) {
        //             return (
        //                 <Tag color="blue">
        //                     Diverted <br /> {data}
        //                 </Tag>
        //             );
        //         } else if (approveOps === "N" && dateApproveOps !== "Invalid date") {
        //             return (
        //                 <Tag color="red">
        //                     Reject <br /> {data}
        //                 </Tag>
        //             );
        //         }
        //     },
        // },
        // {
        //     title: "Purchasing",
        //     key: 'purchasing',
        //     render: (text, record) => {
        //         const date = record?.dateApprovePurch;
        //         return (
        //             <>
        //                 {record.approvePurch === "Y" && date != null ? (
        //                     <Tag color="green">
        //                         Approved <br /> {date}
        //                     </Tag>
        //                 ) : (record.approvePurch === "N" && date === "1970-01-01 07:00:00") ||
        //                     "Invalid date" ? (
        //                     <Tag color="yellow">
        //                         Waiting <br /> {date ? "-" : date}
        //                     </Tag>
        //                 ) : (record.approvePurch === "N" && date != "1970-01-01 07:00:00") ||
        //                     "Invalid date" ? (
        //                     <Tag color="red">
        //                         Diverted <br /> {date}
        //                     </Tag>
        //                 ) : (
        //                     <Tag color="blue">
        //                         Pass <br /> {date}
        //                     </Tag>
        //                 )}
        //             </>
        //         );
        //     },
        // },
    ];
    function Pageination(page, size) {
        console.log(page, size);
        setSpdata(item => ({
            ...item,
            size: size
        }))
        SpAll(page)
    }
    const router = useHistory();
    function GetdataTable(e, a) {
        console.log(e, a);
        router.push(`/masterdata/edit-sp/${a.idmp}`)

    }

    return (
        <div className='mt-2'>
            <Row >
                <Card style={{ overflowX: 'auto' }}> {/* <-- Add this style */}
                    <style>
                        {`
                .hover-row:hover {
                    // background-color: #F36C43 ; 
                    cursor: pointer;
                }
                `}
                    </style>
                    <Table dataSource={Spdata?.Isi} columns={columns}
                        loading={!Spdata.Isi}
                        pagination={{
                            // current: currentPage, // halaman saat ini
                            // pageSize: itemsPerPage, // jumlah item per halaman
                            total: Spdata.Paggination?.totalData, // total jumlah item
                            onChange: (page, size) => {
                                Pageination(page, size)
                            }
                        }}
                        onRow={(data, index) => ({
                            onClick: event => {
                                GetdataTable(index, data)
                                // setOpen(true);
                            },
                            className: 'hover-row'
                        })}
                    />
                </Card>
            </Row>
        </div>
    )

}

export default ListPengiriman



// INi untuk sm katanya
