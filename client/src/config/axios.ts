import axios from "axios";

const axiso = axios.create({
  baseURL: "http://localhost:3000",
});

axiso.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token ? `Bearer ${token}` : null;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiso;