// axios
import axios from 'axios'
import jwt from "jsonwebtoken"

const baseURL = 'http://localhost:2020'

export default axios.create({
  baseURL
})


axios.interceptors.request.use(
    config => {
      if (JSON.parse(localStorage.getItem('backendUser'))) {
        const token = JSON.parse(localStorage.getItem('backendUser')).accessToken
        if (token) {
          config.headers['x-access-token'] = token
        }

        const decoded = jwt.decode(token)
        const timestampNow = Date.now()
        const timestampExp = decoded.exp * 1000
        const diff = timestampExp - timestampNow
        if (diff < 0) {
          localStorage.removeItem('backendUser')
          router.push('/pages/login')
        }
      }
    /* eslint-disable dot-notation, no-console */
    config.headers['platform_name'] = 'admin_backend'
    config.headers['Content-Type'] = 'application/json'
    return config
  }, error => {
    Promise.reject(error)
})