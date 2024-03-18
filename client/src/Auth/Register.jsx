import { Card, Flex, Typography, Form, Input, Button, Alert, Spin, Upload, Select } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import registerImage from '../assets/registerN.jpg';
import useSignup from '../hooks/useSignup';

const Register = () => {
    const { loading, error, registerUser } = useSignup();

    const handleRegister = (values) => {
        registerUser(values);
    }

    return (
        <Card className='form-container'>
            <Flex gap="large" align='center'>
                <Flex vertical flex={1}>
                    <Typography.Title level={3} strong className='title'>
                        Create an Account
                    </Typography.Title>
                    <Typography.Text type='secondary' strong className='slogan'>
                        Join for exclusive access!
                    </Typography.Text>

                    <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
                        <Form.Item
                            label="Full name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your full name',
                                },
                            ]}
                        >
                            <Input size='large' placeholder='Enter your name' />
                        </Form.Item>

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
                                    message: 'The input is not valid email',
                                }
                            ]}
                        >
                            <Input size='large' placeholder='Enter your email' />
                        </Form.Item>

                        <Form.Item
                            label="Age"
                            name="age"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your age',
                                },
                            ]}
                        >
                            <Input size='large' placeholder='Enter your age' />
                        </Form.Item>

                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your status',
                                },
                            ]}
                        >
                            <Select>
                                <Option value='active' selected>Active</Option>
                                <Option value='inactive'>Inactive</Option>
                            </Select>
                        </Form.Item>

                        {/* <Form.Item
                            label="Image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your image',
                                },

                            ]}
                        >
                            <Upload>
                                <Button size="large">Upload Image</Button>
                            </Upload>
                        </Form.Item> */}

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
                            <Input.Password size='large' placeholder='Enter your password' />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="passwordConfirm"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords do not match'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password size='large' placeholder='Re-Enter your password' />
                        </Form.Item>

                        {
                            error && (
                                <Alert
                                    description={error}
                                    type='error'
                                    showIcon
                                    closable
                                    className='alert' />
                            )
                        }

                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                size='large'
                                className='btn'
                                loading={loading}
                            >
                                Create Account
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Link to="/login">
                                <Button size='large' className='btn'>Sign in</Button>
                            </Link>
                        </Form.Item>


                    </Form>

                </Flex>


                <Flex flex={1}>
                    <img src={registerImage} className='auth-image' alt='register' />
                </Flex>
            </Flex>
        </Card>
    );
};

export default Register;
