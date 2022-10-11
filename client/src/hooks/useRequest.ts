import axios from "axios"

const useRequest = () =>{
    const axiosInstance = axios.create({
        baseURL:"http://localhost:4000/api",
        method:'POST',

    })

    const post = axiosInstance
    return axiosInstance;
}

const config = {
    baseURL:"http://localhost:4000/api",
    
}