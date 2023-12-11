import { Modal, Table } from 'antd'
import React from 'react'

function ListModalFaktur({ DataApi, ModalBukaTutup, setModalBukaTutup }) {
    console.log(`DataApi`, DataApi);
    const column = [
        {
            title: 'kode_penerima',
            dataIndex: 'kode_penerima',
            key: 'no',
        },
        {
            title: 'pic_nik',
            dataIndex: 'pic_nik',
            key: 'vehicleCode',
        },
        {
            title: 'pic_divisi',
            dataIndex: 'pic_divisi',
            key: 'driverName',
        },
        {
            title: 'referensi',
            dataIndex: 'referensi',
            key: 'referensi',

        },
        {
            title: 'referensi_1',
            dataIndex: 'referensi_1',
            key: 'referensi_1',

        },
        {
            title: 'kode_penerima',
            dataIndex: 'kode_penerima',
            key: 'vehicleCode',
        },
        {
            title: 'kota',
            dataIndex: 'kota',
            key: 'kota',

        },
        {
            title: 'kecamatan',
            dataIndex: 'kecamatan',
            key: 'kecamatan',

        },
        {
            title: 'penerima',
            dataIndex: 'penerima',
            key: 'penerima',

        },
        {
            title: 'item',
            dataIndex: 'item',
            key: 'item',

        },
        {
            title: 'berat',
            dataIndex: 'berat',
            key: 'berat',

        },
        {
            title: 'Ikat',
            dataIndex: 'ikat',
            key: 'ikat',
            render: ikat => Number(ikat).toFixed(0) == NaN ? ikat.toString().split('.')[0] : Number(ikat).toFixed(0)
        },
        {
            title: 'koli',
            dataIndex: 'koli',
            key: 'koli',

        },

        {
            title: 'qty',
            dataIndex: 'qty',
            key: 'qty',

        },

    ]
    return (
        <div>
            <Modal
                title={"List Faktur"}
                open={ModalBukaTutup}
                onCancel={() => setModalBukaTutup(false)}   
                onOk={() => setModalBukaTutup(false)}
                width={"auto"}
            >
                <Table style={{ overflow: "auto" }} columns={column} dataSource={DataApi?.[0]?.detailFaktur}
                    pagination={false}
                />
            </Modal>
        </div>
    )
}

export default ListModalFaktur