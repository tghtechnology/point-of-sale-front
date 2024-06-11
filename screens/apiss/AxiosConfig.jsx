import axios from 'axios'

const apiClient = axios.create({
  baseURL: "http://192.168.0.4:3000"
})

export default apiClient;