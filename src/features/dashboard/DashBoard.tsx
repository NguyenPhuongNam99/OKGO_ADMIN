import { CChart } from "@coreui/react-chartjs";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import axiosClient from "../../api/api";
import { DataResponse } from "../../types/type";
import { Spin } from 'antd';


const DashBoard = () => {
    const [data, setData] = useState<any>();
    const [chart1, setChard1] = useState<any>();
    const [loading, setLoading] = useState(false)

    const getDashboard = async () => {
        try {
            setLoading(true)
            axiosClient.get("/v1/dashboard/getDashboard")
                .then((data: AxiosResponse<any> | any) => {
                    console.log('data da', data)
                    setData(data)
                    setLoading(false)
                });
        } catch (error) {
            console.log("error new", error);
            setLoading(false)
        }
    };

    const getChard = async () => {
        try {
            setLoading(true)

            axiosClient.get("/v1/dashboard/getAllTourDashboard")
                .then((data: AxiosResponse<any> | any) => {
                    console.log('data da', data)
                    setChard1(data)
                    setLoading(false)

                });
        } catch (error) {
            console.log("error new", error);
            setLoading(false)

        }
    };

    useEffect(() => {
        getDashboard();
        getChard();
    }, []);

    console.log('chart1', chart1?.orderLength)

    return (
        <div style={{ width: '100%', height: '100%', paddingLeft: '10%', paddingRight: '10%' }}>
            {
                loading ? (
                    <div>
                        <Spin />                    
                    </div>
                )
                    :
                    (
                        <div style={{ width: '100%', height: '100%' }}>
                            <div style={{ width: '100%', height: '50%', paddingTop: '2%', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: 260, height: 130, borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    Số lượng User : {data?.userData}
                                </div>
                                <div style={{ width: 260, height: 130, borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    Số lượng Hướng dẫn viên : {data?.hdvData}
                                </div>
                                <div style={{ width: 260, height: 130, borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    Số lượng Tour : {data?.tourData}
                                </div>
                                <div style={{ width: 260, height: 130, borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    Số lượng khách sạn : {data?.hotelData}
                                </div>
                                <div style={{ width: 260, height: 130, borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    Số lượng bài Blog : {data?.blogData}
                                </div>
                                <div style={{ width: 260, height: 130, borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    Số lượng nhà hàng : {data?.restaunrantData}
                                </div>
                                <div style={{ width: 260, height: 130, borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    Số lượng Voucher : {data?.voucherData}
                                </div>
                                <div style={{ width: 260, height: 130, borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    Số lượng Tour nổi bật : 10
                                </div>
                            </div>
                            <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'row' }}>
                                <CChart
                                    style={{ width: '50%', height: 100 }}
                                    type="doughnut"
                                    data={{
                                        labels: ['Tour đã đặt', 'Tổng số Tour'],
                                        datasets: [
                                            {
                                                backgroundColor: ['#41B883', '#E46651'],
                                                data: [Number(chart1?.orderLength), Number(chart1?.tourLength)],
                                                // Number(chart1.orderLength), Number(chart1.tourLength
                                            },
                                        ],
                                    }}
                                />
                                <CChart
                                    style={{ width: '50%', height: 100 }}
                                    type="doughnut"
                                    data={{
                                        labels: ['Số lượng hướng dẫn viên', 'Tổng số lượng User'],
                                        datasets: [
                                            {
                                                backgroundColor: ['#00D8FF', '#DD1B16'],
                                                data: [Number(data?.hdvData), Number(data?.userData)],
                                                // Number(chart1.orderLength), Number(chart1.tourLength
                                            },
                                        ],
                                    }}
                                />
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default DashBoard;