import { Button, Card, Switch, Table, notification } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Baseurl from '../../../../Api/BaseUrl'
import "../../Erlangga/style.css"
import ModalDriverDetail from '../../Component Race/ModalDriverDetail'

function ListDriver() {
    const [modal1Open, setModal1Open] = useState(false);
    const [DetailSemuaDriver, setDetailSemuaDriver] = useState([]);
    const [Data, setData] = useState({
        data: null,
        totalData: null
    })
    const DataApi = async () => {
        try {
            const dataapi = await axios.get(`${Baseurl}driver/get-driver?limit=10&page=1&keyword=&jenis_kepemilikan=race&status=`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            setData(datas => ({
                ...datas,
                data: dataapi?.data?.data?.order,
                totalData: dataapi?.data?.data?.totalData,
            }))

        } catch (error) {

        }
    }

    useEffect(() => {
        DataApi()
    }, [])
    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Image',
            dataIndex: 'driverImage',
            key: 'driverImage',
            width: "10%",
            render: (img) => {
                return <img src={img} />
            }
        },
        {
            title: 'Nik Driver',
            dataIndex: 'nik',
            key: 'nik',
        },

        {
            title: 'Code Driver',
            dataIndex: 'driverCode',
            key: 'driverCode',
        },

        {
            title: 'Nama',
            dataIndex: 'driverName',
            key: 'driverName',
        },
        {
            title: 'Jenis SIM',
            dataIndex: 'simType',
            key: 'simType',
        },
        {
            title: 'Jenis Kendaraan',
            dataIndex: 'vehicle',
            key: 'vehicle',
        },
        {
            title: 'Kepemilikan',
            dataIndex: 'jenisKepemilikan',
            key: 'jenisKepemilikan',
        },
        {
            title: 'Aksi',
            dataIndex: 'driverId',
            key: 'driverId',
            render: (driverId, record) => (
                <div
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <Switch
                        checked={record.driverStatus === 1 ? true : false}
                        checkedChildren="ON"
                        unCheckedChildren="OFF"
                        onChange={(checked) => checked ? ModalONDriver(driverId) : ModalOFFDriver(driverId)}
                    />
                </div>
            )
        },


    ]

    const ModalONDriver = async (driverId) => {
        try {

            const data = await axios.post(
                `${Baseurl}driver/ready-driver`,
                {
                    id: driverId,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );

            // Tampilkan notifikasi sukses dari antd
            notification.success({
                message: 'Sukses',
                description: 'Status driver telah diubah menjadi "ON".',
                placement: 'topRight'  // ini akan menempatkan notifikasi di pojok kanan atas
            });

            DataApi();
        } catch (error) {
            // Handle error
            notification.error({
                message: error.response.data.status.message
            })
        }
    };


    const ModalOFFDriver = async (driverId) => {
        try {

            const data = await axios.post(
                `${Baseurl}driver/off-driver`,
                {
                    id: driverId,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );

            notification.success({
                message: 'Sukses',
                description: 'Status driver telah diubah menjadi "OFF".',
                placement: 'topRight'  // ini akan menempatkan notifikasi di pojok kanan atas
            });

            DataApi();
        } catch (error) {
            // Handle error
            notification.error({
                message: error.response.data.status.message
            })
        }
    };




    function Pageination(page, size) {
        console.log(page, size);
    }
    function GetdataTable(index, data) {
        console.log(index, data);
        setModal1Open(true)
        DataApiDriver(data.driverId)
    }
    const DataApiDriver = async (id) => {
        try {
            const dataapi = await axios.get(`${Baseurl}driver/get-driver-detail?id=${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            setDetailSemuaDriver(dataapi.data.data[0])

        } catch (error) {

        }
    }

    function CreateDriver() {
        setDetailSemuaDriver("")
        console.log(DetailSemuaDriver);
        setModal1Open(true)
    }

    return (
        <div>
            <Card>
                <Row>
                    <Col className='d-flex justify-content-end'>
                        <Button onClick={CreateDriver} type='primary'>Buat Driver</Button>
                    </Col>
                    <style>
                        {`
                .hover-row:hover {
                    background-color: #F36C43 ; 
                    cursor: pointer;
                }
                `}
                    </style>
                    <Table columns={columns} dataSource={Data?.data}
                        loading={!Data.data}
                        pagination={{
                            // current: currentPage, // halaman saat ini
                            // pageSize: itemsPerPage, // jumlah item per halaman
                            total: Data?.totalData, // total jumlah item
                            onChange: (page, size) => {
                                Pageination(page, size)
                            }
                        }}
                        onRow={(data, index) => ({
                            onClick: event => {
                                GetdataTable(index, data)
                            },
                            className: 'hover-row'
                        })}
                    />
                </Row>
                <ModalDriverDetail setDetailSemuaDriver={setDetailSemuaDriver} DetailSemuaDriver={DetailSemuaDriver} setModal1Open={setModal1Open} modal1Open={modal1Open} />
            </Card>
        </div>
    )
}

export default ListDriver