const fs = require('fs');
const path = require('path');
const pages = require('./router/router.web');
const HtmlWebpackPlugins = require('html-webpack-plugin');

const getPage = () => {
    let htmlList = [];
    // const htmlPath = './src/html';
    // const pages = fs.readdirSync(path.resolve(__dirname, htmlPath));
    if (pages && pages.length) {
        pages.map((item) => {
            htmlList.push(
                new HtmlWebpackPlugins({
                    template: item.path,
                    filename: item.url,
                    chunks: ['html.js']
                })
            );
        })
    }
    return htmlList;
}

module.exports = getPage;