import { Card, Pagination, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Swal from "sweetalert2";
import Baseurl from '../../../Api/BaseUrl';
import axios from 'axios'
import {
    CheckCircleOutlined,
    TeamOutlined,
    CloseOutlined,
    CheckOutlined,
    PieChartOutlined
} from '@ant-design/icons';
import { Col, Row } from 'react-bootstrap';
import { format } from 'date-fns';
import ElogGif from "../../../assets/Loader_Elogs1.gif"
function Index() {
    const [inform, setinform] = useState('');
    const [Data, setData] = useState('');
    const [STNK, setStnk] = useState('');
    const jobdesk = localStorage.getItem('jobdesk')
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [currentPageSTNK, setCurrentPageSTNK] = useState(1);
    const [pageSizeSTNK, setPageSizeSTNK] = useState(10);
    const [JumlahExpSIM, setJumlahExpSIM] = useState("");
    const [JumlahExpSTNK, setJumlahExpSTNK] = useState("");

    const paginatedData = Data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const paginatedDataSTNK = STNK.slice((currentPageSTNK - 1) * pageSizeSTNK, currentPageSTNK * pageSizeSTNK);

    const columns = [
        {
            name: 'No',
            selector: (row, index) => (currentPage - 1) * pageSize + index + 1,
        },
        {
            name: 'Nama Driver',
            selector: row => row.driverName,
        },
        {
            name: 'Tanggal SIM',
            selector: row => {
                const date = new Date(row.simDate);
                const formattedDate = format(date, 'dd-MM-yyyy');
                return <Tag color='red'>{formattedDate}</Tag>
            }
        }

    ];
    const STNKTable = [
        {
            name: 'No',
            selector: (row, index) => (currentPageSTNK - 1) * pageSizeSTNK + index + 1,
        },
        {
            name: 'Kode Kendaraan',
            selector: row => row.kendaraanKode,
        },
        {
            name: 'No Polisi',
            selector: row => row.nopol,
        },
        {
            name: 'Tanggal SIM',
            selector: row => {
                return <Tag color='red'>{row?.tglStnk}</Tag>
            }
        }


    ];


    const fetchData = async () => {
        try {
            const response = await axios.get(`${Baseurl}information/get-inform-ops`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            if (response.status === 200) {
                const data = response.data?.operasional?.[0];
                console.log(response.data?.operasional?.[0]);
                setinform(response.data?.operasional?.[0]);
                setData(response.data.operasional?.[0]?.sim.driver)
                setStnk(response.data.operasional?.[0]?.stnk?.noplat)
                setJumlahExpSIM(response.data?.operasional?.[0]?.sim?.SimExpired)
                setJumlahExpSTNK(response.data?.operasional?.[0]?.stnk?.ExpireStnk)
                console.log(response.data.operasional?.[0]?.stnk.driver);
            } else if (response.status === 401) {
                localStorage.removeItem('token');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error Login, Silahkan Login Kembali '
                });
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                if (localStorage.getItem('token') === null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error Login, Silahkan Login Kembali '
                    });
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                    // history.push('/signin');
                }
            } else {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        localStorage.getItem('jobdesk')
        fetchData();
    }, [])

    if (!inform) {
        return <img src={ElogGif} width="100%"></img>

    }

    return (
        <div>
            <h5>Dashboard {jobdesk}</h5>
            <Row>
                <Col sm={3}>
                    <Card style={{ backgroundColor: "white", textAlign: 'center' }}>
                        <Row>
                           
                            <Col span={2}>
                                <div style={{ color: "grey"}}>
                                Driver Eureka
                                </div>
                                <h5>
                                    {inform?.EurekaDriver}
                                </h5>
                            </Col>
                            <Col span={2}>
                                <div style={{ fontSize: "30px", backgroundColor: '#00BFFF', borderRadius: "50%", width: "60px", height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <TeamOutlined  style={{color: "white"}}>
                                        </TeamOutlined>
                                </div>
                                </Col>

                        </Row>
                        {/* <h5 style={{ color: 'white' }}>Eureka Driver  <br />{inform?.EurekaDriver}</h5> */}

                    </Card>
                </Col>
                <Col sm={3}>
                    <Card style={{ backgroundColor: "white", textAlign: 'center' }}>
                        <Row>
                            <Col>
                                <div style={{ color: "grey"}}>
                                Driver Sewa
                                </div>
                                <h5>
                                {inform?.SewaDriver}
                                </h5>
                            </Col>
                            <Col span={2}>
                                <div style={{ fontSize: "30px", backgroundColor: '#6495ED', borderRadius: "50%", width: "60px", height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <TeamOutlined  style={{color: "white"}}>
                                        </TeamOutlined>
                                </div>
                                </Col>
                        </Row>
                        {/* <h5 style={{ color: 'white' }}>Eureka Driver  <br />{inform?.EurekaDriver}</h5> */}

                    </Card>
                </Col>
                <Col sm={3}>
                    <Card style={{ backgroundColor: "white", textAlign: 'center' }}>
                        <Row>
                            <Col>
                                <div style={{ color: "grey"}}>
                                    Total Driver
                                </div>
                                <h5>
                                {inform?.totalDriver}
                                </h5>
                            </Col>
                            <Col span={2}>
                                <div style={{ fontSize: "30px", backgroundColor: '#FFB6C1', borderRadius: "50%", width: "60px", height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <PieChartOutlined  style={{color: "white"}}>
                                        </PieChartOutlined>
                                </div>
                                </Col>
                        </Row>
                        {/* <h5 style={{ color: 'white' }}>Eureka Driver  <br />{inform?.EurekaDriver}</h5> */}

                    </Card>
                </Col>
                <Col sm={3}>
                    <Card style={{ backgroundColor: "white", textAlign: 'center' }}>
                        <Row>
                            <Col>
                                <div style={{ color: "grey"}}>
                                Driver aktif
                                </div>
                                <h5>
                                {inform?.activeDriver + " / " + inform?.totalDriver}
                                </h5>
                            </Col>
                            <Col span={2}>
                                <div style={{ fontSize: "30px", backgroundColor: '#98FB98', borderRadius: "50%", width: "60px", height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <CheckOutlined  style={{color: "white"}}>
                                        </CheckOutlined>
                                </div>
                                </Col>
                        </Row>
                        {/* <h5 style={{ color: 'white' }}>Eureka Driver  <br />{inform?.EurekaDriver}</h5> */}

                    </Card>
                </Col>
                <Col sm={3}>
                    <Card style={{ backgroundColor: "white", textAlign: 'center' }}>
                        <Row>
                            <Col>
                                <div style={{ color: "grey"}}>
                                Driver tidak tersedia
                                </div>
                                <h5>
                                {inform?.offDriver}
                                </h5>
                            </Col>
                            <Col span={2}>
                                <div style={{ fontSize: "30px", backgroundColor: '#FF4500', borderRadius: "50%", width: "60px", height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <CloseOutlined  style={{color: "white"}}>
                                        </CloseOutlined>
                                </div>
                                </Col>
                        </Row>
                        {/* <h5 style={{ color: 'white' }}>Eureka Driver  <br />{inform?.EurekaDriver}</h5> */}

                    </Card>
                </Col>
                {/* <Col sm={4}>
                    <Card style={{ backgroundColor: "#00a65a" }}>
                        <h5 style={{ color: 'white' }}>Total Mobil : {inform?.totalVeh}</h5>
                        <h5 style={{ color: 'white' }}>Mobil Aktif : {inform?.activeVeh + " / " + inform?.totalVeh}</h5>
                        <h5 style={{ color: 'white' }}>Mobil Off : {inform?.offVeh}</h5>
                    </Card>
                </Col> */}
                {/* <Col>
                    <Card style={{ backgroundColor: "#dd4b39", textAlign: 'center' }}>
                        <h5 style={{ color: 'white' }}>Sewa Driver  <br />{inform?.SewaDriver}</h5>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ backgroundColor: "#dd4b39", textAlign: 'center' }}>
                        <h5 style={{ color: 'white' }}>Total Driver <br /> {inform?.totalDriver}</h5>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ backgroundColor: "#dd4b39", textAlign: 'center' }}>
                        <h5 style={{ color: 'white' }}>Driver Aktif  <br />{inform?.activeDriver + " / " + inform?.totalDriver}</h5>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ backgroundColor: "#dd4b39", textAlign: 'center' }}>
                        <h5 style={{ color: 'white' }}>Driver Off :<br /> {inform?.offDriver}</h5>
                    </Card>
                </Col> */}
            </Row>
            <Card>
                <DataTable
                    columns={columns}
                    data={paginatedData}
                    title={(<Tag color="#f50">Jumlah SIM EXPIRED : {JumlahExpSIM}</Tag>)}
                />
                <div className='d-flex mt-3 justify-content-end'>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={Data.length}
                        onChange={(page, pageSize) => {
                            setCurrentPage(page);
                            setPageSize(pageSize);
                        }}
                    />
                </div>
            </Card>
            <Card>
                <div className='mt-5'>
                    <DataTable
                        columns={STNKTable}
                        data={paginatedDataSTNK}
                        title={(<Tag color="#f50">Jumlah STNK EXPIRED : {JumlahExpSTNK}</Tag>)}
                    />
                </div>
                <div className='d-flex mt-3 justify-content-end'>
                    <Pagination
                        current={currentPageSTNK}
                        pageSize={pageSizeSTNK}
                        total={STNK.length}
                        onChange={(page, pageSizeSTNK) => {
                            setCurrentPageSTNK(page);
                            setPageSizeSTNK(pageSizeSTNK);
                        }}
                    />
                </div>
            </Card>
        </div>
    )
}

export default Index