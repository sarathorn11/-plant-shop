import axios from 'axios'

const http = axios.create({
  // baseURL: process.env.VUE_APP_ROOT_API || 'http://localhost:3000/',
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data)
  },
)

export default http
