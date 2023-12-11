import React, { useEffect, useState } from 'react'
import { ListVehicleZustand } from '../../../../zustand/Store/Race/fetch/List Vehicle/ListVehicle'
import { Button, Card, Col, Input, Row, Select, Table } from 'antd'
import ModalTambahvehicle from './components/ModalTambahvehicle'
import ListDriverZustand from '../../../../zustand/Store/Race/fetch/List Driver/ListDriver';
import axios from 'axios';

function ListDriver() {
  const { FetchDriver, ListVehicle, keyword, VehicleDetail, vehicleId } = ListVehicleZustand();
  const { getFilterOptions, filteroptionsjenisKepemilikanDanStatus } = ListDriverZustand()
  const [OpenModal, setOpenModal] = useState(false);

  useEffect(() => {
    FetchDriver()
    getFilterOptions()
  }, [keyword])


  const column = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
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
      dataIndex: 'vehicleType',
      key: 'vehicleType',
    },
    {
      title: 'Gambar Kendaraan',
      dataIndex: 'vehicleImage',
      key: 'vehicleImage',
      render: (vehicleImage) => {
        return <img src={vehicleImage} width={50} />
      }
    },
  ]
  return (
    <div>
      <h4>List Kendaraan</h4>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6} >
          <Input
            onChange={(e) => {
              ListVehicleZustand.setState(prevState => ({
                ...prevState,
                keyword: {
                  ...prevState.keyword,
                  pencarian: e.target.value
                }
              }));
            }}
            placeholder='Cari Driver' style={{ width: "100%" }} />
        </Col>
        <Col xs={24} sm={12} md={6} >
          <Select placeholder='Cari Jenis Kepemilikan' style={{ width: "100%" }}
            onChange={(e) => {
              ListVehicleZustand.setState(prevState => ({
                ...prevState,
                keyword: {
                  ...prevState.keyword,
                  kepemilikan: e
                }
              }));
            }}
          >
            <Select.Option value={""}>
              -
            </Select.Option>
            {filteroptionsjenisKepemilikanDanStatus && filteroptionsjenisKepemilikanDanStatus?.filterKepemilikan.map((item, index) => (
              <Select.Option value={item?.jenis}>
                {item?.jenis}
              </Select.Option>
            ))}

          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} >
          <Select placeholder='Status' style={{ width: "100%" }}
            onChange={(e) => {
              ListVehicleZustand.setState(prevState => ({
                ...prevState,
                keyword: {
                  ...prevState.keyword,
                  status: e
                }
              }));
            }}
          >
            <Select.Option value={""}>
              -
            </Select.Option>
            {filteroptionsjenisKepemilikanDanStatus && filteroptionsjenisKepemilikanDanStatus?.filterStatus.map((item, index) => (
              <Select.Option value={item?.value}>
                {item?.status}
              </Select.Option>
            ))}

          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} className='d-flex justify-content-end'>
          <Button onClick={() => setOpenModal(true)} type='primary'>Tambah Vehicle</Button>
        </Col>
      </Row>
      <Card>
        <Table style={{ overflowX: 'auto' }} className='tableini' columns={column} loading={!ListVehicle?.order} dataSource={ListVehicle?.order}
          pagination={{
            total: ListVehicle?.totalData,

          }}
          onRow={(row, index) => {
            return {
              onClick: event => {
                console.log(row);
                VehicleDetail(row?.vehicleId)
                ListVehicleZustand.setState({ vehicleId: row?.vehicleId })
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