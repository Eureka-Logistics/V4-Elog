import React, { useEffect, useState } from 'react'
import { ListVehicleZustand } from '../../../../zustand/Store/Race/fetch/List Vehicle/ListVehicle'
import { Button, Card, Col, Input, Row, Select, Table } from 'antd'
import ModalTambahvehicle from './ModalTambahvehicle'

function ListDriver() {
  const { FetchDriver, ListVehicle } = ListVehicleZustand();
  const [OpenModal, setOpenModal] = useState(false);

  useEffect(() => {
    FetchDriver()
  }, [])

  const column = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Driver Code',
      dataIndex: 'driverCode',
      key: 'driverCode',
    },
    {
      title: 'Nik',
      dataIndex: 'nik',
      key: 'nik',
    },
    {
      title: 'Nama Driver',
      dataIndex: 'driverName',
      key: 'driverName',
    },
    {
      title: 'Jenis Kepemilikan',
      dataIndex: 'jenisKepemilikan',
      key: 'jenisKepemilikan',
    },
    {
      title: 'Kendaraan',
      dataIndex: 'vehicle',
      key: 'vehicle',
    },
    {
      title: 'Gambar Kendaraan',
      dataIndex: 'driverImage',
      key: 'driverImage',
      render: (driverImage) => {
        return <img src={driverImage} width={50} />
      }
    },
  ]
  return (
    <div>

<Row gutter={[16,16]}>
                <Col xs={24} sm={12} md={4} lg={4}>
                    <Input placeholder='Cari Driver' style={{ width: "100%" }} />
                </Col>
                <Col xs={24} sm={12} md={4} lg={4}>
                    <Select placeholder='Cari Jenis Kepemilikan' style={{ width: "100%" }}></Select>
                </Col>
                <Col xs={24} sm={12} md={4} lg={4}>
                    <Select placeholder='Status' style={{ width: "100%" }}></Select>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} className='d-flex justify-content-end'>
                    <Button onClick={() => setOpenModal(true)} type='primary'>Tambah Vehicle</Button>
                </Col>
            </Row>
    <Card>
    <Table className='tableini' columns={column} dataSource={ListVehicle?.order}
        pagination={{
          total: ListVehicle?.totalData,

        }}
        onRow={(row, index) => {
          return {
            onClick: event => {
              console.log(row);
              // FetchDetailDriver(row?.driverId)
              // ListDriverZustand.setState({ DriverID: row?.driverId })
              setOpenModal(true, row)
            }
          }
        }}
      />
    </Card>
       <ModalTambahvehicle setOpenModal={setOpenModal} OpenModal={OpenModal} />
    </div>
  )
}

export default ListDriver