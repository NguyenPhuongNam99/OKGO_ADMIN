import React, { useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getRoute } from "../../globalStore";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const {globalStore} = useAppSelector(state => state)

  const [route, setRoute] = useState<string| null>(null);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: <p>Đăng xuất</p>,
    },
  ];

  useEffect(() => {
    const url = window.location.href;
    if (url) {
      if(url.includes('TourOrder')){
        setRoute("2");
      }else if(url.includes('Tour')){
        setRoute("3");
      }else if(url.includes('Voucher')){
        setRoute("4");
      }else if(url.includes('Hotel')){
        setRoute("5");
      }else if(url.includes('Restaurant')){
        setRoute("6");
      }else if(url.includes('TourGuide')){
        setRoute("7");
      }else if(url.includes('Blog')){
        setRoute("8");
      }else{
        setRoute("1");
      }
    }
  }, []);

  return (
    <Layout
      style={{
        height: "100%",
        width: "100%",
        overflow: "auto",
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "auto" }}
      >
        <div className="logo">
          {!collapsed && (
            <img
              src={require("../../assets/images/travel.jpg")}
              className="imageLogo"
            />
          )}
        </div>
        {
          route &&   <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[route]}
          className="menuLeft"
          onSelect={(selectedKeys) => {
            // setRoute(Number(selectedKeys.key));
            dispatch(getRoute(selectedKeys.key));
            if (Number(selectedKeys.key) === Number(2)) {
              navigate("/Home/TourOrder");
            } else if (Number(selectedKeys.key) === Number(3)) {
              navigate("/Home/Tour");
            }
            // if(Number(selectedKeys.key) === Number(4)){
            //   navigate('/Home/Voucher')
            // }
            else if (Number(selectedKeys.key) === Number(4)) {
              navigate("/Home/Voucher");
            } else if (Number(selectedKeys.key) === Number(5)) {
              navigate("/Home/Hotel");
            } else if (Number(selectedKeys.key) === Number(6)) {
              navigate("/Home/Restaurant");
            } else if (Number(selectedKeys.key) === Number(7)) {
              navigate("/Home/TourGuide");
            } else if (Number(selectedKeys.key) === Number(8)) {
              navigate("/Home/Blog");
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
              label: "Voucher",
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
            {
              key: "7",
              icon: <FaCity />,
              label: "Hướng Dẫn Viên",
            },
            {
              key: "8",
              icon: <FaCity />,
              label: "Blog",
            },
          ]}
        />
        }
      
      </Sider>
      <Layout className="site-layout slide-left">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "#fff" }}
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
            height: "100%",
            padding: "10px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
