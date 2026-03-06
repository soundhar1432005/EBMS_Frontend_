// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
export const API_BASE = `${API_URL}/api`

// Helper function for authenticated requests
export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token')
  
  const headers = {
    ...options.headers,
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  
  return fetch(url, {
    ...options,
    headers
  })
}

export default { API_URL, API_BASE, fetchWithAuth }
