require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const initDb = require('./middlewares/initDb');

app.use(compression());
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(initDb());

app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);

app.listen(3000);
