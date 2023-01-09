import { Button, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axiosClient from "../../api/api";
import "./TourOrderUpdate.scss";

const TourOrderUpdate = () => {
  const params = useParams();
  const [data, setData] = useState<any>();
  const [assynUser, setAssynUser] = useState<string>();
  const [userHDV, setUserHDV] = useState<Array<any>>();

  const onChange = (value: string) => {
    setAssynUser(value);
  };

  const getDeTail = async () => {
    try {
      const response: any = await axiosClient.get(
        `/v1/orderTour/getOrderID/${params.id}`
      );
      setData(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getUserHDV = async () => {
    try {
      const response: any = await axiosClient.get("/v1/user/getUserHDV");
      const formatArray: any = [];
      response?.map((item: any) => {
        formatArray.push({
          value: item._id,
          label: item.first_name + " " + item.last_name,
        });
      });
      console.log("fomat", formatArray);
      setUserHDV(formatArray);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log('assynUser', assynUser)
  const assynHDV = async () => {
    try {
         let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Name"),
        },
      };
      const response = await axios.put(
        `http://206.189.37.26:8080/v1/orderTour/onlyUpdateOrderTour/${params.id}`,
        {
          assyneBy: assynUser,
        }, config
      );
      console.log('response', response)
      toast.success("🦄 Phân nhiệm vụ thành công!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log("error new", error);
    }
  };

  useEffect(() => {
    getDeTail();
    getUserHDV();
  }, []);

  return (
    <div className="containerTourOrderUpdate">
      <div className="blockContentRestaurant">
        <div className="headerTitle">
          <h5>Phê duyệt tour</h5>
        </div>
        <ToastContainer />

        {data && (
          <div className="BlockContent">
            <div className="formBlock">
              <p className="vouchername">Mã Tour</p>
              <input
                className="inputContent"
                name="name"
                value={data?.tour_id}
              />
            </div>
            <div className="formBlock">
              <p className="vouchername">Tên Tour</p>
              <input
                className="inputContent"
                name="name"
                value={data.tourName}
              />
            </div>
            <div className="formBlock">
              <p className="vouchername">Mã người đặt</p>
              <input
                className="inputContent"
                value={data.user_id}
                name="name"
              />
            </div>
            <div className="formBlock">
              <p className="vouchername">Tên người đặt</p>
              <input
                className="inputContent"
                value={data.fullName}
                name="name"
              />
            </div>
            <div className="formBlock">
              <p className="vouchername">Email</p>
              <input
                className="inputContent"
                value={data.emailUser}
                name="name"
              />
            </div>
            <div className="formBlock">
              <p className="vouchername">Số điện thoại</p>
              <input
                className="inputContent"
                value={data.phoneUser}
                name="name"
              />
            </div>
            <div className="formBlock">
              <p className="vouchername">Loại</p>

              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Chọn loại"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={userHDV}
              />
            </div>{" "}
            <Button type="primary" onClick={() => assynHDV()}>
              Lưu
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourOrderUpdate;
