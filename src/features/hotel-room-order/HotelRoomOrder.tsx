import { Button, Table } from "reactstrap";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/api";
import axios from "axios";
import { Modal } from "antd";

const HotelRoomOrder = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>()
    const [dataClick, setDataClick] = useState<any>();

    const getAllRomOrder = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get("/v1/hotel/fill");
            console.log("response new", response);
            setData(response);
            setLoading(false);
        }
        catch (error) {
            setLoading(false)
            console.log('error', error)
        }
    }

    console.log('data', data)

    useEffect(() => {
        getAllRomOrder()
    }, [])

    const confirm = async () => {
        try {
            let config = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("Name"),
                },
            };
            const response = await axios.put(
                `http://206.189.37.26:8080/v1/hotel/confirm`,
                {
                    statusRoom: 'xac nhan',
                }, config
            );
            console.log('response', response)
            setVisiable(false)
        }
        catch (error) {
            console.log('error', error)
        }
    }

    console.log('data click', dataClick)
    const [visiable, setVisiable] = useState(false);

    return (
        <div className="hotelContainer">
            <Modal
        title="Basic Modal"
        open={visiable}
        onCancel={() => setVisiable(!visiable)}
        onOk={() => confirm()}
      >
        <p>Xác nhận đặt phòng ?</p>
      </Modal>
            <Table bordered hover responsive size="sm" striped>
                <thead>
                    <tr>
                        <th className="textCenter">#</th>
                        <th className="textCenter">Mã khách sạn</th>
                        <th className="textCenter">Mã Phòng</th>
                        <th className="textCenter">Tên phòng</th>
                        <th className="textCenter">Ảnh</th>
                        <th className="textCenter">Giá</th>
                    </tr>
                </thead>
                <tbody style={{ verticalAlign: "middle", textAlign: "center" }}>
                    {data &&
                        data?.map((item: any, index: number) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.idHotel}</td>
                                    <td>{item.itemRoomOrder._id}</td>
                                    <td>{item.itemRoomOrder.room_name}</td>
                                    {/* <td>
                      <span>{item.description}</span>
                    </td> */}
                                    <td className="centerView">
                                        <img src={item.itemRoomOrder.room_thumbnail} className="imageHotel" />
                                    </td>
                                    <td className="centerText">{item.itemRoomOrder.room_price} VND</td>
                                    <td>
                                        <span className="buttonClickVoucher">
                                            <div className="containerButton" style={{ backgroundColor: '#1677ff', width: 130, borderRadius: 9, height: 40, color: 'white' }} onClick={() => (setDataClick(item), setVisiable(true))}>

                                                Xác nhận phòng
                                            </div>


                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </div>
    )
}

export default HotelRoomOrder