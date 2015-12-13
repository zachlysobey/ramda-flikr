/* global __dirname */
var path = require('path');

var paths = Object.freeze({
    dist: path.join(__dirname, 'build')
});

module.exports = {
    entry: './src/app.js',
    output: {
        path: paths.dist,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    }
};
