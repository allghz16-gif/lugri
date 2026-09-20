import axios from 'axios';

const API = axios.create({
  baseURL: 'https://kemenlugri-emub.vercel.app/api',
  withCredentials: true,
});

export default API;