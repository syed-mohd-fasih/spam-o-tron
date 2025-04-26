import axios from "axios";

const instance = axios.create({
    baseURL: "http://192.168.0.148:8000/api",
    withCredentials: true, // Needed because you set cookies in Node backend
});

export default instance;
