import { DownOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
<<<<<<< HEAD
import { Card, Dropdown, Input, Space, Table, Tag, message } from 'antd'
import React, { useState } from 'react'
=======
import { Card, Dropdown, Input, Space, Table, message } from 'antd'
import React from 'react'
>>>>>>> maya
import { Button, Col, Row } from 'react-bootstrap'
import "./style.css"

function CashOnDelivery() {
<<<<<<< HEAD
    const [InputValid, setInputValid] = useState(false)
=======

>>>>>>> maya
    const dataSource = [
        {
            key: '1',
            name: '1',
            age: 32,
<<<<<<< HEAD
            address: 'Success',
=======
            address: 'JKT23-007583',
>>>>>>> maya
        },
        {
            key: '2',
            name: '2',
            age: 42,
<<<<<<< HEAD
            address: 'Success',
=======
            address: 'JKT23-007583',
>>>>>>> maya
        },
        {
            key: '1',
            name: '3',
            age: 32,
<<<<<<< HEAD
            address: 'Unloading',
=======
            address: 'JKT23-007583',
>>>>>>> maya
        },
        {
            key: '2',
            name: '4',
            age: 42,
<<<<<<< HEAD
            address: 'Unloading',
=======
            address: 'JKT23-007583',
>>>>>>> maya
        },
        {
            key: '1',
            name: '5',
            age: 32,
<<<<<<< HEAD
            address: 'Delivery',
=======
            address: 'JKT23-007583',
>>>>>>> maya
        },
        {
            key: '2',
            name: '6',
            age: 42,
<<<<<<< HEAD
            address: 'Delivery',
=======
            address: 'JKT23-007583',
>>>>>>> maya
        },
        {
            key: '1',
            name: '7',
            age: 32,
<<<<<<< HEAD
            address: 'Pick Up',
=======
            address: 'JKT23-007583',
>>>>>>> maya
        },
        {
            key: '2',
            name: '8',
            age: 42,
<<<<<<< HEAD
            address: 'Pick Up',
=======
            address: 'JKT23-007583',
>>>>>>> maya
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
<<<<<<< HEAD

=======
>>>>>>> maya
        {
            title: 'Biaya',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Status',
            dataIndex: 'address',
            key: 'address',
<<<<<<< HEAD
            render: (text) => {
                let color = '';
                if (text === 'Success') {
                    color = 'success';
                } else if (text === "Unloading") {
                    color = 'yellow';
                } else if (text === "Delivery") {
                    color = 'red';
                } else if (text === "Pick Up") {
                    color = 'blue';
                }
                return (
                    <Tag color={color} key={text}>
                        {text.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Input',
            dataIndex: 'age',
            key: 'age',
            render: (text, record) => {
                return (
                    <Input
                        onChange={() => setInputValid(true)}
                        type="text" defaultValue={text} />
                )
            }
        },

        {
            title: 'Aksi',
            dataIndex: 'age',
            key: 'age',
            render: () => {
                return (
                    InputValid ? (
                        <Button variant='danger'>Edit Input</Button>
                    ) : (
                        <Button type="primary">Ubah Input</Button>
                    )
                )
            }
=======
>>>>>>> maya
        },
    ];

    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
<<<<<<< HEAD
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
=======
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
>>>>>>> maya
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
<<<<<<< HEAD
                    <Input style={{ width: 300, height: "50px" }} addonBefore={<SearchOutlined />} placeholder='Cari Disini' className="mr-3" />
=======
                    <Input  style={{ width: 300, height: "50px" }} addonBefore={<SearchOutlined />} placeholder='Cari Disini' className="mr-3" />
>>>>>>> maya
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