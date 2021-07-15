const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    module: {
        rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
    },
};
