import axios from "axios";
import axiosClient from "../../api/api";

const cityApi = async () => {
  return await axios({
    method: "get",
    url: "https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1",
  });
};

const provincesApi = async (cityId: string) => {
  return await axios({
    method: "get",
    url: `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${cityId}&limit=-1`,
  });
};

const createTour = async (data: any) => {
  return await axios({
    method: "post",
    url: `http://206.189.37.26:8080/v1/tour/createTour`,
    data: data,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTY3MjEzMjcyOCwiZXhwIjoxNjcyMzA1NTI4fQ.xxx0fLhQ5lKAU5w4QLTQGVlYWzm9dXeSck9cMGNOrdg",
    },
  });
};

const listHotelApi = async (id: any) => {
  return await axiosClient({
    method: "get",
    url: `http://206.189.37.26:8080/v1/hotel/getAllHotel`,
  });
};

const listRestaurentApi = async (id: any) => {
  return await axiosClient({
    method: "get",
    url: `http://206.189.37.26:8080/v1/restaurant/getAllRestaurant`,
  });
};

export { cityApi, provincesApi, createTour, listHotelApi, listRestaurentApi };
