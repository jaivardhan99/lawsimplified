import axios from 'axios'

// Centralized Axios instance so we can control the API base URL in one place.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:5000'
    : 'https://lawsimplified.onrender.com')

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
})

export default apiClient
