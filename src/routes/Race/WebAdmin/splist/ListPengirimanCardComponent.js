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
import Baseurl from '../../../../Api/BaseUrl'
import "../../Erlangga/style.css"
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
function ListPengiriman({ setOpen, CariDisini }) {
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
        try {
            const datsa = await axios.get(`${Baseurl}sp/get-SP-all?limit=${Spdata?.size}&page=${page}&keyword=${CariDisini}&statusSP=&customerId=&codeBrench=JKT&sales=&buId=`,
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
        } catch (error) {

        }
    }
    useEffect(() => {
        SpAll()
    }, [Spdata.size, CariDisini])
    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            width: "70px"
        },
        {
            title: "SO ID",
            key: 'so_id',
            render: (text, record) => {
                let tagColor = record.service.toLowerCase() === "charter" ? "blue" : "gold";
                return (
                    <Tag color={tagColor}>
                        {record.sp} <br />
                        {record.service}
                        {record?.is_issue === 1 && ["admin", "sales", "account receivable"].includes(localStorage.getItem("level")) && (
                            <svg style={{ marginLeft: 2 }} xmlns="http://www.w3.org/2000/svg">
                                {/* SVG paths */}
                            </svg>
                        )}
                    </Tag>
                );
            }
        },
        {
            title: "Perusahaan",
            dataIndex: 'perusahaan',
            key: 'perusahaan',
        },
        {
            title: "Marketing",
            dataIndex: 'salesName',
            key: 'salesName',
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
            title: "Vehicle",
            dataIndex: 'kendaraan',
            key: 'kendaraan',
        },
        {
            title: "Pickup Date",
            dataIndex: 'pickupDate',
            key: 'pickupDate',
            render: (text, record) => {
                let date = new Date(text);
                let year = date.getFullYear();
                let month = (1 + date.getMonth()).toString().padStart(2, "0");
                let day = date.getDate().toString().padStart(2, "0");
                return (
                    <Tag color="green">{`${year}-${month}-${day}`}</Tag>
                );
            },
        },
        {
            title: "Destination",
            dataIndex: 'destination',
            key: 'destination',
        },
        {
            title: "Sales",
            key: 'sales',
            render: (text, record) => {
                const tanggal = record.dateApproveSales;
                return record?.approveAct === "Y" ? (
                    <Tag color="green">
                        Approved <br /> {tanggal}
                    </Tag>
                ) : record?.approveSales === "Y" && tanggal !== "Invalid Date" ? (
                    <Tag color="green">
                        Approved <br /> {tanggal}
                    </Tag>
                ) : record?.approveSales === "N" && tanggal !== "Invalid Date" ? (
                    <Tag color="red">
                        Reject <br /> {tanggal}
                    </Tag>
                ) : (
                    <Tag color="blue">
                        Pass <br /> {tanggal}
                    </Tag>
                );
            },
        },
        {
            title: "Akunting",
            key: 'akunting',
            render: (text, record) => {
                const tanggal = record.dateApproveAct;
                return record?.approveAct === "Y" ? (
                    <Tag color="green">
                        Approved <br /> {tanggal}
                    </Tag>
                ) : (record?.approveAct === "N" && tanggal === "1970-01-01 07:00:00") ||
                    "Invalid Date" ? (
                    <Tag color="yellow">
                        Waiting <br /> {tanggal ? "-" : tanggal}
                    </Tag>
                ) : (record?.approveAct === "N" && tanggal !== "1970-01-01 07:00:00") ||
                    "Invalid Date" ? (
                    <Tag color="red">
                        Diverted <br /> {tanggal}
                    </Tag>
                ) : (
                    <Tag color="blue">
                        Pass <br /> {tanggal}
                    </Tag>
                );
            },
        },
        {
            title: "Operasional",
            key: 'operasional',
            render: (text, record) => {
                const dateApproveOps = record?.dateApproveOps;
                const isValidDate = !isNaN(new Date(dateApproveOps));
                const data = isValidDate ? dateApproveOps : "-";
                const idops = record?.idops;
                const approveOps = record?.approveOps;
                if (record?.approveOps === "Y") {
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
        },
        {
            title: "Purchasing",
            key: 'purchasing',
            render: (text, record) => {
                const date = record?.dateApprovePurch;
                return (
                    <>
                        {record.approvePurch === "Y" && date != null ? (
                            <Tag color="green">
                                Approved <br /> {date}
                            </Tag>
                        ) : (record.approvePurch === "N" && date === "1970-01-01 07:00:00") ||
                            "Invalid date" ? (
                            <Tag color="yellow">
                                Waiting <br /> {date ? "-" : date}
                            </Tag>
                        ) : (record.approvePurch === "N" && date != "1970-01-01 07:00:00") ||
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
        },
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
    function GetdataTable(e,a) {
        console.log(e,a);
        router.push(`/masterdata/edit-sp/${a.idmp}`)

    }
    return (
        <div className='mt-2'>
            <Row >
                <Card style={{ overflowX: 'auto' }}> {/* <-- Add this style */}
                    <style>
                        {`
                .hover-row:hover {
                    background-color: #F36C43 ; 
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
// {Spdata.Isi && Spdata?.Isi.map((i) => (
//     <Col sm={6} >
//         <Card hoverable onClick={() => showDefaultDrawer()} style={{ height: 227 }}>
//             <Container>
//                 <Row style={{ marginTop: -10 }}>
//                     <Col sm={10}>
//                         <h3>{i.sp}</h3>
//                     </Col>
//                     <Col sm={2}>
//                         <Button style={{ backgroundColor: "#dfdfdf", color: "#a2a2a2" }}>Waiting</Button>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col sm={8}>
//                         <p style={{ marginBottom: "0px" }}>Pelanggan</p>
//                     </Col>
//                     <Col sm={4}>
//                         <p style={{ marginBottom: "0px" }}>Tanggal Pick Up</p>
//                     </Col>
//                     <Col sm={8}>
//                         <p style={{ marginTop: "0px", marginBottom: "0px", fontWeight: "bold" }}>{i.perusahaan}</p>
//                     </Col>
//                     <Col sm={4}>
//                         <p style={{ marginBottom: "20px", fontWeight: "bold" }}>{i.pickupDate}</p>
//                     </Col>
//                 </Row>
//                 <Row style={{ backgroundColor: "" }}>
//                     <Col sm={4}>
//                         <Row>
//                             <p style={{ marginBottom: "5px" }}>Asal Muatan</p>
//                         </Row>
//                         <p style={{ marginBottom: "-10px", fontWeight: "bold" }}>Kabupaten Bekasi</p>
//                         <Row >
//                             <p style={{ marginTop: "20px" }}>Kendaraan</p>
//                         </Row>
//                         <Row >
//                             <p style={{ marginTop: "-10px", fontWeight: "bold" }}>Kontainer 40</p>
//                         </Row>
//                     </Col>
//                     <Col sm={6}>
//                         <Row> <p style={{ marginBottom: "5px" }}>Tujuan Muatan</p>
//                         </Row>
//                         <p style={{ marginBottom: "-10px", fontWeight: "bold" }}>Jakarta Selatan</p>
//                         <Row >
//                             <p style={{ marginTop: "20px" }}>Tonase</p>
//                         </Row>
//                         <Row >
//                             <p style={{ marginTop: "-10px", fontWeight: "bold" }}>0</p>
//                         </Row>
//                     </Col>
//                     <Col>
//                         <img src={truck} className='d-flex' style={{ width: "101px", marginTop: "-10px", height: "101px" }}></img></Col>
//                 </Row>
//             </Container>
//         </Card>
//     </Col>
// ))}