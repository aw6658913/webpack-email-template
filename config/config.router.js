const path = require('path');

module.exports = [
    {
        menuName: '首页',
        menuId: 'index',
        component: '',
        path: '../src/pages/index'
    },
    {
        menuName: '文件管理',
        menuId: 'file',
        component: 'fileManage',
        path: '../src/pages/fileManage'
    },
    {
        menuName: '类型管理',
        menuId: 'category',
        component: 'category',
        path: '../src/pages/category'
    }
];