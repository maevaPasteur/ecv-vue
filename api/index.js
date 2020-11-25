require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const newsRouter = require('./routes/news');
const concertsRouter = require('./routes/concerts');
const albumsRouter = require('./routes/albums');
const artistsRouter = require('./routes/artists');
const genresRouter = require('./routes/genres');
const adminRouter = require('./routes/admin');

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
app.use('/api/logout', logoutRouter);
app.use('/api/news', newsRouter);
app.use('/api/concerts', concertsRouter);
app.use('/api/albums', albumsRouter);
app.use('/api/artists', artistsRouter);
app.use('/api/genres', genresRouter);
app.use('/api/admin', adminRouter);

app.listen(3002);
