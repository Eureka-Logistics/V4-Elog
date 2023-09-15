import { DownOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Dropdown, Input, Space, Table, message } from 'antd'
import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import "./style.css"

function CashOnDelivery() {

    const dataSource = [
        {
            key: '1',
            name: '1',
            age: 32,
            address: 'JKT23-007583',
        },
        {
            key: '2',
            name: '2',
            age: 42,
            address: 'JKT23-007583',
        },
        {
            key: '1',
            name: '3',
            age: 32,
            address: 'JKT23-007583',
        },
        {
            key: '2',
            name: '4',
            age: 42,
            address: 'JKT23-007583',
        },
        {
            key: '1',
            name: '5',
            age: 32,
            address: 'JKT23-007583',
        },
        {
            key: '2',
            name: '6',
            age: 42,
            address: 'JKT23-007583',
        },
        {
            key: '1',
            name: '7',
            age: 32,
            address: 'JKT23-007583',
        },
        {
            key: '2',
            name: '8',
            age: 42,
            address: 'JKT23-007583',
        },
    ];

    const columns = [
        {
            title: 'No',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Nomor SJ',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Nama Pelanggan',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Driver',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Asal',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Tujuan',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Pick Up',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Biaya',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Input',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Aksi',
            dataIndex: 'age',
            key: 'age',
        },
    ];

    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
      };

      const items = [
        {
          label: '1st menu item',
          key: '1',
          icon: <UserOutlined />,
        },
        {
          label: '2nd menu item',
          key: '2',
          icon: <UserOutlined />,
        },
        {
          label: '3rd menu item',
          key: '3',
          icon: <UserOutlined />,
          danger: true,
        },
        {
          label: '4rd menu item',
          key: '4',
          icon: <UserOutlined />,
          danger: true,
          disabled: true,
        },
      ];
      const menuProps = {
        items,
        onClick: handleMenuClick,
      };
    return (
        <div>

            <Row>
                <Col sm={12}>
                    <Card>
                        <Row>
                            <Col sm={8}>
                                <Row>
                                    <Col style={{ backgroundColor: 'white' }}>05 September 2023</Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: 'white' }}>Jumlah Pengiriman Anda</Col>
                                </Row>
                            </Col>
                            <Col sm={2} style={{ backgroundColor: 'white' }}>
                                02 <br /> Selesai
                            </Col>
                            <Col sm={2} style={{ backgroundColor: 'white' }}>
                                10 <br /> Total
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex align-items-center">
                <Col sm={8}>
                    <h5 style={{ fontSize: 30 }}>List Pengiriman</h5>
                </Col>
                <Col sm={4} className="d-flex align-items-center">
                    <Input  style={{ width: 300, height: "50px" }} addonBefore={<SearchOutlined />} placeholder='Cari Disini' className="mr-3" />
                    <Dropdown menu={menuProps}>
                        <Button className="my-custom-button ms-2" style={{ width: 200, backgroundColor: "#F05423" }}>
                            <Space>
                                Filter
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </Col>
            </Row>

            <Row>
                <Table dataSource={dataSource} columns={columns} className="my-custom-table" />
            </Row>

        </div >
    )
}

export default CashOnDelivery