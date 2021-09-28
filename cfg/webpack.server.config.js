const path = require('path');
const nodeExternals = require('webpack-node-externals'); // Необходим для недопуска всех используемых модулей в финальный бандл
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    target: "node",
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: path.resolve(__dirname, '../src/server/server.js'),
    output: {
        path: path.resolve(__dirname, '../dist/server'),
        filename: "server.js",
    },
    resolve: { // resolve клиентской и серверной частей должны совпадать
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: ['ts-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]--[hash:base64:5]', // ЗДЕСЬ МЫ УКАЗЫВАЕМ, КАК БУДЕТ НАЗЫВАТЬСЯ НОВЫЙ СЕЛЕКТОР
                            },
                            onlyLocals: true, // НУЖНО ЧТОБЫ css loader НЕ СОБИРАЛ ГЛОАБЛЬНЫЕ СТИЛИ НА СЕРВЕРЕ, ОНИ НАС НЕ ИНТЕРЕСУЮТ. НА СЕРВЕРЕ ИНТЕРЕСУЮТ ТОЛЬКО СЕЛЕКТОРЫ
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    optimization: { // Отключаем минимизацию js для серверного бандла
        minimize: false,
    }
};