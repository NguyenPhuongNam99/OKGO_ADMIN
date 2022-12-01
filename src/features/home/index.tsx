import React, { useState } from "react";
import "./index.scss";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Layout, Menu } from "antd";
import { BsFillPencilFill, BsCalendar2PlusFill } from "react-icons/bs";
import { FaCity, FaHotel, FaPaintBrush } from "react-icons/fa";
import Restaurant from "../restaurant/Restaurant";
import { BsChevronDown } from "react-icons/bs";
import Voucher from "../voucher/Voucher";
import Tour from "../tour/Tour";
import Hotel from "../hotel/hotel";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [route, setRoute] = useState<number>(1);
  console.log("route new", route);
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: <p>Đăng xuất</p>,
    },
  ];

  return (
    <Layout
      style={{
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          {!collapsed && (
            <img
              src={require("../../assets/images/travel.jpg")}
              className="imageLogo"
            />
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className='menuLeft'
          onSelect={(selectedKeys) => {
            console.log("selectedKeys", selectedKeys.key);
            setRoute(Number(selectedKeys.key));
            if(Number(selectedKeys.key) === Number(1)){
              navigate('/Home/Tour')
            }
            if(Number(selectedKeys.key) === Number(3)){
              navigate('/Home/Voucher')
            }
            if(Number(selectedKeys.key) === Number(4)){
              navigate('/Home/Hotel')
            }
            if(Number(selectedKeys.key) === Number(6)){
              navigate('/Home/Restaurant')
            }

          }}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Thông tin cá nhân",
            },
            {
              key: "2",
              icon: <BsCalendar2PlusFill />,
              label: "Tour đã đặt",
            },

            {
              key: "3",
              icon: <FaPaintBrush />,
              label: "Tạo Tour",
            },
            {
              key: "4",
              icon: <BsFillPencilFill />,
              label: "Tạo Voucher",
            },
            {
              key: "5",
              icon: <FaHotel />,
              label: "Khách sạn",
            },

            {
              key: "6",
              icon: <FaCity />,
              label: "Nhà hàng",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, marginLeft: 26 }}
        >
          <div></div>
          <div className="avatarContainer">
            <div className="avatar">
              <img
                src={require("../../assets/images/avatar.jpeg")}
                style={{ width: "100%", height: "100%", borderRadius: 50 }}
              />
            </div>
            <p>Nguyen Phuong Nam</p>
            <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              overlayStyle={{
                width: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BsChevronDown className="iconDrop" />
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            marginTop: 26,
            marginLeft: 24,
            backgroundColor: "white",
            height: '100%'
          }}
        >
          <Outlet />

        </Content>
      </Layout>
    </Layout>
  )
};

export default App;
