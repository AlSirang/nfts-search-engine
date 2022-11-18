// apis required for the the fetching data
import axios from "axios";
import { APIs_BASE_URL } from "../utils/constants";

export const getSignInAPI = async (payload) => {
  return await axios.post(`${APIs_BASE_URL}/api/signIn`, payload);
};

export const checkTokenAPI = async (accessToken) => {
  return await axios({
    method: "get",
    url: `${APIs_BASE_URL}/api/checkToken`,
    headers: accessToken ? { cookie: accessToken } : undefined,
  });
};
