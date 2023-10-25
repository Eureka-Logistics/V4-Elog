import { Card, Input, Select, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Baseurl from '../../../../Api/BaseUrl'
import "../../Erlangga/style.css"

function ListVehicle() {
    const [Data, setData] = useState({
        data: null,
        totalData: null,
        jenisKepemilikan: "race",
        paggination: 1,
        size: 10
    })
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
                data: data.data?.data.order,
                totalData: data.data.data.totalData,
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
    ]

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
                </Row>
                <Table className='mt-3' columns={columns} dataSource={Data.data}
                    pagination={{
                        // current: currentPage, // halaman saat ini
                        // pageSize: itemsPerPage, // jumlah item per halaman
                        total: Data.totalData, // total jumlah item
                        onChange: (page, size) => {
                            Pageination(page, size)
                        }
                    }} />
            </Card>
        </div>
    )
}

export default ListVehicle