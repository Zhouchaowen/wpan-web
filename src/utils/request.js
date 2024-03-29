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
        config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiM2E3MmNhNGEtM2QxMi00NjdkLWI5N2MtMjQ5NDUwN2IzOWM5IiwidXNlcm5hbWUiOiJ6Y3cxIiwiZXhwIjoxNjkzMjM1OTc5LCJpc3MiOiJibHVlYmVsbCJ9.RHZglB1mlGdIMPkPk1vkNSDY_wuLyvh9ayYO54AbVTA" // 请求头携带token
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
