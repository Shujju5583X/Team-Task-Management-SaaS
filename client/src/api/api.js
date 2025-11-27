import axios from 'axios';

const api = axios.create({
    baseURL: 'https://taskflow-backend-z65t.onrender.com/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
    getMe: () => api.get('/auth/me'),
};

// Tasks API
export const tasksAPI = {
    getAll: () => api.get('/tasks'),
    create: (data) => api.post('/tasks', data),
    update: (id, data) => api.put(`/tasks/${id}`, data),
    delete: (id) => api.delete(`/tasks/${id}`),
};

export default api;
