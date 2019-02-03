const path = require('path');
const Uglify = require("uglifyjs-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: './build/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'snappy-cdn.js'
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: { warnings: false }
    //     })
    // ]

    optimization: {
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new Uglify({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: true,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            })
        ]
    }
};