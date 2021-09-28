const webpack = require('webpack');
const nodemon = require('nodemon');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const [webpackClientConfig, webpackServerConfig] = require('../webpack.config');

/*
 Компилятор для клиентской конфигурации вебпака
*/

const hmrServer = express();
const clientCompiler = webpack(webpackClientConfig);

hmrServer.use(webpackDevMiddleware(clientCompiler, {
    publicPath: webpackClientConfig.output.publicPath, // PublicPath должны совпадать здесь и в серверном конфиге вебпака
    serverSideRender: true,
    noInfo: true, // Отключает логи
    watchOptions: {
        ignore: /dist/, // Чтобы не пересобиралось то, что уже готово в dist
    },
    writeToDisk: true, // Позволяет вебпак-дев-мидлверу записывать бандл в папку dist
    stats: 'errors-only', // Отключает логи
}));

hmrServer.use(webpackHotMiddleware(clientCompiler, {
    path: '/static/__webpack_hmr',
}));

hmrServer.listen(3001, () => {
    console.log('HMR server successful started');
});

/*
 Компилятор для серверной конфигурации вебпака
*/

const compiler = webpack(webpackServerConfig);

// compiler.run((err) => { // Холодный старт нашего приложения !!! ДЛЯ СТАРОЙ ВЕРСИИ !!!
//     if (err) {
//         console.log('Compilation failed: ', err);
//     };

compiler.watch({}, (err) => {
    if (err) {
        console.log('Compilation failed: ', err);
    }
    console.log('Compilation was successfully');
});

nodemon({
    script: path.resolve(__dirname, '../dist/server/server.js'), // Путь до скрипта, который nodemon запускает, т.е наш серверный Бандл
    watch: [ // Свойство, значение которого - путь к папке за изменениями в которой следит nodemon
        path.resolve(__dirname, '../dist/server'),
        path.resolve(__dirname, '../dist/client'),
    ]
});

// })