import axios from "axios";


export const loginApi = async (account: string, password: string) => {
  await axios({
    method: "post",
    url: "http://localhost:8000/v1/auth/login",
    data: {
      username: account,
      password: password,
    },
  })
};
