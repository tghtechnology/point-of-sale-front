import axios from 'axios'

const apiClient = axios.create({
  baseURL: "http://192.168.18.18:3000"
})

export default apiClient;