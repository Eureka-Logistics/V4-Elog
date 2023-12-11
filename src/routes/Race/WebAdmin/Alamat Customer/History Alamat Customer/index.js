import { Modal, Table } from 'antd'
import React, { useEffect } from 'react'
import AlamatCustomerZustand from '../../../../../zustand/Store/Race/fetch/AlamatCustomer'

function HistoryAlamatCustomer({ bukamodal, setbukamodal }) {
    const { fetchHistoryAlamat, DetailAlamatHistory } = AlamatCustomerZustand()
    useEffect(() => {
        fetchHistoryAlamat()
    }, [])
    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'name',
        },
        {
            title: 'Sekolah',
            dataIndex: 'sekolah',
            key: 'sekolah',
        },
        {
            title: 'User ',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Tanggal',
            dataIndex: 'tanggal',
            key: 'tanggal',
        },
        {
            title: 'Massage',
            dataIndex: 'massage',
            key: 'massage',
        },
    ]


    return (
        <div>
            <Modal
                title={"History Alamat Customer"}
                open={bukamodal}
                onCancel={() => setbukamodal(false)}
                onOk={() => setbukamodal(false)}
                width={1600}
                style={{top :10}}
            >
                <Table loading={!DetailAlamatHistory} className='mt-3' columns={columns} dataSource={DetailAlamatHistory} />
            </Modal>
        </div>
    )
}

export default HistoryAlamatCustomer