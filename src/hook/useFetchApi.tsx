import React, { useEffect, useState } from "react";
import axiosClient from "../api/api";


const useFetchApi = ({uri}) => {
    const [data, setData] = useState<any>();
    console.log('uri', uri)
    const fetchData = async () => {
        try {
            const response = await axiosClient.get(uri);
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