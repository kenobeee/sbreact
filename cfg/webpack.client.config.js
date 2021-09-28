const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

const setupDevtool = () => {
    if (IS_DEV) return 'eval';
    if (IS_PROD) return false;
}

module.exports = {
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: [ // Откуда начинаем (Значение - путь до файла, с которого начинается работа). Нужен абсолютный путь
        path.resolve(__dirname, '../src/client/index.jsx'),
        'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr', // js-код, который будет добавлен к index.js
    ],
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: 'client.js',
        publicPath: '/static/', // Указывает вебпаку, где будут расположены статические ассеты
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: { // Работает с requier. Например, мы импортируем react-dom, а получаем @hot-loader/react-dom !!! Только в дев режиме
            'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom',
        }
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: ['ts-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                // use: ['style-loader', 'css-loader'], ! ИСПОЛЬЗОВАТЬ ПРИ КЛАССИЧЕСКОМ НАЗНАЧЕНИИ КЛАССОВ
                use: [
                    'style-loader', {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]--[hash:base64:5]', // ЗДЕСЬ МЫ УКАЗЫВАЕМ, КАК БУДЕТ НАЗЫВАТЬСЯ НОВЫЙ СЕЛЕКТОР
                            }
                        }
                    },
                    'sass-loader',
                ]
            }
        ]
    },
    devtool: setupDevtool(),
    plugins: IS_DEV
        ?   [
            new CleanWebpackPlugin(), // Подчищает старые чанки (js файлы) после каждого изменения в коде
            new HotModuleReplacementPlugin(),
        ]
        : [],
};