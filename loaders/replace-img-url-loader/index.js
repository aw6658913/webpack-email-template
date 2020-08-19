const { getOptions, interpolateName } = require('loader-utils');
const path = require('path');
const fs = require('fs');
 
module.exports = function (source) {
    const options = getOptions(this);
    options.outputPath = options.outputPath? options.outputPath + '/': '';
    options.replaceUrl = options.replaceUrl? options.replaceUrl:options.outputPath;
    const resourcePath = this.resourcePath;
    const _this = this;

    // 创建文件到输出目录中
    const copyFile = (dir, name) => {
        const content = fs.readFileSync(path.join(path.dirname(resourcePath), dir));
        const url = interpolateName(_this, options.outputPath + name, {
            content
        })
        _this.emitFile(url, content);
    }

    // 匹配img标签的src并替换
    source.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, capture) {
        // 如果图片路径不是http和https开头的，表示为本地文件，则替换路径，拷贝文件到制定目录
        if(!capture.startsWith('http:') && !capture.startsWith('https:')) {
            const name = path.basename(capture);
            source = source.replace(capture, options.replaceUrl + name);
            // console.log('目录', path.join(path.dirname(resourcePath), capture));
            copyFile(capture, name);
        }
    });
    // 匹配background的url并替换
    source.replace(/background:[\s]*url[(]([^)]+)*/g, function (match, capture) {
        // 如果图片路径不是http和https开头的，表示为本地文件，则替换路径，拷贝文件到制定目录
        if(!capture.startsWith('http:') && !capture.startsWith('https:')) {
            const name = path.basename(capture);
            const reg = new RegExp(capture,"g");
            source = source.replace(reg, options.replaceUrl + name);
            copyFile(capture, name);
        }
    });

    return `export default ${JSON.stringify(source)}`;
}