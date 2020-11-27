const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const fs = require('fs')
const morgan = require('koa-morgan')
const path = require('path')
const blog = require('./routes/blog')
const user = require('./routes/user')
const REDIS_CONF = require('./conf/db')

// error handler
onerror(app)

const logFileName = path.join(__dirname, 'logs', 'access.log');
const writeStream = fs.createWriteStream(logFileName, {
  flags: 'a'
});
app.use(morgan('combined', {
  stream: writeStream
}));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.keys = ['hfhsjf_4hj'];
app.use(session({
  // 配置cookie
  cookie: {
    path: '/',
    cookie: 'true',
    maxAge: 24 * 60 * 60 * 1000
  },
  // 配置redis
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}` // 本地端口
  })
}))

// routes
app.use(blog.routes(), blog.allowedMethods());
app.use(user.routes(), user.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
