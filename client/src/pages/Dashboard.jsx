import React from 'react';
import { Avatar, Button, Card, Flex, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
const Dashboard = () => {
    const { userData, logout, edit } = useAuth();

    const handleEdit = () => {
        // Call the edit function and pass the userData as an argument
        edit(userData);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <Card className='profile-card'>
            <Flex align='center' vertical gap="small">
                <Avatar size={150} icon={<UserOutlined />} className='avatar'/>
                <Typography.Title level={2} className='username'>
                  {userData.name}
                </Typography.Title>

                <Typography.Text type='secondary' strong> Email: {userData.email}</Typography.Text>

                <Typography.Text type='secondary'> Age: {userData.age}</Typography.Text>

                <Typography.Text type='secondary'> Status: {userData.status}</Typography.Text>


                <Button size='large' type='primary' className='profile-btn' onClick={handleLogout}>Logout</Button>
                <Button size='large' type='primary' className='profile-btn' onClick={handleEdit}>Edit</Button>
            </Flex>
        </Card>
    );
}

export default Dashboard;
