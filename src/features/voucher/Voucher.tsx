import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import "../restaurant/restaurantStyles.scss";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Pagination, Spin } from "antd";
import { BsPlusLg } from "react-icons/bs";
import axios from "axios";
import "./voucher.scss";

const Voucher = () => {
  const [dataResponse, setDataResponse] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("token ", localStorage.getItem("Name"));
    setLoading(true);
    axios
      .get("http://localhost:8000/v1/voucher/getAllVoucher", {
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
  }, []);

  return (
    <Spin tip="loading" spinning={loading} size={"large"}>
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
              return (
                <tr className="sizeHeader">
                  <th scope="row">{index}</th>
                  <td>{item.name}</td>
                  <td>{item.decription}</td>
                  <td>
                    {" "}
                    <img
                      src={item.image_url}
                      style={{ width: 80, height: 80 }}
                    />{" "}
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
        <div className="footerClass">
          <div></div>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </Spin>
  );
};

export default Voucher;
