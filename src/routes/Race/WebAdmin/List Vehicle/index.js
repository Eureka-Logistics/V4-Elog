import { Button, Card, Input, Select, Table, notification } from 'antd'
import { Switch } from 'antd';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Baseurl from '../../../../Api/BaseUrl'
import "../../Erlangga/style.css"
import ModalVehicleDetailRace from '../../Component Race/ModalVehicleDetail'

function ListVehicle() {
    const [DetailSemuaVehilce, setDetailSemuaVehilce] = useState([])
    const [Data, setData] = useState({
        data: null,
        totalData: null,
        jenisKepemilikan: "race",
        paggination: 1,
        size: 10,
    })
    const [modal1Open, setModal1Open] = useState(false);
    const List = async () => {
        try {
            const data = await axios.get(`${Baseurl}vehicle/get-vehicle?limit=${Data.size}&page=${Data?.paggination}&keyword=&jenisKepemilikan=${Data?.jenisKepemilikan}&status=`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                })
            setData(asw => ({
                ...asw,
                data: data?.data?.data?.order,
                totalData: data?.data?.data?.totalData,
            }))
        } catch (error) {

        }
    }
    useEffect(() => {
        List()
    }, [Data?.jenisKepemilikan, Data?.paggination, Data.size])
    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Image',
            dataIndex: 'vehicleImage',
            key: 'vehicleImage',
            render: (img) => {
                return <img src={img} alt="vehicle" style={{ width: '70px', height: '70px' }} /> // Anda dapat menyesuaikan lebar dan tinggi sesuai kebutuhan
            }
        },
        {
            title: 'Vehicle Code',
            dataIndex: 'vehicleCode',
            key: 'vehicleCode',
        },
        {
            title: 'Police Number',
            dataIndex: 'policeNumber',
            key: 'policeNumber',
        },
        {
            title: 'Jenis Kepemilikan',
            dataIndex: 'jenisKepemilikan',
            key: 'jenisKepemilikan',
        },
        {
            title: 'Nama Driver',
            dataIndex: 'driverName',
            key: 'driverName',
        },
        {
            title: 'Aksi',
            dataIndex: 'vehicleId',
            key: 'vehicleId',
            render: (vehicleId, row) => (
                <div onClick={(e)=>{
                    e.preventDefault()
                    e.stopPropagation()
                }}>
                    <Switch
                        checked={row.status === "1" ? true : false}
                        checkedChildren="ON"
                        unCheckedChildren="OFF"
                        onChange={(checked) => checked ? ModalONVehicle(vehicleId) : ModalOFFVehicle(vehicleId)}
                    />
                </div>
            )
        }

    ]

    const ModalOFFVehicle = async (vehicleId) => {
        try {
            const data = await axios.post(
                `${Baseurl}vehicle/off-vehicle`,
                {
                    id_vehicle: vehicleId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );

            // Tampilkan notifikasi sukses dari antd setelah API call berhasil
            notification.success({
                message: 'Sukses',
                description: 'Status kendaraan telah diubah menjadi "OFF".',
                placement: 'topRight'  // ini akan menempatkan notifikasi di pojok kanan atas
            });

            List();
        } catch (error) {
            // Handle error
            notification.error({
                message: 'Error',
                description: 'Terjadi kesalahan saat mengubah status kendaraan.',
                placement: 'topRight'  // ini akan menempatkan notifikasi di pojok kanan atas
            });
        }
    };
    const ModalONVehicle = async (vehicleId) => {
        try {
          
            const data = await axios.post(
                `${Baseurl}vehicle/on-vehicle`,
                {
                    id_vehicle: vehicleId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );
            notification.success({
                message: 'Sukses',
                description: 'Status kendaraan telah diubah menjadi "ON".',
                placement: 'topRight'  // ini akan menempatkan notifikasi di pojok kanan atas
            });

            List();
        } catch (error) {
            // Handle error
            notification.error({
                message: 'Error',
                description: 'Terjadi kesalahan saat mengubah status kendaraan.',
                placement: 'topRight'  // ini akan menempatkan notifikasi di pojok kanan atas
            });
        }
    };

    function SelectKepemilikan(e) {
        setData(prev => ({
            jenisKepemilikan: e
        }))
    }
    function Pageination(page, size) {
        setData(data => ({
            ...data,
            paggination: page,
            size: size
        }))

    }

    function GetdataTable(d, i) {
        setModal1Open(true)
        DetailVehicle(i.vehicleId)
    }

    const DetailVehicle = async (id) => {
        try {
            const data = await axios.get(`${Baseurl}vehicle/get-vehicle-detail?id=${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                })
            setDetailSemuaVehilce(data.data.data[0]);
        } catch (error) {

        }
    }

    function CreateVehicle() {
        setDetailSemuaVehilce("")
        setModal1Open(true)
    }

    return (
        <div>
            <Card>
                <Row>
                    <Col sm={3} >
                        <Select style={{ width: "100%" }} value={Data?.jenisKepemilikan} onChange={(e) => SelectKepemilikan(e)}>
                            <option value={"race"}>Race</option>
                            <option value={"race_oncall"}>Race_Oncall</option>
                        </Select>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Button type='primary' onClick={CreateVehicle}>Buat Kendaraan</Button>
                    </Col>
                </Row>
                <style>
                    {`
                .hover-row:hover {
                    background-color: #F36C43 ; 
                    cursor: pointer;
                }
                `}
                </style>
                <Table
                    className='mt-3'
                    columns={columns}
                    loading={!Data.data}
                    dataSource={Data.data}
                    pagination={{
                        // current: currentPage, // halaman saat ini
                        // pageSize: itemsPerPage, // jumlah item per halaman
                        total: Data.totalData,
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
                <ModalVehicleDetailRace setDetailSemuaVehilce={setDetailSemuaVehilce} DetailSemuaVehilce={DetailSemuaVehilce} setModal1Open={setModal1Open} modal1Open={modal1Open} />
            </Card>
        </div>
    )
}

export default ListVehicle