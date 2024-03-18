import React from 'react';
import { Avatar, Button, Card, Flex, Table, Typography } from 'antd';
import { UserOutlined ,DeleteOutlined,EditOutlined} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';


const AdminDashboard = () => {
    const { adminData, logout, view } = useAuth();
    
    
    const handleEdit = () => {
        // Add your edit functionality here
        console.log('Edit button clicked');
    };

    const handleLogout = () => {
        logout();
    };

    
    // const { name, age } = adminData || {};
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            email: 'ss@gmail.com',
            status: 'Active', 
            action: '',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button shape="circle" icon={<EditOutlined />}></Button>
                    <Button shape="circle" icon={<DeleteOutlined />}></Button>
                </span>
            ),
        },
    ];

    return (
        <Card className='profile-card'>
            <Flex align='center' vertical gap="small">
                <Avatar size={150} icon={<UserOutlined />} className='avatar'/>
                <Typography.Title level={2} className='username'>
                  {adminData} {/* Display admin name */}
                </Typography.Title>

                {/* Table component for displaying admin information */}
                <Table dataSource={dataSource} columns={columns} />;

                <Button size='large' type='primary' className='profile-btn' onClick={handleLogout}>Logout</Button>
                  </Flex>
        </Card>
    );
}

export default AdminDashboard;
