import axios from 'axios'
import { ElMessage } from 'element-plus'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        console.log(config)
        config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzMwNDI5NmQtYzZhMi00ZDkyLWI2MjAtMjViOTY4YTQ1YzdhIiwidXNlcm5hbWUiOiJ6Y3cxIiwiZXhwIjoxNjg0OTQzMjEyLCJpc3MiOiJibHVlYmVsbCJ9.tj-oGaRR-UniXy1MKD0_IJwbGaxW_Cf90ZZwKiVuoLY" // 请求头携带token
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data;
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        ElMessage({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
