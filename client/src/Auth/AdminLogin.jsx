import React, { useState } from 'react';
import { Card, Flex, Typography, Form, Input, Button, Alert, Spin } from 'antd';
import { Link } from 'react-router-dom';
import loginImage from '../assets/login.jpg';
import adminLogin from '../hooks/adminLogin';

const AdminLogin = () => {
    const {error,loading,loginAdmin}=adminLogin();
    const handleLogin = async (values) => {
      
        await loginAdmin(values);
    };

    return (
        <Card className="form-container">
            <Flex gap="large" align="center">
                <Flex flex={1}>
                    <img src={loginImage} className="auth-image" alt="Login" />
                </Flex>

                <Flex vertical flex={1}>
                    <Typography.Title level={3} strong className="title">
                        Admin Sign In
                    </Typography.Title>
                    <Typography.Text type="secondary" strong className="slogan">
                        Unlock your world!
                    </Typography.Text>

                    <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email',
                                },
                                {
                                    type: 'email',
                                    message: 'The input is not a valid email',
                                },
                            ]}
                        >
                            <Input size="large" placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password',
                                },
                            ]}
                        >
                            <Input.Password size="large" placeholder="Enter your password" />
                        </Form.Item>

                        {error && (
                        <Alert 
                        message={error} 
                        type="error" 
                        showIcon 
                        closable
                        className='alert'
                        />
                    )}

                        <Form.Item>
                            <Button
                                type={`${loading ? '' : 'primary'}`}
                                htmlType="submit"
                                size="large"
                                className="btn"
                                loading={loading}
                            >
                                {loading ? <Spin /> : 'Sign In'}
                            
                            </Button>
                        </Form.Item>
                       
                    </Form>
                </Flex>
            </Flex>
        </Card>
    );
};

export default AdminLogin;
