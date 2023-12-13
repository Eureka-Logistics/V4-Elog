import { Table, Tag } from 'antd'
import React from 'react'

function TableHistory({ IsiInputan }) {
    const fullname = localStorage.getItem("fullname")

    console.log(`IsiInputan`, IsiInputan);
    const columns = [
        {
            title: 'Nama Perubah',
            dataIndex: 'user',
            key: 'user',
            render: (user) => {
                return <div>{user == fullname ? <Tag color='blue'>{user}</Tag> : <Tag color='gold'>{user}</Tag>}</div>
            }
        },
        {
            title: 'Tanggal Berubah',
            dataIndex: 'tanggal',
            key: 'SP',
        },
        {
            title: 'Pesan',
            dataIndex: 'massage',
            key: 'SP',
        },
        {
            title: 'lat lama',
            dataIndex: 'lat_old',
            key: 'SP',
            render: (lat_old) => {
                return <Tag color='red'>{lat_old}</Tag>
            }
        },
        {
            title: 'lon lama',
            dataIndex: 'lon_old',
            render: (lon_old) => {
                return <Tag color='red'>{lon_old}</Tag>
            }
        },
        {
            title: 'lat baru',
            dataIndex: 'lat_new',
            render: (lat_new) => {
                return <Tag color='green'>{lat_new}</Tag>
            }
        },

        {
            title: 'lon baru',
            dataIndex: 'lon_new',
            render: (lon_new) => {
                return <Tag color='green'>{lon_new}</Tag>
            }
        },

    ]
    return (
        <div >
            <Table style={{ overflowY: "scroll", height: 300 }} pagination={false} columns={columns} dataSource={IsiInputan?.history} />
        </div>
    )
}

export default TableHistory