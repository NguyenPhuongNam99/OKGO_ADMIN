import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Button, Table } from "reactstrap";
import axiosClient from "../../api/api";
import HeaderForm from "../../components/header-form/HeaderForm";
import "./hotel.scss";

interface TypeImage {
  image: String;
}
interface TypeListHotel {
  _id: String;
  name: String;
  image: [TypeImage];
  detail_address: String;
  description: String;
  type: String;
  city_id: Number;
  district_id: Number;
  rate: String;
  idHotel: Number;
  __v: Number;
}
const Hotel = () => {
  const icon = require("../../assets/icons/hotel.svg").default;
  console.log(icon);

  const [dataHotel, setDataHotel] = useState<TypeListHotel[] | any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getListHotel = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/v1/hotel/getAllHotel");
      console.log("response new", response);
      setDataHotel(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListHotel();
  }, []);

  return (
    <div>
      <HeaderForm />
      <div className="hotelContainer">
        <Table bordered hover responsive size="sm" striped>
          <thead>
            <tr>
              <th className="textCenter">#</th>
              <th className="textCenter">Tên</th>
              <th className="textCenter">Miêu tả</th>
              <th className="textCenter">Ảnh</th>
              <th className="textCenter">Giá</th>
              <th className="textCenter">Địa chỉ</th>
              <th className="textCenter">Loại</th>
              <th className="textCenter">Đánh giá</th>
            </tr>
          </thead>
          <tbody style={{ verticalAlign: "middle", textAlign: "center" }}>
            {dataHotel?.map((item: any, index: number) => {
              return (
                <tr>
                  <th scope="row">{index}</th>
                  <td>{item.name}</td>
                  <td>
                    <span>{item.description}</span>
                  </td>
                  <td className="centerView">
                    <img src={item.image[0].image} className="imageHotel" />
                  </td>
                  <td className="centerText">{item.price}</td>
                  <td>{item.address}</td>
                  <td style={{ textAlign: "center" }}>{item.type}</td>
                  <td style={{ textAlign: "center" }}>{item.rate}</td>
                  <td>
                    <span className="buttonClickVoucher">
                      <div className="containerButton">
                        <Button
                          color="primary"
                          href="#"
                          tag="a"
                          className="button"
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
  );
};

export default Hotel;
