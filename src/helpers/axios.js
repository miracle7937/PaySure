import axios from "axios";

export default (history = null) => {
  const baseURL = process.env.REACT_APP_BACKEND_URL;


  let headers = {};

  if (localStorage.token) {
    headers.Authorization = `Bearer ${localStorage.token}`;
  }

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("orgCode");

        if (history) {
            window.location = "/";
          console.log('win')
        } else {
          window.location = "/";
          console.log('lose')
        }
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return axiosInstance;
};