import axios from 'axios';

export const api = axios.create({
  // Se estiver usando Docker no Nobara, verifique se a porta é 3333
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor opcional: útil para debugar requisições no terminal do navegador
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('🚀 API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);