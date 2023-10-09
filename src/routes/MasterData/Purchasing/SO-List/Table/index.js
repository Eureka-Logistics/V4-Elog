import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { httpClient } from '../../../../../Api/Api';
import Baseurl from '../../../../../Api/BaseUrl';
import ModalSOList from '../ModalDetailSO';
function SOListTable() {
    const [data, setdata] = useState([])
    const [DetailData, setDetailData] = useState({});
    const [modal1Open, setModal1Open] = useState(false);
    const [pagginations, setpagginations] = useState({
        currentPage: null,
        limit: null,
        totalData: null,
        totalPage: null
    })
    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Mpo',
            dataIndex: 'mpo',
            key: 'mpo',
        },
        {
            title: 'Mitra',
            dataIndex: 'mitra',
            key: 'mitra',
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'TOP',
            dataIndex: 'top',
            key: 'top',
        },
        {
            title: 'Mitra',
            dataIndex: 'mitra',
            key: 'mitra',
        },
        {
            title: 'Via',
            dataIndex: 'via',
            key: 'via',
        },
        {
            title: 'Kendaraan',
            dataIndex: 'kendaraan',
            key: 'kendaraan',
        },
    ];
    const handleTableChange = (pagination) => {
        getlist(pagination);
    }
    const getlist = async (page = 1) => {
        try {
            const data = await httpClient(`${Baseurl}sm/get-list-po?limit=10&page=${page}`, { method: "GET" })
            const result = data
            setdata(result?.data.data.order)
            console.log(result.data.data);
            setpagginations({
                currentPage: result.data.data.currentPage,
                limit: result.data.data.limit,
                totalData: result.data.data.totalData,
                totalPage: result.data.data.totalPage
            })
        } catch (error) {
            console.log(error);
        }
    }
    const getDetaillist = async (idMpo) => {
        try {
            const data = await httpClient(`${Baseurl}sm/get-list-po-id?id_mpo=${idMpo}`, { method: "GET" })
            const result = data
            setDetailData(result.data.data)
            console.log(`idMpo`, result.data.data);
        } catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        getlist()
    }, [])
    const paginationss = {
        current: pagginations.currentPage,
        pageSize: pagginations.limit,
        total: pagginations.totalData,
        onChange: handleTableChange
    };

    const handleRowClick = (record) => {
        setModal1Open(true)
        getDetaillist(record.idMpo)
        console.log(record);

    }
    return (
        <div>
            <Table dataSource={data} columns={columns} pagination={paginationss}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })} />
            <ModalSOList getlist={getlist}setDetailData={setDetailData} DetailData={DetailData} setModal1Open={setModal1Open} modal1Open={modal1Open} />

        </div>
    )
}

export default SOListTable