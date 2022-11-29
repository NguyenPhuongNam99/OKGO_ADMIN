import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import HeaderForm from "../../components/header-form/HeaderForm";
import "./tour.scss";
import axiosClient from "../../api/api";
import { AxiosResponse } from "axios";
import { Spin } from "antd";
import { DataResponse } from "../../types/type";
import { Checkbox } from "antd";


const Tour = () => {
  const navigate = useNavigate();
  const [dataTour, setDataTour] = useState<Array<DataResponse>>();
  const [loading, setLoading] = useState<boolean>(true);

  const getListTour = async () => {
    try {
      setLoading(true);
      await axiosClient
        .get("/v1/tour/getAllTour")
        .then((data: AxiosResponse<DataResponse[]> | any) => {
          setDataTour(data);
          setLoading(false);
        });
    } catch (error) {
      console.log("error new", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getListTour();
  }, []);

  return (
    <Spin spinning={loading} tip="Loading" size="large">
      <div className="tourContainer">
        <HeaderForm />
        <div className="TourContain">
          <Table bordered hover responsive size="sm" striped>
            <thead>
              <tr>
                <th className="textCenter">#</th>
                <th className="textCenter">Tên</th>
                <th className="textCenter">Miêu tả</th>
                <th className="textCenter">Ảnh</th>
                <th className="textCenter">Giá</th>
                <th className="textCenter">Địa chỉ</th>
                <th className="textCenter">Khách sạn</th>
                <th className="textCenter">Nhà hàng</th>
                <th className="textCenter">Tổng số ngày</th>
                <th className="textCenter">Người tạo</th>
                <th className="textCenter">Trạng thái</th>
                <th className="textCenter">Ẩn/Hiện Tour</th>
              </tr>
            </thead>
            <tbody style={{ verticalAlign: "middle", textAlign: "center" }}>
              {dataTour?.map((item: any, index: number) => {
                return (
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{item.name}</td>
                    <td>
                      <span>{item.description}</span>
                    </td>
                    <td className="centerView">
                      <img src={item.image[0].image} className="imageTour" />
                    </td>
                    <td className="centerText">{item.price}</td>
                    <td>{item.address}</td>
                    <td style={{ textAlign: "center" }}>{item.hotel_id}</td>
                    <td className="centerText">{item.restaurant_id}</td>
                    <td style={{ textAlign: "center" }}>{item.total_day}</td>
                    <td style={{ textAlign: "center" }}>{item.created_by}</td>
                    <td>{item.status}</td>

                    <td>
                      <span>
                        <Checkbox defaultChecked={item.is_show} />
                      </span>
                    </td>
                    <td>
                      <span className="buttonClickVoucher">
                        <div className="containerButton">
                          <Button
                            color="primary"
                            href="#"
                            tag="a"
                            className="button"
                            onClick={() => navigate("/Restaurant")}
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
        </div>
      </div>
    </Spin>
  );
};

export default Tour;
