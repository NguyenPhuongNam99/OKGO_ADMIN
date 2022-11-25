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
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Username</th>
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
                <td className="buttonClick">
                  <Button color="primary" href="#" tag="a" className="button">
                    <AiOutlineEdit />
                  </Button>

                  <Button color="primary" href="#" tag="a" className="button">
                    <AiOutlineDelete />
                  </Button>
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
