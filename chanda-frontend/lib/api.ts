import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User endpoints
export const userAPI = {
  register: (email: string, password: string, username?: string) =>
    api.post('/users/register', { email, password, username }),
  login: (email: string, password: string) =>
    api.post('/users/login', { email, password }),
  getCurrentUser: () => api.get('/users/me'),
  getUserDonations: () => api.get('/users/donations'),
};

// Donation endpoints
export const donationAPI = {
  createDonation: (data: {
    name: string;
    profession: string;
    district: string;
    amount: number;
  }) => api.post('/donations', data),
  getAllDonations: () => api.get('/donations'),
  getDistrictStats: () => api.get('/donations/stats/districts'),
  getProfessionStats: () => api.get('/donations/stats/professions'),
  getLeaderboard: () => api.get('/donations/leaderboard'),
};

export default api;
