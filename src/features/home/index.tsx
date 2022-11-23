import React, { useState } from 'react';
import './index.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Profile from '../Profile/Profile';
import { BiRestaurant } from "react-icons/bi";
import { BsFillPencilFill, BsCalendar2PlusFill } from "react-icons/bs";
import { FcFactory } from "react-icons/fc";
import { FaCity , FaHotel, FaPaintBrush} from "react-icons/fa";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [route, setRoute] = useState<number>(1)
  

  return (
    <Layout style={{height: '100vh', width: '100%', backgroundColor: 'green', overflow:'hidden'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onSelect={(selectedKeys) => {
            console.log('selectedKeys',selectedKeys.key)
            setRoute(Number(selectedKeys.key))
          }}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Thông tin cá nhân',
            },
              {
              key: '3',
              icon: <BsCalendar2PlusFill />,
              label: 'Tour đã đặt',
            },
            
            {
              key: '4',
              icon: <FaPaintBrush />,
              label: 'Tạo Tour',
            },
            {
              key: '5',
              icon: <BsFillPencilFill />,
              label: 'Tạo Voucher',
            },
            {
              key: '6',
              icon: <FaHotel />,
              label: 'Khách sạn',
            },
          
             {
              key: '7',
              icon: <FaCity />,
              label: 'Nhà hàng',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, marginLeft: 26 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
           marginTop: 26,
            marginLeft: 24,
            height: '100%'
           
          }}
        >
          {
            route === 1 ? <Profile /> :''

          }
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;