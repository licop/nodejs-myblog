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
 - `nodemon` 检测项目中的文件，一旦发现有改动，nonmo会重启
 
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
   - 


## redis


## 需求分析
  - 


## 技术方案设计


## pm2
