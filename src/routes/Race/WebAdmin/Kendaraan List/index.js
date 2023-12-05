import React, { useEffect } from 'react'
import { ListVehicleZustand } from '../../../../zustand/Store/Race/fetch/List Vehicle/ListVehicle'
import { Table } from 'antd'

function ListDriver() {
  const { FetchDriver, ListVehicle } = ListVehicleZustand()
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
              // setOpenModal(true, row)
            }
          }
        }}
      />
    </div>
  )
}

export default ListDriver