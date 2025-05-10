import axios from "axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers.Accept = "application/json";
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if the error is a network error
    if (!error.response) {
      console.log(error);
      if (error.message === "Network Error" || error.code === "ECONNABORTED") {
        // Optionally, you can display a user-friendly message to the user
        console.log("Network error, please check your internet connection.");
      }
    } else if (error.response.status === 401) {
      // Unauthorized - Meaning that user is not logged in
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axios;
