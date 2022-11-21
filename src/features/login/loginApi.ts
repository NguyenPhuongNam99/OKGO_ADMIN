import axios from "axios";
import axiosClient from "../../api/api";
import API_METHOD from "../../constants/api";

export const loginApi = async () => {

  await axios({
    method: "post",
    url: "http://localhost:8000/v1/auth/login",
    data: {
      username: "sieunhan2",
      password: "123456789",
    },
  })
    .then(
      (response) => (
        console.log("response new", response.data.accesToken),
        localStorage.setItem("Name", response.data.accesToken)

      )
    )
    .catch((error) => console.log("error new", error));
};
