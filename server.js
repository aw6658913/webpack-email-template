const webpack = require("webpack");
const express = require("express");
const fs = require('fs');
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// const webpackDevMiddleWare = require('webpack-dev-middleware');
// const webpackHotMiddleWare = require('webpack-hot-middleware');
const webpackConfig = require("./webpack.config.js");
const complies = webpack(webpackConfig);
// const router = express.Router();
// const menu = require("./config/config.web");
const baseConfig = require("./config/config.base");
const WebpackDevServer = require("./webpack-dev-server");
const app = express();

/*
app.use(webpackDevMiddleWare(complies, {
    publicPath: webpackConfig.output.publicPath
}));
*/

// app.use(webpackHotMiddleWare(complies));

/*
if (menu && menu.length) {
    menu.map((item) => {
        // 设置html地址
        app.get('/' + item.menuUrl,(req, res) => {
            res.sendFile(path.resolve(__dirname + item.path));
        })
    })
}
*/

// 参数：发件人，收件人，主题，正文（支持html格式）,授权码，回调函数
const sendMail = function (from, aliasName, tos, subject, msg, pass, callback) {
  const smtpTransport = nodemailer.createTransport({
    host: "smtp.qq.com",
    secureConnection: true, // use SSL
    secure: true,
    port: 465,
    auth: {
      user: from,
      pass: pass || "pffglnehdyeybbaa",
    },
  });

  smtpTransport.sendMail(
    {
      //from    : '标题别名 <foobar@latelee.org>',
      from: aliasName + " " + "<" + from + ">",
      //'li@latelee.org, latelee@163.com',//收件人邮箱，多个邮箱地址间用英文逗号隔开
      to: tos,
      subject: subject, //邮件主题
      //text    : msg,
      html: msg,
    },
    function (err, res) {
      if (err) {
        callback && callback(err);
        // response.json(err);
        console.log("error: ", err);
      } else {
        callback && callback(res);
      }
    }
  );
};

//设置跨域访问
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DEletE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options") res.send(200);
  //让options尝试请求快速结束
  else next();
});

// 创建 application/x-www-form-urlencoded 编码解析
const urlencodedParser = bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
});
app.use(bodyParser.json({ limit: "50mb" }));

// 获取html文件内容
app.post('/getHtml',urlencodedParser, function (req, res) {
  res.sendFile(path.join(__dirname, baseConfig.outPath, path.basename(req.body.mail)))
})

// 发送邮件及本地下载
app.post("/sendMail", urlencodedParser, function (request, response) {
  // 输出 JSON 格式
  const { ...param} = request.body;
  data = {
    mailAddress: param.mailAddress || "",
    mailTitle: param.mailTitle || "测试邮件",
    targetAddress: param.targetAddress || "",
    sendMan:
    param.sendMan || param.mailAddress || "",
    templateHtmlContent: param.templateHtmlContent || "邮件内容",
    pass: param.pass,
  };
  sendMail(
    data.mailAddress,
    data.mailTitle,
    data.targetAddress,
    data.sendMan,
    data.templateHtmlContent,
    data.pass,
    function (data) {
      response.json(data);
    }
);
});

// 绑定server服务
const server = new WebpackDevServer(app, complies, webpackConfig.devServer);

// 启动服务
server.listen(baseConfig.port || 9000, "localhost", function (err) {});
// app.listen(webpackConfig.devServer.port || 9000);
