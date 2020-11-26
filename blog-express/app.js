var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');
const app = express();
const RedisStore = require('connect-redis')(session)
const redisClient = require('./db/redis');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'hfhsjf_4hj',
  cookie: {
    path: '/', // 默认配置
    httpOnly: true, // 默认配置
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: sessionStore
}));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;