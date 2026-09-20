const express = require('express');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();

// CORS manual — pastikan domain ditulis persis
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://kemenlugri-emub.vercel.app',
    'http://localhost:5173',
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

const wishRoutes = require('../routes/wishRoutes');

// Mount di dua path sekaligus, biar aman apapun bentuk path
// yang diteruskan Netlify setelah redirect
app.use('/api', wishRoutes);
app.use('/', wishRoutes);

module.exports.handler = serverless(app);