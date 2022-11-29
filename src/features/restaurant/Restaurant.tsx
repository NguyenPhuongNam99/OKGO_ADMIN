import React from "react";
import { Button, Table } from "reactstrap";
import "./restaurantStyles.scss";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Pagination } from "antd";
import { BsPlusLg } from "react-icons/bs";

const Restaurant = () => {
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
      first:
        "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
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

  return (
    <div className="tableContainer">
      <div className="headerForm">
        <div />
        <div className="buttonCreate">
          <BsPlusLg color="white" />
          Thêm mới
        </div>
      </div>
      <Table
        rowClassName={(index: any) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        bordered
        hover
        responsive
        size="sm"
        stripes
        className="table-striped-rows"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Tên khách sạn</th>
            <th>Thành Phố/ Huyện</th>
            <th>Địa chỉ chi tiết</th>
            <th>Thời gian mở cửa</th>
            <th>Thời gian đóng cửa</th>
            <th>Ảnh</th>
            <th>Gía</th>
            <th>Đánh giá</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr className="sizeHeader">
                <th scope="row">{item.id}</th>
                <td>{item.first}</td>
                <td>{item.three}</td>
                <td>{item.four}</td>
                <td>{item.four}</td>
                <td>{item.four}</td>
                <td>{item.four}</td>
                <td>{item.four}</td>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      height: "auto",
                    }}
                  >
                    <Button
                      color="primary"
                      href="#"
                      tag="a"
                      style={{ height: "auto" }}
                    >
                      <AiOutlineEdit />
                    </Button>

                    <Button
                      color="primary"
                      href="#"
                      tag="a"
                      style={{ height: "auto" }}
                    >
                      <AiOutlineDelete />
                    </Button>
                  </div>
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

export default Restaurant;
