import axios from "axios";

const Api = axios.create({
  baseURL: process.env.REACT_APP_DOMAIN_API,
});

Api.interceptors.request.use((config: any) => {
  return config;
});

Api.interceptors.response.use(
  (res: any) => {
    return res?.data;
  },
  function (err: any) {
    const status = err?.response?.status;
    const message = err?.response?.data || err.message;

    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/sign-in";
    }
    return Promise.reject(new Error(message));
  }
);

export default Api;
