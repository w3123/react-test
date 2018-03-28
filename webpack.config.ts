const path = require('path')
import * as webpack from 'webpack'
// var HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")


// const ts_import_plugin = require('ts-import-plugin')
const extractLESS = new ExtractTextPlugin('./style/style.css')

// const inProject = (...args: Array<string>) => path.resolve(__dirname, ...args)
// const inProjectSrc = (file: string) => inProject('src', file)



const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

export const config: webpack.Configuration = {

    entry: {
        // normalize: [
        //     inProjectSrc('normalize'),
        // ],
        main: [__dirname + '/src/index.tsx'],
    },

    output: {
        path: __dirname + '/build',
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'lib': __dirname + '/src/lib'
        },
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.less$|.css$/,
                use: extractLESS.extract({
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "less-loader",
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|gif|svg)$/,
                loader: 'url-loader?limit=10000&name=images/[name]-[hash:5].[ext]'
            },
            {
                test: /\.tsx*$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            getCustomTransformers: () => ({
                                before: [
                                    // ts_import_plugin(
                                    //     [{
                                    //         libraryName: 'antd',
                                    //         libraryDirectory: 'lib',
                                    //         style: true
                                    //     }] ),
                                ]
                            }),
                            compilerOptions: {
                                module: 'es2015'
                            }
                        },
                    },
                    { loader: 'tslint-loader' }
                ]

            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin("build"),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './src/static'),
                to: path.resolve(__dirname, './build/static'),
                ignore: ['.*']
            }
        ]),
        extractLESS
    ]
}

module.exports = config