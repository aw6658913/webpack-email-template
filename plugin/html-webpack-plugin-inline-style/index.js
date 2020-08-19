const juice = require('juice');
const prettifyHtml = require('prettify-html');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function webpackInlineStylePlugin() {
  
}

webpackInlineStylePlugin.prototype.apply = function(compiler) {

  compiler.hooks.compilation.tap('webpackInlineStylePlugin', (compilation) => {

    HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
      'webpackInlineStylePlugin',
      (data, cb) => {
          let html = data.html;
          html = html
          data.html = prettifyHtml(juice(html));
          cb(null, data)
      }
    )
  })
}

module.exports = webpackInlineStylePlugin;
