const clientConfig = require('./cfg/webpack.client.config');
const serverConfig = require('./cfg/webpack.server.config');

module.exports = [ // Так как указан массив, а не объект => webpack поочереди отрабатывает каждый конфиг и создает им бандлы
    clientConfig,
    serverConfig,
]