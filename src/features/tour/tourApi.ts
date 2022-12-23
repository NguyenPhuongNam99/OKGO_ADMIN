import axios from "axios";

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

export { cityApi, provincesApi };
