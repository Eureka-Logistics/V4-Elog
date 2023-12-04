import { Button, Card, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Tooltip } from 'react-bootstrap'
import "./style.css"
import axios from 'axios'
import { BaseUrlRace } from '../../../../Api/BaseUrl'
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
        {
            title: "SJ Erlangga",
            key: 'SjErlangga',
            dataIndex: 'SjErlangga',

        },
        {
            title: "Cabang",
            dataIndex: 'cabang',
            key: 'cabang',
        
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
        router.push(`/race/detailsp/${a.idMp}`)

    }

    return (
        <div className='mt-2'>
            <Row >
                <Card style={{ overflowX: 'auto' }}> 
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
