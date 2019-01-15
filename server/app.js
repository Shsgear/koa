const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
// const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const router = require('./routes/index');

// error handler
onerror(app)

// middlewares

// body parser中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

// 
// app.use(json())

// 控制台日志中间件
app.use(logger())

// 静态资源加载中间件
app.use(require('koa-static')(__dirname + '../../public'))

// 服务端模板渲染中间件
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


// 初始化路由中间件
app.use(router.routes());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


module.exports = app;
