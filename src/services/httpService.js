import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!expectedError) {
    console.log("error");
    logger.log(error);
    toast.error("An unexpected error occured!");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.put,
  setJwt,
};
