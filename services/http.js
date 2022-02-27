import axios from 'axios'

const createInstance = () => {
    const baseURL = process.env.AUTH_SERVICE_URL
    const config = {
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const http = axios.create(config)

    http.interceptors.request.use(
        (request) => {
            if (auth) {
                request.headers['Authorization'] = `Bearer ${auth}`
            }
            return request
        },
        (error) => Promise.reject(error)
    )

    return http
}

export default createInstance()
