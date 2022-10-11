import axios, { AxiosInstance } from 'axios'
const useSignup = () =>{
    const axiosInstance: AxiosInstance = axios.create({
        baseURL:'http://localhost:4000/api',
        // transformResponse:[(data)=>{
        //     return data.data
        // }]
    })
    return axiosInstance;
}
export default useSignup;