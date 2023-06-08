import axios from "axios";

const baseUrl = "https://sea-lion-app-5bs7n.ondigitalocean.app/api";
// const baseUrl = "http://127.0.0.1:8000/api";

//creating an axios instance with auth setup
const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 400000,
});

axiosInstance.interceptors.request.use((config) => {
    if (config.withCredentials) {
        config.headers["Authorization"] = "Token " + localStorage.getItem("access_token");
    }

    return config;
});

//defining the interceptor which will automate the process of refresh and access token
axiosInstance.interceptors.response.use(
    function (response) {
        // Simply returning the response
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosInstance;
