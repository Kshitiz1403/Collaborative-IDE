import axios from "axios";

const API_URL = "http://localhost:5000";

const useAzure = () =>{
    const axiosInstance = axios.create({
        baseURL:API_URL
    })
    return axiosInstance;
}

export default useAzure;