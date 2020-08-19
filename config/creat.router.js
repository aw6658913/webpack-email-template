const fs = require('fs');
const path = require('path');
const routerData = require('./config.router');

const creatRouter = () => {
    if (routerData && routerData.length) {
        let importContent = "import React from 'react';\n" +
                            "import Layout from '@component/Layout';\n" +
                            "import { HashRouter as Router, Route, Switch } from 'react-router-dom';\n";
        let routerContent = 'const setRouter = () => (<Router><div><Layout><Switch>\n';
        routerData.map((item) => {
            // 判断文件目录是否存在
            if (fs.existsSync(path.resolve(__dirname,item.path))) {
                const isDirector = fs.statSync(path.resolve(__dirname,item.path)).isDirectory();
                // const isFile = fs.statSync(path.resolve(__dirname,item.components)).isFile();
                if (isDirector) {
                    const componentName = item.path.split('/')[item.path.split('/').length - 1];
                    importContent += "import " + componentName + " from '@pages/" + componentName + "';\n";
                    routerContent += "<Route exact path='" + "/" + (item.component || '') + "' component={" + componentName + "}/>\n";
                }
            }
        })
        routerContent += "</Switch></Layout></div></Router>)";
        const fileContent = importContent + routerContent + ';\nexport default setRouter;';
        if(!fs.existsSync('./router')){
            fs.mkdirSync('./router');
        }
        fs.writeFileSync(`./router/router.js`, fileContent, function (err) {
            if (err) {
                console.log('生成路由失败', err);
            } else {
                console.log('生成路由成功');
            }
        })
    }
}

module.exports = creatRouter;