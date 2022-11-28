import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import "../restaurant/restaurantStyles.scss";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Pagination } from "antd";
import { BsPlusLg } from "react-icons/bs";
import axios from "axios";
import "./voucher.scss";
import { useNavigate } from "react-router-dom";

const Voucher = () => {
  const data = [
    {
      id: "1",
      first: "Lorem ipsum dolor sit amet",
      three: "Lorem ipsum dolor sit amet",
      four: "Lorem ipsum dolor sit amet",
    },
    {
      id: "2",
      first: "Lorem ipsum dolor sit amet",
      three: "Lorem ipsum dolor sit amet",
      four: "Lorem ipsum dolor sit amet",
    },
    {
      id: "3",
      first: "Lorem ipsum dolor sit amet",
      three: "Lorem ipsum dolor sit amet",
      four: "Lorem ipsum dolor sit amet",
    },
    {
      id: "4",
      first: "Lorem ipsum dolor sit amet",
      three: "Lorem ipsum dolor sit amet",
      four: "Lorem ipsum dolor sit amet",
    },
    {
      id: "5",
      first: "Lorem ipsum dolor sit amet",
      three: "Lorem ipsum dolor sit amet",
      four: "Lorem ipsum dolor sit amet",
    },
    {
      id: "6",
      first: "Lorem ipsum dolor sit amet",
      three: "Lorem ipsum dolor sit amet",
      four: "Lorem ipsum dolor sit amet",
    },
    {
      id: "7",
      first: "Lorem ipsum dolor sit amet",
      three: "Lorem ipsum dolor sit amet",
      four: "Lorem ipsum dolor sit amet",
    },
    {
      id: "8",
      first: "Lorem ipsum dolor sit amet",
      three: "Lorem ipsum dolor sit amet",
      four: "Lorem ipsum dolor sit amet",
    },
    {
      id: "9",
      first: "Lorem ipsum dolor sit amet",
      three: "Lorem ipsum dolor sit amet",
      four: "Lorem ipsum dolor sit amet",
    },
    {
      id: "10",
      first: "Lorem ipsum dolor sit amet",
      three: "Lorem ipsum dolor sit amet",
      four: "Lorem ipsum dolor sit amet",
    },
    {
      id: "11",
      first: "Lorem ipsum dolor sit amet",
      three: "Lorem ipsum dolor sit amet",
      four: "Lorem ipsum dolor sit amet",
    },
    {
      id: "12",
      first: "Lorem ipsum dolor sit amet",
      three: "Lorem ipsum dolor sit amet",
      four: "Lorem ipsum dolor sit amet",
    },
    {
      id: "13",
      first: "Lorem ipsum dolor sit amet",
      three: "Lorem ipsum dolor sit amet",
      four: "Lorem ipsum dolor sit amet",
    },
  ];

  const [dataResponse, setDataResponse] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("token ", localStorage.getItem("Name"));
    axios
      .get("http://localhost:8000/v1/voucher/getAllVoucher", {
        headers: { Authorization: `Bearer ${localStorage.getItem("Name")}` },
      })
      .then((response) => {
        console.log("response new", response.data);
        setDataResponse(response.data);
      })
      .catch((error) => {
        console.log("error new", error);
      });
  }, []);

  return (
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
            <th style={{ textAlign: "center" }}>#</th>
            <th style={{ textAlign: "center" }}>Tên</th>
            <th style={{ textAlign: "center" }}>Miêu tả</th>
            <th style={{ textAlign: "center" }}>Ảnh</th>
            <th style={{ textAlign: "center" }}>Số lượng</th>
            <th style={{ textAlign: "center" }}>Thời gian bắt đầu</th>
            <th style={{ textAlign: "center" }}>Thời gian kết thúc</th>
            <th style={{ textAlign: "center" }}> Giá tối thiểu discount - Giá tối đa discount</th>
          </tr>
        </thead>
        <tbody>
          {dataResponse.map((item: any, index: number) => {
            return (
              <tr className="sizeHeader">
                <th scope="row">{index}</th>
                <td>{item.name}</td>
                <td>
                  {item.decription }
                </td>
                <td>
                  <img
                    src={item.image_url}
                    style={{ width: 80, height: 80 }}
                  />
                </td>
                <td className="centerText">{item.quantity}</td>
                <td style={{ textAlign: "center" }}>{item.time_start}</td>
                <td style={{ textAlign: "center" }}>{item.time_start}</td>
                <td className="centerColumn">
                  <span>
                    {item.price_min_condition + "-" + item.price_max_condition}
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
      <div className="footerClass">
        <div></div>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
};

export default Voucher;
