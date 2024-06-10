import axios from 'axios'

const apiClient = axios.create({
  baseURL: "http://192.168.0.102:3000"
})

export default apiClient;