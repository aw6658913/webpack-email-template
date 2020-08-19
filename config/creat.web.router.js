const fs = require('fs');
const path = require('path');

const creatWebRouter = (dir) => {
    console.log(dir);
    if (fs.existsSync(dir)){
        const pages = fs.readdirSync(dir);
        if (pages && pages.length) {
            let routerData = '[';
            pages.map((item,index)=> {
                if (item.endsWith('.html')){
                    if (index!==0){
                        routerData += ',\n';
                    }
                    routerData += `{\nname: '${item.split('.')[0]}',\nurl: '${item}',\npath: '${path.join(dir, item).replace(/\\/g,'/')}'\n}`;
                }
            })
            routerData += ']';
            const fileContent = `module.exports = ${routerData};`;
            if(!fs.existsSync('./router')){
                fs.mkdirSync('./router');
            }
            fs.writeFileSync(`./router/router.web.js`, fileContent, function (err) {
                if (err) {
                    console.log('生成路由失败', err);
                } else {
                    console.log('生成路由成功');
                }
            })
        }
    }
}

module.exports = creatWebRouter;