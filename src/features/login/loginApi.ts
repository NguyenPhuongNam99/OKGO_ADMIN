import axios from "axios";


export const loginApi = async (account: string, password: string) => {
 return await axios({
    method: "post",
    url: "http://206.189.37.26:8080/v1/auth/login",
    data: {
      username: account,
      password: password,
    },
  })
};
