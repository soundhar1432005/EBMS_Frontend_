import axios from 'axios'

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Create axios instance with default config
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Authentication APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
}

// Booking APIs
export const bookingAPI = {
  getAll: () => api.get('/bookings'),
  getStats: () => api.get('/bookings/stats'),
  create: (data) => api.post('/bookings', data),
  checkAvailability: (data) => api.post('/bookings/check-availability', data),
  updateStatus: (id, status) => api.patch(`/bookings/${id}/status`, { status }),
}

// Service Provider APIs
export const providerAPI = {
  getAll: () => api.get('/providers'),
  getByCategory: (category) => api.get(`/providers?category=${category}`),
  getById: (id) => api.get(`/providers/${id}`),
}

// Function Hall APIs
export const hallAPI = {
  getAll: () => api.get('/halls'),
  getAvailable: (date, time) => api.get(`/halls/available?date=${date}&time=${time}`),
}

// Service APIs
export const serviceAPI = {
  getAll: () => api.get('/services'),
  getByCategory: (category) => api.get(`/services/category/${category}`),
}

export default api
