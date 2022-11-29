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
                <th style={{ textAlign: "center" }}>#</th>
                <th style={{ textAlign: "center" }}>Tên</th>
                <th style={{ textAlign: "center" }}>Miêu tả</th>
                <th style={{ textAlign: "center" }}>Ảnh</th>
                <th style={{ textAlign: "center" }}>Giá</th>
                <th style={{ textAlign: "center" }}>Địa chỉ</th>
                <th style={{ textAlign: "center" }}>Khách sạn</th>
                <th style={{ textAlign: "center" }}>Nhà hàng</th>
                <th style={{ textAlign: "center" }}>Tổng số ngày</th>
                <th style={{ textAlign: "center" }}>Người tạo</th>
                <th style={{ textAlign: "center" }}>Trạng thái</th>
                <th style={{ textAlign: "center" }}>Ẩn/Hiện Tour</th>
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
                    <td style={{ textAlign: "center" }}>{item.status}</td>

                    <td>
                      <span>{item.is_show === false ? 1 : 0}</span>
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
