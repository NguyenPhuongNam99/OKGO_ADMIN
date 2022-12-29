import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Button, Table } from "reactstrap";
import axiosClient from "../../api/api";
import HeaderForm from "../../components/header-form/HeaderForm";
import "./hotel.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal } from "antd";

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
  const [dataHotel, setDataHotel] = useState<TypeListHotel[] | any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<string>();
  const navigate = useNavigate();

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

  const deleteVoucher = async (paramId: string | undefined) => {
    try {
      const response = axiosClient
        .delete(`/v1/hotel/${paramId}`)
        .then(() => {
          getListHotel();
        })
        .catch((error) => {
          console.log("error", error);
        });
      console.log("response delete", response);
      toast.success("🦄 Bạn đã xoá khách sạn thành công!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.log("error new", error);
    }
  };

  useEffect(() => {
    getListHotel();
  }, []);


  return (
    <div>
      <HeaderForm onclick={() => navigate("/Home/HotelCreate")} />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(!isModalOpen)}
        onOk={() => deleteVoucher(idDelete ? idDelete : undefined)}
      >
        <p>Bạn có muốn xoá không ?</p>
      </Modal>
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
            {dataHotel &&
              dataHotel?.map((item: any, index: number) => {
                return (
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{item.name}</td>
                    <td>
                      <span>{item.description}</span>
                    </td>
                    <td className="centerView">
                      <img src={item.image[0]?.image} className="imageHotel" />
                    </td>
                    <td className="centerText">{item.price}</td>
                    <td>{item.address_detail}</td>
                    <td style={{ textAlign: "center" }}>{item.type}</td>
                    <td style={{ textAlign: "center" }}>{item.rate}</td>
                    <td>
                      <span className="buttonClickVoucher">
                        <div className="containerButton">
                          <Button color="primary" tag="a" className="button" onClick={() => navigate(`/Home/HotelUpdate/${item._id}`)}>
                            <AiOutlineEdit />
                          </Button>
                        </div>

                        <div className="containerButton">
                          <Button
                            color="primary"
                            tag="a"
                            className="button"
                            onClick={() => (
                              setIsModalOpen(true), setIdDelete(item._id),
                              console.log('click')
                            )}
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
