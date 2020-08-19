const path = require('path');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const AliyunossWebpackPlugin = require('oss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackInlineStylePlugin = require('./plugin/html-webpack-plugin-inline-style');
const webpack = require('webpack');
// const creatRouter = require('./config/creat.router');
const baseConfig = require('./config/config.base');
const creatWebRouter = require('./config/creat.web.router');
creatWebRouter(path.resolve(__dirname, './src/html'));
const htmlList = require('./html.config')();
// creatRouter();

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
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
                            outputPath: baseConfig.resourceUrl,
                            publicPath: baseConfig.ossResourceUrl,
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
                            replaceUrl: baseConfig.ossResourceUrl,
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
    optimization: {
        usedExports: true
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
        new CleanWebpackPlugin(),
        // 生成css
        new MiniCssExtractPlugin({
            filename: 'css/style_[contenthash:8].css',  // 从 .js 文件中提取出来的 .css 文件的名称
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'publish/manifest.json')
        }),
        // 压缩css
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),   // 预处理器，通常使用cssnano
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true,   // 去除注释
                    },
                    normalizeUnicode: false
                }]
             },
            canPrint: true
        }),
        // 使用index.html模板生成html文件
        new HtmlWebpackPlugins({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        // 遍历html文件
        ...htmlList,
        new WebpackInlineStylePlugin(),
        // 上传oss
        new AliyunossWebpackPlugin({
            buildPath: baseConfig.buildPath,
            outputPath: baseConfig.outputUrlPath,
            uploadUrl: baseConfig.uploadUrl
		})
    ]
}