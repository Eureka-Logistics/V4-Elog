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

    ]
    return (
        <div >
            <Table style={{ overflowY: "scroll", height: 300 }} pagination={false} columns={columns} dataSource={IsiInputan?.history} />
        </div>
    )
}

export default TableHistory