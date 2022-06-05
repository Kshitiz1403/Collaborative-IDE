import axios from 'axios'
import useAuth from './useAuth'

const API_URL = "http://localhost:4000"

const useAxios = () =>{
    const { accessToken } = useAuth()

    const axiosInstance = axios.create({
        headers: { 'accessToken': accessToken },
        baseURL: API_URL
    })

    return axiosInstance
}


export default useAxios