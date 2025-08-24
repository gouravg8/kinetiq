import axios from "axios";

const api = axios.create({
    baseURL: "/",
    withCredentials: true,
    timeout: 30000
})

export default api;