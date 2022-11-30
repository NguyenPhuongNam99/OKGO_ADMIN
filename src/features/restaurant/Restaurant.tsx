import { Button, Table } from "reactstrap";
import "./restaurantStyles.scss";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Pagination, Spin } from "antd";
import { BsPlusLg } from "react-icons/bs";
import axiosClient from "../../api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Restaurant = () => {
  const [dataRestaurant, setDataRestaurant] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const getListRestaurant = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/v1/restaurant/getAllRestaurant");
      console.log("response new", response);
      setDataRestaurant(response);
      setLoading(false);
    } catch (error) {
      console.log("error new", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getListRestaurant();
  }, []);

  return (
    <Spin spinning={loading} tip="Loading" size="large">
      <div className="tableContainer">
        <div className="headerForm">
          <div />
          <div className="buttonCreate">
            <BsPlusLg color="white" />
            Thêm mới
          </div>
        </div>
        <Table bordered hover responsive size="sm" striped>
          <thead>
            <tr>
              <th className="textCenter">#</th>
              <th className="textCenter">Tên khách sạn</th>
              <th className="textCenter">Địa chỉ</th>
              <th className="textCenter">Ảnh</th>
              <th className="textCenter">Thời gian mở cửa</th>
              <th className="textCenter">Thời gian đóng cửa</th>
              <th className="textCenter">Giá</th>
              <th className="textCenter">Đánh giá</th>
            </tr>
          </thead>
          <tbody style={{ verticalAlign: "middle", textAlign: "center" }}>
            {dataRestaurant?.map((item: any, index: number) => {
              return (
                <tr>
                  <th scope="row">{index}</th>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td className="centerView">
                    <img src={item?.images[0]?.image} className="imageRestaurant" />
                  </td>
                  <th>{item.open_time}</th>
                  <td>{item.close_time}</td>
                  <td>{item.price}</td>
                  <td>{item.rate}</td>
                  <td>
                    <span className="buttonClickVoucher">
                      <div className="containerButton">
                        <Button
                          color="primary"
                          href="#"
                          tag="a"
                          className="button"
                          onClick={() => navigate('/Home/RestaurantUpdate')}
                        >
                          <AiOutlineEdit />
                        </Button>
                      </div>

                      <div className="containerButton">
                        <Button
                          color="primary"
                          href="#"
                          tag="a"
                          className="button"
                        >
                          <AiOutlineDelete />
                        </Button>
                      </div>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="footerClass">
          <div></div>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </Spin>
  );
};

export default Restaurant;
