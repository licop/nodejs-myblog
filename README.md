# node实现博客搭建

## 1. node介绍

### 用途
  - nodejs，一个javascript运行环境
  - 运行在服务器，作为web server
  - 运行在本地，作为打包，构建工具
    
  
### node与javascript的区别

  - `ECMAScript` 定义了语法，写javascript和nodejs必须准守
  - `Javascript` 使用ECMAScript语法规范，外加web API,缺一不可, DOM,BOM,事件绑定，Ajax等，两者结合，即可完成浏览器端的任何操作
  - `nodejs` 使用ECMAScript语法规范，外加[nodejs API](http://nodejs.cn/api/), 缺一不可, 处理文件，http等，两者结合即可完成server端任何操作

## commonjs
node 使用commonjs模块化方式 vscode和chrome方式调试

## 调试
nodejs可以使用vscode和chrome进行调试
 
## server端开发和前端开发的区别
- 服务稳定性
   - server可能遭受各种恶意攻击和误操作
   - 使用pm2做进程守护(一旦挂掉会自动帮助重启)
- 考虑内存和CPU(优化和扩展)
   - server端要承载很多请求，cpu和内存都是稀缺资源
   - 使用stream写日志，使用redis存session
- 日志记录
   - 前端也会参与写日志，但是只是日志的发起方不关系后续
   - server端要记录日志，存储日志，分析日志，前端不关心
- 安全
   - server端要随时准备接收各种恶意攻击，前端则少很多
   - 如越权操作，数据库攻击
- 集群和服务拆分
   - 产品发展速度快，流量可能会迅速增加
   - 扩展机器和服务拆分

## 项目需求
- 首页，作者主页，博客详情页
- 登录页
- 管理中心，新建页，编辑页

## 技术方案
- 数据如何存储
   - 博客
   - 用户
- 如何和前端对接，即接口设计   
   - 数据库和接口文档

## 接口
 - 开发接口(暂时不连接数据库，暂不考虑登录）
 - http请求概述
    - DNS解析，建立TCP链接（三次握手，客户端询问服务器使用可用，服务器告诉客户端可用，客户端告诉服务器即将访问），发送http请求
    - server端接受http请求处理，并返回
    - 客户端接收到返回数据，处理数据(如渲染页面，执行js)
 - get请求客户端向服务端索取信息，post请求客户端向客户端传递信息
 - post请求浏览器无法直接模拟，需要手写js，或者使用postman
 - `nodemon` 检测项目中的文件，一旦发现有改动，nodemo会重启
 
## mysql

 - 建库
 - 建表
    - id保证数据不能重复
 - 表操作

 ```
 sql 语句
 use myblog;

-- show Tables;

--  insert into users(username, `password`, realname)values('lisi', '123', '李四');

--  select * from users;
-- select id, username from users;
-- select * from users where username='zhangsan' or `password` = '123';
-- select * from users where username like '%zhang%';
-- select * from users where `password` like '%1%' order by id desc;

-- update users set realname='李四2' where id='2';

-- SET SQL_SAFE_UPDATES = 0;

-- delete from users where username = 'lisi';

-- select * from users where state = 1;
-- select * from users where state <> 0; -- 不等于
-- update users set state = '1' where username='lisi';  -- 软删除， state=0代表删除

 ```
 
- 更改数据库用户名和密码 `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'`  `flush privileges;`
- [npm mysql文档](https://www.oschina.net/translate/node-mysql-tutorial)
- [nodejs 连接mysql](https://www.runoob.com/nodejs/nodejs-mysql.html)

## cookie和session

- 登录
  - 登录校验 & 登录信息存储
- cookie 
    - 存储在浏览器中的一段字符串
    - 跨域不共享
    - 格式k1=v1;k2=v2;k3=v3; 可以存储结构化数据
    - 每次发起http请求，会将请求域的cookie一起发送给server
    - server可以通过修改cookie并返回浏览器
    - 浏览器可以通过javascript修改cookie(有限制)
- server端操作cookie
   - 客户端把登录信息带给server端，server端修改把登录信息存在cookie里，再返回给客户端
   - httpOnly保证数据不被前端修改

- session
   - cookie登录会暴露用户名，解决办法cookie中存储userid，server对应username
   - 解决方案： session，即server端存储用户信息
   - session 访问频繁，对性能要求高
   - session 存储不是很大
   - session不能存储到node进程中： 进程有内存限制，进程的内存是相互隔离的

## redis
   - [redis 教程](https://www.runoob.com/redis/redis-tutorial.html)
   - webserver最常见的缓存数据库，数据放在内存中
   - 相比与mysql，访问速度快（内存和硬盘不是一个级别）, redis将数据存储在内存中，数据库将数据存储在硬盘中
   - 成本更高，可存储的数据量更小（内存的硬伤）
   - 网站数据不适合redis，断电后数据不能丢失，数据量大
   - 命令
     - redis-cli
     - keys *
     - get key
     - set key value

## nignx 
   - 高性能web服务器
   - 一般用于静态服务、负载均衡、反向代理(客户端控制不了的代理)
   - 做登录联调可以使用nignx做代理，让前后端同域

## 日志
   - 系统没有日志，就等于人没有眼睛
   - 第一，访问日志access log（server端最重要的日志）
   - 第二，自定义日志（包括自定义事件、错误记录）
   - nodejs操作文件， nodejs stream
   - 日志功能与使用
   - 日志文件拆分，日志内容分析
   - 日志存储在文件中，不能存在mysql和redis中，文件成本低
   - crontab 执行定时任务
   - 日志分析 使用readline
   - IO性能瓶颈，使用stream提高性能

## 安全
   - sql注入: 窃取数据库内容
      - 最简单，最原始
      - 输入一个sql片段，最终拼接成一段攻击密码
      - 解决 使用mysql.escape 封装输入信息，使sql失效
   - xss攻击： 窃取前端的cookie内容
      - 攻击方式： 在页面中掺杂js代码，以获取网页信息 插入例如<script />
      - 预防措施： 转换生成js的特殊字符 例如& => &amp, > => &lt, > => &gt
      - npm install xss
   - 密码加密： 保障用户信息安全
      - 使用crypto库 加密
   
## stream
   - `stream`是nodejs流式数据抽象接口, `stream`模块用于构建实现了流接口的对象

## server端和前端区别
   - 服务稳定性
   - 安全（包括登录验证）
   - 内存 cpu（优化，扩展）
   - 集群和服务拆分
   - 日志记录 

## pm2
   - 介绍
      - 安装 `npm install pm2 -g` `pm2 --version`
      - 基本使用命令
        - pm2 start
        - pm2 list
        - pm2 restart <AppName>/id
        - pm2 stop <AppName>/id/all
        - pm2 info <AppName>/id
        - pm2 log <AppName>/id
        - pm2 monit 
      - 配置文件 pm2.conf.json
   - 功能
     - 进程守护，系统崩溃自动重启
     - 启动多进程，充分利用cpu和内存
     - 自带日志记录功能
   - 进程守护
     - node app.js 和 nondemon app.js, 进程崩溃则不能访问
     - pm2遇到进程崩溃会自动重启
   - 多进程
     - 为何使用多进程
       - 操作系统会限制一个进程的最大可用内存
       - 内存：无法利用机器的全部内存
       - cpu：无法充分利用多核cpu优势

## node进阶
   - orm操作数据库(sequelize),连表操作
   - 代码结构和流程的规范
   - nodejs最佳实践

## node 深入

   ### nodejs是什么？和前端有啥区别？
      - nodejs是基于Chrome V8引擎的javascript运行时
      - nodejs出现之前，js只能在浏览去中运行
      - nodejs出现之后，js可以在任何安装nodejs的环境中运行
   ### nodejs如何调试
      - 参考 2-5
      - 启动nodejs服务时，使用inspect
      - 代码中使用debuger断点
      - 使用chrome调试 chrome://inspect
   ### 当前文件和当前目录的路径，如何获取？
      - __filename
      - __dirname
      - 两个都是全局变量
   ### commonjs和ES6-Module的区别
      - 语法不同 
      - commonjs是动态引入，执行时引入 (require 可以再任意地方使用)
      - es6 module是静态引入，编译时引入(import 必须放在最外层)
      - tree shaking只能对 es6 module 进行代码裁剪
   ### path.resolve和path.join的区别
      - path.resolve是获取绝对路径path.join是获取相对路径
   ### 事件循环event loop在nodejs和浏览器中的区别
      - 浏览器
         - 宏任务： setTimeout setInterval, ajax
         - 微任务： process.nextTick, Promise，async/await
         - call stack空闲时，将出发event loop机制，执行宏任务
         - 触发event loop之前，会把现有的微任务都执行完
         - 所以微任务比宏任务执行时间更早
      
      - nodejs
         - 宏任务：setImmediate， I/O文件网络， Socket链接，如连接mysql
         - 执行步骤： 执行同步代码；执行微任务；执行宏任务，回到第二步
         - 宏任务比较多，微任务相对较少
         - 六个阶段(处理宏任务)
           - **timers** 执行`setTimeout`, `setInterval`的回调
           - **I/O callback** 处理网络，流，tcp的错误回调
           - **idle，prepare** 闲置阶段，node内部使用
           - **poll** 执行poll中的I/O队列，检查定时器是否到时间
           - **check** 存放`setImmediate`回调
           - **close callbacks** 关闭回调，例如`Socket.on('close')`
      - 浏览器和nodejs区别
         - nodejs异步API更多，宏任务类型也更多
         - nodejs的evnet loop分为六个阶段，要按顺序执行
         - 微任务中process.nextTick优先级更高
   ### session如何实现登录
         - session和cookie之间的关系
   ### 描述koa2和express的中间件机制
     - 从代码来看，中间件就是个函数
     - 从业务上来看，中间件是个独立的业务模块
     - 模块的拆分，模块的流转，即可完成复杂的功能


   ### node读取大文件 （stream）
     - util/readline

   ### nodejs先上为何开启多进程（pm2）
     - 高效使用多核cpu
     - 充分利用服务器内存
     - 压榨服务器，不浪费资源

   

   


   
   
