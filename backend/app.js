require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { createUser, login } = require('./controllers/users');
const { validateSignIn, validateSignUp } = require('./middlewares/validate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors({
  origin: ['https://localhost:3000',
    'https://localhost:3001',
    'http://localhost:3001',
    'http://localhost:3000',
    'https://api.shishkinovich.nomoredomains.work',
    'http://api.shishkinovich.nomoredomains.work',
    'https://shishkinovich.nomoreparties.sbs',
    'http://shishkinovich.nomoreparties.sbs'],
  credentials: true,
  preflightContinue: false,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
  optionsSuccessStatus: 204,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());
const { PORT = 3001 } = process.env;

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateSignUp, createUser);
app.post('/signin', validateSignIn, login);

app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});
