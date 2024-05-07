import axios from 'axios'

const apiClient = axios.create({
  baseURL: "http://192.168.101.12:3000"
})

export default apiClient;