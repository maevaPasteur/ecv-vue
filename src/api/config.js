import axios from 'axios'

const instance = axios.create({
  baseURL: "http://localhost:3002/api/",
  headers: {
    Accept: "application/json",
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
});

instance.interceptors.response.use(function (response) {
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }

  return response;
}, function (errorResponse) {
  if (errorResponse.response.data.token) {
    localStorage.setItem('token', errorResponse.response.data.token);
  }

  return errorResponse;
});

export default instance
