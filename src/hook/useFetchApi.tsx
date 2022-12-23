import React, { useEffect, useState } from "react";
import axiosClient from "../api/api";

interface TypeProps {
    uri: string
}
const useFetchApi = ({uri}: TypeProps) => {
    const [data, setData] = useState<any>();
    // console.log('uri', props?.uri)
    const fetchData = async () => {
        try {
            const response = await axiosClient.get('/v1/voucher/getUserId/63a2caa0d8854308444c89e4');
            console.log('respons url', response);
            setData(response);
            return response;
        } catch (error) {
            return error;
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return data;
}

export default useFetchApi;