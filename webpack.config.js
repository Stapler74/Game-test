const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].js',
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            { test: /\.(eot|svg|ttf|woff|woff2)$/,
                use:{loader: 'file-loader', options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts',
                    publicPath: '../fonts/'
                }} 
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/i,
                use: {loader: 'file-loader', options: {
                    outputPath: 'assets/imgs',
                    publicPath: '../assets/imgs/'
                }}
            },
            {
                test: /\.css$/i,
                exclude: /\.module\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader' ],
            },
            {
                test: /\.module\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                            importLoaders: 1,
                        },
                    },
                ],
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 8000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true)
          }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets/imgs', to: 'assets/imgs'}
            ]
        }),
    ]
}