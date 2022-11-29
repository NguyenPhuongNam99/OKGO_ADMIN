import userEvent from '@testing-library/user-event';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Name')?.trim()

    },
    withCredentials: true,


});

const refreshToken = async () => {
    try {
        const res = await axios.post('http://localhost:8000/v1/auth/refesh', {
            withCredentials: true,
        })
        console.log('res new', res)
        return res.data
    } catch (error) {
        console.log('refresh error', error)
    }
}

axiosClient.interceptors.request.use(async (config: any) => {
    // Handle token here ...
    let date = new Date();
    const dataAccessToken = localStorage.getItem('Name')
    const decodedToken: any = jwtDecode(String(dataAccessToken));

    if(decodedToken.exp < date.getTime() / 1000){
        const data = await refreshToken();
        console.log('data new refresh', data)
        const refreshUser = {
           accessToken: data.accessToken
        }
        config.headers['authorization'] = 'Bearer' + data.accessToken;
    }
    return config;

}, (error) => {
  return Promise.reject(error)
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
export default axiosClient;