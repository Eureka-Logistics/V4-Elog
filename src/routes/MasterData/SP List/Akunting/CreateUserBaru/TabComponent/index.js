import React from 'react'
<<<<<<< HEAD
import ListUser from '../ListUser';
=======
import ListUser from '../../../../../MasterData/masterUser/ListUser';
>>>>>>> maya
import CreateUserBaru from '../index';
import { Card, Tabs } from 'antd';

function TabComponent() {

    const items = [
        {
            key: '1',
            label: 'Registrasi User Baru',
            children: <CreateUserBaru />,
        },
        {
            key: '2',
            label: 'List User',
            children: <ListUser />,
        },
        {
            key: '3',
            label: 'Tab 3',
            children: 'Content of Tab Pane 3',
        },
    ];

   
    return (
        <div>
            <Card>
                <Tabs defaultActiveKey="1" items={items} />
            </Card>
        </div>
    )
}

export default TabComponent