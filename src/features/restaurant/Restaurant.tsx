import { Button, Table } from "reactstrap";
import "./restaurantStyles.scss";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Modal, Pagination, Spin } from "antd";
import { BsPlusLg } from "react-icons/bs";
import axiosClient from "../../api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Restaurant = () => {
  const [dataRestaurant, setDataRestaurant] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<string>();

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
  const deleteVoucher = async (paramId: string | undefined) => {
    try {
      const response = axiosClient
        .delete(`/v1/restaurant/deleteRestaurant/${paramId}`)
        .then(() => {
          // fetchApi();
          getListRestaurant();
        })
        .catch((error) => {
          console.log("error", error);
        });
      console.log("response delete", response);
      toast.success("🦄 Bạn đã xoá voucher thành công!", {
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
    getListRestaurant();
  }, []);

  return (
    <Spin spinning={loading} tip="Loading" size="large">
      <div className="tableContainer">
        <div className="headerForm">
          <div />
          <div style={{zIndex: 99}}>
          <ToastContainer />
          </div>

          <div
            className="buttonCreate"
            onClick={() => navigate("/Home/RestaurantCreate")}
          >
            <BsPlusLg color="white" />
            Thêm mới
          </div>
        </div>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(!isModalOpen)}
          onOk={() => deleteVoucher(idDelete ? idDelete : undefined)}
        >
          <p>Bạn có muốn xoá không ?</p>
        </Modal>
        <Table bordered hover responsive size="sm" striped>
          <thead>
            <tr>
              <th className="textCenter">#</th>
              <th className="textCenter">Tên nhà hàng</th>
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
                  <th scope="row">{index +1}</th>
                  <td>{item.name}</td>
                  <td>{item.address_detail}</td>
                  <td className="centerView">
                    <img
                      src={item?.images[0]?.image}
                      className="imageRestaurant"
                    />
                  </td>
                  <th style={{ fontWeight: "normal" }}>{item.open_time}</th>
                  <td>{item.close_time}</td>
                  <td>{item.price}</td>
                  <td>{item.rate}</td>
                  <td>
                    <span className="buttonClickVoucher">
                      <div className="containerButton">
                        <Button
                          color="primary"
                          tag="a"
                          className="button"
                          onClick={() =>
                            navigate(`/Home/RestaurantUpdate/${item._id}`)
                          }
                        >
                          <AiOutlineEdit />
                        </Button>
                      </div>

                      <div className="containerButton">
                        <Button
                          color="primary"
                          tag="a"
                          className="button"
                          onClick={() => (
                            setIsModalOpen(true), setIdDelete(item._id)
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
        <div className="footerClass">
          <div></div>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </Spin>
  );
};

export default Restaurant;
