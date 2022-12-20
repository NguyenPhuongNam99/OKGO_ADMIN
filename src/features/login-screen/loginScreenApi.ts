import axios from "axios";


export const loginScreenApi = async (account: string, password: string) => {
 return await axios({
    method: "post",
    url: "http://localhost:8000/v1/auth/login",
    data: {
      username: account,
      password: password,
    },
  })
};
