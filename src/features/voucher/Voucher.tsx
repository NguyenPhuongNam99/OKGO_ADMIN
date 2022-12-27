import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import "../restaurant/restaurantStyles.scss";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Modal, Pagination, Spin } from "antd";
import { BsPlusLg } from "react-icons/bs";
import axios from "axios";
import "./voucher.scss";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/api";
import { toast, ToastContainer } from "react-toastify";

const Voucher = () => {
  const [dataResponse, setDataResponse] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<string>();

  const navigate = useNavigate();

  const fetchApi = async () => {
    try {
      console.log("token ", localStorage.getItem("Name"));
      setLoading(true);
      axios
        .get("http://206.189.37.26:8080/v1/voucher/getAllVoucher", {
          headers: { Authorization: `Bearer ${localStorage.getItem("Name")}` },
        })
        .then((response) => {
          console.log("response new", response.data);
          setDataResponse(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("error new", error);
        });
    } catch (error) {}
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const deleteVoucher = async (paramId: string | undefined) => {
    try {
      const response = axiosClient
        .delete(`/v1/voucher/${paramId}`)
        .then(() => {
          fetchApi();
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

  return (
    <Spin tip="loading" spinning={loading} size={"large"}>
      <div className="tableContainer">
        <div className="headerForm">
          <ToastContainer />
          <div />
          <div
            className="buttonCreate"
            onClick={() => navigate("/Home/VoucherCreate")}
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
              <th className="textCenter">Tên</th>
              <th className="textCenter">Miêu tả</th>
              <th className="textCenter">Ảnh</th>
              <th className="textCenter">Số lượng</th>
              <th className="textCenter">Thời gian bắt đầu</th>
              <th className="textCenter">Thời gian kết thúc</th>
              <th className="textCenter">
                Giá tối thiểu discount - Giá tối đa discount
              </th>
            </tr>
          </thead>
          <tbody style={{ verticalAlign: "middle", textAlign: "center" }}>
            {dataResponse.map((item: any, index: number) => {
              console.log("item.image_url", item.image_url);
              return (
                <tr className="sizeHeader">
                  <th scope="row">{index}</th>
                  <td>{item.name}</td>
                  <td>{item.decription}</td>
                  <td>
                    {" "}
                    <img
                      src={item.image_url}
                      style={{  height: 80 }}
                    />
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.time_start}</td>
                  <td>{item.time_start}</td>
                  <td>
                    {item.price_min_condition + "-" + item.price_max_condition}
                  </td>
                  <td>
                    <span className="buttonClickVoucher">
                      <div className="containerButton">
                        <Button
                          color="primary"
                          tag="a"
                          className="button"
                          onClick={() =>
                            navigate(`/Home/VoucherUpdate/${item._id}`)
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
          {
            dataResponse.length >=10 && <Pagination defaultCurrent={1} total={50} />
          }
        </div>
      </div>
    </Spin>
  );
};

export default Voucher;
