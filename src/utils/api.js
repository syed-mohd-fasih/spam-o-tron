import axios from "axios";

const instance = axios.create({
    baseURL: `http://172.16.86.43:8000/api`,
    withCredentials: true,
});

export default instance;
