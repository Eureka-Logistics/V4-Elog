import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Baseurl from '../../../../../../Api/BaseUrl'
import { Button, Card, Pagination, Table, Tag, notification } from 'antd'
import ModalDetailUser from '../ModalDetailUser'
import Swal from 'sweetalert2'

function ListUser() {
    const [data, setdata] = useState("")
    const [totaldata, settotaldata] = useState("")
    const [size, setsize] = useState(10)
    const [modal1Open, setModal1Open] = useState(false);

    const userlist = async (x = 1) => {
        try {
            const data = await axios.get(`${Baseurl}user/get-user?page=${x}&limit=10&keyword=&divisi=`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            settotaldata(data.data.data.totalData)
            setdata(data.data.data.order);
        } catch (error) {

        }
    }

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'age',
        },
        {
            title: 'Nama Panjang',
            dataIndex: 'fullname',
            key: 'address',
        },
        {
            title: 'Divisi',
            dataIndex: 'divisi',
            key: 'address',
        },
        {
            title: 'Perusahaan',
            dataIndex: 'perusahaan',
            key: 'address',
        },
        {
            title: 'No Telp',
            dataIndex: 'no_telp',
            key: 'address',
        },
        {
            title: 'Opsi Hapus',
            key: 'delete',
            render: (text, record) => (
                <Button type="danger" onClick={(e) => handleDelete(e, record)}>
                    X
                </Button>
            ),
        },
    ];
    const handleDelete = (e, record) => {
        e.stopPropagation();
        // Tampilkan konfirmasi dialog
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                // Jika user konfirmasi, lanjutkan proses hapus
                const deletes = async () => {
                    try {
                        const data = await axios.post(`${Baseurl}user/del-user`, {
                            id: record.userId
                        }, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: localStorage.getItem("token"),
                            },
                        })
                        userlist();
                        // Jika berhasil, tampilkan notifikasi sukses
                        notification.success({
                            message: data.data.status.message
                        });
                    } catch (error) {
                        // Tangani error sesuai kebutuhan
                    }
                };
                deletes();
            }
        })
    };



    useEffect(() => {
        userlist()
    }, [size])

    const onShowSizeChange = (x) => {
        userlist(x);
    }
    const [detailData, setDetailData] = useState(null);

    return (
        <div>

            <style>{`
      .hover-row:hover {
        background-color: #f5f5f5;
        cursor: pointer;
      }
    `}</style>
            <ModalDetailUser userlist={userlist} detailData={detailData} modal1Open={modal1Open} setModal1Open={setModal1Open} />
            <Card>
                <Tag color='red' style={{ fontSize: 20, marginBottom: "20px" }}>Total User : {totaldata}</Tag>
                <Table pagination={false} rowClassName="hover-row" dataSource={data} columns={columns} onRow={(record, rowIndex) => {
                    return {
                        onClick: () => {
                            console.log(`ini dari klik table`, record);
                            setModal1Open(true)
                            setDetailData(record)
                        },
                    };
                }} />
                <Pagination className='mt-3 d-flex justify-content-end'
                    showSizeChanger
                    onChange={onShowSizeChange}
                    defaultCurrent={1}
                    total={totaldata}
                />
            </Card>
        </div>
    )
}

export default ListUser