import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from '../../api/api'
import './index.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';

const Home = () => {
    const { Header, Content, Sider } = Layout;

    const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
        key,
        label: `nav ${key}`,
    }));

    const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
        (icon, index) => {
            const key = String(index + 1);

            return {
                key: `sub${key}`,
                icon: React.createElement(icon),
                label: `subnav ${key}`,

                children: new Array(4).fill(null).map((_, j) => {
                    const subKey = index * 4 + j + 1;
                    return {
                        key: subKey,
                        label: `option${subKey}`,
                    };
                }),
            };
        },
    );

    console.log('newwww', process.env.REACT_APP_BASE_URL)
    useEffect(() => {
        axiosClient.get('/v1/user')
            .then((response) => {
                console.log('response new', response)
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }, [])

    return (
        <>
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                            items={items2}
                        />
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            Content
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
};

export default Home;
