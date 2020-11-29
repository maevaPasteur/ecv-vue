require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');

const loginRouter = require('./routes/login.route');
const registerRouter = require('./routes/register.route');
const logoutRouter = require('./routes/logout.route');
const newsRouter = require('./routes/news.route');
const concertsRouter = require('./routes/concerts.route');
const albumsRouter = require('./routes/albums.route');
const artistsRouter = require('./routes/artists.route');
const genresRouter = require('./routes/genres.route');
const adminRouter = require('./routes/admin.route');
const userRouter = require('./routes/user.route');

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
app.use('/api/user', userRouter);

app.listen(3002);
