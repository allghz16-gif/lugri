import axios from 'axios';

const API = axios.create({
  baseURL: 'https://sparkly-nasturtium-6b4f5f.netlify.app/api', // URL backend Netlify Anda
  withCredentials: true,
});

export default API;