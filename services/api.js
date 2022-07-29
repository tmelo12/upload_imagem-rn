import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8002',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
export default api;
