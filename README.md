## 特性
* 集成客户端服务端为一体
* html热更新，无需手动刷新浏览器
* 菜单、发送选邮件选项自动生成
* 编译自动上传图片并替换图片地址

## 安装
执行 yarn 或 npm install 

## 启动
npm run server

## 编译部署
npm run build

## 项目目录结构
|-- config 配置文件目录
    |-- config.base.js  基础配置文件
    |-- creat.web.router.js 创建router配置文件  
|-- dist   输出目录
|-- loader webpack自定义loader插件目录
|-- node_modules  npm依赖
|-- plugin webpack自定义plugin插件目录
|-- publish dll第三方库目录
|-- router 路由文件
    |-- router.web.js 路由文件
|-- src
    |-- component 组件
    |-- html html文件目录
    |-- images 图片资源

## 开发
在src->html目录下新建html文件，启动项目，会根据命名自动生成该html菜单以及选择选择项