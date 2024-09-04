import axios from "axios"

const AppiAxios = axios.create({
    baseURL : 'http://localhost:3000'
})

export default AppiAxios