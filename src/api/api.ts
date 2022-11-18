import axios from 'axios';


const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTY2ODc1Nzg3NiwiZXhwIjoxNjY4NzU3OTA2fQ.mFL4A1F4qik5OVx88wdkZJhoXKY5a7b-U4CvpR-CQv4'
    },

});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
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