import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import HeaderForm from "../../components/header-form/HeaderForm";
import "../tour/tour.scss";
import axiosClient from "../../api/api";
import { AxiosResponse } from "axios";
import { Modal, Spin } from "antd";
import { DataResponse } from "../../types/type";
import { Checkbox } from "antd";
import { toast } from "react-toastify";
import _ from "lodash";

const TourGuide = () => {
  const navigate = useNavigate();
  const [dataTour, setDataTour] = useState<Array<DataResponse>>([]);
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
        .get("/v1/orderTour/getAllOrderTour")
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

  console.log("datat tour", dataTour);

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
        {dataTour.length > 0 && (
          <div className="TourContain">
            <Table bordered hover responsive size="sm" striped>
              <thead>
                <tr>
                  <th className="textCenter">#</th>
                  <th className="textCenter">Mã hướng dẫn viên</th>
                  <th className="textCenter">Tên hướng dẫn viên</th>
                  <th className="textCenter">Email</th>
                  <th className="textCenter">Số điện thoại</th>
                   <th className="textCenter">Gmail</th>
                  <th className="textCenter">Trạng thái</th>
                </tr>
              </thead>
              <tbody style={{ verticalAlign: "middle", textAlign: "center" }}>
                {dataTour.length > 0 &&
                  dataTour?.map((itemData: any, index: number) => {
                    const item = itemData;
                    console.log('item id', itemData)
                    return (
                      <tr>
                        <th scope="row">{index}</th>
                        <td>
                          {_.isUndefined(item.tour_id) ? "cccc" : item.tour_id}
                        </td>
                        <td>
                          <span>{item.tourName}</span>
                        </td>

                        <td className="centerText">{item.user_id}</td>
                        <td>{item.fullName}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.emailUser}
                        </td>
                        <td className="centerText">{item.phoneUser}</td>

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
        )}
      </div>
    </Spin>
  );
};

export default TourGuide;
