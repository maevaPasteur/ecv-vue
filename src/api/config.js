import axios from 'axios'

const instance = axios.create({
  baseURL: "http://localhost:3002/api/",
  headers: {
    Accept: "application/json",
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance
