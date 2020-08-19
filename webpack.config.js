const path = require('path');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const AliyunossWebpackPlugin = require('oss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackAutoRefreshPlugin = require('html-webpack-plugin-webpack-dev-server');
const webpack = require('webpack');
const baseConfig = require('./config/config.base');
const creatWebRouter = require('./config/creat.web.router');
creatWebRouter(path.resolve(__dirname, './src/html'));
const htmlList = require('./html.config')();
// const creatRouter = require('./config/creat.router');
// creatRouter();

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]_[hash:8].js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|mp4)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options:{
                            name: '[name].[ext]',
                            limit: 5120,
                            outputPath: 'resource/',
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'replace-img-url-loader',
                        options: {
                            replaceUrl: baseConfig.resourceUrl + '/',
                            outputPath: baseConfig.resourceUrl,
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    resolveLoader: {
        modules: ['node_modules','loaders']
    },
    resolve: {
        alias: {
            // 组件快捷变量
            '@component': path.resolve(__dirname, './src/component'),
            // 配置文件快捷变量
            '@config': path.resolve(__dirname, './config'),
            // 图片资源快捷变量
            '@images': path.resolve(__dirname, './src/images'),
            // 页面文件快捷变量
            '@pages': path.resolve(__dirname, './src/pages'),
            // 定义普通函数快捷变量
            '@utils': path.resolve(__dirname, './src/utils'),
            // 定义路由路径
            '@router': path.resolve(__dirname, './router')
        },
        extensions: ['.js','json','.ts', '.tsx']
    },
    plugins: [
        //每次build清楚dist编译目录
        // new CleanWebpackPlugin(),
        // 生成css
        new MiniCssExtractPlugin({
            filename: './dist/css/style_[hash:8].css',  // 从 .js 文件中提取出来的 .css 文件的名称
        }),
        // 使用index.html模板生成html文件
        new HtmlWebpackPlugins({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        // 使用index.html模板生成html文件
        ...htmlList,
        new webpackAutoRefreshPlugin({ 
            port: baseConfig.port,   //Local development port	(necessarily)
            ip:'127.0.0.1'  //Local development ip 		(Optional) 	if you set val null,The plugins will auto get your local development ip address
         }),
        // 启动热更新
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        before(app, server, compiler) {
            const watchFiles = ['.html'];
            compiler.hooks.done.tap('done', () => {
                const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes);
                if (
                  this.hot &&
                  changedFiles.some(filePath => watchFiles.includes(path.parse(filePath).ext))
                ) {
                    console.log('更新'+filePath);
                    server.sockWrite(server.sockets, 'content-changed');
                }
            });
        },
        open: true
    }
}