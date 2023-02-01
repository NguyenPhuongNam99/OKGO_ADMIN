import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import HeaderForm from "../../../components/header-form/HeaderForm";
import "../tour.scss";
import axiosClient from "../../../api/api";
import { AxiosResponse } from "axios";
import { Modal, Spin } from "antd";
import { DataResponse } from "../../../types/type";
import { Checkbox } from "antd";
import { toast } from "react-toastify";

const TourList = () => {
  const navigate = useNavigate();
  const [dataTour, setDataTour] = useState<Array<DataResponse>>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<string>();

  const deleteVoucher = async (paramId: string | undefined) => {
    try {
      const response = axiosClient
        .delete(`/v1/tour/deleteTourSchedule/${idDelete}`)
        .then(() => {
          getListTour();
        })
        .catch((error) => {
          console.log("error", error);
        });
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
        <HeaderForm onclick={() => navigate("/Home/Tour/create")} />
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(!isModalOpen)}
          onOk={() => deleteVoucher(idDelete ? idDelete : undefined)}
        >
          <p>Bạn có muốn xoá không ?</p>
        </Modal>
        <div className="TourContain">
          <Table bordered hover responsive size="sm" striped>
            <thead>
              <tr>
                <th className="textCenter">#</th>
                <th className="textCenter">Tên</th>
                {/* <th className="textCenter">Miêu tả</th> */}
                <th className="textCenter">Ảnh</th>
                <th className="textCenter">Giá</th>
                <th className="textCenter">Tên tour</th>
                <th className="textCenter">Mã khách sạn</th>
                <th className="textCenter">Mã Nhà hàng</th>
                {/* <th className="textCenter">Tổng số ngày</th> */}
                <th className="textCenter">Ẩn/Hiện Tour</th>
              </tr>
            </thead>
            <tbody style={{ verticalAlign: "middle", textAlign: "center" }}>
              {dataTour?.map((itemData: any, index: number) => {
                const item = itemData.item;
                return (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{item.name}</td>
                    {/* <td>
                      <span>
                        <div
                          contentEditable="true"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        ></div>
                      </span>
                    </td> */}
                    <td className="centerView">
                      <img src={item.thumbnail[0].url} className="imageTour" />
                    </td>
                    <td className="centerText">{item.price}</td>
                    <td>{item.tour_name}</td>
                    <td style={{ textAlign: "center" }}>{item.hotel_id}</td>
                    <td className="centerText">{item.restaurant_id}</td>
                    {/* <td style={{ textAlign: "center" }}>{item.total_day}</td>
                    <td style={{ textAlign: "center" }}>{item.created_by}</td> */}
                    {/* <td>{item.status}</td> */}

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
                            tag="a"
                            className="button"
                            onClick={() =>
                              navigate(`/Home/Tour/update/${item.idTour}`)
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
                              setIsModalOpen(true), setIdDelete(item.idTour)
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
    </Spin>
  );
};

export default TourList;
