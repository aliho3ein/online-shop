import axios from "axios";

const CallApi = () => {
  const axiosInstance = axios.create({
    baseURL:
      "https://online-shop-87fb7-default-rtdb.europe-west1.firebasedatabase.app/",
  });

  axiosInstance.interceptors.request.use(
    (config) => config,
    (err) => Promise.reject(err)
  );

  axiosInstance.interceptors.response.use(
    (config) => config,
    (err) => Promise.reject(err)
  );

  return axiosInstance;
};

export default CallApi;
