import axios from 'axios'

const apiClient = axios.create({
  baseURL: "https://pos-back-production.up.railway.app"
})

export default apiClient;