import axios from 'axios';

const API = axios.create({
  // Menghubungkan frontend React di Vercel ke backend Express di Netlify
  baseURL: 'https://sparkly-nasturtium-6b4f5f.netlify.app/api',
  withCredentials: true,
});

export default API;